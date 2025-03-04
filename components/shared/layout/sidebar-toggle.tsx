"use client"

import { Button } from '@/components/ui/button';
import { useSidebar } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { LuChevronLeft } from 'react-icons/lu';
interface SidebarToggleProps {
    reversed: boolean; // Optional boolean prop
  }
  
  const SidebarToggle = ({ reversed }: SidebarToggleProps) => {
  const { toggleSidebar } = useSidebar();
  return (
    <Button className={cn('flex gap-0', reversed ? "rotate-180 mt-2 h-7" : "rotate-0")} variant="ghost" size="icon" onClick={toggleSidebar}>
      <LuChevronLeft className='w-4 h-auto mr-[-5px]'/>
      <LuChevronLeft className='w-4 h-auto'/>
    </Button>
  );
};

export default SidebarToggle;