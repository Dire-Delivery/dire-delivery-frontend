'use client';
import { useState, useEffect } from 'react';
import {
    Order,
    TransformedOrder as OriginalTransformedOrder,
} from '@/types/orderType';

interface TransformedOrder extends OriginalTransformedOrder {
    addedBy: string;
}
import {
    DeleteOrder,
    FetchOrder,
    FetchOrders,
    FetchStatusOrder,
} from '@/actions/order';
import { columns } from '@/components/order/owner/column';
import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '@/components/order/owner/orderTable';
import AddOrderDialogue from '@/components/order/addOrderDialogue';
import { city } from '@/types/cities';
import { fetchCity } from '@/actions/cities';
import { Plus } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '@/hooks/use-toast';
import { userProfile, userToken } from '@/actions/auth';
import { userType } from '@/types/user';
import { FindOrdersByPerson, FindPerson } from '@/actions/employee';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { MdOutlineClose } from 'react-icons/md';
import { Button } from '../ui/button';
import { FaUserLarge } from 'react-icons/fa6';
import { cn } from '@/lib/utils';
import { PiEyeBold } from 'react-icons/pi';
import { User } from '@/types/employeeType';

type props = {
    redirectLink: string;
    employeeId: string;
};

export default function PersonOrderTabelView({ redirectLink, employeeId }: props) {
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
    const [loading, setloading] = useState<boolean>(true);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [triggerstate, SetTriggerState] = useState<boolean>(false);
    const [user, setUser] = useState<userType | null>(null);
    const [personInfo, setPersonInfo] = useState<User>();

    const role = user?.role;
    const name = user?.name;
    const userId = user?.id;

    useEffect(() => {
        const fetchOrders = async () => {
            const decoded = await userProfile();
            const user = decoded as userType;
            setUser(user);

            const response = await fetchCity();
            console.log('cities:', response);
            setCities(response);

            if (!user) {
                return;
            }
            try {
                const response = await FindOrdersByPerson(
                    decoded.id,
                    employeeId,
                    pagenumber
                );
                console.log("#############", response)

                if (response.message !== 'Route not found') {
                    setloading(false);
                    setTotalPages(response.totalPage);
                    setCurrentPage(response.currentPage);
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
                }
            } catch (error) {
                setTimeout(() => {
                    setloading(false);
                }, 1000);
                console.log(error);
            }
        };
        fetchOrders();
    }, [pagenumber, triggerstate, showRecipet]);

    useEffect(() => {
        const fetchPerson = async () => {
            try {
                const userData = await userProfile();
                const token = await userToken();
                if (userData && token) {
                    const data = await FindPerson(userData.id, employeeId);
                    if (data) {
                        setPersonInfo(data);

                    }
                    console.log({ data })
                } else {
                    throw new Error("userData or token not found")
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchPerson();
    }, [])

    const handleSearch = async (id: string) => {
        setloading(true);
        try {
            if (!id) {
                SetTriggerState(!triggerstate);
            }
            const response = await FetchOrder(id);
            const result = response;
            console.log(result);
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
                SetTriggerState(!triggerstate);
                return;
            }
            const response = await FetchStatusOrder({
                userid: user!.id,
                pagenumber: pagenumber,
                status: status,
            });
            const result = response;
            console.log(result);
            setTotalPages(response.totalPage);
            setCurrentPage(response.currentPage);
            setTransformedOrder(
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

    console.log('transformedOrder:', transformedOrder);
    console.log('totalPages:', totalPages);
    console.log('currenPage:', currentPage);

    return (
        <section className="w-full px-2 md:px-8 py-8 bg-[#F1F2F8] h-full">
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
                <Card className='w-full border-none shadow-none mt-0'>
                    <CardHeader className='relative px-0 py-0'>
                        <CardTitle className='w-full flex justify-between items-center '>
                            <div className='font-bold text-2xl'>{personInfo?.name}</div>
                            <Button className={cn('bg-[#060A87] rounded-[10px] w-36 h-10 hover:bg-[#060A87] hover:opacity-90 flex items-center gap-2.5 ')}>
                                <FaUserLarge size={20} />
                                <div className='text-base font-bold mb-[-3px]'>Promote</div>
                                <div className='text-2xl font-normal text-center mt-[-3px] ml-2'>+</div>
                            </Button>
                        </CardTitle>
 
                    </CardHeader>
                    <CardContent className='w-full flex gap-12 p-0'>

                        <div className='flex h-full gap-4  py-2 rounded-sm' >
                            {/* <div className='font-bold text-xl py-2  px-0.5'>Basic Information</div> */}
                            <div className='flex h-full flex-wrap px-3 gap-8 '>
                                <div>
                                    <div className='font-medium text-[#696973] text-sm md:text-base'>Phone</div>
                                    <div className='font-semibold text-sm md:text-base'>{personInfo?.phone ? personInfo?.phone : "-"}</div>
                                </div>
                                <div>
                                    <div className='font-medium text-[#696973] text-sm md:text-base'>Joined Date</div>
                                    <div className='font-semibold text-sm md:text-base'>2023-08-22</div>
                                </div>
                                <div>
                                    <div className='font-medium text-[#696973] text-sm md:text-base'>Email</div>
                                    <div className='font-semibold text-sm md:text-base'>{personInfo?.email}</div>
                                </div>
                                <div>
                                    <div className='font-medium text-[#696973] text-sm md:text-base'>Location</div>
                                    <div className='font-semibold text-sm md:text-base'>{personInfo?.location ? personInfo?.location : "-"}</div>
                                </div>
                                <div>
                                    <div className='font-medium text-[#696973] text-sm md:text-base'>Roll</div>
                                    <div className='font-semibold text-sm md:text-base'>{personInfo?.role}</div>
                                </div>

                            </div>
                        </div>
                    </CardContent>
                </Card>
                <div className='font-bold text-2xl pt-4'>Orders Made</div>
                {transformedOrder ? (
                    <DataTable
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
