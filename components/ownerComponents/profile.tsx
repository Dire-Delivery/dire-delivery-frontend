'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Eye, EyeOff, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import image from '@/public/images/confused.jpg';
export default function ProfileSettings() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex-1 bg-white rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-6">Profile Setting</h2>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Profile Image */}
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-gray-200">
              <Image
                src={image}
                alt="Profile"
                width={160}
                height={160}
                className="object-cover"
              />
            </div>
            <Button className="absolute bottom-2 right-2 bg-[#0a1172] text-white p-2 rounded-full">
              <Camera size={20} />
            </Button>
          </div>
        </div>

        <div className="flex-1">
          {/* Basic Information Card */}
          <div className="mb-8 border rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4 border-b pb-2">
              Basic Information
            </h3>
            <div className="grid grid-cols-2 gap-y-4">
              <div className="font-medium">First Name:</div>
              <div>Jhon</div>
              <div className="font-medium">Last Name:</div>
              <div>Doe</div>
              <div className="font-medium">Phone Number</div>
              <div>+251973246477</div>
              <div className="font-medium">Email</div>
              <div>JhonDoe22@gmail.com</div>
              <div className="font-medium">User Name</div>
              <div>Jhonny</div>
              <div className="font-medium">Location:</div>
              <div>AddisAbaba</div>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 font-medium">First Name</label>
              <input
                type="text"
                className="input-field"
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
                className="input-field"
                defaultValue="abcd123@gmail.com"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium">Last Name</label>
              <input type="text" className="input-field" defaultValue="Jhon" />
            </div>
            <div>
              <label className="block mb-2 font-medium">User Name</label>
              <input
                title="user name"
                type="text"
                className="input-field"
                defaultValue="JhonDoe26"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium">Phone Number</label>
              <input
                type="text"
                className="input-field"
                defaultValue="JhonDoe26"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium">Password</label>
              <div className="relative">
                <input
                  title="password"
                  type={showPassword ? 'text' : 'password'}
                  className="input-field pr-10"
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
            <div>
              <label className="block mb-2 font-medium">Location</label>
              <input
                type="text"
                className="input-field"
                defaultValue="abcd123@gmail.com"
              />
            </div>
            <div className="flex items-end">
              <button className="primary-button bg-[#0a1172]">
                Change Password
              </button>
            </div>
          </div>

          <div className="mt-8">
            <button className="primary-button bg-[#0a1172]">
              Update Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
