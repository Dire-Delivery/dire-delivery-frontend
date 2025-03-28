'use client';

import { useState, useEffect } from 'react';
import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useMediaQuery } from 'usehooks-ts'; // Import useMediaQuery

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
  loading: boolean;
  handlefilter: (status: string) => void;
  filterValue?: string;
  orderAmount: number;
}

export function DataTable<
  TData extends {
    transactionCode: string;
    id: string;
    addedBy: string;
  },
  TValue,
>({
  loading,
  columns,
  data,
  handleDelete,
  role,
  totalPages,
  setPagenumber,
  currentPage,
  setCurrentPage,
  handleSearch,
  redirectLink,
  handlefilter,
  filterValue,
  orderAmount,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [openAlertDialogId, setOpenAlertDialogId] = useState<string | null>(
    null
  );
  const [searchTransactionCode, setSearchTransactionCode] =
    useState<string>('');
  const [columnVisibility, setColumnVisibility] = useState({}); // State for column visibility

  // Detect screen size
  const isMobile = useMediaQuery('(max-width: 640px)'); // Mobile screens
  const isTablet = useMediaQuery('(max-width: 1024px)'); // Tablet screens

  // Update column visibility based on screen size
  useEffect(() => {
    if (isMobile) {
      // For mobile: Show only senderName, reciverName, status, and actions
      setColumnVisibility({
        transactionCode: false,
        senderName: true,
        reciverName: true,
        addedBy: false,
        createdAt: false,
        senderAddress: false,
        reciverAddress: false,
        status: true,
        actions: true,
      });
    } else if (isTablet) {
      // For tablet: Show transactionCode, senderName, reciverName, addedBy, status, and actions
      setColumnVisibility({
        transactionCode: true,
        senderName: true,
        reciverName: true,
        addedBy: true,
        createdAt: false,
        senderAddress: false,
        reciverAddress: false,
        status: true,
        actions: true,
      });
    } else {
      // For desktop: Show all columns
      setColumnVisibility({});
    }
  }, [isMobile, isTablet]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
      columnVisibility, // Pass column visibility state to the table
    },
    onColumnVisibilityChange: setColumnVisibility, // Update column visibility
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4 gap-4">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleSearch(searchTransactionCode); // 🔥 Use state instead of table filter
          }}
          className="flex gap-2"
        >
          <Input
            placeholder="Transaction code"
            value={searchTransactionCode}
            onChange={(event) => setSearchTransactionCode(event.target.value)}
            className="lg:w-72 "
          />
          <Button type="submit" className="text-xs">
            Search
          </Button>
        </form>
        <Select
          value={filterValue}
          onValueChange={
            (value) => handlefilter(value)
            // table
            //   .getColumn('status')
            //   ?.setFilterValue(value === 'All Status' ? undefined : value)
          }
        >
          <SelectTrigger className="w-[100px]  lg:w-[180px]">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All Status">All Status</SelectItem>
            <SelectItem value="Delivered">Delivered</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Picked-up">Picked up</SelectItem>
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
                    <TableHead
                      key={header.id}
                      className="px-2 py-1 text-sm md:px-4 md:py-2 md:text-base" // Responsive padding and font size
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
                <TableHead className="px-2 py-1 text-sm md:px-4 md:py-2 md:text-base">
                  Actions
                </TableHead>
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  loading
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="px-2 py-1 text-sm md:px-4 md:py-2 md:text-base" // Responsive padding and font size
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                  <TableCell className="px-2 py-1 text-sm md:px-4 md:py-2 md:text-base">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 md:h-8 md:w-8"
                        >
                          <span className="text-lg">⋮</span>
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
                        {(role === 'OWNER' || role === 'ADMIN') && (
                          <DropdownMenuItem
                            className="cursor-pointer text-red-600 hover:bg-red-100"
                            onSelect={(e) => {
                              e.preventDefault();
                              setOpenAlertDialogId(
                                row.original.transactionCode
                              );
                            }}
                          >
                            <RiDeleteBin5Line className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <AlertDialog
                      open={openAlertDialogId === row.original.transactionCode}
                      onOpenChange={(open) => {
                        if (!open) setOpenAlertDialogId(null);
                      }}
                    >
                      <AlertDialogContent className="w-[340px] md:w-full">
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
                              handleDelete(row.original.transactionCode);
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
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No Orders Found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between space-x-2 py-4">
        {/* Showing Entries */}
        <div className="hidden md:block text-sm text-muted-foreground">
          Showing {table.getRowModel().rows.length} of {orderAmount} entries
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