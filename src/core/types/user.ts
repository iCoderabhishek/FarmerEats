export type BusinessHour = {
  day: string;
  fromTime: string;
  toTime: string;
};

export type User = {
  id: string;
  email: string;
  fullName: string;
  phoneNumber: string;
  businessName: string;
  informalName: string;
  streetAddress: string;
  city: string;
  zipcode: string;
  mediaUri: string | null;
  businessHours: BusinessHour[];
};
