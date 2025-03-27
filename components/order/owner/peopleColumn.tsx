'use client';

import { Order } from '@/types/orderType';
import { ColumnDef } from '@tanstack/react-table';

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
