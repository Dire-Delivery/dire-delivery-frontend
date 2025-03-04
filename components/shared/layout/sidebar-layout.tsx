"use client"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/shared/custom-shadcn/custom-dialog-logout";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarMenu,
    SidebarMenuItem,
    useSidebar,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import plane from "@/public/Icons/plane.svg";
import question from "@/public/Icons/question.svg";
import { ClipboardList, Settings, UserCog, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { LuChevronUp, LuLayoutGrid, LuLogOut } from 'react-icons/lu';
import SidebarToggle from './sidebar-toggle';


export default function SidebarLayout() {
    const { state } = useSidebar();
    const menuItems = [
        {
            title: 'Employees',
            url: '/admin/employees',
            icon: Users,
        },
        {
            title: 'Admins',
            url: '/admin/admins',
            icon: UserCog,
        },
        {
            title: 'Orders',
            url: '/admin/orders',
            icon: ClipboardList,
        },
        {
            title: 'Settings',
            url: '/admin/settings',
            icon: Settings,
        },
    ];

    const pathname = usePathname();
    const [selectedItem, setSelectedItem] = useState("");

    useEffect(() => {
        const matchedItem = menuItems.find((item) => pathname == item.url);
        setSelectedItem(matchedItem ? matchedItem.title : "");
    }, [pathname]); // Re-run when pathname changes

    return (
        <Sidebar
            collapsible="icon"
            className="fixed left-0 top-0 h-full z-60 border-gray-800"
            style={{
                transition: 'width 0.2s',
                width: state === 'collapsed' ? '5rem' : '16rem',
            }}
        >
            <SidebarContent className="bg-[#060A87] text-white py-6 flex gap-6">
                <div className={cn("transition-all duration-300 ease-in-out hidden opacity-0 scale-90 px-4 md:px-0",
                    state !== "collapsed" && "scale-100 opacity-100 flex justify-between")}>
                    <div className="flex items-center gap-0">
                        <Image src={plane} alt="plane image" className="w-11 h-auto rotate-0 " />
                        <div className="font-extrabold text-2xl text-white">Dire <span className="text-red-600 ml-[-4px]">Express</span></div>
                    </div>
                    <div className='mr-4 flex items-center'>
                        <SidebarToggle reversed={false} />
                    </div>

                </div>
                <div className={cn('flex mr-2', state !== 'collapsed' ? 'hidden' : '')}>
                    <Image src={plane} alt="plane image" className={"w-11 mx-auto h-auto rotate-0"} />
                    <SidebarToggle reversed={true} />
                </div>
                <Link href="/admin" className={cn(" ml-5 mr-5 py-4 px-5 flex justify-between items-center rounded-[10px] font-bold bg-[#C7E7F6F5]", state == "collapsed" && "hidden")}>
                    <div className="text-[#060A87] flex items-center justify-center">Dashboard</div>
                    <LuLayoutGrid stroke="#060A87" size={24} />
                </Link>
                <Link href="/admin" className={cn(" ml-2 mr-2 py-4 px-5 flex justify-between items-center rounded-[10px] font-bold bg-[#C7E7F6F5]", state !== "collapsed" && "hidden")}>
                    <LuLayoutGrid stroke="#060A87" size={24} />
                </Link>
                <SidebarMenu className="gap-2 p-0 m-0">
                    {menuItems.map((item, index) => (
                        <SidebarMenuItem key={index}>
                            <Link
                                href={item.url}
                                className={cn(`flex items-center justify-start gap-3 py-3 transition-all duration-300 ease-in-out`,
                                    selectedItem == item.title
                                        ? 'bg-[#030661] text-white px-3'
                                        : 'hover:bg-[#C7E7F6F5] hover:text-gray-900 hover:px-3', state === 'expanded' ? 'mx-5 rounded-[12px]' : 'ml-2 mr-2 rounded-[10px]')}
                            >
                                <item.icon className={cn("h-6 w-6", state == "collapsed" && "mx-auto")} />
                                {state === 'expanded' && (
                                    <div className="font-semibold">{item.title}</div>
                                )}
                            </Link>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>
            <SidebarFooter className={cn("p-5 bg-[#060A87]", state == "collapsed" && "px-0")}>
                <div className='flex flex-col gap-4 '>
                    <div className='flex gap-2.5 cursor-pointer'>
                        <Image src={question} alt="question logo" className={cn('w-5 h-auto transition-transform duration-300 ease-in-out', state == "collapsed" && "mx-auto")} />
                        <div className={cn('font-bold text-sm text-white', state == "collapsed" && "hidden")}>Help Center</div>
                    </div>
                    <div className={cn('flex w-full justify-between items-center relative', state == "collapsed" && "px-2")}>
                        <div className="flex gap-1.5">
                            <Avatar className='cursor-pointer'>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div className={cn('flex flex-col items-start', state == "collapsed" && "hidden")}>
                                <div className='font-semibold text-sm text-white'>Hanna Baptista</div>
                                <div className='text-[#D6D1D1] text-xs'>hanna@unpixel.com</div>
                            </div>
                        </div>
                        <div>
                            <Dialog>
                                <DialogTrigger>
                                    <LuChevronUp stroke='white' className={cn('cursor-pointer', state == "collapsed" && "")} size={24} />
                                </DialogTrigger>
                                <DialogContent className={cn('bottom-16 left-40  bg-white py-3 px-3 rounded-md transition-all hover:bg-gray-200', state == "collapsed" && "left-14")}>
                                    <DialogHeader className='p-0'>
                                        <DialogTitle className="flex gap-2 text-sm font-normal cursor-pointer">
                                            <LuLogOut /> Logout
                                        </DialogTitle>
                                    </DialogHeader>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>

                </div>

            </SidebarFooter>
        </Sidebar>
    );
}