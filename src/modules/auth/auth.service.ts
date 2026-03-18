import apiClient from '@/core/api/api-client';
import { ENDPOINTS } from '@/core/constants/endpoints';
import { saveToken } from '@/core/storage/token-storage';
import { AppDispatch } from '@/app/store';
import { setLoading, loginSuccess, loginFailure } from './auth.slice';

interface LoginPayload {
  email: string;
  password: string;
  role?: string;
  device_token?: string;
  type?: string;
  social_id?: string;
}

interface VerifyOtpPayload {
  otp: string;
}

interface ResetPasswordPayload {
  token: string;
  password: string;
  cpassword: string;
}

export const loginUser =
  (payload: LoginPayload) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const body = {
        role: 'farmer',
        device_token: 'dummy_device_token',
        type: 'email',
        social_id: '',
        ...payload,
      };
      const { data } = await apiClient.post(ENDPOINTS.LOGIN, body);

      if (data.success === 'true') {
        await saveToken(data.token);
        dispatch(
          loginSuccess({
            user: data.user ?? ({ id: '', email: payload.email } as any),
            token: data.token,
          }),
        );
      }

      return data;
    } catch {
      dispatch(loginFailure('Login failed. Please try again.'));
    } finally {
      dispatch(setLoading(false));
    }
  };

export const verifyOtp = async (payload: VerifyOtpPayload) => {
  const { data } = await apiClient.post(ENDPOINTS.VERIFY_OTP, payload);
  return data;
};

export const resetPassword = async (payload: ResetPasswordPayload) => {
  const { data } = await apiClient.post(ENDPOINTS.RESET_PASSWORD, payload);
  return data;
};
