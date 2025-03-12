import { help } from '@/types/help';
import { X } from 'lucide-react';

type props = {
  setShowConfirmInfo: React.Dispatch<React.SetStateAction<boolean>>;
  help: help;
  handleClose: () => void;
  submitting: () => void;
};

export default function HelpConfirm({
  setShowConfirmInfo,
  help,
  handleClose,
  submitting,
}: props) {
  return (
    <div className="fixed inset-0 bg-[#060A87]/20 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6  w-[320px]md:max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-[#060A87]">
            {' '}
            New Help and Support Details
          </h2>
          <button onClick={() => setShowConfirmInfo(false)} title="Close">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="border px-5 py-5 flex flex-col gap-6">
          <div className="h-full">
            <h3 className="font-bold text-lg mb-2 pb-2 border-b-2">Email</h3>
            <div className="px-3 flex flex-col gap-1">
              <p>{help?.item.email}</p>
            </div>
          </div>

          <div className="h-full">
            <h3 className="font-bold text-lg mb-2 pb-2 border-b-2">Phone</h3>
            <div className="px-3 flex flex-col gap-1">
              <p>{help?.item.phone}</p>
            </div>
          </div>

          <div className="h-full">
            <h3 className="font-bold text-lg mb-2 pb-2 border-b-2">Location</h3>
            <div className="px-3 flex flex-col gap-1">
              <p>{help?.item.location}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={handleClose}
            className="px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={submitting}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
