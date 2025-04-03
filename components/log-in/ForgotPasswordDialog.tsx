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
import { useForm, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import LogInCard from '@/components/log-in/LogInCard';

type ForgotPasswordDialogProps = {
    forgotPasswordForm: UseFormReturn<{ email: string}>, 
    showAlertDialog: boolean,
    setShowAlertDialog: React.Dispatch<React.SetStateAction<boolean>>,
    handleForgotPassword: (email: string) => void;
}


function ForgotPasswordDialog({showAlertDialog, setShowAlertDialog, forgotPasswordForm, handleForgotPassword}: ForgotPasswordDialogProps) {
  return (
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
  )
}

export default ForgotPasswordDialog