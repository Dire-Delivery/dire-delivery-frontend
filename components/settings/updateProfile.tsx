'use client';

import { splitName } from '@/lib/utils';
import { userType } from '@/types/user';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

type ProfileSettingsProps = {
  user: userType;
};

export default function UpdateProfile({ user }: ProfileSettingsProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <div className="grid lg:grid-cols-2 gap-4 px-2 ">
        <div className="w-full ">
          <label className="block mb-2 font-medium">First Name</label>
          <input
            type="text"
            className="input-field border rounded-md py-2 px-3 w-full"
            defaultValue={splitName(user.name).firstName}
            title="First Name"
            placeholder="First Name"
          />
        </div>
        <div>
          <label className="block mb-2 font-medium">Email</label>
          <input
            title="email"
            type="email"
            className="input-field border rounded-md py-2 px-3 w-full"
            defaultValue={user.email}
          />
        </div>
        <div>
          <label className="block mb-2 font-medium">Last Name</label>
          <input
            title="last name"
            type="text"
            className="input-field border rounded-md py-2 px-3 w-full"
            defaultValue={splitName(user.name).lastName}
          />
        </div>
        <div>
          <label className="block mb-2 font-medium">Phone Number</label>
          <input
            title="phone"
            type="text"
            className="input-field border rounded-md py-2 px-3 w-full"
            defaultValue={user.phone}
          />
        </div>
        <div>
          <label className="block mb-2 font-medium">Location</label>
          <input
            title="location"
            type="text"
            className="input-field border rounded-md py-2 px-3 w-full"
            defaultValue={user.location}
          />
        </div>
        <div className="grid  items-end md:grid-cols-5 gap-5 w-full ">
          <div className="w-full  md:col-span-3">
            <label className="block mb-2 font-medium">Password</label>
            <div className="relative w-full">
              <input
                title="password"
                type={showPassword ? 'text' : 'password'}
                className="input-field pr-10 border rounded-md py-2 px-3 w-full"
                defaultValue={user.password}
              />
              <button
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          <div className="flex w-full items-center justify-end md:justify-start h-10 md:col-span-2">
            <button className="primary-button bg-[#0a1172] text-white w-fit px-4 h-fit rounded-md py-2">
              Change
            </button>
          </div>
        </div>
      </div>

      <div className="flex w-fit mt-8 h-10 ">
        <Button className="primary-button bg-[#0a1172] text-white w-fit px-4 h-full rounded-md">
          Update Profile
        </Button>
      </div>
    </>
  );
}
