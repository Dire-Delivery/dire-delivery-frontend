'use client'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod"

import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { toast } from "sonner"
import { authClient } from "@/lib/auth-client";
import { signInFormSchema } from "@/lib/auth-schema";
import Image from "next/image";
import Login from "@/public/images/log-in.png"

const BaseUrl = process.env.API_URL

export default function SignIn() {
  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof signInFormSchema>) {
    const { email, password } = values;
    console.log("the values", values)
    const loginDetails = {
      email: email,
      password: password
    }

    const response = await fetch(`https://1clr2kph-4000.uks1.devtunnels.ms/auth/log-in`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginDetails),
    })


    console.log('response', response)

    const data = await response.json()

    if (data && !data.error) {
      console.log("data", data)
      if (data.mesage) {
        const user = {
          id: data.payload
        }
        localStorage.setItem("user", JSON.stringify(user))
      } else {
        localStorage.setItem("user", JSON.stringify(data.payload))
      }
      localStorage.setItem("token", data.token)
    } else {
      console.log("data not found")
    }


  }

  return (
    <div className="flex flex-col justify-between h-screen w-screen">
      <div className="h-[calc(100vh/2)] w-full">
        <Image src={Login} alt="login image" className=" w-full h-full object-cover" />
      </div>
      <div className="flex-1 border-4 border-red-400"></div>
    </div>
    // <Card className="w-full max-w-md mx-auto">
    //   <CardHeader>
    //     <CardTitle>Sign In</CardTitle>
    //     <CardDescription>
    //       Welcome back! Please sign in to continue.
    //     </CardDescription>
    //   </CardHeader>

    //   <CardContent>
    //     <Form {...form}>
    //       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
    //         <FormField
    //           control={form.control}
    //           name="email"
    //           render={({ field }) => (
    //             <FormItem>
    //               <FormLabel>Email</FormLabel>
    //               <FormControl>
    //                 <Input placeholder="john@mail.com" {...field} />
    //               </FormControl>
    //               <FormMessage />
    //             </FormItem>
    //           )}
    //         />
    //         <FormField
    //           control={form.control}
    //           name="password"
    //           render={({ field }) => (
    //             <FormItem>
    //               <FormLabel>Password</FormLabel>
    //               <FormControl>
    //                 <Input type="password" placeholder="Enter your password" {...field} />
    //               </FormControl>
    //               <FormMessage />
    //             </FormItem>
    //           )}
    //         />
    //         <Button className="w-full" type="submit">Submit</Button>
    //       </form>
    //     </Form>
    //   </CardContent>

    //   <CardFooter className='flex justify-center'>
    //     <p className='text-sm text-muted-foreground'>
    //       Don&apos;t have an account yet?{' '}
    //       <Link href='/sign-up' className='text-primary hover:underline'>
    //         Sign up
    //       </Link>
    //     </p>
    //   </CardFooter>
    // </Card>

  )
}