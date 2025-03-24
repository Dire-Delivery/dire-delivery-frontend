'use client';

import OrderTabelView from '@/components/order/orderTableView';

export default function Page() {
  const redirectLink = '/owner/orders';

  return <OrderTabelView redirectLink={redirectLink} />;
}
