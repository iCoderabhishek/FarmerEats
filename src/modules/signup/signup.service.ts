import apiClient from '@/core/api/api-client';
import { ENDPOINTS } from '@/core/constants/endpoints';
import { saveToken } from '@/core/storage/token-storage';
import { AppDispatch, RootState } from '@/app/store';
import { setLoading, setError } from './signup.slice';

const DAY_MAP: Record<string, string> = {
  M: 'mon',
  T: 'tue',
  W: 'wed',
  Th: 'thu',
  F: 'fri',
  S: 'sat',
  Su: 'sun',
};

function buildBusinessHours(
  selectedDays: string[],
  selectedSlots: string[],
): Record<string, string[]> {
  const hours: Record<string, string[]> = {};
  for (const day of selectedDays) {
    const key = DAY_MAP[day] ?? day.toLowerCase();
    hours[key] = [...selectedSlots];
  }
  return hours;
}

interface SignupExtras {
  selectedDays: string[];
  selectedSlots: string[];
}

export const registerUser =
  (extras: SignupExtras) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(setLoading(true));
    dispatch(setError(null));

    try {
      const { signup } = getState();
      const businessHours = buildBusinessHours(
        extras.selectedDays,
        extras.selectedSlots,
      );

      const body = {
        full_name: signup.fullName,
        email: signup.email,
        phone: signup.phoneNumber,
        password: signup.password,
        role: 'farmer',
        business_name: signup.businessName,
        informal_name: signup.informalName,
        address: signup.streetAddress,
        city: signup.city,
        state: signup.state,
        zip_code: signup.zipcode,
        registration_proof: signup.mediaUri ?? '',
        business_hours: businessHours,
        device_token: 'dummy_device_token',
        type: 'email',
        social_id: '',
      };

      const { data } = await apiClient.post(ENDPOINTS.REGISTER, body);

      if (String(data.success) === 'true') {
        await saveToken(data.token);
      }

      return data;
    } catch {
      dispatch(setError('Registration failed. Please try again.'));
    } finally {
      dispatch(setLoading(false));
    }
  };
