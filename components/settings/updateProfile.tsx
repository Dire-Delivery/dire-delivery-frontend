// UpdateProfile.tsx
'use client';

import { splitName } from '@/lib/utils';
import {
  updateProfileSchema,
  userType,
  ChangePasswordType,
} from '@/types/user';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import PasswordChange from './passwordChange';
import { updateProfile } from '@/actions/usert';
import { z } from 'zod';

// Create a simplified schema without password for profile updates
const profileUpdateSchema = updateProfileSchema.omit({ password: true });

type ProfileSettingsProps = {
  user: userType;
};

export default function UpdateProfile({ user }: ProfileSettingsProps) {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof profileUpdateSchema>>({
    resolver: zodResolver(profileUpdateSchema),
    defaultValues: {
      firstName: splitName(user.name).firstName,
      lastName: splitName(user.name).lastName,
      email: user.email,
      location: user.location,
      phone: user.phone || '',
    },
  });

  const handleProfileUpdate: SubmitHandler<
    z.infer<typeof profileUpdateSchema>
  > = async (data) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await updateProfile({
        userid: user.id,
        data: {
          name: `${data.firstName} ${data.lastName}`,
          location: data.location,
          phone: data.phone,
          password: user.password, // Use existing password (unchanged)
        },
      });

      console.log('Profile update response:', response);
      // Handle success (e.g., show toast notification)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePasswordChange = async (data: ChangePasswordType) => {
    const response = await updateProfile({
      userid: user.id,
      data: {
        name: user.name,
        location: user.location,
        phone: user.phone || '',
        password: data.newPassword,
      },
    });
    console.log('Password change response:', response);
    // Handle success (e.g., show toast notification)
  };

  return (
    <>
      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      <form onSubmit={handleSubmit(handleProfileUpdate)}>
        <div className="grid lg:grid-cols-2 gap-4 px-2">
          {/* First Name */}
          <div className="w-full">
            <label className="block mb-2 font-medium">First Name</label>
            <input
              type="text"
              className="input-field border rounded-md py-2 px-3 w-full"
              {...register('firstName')}
              defaultValue={splitName(user.name).firstName}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 font-medium">Email</label>
            <input
              type="email"
              className="input-field border rounded-md py-2 px-3 w-full"
              {...register('email')}
              value={user.email}
              readOnly
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label className="block mb-2 font-medium">Last Name</label>
            <input
              type="text"
              className="input-field border rounded-md py-2 px-3 w-full"
              {...register('lastName')}
              defaultValue={splitName(user.name).lastName}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName.message}</p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block mb-2 font-medium">Phone Number</label>
            <input
              type="text"
              className="input-field border rounded-md py-2 px-3 w-full"
              {...register('phone')}
              defaultValue={user.phone || ''}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone.message}</p>
            )}
          </div>

          {/* Location */}
          <div>
            <label className="block mb-2 font-medium">Location</label>
            <input
              type="text"
              className="input-field border rounded-md py-2 px-3 w-full"
              {...register('location')}
              defaultValue={user.location}
            />
            {errors.location && (
              <p className="text-red-500 text-sm">{errors.location.message}</p>
            )}
          </div>

          {/* Password Change Button */}
          <div className="flex items-end">
            <button
              type="button"
              className="primary-button bg-[#0a1172] text-white w-fit px-4 h-fit rounded-md py-2"
              onClick={() => setShowPasswordModal(true)}
              disabled={isSubmitting}
            >
              Change Password
            </button>
          </div>
        </div>

        <div className="flex w-fit mt-8 h-10">
          <Button
            type="submit"
            className="primary-button bg-[#0a1172] text-white w-fit px-4 h-full rounded-md disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Updating...' : 'Update Profile'}
          </Button>
        </div>
      </form>

      {showPasswordModal && (
        <PasswordChange
          user={user}
          setShowPasswordModal={setShowPasswordModal}
          onPasswordChange={handlePasswordChange}
        />
      )}
    </>
  );
}
