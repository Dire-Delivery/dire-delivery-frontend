'use client';

import type React from 'react';

import { useState, useEffect } from 'react';
import { Pencil } from 'lucide-react';
import { deleteCity, fetchCity } from '@/actions/cities';
import { city, PriceInfoType } from '@/types/cities';
import { CityDataTable } from '../../ownerComponents/cityTable';
import { fetchPrice } from '@/actions/price';

import { columns } from '@/components/ownerComponents/cityColumn';
import { toast } from '@/hooks/use-toast';
import { userType } from '@/types/user';
import EditPrice from './editPrice';
import AddCities from './addCities';
import PriceCalc from './priceCalc';

type Props = {
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  setTriggerState: React.Dispatch<React.SetStateAction<boolean>>;
  triggerState: boolean;
  role: string;
  user: userType;
};
export default function PriceCitySettings({
  setActiveTab,
  setTriggerState,
  triggerState,
  role,
  user,
}: Props) {
  const [weight, setWeight] = useState('');
  const [calculatedPrice, setCalculatedPrice] = useState('0.00 birr');
  const [cities, setCities] = useState<city[]>([]);
  const [price, setPrice] = useState<number>();
  const [constatns, setconstants] = useState<PriceInfoType>();
  const [editPrice, setEditPrice] = useState<boolean>(false);
  const [newPrice, setNewPrice] = useState<number>(0);
  const [confirmModal, setConfirmModal] = useState<boolean>(false);

  useEffect(() => {
    const fetchPriceandCities = async () => {
      try {
        const cityResponse = await fetchCity();
        setCities(cityResponse.locations);
        const priceResponse = await fetchPrice();
        setconstants(priceResponse);
        setPrice(priceResponse.price);
        setNewPrice(price!);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPriceandCities();
  }, [triggerState, price]);

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

  return (
    <div className="flex-1 bg-white rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-6 pb-4 border-b">
        Price and City Setting
      </h2>

      <div className="grid md:grid-cols-2 gap-12 md:gap-24 px-2 mb-12">
        {/* Base Price */}
        {editPrice ? (
          <EditPrice
            setNewPrice={setNewPrice}
            confirmModal={confirmModal}
            setConfirmModal={setConfirmModal}
            newPrice={newPrice}
            userId={user!.id}
            constatns={constatns!}
            setEditPrice={setEditPrice}
            setTriggerState={setTriggerState}
          />
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
        <PriceCalc
          weight={weight}
          setWeight={setWeight}
          price={price!}
          calculatedPrice={calculatedPrice}
          setCalculatedPrice={setCalculatedPrice}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-12 md:gap-24 mt-8 px-4">
        {/* Add Cities */}
        {(role === 'OWNER' || role === 'ADMIN') && (
          <AddCities
            setActiveTab={setActiveTab}
            setTriggerState={setTriggerState}
            userId={user.id}
          />
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
