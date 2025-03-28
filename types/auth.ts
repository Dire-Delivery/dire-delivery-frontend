type AddDetailsProps = {
  id: string;
  data: Details;
};

type Details = {
  name: string;
  location: string;
  password: string;
};

type AddUserDetails = {
  name: string;
  email: string;
  phoneNumber: string;
};

type loginDetails = {
  email: string;
  password: string;
};

type ForgotPasswordData = {
  email: string;
};

type ResetPasswordData = {
  password: string;
};

type UpdateUserData = {
  location: string;
  name: string;
  password: string;
  phone: string;
}