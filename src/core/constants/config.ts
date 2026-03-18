import Config from 'react-native-config';

export const APP_CONFIG = {
  API_BASE_URL: Config.API_BASE_URL ?? 'https://sowlab.com/assignment',
} as const;
