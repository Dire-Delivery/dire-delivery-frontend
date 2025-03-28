'use client';

import { useEffect, useState } from 'react';
import Sidebar from '@/components/ownerComponents/sidebar';
import ProfileSettings from '@/components/ownerComponents/profile';
import PriceCitySettings from '@/components/ownerComponents/priceCity';
import { userType } from '@/types/user';
import { userProfile } from '@/actions/auth';
export default function Home() {
  const [activeTab, setActiveTab] = useState('profile');
  const [triggerState, setTriggerState] = useState<boolean>(false);

  const [user, setUser] = useState<userType>({
    id: '',
    name: '',
    email: '',
    createdAt: '',
    updatedAt: '',
    role: '',
    image: '',
    phone: '',
    location: '',
    isActive: 1,
    isDeleted: 0,
    password: '',
    joinedAt: '',
  });
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await userProfile();
        console.log('response:', response);
        setUser(response as userType);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [activeTab]);
  const role = user?.role || 'OWNER';
  return (
    <main className="min-h-screen p-6 px-4 lg:px-8 bg-[#F1F2F8]">
      <div className="max-w-fill mx-auto ">
        <h1 className="text-3xl font-bold text-[#0a1172] mb-2">
          Welcome Back, {user.name}!
        </h1>
        <p className="text-[#666] mb-6">
          {activeTab === 'profile'
            ? 'Here are your settings'
            : "Here's your Pricing Report"}
        </p>

        <div className="flex flex-col lg:flex-row gap-6 bg-[#F1F2F8]">
          {/* Sidebar */}
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* Main Content */}
          {activeTab === 'profile' ? (
            <ProfileSettings user={user} />
          ) : (
            <PriceCitySettings
              role={role}
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
