import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { orderDetail } from '@/types/orderType';
import { Label } from '@radix-ui/react-label';
import { Truck } from 'lucide-react';
import React, { useMemo } from 'react';

interface DeliveryStatusCardProps {
  order: orderDetail; // Replace `any` with the appropriate type for `order`
  handleStatusChange: (transactionCode: string, status: string) => void;
}

const DeliveryStatusCard: React.FC<DeliveryStatusCardProps> = ({
  order,
  handleStatusChange,
}) => {
  return useMemo(
    () => (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-md flex items-center gap-2">
            <Truck className="h-5 w-5" />
            Delivery Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-3">
            {['Pending', 'Delivered', 'Picked-up'].map((status) => (
              <div key={status} className="flex items-center space-x-2">
                <input
                  title="radio"
                  type="radio"
                  id={status.toLowerCase()}
                  name="status"
                  value={status}
                  checked={order?.order.status === status}
                  onChange={() =>
                    order &&
                    handleStatusChange(order.order.transactionCode, status)
                  }
                />
                <Label htmlFor={status.toLowerCase()}>{status}</Label>
              </div>
            ))}
          </form>
        </CardContent>
      </Card>
    ),
    [order, handleStatusChange]
  );
};

export default DeliveryStatusCard;
