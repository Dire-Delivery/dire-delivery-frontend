import apiCall from '@/base-api/api';
import { city } from '@/types/cities';

const BaseURL = process.env.NEXT_PUBLIC_API_URL;

export const fetchCity = async () => {
  const fetchURl = `${BaseURL}/orders/pre-order`;
  const response = await apiCall({ url: fetchURl });
  return response;
};

export const addCity = async ({
  data,
  userid,
}: {
  data: city;
  userid: string;
}) => {
  const fetchURl = `${BaseURL}/constants/${userid}/add-location`;
  const response = await apiCall({
    url: fetchURl,
    method: 'POST',
    data: data,
  });
  return response;
};

export const deleteCity = async ({
  code,
  userid,
}: {
  code: string;
  userid: string;
}) => {
  const fetchURl = `${BaseURL}/constants/${userid}/delete-location/${code}`;
  const response = await apiCall({ url: fetchURl, method: 'DELETE' });
  return response;
};
