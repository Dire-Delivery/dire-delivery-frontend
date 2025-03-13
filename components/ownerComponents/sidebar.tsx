'use client';

import { CheckCircle, DollarSign } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  return (
    <div className="w-full lg:w-64 bg-white rounded-lg py-8 px-6 h-fit flex lg:flex-col gap-4">
      <div
        className={`sidebar-item ${activeTab === 'profile' ? ' bg-gray-200 px-4' : ''} flex h-12 gap-4 justify-start px-2 items-center rounded-xl cursor-pointer w-full `}
        onClick={() => setActiveTab('profile')}
      >
        <CheckCircle
          size={20}
          className={activeTab === 'profile' ? 'text-[#0a1172]' : ''}
        />
        <span>Profile</span>
      </div>
      <div
        className={`sidebar-item ${activeTab === 'price' ? ' bg-gray-200 px-4' : ''} flex h-12 gap-4 justify-start px-2 items-center rounded-xl cursor-pointer  w-full`}
        onClick={() => setActiveTab('price')}
      >
        <DollarSign
          size={20}
          className={activeTab === 'price' ? 'text-[#0a1172]' : ''}
        />
        <span>Price and City</span>
      </div>
    </div>
  );
}
