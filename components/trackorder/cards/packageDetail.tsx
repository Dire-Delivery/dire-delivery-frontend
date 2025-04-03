import { Order } from '@/types/orderType';

import { formatDate } from '@/lib/utils';
import { DetailCard, DetailRow } from './detailCard';

export const PackageDetailsCard = ({ order }: { order: Order }) => (
  <DetailCard title="Package Detail">
    <DetailRow
      label="Transaction Detail"
      value={order.orderDetails.order.transactionCode}
    />
    <DetailRow label="Order date" value={formatDate(order.createdAt)} />
    <DetailRow
      label="Description"
      value={order.orderDetails.item.description}
    />
    <DetailRow label="Weight" value={`${order.orderDetails.item.weight}kg`} />
    <DetailRow label="Quantity" value={order.orderDetails.item.quantity} />
  </DetailCard>
);
