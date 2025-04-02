import { Order } from '@/types/orderType';
import { orderStatus } from '@/types/orderStatus';
import { StatusTimeline } from './statusTimeline';
import { PackageDetailsCard } from './packageDetail';
import { PaymentDetailsCard } from './paymentDetail';
import { PersonDetailsCard } from './personalDetail';

export const TrackingDetails = ({
  order,
  statuses,
}: {
  order: Order;
  statuses: orderStatus[];
}) => (
  <section className="flex flex-col justify-start items-start gap-4 md:gap-8 border-t-2 border-[#060a87] py-6 md:py-12 px-2 lg:px-3 w-full">
    <h1 className="text-[#090909] text-2xl md:text-3xl font-bold leading-[33.60px]">
      Tracking Details
    </h1>
    <div className="flex flex-col lg:flex-row justify-between w-full items-center md:items-start lg:px-0 py-2 gap-12">
      <StatusTimeline statuses={statuses} />

      <div className="w-full md:w-[680px] lg:w-full flex flex-col gap-8">
        <div className="flex flex-col lg:flex-row justify-between gap-6">
          <PackageDetailsCard order={order} />
          <PaymentDetailsCard order={order} />
        </div>
        <div className="flex flex-col lg:flex-row justify-between gap-6">
          <PersonDetailsCard
            title="Sender Detail"
            person={order.orderDetails.sender}
          />
          <PersonDetailsCard
            title="Receiver Detail"
            person={order.orderDetails.receiver}
          />
        </div>
      </div>
    </div>
  </section>
);
