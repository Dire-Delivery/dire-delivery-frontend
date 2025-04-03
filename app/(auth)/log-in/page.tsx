'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  ForgotPassword,
  loginFetch,
  RememberMe,
  setCookies,
} from '@/actions/auth';
import { PasswordInput } from '@/components/log-in/password-input';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { signInFormSchema } from '@/lib/auth-schema';
import Login from '@/public/images/log-in.webp';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';

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
        title: 'Could not log in',
        variant: 'destructive',
      });
    }
  }

  const handleForgotPassword = async (email: string) => {
    try {
      const data = { email };
      const response = await ForgotPassword(data);
      console.log({ response });
      toast({
        title: 'Successfully sent rest password email',
        variant: `success`,
      });
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
      <AlertDialog
        open={showAlertDialog}
        onOpenChange={(open) => setShowAlertDialog(open)} // ✅ Simplified
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-[#060A87] text-xl">
              Confirm Password Reset
            </AlertDialogTitle>
            <AlertDialogDescription>
              If you proceed, please provide your registered email address
              below. An email with a password reset link will be sent to your
              inbox.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <Form {...forgotPasswordForm}>
            <form
              onSubmit={forgotPasswordForm.handleSubmit((data) =>
                handleForgotPassword(data.email)
              )}
              className="space-y-4 md:space-y-7"
            >
              <FormField
                control={forgotPasswordForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-s font-medium text-[#060A87] md:text-lg">
                      Email <span className="text-[#E03137]">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="john@mail.com"
                        className="h-10 md:h-12 md:text-base focus:outline-none focus:border-none focus-visible:ring-[#060A87]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  type="submit" // ✅ Submit the form
                  className="bg-[#060A87] hover:bg-[#060a87dc]"
                >
                  Confirm
                </AlertDialogAction>
              </AlertDialogFooter>
            </form>
          </Form>
        </AlertDialogContent>
      </AlertDialog>
      <div className="h-[calc(100vh/2.5)] w-full md:h-screen md:w-[calc(100vw/2)]">
        <Image
          src={Login}
          alt="login image"
          className=" w-full h-full object-cover"
        />
      </div>
      <Card className="flex-1 w-full px-8 flex flex-col justify-center md:flex-none md:w-[350px] md:p-0 md:mx-auto md:border-none md:shadow-none lg:w-[450px] xl:w-[500px] 2xl:w-[550px]">
        <CardHeader className="p-0">
          <CardTitle className="font-bold text-2xl text-[#060A87] text-center p-0 px-0 pb-6 md:text-3xl">
            Login to your account
          </CardTitle>
        </CardHeader>

        <CardContent className="pb-0">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 md:space-y-7"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-s font-medium text-[#111827] md:text-lg">
                      Email <span className="text-[#E03137]">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="john@mail.com"
                        className="h-10 md:h-12 md:text-base"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-s font-medium text-[#111827] md:text-lg">
                      Password <span className="text-[#E03137]">*</span>
                    </FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder="Enter your password"
                        className="h-10 md:h-12 md:text-base"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-between ml-[-5px] mr-[-5px] items-center">
                <label className="flex gap-1.5 items-center cursor-pointer">
                  <Checkbox
                    checked={rememberMe}
                    className="data-[state=checked]:bg-[#060A87]"
                    onClick={() => setRememberMe(!rememberMe)}
                  />
                  <span className="text-[#687588] font-medium">
                    Remember Me
                  </span>
                </label>
                <div
                  className="text-[#687588] font-medium text-s items-center cursor-pointer"
                  onClick={() => setShowAlertDialog(true)}
                >
                  Forgot Password
                </div>
              </div>
              <Button className="w-full h-12" type="submit" variant="login">
                Login
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
