'use client';

import OrderTabelView from '@/components/order/orderTableView';

export default function Page() {
  const redirectLink = '/admin/orders';

  return <OrderTabelView redirectLink={redirectLink} />;
}
