'use client';
import { DeletePerson, FetchEmployees, FindPerson, } from '@/actions/employee';
import AddOrderDialogue from '@/components/order/addOrderDialogue';
import AddEmployeeDialogue from '@/components/order/owner/addEmployeeDialogue';
import { employeeColumns } from '@/components/order/owner/peopleColumn';
import { PeopleDataTable } from '@/components/order/owner/peopleTable';
import { city } from '@/types/cities';
import { Person, EmployeeLoginDetails, User } from '@/types/employeeType';
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
import { toast } from 'sonner';
import { useMediaQuery } from 'usehooks-ts';

export default function EmployeesView({ type }: { type: "owner" | "admin" }) {
  const [employees, setEmployees] = useState<Person[]>([]);
  const [cities, setCities] = useState<city[]>([]);
  const [showNewEmployeeModal, setShowNewEmployeeModal] = useState<boolean>(false);
  const [showConfirmationModal, setShowConfirmationModal] =
    useState<boolean>(false);
  const [showPerson, setShowPerson] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showChangeRoleModal, setShowChangeRoleModal] = useState(false);
  const [refreshTableToggle, setRefreshTableToggle] = useState(false);
  const [personInfo, setPersonInfo] = useState<User>();

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
  }, [showConfirmationModal, showChangeRoleModal, refreshTableToggle]);

  const handleDelete = async (id: string) => {
    try {
      const userData = await userProfile();
      const token = await userToken();
      if (userData && token) {
        const response = await DeletePerson(userData.id, id);
        toast.success(response.message)
        setRefreshTableToggle(!refreshTableToggle);
      } else {
        throw new Error("userData or token not found")
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFind = async (id: string) => {
    try {
      const userData = await userProfile();
      const token = await userToken();
      if (userData && token) {
        const data = await FindPerson(userData.id, id);
        if (data) {
          setPersonInfo(data);
          setShowPerson(true);
        } else {
          toast.error(data);
        }
        console.log({data})
      } else {
        throw new Error("userData or token not found")
      }
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <section className="w-full px-1 md:px-8 py-8">
      {/* Welcome Section */}
      <div className="h-fit justify-start items-center gap-9 inline-flex mx-4 md:mx-0">
        <div className="flex-col justify-start items-start gap-2 inline-flex">
          <div className="self-stretch text-[#060A87] text-2xl md:text-3xl font-extrabold font-['Manrope'] leading-[36px]">
            Welcome Back, {type == "owner" ? "Owner" : "Admin"}!
          </div>
          <div className="self-stretch text-[#495d85] text-sm md:text-base font-extrabold font-['Manrope'] leading-tight">
            Here’s your Employees Report
          </div>
        </div>
      </div>
      <section className=" w-full border px-2 md:px-6 md:py-2 mt-8 bg-white rounded-2xl flex-col justify-between items-start inline-flex overflow-hidden">
        {/* {showPerson &&
          <Card className='w-full border-none shadow-none mt-0'>
            <CardHeader className='relative px-0 pt-0'>
              <MdOutlineClose className='absolute top-[7px] right-[-5px] cursor-pointer' onClick={() => {
                setShowPerson(false)
                setShowPassword(false)
              }} size={20} />
              <CardTitle className='w-full flex justify-between items-center'>
                <div className='font-bold text-2xl'>Employee Name</div>
              </CardTitle>
            </CardHeader>
            <CardContent className='w-full flex gap-12 h-64 p-0'>

              <div className='w-[500px] flex flex-col h-full gap-4 border-2 border-[#E2E8F0] px-8 py-4 rounded-sm' >
                <div className='font-bold text-xl py-2  px-0.5 border-b-2 border-[#6B7280]'>Basic Information</div>
                <div className='flex h-full px-3 '>
                  <div className='flex flex-col justify-between flex-1'>
                    <div>
                      <div className='font-medium text-[#696973] text-base'>Full Name</div>
                      <div className='font-semibold text-base'>{personInfo?.name}</div>
                    </div>
                    <div>
                      <div className='font-medium text-[#696973] text-base'>Phone</div>
                      <div className='font-semibold text-base'>{personInfo?.phone ? personInfo?.phone : "-"}</div>
                    </div>
                    <div>
                      <div className='font-medium text-[#696973] text-base'>Joined Date</div>
                      <div className='font-semibold text-base'>2023-08-22</div>
                    </div>
                  </div>
                  <div className='flex flex-col justify-between flex-1'>
                    <div>
                      <div className='font-medium text-[#696973] text-base'>Email</div>
                      <div className='font-semibold text-base'>{personInfo?.email}</div>
                    </div>
                    <div>
                      <div className='font-medium text-[#696973] text-base'>Location</div>
                      <div className='font-semibold text-base'>{personInfo?.location ? personInfo?.location : "-"}</div>
                    </div>
                    <div>
                      <div className='font-medium text-[#696973] text-base'>Roll</div>
                      <div className='font-semibold text-base'>{personInfo?.role}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='w-[340px] flex flex-col h-full gap-4 border-2 border-[#E2E8F0] px-8 py-4 rounded-sm'>
                <div className='font-bold text-xl py-2  px-0.5 border-b-2 border-[#6B7280]'>Login Information</div>
                <div className='flex flex-col gap-4'>
                  <div>
                    <div className='font-medium text-[#696973] text-base'>Email</div>
                    <div className='font-semibold text-base'>{personInfo?.email}</div>
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
              <div className='flex justify-center items-center'>
                <Button className={cn('bg-[#060A87] rounded-[10px] py-6 px-7 hover:bg-[#060A87] hover:opacity-90 flex items-center gap-2.5')}>
                  <FaUserLarge size={20}/>
                  <div className='text-lg font-bold mb-[-3px]'>Promote</div>
                  <div className='text-4xl font-normal text-center mt-[-3px] ml-2'>+</div>
                </Button>
              </div>
            </CardContent>
          </Card>

        } */}
        <div className="w-full flex justify-between items-center mt-2 md:mt-4 ">
          <h1 className="text-2xl font-bold pl-2 md:pl-0">Employees</h1>
          <button
            onClick={() => setShowNewEmployeeModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 mr-2 mt-2 md:mr-0 md:mt-0"
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
              Person,
              unknown
            >[]
          }
          data={employees}
          totalEntries={employees.length}
          handleDelete={handleDelete}
          handleFind={handleFind}
          setShowPerson={setShowPerson}
          setShowPassword={setShowPassword}
          type="employee"
          showChangeRoleModal={showChangeRoleModal}
          setShowChangeRoleModal={setShowChangeRoleModal}
        />
      </section>
    </section>
  );
}
