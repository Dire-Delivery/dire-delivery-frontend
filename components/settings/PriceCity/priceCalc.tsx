import { priceCalculator } from '@/lib/utils';
import React from 'react';

type Props = {
  weight: string;
  calculatedPrice: string;
  setWeight: React.Dispatch<React.SetStateAction<string>>;
  setCalculatedPrice: React.Dispatch<React.SetStateAction<string>>;
  price: number;
};

function PriceCalc({
  weight,
  calculatedPrice,
  setWeight,
  setCalculatedPrice,
  price,
}: Props) {
  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWeight(e.target.value);
    const weightNum = Number.parseFloat(e.target.value) || 0;

    setCalculatedPrice(`${priceCalculator(weightNum, price!).toFixed(2)} birr`);
  };
  return (
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
  );
}

export default PriceCalc;
