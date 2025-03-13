'use client';

import type React from 'react';

import { useState, useEffect } from 'react';
import { Pencil } from 'lucide-react';
import { addCity, deleteCity, fetchCity } from '@/actions/cities';
import { city } from '@/types/cities';
import { DataTable } from './cityTable';
import { v4 as uuidv4 } from 'uuid';
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
import { price } from '@/types/price';

type Props = {
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  setTriggerState: React.Dispatch<React.SetStateAction<boolean>>;
  triggerState: boolean;
};
export default function PriceCitySettings({
  setActiveTab,
  setTriggerState,
  triggerState,
}: Props) {
  const [weight, setWeight] = useState('');
  const [calculatedPrice, setCalculatedPrice] = useState('0.00 birr');
  const [newCity, setNewCity] = useState('');
  const [cities, setCities] = useState<city[]>([]);
  const [price, setPrice] = useState<number>();
  const [editPrice, setEditPrice] = useState<boolean>(false);
  const [newPrice, setNewPrice] = useState<number>(0);
  const [confirmModal, setConfirmModal] = useState<boolean>(false);
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetchCity();
        console.log('cities:', response);
        setCities(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCities();
  }, [triggerState]);

  useEffect(() => {
    const fetchaPrice = async () => {
      try {
        const response = await fetchPrice();
        console.log('price:', response);
        setPrice(response.item.basePrice);
        setNewPrice(price!);
      } catch (error) {
        console.log(error);
      }
    };
    fetchaPrice();
  }, [triggerState]);

  console.log('priceState:', price);

  const priceCalculator = (weight: number) => {
    const basePrice = price;
    if (weight <= 1 && weight > 0) {
      return basePrice!;
    } else {
      return basePrice! * weight;
    }
  };
  const handleAddCity = async (city: string) => {
    const randomId = uuidv4();
    const cityData = {
      id: randomId,
      name: city,
    };
    console.log(cityData);
    try {
      const response = await addCity(cityData);
      console.log(response);
      setActiveTab('price');
      setTriggerState((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWeight(e.target.value);
    // Simple calculation for demo purposes
    const weightNum = Number.parseFloat(e.target.value) || 0;

    setCalculatedPrice(`${priceCalculator(weightNum).toFixed(2)} birr`);
  };

  const handleDelete = async (id: string) => {
    console.log('id:', id);
    try {
      const response = await deleteCity(id);
      console.log(response);
      setActiveTab('price');
      setTriggerState((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };
  const handlePriceChange = async () => {
    console.log('newPrice:', newPrice);
    const newPriceSet = {
      item: {
        basePrice: newPrice,
      },
    };
    try {
      const response = await changePrice(newPriceSet as price);
      console.log('response:', response);
      setConfirmModal(false);
      setEditPrice(false);
      setTriggerState((prev) => !prev);
    } catch (error) {
      console.log(error);
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
                        delete your account and remove your data from our
                        servers.
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

            <div className="flex justify-end">
              <button
                className="primary-button bg-[#0a1172] flex items-center gap-2 p-2 rounded-sm px-4 text-white"
                onClick={() => setEditPrice(true)}
              >
                <Pencil size={16} />
                Edit Price
              </button>
            </div>
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
        <div>
          <h3 className="text-lg font-semibold mb-4 pb-2 border-b">
            Add Cities
          </h3>

          <div className="mb-4">
            <label className="block mb-2 font-medium">City</label>
            <input
              type="text"
              className="input-field border rounded-md w-full p-2"
              value={newCity}
              onChange={(e) => setNewCity(e.target.value)}
              placeholder="(ex. Dire Dawa)"
            />
          </div>

          <div className="flex justify-end">
            <button
              className="primary-button bg-[#0a1172] p-2 rounded-sm px-4 text-white"
              onClick={() => handleAddCity(newCity)}
            >
              Add city
            </button>
          </div>
        </div>
        {/* Cities Working On */}
        <div>
          <h3 className="text-lg font-semibold mb-4 pb-2 border-b">
            Cities Working On
          </h3>
          <p className="mb-4 text-sm">Here are Cities that we are working on</p>

          <DataTable
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
