'use client';

import { zodResolver } from '@hookform/resolvers/zod';

import {
  ForgotPassword,
  loginFetch,
  RememberMe,
  setCookies,
} from '@/actions/auth';
import LogInCard from '@/components/log-in/LogInCard';
import { useToast } from '@/hooks/use-toast';
import { signInFormSchema } from '@/lib/auth-schema';
import Login from '@/public/images/log-in.webp';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import dynamic from 'next/dynamic';

// Dynamically import ForgotPasswordDialog
const ForgotPasswordDialog = dynamic(() => import('@/components/log-in/ForgotPasswordDialog'), {
  ssr: false,
});

export default function SignIn() {
  const [rememberMe, setRememberMe] = useState(false); // ✅ Add state for Remember Me
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const forgotPasswordForm = useForm<{ email: string }>({
    // ✅ Explicit type
    resolver: zodResolver(z.object({ email: z.string().email() })), // ✅ Validation
    defaultValues: {
      email: '',
    },
  });

  async function onSubmit(values: z.infer<typeof signInFormSchema>) {
    const { email, password } = values;
    const loginDetails = {
      email: email,
      password: password,
    };
    const data = await loginFetch(loginDetails);

    if (data && !data.error) {
      toast({
        title: 'Successfully logged in',
        variant: `success`,
      });
      setCookies(data);
      if (typeof data.payload == 'string') {
        redirect('/add-details');
      } else {
        if (rememberMe) {
          try {
            await RememberMe(data.payload.id);
          } catch (error) {
            console.log(error);
          }
        }
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
      }
    } else {
      toast({
        title: data.error.title ? data.error.title : 'Error!',
        description: data.error.description ? data.error.description : 'Could not log in',
        variant: 'destructive',
      });
    }
  }

  const handleForgotPassword = async (email: string) => {
    try {
      const data = { email };
      const response = await ForgotPassword(data);
      console.log("response", response);
      if (response && !response.error) {
        toast({
          title: 'Successfully sent rest password email',
          variant: `success`,
        });
      } else {
        toast({
          title: response.error.title ? response.error.title : 'Error!',
          description: response.error.description
            ? response.error.description
            : 'Could not send rest password email',
          variant: 'destructive',
        })
      }
    } catch (error) {
      console.log(error);
      toast({
        title: 'Could not send rest password email',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="flex flex-col justify-between h-screen w-screen md:flex-row">
      <ForgotPasswordDialog forgotPasswordForm={forgotPasswordForm} showAlertDialog={showAlertDialog} setShowAlertDialog={setShowAlertDialog} handleForgotPassword={handleForgotPassword}/>
      <div className="h-[calc(100vh/2.5)] w-full md:h-screen md:w-[calc(100vw/2)]">
        <Image
          src={Login}
          alt="login image"
          className=" w-full h-full object-cover"
        />
      </div>
      <LogInCard form={form} onSubmit={onSubmit} rememberMe={rememberMe} setRememberMe={setRememberMe} setShowAlertDialog={setShowAlertDialog}/>
    </div>
  );
}
