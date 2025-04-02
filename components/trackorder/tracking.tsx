'use client';

import { Order } from '@/types/orderType';
import { orderStatus } from '@/types/orderStatus';
import Loading from '@/components/loading';
import { NotFoundCard } from './cards/notFoundCard';
import { TrackingDetails } from './cards/trackingDetails';

type TrackingProps = {
  transactionid: string;
  loading: boolean;
  found: boolean;
  anOrder: Order | null;
  statuses: orderStatus[];
};

const Tracking = ({
  transactionid,
  loading,
  found,
  anOrder,
  statuses,
}: TrackingProps) => {
  if (!transactionid) return null;

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  if (!found || !anOrder) {
    return <NotFoundCard />;
  }

  return <TrackingDetails order={anOrder} statuses={statuses} />;
};

export default Tracking;
