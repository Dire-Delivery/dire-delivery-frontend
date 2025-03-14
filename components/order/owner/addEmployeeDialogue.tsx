'use client';

import { city } from '@/types/cities';
import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import * as z from 'zod';
import ConfirmModal from '../confirmModal';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";


import { userProfile, userToken } from "@/actions/auth";
import { addUserSchema } from "@/lib/auth-schema";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const BaseUrl = process.env.NEXT_PUBLIC_API_URL

type props = {
  cities: city[];
  showNewEmployeeModal: boolean;
  setShowNewEmployeeModal: React.Dispatch<React.SetStateAction<boolean>>;
  showConfirmationModal: boolean;
  setShowConfirmationModal: React.Dispatch<React.SetStateAction<boolean>>;
  showRecipet: boolean;
  setShowRecipt: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AddEmployeeDialogue({
  cities,
  showNewEmployeeModal,
  setShowNewEmployeeModal,
  showConfirmationModal,
  setShowConfirmationModal,
  showRecipet,
  setShowRecipt,
}: props) {
  const form = useForm<z.infer<typeof addUserSchema>>({
    resolver: zodResolver(addUserSchema),
    defaultValues: {
      fName: "",
      lName: "",
      email: "",
      phoneNumber: "",
    },
  })

  const { handleSubmit, reset } = form;

  async function onSubmit(values: z.infer<typeof addUserSchema>) {
    const { fName, lName, email, phoneNumber } = values;

    const addDetails = {
      name: `fName lName`,
      email,
      phoneNumber
    }

    const userData = await userProfile();
    const token = await userToken();

    if (userData && token) {
      const response = await fetch(`${BaseUrl}/auth/${userData.id}/add-user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(addDetails),
      })

      if (!response.ok) {
        console.error("error while adding")
        // add toast
      }
    }
  }

  const handleClose = () => {
    setShowNewEmployeeModal(false);
    reset();
  };

  return (
    <>
      {showNewEmployeeModal && (
        <div className="fixed inset-0 bg-[#060A87] bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full h-fit max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-[#060A87]">Add An Employee</h2>
              <button onClick={() => handleClose()} title="Close">
                <X className="h-6 w-6" />
              </button>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="flex gap-2 md:gap-6">
                  <FormField
                    control={form.control}
                    name="fName"
                    render={({ field }) => (
                      <FormItem className="space-y-0 flex-1 md:space-y-2">
                        <FormLabel className="font-medium text-base text-[#060A87] md:text-lg">First Name <span className="text-[#E03137]">*</span></FormLabel>
                        <FormControl>
                          <Input placeholder="Input your First Name" className="text-sm md:h-12 md:text-base placeholder-[#A0AEC0]" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lName"
                    render={({ field }) => (
                      <FormItem className="space-y-0 flex-1 md:space-y-2">
                        <FormLabel className="font-medium text-base text-[#060A87] md:text-lg" >Last Name <span className="text-[#E03137]">*</span></FormLabel>
                        <FormControl>
                          <Input placeholder="Input your Last Name" className="text-sm md:h-12 md:text-base placeholder-[#A0AEC0]"  {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium text-base text-[#060A87] md:text-lg">Email <span className="text-[#E03137]">*</span></FormLabel>
                      <FormControl>
                        <Input placeholder="john@mail.com" {...field} className="text-sm md:h-12 md:text-base placeholder-[#A0AEC0]" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium text-base text-[#060A87] md:text-lg">Phone Number <span className="text-[#E03137]">*</span></FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="Enter your phoneNumber" {...field} className="text-sm md:h-12 md:text-base placeholder-[#A0AEC0]" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end gap-4 mt-2">
                  <div></div>

                  <button
                    type="button"
                    onClick={() => handleClose()}
                    className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Continue
                  </button>
                </div>
              </form>
            </Form>

            {/* <form onSubmit={handleSubmit(onSubmit)} className="px-2">

              

              {/* <div className="space-y-2">

                

                <div className="flex justify-end gap-4 mt-2">
                  <div></div>

                  <button
                    type="button"
                    onClick={() => setShowNewEmployeeModal(false)}
                    className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Continue
                  </button>
                </div>
              </div> 
            </form> */}
          </div>
        </div>

      )}

      {/* {showConfirmationModal && (
        <div className="fixed inset-0 bg-[#060A87]/20 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Order Summary</h2>
              <button
                onClick={() => setShowConfirmationModal(false)}
                title="Close"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="border px-3 py-5 grid grid-cols-2 gap-10">
              <div className="h-full">
                <h3 className="font-bold text-lg mb-2 pb-2 border-b-2">
                  Item Details
                </h3>
                <div className="px-3 flex flex-col gap-1">
                  <p>
                    <strong>Description:</strong> {currentOrder.description}
                  </p>
                  <p>
                    <strong>Weight:</strong> {currentOrder.weight}kg
                  </p>
                  <p>
                    <strong>Quantity:</strong> {currentOrder.quantity}
                  </p>
                </div>
              </div>

              <div className="h-full">
                <h3 className="font-bold text-lg mb-2 pb-2 border-b-2">
                  Sender Detail
                </h3>
                <div className="px-3 flex flex-col gap-1">
                  <p>
                    <strong>Full Name:</strong> {currentOrder.senderName}
                  </p>
                  <p>
                    <strong>Email:</strong> {currentOrder.senderEmail}
                  </p>
                  <p>
                    <strong>Phone Number:</strong>{' '}
                    {currentOrder.senderPhoneNumber}
                  </p>
                  <p>
                    <strong>Address:</strong> {currentOrder.senderAddress}
                  </p>
                </div>
              </div>

              <div className="h-full">
                <h3 className="font-bold text-lg mb-2 pb-2 border-b-2">
                  Receiver Detail
                </h3>
                <div className="px-3 flex flex-col gap-1">
                  <p>
                    <strong>Full Name:</strong> {currentOrder.reciverName}
                  </p>
                  <p>
                    <strong>Email:</strong> {currentOrder.reciverEmail}
                  </p>
                  <p>
                    <strong>Phone Number:</strong>{' '}
                    {currentOrder.reciverPhoneNumber}
                  </p>
                  <p>
                    <strong>Address:</strong> {currentOrder.reciverAddress}
                  </p>
                </div>
              </div>

              <div className="h-full">
                <h3 className="font-bold text-lg mb-2 pb-2 border-b-2">
                  Payment Detail
                </h3>
                <div className="px-3 flex flex-col gap-1">
                  <p>
                    <strong>Transaction Id:</strong>{' '}
                    {currentOrder.transactionId}
                  </p>
                  <p>
                    <strong>Total Price:</strong>{' '}
                    {priceCalculator(
                      currentOrder.weight!,
                      currentOrder.quantity!
                    ).toFixed(2)}{' '}
                    birr
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowConfirmationModal(false)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={submitting}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      )} */}

      {/* {showRecipet && (
        <ConfirmModal
          currentOrder={{ ...recieptOrder, id: uuidv4() }}
          setShowRecipt={setShowRecipt}
        />
      )} */}
    </>
  );
}
