'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Order } from '@/types/orderType';
import { formatDate } from '@/lib/utils';
import { getStatusColor } from '@/components/trackorder/factories';

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: 'orderDetails.order.transactionCode',
    header: 'Transaction ID',
    cell: ({ row }) => row.original.orderDetails.order.transactionCode || 'N/A',
  },
  {
    accessorKey: 'orderDetails.sender.name',
    header: 'Sender Name',
    cell: ({ row }) => row.original.orderDetails.sender.name,
  },
  {
    accessorKey: 'orderDetails.receiver.name',
    header: 'Receiver Name',
    cell: ({ row }) => row.original.orderDetails.receiver.name,
  },
  {
    accessorKey: 'orderDetails.employeeInfo.name',
    header: 'Added By',
    cell: ({ row }) => row.original.orderDetails.employeeInfo.name,
  },
  {
    accessorKey: 'createdAt',
    header: 'Date',
    cell: ({ row }) => {
      const formatted = formatDate(row.original.orderDetails.status[0].date);
      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: 'orderDetails.sender.address',
    header: 'From',
    cell: ({ row }) => row.original.orderDetails.sender.address,
  },
  {
    accessorKey: 'orderDetails.receiver.address',
    header: 'To',
    cell: ({ row }) => row.original.orderDetails.receiver.address,
  },
  {
    accessorKey: 'orderDetails.order.status',
    header: 'Status',
    cell: ({ row }) => {
      const latestStatus = row.original.orderDetails.order.status; // Get the latest status
      if (!latestStatus) return <div>N/A</div>;

      const formatted = getStatusColor(latestStatus);

      return (
        <div
          className={`w-20 h-fit rounded-xl flex items-center justify-center z-10 ${formatted}`}
        >
          {latestStatus}
        </div>
      );
    },
  },
];
