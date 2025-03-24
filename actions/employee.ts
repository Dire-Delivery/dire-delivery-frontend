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
  console.log("the employees", response)
  return response;
};

export const PromoteEmployee = async (ownerId: string ,employeeId: string) => {
  const fetchURl = `${BaseUrl}/users/${ownerId}/change-role`;
  const response = await apiCall({ url: fetchURl, method: 'POST', data: {userId: employeeId, role: "ADMIN"} });
  return response;
};

export const DeletePerson = async (ownerId: string ,personId: string) => {
  const fetchURl = `${BaseUrl}/users/${ownerId}/delete-user/${personId}`;
  const response = await apiCall({ url: fetchURl, method: 'Delete' });
  return response;
};

export const FindPerson = async (ownerId: string ,personId: string) => {
  const fetchURl = `${BaseUrl}/users/${ownerId}/find-one/${personId}`;
  const response = await apiCall({ url: fetchURl });
  return response;
};
