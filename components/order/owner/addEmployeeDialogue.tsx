'use client';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import done from '@/public/images/done.svg';
import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { AddUserFetch, userProfile, userToken } from '@/actions/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { addUserSchema } from '@/lib/auth-schema';
import { cn } from '@/lib/utils';
import { EmployeeLoginDetails } from '@/types/employeeType';
import Image from 'next/image';
import { useState } from 'react';
import { AiOutlineCopy } from 'react-icons/ai';

import { useMediaQuery } from 'usehooks-ts';
import { useToast } from '@/hooks/use-toast';
import ConfirmModal from '../confirmModal';
import dynamic from 'next/dynamic';
const ConfirmationModal = dynamic(() => import('./ConfirmationModal'), {
  ssr: false,
});

type props = {
  showNewEmployeeModal: boolean;
  setShowNewEmployeeModal: React.Dispatch<React.SetStateAction<boolean>>;
  showConfirmationModal: boolean;
  setShowConfirmationModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowFilteredData: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AddEmployeeDialogue({
  showNewEmployeeModal,
  setShowNewEmployeeModal,
  showConfirmationModal,
  setShowConfirmationModal,
  setShowFilteredData,
}: props) {
  const form = useForm<z.infer<typeof addUserSchema>>({
    resolver: zodResolver(addUserSchema),
    defaultValues: {
      fName: '',
      lName: '',
      email: '',
      phoneNumber: '',
    },
  });
  const { toast } = useToast();

  const { reset } = form;

  const [newEmployeeLoginDetails, setNewEmployeeLoginDetails] =
    useState<EmployeeLoginDetails>({ email: '', password: '' });
  const isMobile = useMediaQuery('(max-width: 768px)'); // Tablet screens

  async function onSubmit(values: z.infer<typeof addUserSchema>) {
    const { fName, lName, email, phoneNumber } = values;

    const addDetails = {
      name: `${fName} ${lName}`,
      email,
      phoneNumber,
    };

    const userData = await userProfile();
    const token = await userToken();

    if (userData && token) {
      const response = await AddUserFetch(userData.id, addDetails);
      if (response.message) {
      console.log("response", response)

      if (response.message == 'employee successfully created') {
        setShowFilteredData(false);
        setShowNewEmployeeModal(false);
        reset();
        setShowConfirmationModal(true);

        const employeeDetails = {
          email: response.email,
          password: response.password,
        };
        setNewEmployeeLoginDetails(employeeDetails);
        toast({
          title: 'Successfully added employee',
          variant: 'success',
        });
      } else {
        toast({
          title: 'could not add employee',
          variant: 'destructive',
        });
      }
      }
    }
  }

  const handleClose = () => {
    setShowNewEmployeeModal(false);
    reset();
  };

  const handleCopy = async () => {
    const copyText = `Email: ${newEmployeeLoginDetails.email} \nPassword: ${newEmployeeLoginDetails.password}`;

    try {
      await navigator.clipboard.writeText(copyText);
      toast({
        title: 'Successfully copied to clipboard',
        variant: `success`,
      });
    } catch {
      // Fallback method for older mobile browsers
      const textArea = document.createElement('textarea');
      textArea.value = copyText;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy'); // Deprecated but still works as a fallback
      document.body.removeChild(textArea);

      toast({
        title: 'Successfully copied to clipboard',
        variant: `success`,
      });
    }
  };

  return (
    <>
      {showNewEmployeeModal && (
        <div className="fixed inset-0 bg-[#060A87] bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full h-fit max-w-2xl mx-4 md:mx-0">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-[#060A87]">
                Add An Employee
              </h2>
              <button onClick={() => handleClose()} title="Close">
                <X className="h-6 w-6" />
              </button>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <div className="flex gap-2 md:gap-6">
                  <FormField
                    control={form.control}
                    name="fName"
                    render={({ field }) => (
                      <FormItem className="space-y-0 flex-1 md:space-y-2">
                        <FormLabel className="font-medium text-base text-[#060A87] md:text-lg">
                          First Name <span className="text-[#E03137]">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder={
                              isMobile ? 'Abebe' : 'Input your First Name'
                            }
                            className="text-sm md:h-12 md:text-base placeholder-[#A0AEC0]"
                            {...field}
                          />
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
                        <FormLabel className="font-medium text-base text-[#060A87] md:text-lg">
                          Last Name <span className="text-[#E03137]">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder={
                              isMobile ? 'Kebede' : 'Input your Last Name'
                            }
                            className="text-sm md:h-12 md:text-base placeholder-[#A0AEC0]"
                            {...field}
                          />
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
                      <FormLabel className="font-medium text-base text-[#060A87] md:text-lg">
                        Email <span className="text-[#E03137]">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="john@mail.com"
                          {...field}
                          className="text-sm md:h-12 md:text-base placeholder-[#A0AEC0]"
                        />
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
                      <FormLabel className="font-medium text-base text-[#060A87] md:text-lg">
                        Phone Number <span className="text-[#E03137]">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter your Phone Number"
                          {...field}
                          className="text-sm md:h-12 md:text-base placeholder-[#A0AEC0]"
                        />
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
                    className="px-4 py-2 bg-[#060A87] text-white rounded-lg hover:bg-[#060a87c7]"
                  >
                    Continue
                  </button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      )}

      {}

      {showConfirmationModal && (
       <ConfirmationModal isMobile={isMobile} newEmployeeLoginDetails={newEmployeeLoginDetails} setNewEmployeeLoginDetails={setNewEmployeeLoginDetails} handleCopy={handleCopy} setShowConfirmationModal={setShowConfirmationModal}/> 
      )}

      {/* {showRecipet && (
        <ConfirmModal
          currentOrder={{ ...recieptOrder, id: uuidv4() }}
          setShowRecipt={setShowRecipt}
        />
      )} */}
    </>
  );
}
