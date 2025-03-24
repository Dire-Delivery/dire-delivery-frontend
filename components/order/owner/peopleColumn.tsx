'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Order } from '@/types/orderType';
import { formatDate } from '@/lib/utils';
import { getStatusColor } from '@/components/trackorder/factories';

export const employeeColumns: ColumnDef<Order>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'phoneNumber',
    header: 'Phone',
  },
  {
    accessorKey: 'location',
    header: 'Location',
  }
];


export const adminsColumns: ColumnDef<Order>[] = [
  {
    accessorKey: 'name',
    header: 'Admin Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'phoneNumber',
    header: 'Phone Number',
  },
  {
    accessorKey: 'location',
    header: 'Location',
  }
];
