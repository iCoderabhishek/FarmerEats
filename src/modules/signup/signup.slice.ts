import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SignupState } from './signup.types';
import { BusinessHour } from '@/core/types/user';

const initialState: SignupState = {
  step: 1,
  // Step 1
  fullName: '',
  email: '',
  phoneNumber: '',
  password: '',
  // Step 2 - Farm info
  businessName: '',
  informalName: '',
  streetAddress: '',
  city: '',
  zipcode: '',
  // Step 3 - Verification media
  mediaUri: null,
  // Step 4 - Business hours
  businessHours: [],
  loading: false,
  error: null,
};

const signupSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    nextStep(state) {
      state.step += 1;
    },
    prevStep(state) {
      if (state.step > 1) state.step -= 1;
    },
    setStep(state, action: PayloadAction<number>) {
      state.step = action.payload;
    },

    // Step 1
    setAccountInfo(
      state,
      action: PayloadAction<{
        fullName: string;
        email: string;
        phoneNumber: string;
        password: string;
      }>,
    ) {
      Object.assign(state, action.payload);
    },

    // Step 2
    setFarmInfo(
      state,
      action: PayloadAction<{
        businessName: string;
        informalName: string;
        streetAddress: string;
        city: string;
        zipcode: string;
      }>,
    ) {
      Object.assign(state, action.payload);
    },

    // Step 3
    setMediaUri(state, action: PayloadAction<string | null>) {
      state.mediaUri = action.payload;
    },

    // Step 4
    setBusinessHours(state, action: PayloadAction<BusinessHour[]>) {
      state.businessHours = action.payload;
    },

    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    resetSignup() {
      return initialState;
    },
  },
});

export const {
  nextStep,
  prevStep,
  setStep,
  setAccountInfo,
  setFarmInfo,
  setMediaUri,
  setBusinessHours,
  setLoading,
  setError,
  resetSignup,
} = signupSlice.actions;

export default signupSlice.reducer;
