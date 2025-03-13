'use client';

import { Mail, Phone, MapPin, Edit } from 'lucide-react';
import type { help } from '@/types/help';
import { useEffect, useState } from 'react';
import { HelpFetch, patchHelp } from '@/actions/help';
import { Button } from '@/components/ui/button';
import { z } from 'zod';

const helpForm = z.object({
  email: z.string().email(),
  phone: z.string().min(10),
  location: z.string(),
});
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import HelpForm from '@/components/order/owner/help/helpEdit';
import HelpConfirm from '@/components/order/owner/help/helpConfirm';

export default function Page() {
  const [help, setHelp] = useState<help>();
  const [showEditInfoModal, setShowEditInfoModal] = useState<boolean>(false);
  const [triggerState, setStateTrigger] = useState<boolean>(false);

  const [showConfirmInfo, setShowConfirmInfo] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof helpForm>>({
    resolver: zodResolver(helpForm),
  });

  useEffect(() => {
    const fetchHelp = async () => {
      try {
        const response = await HelpFetch();
        setHelp(response);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchHelp();
  }, [triggerState]);

  const onSubmit: SubmitHandler<z.infer<typeof helpForm>> = async (data) => {
    console.log('Form data submitted:', data); // Log form data
    const updatedHelp = {
      item: {
        email: data.email,
        phone: data.phone,
        location: data.location,
      },
    };
    setHelp(updatedHelp);
    setShowEditInfoModal(false);
    setShowConfirmInfo(true);
    console.log('Updated help data:', updatedHelp); // Log updated help data
  };
  const handleClose = () => {
    reset();
    setShowConfirmInfo(false);
    setStateTrigger(!triggerState);
  };

  const submitting = async () => {
    try {
      const response = await patchHelp(help!);
      console.log('response:', response);
      setShowEditInfoModal(false);
      setShowConfirmInfo(false);
      reset();
      setStateTrigger(!triggerState);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="h-screen bg-[#f0f1fa] flex p-6 md:p-10">
        <div className="w-full">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-[#0a0f8a]">
              Welcome Back, Owner!
            </h1>
            <p className="text-[#0a0f8a]/80">
              Here&apos;s your Help and Support
            </p>
          </div>

          <div className="bg-white w-full rounded-lg shadow-sm p-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Help and Support
            </h2>
            <div className="h-px bg-gray-200 mb-6"> </div>

            <div className="md:w-[480px] ">
              <div className="space-y-6 flex flex-col p-2 gap-2">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                    <Mail className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Email Support</h3>
                    <p className="text-gray-500">{help?.item.email}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                    <Phone className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Phone Support</h3>
                    <p className="text-gray-500">{help?.item.phone}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                    <MapPin className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Location</h3>
                    <p className="text-gray-500">{help?.item.location}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8  flex justify-end ">
                <Button
                  onClick={() => setShowEditInfoModal(true)}
                  className="inline-flex items-center px-4 py-2 bg-[#0a0f8a] text-white rounded-md hover:bg-[#0a0f8a]/90 transition-colors"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Info
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showEditInfoModal && (
        <HelpForm
          setShowEditInfoModal={setShowEditInfoModal}
          help={help!}
          register={register}
          handleSubmit={handleSubmit}
          errors={errors}
          onSubmit={onSubmit}
        />
      )}
      {showConfirmInfo && (
        <HelpConfirm
          setShowConfirmInfo={setShowConfirmInfo}
          help={help!}
          handleClose={handleClose}
          submitting={submitting}
        />
      )}
    </>
  );
}
