'use client';
import { userProfile, userToken } from '@/actions/auth';
import { DeletePerson, FetchUsers, SearchByName } from '@/actions/employee';
import { employeeColumns } from '@/components/order/owner/peopleColumn';
import { UserDataTable } from '@/components/order/owner/peopleTable';
import { convertToUsersFormat } from '@/lib/utils';
import { Pagination, Person } from '@/types/employeeType';
import { userType } from '@/types/user';
import { ColumnDef } from '@tanstack/react-table';
import { Plus } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const AddEmployeeDialogue = dynamic(() => import('@/components/order/owner/addEmployeeDialogue'), { ssr: false });

export default function UserView({
  view,
}: {
  type: 'owner' | 'admin';
  view: 'employee' | 'admin';
}) {
  const [employees, setEmployees] = useState<Person[]>([]);
  const [showNewEmployeeModal, setShowNewEmployeeModal] =
    useState<boolean>(false);
  const [showConfirmationModal, setShowConfirmationModal] =
    useState<boolean>(false);
  const [showChangeRoleModal, setShowChangeRoleModal] = useState(false);
  const [refreshTableToggle, setRefreshTableToggle] = useState(false);
  const [pagination, setPagination] = useState<Pagination>({
    pageIndex: 0, //initial page index
    pageSize: 10, //default page size
  });
  const [pageCount, setPageCount] = useState(1);
  const [totalPeople, setTotalPeople] = useState(0);
  const [showFilteredData, setShowFilteredData] = useState(false);
  const [searchInput, setSearchInput] = useState('');
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

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userData = await userProfile();
        setUser(userData as userType);
        const token = await userToken();
        if (userData && token) {
          const response = await FetchUsers(
            userData.id,
            pagination.pageIndex + 1,
            view.toUpperCase()
          );
          const convertedEmployeeFormat = convertToUsersFormat(
            response.users,
            view.toUpperCase()
          );
          setPageCount(response.totalPage);
          setTotalPeople(response.totalUsers);
          setEmployees(convertedEmployeeFormat);
        } else {
          throw new Error('userData or token not found');
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
          const response = await SearchByName(
            userData.id,
            searchInput,
            pagination.pageIndex + 1
          );
          const convertedEmployeeFormat = convertToUsersFormat(
            response.users,
            view.toUpperCase()
          );
          setPageCount(response.totalPage);
          setTotalPeople(response.totalUsers);
          setEmployees(convertedEmployeeFormat);
        } else {
          throw new Error('userData or token not found');
        }
      } catch (error) {
        console.log(error);
      }
    };
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
        toast.success(response.message);
        setRefreshTableToggle(!refreshTableToggle);
      } else {
        throw new Error('userData or token not found');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkEmpty = async (name: string) => {
    if (!name) {
      setShowFilteredData(false);
      setPagination({
        pageIndex: 0,
        pageSize: 10,
      });
      setRefreshTableToggle(!refreshTableToggle);
    }
  };

  return (
    <section className="w-full px-1 md:px-8 py-8">
      {/* Welcome Section */}
      <div className="h-fit justify-start items-center gap-9 inline-flex mx-4 md:mx-0">
        <div className="flex-col justify-start items-start gap-2 inline-flex">
          <div className="self-stretch text-[#060A87] text-2xl md:text-3xl font-extrabold font-['Manrope'] leading-[36px]">
            Welcome Back, {user?.name}!
          </div>
          <div className="self-stretch text-[#495d85] text-sm md:text-base font-extrabold font-['Manrope'] leading-tight">
            Here’s your {view == 'employee' ? 'Employee' : 'Admin'}s Report
          </div>
        </div>
      </div>
      <section className=" w-full border px-2 md:px-6 md:py-2 mt-8 bg-white rounded-2xl flex-col justify-between items-start inline-flex overflow-hidden">
        <div className="w-full flex justify-between items-center mt-2 md:mt-4 ">
          <h1 className="text-2xl font-bold pl-2 md:pl-0 text-[#060A87]">
            {view == 'employee' ? 'Employees' : 'Admins'}
          </h1>
          {view == 'employee' && (
            <button
              onClick={() => setShowNewEmployeeModal(true)}
              className="bg-[#060A87] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#060a87d5] mr-2 mt-2 md:mr-0 md:mt-0"
            >
              <Plus className="h-5 w-5" />
              Add New
            </button>
          )}
        </div>
        <AddEmployeeDialogue
          showNewEmployeeModal={showNewEmployeeModal}
          setShowNewEmployeeModal={setShowNewEmployeeModal}
          showConfirmationModal={showConfirmationModal}
          setShowConfirmationModal={setShowConfirmationModal}
          setShowFilteredData={setShowFilteredData}
        />
        <UserDataTable
          columns={employeeColumns as ColumnDef<Person, unknown>[]}
          data={employees}
          totalEntries={employees.length}
          handleDelete={handleDelete}
          view={view}
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
          totalPeople={totalPeople}
        />
      </section>
    </section>
  );
}
