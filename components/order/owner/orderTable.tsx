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

interface DataTableProps<
  TData extends { id: string; addedBy: string },
  TValue,
> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  totalEntries: number;
  role: string;
  name: string;
  handleDelete: (id: string) => void;
  handleSearch: (id: string) => void;
  pagenumber: number;
  setPagenumber: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
  setTotalPages: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  redirectLink: string;
}

export function DataTable<
  TData extends {
    transactionCode: string;
    id: string;
    addedBy: string;
  },
  TValue,
>({
  columns,
  data,
  totalEntries,
  handleDelete,
  role,
  name,
  totalPages,
  setPagenumber,
  currentPage,
  setCurrentPage,
  handleSearch,
  redirectLink,
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
        <form
          onSubmit={(event) => {
            event.preventDefault();
            const transactionCode =
              (table
                .getColumn('transactionCode')
                ?.getFilterValue() as string) ?? '';
            handleSearch(transactionCode);
          }}
          className="flex gap-2"
        >
          <Input
            placeholder="Search by transaction code"
            value={
              (table
                .getColumn('transactionCode')
                ?.getFilterValue() as string) ?? ''
            }
            onChange={(event) => {
              const value = event.target.value || undefined;
              table.getColumn('transactionCode')?.setFilterValue(value);
            }}
            className="max-w-sm w-72"
            required
          />
          <Button type="submit">Search</Button>
        </form>

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
                          href={`${redirectLink}/${row.original.transactionCode}`}
                          passHref
                        >
                          <DropdownMenuItem className="cursor-pointer">
                            <LuEye className="mr-2 h-4 w-4" />
                            View
                          </DropdownMenuItem>
                        </Link>

                        {(role === 'OWNER' ||
                          role === 'ADMIN' ||
                          row.original.addedBy === name) && (
                          <DropdownMenuItem
                            className="cursor-pointer text-red-600 hover:bg-red-100"
                            onSelect={(e) => {
                              e.preventDefault(); // Prevent the dropdown from closing
                              setOpenAlertDialogId(
                                row.original.transactionCode
                              ); // Open the AlertDialog for this row
                            }}
                          >
                            <RiDeleteBin5Line className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>

                    {/* AlertDialog for the row */}
                    <AlertDialog
                      open={openAlertDialogId === row.original.transactionCode}
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
                              handleDelete(row.original.transactionCode); // Perform the delete action
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
        {/* Showing Entries */}
        <div className="hidden md:block text-sm text-muted-foreground">
          Showing {table.getRowModel().rows.length} of {totalEntries} entries
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center space-x-2">
          {/* Previous Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const newPage = Math.max(1, currentPage - 1); // Ensure page doesn't go below 1
              setCurrentPage(newPage); // Update currentPage
              setPagenumber(newPage); // Update pagenumber for fetching
            }}
            disabled={currentPage === 1} // Disable if on the first page
          >
            Previous
          </Button>

          {/* Page Numbers */}
          <div className="flex items-center space-x-1">
            {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
              const page = i + 1;
              return (
                <Button
                  key={page}
                  variant={currentPage === page ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => {
                    setCurrentPage(page); // Update currentPage
                    setPagenumber(page); // Update pagenumber for fetching
                  }}
                >
                  {page}
                </Button>
              );
            })}
            {totalPages > 5 && (
              <>
                <span>...</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setCurrentPage(totalPages); // Go to the last page
                    setPagenumber(totalPages); // Update pagenumber for fetching
                  }}
                >
                  {totalPages}
                </Button>
              </>
            )}
          </div>

          {/* Next Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const newPage = Math.min(totalPages, currentPage + 1); // Ensure page doesn't exceed totalPages
              setCurrentPage(newPage); // Update currentPage
              setPagenumber(newPage); // Update pagenumber for fetching
            }}
            disabled={currentPage === totalPages} // Disable if on the last page
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}