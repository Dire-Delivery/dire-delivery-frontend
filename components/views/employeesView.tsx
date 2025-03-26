'use client';
import { DeletePerson, FetchEmployees, FindPerson, SearchByName, } from '@/actions/employee';
import AddOrderDialogue from '@/components/order/addOrderDialogue';
import AddEmployeeDialogue from '@/components/order/owner/addEmployeeDialogue';
import { employeeColumns } from '@/components/order/owner/peopleColumn';
import { PeopleDataTable } from '@/components/order/owner/peopleTable';
import { city } from '@/types/cities';
import { Person, EmployeeLoginDetails, User, Pagination } from '@/types/employeeType';
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
  const [pagination, setPagination] = useState<Pagination>({
    pageIndex: 0, //initial page index
    pageSize: 10, //default page size
  });
  const [pageCount, setPageCount] = useState(1);
  const [showFilteredData, setShowFilteredData] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userData = await userProfile();
        const token = await userToken();
        if (userData && token) {
          const response = await FetchEmployees(userData.id, pagination.pageIndex + 1);
          console.log({ response });
          const convertedEmployeeFormat = convertToEmployeesFormat(response.users);
          setPageCount(response.totalPage);
          setEmployees(convertedEmployeeFormat);

        } else {
          throw new Error("userData or token not found")
        }
      } catch (error) {
        console.log(error);
      }
    };

    const handleSearch = async () => {
      try {
        const userData = await userProfile();
        const token = await userToken();
        if (userData && token) {
          const response = await SearchByName(userData.id, searchInput, pagination.pageIndex + 1);
          console.log({response})
          const convertedEmployeeFormat = convertToEmployeesFormat(response.users);
          setPageCount(response.totalPage)
          setEmployees(convertedEmployeeFormat);

        } else {
          throw new Error("userData or token not found")
        }
      } catch (error) {
        console.log(error);
      }
    }
    if (!showFilteredData) {
      fetchOrders();
    } else {
      handleSearch();
    }

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
        console.log({ data })
      } else {
        throw new Error("userData or token not found")
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkEmpty = async (name: string) => {
    console.log("...........................", { name })
    if (!name) {
      setShowFilteredData(false);
      setPagination({
        pageIndex: 0,
        pageSize: 10,
      })
      setRefreshTableToggle(!refreshTableToggle);
    }
  }


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
        <div className="w-full flex justify-between items-center mt-2 md:mt-4 ">
          <h1 className="text-2xl font-bold pl-2 md:pl-0 text-[#060A87]">Employees</h1>
          <button
            onClick={() => setShowNewEmployeeModal(true)}
            className="bg-[#060A87] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#060a87d5] mr-2 mt-2 md:mr-0 md:mt-0"
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
          setShowFilteredData={setShowFilteredData}
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
          pagination={pagination}
          setPagination={setPagination}
          pageCount={pageCount}
          setRefreshTableToggle={setRefreshTableToggle}
          refreshTableToggle={refreshTableToggle}
          checkEmpty={checkEmpty}
          setShowFilteredData={setShowFilteredData}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
        />
      </section>
    </section>
  );
}
