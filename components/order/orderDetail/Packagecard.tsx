import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package } from 'lucide-react';
import React, { useMemo } from 'react';

interface PackageCardProps {
  description: string;
  weight: number;
  quantity: number;
}

export const PackageCard: React.FC<PackageCardProps> = ({
  description,
  weight,
  quantity,
}) => {
  return useMemo(
    () => (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-md flex items-center gap-2">
            <Package className="h-5 w-5" />
            Package Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium">Description</p>
              <p className="text-sm text-gray-500">{description}</p>
            </div>
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium">Weight</p>
                <p className="text-sm text-gray-500">{weight}kg</p>
              </div>
              <div>
                <p className="text-sm font-medium">Quantity</p>
                <p className="text-sm text-gray-500">{quantity}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    ),
    [description, weight, quantity]
  );
};
