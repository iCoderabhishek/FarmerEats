import { BusinessHour } from '@/core/types/user';

export interface SignupState {
  step: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
  businessName: string;
  informalName: string;
  streetAddress: string;
  city: string;
  state: string;
  zipcode: string;
  mediaUri: string | null;
  businessHours: BusinessHour[];
  loading: boolean;
  error: string | null;
}
