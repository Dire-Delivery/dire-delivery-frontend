'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";

import { ResetPassword } from "@/actions/auth";
import { PasswordInput } from "@/components/log-in/password-input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { resetPasswordSchema } from "@/lib/auth-schema";
import plane from '@/public/Icons/black Plane.svg';
import backgroundImage from "@/public/images/resetBackground.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { use } from 'react';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import ResetPasswordComponent from "@/components/ResetPassword/ResetPassword";

export default function Page({
    params,
}: {
    params: Promise<{ forgotPwdToken: string }>;
}) {
    const { forgotPwdToken } = use(params);
    const router = useRouter()
    const { toast } = useToast();

    const form = useForm<z.infer<typeof resetPasswordSchema>>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            newPassword: "",
            confirmPassword: ""
        },
    })

    async function onSubmit(values: z.infer<typeof resetPasswordSchema>) {
        const { newPassword } = values;
        const passwordDetails = {
            password: newPassword
        }

    try {
        const response = await ResetPassword(passwordDetails, forgotPwdToken);
        toast({
            title: "Successfully reset password",
            variant: `success`,
          });

        if (response.message == "Password reset successfully!") {
            router.push('/log-in')
        }

    } catch (error) {
      console.log(error);
      toast({
        title: "Could not reset password",
        variant: 'destructive',
      });
    }
    }

    return (
        <div className="relative h-screen w-screen overflow-hidden">
            {/* Background Image */}
            <Image
                src={backgroundImage}
                alt="Background"
                layout="fill"
                objectFit="cover"
                className="absolute inset-0 -z-10"
            />
            <div className="flex flex-col h-screen w-screen md:flex-row-reverse">
                <ResetPasswordComponent form={form} onSubmit={onSubmit}/>
            </div>
        </div>
    )
}
