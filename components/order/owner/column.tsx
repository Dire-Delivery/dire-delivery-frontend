'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Order } from '@/types/orderType';
import { formatDate } from '@/lib/utils';
import { getStatusColor } from '@/components/trackorder/factories';

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: 'transactionId',
    header: 'TransactionId',
  },
  {
    accessorKey: 'senderName',
    header: 'Sender Name',
  },
  {
    accessorKey: 'reciverName',
    header: 'Reciver Name',
  },
  {
    accessorKey: 'addedBy',
    header: 'Added By',
  },
  {
    accessorKey: 'createdAt',
    header: 'Date',
    cell: ({ row }) => {
      const formatted = formatDate(row.getValue('createdAt'));
      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: 'senderAddress',
    header: 'From',
  },
  {
    accessorKey: 'reciverAddress',
    header: 'To',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const formatted = getStatusColor(
        (row.getValue('status') as string).toLowerCase()
      );
      return (
        <div
          className={`w-20 h-fit rounded-xl flex items-center justify-center z-10 ${formatted}`}
        >
          {row.getValue('status')}
        </div>
      );
    },
  },
];
