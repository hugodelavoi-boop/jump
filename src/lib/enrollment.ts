import { supabase } from './supabase';
import { createCheckoutSession } from './stripe';

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

export async function createEnrollment(
  data: EnrollmentData, 
  userId: string,
  checkoutSessionId: string
) {
  // Validate required fields
  if (!data.parentName || !data.email || !data.childName || !data.childAge || !data.childSchool || !data.program) {
    throw new Error('Missing required enrollment information');
  }

  const { error } = await supabase
    .from('enrollments')
    .insert([
      {
        user_id: userId,
        parent_name: data.parentName,
        email: data.email,
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

export async function createEnrollmentCheckout(
  enrollmentData: EnrollmentData,
  userId: string,
  accessToken: string
): Promise<string> {
  try {
    // First, get the product details to determine mode
    const { data: product, error: productError } = await supabase
      .from('stripe_products')
      .select('*')
      .eq('price_id', enrollmentData.program)
      .single();

    if (productError) {
      throw new Error('Failed to fetch program details');
    }

    // Create checkout session
    const successUrl = `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${window.location.origin}/enrol`;

    const checkoutUrl = await createCheckoutSession(
      enrollmentData.program,
      product.mode as 'payment' | 'subscription',
      accessToken,
      successUrl,
      cancelUrl
    );

    return checkoutUrl;
  } catch (error) {
    console.error('Failed to create enrollment checkout:', error);
    throw error;
  }
}