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
    <div className="flex flex-col justify-between h-screen w-screen md:flex-row">
      <div className="h-[calc(100vh/2.5)] w-full md:h-screen md:w-[calc(100vw/2)]">
        <Image src={AddDetails} alt="login image" className=" w-full h-full object-cover hidden md:block" />
        <Image src={AddDetailsMobile} alt="login image" className=" w-full h-full object-cover md:hidden" />
      </div>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="font-bold text-2xl text-[#060A87] text-center">Welcome To Dire Family</CardTitle>
          <CardDescription className="font-normal text-sm text-[#060A87] text-center">
            Please Fill the Form Below
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="flex gap-2">
                <FormField
                  control={form.control}
                  name="fName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input  {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input  {...field} />
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
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input  {...field} />
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
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Enter your password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Enter your password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button className="w-full" type="submit">Submit</Button>
            </form>
          </Form>
        </CardContent>
      </Card>

    </div>

  )
}