import apiCall from '@/base-api/api';
import { orderTrack } from '@/types/orderTrack';
import { endPoints } from '@/data/endPoints';
import { Order } from '@/types/orderType';

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

export const DeleteOrder = async (id: string) => {
  console.log('Deleting', id);
  const fetchURl = `${url}/${id}`;
  console.log('Delete URL', fetchURl);

  try {
    const response = await apiCall({ url: fetchURl, method: 'DELETE' });

    // Handle the response based on its type
    if (typeof response === 'string') {
      console.log('Delete response (non-JSON):', response);
      return { success: true, message: response };
    } else {
      console.log('Delete response (JSON):', response);
      return response;
    }
  } catch (error) {
    console.error('Error deleting order:', error);
    return {
      success: false,
      message: 'An error occurred while deleting the order.',
    };
  }
};
