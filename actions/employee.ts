import apiCall from '@/base-api/api';
import { orderTrack } from '@/types/orderTrack';
import { endPoints } from '@/data/endPoints';
import { Order } from '@/types/orderType';

// const BaseURL = 'http://localhost:3002';
const BaseUrl = process.env.NEXT_PUBLIC_API_URL;

export const FetchEmployees = async (ownerId: string) => {
  const fetchURl = `${BaseUrl}/users/${ownerId}/EMPLOYEE`;
//   console.log(`fetchUrl`, fetchURl);
  const response = await apiCall({ url: fetchURl });
  return response;
};