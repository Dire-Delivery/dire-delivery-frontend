'use client';

import type React from 'react';

import { useState, useEffect } from 'react';
import { Trash2, ChevronLeft, ChevronRight, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { fetchCity } from '@/actions/cities';
import { city } from '@/types/cities';

export default function PriceCitySettings() {
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
  }, []);

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

  //   const handleDeleteCity = (id: number) => {
  //     setCities(cities.filter((city) => city.id !== id));
  //   };

  return (
    <div className="flex-1 bg-white rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-6 pb-4 border-b">Price and City Setting</h2>

      <div className="grid md:grid-cols-2 gap-24 px-4">
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
      </div>

      <div className="grid md:grid-cols-2 gap-24 mt-8 px-4">
        {/* Cities Working On */}
        <div>
          <h3 className="text-lg font-semibold mb-4 pb-2 border-b">
            Cities Working On
          </h3>
          <p className="mb-4 text-sm">Here are Cities that we are working on</p>

          <div className="border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-4 text-left">City</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {cities.map((city) => (
                  <tr key={city.id} className="border-t">
                    <td className="py-3 px-4">{city.name}</td>
                    <td className="py-3 px-4 text-right">
                      <Button className="delete-button">
                        <Trash2 size={16} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pagination">
            <Button className="pagination-item">
              <ChevronLeft size={16} />
            </Button>
            <Button className="pagination-item active">1</Button>
            <Button className="pagination-item">2</Button>
            <Button className="pagination-item">3</Button>
            <span>...</span>
            <Button className="pagination-item">10</Button>
            <Button className="pagination-item">
              <ChevronRight size={16} />
            </Button>
          </div>
        </div>

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
            <button className="primary-button bg-[#0a1172] p-2 rounded-sm px-4 text-white">
              Add city
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
