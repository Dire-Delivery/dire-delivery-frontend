'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";

import { AddDetailsFetch, setCookies, userProfile, userToken } from "@/actions/auth";
import { PasswordInput } from "@/components/log-in/password-input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { addDetailsSchema } from "@/lib/auth-schema";
import addDetails from "@/public/images/add-details.png";
import AddDetailsMobile from "@/public/images/details-mobile-version.svg";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const BaseUrl = process.env.NEXT_PUBLIC_API_URL

export default function AddDetails() {
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
    const { fName, lName, location, newPassword } = values;
    const addDetails = {
      name: `${fName} ${lName}`,
      location,
      password: newPassword
    }

    const userData = await userProfile();
    const token = await userToken();

    if (userData && token) {
      const data = await AddDetailsFetch(userData.id, addDetails);
      console.log("the data",data)

      if (data) {
        setCookies(data)
        if (data.payload.role == "ADMIN") {
          redirect("/admin")
        } else if (data.payload.role == "EMPLOYEE") {
          redirect("/employee")
        } else {
          console.error("unknown role error")
          // add toast for unknown role error
        }
      }
    }
  }

  return (
    <div className="flex flex-col h-screen w-screen md:flex-row-reverse">
      <div className="h-[calc(100vh/2.5)] w-full md:w-[calc(100vw/2)] md:h-auto lg:h-screen lg:w-auto">
        <Image src={addDetails} alt="login image" className=" w-full h-full object-cover hidden md:block" />
        <Image src={AddDetailsMobile} alt="login image" className=" w-full h-full object-cover md:hidden" />
      </div>
      <Card className="w-full my-auto border-none shadow-none py-0 md:flex-none md:w-[370px] md:p-0 md:mx-auto md:border-none md:shadow-none lg:w-[450px] xl:w-[550px] 2xl:w-[650px]">
        <CardHeader className="pt-3 md:flex md:gap-1">
          <CardTitle className="font-bold text-2xl text-[#060A87] text-center md:text-4xl">Welcome To Dire Family</CardTitle>
          <CardDescription className="font-normal text-sm text-[#060A87] text-center md:text-lg">
            Please Fill the Form Below
          </CardDescription>
        </CardHeader>

        <CardContent className="pb-3 md:pt-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="">
              <div className="space-y-4 md:space-y-6">
                <div className="flex gap-2 md:gap-6">
                  <FormField
                    control={form.control}
                    name="fName"
                    render={({ field }) => (
                      <FormItem className="space-y-0 flex-1 md:space-y-2">
                        <FormLabel className="font-medium text-base text-[#111827] md:text-lg">First Name <span className="text-[#E03137]">*</span></FormLabel>
                        <FormControl>
                          <Input placeholder="Input your First Name" className="border-[#27A376] text-sm md:h-12 md:text-base placeholder-[#A0AEC0]" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lName"
                    render={({ field }) => (
                      <FormItem className="space-y-0 flex-1 md:space-y-2">
                        <FormLabel className="font-medium text-base text-[#111827] md:text-lg" >Last Name <span className="text-[#E03137]">*</span></FormLabel>
                        <FormControl>
                          <Input placeholder="Input your Last Name" className="border-[#27A376] text-sm md:h-12 md:text-base placeholder-[#A0AEC0]"  {...field} />
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
                    <FormItem className="space-y-0 md:space-y-2">
                      <FormLabel className="font-medium text-base text-[#111827] md:text-lg">Location <span className="text-[#E03137]">*</span></FormLabel>
                      <FormControl>
                        <Input placeholder="Addis Ababa" className="border-[#27A376] text-sm md:h-12 md:text-base placeholder-[#A0AEC0]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex gap-2 md:gap-6">
                  <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem className="space-y-0 flex-1 md:space-y-2">
                        <FormLabel className="font-medium text-base text-[#111827] md:text-lg">New Password <span className="text-[#E03137]">*</span></FormLabel>
                        <FormControl>
                          <PasswordInput placeholder="new password" className="h-10 border-[#27A376] text-sm md:h-12 md:text-base placeholder-[#A0AEC0]" {...field}/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem className="space-y-0 flex-1 md:text-lg md:space-y-2">
                        <FormLabel className="font-medium text-base text-[#111827]">Confirm Password <span className="text-[#E03137]">*</span></FormLabel>
                        <FormControl>
                        <PasswordInput placeholder="confirm password" className="h-10 border-[#27A376] text-sm placeholder-[#A0AEC0] md:h-12 md:text-base" {...field}/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>


              <Button className="w-full h-12 mt-6 md:mt-9 md:h-14" type="submit" variant="login">Submit</Button>
            </form>
          </Form>
        </CardContent>
      </Card>

    </div>

  )
}