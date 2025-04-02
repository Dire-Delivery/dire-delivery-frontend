import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDate } from '@/lib/utils';
import { FileText } from 'lucide-react';
import React from 'react';

interface PackageCardProps {
  transactionCode: string;
  createdAT: string;
  totalPrice: number;
  payment: number;
}

export const OrderDetailCard: React.FC<PackageCardProps> = ({
  transactionCode,
  createdAT,
  totalPrice,
  payment,
}) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-md flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Order Details
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium">Transaction Number</p>
              <p className="text-sm text-gray-500">{transactionCode}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Order Date</p>
              <p className="text-sm text-gray-500">
                {createdAT ? formatDate(createdAT) : 'N/A'}
              </p>
            </div>
          </div>
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium">Total Price</p>
              <p className="text-sm text-gray-500">{totalPrice} birr</p>
            </div>
            <div>
              <p className="text-sm font-medium">Payment Method</p>
              <p className="text-sm text-gray-500">
                {payment === 1 ? 'Now' : 'On Delivery'}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
