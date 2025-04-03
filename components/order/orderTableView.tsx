'use client';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { TransformedOrder as OriginalTransformedOrder } from '@/types/orderType';
import {
  DeleteOrder,
  FetchOrder,
  FetchOrders,
  FetchStatusOrder,
} from '@/actions/order';
import { columns } from '@/components/order/owner/column';
import { ColumnDef } from '@tanstack/react-table';
// import { DataTable } from '@/components/order/owner/orderTable';
import AddOrderDialogue from '@/components/order/addOrderDialogue';
import { city } from '@/types/cities';
import { fetchCity } from '@/actions/cities';
import { Plus } from 'lucide-react';
// import { v4 as uuidv4 } from 'uuid';
import { useToast } from '@/hooks/use-toast';
import { userProfile } from '@/actions/auth';
import { userType } from '@/types/user';
import dynamic from 'next/dynamic';
import SkeletonTable from '../dashboard/SkeletonTable';
import { transformOrder } from '@/lib/transformOrder';
import Loading from '../loading';

interface TransformedOrder extends OriginalTransformedOrder {
  addedBy: string;
}

type Props = {
  redirectLink: string;
};
const DataTable = dynamic(
  () =>
    import('@/components/order/owner/orderTable').then((mod) => mod.DataTable),
  {
    loading: () => <SkeletonTable />, // Add a loading skeleton
    ssr: false,
  }
);

export default function OrderTableView({ redirectLink }: Props) {
  const { toast } = useToast();
  const [transformedOrder, setTransformedOrder] = useState<
    TransformedOrder[] | null
  >(null);
  const [cities, setCities] = useState<city[]>([]);
  const [showNewOrderModal, setShowNewOrderModal] = useState<boolean>(false);
  const [showConfirmationModal, setShowConfirmationModal] =
    useState<boolean>(false);
  const [showRecipet, setShowRecipt] = useState<boolean>(false);
  const [pagenumber, setPagenumber] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [triggerstate, setTriggerState] = useState<boolean>(false);
  const [user, setUser] = useState<userType | null>(null);
  const [filterValue, setFilterValue] = useState<string>('All Status');
  const [orderAmount, setOrderAmount] = useState<number>(0);

  // Memoized user data fetch
  const fetchUserData = useCallback(async () => {
    const decoded = await userProfile();
    const user = decoded as userType;
    setUser(user);
    return user;
  }, []);

  // Memoized cities fetch
  const fetchCitiesData = useCallback(async () => {
    const response = await fetchCity();
    setCities(response.locations);
  }, []);

  // Memoized orders fetch
  const fetchOrdersData = useCallback(
    async (user: userType, page: number, status?: string) => {
      try {
        const response =
          status && status !== 'All Status'
            ? await FetchStatusOrder({
                userid: user.id,
                pagenumber: page,
                status,
              })
            : await FetchOrders({ userid: user.id, pagenumber: page });

        console.log('response:', response);

        if (response.message !== 'Route not found') {
          setLoading(false);
          setTotalPages(response.totalPage);
          setCurrentPage(response.currentPage);
          setOrderAmount(response.totalOrders);

          if (response.orders) {
            return response.orders.map(transformOrder);
          }
        }
        return [];
      } catch (error) {
        console.error('Error fetching orders:', error);
        setLoading(false);
        return null;
      }
    },
    []
  );

  // Combined data fetching effect
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const user = await fetchUserData();
      if (!user) return;

      await fetchCitiesData();
      const orders = await fetchOrdersData(
        user,
        pagenumber,
        filterValue === 'All Status' ? undefined : filterValue
      );
      setTransformedOrder(orders);
    };

    loadData();
  }, [
    pagenumber,
    triggerstate,
    showRecipet,
    filterValue,
    fetchUserData,
    fetchCitiesData,
    fetchOrdersData,
  ]);

  const handleSearch = useCallback(async (id: string) => {
    setLoading(true);
    try {
      if (!id) {
        setTriggerState((prev) => !prev);
        return;
      }

      const response = await FetchOrder(id);
      setTransformedOrder([transformOrder(response)]);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleFilter = useCallback(
    async (status: string) => {
      setFilterValue(status);
      if (!user) return;

      setLoading(true);
      try {
        const orders = await fetchOrdersData(user, pagenumber, status);
        setTransformedOrder(orders || []);
      } catch (error) {
        console.error('Filter error:', error);
      } finally {
        setLoading(false);
      }
    },
    [user, pagenumber, fetchOrdersData]
  );

  const handleDelete = useCallback(
    async (id: string) => {
      if (!user) return;

      const response = await DeleteOrder({ userid: user.id, trxCode: id });
      if (response.message === 'Order deleted successfully') {
        toast({
          title: 'Deleted Successfully',
          description: `Transaction ${id} Deleted successfully`,
          variant: 'success',
        });
        setTransformedOrder((prev) =>
          prev ? prev.filter((item) => item.transactionCode !== id) : null
        );
      }
      setTriggerState((prev) => !prev);
    },
    [user, toast]
  );

  const memoizedColumns = useMemo(
    () =>
      columns as ColumnDef<
        { transactionCode: string; id: string; addedBy: string },
        unknown
      >[],
    []
  );

  if (!user) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loading />
      </div>
    );
  }
  console.log('trasformed:', transformedOrder);

  return (
    <section className="w-full px-2 md:px-8 py-4 bg-[#F1F2F8] h-full">
      {/* Welcome Section */}
      <div className="h-fit justify-start items-center gap-9 inline-flex">
        <div className="flex-col justify-start items-start gap-2 inline-flex">
          <div className="self-stretch text-[#060A87] text-2xl md:text-3xl font-extrabold font-['Manrope'] leading-[36px]">
            Welcome Back, {user.name}!
          </div>
          <div className="self-stretch text-[#495d85] text-sm md:text-base font-extrabold font-['Manrope'] leading-tight">
            Here&apos;s your Orders Report
          </div>
        </div>
      </div>

      <section className="w-full border px-2 md:px-6 py-2 mt-3 bg-white rounded-2xl flex-col justify-between items-start inline-flex overflow-hidden">
        <div className="w-full flex justify-between items-center mt-4 px-2">
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
          userId={user.id}
          showNewOrderModal={showNewOrderModal}
          setShowNewOrderModal={setShowNewOrderModal}
          showConfirmationModal={showConfirmationModal}
          setShowConfirmationModal={setShowConfirmationModal}
          cities={cities}
          showRecipet={showRecipet}
          setShowRecipt={setShowRecipt}
          triggerstate={triggerstate}
          SetTriggerState={setTriggerState}
        />

        <DataTable
          orderAmount={orderAmount}
          filterValue={filterValue}
          handlefilter={handleFilter}
          loading={loading}
          redirectLink={redirectLink}
          totalPages={totalPages}
          setTotalPages={setTotalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pagenumber={pagenumber}
          setPagenumber={setPagenumber}
          role={user.role}
          name={user.name}
          columns={memoizedColumns}
          data={transformedOrder || []}
          totalEntries={transformedOrder?.length || 0}
          handleDelete={handleDelete}
          handleSearch={handleSearch}
        />
      </section>
    </section>
  );
}
