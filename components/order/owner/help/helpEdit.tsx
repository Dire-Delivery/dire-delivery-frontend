import { help } from '@/types/help';
import { X } from 'lucide-react';
import React from 'react';
import {
  UseFormRegister,
  UseFormHandleSubmit,
  FieldErrors,
  SubmitHandler,
} from 'react-hook-form';
import { z } from 'zod';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const helpFormSchema = z.object({
  email: z.string().email(),
  phone: z.string().min(10),
  location: z.string(),
});

type HelpFormSchema = z.infer<typeof helpFormSchema>;

type props = {
  help: help;
  setShowEditInfoModal: React.Dispatch<React.SetStateAction<boolean>>;
  register: UseFormRegister<HelpFormSchema>;
  handleSubmit: UseFormHandleSubmit<HelpFormSchema>;
  errors: FieldErrors<HelpFormSchema>;
  onSubmit: SubmitHandler<HelpFormSchema>;
};

export default function HelpForm({
  setShowEditInfoModal,
  handleSubmit,
  onSubmit,
  help,
  register,
  errors,
}: props) {
  return (
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
                    Email
                  </label>
                  <input
                    type="text"
                    placeholder={help?.item.email}
                    className="w-full px-3 py-2 border rounded-lg"
                    {...register('email')}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    placeholder={help?.item.phone}
                    className="w-full px-3 py-2 border rounded-lg"
                    {...register('phone')}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    placeholder={help?.item.location}
                    className="w-full px-3 py-2 border rounded-lg"
                    {...register('location')}
                  />
                  {errors.location && (
                    <p className="text-red-500 text-sm">
                      {errors.location.message}
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
  );
}
