'use client';
import { FetchEmployees, } from '@/actions/employee';
import AddOrderDialogue from '@/components/order/addOrderDialogue';
import AddEmployeeDialogue from '@/components/order/owner/addEmployeeDialogue';
import { employeeColumns } from '@/components/order/owner/peopleColumn';
import { PeopleDataTable } from '@/components/order/owner/peopleTable';
import { city } from '@/types/cities';
import { Employee, EmployeeLoginDetails } from '@/types/employeeType';
import { ColumnDef } from '@tanstack/react-table';
import { Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button';
import { cn, convertToEmployeesFormat } from '@/lib/utils';
import { FaUserLarge } from 'react-icons/fa6';
import { MdOutlineClose } from "react-icons/md";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import person from '@/public/images/person.png'
import Image from 'next/image';
import { PasswordInput } from '@/components/log-in/password-input';
import { PiEyeClosedBold } from "react-icons/pi";
import { PiEyeBold } from "react-icons/pi";
import { userProfile, userToken } from '@/actions/auth';

export default function EmployeesView({ type }: { type: "owner" | "admin" }) {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [cities, setCities] = useState<city[]>([]);
  const [showNewEmployeeModal, setShowNewEmployeeModal] = useState<boolean>(false);
  const [showConfirmationModal, setShowConfirmationModal] =
    useState<boolean>(false);
  const [showPerson, setShowPerson] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userData = await userProfile();
        const token = await userToken();
        if (userData && token) {
          const response = await FetchEmployees(userData.id);
          console.log({ response });
          const convertedEmployeeFormat = convertToEmployeesFormat(response.users);
          setEmployees(convertedEmployeeFormat);
        } else {
          throw new Error("userData or token not found")
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrders();
  }, [showConfirmationModal]);

  const handleDelete = async (id: string) => {      
    // console.log('about to delete:', id);
    // const response = await DeleteOrder(id);
    // console.log(response);
  };

  return (
    <section className="w-full px-4 md:px-8 py-4 bg-[#F1F2F8]">
      {/* Welcome Section */}
      <div className="h-fit justify-start items-center gap-9 inline-flex">
        <div className="flex-col justify-start items-start gap-2 inline-flex">
          <div className="self-stretch text-[#060A87] text-2xl md:text-3xl font-extrabold font-['Manrope'] leading-[36px]">
            Welcome Back, {type == "owner" ? "Owner" : "Admin"}!
          </div>
          <div className="self-stretch text-[#495d85] text-sm md:text-base font-extrabold font-['Manrope'] leading-tight">
            Here’s your Employees Report
          </div>
        </div>
      </div>
      <section className=" w-full border px-6 py-2 mt-3 bg-white rounded-2xl flex-col justify-between items-start inline-flex overflow-hidden">
        {showPerson &&
          <Card className='w-full border-none shadow-none mt-4'>
            <CardHeader className='relative'>
              <MdOutlineClose className='absolute top-[-5px] right-[-5px] cursor-pointer' onClick={() => {
                setShowPerson(false)
                setShowPassword(false)
              }} />
              <CardTitle className='w-full flex justify-between items-center'>
                <div className='font-bold text-2xl'>Employee Name</div>
                <Button className={cn('bg-[#060A87] rounded-[10px] py-2 px-3 hover:bg-[#060A87] hover:opacity-90 flex items-center gap-2.5')}>
                  <FaUserLarge />
                  <div className='text-sm font-bold mb-[-3px]'>Promote</div>
                  <div className='text-3xl font-normal text-center mt-[-3px]'>+</div>
                </Button>
              </CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent className='w-full flex gap-12 h-64 p-0'>
              <div className='flex items-center justify-center pl-12'>
                <Image src={person} alt="CN" className='w-56 h-auto'></Image>
              </div>
              <div className='w-[500px] flex flex-col h-full gap-4 border-2 border-[#E2E8F0] px-8 py-4 rounded-sm' >
                <div className='font-bold text-xl py-2  px-0.5 border-b-2 border-[#6B7280]'>Basic Information</div>
                <div className='flex h-full px-3 '>
                  <div className='flex flex-col justify-between flex-1'>
                    <div>
                      <div className='font-medium text-[#696973] text-base'>Full Name</div>
                      <div className='font-semibold text-base'>John Doe</div>
                    </div>
                    <div>
                      <div className='font-medium text-[#696973] text-base'>Phone</div>
                      <div className='font-semibold text-base'>+251923442233 </div>
                    </div>
                    <div>
                      <div className='font-medium text-[#696973] text-base'>Joined Date</div>
                      <div className='font-semibold text-base'>2023-08-22</div>
                    </div>
                  </div>
                  <div className='flex flex-col justify-between flex-1'>
                    <div>
                      <div className='font-medium text-[#696973] text-base'>Email</div>
                      <div className='font-semibold text-base'>JhonnyDoe@gmail.com</div>
                    </div>
                    <div>
                      <div className='font-medium text-[#696973] text-base'>Location</div>
                      <div className='font-semibold text-base'>Addis Ababa </div>
                    </div>
                    <div>
                      <div className='font-medium text-[#696973] text-base'>Roll</div>
                      <div className='font-semibold text-base'>Employee </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='w-[340px] flex flex-col h-full gap-4 border-2 border-[#E2E8F0] px-8 py-4 rounded-sm'>
                <div className='font-bold text-xl py-2  px-0.5 border-b-2 border-[#6B7280]'>Login Information</div>
                <div className='flex flex-col gap-4'>
                  <div>
                    <div className='font-medium text-[#696973] text-base'>Email</div>
                    <div className='font-semibold text-base'>JhonnyDoe@gmail.com</div>
                  </div>
                  <div >
                    <div className='font-medium text-[#696973] text-base'>Password</div>
                    <div className='border-[1px] border-[#E2E8F0] rounded-md h-10 w-full flex items-center justify-between px-2 pr-4'>
                      {!showPassword ? <div className='font-black text-2xl tracking-[8px] pb-2.5 pl-2.5'>.......</div> : <div className='font-semibold text-base'>random1234</div>}
                      {showPassword ? <PiEyeBold stroke='#71717A' className='cursor-pointer w-6 h-auto' onClick={() => setShowPassword(false)} /> : <PiEyeClosedBold stroke='#71717A' className='cursor-pointer w-6 h-auto' onClick={() => setShowPassword(true)} />}
                    </div>
                  </div>

                </div>
              </div>
            </CardContent>
          </Card>

        }
        <div className="w-full flex justify-between items-center mt-4 ">
          <h1 className="text-2xl font-bold">Employees</h1>
          <button
            onClick={() => setShowNewEmployeeModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
          >
            <Plus className="h-5 w-5" />
            Add New
          </button>
        </div>
        <AddEmployeeDialogue
          showNewEmployeeModal={showNewEmployeeModal}
          setShowNewEmployeeModal={setShowNewEmployeeModal}
          showConfirmationModal={showConfirmationModal}
          setShowConfirmationModal={setShowConfirmationModal}
          cities={cities}

        />
        <PeopleDataTable
          columns={
            employeeColumns as ColumnDef<
                Employee,
              unknown
            >[]
          }
          data={employees}
          totalEntries={employees.length}
          handleDelete={handleDelete}
          setShowPerson={setShowPerson}
          setShowPassword={setShowPassword}
          type="employee"
        />
      </section>
    </section>
  );
}
