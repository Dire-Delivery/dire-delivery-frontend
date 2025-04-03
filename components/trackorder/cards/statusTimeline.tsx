import { orderStatus } from '@/types/orderStatus';
import {
  getStatusIcon,
  getStatusColor,
} from '@/components/trackorder/factories';
import { formatTrackDate } from '@/lib/utils';

export const StatusTimeline = ({ statuses }: { statuses: orderStatus[] }) => (
  <div className="mt-8 relative w-full lg:max-w-fit">
    {/* Connector Line */}
    <div className="h-full absolute bg-gray-200 w-0.5 top-0 bottom-0 left-20 md:w-[64.3%] md:h-0.5 md:left-16 md:top-10 md:mx-10 lg:top-0 lg:w-0.5 lg:h-[90%] lg:mt-6 lg:left-10"></div>

    <div className="relative flex flex-col justify-center w-fit items-center px-10 gap-10 lg:flex-col md:flex-row md:gap-16 md:items-center md:justify-center">
      {statuses?.map((status, index) => (
        <StatusItem key={index} status={status} />
      ))}
    </div>
  </div>
);

const StatusItem = ({ status }: { status: orderStatus }) => (
  <div className="relative w-full flex md:flex-col md:items-center md:w-fit md:justify-center md:gap-4 lg:flex-row">
    <div
      className={`w-20 h-20 rounded-full flex items-center justify-center z-10 ${getStatusColor(status.status)}`}
    >
      {getStatusIcon(status.status)}
    </div>
    <div className="flex flex-col w-fit text-center md:text-center md:flex-1 md:justify-center">
      <h3 className="font-bold text-xl w-fit">{`Status: ${status.status}`}</h3>
      <p className="text-sm text-[#4B5563]">{formatTrackDate(status.date)}</p>
      <div className="text-base text-[#4B5563] font-semibold">
        {status.location}
      </div>
    </div>
  </div>
);
