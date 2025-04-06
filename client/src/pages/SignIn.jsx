import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { RouteSignUp } from "@/helpers/RouteName";

function SignIn() {
  const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, "Password must be at least 8 characters long"),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values) {
    console.log(values);
  }
  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <Card className="w-[300px] p-5">
        <h1 className="text-2xl font-extrabold text-center mb-2 text-gray-600">Login to your account</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="mb-3">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-gray-600 font-semibold'>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="mb-3">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-gray-600 font-semibold'>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your password" {...field} />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

          <div className="mt-5">
          <Button type="submit" className="w-full">
              Sign In
            </Button>
            <div className="mt-5 text-sm flex justify-center items-center gap-2">
              <p>Don&apos;t have an account?</p>
              <Link className="text-blue-500 hover:underline" to={RouteSignUp}>Sign Up</Link>
            </div>
          </div>
          </form>
        </Form>
      </Card>
    </div>
  );
}

export default SignIn;
