import { Order } from '@/types/orderType';
import handlePrint from './orderPrint';
type props = {
  currentOrder: Order;
  setShowRecipt: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ConfirmModal({ currentOrder, setShowRecipt }: props) {
  return (
    <section className="fixed inset-0 bg-[#060A87]/20  flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[480px]">
        <div className="flex justify-between items-center mb-4 w-full">
          <h2 className="text-xl text-[#060A87] font-semibold border-b border-[#060A87] pb-2 w-full">
            Order Added Successfully
          </h2>
          <button
            onClick={() => setShowRecipt(false)}
            className="text-black text-xl font-bold"
          >
            &times;
          </button>
        </div>

        {/* Item Info */}
        <section className="w-full h-fit justify-start items-center inline-flex">
          <div className="grow shrink basis-0 px-3 py-6 rounded-sm border border-slate-200 flex-col justify-start items-start gap-3 inline-flex">
            <div className="self-stretch px-3 py-2 justify-start items-center gap-2.5 inline-flex">
              <div className="text-black text-xl font-bold font-['Inter'] leading-tight">
                Order Summary
              </div>
            </div>
            <div className="self-stretch h-[108px] px-6 flex-col justify-start items-start flex">
              <div className="self-stretch px-0.5 py-2 border-b border-gray-500 justify-start items-center gap-4 inline-flex">
                <div className="text-black text-lg font-bold font-['Inter'] leading-tight">
                  Item Details
                </div>
              </div>
              <div className="self-stretch h-[72px] px-1 flex-col justify-start items-start flex">
                <div className="self-stretch h-6 px-1.5 py-0.5 justify-start items-center gap-2.5 inline-flex">
                  <div className="w-[100px] text-black text-sm font-medium font-['Inter'] leading-tight">
                    Description:
                  </div>
                  <div className="grow shrink basis-0 text-zinc-500 text-sm font-medium font-['Inter'] leading-tight">
                    {currentOrder.orderDetails.item.description}
                  </div>
                </div>
                <div className="self-stretch h-6 px-1.5 py-0.5 justify-start items-center gap-2.5 inline-flex">
                  <div className="w-[100px] text-black text-sm font-medium font-['Inter'] leading-tight">
                    Weight
                  </div>
                  <div className="w-40 text-zinc-500 text-sm font-medium font-['Inter'] leading-tight">
                    {currentOrder.orderDetails.item.weight}kg
                  </div>
                </div>
                <div className="self-stretch h-6 px-1.5 py-0.5 justify-start items-center gap-2.5 inline-flex">
                  <div className="w-[100px] text-black text-sm font-medium font-['Inter'] leading-tight">
                    Quantity
                  </div>
                  <div className="w-40 text-zinc-500 text-sm font-medium font-['Inter'] leading-tight">
                    {currentOrder.orderDetails.item.quantity}
                  </div>
                </div>
              </div>
            </div>
            <div className="self-stretch h-[108px] px-6 flex-col justify-start items-start flex">
              <div className="self-stretch px-0.5 py-2 border-b border-gray-500 justify-start items-center gap-4 inline-flex">
                <div className="text-black text-base font-bold font-['Inter'] leading-tight">
                  Sender Detail
                </div>
              </div>
              <div className="self-stretch h-[72px] px-1 flex-col justify-start items-start flex">
                <div className="self-stretch h-6 px-1.5 py-0.5 justify-start items-center gap-2.5 inline-flex">
                  <div className="w-[100px] text-black text-sm font-medium font-['Inter'] leading-tight">
                    Full Name
                  </div>
                  <div className="grow shrink basis-0 text-zinc-500 text-sm font-medium font-['Inter'] leading-tight">
                    {currentOrder.orderDetails.sender.name}
                  </div>
                </div>
                <div className="self-stretch h-6 px-1.5 py-0.5 justify-start items-center gap-2.5 inline-flex">
                  <div className="w-[100px] text-black text-sm font-medium font-['Inter'] leading-tight">
                    Email
                  </div>
                  <div className="w-40 text-zinc-500 text-sm font-medium font-['Inter'] leading-tight">
                    {currentOrder.orderDetails.sender.email}
                  </div>
                </div>
                <div className="self-stretch h-6 px-1.5 py-0.5 justify-start items-center gap-2.5 inline-flex">
                  <div className="w-[100px] text-black text-sm font-medium font-['Inter'] leading-tight">
                    Phone Number
                  </div>
                  <div className="w-40 text-zinc-500 text-sm font-medium font-['Inter'] leading-tight">
                    {currentOrder.orderDetails.sender.phone}
                  </div>
                </div>
                <div className="self-stretch h-6 px-1.5 py-0.5 justify-start items-center gap-2.5 inline-flex">
                  <div className="w-[100px] text-black text-sm font-medium font-['Inter'] leading-tight">
                    Address
                  </div>
                  <div className="w-40 text-zinc-500 text-sm font-medium font-['Inter'] leading-tight">
                    {currentOrder.orderDetails.sender.address}
                  </div>
                </div>
              </div>
            </div>
            <div className="self-stretch h-[110px] px-6 flex-col justify-start items-start gap-0.5 flex">
              <div className="self-stretch px-0.5 py-2 border-b border-gray-500 justify-start items-center gap-2.5 inline-flex">
                <div className="text-black text-base font-bold font-['Inter'] leading-tight">
                  Receiver Detail
                </div>
              </div>
              <div className="self-stretch h-[72px] px-1 flex-col justify-start items-start flex">
                <div className="self-stretch h-6 px-1.5 py-0.5 justify-start items-center gap-2.5 inline-flex">
                  <div className="w-[100px] text-black text-sm font-medium font-['Inter'] leading-tight">
                    Full Name
                  </div>
                  <div className="grow shrink basis-0 text-zinc-500 text-sm font-medium font-['Inter'] leading-tight">
                    {currentOrder.orderDetails.receiver.name}
                  </div>
                </div>
                <div className="self-stretch h-6 px-1.5 py-0.5 justify-start items-center gap-2.5 inline-flex">
                  <div className="w-[100px] text-black text-sm font-medium font-['Inter'] leading-tight">
                    Email
                  </div>
                  <div className="w-40 text-zinc-500 text-sm font-medium font-['Inter'] leading-tight">
                    {currentOrder.orderDetails.receiver.email}
                  </div>
                </div>
                <div className="self-stretch h-6 px-1.5 py-0.5 justify-start items-center gap-2.5 inline-flex">
                  <div className="w-[100px] text-black text-sm font-medium font-['Inter'] leading-tight">
                    Phone Number
                  </div>
                  <div className="w-40 text-zinc-500 text-sm font-medium font-['Inter'] leading-tight">
                    {currentOrder.orderDetails.receiver.phone}
                  </div>
                </div>
                <div className="self-stretch h-6 px-1.5 py-0.5 justify-start items-center gap-2.5 inline-flex">
                  <div className="w-[100px] text-black text-sm font-medium font-['Inter'] leading-tight">
                    Address
                  </div>
                  <div className="w-40 text-zinc-500 text-sm font-medium font-['Inter'] leading-tight">
                    {currentOrder.orderDetails.receiver.address}
                  </div>
                </div>
              </div>
            </div>
            <div className="self-stretch h-[108px] px-6 flex-col justify-start items-start flex">
              <div className="self-stretch px-0.5 py-2 border-b border-gray-500 justify-start items-center gap-2.5 inline-flex">
                <div className="text-black text-base font-bold font-['Inter'] leading-tight">
                  Price Details
                </div>
              </div>
              <div className="self-stretch h-[72px] px-1 flex-col justify-start items-start flex">
                <div className="self-stretch h-6 px-1.5 py-0.5 justify-start items-center gap-2.5 inline-flex">
                  <div className="w-[100px] text-black text-sm font-medium font-['Inter'] leading-tight">
                    Transaction Id:
                  </div>
                  <div className="grow shrink basis-0 text-zinc-500 text-sm font-medium font-['Inter'] leading-tight">
                    {currentOrder.orderDetails.order.transactionCode}
                  </div>
                </div>
                <div className="self-stretch h-6 px-1.5 py-0.5 justify-start items-center gap-2.5 inline-flex">
                  <div className="w-[100px] text-black text-sm font-medium font-['Inter'] leading-tight">
                    Total Price
                  </div>
                  <div className="w-40 text-zinc-500 text-sm font-medium font-['Inter'] leading-tight">
                    {currentOrder.orderDetails.item.totalPrice}
                  </div>
                </div>
                <div className="self-stretch h-6 px-1.5 py-0.5 justify-start items-center gap-2.5 inline-flex">
                  <div className="w-[100px] text-black text-sm font-medium font-['Inter'] leading-tight">
                    Payment Method
                  </div>
                  <div className="w-40 text-zinc-500 text-sm font-medium font-['Inter'] leading-tight">
                    {currentOrder.orderDetails.order.payment === 1
                      ? 'Now'
                      : 'On Delivery'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="flex justify-end sm:justify-end w-full mt-4">
          <button
            onClick={() => handlePrint(currentOrder)}
            type="submit"
            className="text-white w-full text-base bg-[#060A87] py-6"
          >
            Print Receipt
          </button>
        </div>
      </div>
    </section>
  );
}
