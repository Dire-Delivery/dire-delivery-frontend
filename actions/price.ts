import apiCall from '@/base-api/api';
import { price } from '@/types/price';

const BaseURL = process.env.NEXT_PUBLIC_API_URL;

export const fetchPrice = async () => {
  const fetchURl = `${BaseURL}/constants`;
  const response = await apiCall({ url: fetchURl });
  return response;
};

export const changePrice = async ({
  data,
  userid,
  constants,
}: {
  data: price;
  userid: string;
  constants: number;
}) => {
  const fetchURl = `${BaseURL}/constants/${userid}/update-constants/${constants}`;

  const response = await apiCall({
    url: fetchURl,
    method: 'POST',
    data: data,
  });
  return response;
};
