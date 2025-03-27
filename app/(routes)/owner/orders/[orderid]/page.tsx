'use client'; // Mark this component as a client component

import { useEffect, useState } from 'react';
import { use } from 'react'; // Import the `use` function
import { FetchOrder, updateOrderStatus } from '@/actions/order';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  ArrowLeft,
  FileText,
  Package,
  Printer,
  Truck,
  User,
  UserPlus,
} from 'lucide-react';
import { notFound, useRouter } from 'next/navigation';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';
import { userProfile } from '@/actions/auth';
import { orderDetail } from '@/types/orderType';
import { userType } from '@/types/user';
import { toast } from '@/hooks/use-toast';

export default function OrderPage({
  params,
}: {
  params: Promise<{ orderid: string }>;
}) {
  // Unwrap the `params` Promise using `React.use()`
  const { orderid } = use(params);
  const [order, setOrder] = useState<orderDetail | null>(null);
  const [user, setUser] = useState<userType | null>(null);
  const router = useRouter();
  const [triggerState, setTriggerState] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await FetchOrder(orderid);
        const userData = await userProfile();
        setUser(userData as userType);
        setOrder(response.orderDetails);
      } catch (error) {
        console.error('Error fetching order:', error);
        notFound();
      }
    };

    fetchData();
  }, [orderid, triggerState]);

  console.log('order:', order);

  const handlestatus = async (id: string, status: string) => {
    const data = {
      trxCode: id,
      status: status,
    };
    try {
      const response = await updateOrderStatus({
        userid: user!.id,
        data: data,
      });
      console.log('response of change:', response);
      toast({
        title: 'Status Changed Successfully',
        description: `Transaction ${id} changed to ${status} succesfully `,
        variant: `success`,
      });

      setTriggerState(!triggerState);
    } catch (error) {
      console.error('Error updating order status:', error);
    }

    console.log('status data', data);
  };

  if (!order) {
    return <div>Loading...</div>; // Or some loading spinner
  }

  return (
    <section className="w-full h-dvh md:px-8 py-4 bg-[#F1F2F8]">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-indigo-900">
            Welcome Back, Owner!
          </h1>
          <p className="text-gray-600">Here&apos;s Orders Report</p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center justify-center">
              <div onClick={() => {router.back()}}>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 w-fit h-fit"
                >
                  <ArrowLeft className="w-12 h-12" />
                </Button>
              </div>

              <span className="text-xl font-bold">
                {order.order.transactionCode}
              </span>
            </div>

            <Button className="bg-indigo-900 hover:bg-indigo-800">
              <Printer className="mr-2 h-4 w-4" /> Print
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Package Information */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-md flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Package Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium">Description</p>
                    <p className="text-sm text-gray-500">
                      {order.item.description}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm font-medium">Weight</p>
                      <p className="text-sm text-gray-500">
                        {order.item.weight}kg
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Quantity</p>
                      <p className="text-sm text-gray-500">
                        {order.item.quantity}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Details */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-md flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Order Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm font-medium">Transaction Number</p>
                      <p className="text-sm text-gray-500">
                        {order.order.transactionCode}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Order Date</p>
                      <p className="text-sm text-gray-500">
                        {formatDate(order.order.createdAT)}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm font-medium">Total Price</p>
                      <p className="text-sm text-gray-500">
                        {order.item.totalPrice} birr
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Payment Method</p>
                      <p className="text-sm text-gray-500">
                        {order.order.payment === 1 ? 'Now' : 'On Delivery'}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Delivery Status */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-md flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  Delivery Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <input
                      title="pending"
                      type="radio"
                      id="pending"
                      name="status"
                      value="Pending"
                      checked={order.order.status === 'Pending'}
                      onChange={() =>
                        handlestatus(order.order.transactionCode, 'Pending')
                      }
                    />
                    <Label htmlFor="pending">Pending</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      title="delivered"
                      type="radio"
                      id="delivered"
                      name="status"
                      value="Delivered"
                      checked={order.order.status === 'Delivered'}
                      onChange={() =>
                        handlestatus(order.order.transactionCode, 'Delivered')
                      }
                    />
                    <Label htmlFor="delivered">Delivered</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      title="Picked Up"
                      type="radio"
                      id="pickedup"
                      name="status"
                      value="Picked Up"
                      checked={order.order.status === 'Picked up'}
                      onChange={() =>
                        handlestatus(order.order.transactionCode, 'Picked up')
                      }
                    />
                    <Label htmlFor="pickedup">Picked Up</Label>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Sender Information */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-md flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Sender Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm font-medium">Full Name</p>
                      <p className="text-sm text-gray-500">
                        {order.sender.name}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Phone Number</p>
                      <p className="text-sm text-gray-500">
                        {order.sender.phone}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm font-medium">Address</p>
                      <p className="text-sm text-gray-500">
                        {order.sender.address}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Email</p>
                      <p className="text-sm text-gray-500">
                        {order.sender.email}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Receiver Information */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-md flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Receiver Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm font-medium">Full Name</p>
                      <p className="text-sm text-gray-500">
                        {order.receiver.name}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Phone Number</p>
                      <p className="text-sm text-gray-500">
                        {order.receiver.phone}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm font-medium">Address</p>
                      <p className="text-sm text-gray-500">
                        {order.receiver.address}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Email</p>
                      <p className="text-sm text-gray-500">
                        {order.receiver.email}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Added By */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-md flex items-center gap-2">
                  <UserPlus className="h-5 w-5" />
                  Added By
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm font-medium">Full Name</p>
                      <p className="text-sm text-gray-500">
                        {order.employeeInfo.name}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Phone Number</p>
                      <p className="text-sm text-gray-500">
                        {order.employeeInfo.phone}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm font-medium">Address</p>
                      <p className="text-sm text-gray-500">
                        {order.employeeInfo.location}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Email</p>
                      <p className="text-sm text-gray-500">
                        {order.employeeInfo.email}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
