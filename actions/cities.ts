import apiCall from '@/base-api/api';
import { endPoints } from '@/data/endPoints';
import { city } from '@/types/cities';

const BaseURL = 'http://localhost:3001';
const url = `${BaseURL}/${endPoints.aCity}`;
export const fetchCity = async () => {
  const fetchURl = `${url}`;
  const response = await apiCall({ url: fetchURl });
  return response;
};

export const addCity = async (data: city) => {
  const fetchURl = `${url}`;
  const response = await apiCall({
    url: fetchURl,
    method: 'POST',
    data: data,
  });
  return response
};
