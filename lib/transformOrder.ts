import { v4 as uuidv4 } from 'uuid';
import {
  Order,
  TransformedOrder as OriginalTransformedOrder,
} from '@/types/orderType';

interface TransformedOrder extends OriginalTransformedOrder {
  id: string;
  addedBy: string;
}
export const transformOrder = (result: Order): TransformedOrder => {
  const statuses = result.orderDetails.status || [];

  const transformStatus = (statusType: string) => {
    const foundStatus = statuses.find(
      (s: { status: string }) => s.status === statusType
    );
    return foundStatus
      ? {
          type: statusType,
          date: foundStatus.date,
          location: foundStatus.location,
        }
      : undefined;
  };

  return {
    id: uuidv4(),
    transactionCode: result.orderDetails.order.transactionCode,
    senderName: result.orderDetails.sender?.name || '',
    reciverName: result.orderDetails.receiver?.name || '',
    description: result.orderDetails.item?.description || '',
    weight: result.orderDetails.item?.weight || 0,
    quantity: result.orderDetails.item?.quantity || 0,
    Price: result.orderDetails.item?.totalPrice || 0,
    senderAddress: result.orderDetails.sender?.address || '',
    reciverAddress: result.orderDetails.receiver?.address || '',
    status: result.orderDetails.order.status,
    createdAt: result.orderDetails.order.createdAT || '',
    updatedAt: result.updatedAt || '',
    paymentMethod: result.orderDetails.order?.payment === 0 ? 'Unpaid' : 'Paid',
    statuses: {
      pending: transformStatus('Pending'),
      delivered: transformStatus('Delivered'),
      pickedUp: transformStatus('Picked up'),
    },
    senderPhoneNumber: result.orderDetails.sender?.phone || '',
    reciverPhoneNumber: result.orderDetails.receiver?.phone || '',
    senderEmail: result.orderDetails.sender?.email || '',
    reciverEmail: result.orderDetails.receiver?.email || '',
    addedby: result.orderDetails.employeeInfo?.name || '',
    addedBy: result.orderDetails.employeeInfo?.name || '',
  };
};
