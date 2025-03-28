export type AddDetailsProps = {
  id: string;
  data: Details;
};

export type Details = {
  name: string;
  location: string;
  password: string;
};

export type AddUserDetails = {
  name: string;
  email: string;
  phoneNumber: string;
};

export type loginDetails = {
  email: string;
  password: string;
};

export type ForgotPasswordData = {
  email: string;
};

export type ResetPasswordData = {
  password: string;
};

export type UpdateUserData = {
  location: string;
  name: string;
  password: string;
  phone: string;
};
