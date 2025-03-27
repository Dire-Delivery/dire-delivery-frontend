'use client';

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
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    type ColumnDef,
    type ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'usehooks-ts';

import { userProfile, userToken } from '@/actions/auth';
import { ChangeRole } from '@/actions/employee';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Pagination, Person } from '@/types/employeeType';
import { usePathname, useRouter } from 'next/navigation';
import { FaUserLarge } from "react-icons/fa6";
import { LuEye, LuX } from 'react-icons/lu';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { toast } from 'sonner';

interface EmployeeDataTableProps<TData extends Person, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    totalEntries: number;
    handleDelete: (id: string) => void;
    view: "admin" | "employee";
    showChangeRoleModal: boolean;
    setShowChangeRoleModal: React.Dispatch<React.SetStateAction<boolean>>;
    pagination: Pagination;
    setPagination: React.Dispatch<React.SetStateAction<Pagination>>;
    pageCount: number;
    setRefreshTableToggle: React.Dispatch<React.SetStateAction<boolean>>;
    refreshTableToggle: boolean;
    checkEmpty: (name: string) => void;
    setShowFilteredData: React.Dispatch<React.SetStateAction<boolean>>;
    searchInput: string;
    setSearchInput: React.Dispatch<React.SetStateAction<string>>;
    totalPeople: number;

}

export function UserDataTable<
    TData extends Person,
    TValue,
>({
    columns,
    data,
    view,
    handleDelete,
    showChangeRoleModal,
    setShowChangeRoleModal,
    pagination,
    setPagination,
    pageCount,
    setRefreshTableToggle,
    refreshTableToggle,
    checkEmpty,
    setShowFilteredData,
    searchInput,
    setSearchInput,
    totalPeople
}: EmployeeDataTableProps<TData, TValue>) {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [openAlertDialogId, setOpenAlertDialogId] = useState<string | null>(
        null
    ); // Track which row's AlertDialog is open
    const [selectedPerson, setSelectedPerson] = useState<Person | null>(); // change Employee to a common term for both admin and employee
    const pathname = usePathname();
    const role = pathname.split('/')[1]; // Gets "owner", "admin", or "employee"
    const [columnVisibility, setColumnVisibility] = useState({}); // State for column visibility

    // Detect screen size
    const isTablet = useMediaQuery('(max-width: 1024px)'); // Tablet screens
    const router = useRouter()

    const startIndex = (pagination.pageIndex) * pagination.pageSize + 1;
    const endIndex = Math.min((pagination.pageIndex + 1) * pagination.pageSize, totalPeople);

    // Update column visibility based on screen size
    useEffect(() => {
        if (isTablet) {
            setColumnVisibility({
                name: true,
                email: false,
                phoneNumber: true,
                location: false,
            });
        } else {
            // For desktop: Show all columns
            setColumnVisibility({});
        }
    }, [isTablet]);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            columnFilters,
            columnVisibility,
            pagination
        },
        onColumnVisibilityChange: setColumnVisibility,
        onPaginationChange: setPagination,
        pageCount: pageCount,
        autoResetPageIndex: false,
        manualPagination: true

    });

    const changeRole = async () => {
        try {
            const userData = await userProfile();
            const token = await userToken();
            if (userData && token && selectedPerson) {
                const response = await ChangeRole(userData.id, selectedPerson.id, view);
                toast.success(response.message)
                setShowChangeRoleModal(false);
                setRefreshTableToggle(!refreshTableToggle);
                
            } else {
                throw new Error("userData or token not found")
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            {showChangeRoleModal &&
                <div className="fixed inset-0 bg-[#060A87] bg-opacity-30 flex items-center justify-center z-50">
                    <Card className='relative px-8'>
                        <CardHeader>
                            <LuX className='absolute top-4 right-4 cursor-pointer' onClick={() => {
                                setShowChangeRoleModal(false)
                                setSelectedPerson(null)
                            }} />
                            <CardTitle className='text-[#060A87] font-bold text-2xl mx-auto'>Are your sure you want to {view == "employee" ? "Promote" : "Demote"} them?</CardTitle>
                        </CardHeader>
                        <CardContent className=' '>
                            <div>
                                <div className='text-[#060A87] font-bold text-lg'>
                                    Name: <span className='text-[#4A4A4F]'>{selectedPerson?.name}</span>
                                </div>
                                <div className='text-[#060A87] font-bold text-lg'>
                                    Email: <span className='text-[#4A4A4F]'>{selectedPerson?.email}</span>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className=''>
                            <div className="flex w-full justify-center gap-8 mt-2">
                                <div className="flex justify-end gap-4 mt-2">
                                    <div></div>

                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowChangeRoleModal(false)
                                            setSelectedPerson(null)
                                        }}
                                        className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={() => changeRole()}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                    >
                                        Confirm
                                    </button>
                                </div>
                            </div>
                        </CardFooter>
                    </Card>
                </div>

            }
            <div className="w-full">
                <div className="flex items-center py-4 gap-4">
                    <form
                        onSubmit={(event) => {
                            event.preventDefault();
                            if (searchInput) {
                                setShowFilteredData(true);
                                setRefreshTableToggle(!refreshTableToggle);
                            }
                        }}
                        className="flex gap-2"
                    >
                        <Input
                            placeholder="Name"
                            value={searchInput}
                            onChange={(event) => {
                                setSearchInput(event.target.value)
                                checkEmpty(event.target.value)
                            }}
                            className="lg:w-72 focus:outline-none focus:border-none focus-visible:ring-[#060A87]"
                        />
                        <Button type="submit" className="text-xs bg-[#060A87]">
                            Search
                        </Button>
                    </form>
                </div>
                <div className="flex items-center py-4 gap-4">
                    {/* <Input
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
                    </Select> */}
                </div>
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header, index) => {
                                        return (
                                            <TableHead key={header.id} className={cn('text-center', index == 0 && "text-start pl-3 md:pl-8")}>
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                            </TableHead>
                                        );
                                    })}
                                    {role == "owner" && <TableHead className='text-center hidden xl:flex xl:items-center xl:justify-center'>{view == "employee" ? 'Promote to Admin' : 'Demote to Employee'}</TableHead>}
                                    {role == "owner" && <TableHead className='text-center xl:hidden'>{view == "employee" ? 'Promote' : 'Demote'}</TableHead>}
                                    <TableHead className='text-center'>Actions</TableHead>
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
                                        {row.getVisibleCells().map((cell, index) => (
                                            <TableCell key={cell.id} className={cn((index != 0 || (index == 0 && row.original.imgUrl)) && 'relative mx-auto text-center', index == 0 && row.original.imgUrl && "flex items-center h-full gap-3 pl-8", index == 0 && !row.original.imgUrl && "pl-3 md:pl-8")}>
                                                {index == 0 && row.original.imgUrl &&
                                                    <Avatar className='w-8 h-auto'>
                                                        <AvatarImage src={row.original.imgUrl} />
                                                        <AvatarFallback>CN</AvatarFallback>
                                                    </Avatar>
                                                }
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}

                                            </TableCell>
                                        ))}
                                        {role == "owner" && <TableCell>
                                            <Button onClick={() => {
                                                setSelectedPerson(row.original)
                                                setShowChangeRoleModal(true);
                                            }} className={cn('mx-auto bg-[#060A87] rounded-[10px] py-2 px-3 hover:bg-[#060a87d5] hover:opacity-90 flex items-center gap-2.5', view == 'admin' && 'bg-[#060A87] hover:bg-[#060a87d8]')}>
                                                <FaUserLarge />
                                                <div className='text-sm font-bold mb-[-3px] hidden xl:block'>{view == "employee" ? 'Promote' : 'Demote'}</div>
                                                {view == 'employee' && <div className='text-3xl font-normal text-center mt-[-3px]'>+</div>}
                                            </Button>
                                        </TableCell>}
                                        <TableCell className='relative mx-auto text-center'>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                                        <span className="text-lg">⋮</span>{' '}
                                                        {/* Three-dot button */}
                                                    </Button>
                                                </DropdownMenuTrigger>

                                                <DropdownMenuContent align="end" className="w-40">
                                                    <DropdownMenuItem className="cursor-pointer" onClick={() => {

                                                        // handleFind(row.original.id);
                                                        router.push(`/${role}/${view}s/${row.original.id}`)
                                                    }}>
                                                        <LuEye className="mr-2 h-4 w-4" />
                                                        View
                                                    </DropdownMenuItem>

                                                    <DropdownMenuItem
                                                        className="cursor-pointer text-red-600 hover:bg-red-100"
                                                        onSelect={(e) => {
                                                            e.preventDefault(); // Prevent the dropdown from closing
                                                            setSelectedPerson(row.original)
                                                            setOpenAlertDialogId(row.original.id); // Open the AlertDialog for this row
                                                        }}
                                                    >
                                                        <RiDeleteBin5Line className="mr-2 h-4 w-4" />
                                                        Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>

                                            {/* AlertDialog for the row */}
                                            <AlertDialog
                                                open={openAlertDialogId === row.original.id}
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
                                                            delete the account and remove the data from our
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
                        Showing {startIndex}–{endIndex} of {totalPeople} users
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                                setRefreshTableToggle(!refreshTableToggle)
                                table.previousPage()
                            }}
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
                                        className={cn(table.getState().pagination.pageIndex === i && 'bg-[#060A87] hover:bg-[#060A87]')}
                                        onClick={() => {
                                            table.setPageIndex(i)
                                            setRefreshTableToggle(!refreshTableToggle)
                                        }}
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
                                        onClick={() => {
                                            setRefreshTableToggle(!refreshTableToggle)
                                            table.setPageIndex(table.getPageCount() - 1)
                                        }}
                                    >
                                        {table.getPageCount()}
                                    </Button>
                                </>
                            )}
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                                setRefreshTableToggle(!refreshTableToggle)
                                table.nextPage()
                                
                            }}
                            disabled={!table.getCanNextPage()}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </div>

        </>
    );
}
