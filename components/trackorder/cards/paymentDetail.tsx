import { Order } from '@/types/orderType';
import { DetailCard, DetailRow } from './detailCard';

export const PaymentDetailsCard = ({ order }: { order: Order }) => (
  <DetailCard title="Payment Details">
    <DetailRow
      label="Total Price"
      value={`${order.orderDetails.item.totalPrice}birr`}
    />
    <DetailRow
      label="Payment Method"
      value={order.orderDetails.order.payment === 1 ? 'Now' : 'On Delivery'}
    />
  </DetailCard>
);
