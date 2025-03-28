import apiCall from '@/base-api/api';
import { updateProfileType } from '@/types/user';

const BaseUrl = process.env.NEXT_PUBLIC_API_URL;

export const updateProfile = async ({
  userid,
  data,
}: {
  userid: string;
  data: updateProfileType;
}) => {
  const fetchUrl = `${BaseUrl}/users/${userid}/update-user`;

  const response = await apiCall({ url: fetchUrl, method: 'POST', data: data });

  return response;
};
