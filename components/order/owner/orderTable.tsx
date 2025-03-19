'use client';

import { useState } from 'react';
import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

import Link from 'next/link';
import { LuEye } from 'react-icons/lu';
import { RiDeleteBin5Line } from 'react-icons/ri';

type NewType<
  TData extends {
    orderDetails?: {
      employeeInfo: {
        name: string;
        email: string;
        phone: string | null;
        location: string;
      };
      order?: {
        payment: number;
        transactionCode: string;
        status: string;
      };
    };
    id: string;
  },
> = TData;

interface DataTableProps<TData extends { id: string }, TValue> {
  columns: ColumnDef<NewType<TData>, TValue>[];
  data: TData[];
  totalEntries: number;
  handleDelete: (id: string) => void;
  role: string;
  name: string;
}

export function DataTable<
  TData extends {
    orderDetails: {
      employeeInfo: {
        name: string;
        email: string;
        phone: string | null;
        location: string;
      };
      order: {
        payment: number;
        transactionCode: string;
        status: string;
      };
    };
    id: string;
  },
  TValue,
>({
  columns,
  data,
  totalEntries,
  handleDelete,
  name,
  role,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [openAlertDialogId, setOpenAlertDialogId] = useState<string | null>(
    null
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  });

  // Debugging logs
  console.log('Table Data:', data);
  console.log('Column Filters:', columnFilters);
  console.log('Filtered Rows:', table.getRowModel().rows);

  return (
    <div className="w-full">
      <div className="flex items-center py-4 gap-4">
        {/* Search by Transaction Code */}
        <Input
          placeholder="Search by transaction code"
          value={
            (table
              .getColumn('orderDetails.order.transactionCode')
              ?.getFilterValue() as string) ?? ''
          }
          onChange={(event) => {
            const value = event.target.value || undefined;
            table
              .getColumn('orderDetails.order.transactionCode')
              ?.setFilterValue(value);
          }}
          className="max-w-sm"
        />

        {/* Filter by Status */}
        <Select
          value={
            (table
              .getColumn('orderDetails.order.status')
              ?.getFilterValue() as string) ?? ''
          }
          onValueChange={(value) => {
            table
              .getColumn('orderDetails.order.status')
              ?.setFilterValue(value === 'All Status' ? undefined : value);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All Status">All Status</SelectItem>
            <SelectItem value="Delivered">Delivered</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Picked Up">Picked Up</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
                <TableHead>Actions</TableHead>
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                  <TableCell>
                    {/* Actions Dropdown */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <span className="text-lg">⋮</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40">
                        <Link
                          href={`/owner/orders/${row.original.orderDetails.order.transactionCode}`}
                          passHref
                        >
                          <DropdownMenuItem className="cursor-pointer">
                            <LuEye className="mr-2 h-4 w-4" />
                            View
                          </DropdownMenuItem>
                        </Link>
                        {(row.original.orderDetails.employeeInfo.name ===
                          name ||
                          role === 'ADMIN' ||
                          role === 'OWNER') && (
                          <DropdownMenuItem
                            className="cursor-pointer text-red-600 hover:bg-red-100"
                            onSelect={(e) => {
                              e.preventDefault();
                              setOpenAlertDialogId(row.original.id);
                            }}
                          >
                            <RiDeleteBin5Line className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Delete Confirmation Dialog */}
                    <AlertDialog
                      open={openAlertDialogId === row.original.id}
                      onOpenChange={(open) => {
                        if (!open) setOpenAlertDialogId(null);
                      }}
                    >
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle className="text-[#060A87]">
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete the order.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => {
                              handleDelete(row.original.id);
                              setOpenAlertDialogId(null);
                            }}
                            className="bg-[#060A87]"
                          >
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length + 1}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="hidden md:block text-sm text-muted-foreground">
          Showing {table.getRowModel().rows.length} of {totalEntries} entries
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <div className="flex items-center space-x-1">
            {Array.from({ length: Math.min(5, table.getPageCount()) }).map(
              (_, i) => (
                <Button
                  key={i}
                  variant={
                    table.getState().pagination.pageIndex === i
                      ? 'default'
                      : 'outline'
                  }
                  size="sm"
                  onClick={() => table.setPageIndex(i)}
                >
                  {i + 1}
                </Button>
              )
            )}
            {table.getPageCount() > 5 && (
              <>
                <span>...</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                >
                  {table.getPageCount()}
                </Button>
              </>
            )}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
