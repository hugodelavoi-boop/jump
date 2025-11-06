import { supabase } from './supabase';

export async function testSupabaseConnection(): Promise<{
  success: boolean;
  message: string;
  details?: any;
}> {
  try {
    // Test basic connectivity
    const { data, error } = await supabase.from('users').select('count').limit(0);

    if (error) {
      return {
        success: false,
        message: 'Connection failed',
        details: error,
      };
    }

    return {
      success: true,
      message: 'Successfully connected to Supabase',
      details: data,
    };
  } catch (err) {
    return {
      success: false,
      message: 'Network error - unable to reach Supabase',
      details: err instanceof Error ? err.message : 'Unknown error',
    };
  }
}
