import { FetchOrder } from '@/actions/order';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@radix-ui/react-radio-group';
import {
  ArrowLeft,
  FileText,
  Package,
  Printer,
  Truck,
  User,
  UserPlus,
} from 'lucide-react';
import { notFound } from 'next/navigation';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';

export default async function OrderPage({
  params,
}: {
  params: Promise<{ orderid: string }>
}) {
  const { orderid } = await params
  const id = orderid;
  console.log(id);

  const response = await FetchOrder(id);
  const order = response[0];
  console.log(order);

  if (!order) return notFound(); // Handles cases where the order isn't found

  return (
    <section className="w-full h-dvh px-8 py-4 bg-[#F1F2F8]">
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
              <Link href={`/owner/orders`}>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 w-fit h-fit"
                >
                  <ArrowLeft className="w-12 h-12" />
                </Button>
              </Link>

              <span className="text-xl font-bold">{order.transactionId}</span>
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
                    <p className="text-sm text-gray-500">{order.description}</p>
                  </div>
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm font-medium">Weight</p>
                      <p className="text-sm text-gray-500">{order.weight}kg</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Quantity</p>
                      <p className="text-sm text-gray-500">{order.quantity}</p>
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
                        {order.transactionId}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Order Date</p>
                      <p className="text-sm text-gray-500">
                        {formatDate(order.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm font-medium">Total Price</p>
                      <p className="text-sm text-gray-500">
                        {order.Price} birr
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Payment Method</p>
                      <p className="text-sm text-gray-500">
                        {order.paymentMethod}
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
                <RadioGroup className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="pending" id="pending" />
                    <Label htmlFor="pending">Pending</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="delivered" id="delivered" />
                    <Label htmlFor="delivered">Delivered</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="pickedup" id="pickedup" />
                    <Label htmlFor="pickedup">Picked Up</Label>
                  </div>
                </RadioGroup>
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
                        {order.senderName}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Phone Number</p>
                      <p className="text-sm text-gray-500">
                        {order.senderPhoneNumber}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm font-medium">Address</p>
                      <p className="text-sm text-gray-500">
                        {order.senderAddress}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Email</p>
                      <p className="text-sm text-gray-500">
                        {order.senderEmail}
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
                        {order.reciverName}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Phone Number</p>
                      <p className="text-sm text-gray-500">
                        {order.reciverPhoneNumber}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm font-medium">Address</p>
                      <p className="text-sm text-gray-500">
                        {order.reciverAddress}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Email</p>
                      <p className="text-sm text-gray-500">
                        {order.reciverEmail}
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
                      <p className="text-sm text-gray-500">{order.addedBy}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Phone Number</p>
                      <p className="text-sm text-gray-500">1</p>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm font-medium">Address</p>
                      <p className="text-sm text-gray-500">Addis Ababa</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Email</p>
                      <p className="text-sm text-gray-500">
                        jhonmydoe@gmail.com
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
