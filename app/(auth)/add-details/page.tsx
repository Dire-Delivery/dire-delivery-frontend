'use client';

import { zodResolver } from '@hookform/resolvers/zod';

import {
  AddDetailsFetch,
  setCookies,
  userProfile,
  userToken,
} from '@/actions/auth';
import DetailsCard from '@/components/add-details/detailsCard';
import { useToast } from '@/hooks/use-toast';
import { addDetailsSchema } from '@/lib/auth-schema';
import addDetails from '@/public/images/add-details.webp';
import AddDetailsMobile from '@/public/images/details-mobile-version.webp';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export default function AddDetails() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof addDetailsSchema>>({
    resolver: zodResolver(addDetailsSchema),
    defaultValues: {
      fName: '',
      lName: '',
      location: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(values: z.infer<typeof addDetailsSchema>) {
    const { fName, lName, location, newPassword } = values;
    const addDetails = {
      name: `${fName} ${lName}`,
      location,
      password: newPassword,
    };

    const userData = await userProfile();
    const token = await userToken();

    if (userData && token) {
      const data = await AddDetailsFetch(userData.id, addDetails);

      if (data && !data.error) {
        // toast.success(data.message)
        toast({
          title: 'Successfully added basic information',
          variant: `success`,
        });
        setCookies(data);
        if (data.payload.role == 'OWNER') {
          redirect('/owner');
        } else if (data.payload.role == 'ADMIN') {
          redirect('/admin');
        } else if (data.payload.role == 'EMPLOYEE') {
          redirect('/employee');
        } else {
          console.error('unknown role error');
          // add toast for unknown role error
        }
      } else {
        toast({
          title: data.error.title ? data.error.title : 'Error!',
          description: data.error.description ? data.error.description : 'Could not add information',
          variant: 'destructive',
        });
      }
    }
  }

  return (
    <div className="flex flex-col h-screen w-screen md:flex-row-reverse">
      <div className="h-[calc(100vh/2.5)] w-full md:w-[calc(100vw/2)] md:h-auto lg:h-screen lg:w-auto">
        <Image
          src={addDetails}
          alt="login image"
          className=" w-full h-full object-cover hidden md:block"
        />
        <Image
          src={AddDetailsMobile}
          alt="login image"
          className=" w-full h-full object-cover md:hidden"
        />
      </div>
      <DetailsCard form={form} onSubmit={onSubmit}/>
    </div>
  );
}
