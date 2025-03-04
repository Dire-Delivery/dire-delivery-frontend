"use client"

import { useSidebar } from '@/components/ui/sidebar';
import { LuMenu } from 'react-icons/lu';
import { Button } from '../custom-shadcn/custom-button-sidebar';

  
  const SidebarToggleHeader = () => {
  const { toggleSidebar } = useSidebar();
  return (
    <Button className='flex gap-0' variant="ghost" size="icon" onClick={toggleSidebar}>
      <LuMenu stroke='white' className='w-7 h-auto'/>
    </Button>
  );
};

export default SidebarToggleHeader;