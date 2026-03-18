import axios from 'axios';
import { APP_CONFIG } from '@/core/constants/config';
import { getToken } from '@/core/storage/token-storage';
import { showToast } from '@/ui/molecules/app-toast';

const apiClient = axios.create({
  baseURL: APP_CONFIG.API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  async config => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

apiClient.interceptors.response.use(
  response => {
    const data = response.data;

    if (data && data.success !== undefined && String(data.success) !== 'true') {
      const message = data.message ?? 'Something went wrong';
      showToast({ type: 'error', message });
      return Promise.reject(new Error(message));
    }

    return response;
  },
  error => {
    const message =
      error.response?.data?.message ?? error.message ?? 'Something went wrong';

    showToast({ type: 'error', message });
    return Promise.reject(error);
  },
);

export default apiClient;
