'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { userProfile } from '@/actions/auth';
import { HelpFetch } from '@/actions/help';
import HelpCard from './helpCard';
import { userType } from '@/types/user';
import { help } from '@/types/help';
import { PriceInfoType } from '@/types/cities';

const HelpForm = dynamic(() => import('@/components/help/helpEdit'), {
  ssr: false,
});

export default function HelpView() {
  const [help, setHelp] = useState<help>();
  const [showEditInfoModal, setShowEditInfoModal] = useState(false);
  const [triggerState, setStateTrigger] = useState(false);
  const [user, setUser] = useState<userType | null>(null);
  const [constatns, setconstants] = useState<PriceInfoType>();

  useEffect(() => {
    const fetchHelp = async () => {
      const decoded = await userProfile();
      setUser(decoded as userType);
      try {
        const response = await HelpFetch();
        setconstants(response);
        setconstants(response);

        setHelp({ supportTel: response.supportTel });
      } catch (error) {
        console.log(error);
      }
    };
    fetchHelp();
  }, [triggerState]);

  return (
    <div className="h-screen bg-[#f0f1fa] flex p-6 md:p-10">
      <div className="w-full">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-[#0a0f8a]">
            Welcome Back, Owner!
          </h1>
          <p className="text-[#0a0f8a]/80">Here&apos;s your Help and Support</p>
        </div>
        <HelpCard
          help={help}
          user={user}
          setShowEditInfoModal={setShowEditInfoModal}
        />
      </div>

      {/* Render HelpForm when showEditInfoModal is true */}
      {showEditInfoModal && (
        <HelpForm
          setShowEditInfoModal={setShowEditInfoModal}
          help={help!}
          setHelp={setHelp}
          setStateTrigger={setStateTrigger}
          userID={user!.id}
          constantsId={constatns!.id}
          triggerState={triggerState}
        />
      )}
    </div>
  );
}
