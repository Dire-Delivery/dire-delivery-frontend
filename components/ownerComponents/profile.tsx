'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Eye, EyeOff, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import image from '@/public/images/confused.jpg';
export default function ProfileSettings() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex-1 bg-white rounded-lg  py-6 px-2 md:p-6">
      <h2 className="text-xl font-semibold mb-6">Profile Setting</h2>

      <div className="flex flex-col">
        <div className="flex flex-col lg:flex-row gap-12 px-2">
          {/* Basic Information Card */}
          <div className="flex flex-col h-fit items-center justify-center pt-2">
            <div className="relative  items-center justify-center">
              <div className="w-56 h-56 rounded-full overflow-hidden border-4 border-gray-200">
                <Image src={image} alt="Profile" className="object-cover" />
              </div>
              <Button className="absolute bottom-6 right-2 bg-[#0a1172] text-white p-2.5 rounded-full">
                <Camera size={20} />
              </Button>
            </div>
          </div>
          <div className="mb-8 w-full border rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4 border-b pb-2">
              Basic Information
            </h3>
            <div className="grid grid-cols-2 gap-y-2 border">
              <div className="font-medium">First Name:</div>
              <div>Jhon</div>
              <div className="font-medium">Last Name:</div>
              <div>Doe</div>
              <div className="font-medium">Phone Number</div>
              <div>+251973246477</div>
              <div className="font-medium ">Email</div>
              <div className="w-full  break-words">
                <p className="break-words w-full">JhonDoe22@gmail.com</p>
              </div>
              <div className="font-medium">Location:</div>
              <div>AddisAbaba</div>
            </div>
          </div>

          {/* Form Fields */}
        </div>
        <div className="grid lg:grid-cols-2 gap-4 px-2 ">
          <div className="w-full ">
            <label className="block mb-2 font-medium">First Name</label>
            <input
              type="text"
              className="input-field border rounded-md py-2 px-3 w-full"
              defaultValue="Jhon"
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
              defaultValue="abcd123@gmail.com"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">Last Name</label>
            <input
              title="last name"
              type="text"
              className="input-field border rounded-md py-2 px-3 w-full"
              defaultValue="Jhon"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">Phone Number</label>
            <input
              title="phone"
              type="text"
              className="input-field border rounded-md py-2 px-3 w-full"
              defaultValue="JhonDoe26"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">Location</label>
            <input
              title="location"
              type="text"
              className="input-field border rounded-md py-2 px-3 w-full"
              defaultValue="abcd123@gmail.com"
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
                  defaultValue="password"
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
      </div>
    </div>
  );
}
