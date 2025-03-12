'use client';

import { useEffect, useState } from 'react';
import { HelpFetch } from '@/actions/help';

import { help } from '@/types/help';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function Page() {
  const [help, setHelp] = useState<help>();

  useEffect(() => {
    const fetchHelp = async () => {
      try {
        const response = await HelpFetch();
        setHelp(response);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchHelp();
  }, []);

  const userName = 'employee'; //will be assigned after auth
  return (
    <>
      <div className="h-screen bg-[#f0f1fa] flex p-6 md:p-10">
        <div className="w-full">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-[#0a0f8a]">
              Welcome Back, {userName}!
            </h1>
            <p className="text-[#0a0f8a]/80">
              Here&apos;s your Help and Support
            </p>
          </div>

          <div className="bg-white w-full rounded-lg shadow-sm p-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Help and Support
            </h2>
            <div className="h-px bg-gray-200 mb-6"> </div>

            <div className="md:w-[480px] ">
              <div className="space-y-6 flex flex-col p-2 gap-2">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                    <Mail className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Email Support</h3>
                    <p className="text-gray-500">{help?.item.email}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                    <Phone className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Phone Support</h3>
                    <p className="text-gray-500">{help?.item.phone}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                    <MapPin className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Location</h3>
                    <p className="text-gray-500">{help?.item.location}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
