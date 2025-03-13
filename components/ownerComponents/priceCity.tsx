'use client';

import type React from 'react';

import { useState, useEffect } from 'react';
import { Pencil } from 'lucide-react';
import { addCity, deleteCity, fetchCity } from '@/actions/cities';
import { city } from '@/types/cities';
import { DataTable } from './cityTable';
import { v4 as uuidv4 } from 'uuid';

import { columns } from '@/components/ownerComponents/cityColumn';

type Props = {
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  setTriggerState: React.Dispatch<React.SetStateAction<boolean>>;
  triggerState: boolean;
};
// import { DataTablePagination } from './pagination';
export default function PriceCitySettings({
  setActiveTab,
  setTriggerState,
  triggerState,
}: Props) {
  const [weight, setWeight] = useState('');
  const [calculatedPrice, setCalculatedPrice] = useState('0.00 birr');
  const [newCity, setNewCity] = useState('');
  const [cities, setCities] = useState<city[]>([]);

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
    setCalculatedPrice(`${(weightNum * 5).toFixed(2)} birr`);
  };

  //   const handleAddCity = () => {
  //     if (newCity.trim()) {
  //       setCities([...cities, { id: Date.now(), name: newCity }]);
  //       setNewCity('');
  //     }
  //   };

  // const handleDeleteCity = (id: string) => {
  //   setCities(cities.filter((city) => city.id !== id));
  // };
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
  return (
    <div className="flex-1 bg-white rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-6 pb-4 border-b">
        Price and City Setting
      </h2>

      <div className="grid md:grid-cols-2 gap-12 md:gap-24 px-4 mb-12">
        {/* Base Price */}
        <div>
          <h3 className="text-lg font-semibold mb-4 pb-2 border-b">
            Base Price
          </h3>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm mb-1">Base Price(birr)</p>
              <p className="font-semibold">10.00 birr</p>
            </div>
            <div>
              <p className="text-sm mb-1">Price Per Kilogram(birr)</p>
              <p className="font-semibold">5.00 birr</p>
            </div>
          </div>

          <div className="flex justify-end">
            <button className="primary-button bg-[#0a1172] flex items-center gap-2 p-2 rounded-sm px-4 text-white">
              <Pencil size={16} />
              Edit Price
            </button>
          </div>
        </div>
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
