import apiCall from '@/base-api/api';
import { endPoints } from '@/data/endPoints';
import { price } from '@/types/price';

const BaseURL = 'http://localhost:3001';
const url = `${BaseURL}/${endPoints.price}`;

export const fetchPrice = async () => {
  const fetchURl = `${url}`;
  const response = await apiCall({ url: fetchURl });
  return response;
};

export const changePrice = async (data: price) => {
  const response = await apiCall({ url: url, method: 'PATCH', data: data });
  return response;
};
