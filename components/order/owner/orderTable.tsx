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

interface DataTableProps<TData extends { id: string }, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  totalEntries: number;
  handleDelete: (id: string) => void;
}

export function DataTable<
  TData extends {
    transactionId: string;
    id: string;
  },
  TValue,
>({
  columns,
  data,
  totalEntries,
  handleDelete,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [openAlertDialogId, setOpenAlertDialogId] = useState<string | null>(
    null
  ); // Track which row's AlertDialog is open

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

  return (
    <div className="w-full">
      <div className="flex items-center py-4 gap-4">
        <Input
          placeholder="Search by name"
          value={
            (table.getColumn('senderName')?.getFilterValue() as string) ?? ''
          }
          onChange={(event) => {
            const value = event.target.value || undefined;
            table.getColumn('senderName')?.setFilterValue(value);
            table.getColumn('reciverName')?.setFilterValue(value);
          }}
          className="max-w-sm"
        />
        <Select
          value={(table.getColumn('status')?.getFilterValue() as string) ?? ''}
          onValueChange={(value) =>
            table
              .getColumn('status')
              ?.setFilterValue(value === 'All Status' ? undefined : value)
          }
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
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
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
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <span className="text-lg">⋮</span>{' '}
                          {/* Three-dot button */}
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align="end" className="w-40">
                        <Link
                          href={`/owner/orders/${row.original.transactionId}`}
                          passHref
                        >
                          <DropdownMenuItem className="cursor-pointer">
                            <LuEye className="mr-2 h-4 w-4" />
                            View
                          </DropdownMenuItem>
                        </Link>

                        <DropdownMenuItem
                          className="cursor-pointer text-red-600 hover:bg-red-100"
                          onSelect={(e) => {
                            e.preventDefault(); // Prevent the dropdown from closing
                            setOpenAlertDialogId(row.original.transactionId); // Open the AlertDialog for this row
                          }}
                        >
                          <RiDeleteBin5Line className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    {/* AlertDialog for the row */}
                    <AlertDialog
                      open={openAlertDialogId === row.original.transactionId}
                      onOpenChange={(open) => {
                        if (!open) setOpenAlertDialogId(null); // Close the AlertDialog
                      }}
                    >
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle className="text-[#060A87]">
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete your account and remove your data from our
                            servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => {
                              handleDelete(row.original.id); // Perform the delete action
                              setOpenAlertDialogId(null); // Close the AlertDialog
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
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between space-x-2 py-4">
        <div className=" hidden md:block text-sm text-muted-foreground">
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
