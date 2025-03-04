import { Order } from '@/types/orderType';
import { orderStatus } from '@/types/orderStatus';
import {
  getStatusIcon,
  getStatusColor,
} from '@/components/trackorder/factories';
import Image from 'next/image';
import Confused from '@/public/images/confused.jpg';
import Loading from '@/components/loading';
import { FiPackage } from 'react-icons/fi';
import { formatDate } from '@/lib/utils';

type props = {
  transactionid: string;
  loading: boolean;
  found: boolean;
  anOrder: Order | null;
  statuses: orderStatus[];
};
export default function tracking({
  transactionid,
  loading,
  found,
  anOrder,
  statuses,
}: props) {
  return (
    <>
      {transactionid ? (
        loading ? (
          <div className="flex justify-center items-center">
            <Loading />
          </div>
        ) : found && anOrder ? (
          <section className="flex flex-col justify-start items-start gap-4 md:gap-8 border-t-2 border-[#060a87] py-6 md:py-12 px-2 lg:px-3  w-full ">
            <h1 className="text-[#090909] text-2xl md:text-3xl  font-bold  leading-[33.60px]">
              Tracking Details
            </h1>
            <div className="flex flex-col lg:flex-row justify-between w-full items-center md:items-start lg:px-0 py-2 gap-12  ">
              <div className="mt-8 relative w-full lg:max-w-fit ">
                {/* Connector Line (Adjusts Direction Based on Screen Size) */}
                <div
                  className="h-full absolute bg-gray-200
                      w-0.5 top-0  bottom-0 left-20
                      md:w-[64.3%] md:h-0.5 md:left-16 md:top-10 md:mx-10 lg:top-0 lg:w-0.5 lg:h-[90%] lg:mt-6 lg:left-10"
                ></div>

                <div className="relative flex flex-col justify-center w-fit items-center px-10 gap-10 lg:flex-col md:flex-row md:gap-16 md:items-center md:justify-center  ">
                  {statuses?.map((status, index) => (
                    <div
                      key={index}
                      className="relative w-full flex md:flex-col md:items-center md:w-fit md:justify-center md:gap-4 lg:flex-row  "
                    >
                      {/* Status Icon */}
                      <div
                        className={`w-20 h-20 rounded-full flex items-center  justify-center z-10  ${getStatusColor(status.type)}`}
                      >
                        {getStatusIcon(status.type)}
                      </div>

                      {/* Status Information */}
                      <div className="flex flex-col w-fit text-center md:text-center md:flex-1 md:justify-center ">
                        <h3 className="font-bold text-xl w-fit ">{`Status: ${status.type}`}</h3>
                        <p className="text-sm text-[#4B5563]">{status.date}</p>
                        <div className="text-base text-[#4B5563] font-semibold">
                          {status.location}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className=" w-full md:w-[680px] lg:w-full flex flex-col gap-8  ">
                <div className="flex flex-col lg:flex-row justify-between gap-6">
                  <div className=" w-full lg:max-w-[400px] px-5 py-4  rounded-sm shadow-[1px_1px_6px_0px_rgba(0,0,0,0.25)] border border-[#f2f2f6] flex-col justify-start">
                    <div className="flex items-center gap-1 py-3 border-b-2 border-black ">
                      <FiPackage className="w-8 h-8" />
                      <h1 className="text-xl font-bold">Package Detail</h1>
                    </div>
                    <div className="py-2 flex flex-col gap-2">
                      <div className="flex w-full justify-between ">
                        <h3 className="font-bold">Transaction Detail</h3>
                        <p className="text-[#71717A]">
                          {anOrder.transactionId}
                        </p>
                      </div>
                      <div className="flex w-full justify-between">
                        <h3 className="font-bold">Order date</h3>
                        <p className="text-[#71717A]">
                          {formatDate(anOrder.createdAt)}
                        </p>
                      </div>
                      <div
                        className="
                      flex
                      w-full
                      justify-between
                  "
                      >
                        <h3 className="font-bold">Description</h3>
                        <p className="text-[#71717A]">{anOrder.description}</p>
                      </div>
                      <div className="flex w-full justify-between">
                        <h3 className="font-bold">Weight</h3>
                        <p className="text-[#71717A]">{anOrder.weight}kg</p>
                      </div>
                      <div
                        className="
                      flex
                      w-full
                      justify-between
                  "
                      >
                        <h3 className="font-bold">Quantity</h3>
                        <p className="text-[#71717A]">{anOrder.quantity}</p>
                      </div>
                    </div>
                  </div>
                  <div className=" w-full lg:max-w-[400px] px-5 py-4  rounded-sm shadow-[1px_1px_6px_0px_rgba(0,0,0,0.25)] border border-[#f2f2f6] flex-col justify-start">
                    <div className="flex items-center gap-1 py-3 border-b-2 border-black ">
                      <FiPackage className="w-8 h-8" />
                      <h1 className="text-xl font-bold">Payment Details</h1>
                    </div>
                    <div className="py-2 flex flex-col gap-2">
                      <div className="flex w-full justify-between ">
                        <h3 className="font-bold">Total Price</h3>
                        <p className="text-[#71717A]">{anOrder.Price}birr</p>
                      </div>
                      <div className="flex w-full justify-between">
                        <h3 className="font-bold">Payment Method</h3>
                        <p className="text-[#71717A]">
                          {anOrder.paymentMethod}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row justify-between gap-6">
                  <div className=" w-full lg:max-w-[400px] px-5 py-4  rounded-sm shadow-[1px_1px_6px_0px_rgba(0,0,0,0.25)] border border-[#f2f2f6] flex-col justify-start">
                    <div className="flex items-center gap-1 py-3 border-b-2 border-black ">
                      <FiPackage className="w-8 h-8" />
                      <h1 className="text-xl font-bold">Sender Detail</h1>
                    </div>
                    <div className="py-2 flex flex-col gap-2">
                      <div className="flex w-full justify-between ">
                        <h3 className="font-bold">Full Name</h3>
                        <p className="text-[#71717A]">{anOrder.senderName}</p>
                      </div>
                      <div className="flex w-full justify-between">
                        <h3 className="font-bold">Email</h3>
                        <p className="text-[#71717A]">{anOrder.senderEmail}</p>
                      </div>
                      <div
                        className="
                      flex
                      w-full
                      justify-between
                  "
                      >
                        <h3 className="font-bold">Phone Number</h3>
                        <p className="text-[#71717A]">
                          {anOrder.senderPhoneNumber}
                        </p>
                      </div>
                      <div className="flex w-full justify-between">
                        <h3 className="font-bold">Address</h3>
                        <p className="text-[#71717A]">
                          {anOrder.senderAddress}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className=" w-full lg:max-w-[400px]  px-5 py-4  rounded-sm shadow-[1px_1px_6px_0px_rgba(0,0,0,0.25)] border border-[#f2f2f6] flex-col justify-start">
                    <div className="flex items-center gap-1 py-3 border-b-2 border-black ">
                      <FiPackage className="w-8 h-8" />
                      <h1 className="text-xl font-bold">Receiver Detail</h1>
                    </div>
                    <div className="py-2 flex flex-col gap-2">
                      <div className="flex w-full justify-between ">
                        <h3 className="font-bold">Full Name</h3>
                        <p className="text-[#71717A]">{anOrder.reciverName}</p>
                      </div>
                      <div className="flex w-full justify-between">
                        <h3 className="font-bold">Email</h3>
                        <p className="text-[#71717A]">{anOrder.reciverEmail}</p>
                      </div>
                      <div
                        className="
                      flex
                      w-full
                      justify-between
                  "
                      >
                        <h3 className="font-bold">Phone Number</h3>
                        <p className="text-[#71717A]">
                          {anOrder.reciverPhoneNumber}
                        </p>
                      </div>
                      <div className="flex w-full justify-between">
                        <h3 className="font-bold">Address</h3>
                        <p className="text-[#71717A]">
                          {anOrder.reciverAddress}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            ;
          </section>
        ) : (
          <section className='className="flex flex-col justify-center items-center gap-2 md:gap-8 border-t-2 border-[#060a87] py-6 md:py-12 px-2 lg:px-3  w-full '>
            <h1 className="w-full text-center font-bold text-xl md:text-2xl lg:text-3xl">
              Order was Not Found!
            </h1>
            <div className="w-full flex justify-center mt-4">
              <Image
                src={Confused}
                alt="Order not Found"
                className="w-[280px] md:w-[360px] lg:w-[400px]"
              />
            </div>
          </section>
        )
      ) : null}
    </>
  );
}
