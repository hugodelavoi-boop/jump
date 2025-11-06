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

async function submitToNetlify(data: EnrollmentData, checkoutSessionId: string, programName?: string, paymentType?: string) {
  const formData = new FormData();
  formData.append('form-name', 'enrollment');
  formData.append('parentName', data.parentName);
  formData.append('email', data.email);
  formData.append('mobile', data.mobile || 'Not provided');
  formData.append('childName', data.childName);
  formData.append('childAge', data.childAge);
  formData.append('childSchool', data.childSchool);
  formData.append('medicalInfo', data.medicalInfo || 'None');
  formData.append('programName', programName || 'Selected Program');
  formData.append('paymentType', paymentType || 'One-time Payment');
  formData.append('requiresPickup', data.requiresPickup ? 'Yes' : 'No');
  formData.append('photoPermission', data.photoPermission ? 'Yes' : 'No');
  formData.append('checkoutSessionId', checkoutSessionId);
  formData.append('submissionDate', new Date().toISOString());
  formData.append('status', 'pending');

  try {
    const response = await fetch('/', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      console.error('Netlify form submission failed:', response.statusText);
    } else {
      console.log('Successfully submitted to Netlify Forms');
    }
  } catch (error) {
    console.error('Error submitting to Netlify Forms:', error);
  }
}

export async function createEnrollment(
  data: EnrollmentData,
  userId: string,
  checkoutSessionId: string = 'pending',
  programName?: string,
  paymentType?: string
) {
  if (!data.parentName || !data.email || !data.childName || !data.childAge || !data.childSchool || !data.program) {
    throw new Error('Missing required enrollment information');
  }

  const mobileValue = data.mobile && data.mobile.trim() !== '' ? data.mobile : 'Not provided';
  console.log('📱 Mobile value being stored:', mobileValue);

  const { error } = await supabase
    .from('enrollments')
    .insert([
      {
        user_id: userId,
        parent_name: data.parentName,
        email: data.email,
        mobile: mobileValue,
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

  await submitToNetlify(data, checkoutSessionId, programName, paymentType);

  return true;
}

export async function getEnrollmentBySessionId(sessionId: string) {
  const { data, error } = await supabase
    .from('user_enrollments')
    .select('*')
    .eq('checkout_session_id', sessionId)
    .maybeSingle();

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
    // All products are one-time payments
    const mode = 'payment';

    // Create checkout session
    const successUrl = `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${window.location.origin}/enrol`;

    const { url: checkoutUrl } = await createCheckoutSession(
      enrollmentData.program,
      mode,
      accessToken,
      successUrl,
      cancelUrl,
      enrollmentData.email,
      enrollmentData.parentName,
      enrollmentData.childName
    );

    return checkoutUrl;
  } catch (error) {
    console.error('Failed to create enrollment checkout:', error);
    throw error;
  }
}