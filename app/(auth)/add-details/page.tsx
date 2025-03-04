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

const BaseUrl = process.env.API_URL

export default function addDetails() {
  const form = useForm<z.infer<typeof addDetailsSchema>>({
    resolver: zodResolver(addDetailsSchema),
    defaultValues: {
      name: "",
      location: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof addDetailsSchema>) {
    const { name, location, password } = values;
    console.log("the values", values)
    const addDetails = {
      name, location, password
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
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>
          Welcome back! Please sign in to continue.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>name</FormLabel>
                  <FormControl>
                    <Input  {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Enter your password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">Submit</Button>
          </form>
        </Form>
      </CardContent>

      <CardFooter className='flex justify-center'>
        <p className='text-sm text-muted-foreground'>
          Don&apos;t have an account yet?{' '}
          <Link href='/sign-up' className='text-primary hover:underline'>
            Sign up
          </Link>
        </p>
      </CardFooter>
    </Card>

  )
}