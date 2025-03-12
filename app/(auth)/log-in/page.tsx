'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";

import { setTokenCookie, setUserCookie, userProfile } from "@/actions/auth";
import { PasswordInput } from "@/components/log-in/password-input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signInFormSchema } from "@/lib/auth-schema";
import Login from "@/public/images/log-in.png";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const BaseUrl = process.env.NEXT_PUBLIC_API_URL

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
    const loginDetails = {
      email: email,
      password: password
    }

    const response = await fetch(`${BaseUrl}/auth/log-in`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginDetails),
    })
    const data = await response.json()

    if (data && !data.error) {
      setTokenCookie(data.token)
      if (typeof data.payload === "string") {
        const user = {
          id: data.payload
        }
        setUserCookie(user)
        const userData = await userProfile();
        redirect("/add-details")
      } else {
        setUserCookie(data.payload)

        if (data.payload.role == "OWNER") {
          redirect("/owner")
        } else if (data.payload.role == "ADMIN") {
          redirect("/admin")
        } else if (data.payload.role == "EMPLOYEE") {
          redirect("/employee")
        } else {
          console.error("unknown role error")
          // add toast for unknown role error
        }
      }
    } else {
      console.log("data not found")
    }
  }

  return (
    <div className="flex flex-col justify-between h-screen w-screen md:flex-row">
      <div className="h-[calc(100vh/2.5)] w-full md:h-screen md:w-[calc(100vw/2)]">
        <Image src={Login} alt="login image" className=" w-full h-full object-cover" />
      </div>
      <Card className="flex-1 w-full px-8 flex flex-col justify-center md:flex-none md:w-[350px] md:p-0 md:mx-auto md:border-none md:shadow-none lg:w-[450px] xl:w-[500px] 2xl:w-[550px]">
        <CardHeader className="p-0">
          <CardTitle className="font-bold text-2xl text-[#060A87] text-center p-0 px-0 pb-6 md:text-3xl">Login to your account</CardTitle>
        </CardHeader>

        <CardContent className="pb-0">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 md:space-y-7">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-s font-medium text-[#111827] md:text-lg">Email <span className="text-[#E03137]">*</span></FormLabel>
                    <FormControl>
                      <Input placeholder="john@mail.com" className="h-10 md:h-12 md:text-base" {...field} />
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
                    <FormLabel className="text-s font-medium text-[#111827] md:text-lg">Password <span className="text-[#E03137]">*</span></FormLabel>
                    <FormControl>
                      <PasswordInput placeholder="Enter your password" className="h-10 md:h-12 md:text-base" {...field}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-between ml-[-5px] mr-[-5px] items-center">
                <div className="flex gap-1.5 items-center">
                  <Checkbox className="data-[state=checked]:bg-[#27A376] data-[state=checked]:border-[#27A376]" />
                  <div className="text-[#687588] font-medium text-s mb-[-3px] cursor-pointer">Remember Me</div>
                </div>
                <div className="text-[#687588] font-medium text-s items-center cursor-pointer">Forgot Password</div>
              </div>
              <Button className="w-full h-12" type="submit" variant="login">Login</Button>
            </form>
          </Form>
        </CardContent>
      </Card>

    </div>

  )
}