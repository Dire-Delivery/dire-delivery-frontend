'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/shared/custom-shadcn/custom-dialog-logout';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from '@/lib/utils';
import { LuChevronUp, LuLogOut } from 'react-icons/lu';
import SidebarToggleHeader from "./sidebar-toggle-header";
import { removeUserProfile, userProfile, userToken } from '@/actions/auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const BaseUrl = process.env.NEXT_PUBLIC_API_URL

function Header() {
  const router = useRouter()

  const logout = async () => {
    const userData = await userProfile();
    const token = await userToken();

    if (userData && token) {
      const response = await fetch(`${BaseUrl}/auth/${userData.id}/log-out`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      })

      if (response.ok) {
        removeUserProfile();
        router.push('/log-in');
      }
    }
  }

  return (
    <div className="px-6 h-20 flex items-center bg-[#060A87] w-screen md:hidden">
      {/* <SidebarTrigger /> */}
      <SidebarToggleHeader />
      <div className="flex gap-1 items-center justify-center ml-auto">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Dialog>
          <DialogTrigger>
            <LuChevronUp
              stroke="white"
              className={cn('cursor-pointer rotate-180')}
              size={23}
            />
          </DialogTrigger>
          <DialogContent
            className={cn(
              'top-16 right-4  bg-white py-3 px-3 rounded-md transition-all hover:bg-gray-200',
            )}
          >
            <DialogHeader className="p-0">
              <DialogTitle className="flex gap-2 text-sm font-normal cursor-pointer" onClick={logout}>
                <LuLogOut /> Logout
              </DialogTitle>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

export default Header