'use client';

import { CheckCircle, DollarSign } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  return (
    <div className="w-full md:w-64 bg-white rounded-lg p-4 h-fit">
      <div
        className={`sidebar-item ${activeTab === 'profile' ? 'active' : ''}`}
        onClick={() => setActiveTab('profile')}
      >
        <CheckCircle
          size={20}
          className={activeTab === 'profile' ? 'text-[#0a1172]' : ''}
        />
        <span>Profile</span>
      </div>
      <div
        className={`sidebar-item ${activeTab === 'price' ? 'active' : ''}`}
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
