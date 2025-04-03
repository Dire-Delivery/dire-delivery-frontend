'use client';

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import done from '@/public/images/done.svg';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { AiOutlineCopy } from 'react-icons/ai';
import { EmployeeLoginDetails } from '@/types/employeeType';

type ConfirmationModalProps = {
    isMobile: boolean,
    newEmployeeLoginDetails: EmployeeLoginDetails;
    setNewEmployeeLoginDetails: React.Dispatch<React.SetStateAction<EmployeeLoginDetails>>;
    handleCopy: () => void;
    setShowConfirmationModal: React.Dispatch<React.SetStateAction<boolean>>;
    
}

function ConfirmationModal({isMobile, newEmployeeLoginDetails, setNewEmployeeLoginDetails, handleCopy, setShowConfirmationModal}: ConfirmationModalProps) {
  return (
    <div className="fixed inset-0 bg-[#060A87] bg-opacity-30 flex items-center justify-center z-50">
          <Card className=" gap-12 mx-10 my-3 md:mx-0 md:my-0 md:py-10 md:px-32">
            <CardHeader>
              <CardTitle className="text-[#060A87] font-bold text-2xl mx-auto text-center ">
                Employee Added Successfully
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-12 pt-12 ">
              <div className="flex justify-center">
                <Image src={done} alt="done" />
              </div>
              <div
                className={cn(
                  'border-[#7B7B7B63] border-[1px] p-3 pl-6 rounded-[2px] flex',
                  isMobile ? 'justify-between text-sm' : 'text-lg gap-20'
                )}
              >
                <div>
                  <div className="text-[#060A87] font-bold">
                    Email:{' '}
                    <span className="text-[#4A4A4F]">
                      {newEmployeeLoginDetails.email}
                    </span>
                  </div>
                  <div className="text-[#060A87] font-bold">
                    Password:{' '}
                    <span className="text-[#4A4A4F]">
                      {newEmployeeLoginDetails.password}
                    </span>
                  </div>
                </div>
                <AiOutlineCopy
                  onClick={handleCopy}
                  className="cursor-pointer"
                  stroke="#060A87"
                  fill="#060A87"
                  size={26}
                />
              </div>
              <div className="text-[#3E4249] mt-[-45px] font-normal text-xs">
                Copy this and share to your employee to log in.
                <br /> The password has been emailed to them.
              </div>
            </CardContent>
            <CardFooter className="mt-6">
              <Button
                onClick={() => {
                  setNewEmployeeLoginDetails({ email: '', password: '' });
                  setShowConfirmationModal(false);
                }}
                className="flex justify-center items-center px-8 py-7 font-bold text-base bg-[#060A87] mx-auto hover:bg-[#060A87] hover:opacity-85"
              >
                Back to Employees Table
              </Button>
            </CardFooter>
          </Card>
        </div>
  )
}

export default ConfirmationModal