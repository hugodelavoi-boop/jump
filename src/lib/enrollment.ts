import { supabase } from './supabase';

export interface EnrollmentData {
  parentName: string;
  email: string;
  mobile: string;
  childName: string;
  childAge: string;
  childSchool: string;
  medicalInfo: string;
  program: string;
  requiresPickup: boolean;
  photoPermission: boolean;
}

export async function getPaymentUrl(programId: string): Promise<string | null> {
  const { data, error } = await supabase
    .from('stripe_products')
    .select('Payment_URL')
    .eq('price_id', programId)
    .single();

  if (error) {
    console.error('Failed to fetch payment URL:', error);
    throw new Error('Failed to fetch payment URL');
  }

  return data?.Payment_URL || null;
}

export async function createEnrollment(
  data: EnrollmentData, 
  userId: string,
  checkoutSessionId: string
) {
  const { error } = await supabase
    .from('enrollments')
    .insert([
      {
        user_id: userId,
        parent_name: data.parentName,
        email: data.email,
        mobile: data.mobile,
        child_name: data.childName,
        child_age: data.childAge,
        child_school: data.childSchool,
        medical_info: data.medicalInfo,
        program_id: data.program,
        requires_pickup: data.requiresPickup,
        photo_permission: data.photoPermission,
        checkout_session_id: checkoutSessionId,
        status: 'pending'
      }
    ]);

  if (error) {
    console.error('Failed to create enrollment:', error);
    throw new Error('Failed to create enrollment');
  }
}

export async function getEnrollmentBySessionId(sessionId: string) {
  const { data, error } = await supabase
    .from('user_enrollments')
    .select('*')
    .eq('checkout_session_id', sessionId)
    .single();

  if (error) {
    console.error('Failed to fetch enrollment:', error);
    throw new Error('Failed to fetch enrollment');
  }

  return data;
}