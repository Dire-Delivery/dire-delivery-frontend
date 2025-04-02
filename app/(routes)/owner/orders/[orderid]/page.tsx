'use client';

import { useCallback, useEffect, useState, useMemo, use } from 'react';
import { notFound, useRouter } from 'next/navigation';
import { ArrowLeft, Printer, Truck, User, UserPlus } from 'lucide-react';
import { userProfile } from '@/actions/auth';
import { FetchOrder, updateOrderStatus } from '@/actions/order';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { orderDetail } from '@/types/orderType';
import { userType } from '@/types/user';
import handlePrintDetail from '@/components/order/orderPrintdetail';
import { PackageCard } from '@/components/order/orderDetail/Packagecard';
import { OrderDetailCard } from '@/components/order/orderDetail/orderDetailCard';
import PersonaCard from '@/components/order/orderDetail/PersonaCard';

type OrderPageProps = {
  params: Promise<{ orderid: string }>;
};

const initialUserState: userType = {
  id: '',
  email: '',
  createdAt: '',
  image: '',
  location: '',
  name: '',
  password: '',
  role: '',
  updatedAt: '',
};

export default function OrderPage({ params }: OrderPageProps) {
  const { orderid } = use(params);
  const [order, setOrder] = useState<orderDetail | null>(null);
  const [user, setUser] = useState<userType>(initialUserState);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const [triggerState, setTriggerState] = useState<boolean>(false);

  // Memoized fetch data function
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [orderResponse, userData] = await Promise.all([
        FetchOrder(orderid),
        userProfile(),
      ]);
      console.log('order:', orderResponse);

      setUser(userData as userType);
      setOrder(orderResponse.orderDetails);
    } catch (error) {
      console.error('Error fetching data:', error);
      notFound();
    } finally {
      setLoading(false);
    }
  }, [orderid]);

  useEffect(() => {
    fetchData();
  }, [fetchData, triggerState]);

  const handleStatusChange = useCallback(
    async (id: string, status: string) => {
      if (!user.id) return;

      try {
        await updateOrderStatus({
          userid: user.id,
          data: { trxCode: id, status },
        });

        toast({
          title: 'Status Changed Successfully',
          description: `Transaction ${id} changed to ${status} successfully`,
          variant: 'success',
        });

        setTriggerState((prev) => !prev);
      } catch (error) {
        console.error('Error updating order status:', error);
        toast({
          title: 'Error',
          description: 'Failed to update order status',
          variant: 'destructive',
        });
      }
    },
    [user.id]
  );

  const handleBackClick = useCallback(() => {
    router.back();
  }, [router]);

  const handlePrint = useCallback(() => {
    if (order) {
      handlePrintDetail(order);
    }
  }, [order]);

  // Memoized card components to prevent unnecessary re-renders
  const packageCard = useMemo(
    () => (
      <PackageCard
        description={order?.item.description || ''}
        weight={order?.item.weight || 0}
        quantity={order?.item.quantity || 0}
      />
    ),
    [order]
  );

  const orderDetailsCard = useMemo(
    () => (
      <OrderDetailCard
        transactionCode={order?.order.transactionCode || ''}
        createdAT={order?.order.createdAT || ''}
        totalPrice={order?.item.totalPrice || 0}
        payment={order?.order.payment || 0}
      />
    ),
    [order]
  );

  const deliveryStatusCard = useMemo(
    () => (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-md flex items-center gap-2">
            <Truck className="h-5 w-5" />
            Delivery Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-3">
            {['Pending', 'Delivered', 'Picked-up'].map((status) => (
              <div key={status} className="flex items-center space-x-2">
                <input
                  title="radio"
                  type="radio"
                  id={status.toLowerCase()}
                  name="status"
                  value={status}
                  checked={order?.order.status === status}
                  onChange={() =>
                    order &&
                    handleStatusChange(order.order.transactionCode, status)
                  }
                />
                <Label htmlFor={status.toLowerCase()}>{status}</Label>
              </div>
            ))}
          </form>
        </CardContent>
      </Card>
    ),
    [order, handleStatusChange]
  );

  if (loading) {
    return (
      <section className="w-full h-dvh md:px-8 py-4 bg-[#F1F2F8] flex items-center justify-center">
        <div>Loading order details...</div>
      </section>
    );
  }

  if (!order) {
    return notFound();
  }

  return (
    <section className="w-full h-dvh md:px-8 py-4 bg-[#F1F2F8]">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-indigo-900">
            Welcome Back, {user.name || 'Owner'}!
          </h1>
          <p className="text-gray-600">Here&apos;s Orders Report</p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center justify-center">
              <Button
                variant="ghost"
                className="flex items-center gap-2 w-fit h-fit"
                onClick={handleBackClick}
              >
                <ArrowLeft className="w-12 h-12" />
              </Button>
              <span className="text-xl font-bold">
                {order.order.transactionCode}
              </span>
            </div>

            <Button
              className="bg-indigo-900 hover:bg-indigo-800"
              onClick={handlePrint}
            >
              <Printer className="mr-2 h-4 w-4" /> Print
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packageCard}
            {orderDetailsCard}
            {deliveryStatusCard}
            <PersonaCard
              title="Sender Information"
              Icon={User}
              person={order.sender}
              isEmployee={false}
            />
            <PersonaCard
              title="Receiver Information"
              Icon={User}
              person={order.receiver}
              isEmployee={false}
            />
            <PersonaCard
              title="Added By Information"
              Icon={UserPlus}
              person={order.employeeInfo}
              isEmployee={true}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
