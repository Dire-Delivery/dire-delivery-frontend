'use client';

import type React from 'react';

import { useState, useEffect } from 'react';
import { Pencil } from 'lucide-react';
import { addCity, deleteCity, fetchCity } from '@/actions/cities';
import { city, cityaddFormSchema, PriceInfoType } from '@/types/cities';
import { CityDataTable } from './cityTable';
import { changePrice, fetchPrice } from '@/actions/price';
// import { price } from '@/types/price';

import { columns } from '@/components/ownerComponents/cityColumn';
import { Button } from '../ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from '@/hooks/use-toast';
import { z } from 'zod';
import { userType } from '@/types/user';
import { userProfile } from '@/actions/auth';

type Props = {
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  setTriggerState: React.Dispatch<React.SetStateAction<boolean>>;
  triggerState: boolean;
  role: string;
};
export default function PriceCitySettings({
  setActiveTab,
  setTriggerState,
  triggerState,
  role,
}: Props) {
  const [weight, setWeight] = useState('');
  const [calculatedPrice, setCalculatedPrice] = useState('0.00 birr');
  const [cities, setCities] = useState<city[]>([]);
  const [price, setPrice] = useState<number>();
  const [constatns, setconstants] = useState<PriceInfoType>();
  const [editPrice, setEditPrice] = useState<boolean>(false);
  const [newPrice, setNewPrice] = useState<number>(0);
  const [confirmModal, setConfirmModal] = useState<boolean>(false);
  const [user, setUser] = useState<userType | null>(null);

  useEffect(() => {
    const fetchPriceandCities = async () => {
      const decoded = await userProfile();
      const user = decoded as userType;
      setUser(user);

      try {
        const response = await fetchCity();
        setCities(response.locations);
      } catch (error) {
        console.log(error);
      }

      try {
        const response = await fetchPrice();
        setconstants(response);
        setPrice(response.price);
        setNewPrice(price!);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPriceandCities();
  }, [triggerState, price]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof cityaddFormSchema>>({
    resolver: zodResolver(cityaddFormSchema),
  });

  const onSubmit: SubmitHandler<z.infer<typeof cityaddFormSchema>> = async (
    data
  ) => {
    const cityData = {
      ...data,
    };
    try {
      await addCity({ data: cityData, userid: user!.id });
      setActiveTab('price');
      setTriggerState((prev) => !prev);
      toast({
        title: 'added successfully',
        description: 'City added successfully',
        variant: 'success',
      });
      reset();
    } catch (error) {
      toast({
        title: 'Error adding City',
        description: 'Error while adding order',
        variant: 'destructive',
      });
      console.log(error);
    }
  };

  const priceCalculator = (weight: number) => {
    const basePrice = price;
    if (weight <= 1 && weight > 0) {
      return basePrice!;
    } else {
      return basePrice! * weight;
    }
  };

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWeight(e.target.value);
    // Simple calculation for demo purposes
    const weightNum = Number.parseFloat(e.target.value) || 0;

    setCalculatedPrice(`${priceCalculator(weightNum).toFixed(2)} birr`);
  };

  const handleDelete = async (code: string) => {
    try {
      await deleteCity({ userid: user!.id, code });
      toast({
        title: 'Deleted Successfully',
        description: `City ${code} Deleted succesfully `,
        variant: `success`,
      });
      setActiveTab('price');
      setTriggerState((prev) => !prev);
    } catch (error) {
      toast({
        title: 'Deleted unsuccessful',
        description: `City ${code} is not Deleted succesfully `,
        variant: `destructive`,
      });
      console.log(error);
    }
  };
  const handlePriceChange = async () => {
    const newPriceSet = {
      price: newPrice,
    };
    try {
      await changePrice({
        data: newPriceSet,
        userid: user!.id,
        constants: constatns!.id,
      });
      toast({
        title: 'Successfull',
        description: `Price Set succesfull `,
        variant: `success`,
      });
      setConfirmModal(false);
      setEditPrice(false);
      setTriggerState((prev) => !prev);
    } catch (error) {
      console.log(error);
      toast({
        title: 'Error',
        description: `Error on Price Set `,
        variant: `destructive`,
      });
    }
  };
  return (
    <div className="flex-1 bg-white rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-6 pb-4 border-b">
        Price and City Setting
      </h2>

      <div className="grid md:grid-cols-2 gap-12 md:gap-24 px-2 mb-12">
        {/* Base Price */}
        {editPrice ? (
          <div>
            <div className="flex flex-col justify-start items-start gap-3 border">
              <div className="w-full py-2 border-b border-black inline-flex justify-start items-center gap-2.5">
                <div className="w-full justify-start text-black text-lg font-bold font-['Manrope'] leading-tight">
                  Edit Price
                </div>
              </div>
              <div className="w-full  flex flex-col justify-center items-end gap-2.5">
                <div className="w-full h-5 justify-start text-muted-foreground text-sm font-normal font-['Manrope'] leading-tight">
                  Set a Price for Orders based on Weight
                </div>
                <div className="w-full flex justify-between items-center">
                  <div className="inline-flex flex-col justify-start items-start gap-1.5 w-full ">
                    <div className="justify-start text-foreground text-base font-medium font-['Manrope'] leading-tight">
                      Base Price (birr)
                    </div>
                    <div className="w-full h-10 inline-flex justify-start items-center gap-2">
                      <div className="flex-1 inline-flex flex-col justify-start items-start gap-1.5">
                        <input
                          title="base"
                          type="number"
                          className=" px-2 py-2.5 rounded-md outline outline-1 outline-input justify-start text-zinc-500 text-base font-normal font-['Manrope'] leading-tight w-full h-full"
                          onChange={(e) => setNewPrice(Number(e.target.value))}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <AlertDialog open={confirmModal} onOpenChange={setConfirmModal}>
                  <AlertDialogTrigger asChild>
                    <Button
                      className="h-10 px-3 bg-violet-950 rounded-lg outline outline-1 outline-offset-[-1px] outline-violet-950 inline-flex justify-center items-center gap-2.5 text-base"
                      onClick={() => setConfirmModal(true)}
                    >
                      Confirm
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        Change the Price
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel onClick={() => setConfirmModal(false)}>
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => {
                          // Add your action here
                          handlePriceChange();
                        }}
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <h3 className="text-lg font-semibold mb-4 pb-2 border-b">
              Base Price
            </h3>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm mb-1">Base Price(birr)</p>
                <p className="font-semibold">{price} birr</p>
              </div>
              <div>
                <p className="text-sm mb-1">Price Per Kilogram(birr)</p>
                <p className="font-semibold">{price} birr</p>
              </div>
            </div>

            {(role === 'OWNER' || role === 'ADMIN') && (
              <div className="flex justify-end">
                <button
                  className="primary-button bg-[#0a1172] flex items-center gap-2 p-2 rounded-sm px-4 text-white"
                  onClick={() => setEditPrice(true)}
                >
                  <Pencil size={16} />
                  Edit Price
                </button>
              </div>
            )}
          </div>
        )}

        {/* Price Calculator */}
        <div>
          <h3 className="text-lg font-semibold mb-4 pb-2 border-b">
            Price Calculator
          </h3>
          <p className="mb-4 text-sm">
            Calculate the total Price for delivery based on weight
          </p>

          <div className="mb-4 w-full">
            <label className="block mb-2 font-medium">Weight(kg)</label>
            <input
              type="number"
              className="input-field border rounded-md py-2 px-2 w-full"
              value={weight}
              onChange={handleWeightChange}
              placeholder="Enter weight"
            />
          </div>

          <div className="text-xl font-semibold mt-4">{calculatedPrice}</div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-12 md:gap-24 mt-8 px-4">
        {/* Add Cities */}
        {(role === 'OWNER' || role === 'ADMIN') && (
          <div>
            <h3 className="text-lg font-semibold mb-4 pb-2 border-b">
              Add Cities
            </h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <div>
                  <label className="block mb-2 font-medium">City</label>
                  <input
                    type="text"
                    className="input-field border rounded-md w-full p-2"
                    {...register('name')}
                    placeholder="(ex. Dire Dawa)"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block mb-2 font-medium">City</label>
                  <input
                    type="text"
                    className="input-field border rounded-md w-full p-2"
                    {...register('code')}
                    placeholder="(ex. ETDD)"
                  />
                  {errors.code && (
                    <p className="text-red-500 text-sm">
                      {errors.code.message}
                    </p>
                  )}
                </div>
                <div className="flex justify-end mt-2">
                  <Button
                    type="submit"
                    className="primary-button bg-[#0a1172] p-2 rounded-sm px-4 text-white"
                  >
                    Add city
                  </Button>
                </div>
              </div>
            </form>
          </div>
        )}
        {/* Cities Working On */}
        <div>
          <h3 className="text-lg font-semibold mb-4 pb-2 border-b">
            Cities Working On
          </h3>
          <p className="mb-4 text-sm">Here are Cities that we are working on</p>

          <CityDataTable
            role={role}
            columns={columns}
            data={cities}
            totalEntries={cities.length}
            handleDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
}
