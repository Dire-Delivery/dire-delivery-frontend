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
import { addDetailsSchema } from "@/lib/auth-schema";
import Image from "next/image";
import AddDetails from "@/public/images/add-details.png"
import AddDetailsMobile from "@/public/images/details-mobile-version.svg"
import { PasswordInput } from "@/components/sign-in/password-input";

const BaseUrl = process.env.API_URL

export default function addDetails() {
  const form = useForm<z.infer<typeof addDetailsSchema>>({
    resolver: zodResolver(addDetailsSchema),
    defaultValues: {
      fName: "",
      lName: "",
      location: "",
      newPassword: "",
      confirmPassword: ""
    },
  })

  async function onSubmit(values: z.infer<typeof addDetailsSchema>) {
    const { fName, lName, location, newPassword, confirmPassword } = values;
    console.log("the values", values)
    const addDetails = {
      name: `${fName} ${lName}`,
      location, newPassword
    }

    const user = localStorage.getItem('user')
    const token = localStorage.getItem('token')
    console.log("token", token)

    if (user && token) {
      const userData = JSON.parse(user)

      const response = await fetch(`https://1clr2kph-4000.uks1.devtunnels.ms/auth/${userData.id}/sign-up`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(addDetails),
      })


      console.log('response', response)

      const data = await response.json()

      if (data) {
        localStorage.setItem("user", JSON.stringify(data.payload))
      }

      console.log("data", data)
    }
  }

  return (
    <div className="flex flex-col  h-screen w-screen md:flex-row">
      <div className="h-[calc(100vh/2.5)] w-full md:h-screen md:w-[calc(100vw/2)]">
        <Image src={AddDetails} alt="login image" className=" w-full h-full object-cover hidden md:block" />
        <Image src={AddDetailsMobile} alt="login image" className=" w-full h-full object-cover md:hidden" />
      </div>
      <Card className="w-full my-auto border-none shadow-none py-0">
        <CardHeader className="pt-3">
          <CardTitle className="font-bold text-2xl text-[#060A87] text-center">Welcome To Dire Family</CardTitle>
          <CardDescription className="font-normal text-sm text-[#060A87] text-center">
            Please Fill the Form Below
          </CardDescription>
        </CardHeader>

        <CardContent className="pb-3">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="">
              <div className="space-y-4">
                <div className="flex gap-2">
                  <FormField
                    control={form.control}
                    name="fName"
                    render={({ field }) => (
                      <FormItem className="space-y-0 flex-1">
                        <FormLabel className="font-medium text-base text-[#111827]">First Name <span className="text-[#E03137]">*</span></FormLabel>
                        <FormControl>
                          <Input className="border-[#27A376]" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lName"
                    render={({ field }) => (
                      <FormItem className="space-y-0 flex-1">
                        <FormLabel className="font-medium text-base text-[#111827]" >Last Name <span className="text-[#E03137]">*</span></FormLabel>
                        <FormControl>
                          <Input className="border-[#27A376]"  {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem className="space-y-0">
                      <FormLabel className="font-medium text-base text-[#111827]">Location <span className="text-[#E03137]">*</span></FormLabel>
                      <FormControl>
                        <Input className="border-[#27A376]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex gap-2">
                  <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem className="space-y-0 flex-1">
                        <FormLabel className="font-medium text-base text-[#111827]">New Password <span className="text-[#E03137]">*</span></FormLabel>
                        <FormControl>
                          <PasswordInput placeholder="new password" className="h-10 border-[#27A376] md:h-12 md:text-base" {...field}/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem className="space-y-0 flex-1">
                        <FormLabel className="font-medium text-base text-[#111827]">Confirm Password <span className="text-[#E03137]">*</span></FormLabel>
                        <FormControl>
                        <PasswordInput placeholder="confirm password" className="h-10 border-[#27A376] md:h-12 md:text-base" {...field}/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>


              <Button className="w-full h-12 mt-6" type="submit" variant="login">Submit</Button>
            </form>
          </Form>
        </CardContent>
      </Card>

    </div>

  )
}