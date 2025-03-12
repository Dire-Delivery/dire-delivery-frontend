'use client'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { removeUserProfile, userProfile, userToken } from "@/actions/auth";

const BaseUrl = process.env.NEXT_PUBLIC_API_URL

export default function SignIn() {
  const logout = async () => {
    const userData = await userProfile();
    const token = await userToken();
    console.log("token", token)

    if (userData && token) {

      const response = await fetch(`${BaseUrl}/auth/${userData.id}/log-out`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      })

      if (response.ok) {
        removeUserProfile()
      }


      console.log('response', response)

      const data = await response.json()

      console.log("data", data)
    }
  }


  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>
          Log Out
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Button className="w-full" type="submit" onClick={logout}>Log Out</Button>
      </CardContent>

    </Card>

  )
}