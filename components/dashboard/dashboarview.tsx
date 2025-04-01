'use client';

import { useEffect, useState, useMemo, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { toast } from '@/hooks/use-toast';
import { formatNewDate } from '@/lib/utils';
import { columns } from '@/components/order/owner/column';
import { ColumnDef } from '@tanstack/react-table';
import { transformOrder } from '@/lib/transformOrder';
// Types
import {
  Order,
  TransformedOrder as OriginalTransformedOrder,
} from '@/types/orderType';
import { userType } from '@/types/user';
import { dashboardTotals, locations } from '@/types/dashboard';

// API functions
import {
  DeleteOrder,
  FetchOrder,
  orderByDate,
  statusFilterDate,
} from '@/actions/order';
import { userProfile } from '@/actions/auth';
import { dashboardTotalsAPI, fetchLocations } from '@/actions/dashboard';
import SkeletonTable from './SkeletonTable';
import SkeletonDashCards from './skeletonCards';

// Components
const DataTable = dynamic(
  () =>
    import('@/components/order/owner/orderTable').then((mod) => mod.DataTable),
  {
    loading: () => <SkeletonTable />, // Add a loading skeleton
    ssr: false,
  }
);

const DashCards = dynamic(() => import('@/components/dashboard/cards'), {
  loading: () => <SkeletonDashCards />,
  ssr: false,
});

interface TransformedOrder extends OriginalTransformedOrder {
  id: string;
  addedBy: string;
}

interface OrderApiResponse {
  orders?: Order[];
  totalPage?: number;
  currentPage?: number;
  totalOrders?: number;
  error?: string;
}

export default function Dashboardview() {
  // State management (keeping separate states as in original)
  const [orders, setOrders] = useState<TransformedOrder[] | null>(null);
  const [user, setUser] = useState<userType>({
    id: '',
    email: '',
    createdAt: '',
    image: '',
    location: '',
    name: '',
    password: '',
    role: '',
    updatedAt: '',
  });
  const [pagenumber, setPagenumber] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [triggerstate, setTriggerstate] = useState<boolean>(false);
  const [filterValue, setFilterValue] = useState<string>('All Status');
  const [dashboarTotals, setDashboardTotals] = useState<dashboardTotals>({
    totalAdmins: 0,
    totalEmployees: 0,
    totalOrders: 0,
    totalPending: 0,
    totalDelivered: 0,
    totalPickedup: 0,
  });
  const [orderAmount, setOrderAmount] = useState<number>(0);
  const [locations, setLocations] = useState<locations[]>([]);

  const redirectLink = '/owner/orders';
  const today = useMemo(() => formatNewDate(new Date()), []);

  // Memoized user data
  const { role, name, id: userId } = user;

  // Fetch all data with caching
  const fetchAllData = useCallback(async () => {
    setLoading(true);

    try {
      const [decoded, orderResponse, totalsResponse, locationResponse] =
        await Promise.all([
          userProfile(),
          orderByDate({ userid: user.id!, date: today, pagenumber }),
          dashboardTotalsAPI(user.id),
          fetchLocations(),
        ]);

      // Set user and locations first as they're straightforward
      setUser(decoded as userType);
      setLocations(locationResponse);

      // Handle dashboard totals
      if (totalsResponse) {
        setDashboardTotals(totalsResponse);
      }

      // Handle order response with proper type checking
      const result = orderResponse as OrderApiResponse;

      if (result?.error) {
        console.error('Order fetch error:', result.error);
        setOrders([]);
        return;
      }

      if (result?.orders) {
        setTotalPages(result.totalPage ?? 1);
        setCurrentPage(result.currentPage ?? 1);
        setOrderAmount(result.totalOrders ?? 0);

        setOrders(result.orders.map((order: Order) => transformOrder(order)));
      } else {
        setOrders([]);
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }, [user.id, pagenumber, today]);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData, triggerstate]);

  // Search handler
  const handleSearch = useCallback(async (id: string) => {
    setLoading(true);

    try {
      if (!id) {
        setTriggerstate((prev) => !prev);
        return;
      }

      const response = await FetchOrder(id);

      if (response.error === 'Transaction not found!') {
        setOrders([]);
        setLoading(false);
        return;
      }

      setOrders([transformOrder(response)]);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Delete handler
  const handleDelete = useCallback(
    async (id: string) => {
      try {
        const response = await DeleteOrder({ userid: userId!, trxCode: id });

        if (response.message === 'Order deleted successfully') {
          toast({
            title: 'Deleted Successfully',
            description: `Transaction ${id} Deleted successfully`,
            variant: 'success',
          });

          setOrders((prevItems) =>
            prevItems
              ? prevItems.filter((item) => item.transactionCode !== id)
              : null
          );
          setTriggerstate((prev) => !prev);
        }
      } catch (error) {
        console.error('Delete failed:', error);
      }
    },
    [userId]
  );

  // Filter handler
  const handleFilter = useCallback(
    async (status: string) => {
      setLoading(true);

      try {
        if (status === 'All Status') {
          setFilterValue(status);
          setTriggerstate((prev) => !prev);
          return;
        }

        const response = await statusFilterDate({
          userid: user.id!,
          pagenumber: pagenumber,
          status: status,
          date: today,
        });

        if (response.error === 'No Order could be found!') {
          setFilterValue(status);
          setOrders([]);
          setLoading(false);
          return;
        }

        setFilterValue(status);
        setTotalPages(response.totalPage);
        setCurrentPage(response.currentPage);

        setOrders(response.orders.map((order: Order) => transformOrder(order)));
      } catch (error) {
        console.error('Filter failed:', error);
      } finally {
        setLoading(false);
      }
    },
    [user.id, pagenumber, today]
  );

  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-indigo-900">
            Welcome Back, {name}!
          </h1>
          <p className="text-slate-600">Here&apos;s Your Report</p>
        </div>

        <DashCards dashboarTotals={dashboarTotals} locations={locations} />

        <DataTable
          orderAmount={orderAmount}
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
          data={orders || []}
          totalEntries={orders?.length || 0}
          handleDelete={handleDelete}
          handleSearch={handleSearch}
          handlefilter={handleFilter}
          filterValue={filterValue}
        />
      </div>
    </main>
  );
}
