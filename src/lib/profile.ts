import { supabase } from './supabase';

export interface UserProfile {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  mobile: string | null;
  created_at: string;
  updated_at: string;
}

export interface UpdateProfileData {
  first_name?: string;
  last_name?: string;
  mobile?: string;
}

export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .maybeSingle();

  if (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }

  // If no profile exists, try to create one
  if (!data) {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data: newProfile, error: insertError } = await supabase
        .from('users')
        .insert({
          id: userId,
          email: user.email!,
          first_name: user.user_metadata?.first_name || null,
          last_name: user.user_metadata?.last_name || null,
          mobile: user.user_metadata?.mobile || null,
        })
        .select()
        .single();

      if (insertError) {
        console.error('Error creating user profile:', insertError);
        return null;
      }

      return newProfile;
    }
  }

  return data;
}

export async function updateUserProfile(
  userId: string,
  updates: UpdateProfileData
): Promise<UserProfile> {
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', userId)
    .select()
    .single();

  if (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }

  const fullName = [updates.first_name, updates.last_name]
    .filter(Boolean)
    .join(' ');

  if (fullName) {
    const { error: authError } = await supabase.auth.updateUser({
      data: {
        first_name: updates.first_name,
        last_name: updates.last_name,
        full_name: fullName,
      },
    });

    if (authError) {
      console.error('Error updating auth metadata:', authError);
    }
  }

  return data;
}

export async function updatePassword(newPassword: string): Promise<void> {
  if (newPassword.length < 8) {
    throw new Error('Password must be at least 8 characters long');
  }

  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) {
    console.error('Error updating password:', error);
    throw error;
  }
}

export function validateMobile(mobile: string): boolean {
  const australianMobileRegex = /^04\d{8}$/;
  const cleanedMobile = mobile.replace(/\s+/g, '');
  return australianMobileRegex.test(cleanedMobile);
}

export function formatMobile(mobile: string): string {
  const cleaned = mobile.replace(/\s+/g, '');
  if (cleaned.length === 10 && cleaned.startsWith('04')) {
    return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`;
  }
  return mobile;
}
