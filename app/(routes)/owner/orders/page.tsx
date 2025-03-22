'use client';
import { useState, useEffect } from 'react';
import {
  Order,
  TransformedOrder as OriginalTransformedOrder,
} from '@/types/orderType';

interface TransformedOrder extends OriginalTransformedOrder {
  addedBy: string;
}
import { DeleteOrder, FetchOrder, FetchOrders } from '@/actions/order';
import { columns } from '@/components/order/owner/column';
import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '@/components/order/owner/orderTable';
import AddOrderDialogue from '@/components/order/addOrderDialogue';
import { city } from '@/types/cities';
import { fetchCity } from '@/actions/cities';
import { Plus } from 'lucide-react';
import { userType } from '@/types/user';
import { v4 as uuidv4 } from 'uuid';
import { userProfile } from '@/actions/auth';
import { useToast } from '@/hooks/use-toast';
export default function Page() {
  const { toast } = useToast();
  const [transformedOrder, setTransformedOrder] = useState<
    TransformedOrder[] | null
  >(null);
  const [cities, setCities] = useState<city[]>([]);
  const [showNewOrderModal, setShowNewOrderModal] = useState<boolean>(false);
  const [showConfirmationModal, setShowConfirmationModal] =
    useState<boolean>(false);
  const [showRecipet, setShowRecipt] = useState<boolean>(false);
  const [user, setUser] = useState<userType | null>(null);
  const [pagenumber, setPagenumber] = useState<number>(1);
  const [loading, setloading] = useState<boolean>(true);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [triggerstate, SetTriggerState] = useState<boolean>(false);
  const role = user?.role;
  const name = user?.name;
  const userId = user?.id;
  const redirectLink = '/owner/orders';

  useEffect(() => {
    const fetchUser = async () => {
      const decoded = await userProfile();
      console.log('user', decoded);
      setUser(decoded as userType);
    };

    fetchUser();
  }, []);

  useEffect(() => {
    setloading(true);
    const fetchOrders = async () => {
      try {
        const response = await FetchOrders({
          userid: userId!,
          pagenumber: pagenumber,
        });
        console.log('respose:', response);
        setTotalPages(response.totalPage);
        setCurrentPage(response.currentPage);
        setTimeout(() => {
          setloading(false);
        }, 2000);
        const result = response.orders;

        console.log('fetched order:', result);

        setTransformedOrder(
          result.map((result: Order) => ({
            id: uuidv4(),
            transactionCode: result.orderDetails.order.transactionCode, // Use transactionCode instead of orderId
            senderName: result.orderDetails.sender?.name || '',
            reciverName: result.orderDetails.receiver?.name || '',
            description: result.orderDetails.item?.description || '',
            weight: result.orderDetails.item?.weight || 0,
            quantity: result.orderDetails.item?.quantity || 0,
            Price: result.orderDetails.item?.totalPrice || 0,
            senderAddress: result.orderDetails.sender?.address || '',
            reciverAddress: result.orderDetails.receiver?.address || '',
            status: result.orderDetails.order.status || 'unknown', // Get first status
            createdAt: result.orderDetails.order.createdAT || '',
            updatedAt: result.updatedAt || '',
            paymentMethod:
              result.orderDetails.order?.payment === 0 ? 'Unpaid' : 'Paid', // Adjust payment method logic
            statuses: {
              pending: result.orderDetails.status?.find(
                (s: { status: string }) => s.status === 'Pending'
              )
                ? {
                    type: 'Pending',
                    date: result.orderDetails.status.find(
                      (s: { status: string }) => s.status === 'Pending'
                    )!.date,
                    location: result.orderDetails.status.find(
                      (s: { status: string }) => s.status === 'Pending'
                    )!.location,
                  }
                : undefined,
              delivered: result.orderDetails.status?.find(
                (s: { status: string }) => s.status === 'Delivered'
              )
                ? {
                    type: 'Delivered',
                    date: result.orderDetails.status.find(
                      (s: { status: string }) => s.status === 'Delivered'
                    )!.date,
                    location: result.orderDetails.status.find(
                      (s: { status: string }) => s.status === 'Delivered'
                    )!.location,
                  }
                : undefined,
              pickedUp: result.orderDetails.status?.find(
                (s: { status: string }) => s.status === 'Picked up'
              )
                ? {
                    type: 'Picked up',
                    date: result.orderDetails.status.find(
                      (s: { status: string }) => s.status === 'Picked up'
                    )!.date,
                    location: result.orderDetails.status.find(
                      (s: { status: string }) => s.status === 'Picked up'
                    )!.location,
                  }
                : undefined,
            },
            senderPhoneNumber: result.orderDetails.sender?.phone || '',
            reciverPhoneNumber: result.orderDetails.receiver?.phone || '',
            senderEmail: result.orderDetails.sender?.email || '',
            reciverEmail: result.orderDetails.receiver?.email || '',
            addedBy: result.orderDetails.employeeInfo?.name || '',
          }))
        );
      } catch (error) {
        setTimeout(() => {
          setloading(false);
        }, 1000);
        console.log(error);
      }
    };
    fetchOrders();
  }, [userId, pagenumber, triggerstate]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetchCity();
        console.log('cities:', response);
        setCities(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCities();
  }, []);

  const handleSearch = async (id: string) => {
    setloading(true);
    try {
      const response = await FetchOrder(id);
      const result = response;
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id: string) => {
    console.log('about to delete:', id);
    console.log('trxcode:', id);
    const response = await DeleteOrder({ userid: userId!, trxCode: id });
    if (response.message === 'Order deleted successfully') {
      toast({
        title: 'Deleted Successfully',
        description: `Transaction ${id} Deleted succesfully `,
        variant: `success`,
      });
      setTransformedOrder((prevItems) =>
        prevItems
          ? prevItems.filter((item) => item.transactionCode !== id)
          : null
      );
    }
    SetTriggerState(!triggerstate);
  };

  // console.log('city:', cities);
  // console.log('user', user?.data);
  // console.log(`orders:`, orders);
  // console.log('orderArray:', orderTable);
  // console.log('orderLength');
  // console.log('orderLength', orderTable ? orderTable.length : 0);
  console.log('transformedOrder:', transformedOrder);
  console.log('totalPages:', totalPages);
  console.log('currenPage:', currentPage);

  return (
    <section className="w-full px-2 md:px-8 py-4 bg-[#F1F2F8] h-full">
      {/* Welcome Section */}
      <div className="h-fit justify-start items-center gap-9 inline-flex">
        <div className="flex-col justify-start items-start gap-2 inline-flex">
          <div className="self-stretch text-[#060A87] text-2xl md:text-3xl font-extrabold font-['Manrope'] leading-[36px]">
            Welcome Back, {name}!
          </div>
          <div className="self-stretch text-[#495d85] text-sm md:text-base font-extrabold font-['Manrope'] leading-tight">
            Here’s your Orders Report
          </div>
        </div>
      </div>
      <section className=" w-full border px-2 md:px-6 py-2 mt-3 bg-white rounded-2xl flex-col justify-between items-start inline-flex overflow-hidden">
        <div className="w-full flex justify-between items-center mt-4 px-2 ">
          <h1 className="text-2xl font-bold">Orders</h1>
          <button
            onClick={() => setShowNewOrderModal(true)}
            className="bg-blue-600 text-white px-2 md:px-4 py-1 md:py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 text-sm md:text-base"
          >
            <Plus className="w-4 md:h-5 md:w-5" />
            Add New
            <p className="hidden md:block">Order</p>
          </button>
        </div>
        <AddOrderDialogue
          showNewOrderModal={showNewOrderModal}
          setShowNewOrderModal={setShowNewOrderModal}
          showConfirmationModal={showConfirmationModal}
          setShowConfirmationModal={setShowConfirmationModal}
          cities={cities}
          showRecipet={showRecipet}
          setShowRecipt={setShowRecipt}
        />
        {transformedOrder ? (
          <DataTable
            loading={loading}
            redirectLink={redirectLink}
            totalPages={totalPages}
            setTotalPages={setTotalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            pagenumber={pagenumber}
            setPagenumber={setPagenumber}
            role={role!}
            name={name!}
            columns={
              columns as ColumnDef<
                { transactionCode: string; id: string; addedBy: string },
                unknown
              >[]
            }
            data={transformedOrder}
            totalEntries={transformedOrder.length}
            handleDelete={handleDelete}
            handleSearch={handleSearch}
          />
        ) : (
          <DataTable
            loading={loading}
            redirectLink={redirectLink}
            totalPages={totalPages}
            setTotalPages={setTotalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            pagenumber={pagenumber}
            setPagenumber={setPagenumber}
            role={role!}
            name={name!}
            columns={
              columns as ColumnDef<
                { transactionCode: string; id: string; addedBy: string },
                unknown
              >[]
            }
            data={[]}
            totalEntries={0}
            handleDelete={handleDelete}
            handleSearch={handleSearch}
          />
        )}
      </section>
    </section>
  );
}
