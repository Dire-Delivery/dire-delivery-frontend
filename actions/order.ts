import apiCall from '@/base-api/api';
import { orderTrack } from '@/types/orderTrack';
import { orderStatus, sendOrderType } from '@/types/orderType';

const BaseURL = process.env.NEXT_PUBLIC_API_URL;

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

export const AddOrder = async ({
  data,
  userid,
}: {
  userid: string;
  data: sendOrderType;
}) => {
  console.log('addingData:', data);
  const fetchURl = `${BaseURL}/orders/${userid}/create-order`;
  const response = await apiCall({ url: fetchURl, method: 'POST', data: data });
  console.log('postResponse:', response);
  return response;
};

export const DeleteOrder = async ({
  userid,
  trxCode,
}: {
  userid: string;
  trxCode: string;
}) => {
  const endPoint = `${BaseURL}/orders/${userid}/delete-order/${trxCode}`;
  console.log('delete:', endPoint);
  console.log('trxCode:', trxCode);

  const response = await apiCall({
    url: endPoint,
    method: 'DELETE',
  });
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
