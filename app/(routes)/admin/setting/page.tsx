'use client';

import { useState } from 'react';
import Sidebar from '@/components/ownerComponents/sidebar';
import ProfileSettings from '@/components/ownerComponents/profile';
import PriceCitySettings from '@/components/ownerComponents/priceCity';
export default function Home() {
  const [activeTab, setActiveTab] = useState('profile');
  const [triggerState, setTriggerState] = useState<boolean>(false);

  return (
    <main className="min-h-screen">
      <div className="max-w-6xl mx-auto border-2 border-red-500">
        <h1 className="text-3xl font-bold text-[#0a1172] mb-2">
          Welcome Back, Owner!
        </h1>
        <p className="text-[#666] mb-6">
          {activeTab === 'profile'
            ? 'Here are your settings'
            : "Here's your Pricing Report"}
        </p>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* Main Content */}
          {activeTab === 'profile' ? (
            <ProfileSettings />
          ) : (
            <PriceCitySettings
              setActiveTab={setActiveTab}
              setTriggerState={setTriggerState}
              triggerState={triggerState}
            />
          )}
        </div>
      </div>
    </main>
  );
}
