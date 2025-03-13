'use client';

import { X } from 'lucide-react';
import { city } from '@/types/cities';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useForm, SubmitHandler } from 'react-hook-form';
import { addFormSchema } from '@/types/order';
import { useState } from 'react';
import { Order } from '@/types/orderType';
import { formatDate } from '@/lib/utils';
import { generateTransactionId } from '@/lib/utils';
import { v4 as uuidv4 } from 'uuid';
import ConfirmModal from '../confirmModal';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { AddOrder } from '@/actions/order';
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
  const [currentOrder, setCurrentOrder] = useState<Order>({
    id: '',
    createdAt: '',
    addedBy: 'Eyosi',
    senderName: '',
    reciverName: '',
    description: '',
    senderAddress: '',
    reciverAddress: '',
    paymentMethod: undefined,
    senderPhoneNumber: '',
    reciverPhoneNumber: '',
    senderEmail: '',
    reciverEmail: '',
    weight: 0,
    quantity: 1,
    transactionId: '',
    status: '',
  });
  const [recieptOrder, setReipetOrder] = useState<Order>({
    id: '',
    createdAt: '',
    addedBy: 'Eyosi',
    senderName: '',
    reciverName: '',
    description: '',
    senderAddress: '',
    reciverAddress: '',
    paymentMethod: undefined,
    senderPhoneNumber: '',
    reciverPhoneNumber: '',
    senderEmail: '',
    reciverEmail: '',
    weight: 0,
    quantity: 1,
    transactionId: '',
    status: '',
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<z.infer<typeof addFormSchema>>({
    resolver: zodResolver(addFormSchema),
  });
  const priceCalculator = (weight: number, quantity: number) => {
    const basePrice = 200;
    if (weight <= 1 && weight > 0) {
      return basePrice * quantity;
    } else {
      return basePrice * weight * quantity;
    }
  };

  const onSubmit: SubmitHandler<z.infer<typeof addFormSchema>> = async (
    data
  ) => {
    console.log('Form data submitted:', data); // Log form data
    const totalPrice = priceCalculator(data.weight, data.quantity);
    const date = new Date();
    const randomTransaction = generateTransactionId();
    const randomId = uuidv4();
    const orderData = {
      ...data,
      id: randomId,
      createdAt: formatDate(date.toLocaleDateString()),
      transactionId: randomTransaction,
      status: 'Pending',
      Price: totalPrice,
      addedBy: 'Eyosi',
    };
    console.log('Order data:', orderData); // Log order data
    setCurrentOrder(orderData);
    setShowNewEmployeeModal(false);
    setShowConfirmationModal(true);
  };
  const submitting = async () => {
    try {
      const response = await AddOrder(currentOrder);
      console.log('responseFromadd', response);
      setReipetOrder(currentOrder);
      setShowConfirmationModal(false);
      setShowRecipt(true);
      setCurrentOrder({
        id: '',
        createdAt: '',
        addedBy: 'Eyosi',
        senderName: '',
        reciverName: '',
        description: '',
        senderAddress: '',
        reciverAddress: '',
        paymentMethod: undefined,
        senderPhoneNumber: '',
        reciverPhoneNumber: '',
        senderEmail: '',
        reciverEmail: '',
        weight: 0,
        quantity: 1,
        transactionId: '',
        status: '',
      });
      reset();
    } catch (error) {
      console.log(error);
    }
  };
  const handleClose = () => {
    setCurrentOrder({
      id: '',
      createdAt: '',
      addedBy: 'Eyosi',
      senderName: '',
      reciverName: '',
      description: '',
      senderAddress: '',
      reciverAddress: '',
      paymentMethod: undefined,
      senderPhoneNumber: '',
      reciverPhoneNumber: '',
      senderEmail: '',
      reciverEmail: '',
      weight: 0,
      quantity: 1,
      transactionId: '',
      status: '',
    });
    setShowNewEmployeeModal(false);
    reset();
  };
  console.log('Form errors:', errors);
  console.log('currentOrder:', currentOrder);

  return (
    <>
      {showNewEmployeeModal && (
        <div className="fixed inset-0 bg-[#060A87] bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full h-fit max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-[#060A87]">Add An Employee</h2>
              <button onClick={() => handleClose()} title="Close">
                <X className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="px-2">
              <div className="space-y-2">
                
                
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
            </form>
          </div>
        </div>
      )}

      {showConfirmationModal && (
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
      )}

      {showRecipet && (
        <ConfirmModal
          currentOrder={{ ...recieptOrder, id: uuidv4() }}
          setShowRecipt={setShowRecipt}
        />
      )}
    </>
  );
}
