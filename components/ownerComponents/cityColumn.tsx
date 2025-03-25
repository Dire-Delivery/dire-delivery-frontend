'use client';

import { ColumnDef } from '@tanstack/react-table';
import { city } from '@/types/cities';

export const columns: ColumnDef<city>[] = [
  {
    accessorKey: 'name',
    header: 'City',
  },
  {
    accessorKey: 'code',
    header: 'Code',
  },
];
