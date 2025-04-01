'use client';

import { help } from '@/types/help';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { patchHelp } from '@/actions/help';
import dynamic from 'next/dynamic';
import { X } from 'lucide-react';
import { useState } from 'react';

const helpForm = z.object({
  supportTel: z.string().min(10, 'Sender phone number is required'),
});

const HelpConfirm = dynamic(() => import('@/components/help/helpConfirm'), {
  ssr: false,
});

type Props = {
  setShowEditInfoModal: React.Dispatch<React.SetStateAction<boolean>>;
  help: help;
  setHelp: React.Dispatch<React.SetStateAction<help | undefined>>;
  setStateTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  userID: string;
  constantsId: number;
  triggerState: boolean;
};

export default function HelpForm({
  setShowEditInfoModal,
  help,
  setHelp,
  setStateTrigger,
  userID,
  constantsId,
  triggerState,
}: Props) {
  const [showConfirmInfo, setShowConfirmInfo] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(helpForm),
  });

  const onSubmit: SubmitHandler<z.infer<typeof helpForm>> = (data) => {
    console.log('submitting');

    setHelp({ supportTel: data.supportTel });
    setShowConfirmInfo(!showConfirmInfo);
  };

  const handleClose = () => {
    reset();
    setShowConfirmInfo(false);
    setStateTrigger(!triggerState);
  };

  const submitting = async () => {
    try {
      await patchHelp({
        data: help!,
        userid: userID,
        constants: constantsId,
      });
      setShowConfirmInfo(false);
      setShowEditInfoModal(false);
      reset();
      setStateTrigger(!triggerState);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {showConfirmInfo ? (
        <HelpConfirm
          setShowConfirmInfo={setShowConfirmInfo}
          help={help}
          handleClose={handleClose}
          submitting={submitting}
        />
      ) : (
        <div className="fixed inset-0 bg-[#060A87] bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[380px] md:w-full h-fit md:max-w-md ">
            <div className="flex justify-between items-center mb-4 border-b pb-2">
              <h2 className="text-xl font-bold  text-[#060a87] ">Edit Info</h2>
              <button onClick={() => setShowEditInfoModal(false)} title="Close">
                <X className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="px-2">
              <div className="space-y-2">
                {/* Repeat similar blocks for Sender and Receiver Information */}
                <div className="mt-2">
                  <div className="flex flex-col gap-4 mt-2 px-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        placeholder={help?.supportTel}
                        className="w-full px-3 py-2 border rounded-lg"
                        {...register('supportTel')}
                      />
                      {errors.supportTel && (
                        <p className="text-red-500 text-sm">
                          {errors.supportTel.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-4 mt-2">
                  <div></div>

                  <button
                    type="button"
                    onClick={() => setShowEditInfoModal(false)}
                    className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Change
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
