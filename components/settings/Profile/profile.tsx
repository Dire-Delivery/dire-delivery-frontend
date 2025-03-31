'use client';

import { userType } from '@/types/user';
import UpdateProfile from './updateProfile';
import { splitName } from '@/lib/utils';
interface ProfileSettingsProps {
  user: userType;
}

export default function ProfileSettings({ user }: ProfileSettingsProps) {
  return (
    <div className="flex-1 bg-white rounded-lg  py-6 px-2 md:p-6">
      <h2 className="text-xl font-semibold mb-6">Profile Setting</h2>

      <div className="flex flex-col">
        <div className="flex flex-col lg:flex-row gap-12 px-2">
          {/* Basic Information Card */}
          <div className="flex flex-col h-fit items-center justify-center pt-2"></div>
          <div className="mb-8 w-full border rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4 border-b pb-2">
              Basic Information
            </h3>
            <div className="grid grid-cols-2 gap-y-2 ">
              <div className="font-medium">First Name:</div>
              <div>{splitName(user.name).firstName}</div>
              <div className="font-medium">Last Name:</div>
              <div>{splitName(user.name).lastName}</div>
              <div className="font-medium">Phone Number</div>
              <div>{user.phone}</div>
              <div className="font-medium ">Email</div>
              <div className="w-full  break-words">
                <p className="break-words w-full">{user.email}</p>
              </div>
              <div className="font-medium">Location:</div>
              <div>{user.location}</div>
            </div>
          </div>
        </div>
        {/* Form Fields */}
        {user.role === 'OWNER' ? '' : <UpdateProfile user={user} />}
      </div>
    </div>
  );
}
