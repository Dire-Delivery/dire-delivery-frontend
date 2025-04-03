'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { PasswordInput } from '@/components/log-in/password-input';
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
import { z } from 'zod';
import { UseFormReturn } from 'react-hook-form';

type LoginCardProps = { 
    form: UseFormReturn<z.infer<typeof signInFormSchema>>, 
    onSubmit: (values: z.infer<typeof signInFormSchema>) => Promise<void>,
    rememberMe: boolean, 
    setRememberMe: React.Dispatch<React.SetStateAction<boolean>>,
    setShowAlertDialog: React.Dispatch<React.SetStateAction<boolean>>
}

function LogInCard({ form, onSubmit, rememberMe, setRememberMe, setShowAlertDialog }: LoginCardProps) {
    return (
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
    )
}

export default LogInCard