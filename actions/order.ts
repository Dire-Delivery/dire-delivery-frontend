import apiCall from '@/base-api/api';
import { orderTrack } from '@/types/orderTrack';
import { orderStatus, sendOrderType } from '@/types/orderType';

const BaseURL = process.env.NEXT_PUBLIC_API_URL;

export const TrackOrder = async ({ id }: orderTrack) => {
  const fetchURl = `${BaseURL}/orders/${id}`;
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
  const response = await apiCall({ url: fetchURl });

  return response;
};

export const FetchOrder = async (id: string) => {
  const fetchURl = `${BaseURL}/orders/${id}`;
  const response = await apiCall({ url: fetchURl });
  return response;
};

export const FetchStatusOrder = async ({
  status,
  userid,
  pagenumber,
}: {
  userid: string;
  status: string;
  pagenumber: number;
}) => {
  const fetchUrl = `${BaseURL}/orders/${userid}/filter-order-status/${status}/${pagenumber}`;
  const response = await apiCall({ url: fetchUrl });
  return response;
};


export const AddOrder = async ({
  data,
  userid,
}: {
  userid: string;
  data: sendOrderType;
}) => {
  const fetchURl = `${BaseURL}/orders/${userid}/create-order`;
  const response = await apiCall({ url: fetchURl, method: 'POST', data: data });
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

  const response = await apiCall({
    url: endPoint,
    method: 'DELETE',
  });
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

  const response = await apiCall({ url: endPoint, method: 'POST', data: data });
  return response;
};

export const orderByDate = async ({
  userid,
  date,
  pagenumber,
}: {
  userid: string;
  date: string;
  pagenumber: number;
}) => {
  const endpoint = `${BaseURL}/orders/${userid}/filter-order-date/${date}/${pagenumber}`;

  const response = await apiCall({ url: endpoint });

  return response;
};

export const statusFilterDate = async ({
  userid,
  date,
  pagenumber,
  status,
}: {
  userid: string;
  date: string;
  pagenumber: number;
  status: string;
}) => {
  const endpoint = `${BaseURL}/orders/${userid}/filter-recent-status-date/${status}/${date}/${pagenumber}`;

  const response = await apiCall({ url: endpoint });

  return response;
};
