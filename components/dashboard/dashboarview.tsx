'use client';

import {
  Users,
  Shield,
  Truck,
  Clock,
  Package,
  DollarSign,
  Building,
} from 'lucide-react';
import { Card } from '@/components/ui/card';

import { JSX, useEffect, useState } from 'react';
import {
  Order,
  TransformedOrder as OriginalTransformedOrder,
} from '@/types/orderType';
import {
  DeleteOrder,
  FetchOrder,
  orderByDate,
  statusFilterDate,
} from '@/actions/order';
import { formatNewDate } from '@/lib/utils';

interface TransformedOrder extends OriginalTransformedOrder {
  addedBy: string;
}

import { columns } from '@/components/order/owner/column';
import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '@/components/order/owner/orderTable';
import { userProfile } from '@/actions/auth';
import { userType } from '@/types/user';
import { toast } from '@/hooks/use-toast';
import { dashboardTotals } from '@/types/dashboard';
import { dashboardTotalsAPI } from '@/actions/dashboard';

export default function Dashboardview() {
  const [orders, setOrders] = useState<TransformedOrder[] | null>(null);
  const [pending, setPending] = useState<Order[]>([]);

  const [user, setUser] = useState<userType | null>(null);
  const [pagenumber, setPagenumber] = useState<number>(1);
  const [loading, setloading] = useState<boolean>(true);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [triggerstate, SetTriggerState] = useState<boolean>(false);
  const [filterValue, setFilterValue] = useState<string>('All Status');
  const [dashboarTotals, setdashboardTotals] = useState<dashboardTotals>({
    totalAdmins: 0,
    totalEmployees: 0,
    totalOrders: 0,
    totalPending: 0,
    totalDelivered: 0,
    totalPickedup: 0,
  });
  const [orderAmount, setOrderAmount] = useState<number>(0);

  const redirectLink = '/owner/orders';

  const role = user?.role;
  const name = user?.name;
  const userId = user?.id;

  const today = formatNewDate(new Date());
  console.log('Formatted Date:', today);

  useEffect(() => {
    const fetchOrders = async () => {
      const decoded = await userProfile();
      const user = decoded as userType;
      setUser(user);
      try {
        const orderRespose = await orderByDate({
          userid: user.id!,
          date: today,
          pagenumber: pagenumber,
        });
        const totalsResponse = await dashboardTotalsAPI(user.id);

        console.log('orderRespose:', orderRespose);
        setOrders([]);
        setPending([]);
        const result = orderRespose;
        setTotalPages(result.totalPage);
        setCurrentPage(result.currentPage);
        setloading(false);
        setOrders(
          result.orders.map((result: Order) => ({
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
        setOrderAmount(orderRespose.totalOrders);
        setdashboardTotals(totalsResponse);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrders();
  }, [triggerstate, pagenumber, today]);

  const handleSearch = async (id: string) => {
    setloading(true);
    try {
      if (!id) {
        SetTriggerState(!triggerstate);
      }
      const response = await FetchOrder(id);
      const result = response;
      if (result.error === 'Transaction not found!') {
        setOrders([]);
        setloading(false);
      }
      console.log(result);
      setOrders([
        {
          id: uuidv4(),
          transactionCode: result.orderDetails.order.transactionCode,
          senderName: result.orderDetails.sender?.name || '',
          reciverName: result.orderDetails.receiver?.name || '',
          description: result.orderDetails.item?.description || '',
          weight: result.orderDetails.item?.weight || 0,
          quantity: result.orderDetails.item?.quantity || 0,
          Price: result.orderDetails.item?.totalPrice || 0,
          senderAddress: result.orderDetails.sender?.address || '',
          reciverAddress: result.orderDetails.receiver?.address || '',
          status: result.orderDetails.status?.[0]?.status || 'unknown', // Get first status
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
          addedby: result.orderDetails.employeeInfo?.name || '',
        },
      ]);
      setloading(false);
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
      setOrders((prevItems) =>
        prevItems
          ? prevItems.filter((item) => item.transactionCode !== id)
          : null
      );
    }
    SetTriggerState(!triggerstate);
  };

  const handleFilter = async (status: string) => {
    try {
      if (status === 'All Status') {
        setFilterValue(status);
        SetTriggerState(!triggerstate);
        return;
      }
      const response = await statusFilterDate({
        userid: user!.id,
        pagenumber: pagenumber,
        status: status,
        date: today,
      });
      const result = response;
      console.log('filterResult:', result);
      if (result.error === 'No Order could be found!') {
        setFilterValue(status);
        setOrders([]);
      }
      setTotalPages(response.totalPage);
      setCurrentPage(response.currentPage);
      setFilterValue(status);
      setOrders(
        result.orders.map((result: Order) => ({
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
      setloading(false);
    } catch (error) {
      console.log(error);
    }
  };

  console.log('fetchorders:', orders);
  console.log('fetchPending:', pending);

  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-indigo-900">
            Welcome Back, {name}!
          </h1>
          <p className="text-slate-600">Here&apos;s Your Report</p>
        </div>

        {/* Stats Row 1 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Employees"
            value={dashboarTotals.totalEmployees ?? 0}
            icon={<Users className="h-6 w-6 text-white" />}
            color="bg-blue-400"
          />
          <StatCard
            title="Total Admins"
            value={dashboarTotals.totalAdmins ?? 0}
            icon={<Shield className="h-6 w-6 text-white" />}
            color="bg-purple-400"
          />
          <StatCard
            title="Delivered Items"
            value={dashboarTotals.totalDelivered ?? 0}
            icon={<Truck className="h-6 w-6 text-white" />}
            color="bg-red-400"
          />
          <StatCard
            title="Pending Items"
            value={dashboarTotals.totalPending ?? 0}
            icon={<Clock className="h-6 w-6 text-white" />}
            color="bg-yellow-400"
          />
        </div>

        {/* Stats Row 2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Orders"
            value={dashboarTotals.totalOrders ?? 0}
            icon={<Package className="h-6 w-6 text-white" />}
            color="bg-emerald-400"
          />
          <StatCard
            title="Total Revenue"
            value={0}
            icon={<DollarSign className="h-6 w-6 text-white" />}
            color="bg-indigo-400"
          />
          <StatCard
            title="Cities Delivered"
            value={0}
            icon={<Building className="h-6 w-6 text-white" />}
            color="bg-blue-400"
          />
          <StatCard
            title="Picked Up Items"
            value={dashboarTotals.totalPickedup ?? 0}
            icon={<Users className="h-6 w-6 text-white" />}
            color="bg-purple-400"
          />
        </div>
        {orders ? (
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
            data={orders}
            totalEntries={orders.length}
            handleDelete={handleDelete}
            handleSearch={handleSearch}
            handlefilter={handleFilter}
            filterValue={filterValue}
          />
        ) : (
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
        {/* <DataTable
          columns={
            columns as ColumnDef<
              { transactionId: string; id: string },
              unknown
            >[]
          }
          data={orders}
          totalEntries={orders.length}
          handleDelete={handleDelete}
        /> */}
      </div>
    </main>
  );
}

type StatCard = {
  title: string;
  value: number;
  color: string;
  icon: JSX.Element;
};

function StatCard({ title, value, icon, color }: StatCard) {
  return (
    <Card className="p-6">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-4xl font-bold">{value}</p>
        </div>
        <div className={`rounded-full p-3 ${color}`}>{icon}</div>
      </div>
    </Card>
  );
}
function uuidv4(): string {
  throw new Error('Function not implemented.');
}
