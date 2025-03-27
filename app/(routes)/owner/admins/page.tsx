'use client';
// import { FetchEmployees, } from '@/actions/employee';
// import { adminsColumns } from '@/components/order/owner/peopleColumn';
// import { PeopleDataTable } from '@/components/order/owner/peopleTable';
// import { city } from '@/types/cities';
// import { Person } from '@/types/employeeType';
// import { ColumnDef } from '@tanstack/react-table';
// import { useEffect, useState } from 'react';

export default function Page() {
  




  // const [employees, setEmployees] = useState<Person[]>([]);
  // const [cities, setCities] = useState<city[]>([]);
  // const [showNewOrderModal, setShowNewOrderModal] = useState<boolean>(false);
  // const [showConfirmationModal, setShowConfirmationModal] =
  //   useState<boolean>(false);
  // const [showRecipet, setShowRecipt] = useState<boolean>(false);
  // useEffect(() => {
  //   const fetchOrders = async () => {
  //     try {
  //       const response = await FetchEmployees();
  //       console.log({response});
  //       setEmployees(response);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchOrders();
  // }, []);

  // // useEffect(() => {
  // //   const fetchCities = async () => {
  // //     try {
  // //       const response = await fetchCity();
  // //       // console.log('cities:', response);
  // //       setCities(response);
  // //     } catch (error) {
  // //       console.log(error);
  // //     }
  // //   };
  // //   fetchCities();
  // // }, []);

  // const handleDelete = async (id: string) => {
  //   // console.log('about to delete:', id);
  //   const response = await DeleteOrder(id);
  //   console.log(response);
  // };

  // // console.log('city:', cities);

  // // console.log(`orders:`, orders);

  // return (
  //   <section className="w-full px-4 md:px-8 py-4 bg-[#F1F2F8]">
  //     {/* Welcome Section */}
  //     <div className="h-fit justify-start items-center gap-9 inline-flex">
  //       <div className="flex-col justify-start items-start gap-2 inline-flex">
  //         <div className="self-stretch text-[#060A87] text-2xl md:text-3xl font-extrabold font-['Manrope'] leading-[36px]">
  //           Welcome Back, Owner!
  //         </div>
  //         <div className="self-stretch text-[#495d85] text-sm md:text-base font-extrabold font-['Manrope'] leading-tight">
  //           Here’s your Admins Report
  //         </div>
  //       </div>
  //     </div>
  //     <section className=" w-full border px-6 py-2 mt-3 bg-white rounded-2xl flex-col justify-between items-start inline-flex overflow-hidden">
  //       <div className="w-full flex justify-between items-center mt-4 ">
  //         <h1 className="text-2xl font-bold">Admins</h1>
  //       </div>
  //       {/* <AddEmployeeDialogue
  //         showNewOrderModal={showNewOrderModal}
  //         setShowNewOrderModal={setShowNewOrderModal}
  //         showConfirmationModal={showConfirmationModal}
  //         setShowConfirmationModal={setShowConfirmationModal}
  //         cities={cities}
  //         showRecipet={showRecipet}
  //         setShowRecipt={setShowRecipt}
  //       /> */}
  //       <PeopleDataTable
  //         columns={
  //           adminsColumns as ColumnDef<
  //             { id: string, imgUrl: string },
  //             unknown
  //           >[]
  //         }
  //         data={employees}
  //         totalEntries={employees.length}
  //         handleDelete={handleDelete}
  //         type="admin"
  //       />
  //     </section>
  //   </section>
  // );
}
