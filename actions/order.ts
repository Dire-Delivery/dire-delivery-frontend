import apiCall from '@/base-api/api';
import { orderTrack } from '@/types/orderTrack';
import { endPoints } from '@/data/endPoints';
import { Order, orderStatus, deleteOrder } from '@/types/orderType';

const BaseURL = process.env.NEXT_PUBLIC_API_URL;
const url = `${BaseURL}/${endPoints.anOrder}`;

export const TrackOrder = async ({ id }: orderTrack) => {
  console.log('id:', id);
  const fetchURl = `${BaseURL}/orders/${id}`;
  console.log('fetchURl:', fetchURl);
  const response = await apiCall({ url: fetchURl });
  return response;
};

export const FetchOrders = async ({
  userid,
  pagenumber,
}: {
  userid: string;
  pagenumber: number;
}) => {
  const fetchURl = `${BaseURL}/orders/${userid}/all-orders/${pagenumber}`;
  console.log(`fetchUrl`, fetchURl);
  const response = await apiCall({ url: fetchURl });
  console.log('serverrespose:', response);

  return response;
};

export const FetchOrder = async (id: string) => {
  console.log('id:', id);
  const fetchURl = `${BaseURL}/orders/${id}`;
  console.log('fetchURl:', fetchURl);
  const response = await apiCall({ url: fetchURl });
  return response;
};

export const AddOrder = async (data: Order) => {
  console.log('addingData:', data);
  const fetchURl = `${url}`;
  const response = await apiCall({ url: fetchURl, method: 'POST', data: data });
  console.log('postResponse:', response);
  return response;
};

export const DeleteOrder = async ({
  userid,
  data,
}: {
  userid: string;
  data: deleteOrder;
}) => {
  const endPoint = `${BaseURL}/orders/${userid}/delete-order`;
  console.log('delete:', endPoint);

  const response = await apiCall({ url: endPoint, method: 'POST', data: data });
  console.log('serverResponse:', response);
  return response;
};

export const updateOrderStatus = async ({
  userid,
  data,
}: {
  userid: string;
  data: orderStatus;
}) => {
  const endPoint = `${BaseURL}/orders/${userid}/update-status`;
  console.log('data:', data);
  console.log('userid:', userid);
  console.log('endpoint:', endPoint);

  const response = await apiCall({ url: endPoint, method: 'POST', data: data });
  console.log('serverResponse:', response);
  return response;
};
