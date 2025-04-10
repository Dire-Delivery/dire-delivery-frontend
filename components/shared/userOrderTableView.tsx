'use client';
import { userProfile, userToken } from '@/actions/auth';
import {
  DemoteEmployee,
  FindOrdersByPerson,
  FindPerson,
  PromoteEmployee,
} from '@/actions/employee';
import { DeleteOrder, FetchOrder, FetchStatusOrder } from '@/actions/order';
import { columns } from '@/components/order/owner/column';
import { DataTable } from '@/components/order/owner/orderTable';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { User } from '@/types/employeeType';
import {
  Order,
  TransformedOrder as OriginalTransformedOrder,
} from '@/types/orderType';
import { userType } from '@/types/user';
import { ColumnDef } from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import { FaUserLarge } from 'react-icons/fa6';
import { LuX } from 'react-icons/lu';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '../ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { OrderType } from '@/types/orderStatus';

interface TransformedOrder extends OriginalTransformedOrder {
  addedBy: string;
}

type props = {
  redirectLink: string;
  userId: string;
};

export default function UserOrderTabelView({ redirectLink, userId }: props) {
  const { toast } = useToast();
  const [transformedOrder, setTransformedOrder] = useState<
    TransformedOrder[] | null
  >(null);
  const [pagenumber, setPagenumber] = useState<number>(1);
  const [loading, setloading] = useState<boolean>(true);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [triggerstate, SetTriggerState] = useState<boolean>(false);
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
  const [personInfo, setPersonInfo] = useState<User>();
  const [showChangeRoleModal, setShowChangeRoleModal] = useState(false);
  const [filterValue, setFilterValue] = useState<string>('All Status');
  const [orderAmount, setOrderAmount] = useState<number>(0);

  const role = user?.role;
  const name = user?.name;
  const myUserId = user?.id;

  useEffect(() => {
    const fetchOrders = async () => {
      const decoded = await userProfile();
      const user = decoded as userType;
      setUser(user);

      if (!user) {
        return;
      }
      try {
        const response = await FindOrdersByPerson(
          decoded.id,
          userId,
          pagenumber
        );

        if (response.message !== 'Route not found') {
          setloading(false);
          setTotalPages(response.totalPage);
          setCurrentPage(response.currentPage);
          const result = response.orders;
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
          setOrderAmount(response.totalOrders);
        }
      } catch (error) {
        setTimeout(() => {
          setloading(false);
        }, 1000);
        console.log(error);
      }
    };
    fetchOrders();
  }, [pagenumber, triggerstate, userId]);

  useEffect(() => {
    const fetchPerson = async () => {
      try {
        const userData = await userProfile();
        const token = await userToken();
        if (userData && token) {
          const data = await FindPerson(userData.id, userId);
          if (data) {
            setPersonInfo(data);
          }
        } else {
          throw new Error('userData or token not found');
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchPerson();
  }, [showChangeRoleModal, userId]);

  const handleSearch = async (id: string) => {
    setloading(true);
    try {
      if (!id) {
        SetTriggerState(!triggerstate);
      }
      const response = await FetchOrder(id);
      const result = response;
      setTransformedOrder([
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
  const handleFilter = async (status: string) => {
    try {
      if (status === 'All Status') {
        setFilterValue(status);
        SetTriggerState(!triggerstate);
        return;
      }
      const response = await FetchStatusOrder({
        userid: user!.id,
        pagenumber: pagenumber,
        status: status,
      });
      const result = response;
      if (result.error === 'No Order could be found!') {
        setFilterValue(status);
        setTransformedOrder([]);
      }
      setTotalPages(response.totalPage);
      setCurrentPage(response.currentPage);
      setFilterValue(status);
      const filteredData = result.orders
        ?.filter(
          (order: OrderType) =>
            order.orderDetails.employeeInfo.email == personInfo?.email
        )
        .map((result: Order) => ({
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
        }));
      setTransformedOrder(filteredData);
      setloading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (id: string) => {
    const response = await DeleteOrder({ userid: myUserId!, trxCode: id });
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

  const changeRole = async () => {
    try {
      const userData = await userProfile();
      const token = await userToken();
      if (userData && token && personInfo) {
        if (personInfo.role == 'ADMIN') {
          await DemoteEmployee(userData.id, userId);
        } else {
          await PromoteEmployee(userData.id, userId);
        }

        setShowChangeRoleModal(false);
      } else {
        throw new Error('userData or token not found');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="w-full px-2 md:px-8 py-8 bg-[#F1F2F8] h-full">
      {showChangeRoleModal && (
        <div className="fixed inset-0 bg-[#060A87] bg-opacity-30 flex items-center justify-center z-50">
          <Card className="relative px-8">
            <CardHeader>
              <LuX
                className="absolute top-4 right-4 cursor-pointer"
                onClick={() => {
                  setShowChangeRoleModal(false);
                }}
              />
              <CardTitle className="text-[#060A87] font-bold text-2xl mx-auto">
                Are your sure you want to{' '}
                {personInfo?.role == 'EMPLOYEE' ? 'Promote' : 'Demote'} them?
              </CardTitle>
            </CardHeader>
            <CardContent className=" ">
              <div>
                <div className="text-[#060A87] font-bold text-lg">
                  Name:{' '}
                  <span className="text-[#4A4A4F]">{personInfo?.name}</span>
                </div>
                <div className="text-[#060A87] font-bold text-lg">
                  Email:{' '}
                  <span className="text-[#4A4A4F]">{personInfo?.email}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="">
              <div className="flex w-full justify-center gap-8 mt-2">
                <div className="flex justify-end gap-4 mt-2">
                  <div></div>

                  <button
                    type="button"
                    onClick={() => {
                      setShowChangeRoleModal(false);
                    }}
                    className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => changeRole()}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </CardFooter>
          </Card>
        </div>
      )}
      {/* Welcome Section */}
      <div className="h-fit justify-start items-center gap-9 inline-flex">
        <div className="flex-col justify-start items-start gap-2 inline-flex">
          <div className="self-stretch text-[#060A87] text-2xl md:text-3xl font-extrabold font-['Manrope'] leading-[36px]">
            Welcome Back, {name}!
          </div>
          <div className="self-stretch text-[#495d85] text-sm md:text-base font-extrabold font-['Manrope'] leading-tight">
            Here’s your Employee Report
          </div>
        </div>
      </div>
      <section className=" w-full border px-2 md:px-6 py-2 md:py-6 mt-3 bg-white rounded-2xl flex-col justify-between items-start inline-flex overflow-hidden">
        <Card className="w-full border-none shadow-none mt-0">
          <CardHeader className="relative px-0 py-0">
            <CardTitle className="w-full flex justify-between items-center ">
              <div className="font-bold text-2xl">{personInfo?.name}</div>
              {role == 'OWNER' && (
                <Button
                  className={cn(
                    'bg-[#060A87] rounded-[10px] w-40 h-10 hover:bg-[#060A87] hover:opacity-90 flex items-center gap-2.5 '
                  )}
                  onClick={() => setShowChangeRoleModal(true)}
                >
                  <FaUserLarge size={20} />
                  <div className="text-base font-bold mb-[-3px]">
                    {personInfo?.role == 'EMPLOYEE' ? 'PROMOTE' : 'DEMOTE'}
                  </div>
                  <div className="text-2xl font-normal text-center mt-[-3px] ml-2">
                    +
                  </div>
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="w-full flex gap-12 p-0">
            <div className="flex h-full gap-4  py-2 rounded-sm">
              {/* <div className='font-bold text-xl py-2  px-0.5'>Basic Information</div> */}
              <div className="flex h-full flex-wrap px-3 gap-8 ">
                <div>
                  <div className="font-medium text-[#696973] text-sm md:text-base">
                    Phone
                  </div>
                  <div className="font-semibold text-sm md:text-base">
                    {personInfo?.phone ? personInfo?.phone : '-'}
                  </div>
                </div>
                <div>
                  <div className="font-medium text-[#696973] text-sm md:text-base">
                    Joined Date
                  </div>
                  <div className="font-semibold text-sm md:text-base">
                    {personInfo?.joinedAt.split(' ')[0]}
                  </div>
                </div>
                <div>
                  <div className="font-medium text-[#696973] text-sm md:text-base">
                    Email
                  </div>
                  <div className="font-semibold text-sm md:text-base">
                    {personInfo?.email}
                  </div>
                </div>
                <div>
                  <div className="font-medium text-[#696973] text-sm md:text-base">
                    Location
                  </div>
                  <div className="font-semibold text-sm md:text-base">
                    {personInfo?.location ? personInfo?.location : '-'}
                  </div>
                </div>
                <div>
                  <div className="font-medium text-[#696973] text-sm md:text-base">
                    Roll
                  </div>
                  <div className="font-semibold text-sm md:text-base">
                    {personInfo?.role}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="font-bold text-2xl pt-4">Orders Made</div>
        {transformedOrder ? (
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
            data={transformedOrder}
            totalEntries={transformedOrder.length}
            handleDelete={handleDelete}
            handleSearch={handleSearch}
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
      </section>
    </section>
  );
}
