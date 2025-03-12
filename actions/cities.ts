import apiCall from '@/base-api/api';
import { endPoints } from '@/data/endPoints';

const BaseURL = 'http://localhost:3001';
const url = `${BaseURL}/${endPoints.aCity}`;
export const fetchCity = async () => {
  const fetchURl = `${url}`;
  const response = await apiCall({ url: fetchURl });
  return response;
};
