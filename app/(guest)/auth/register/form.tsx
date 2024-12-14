"use client";

import Link from "next/link";
import {Button} from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"

import {Input} from "@/components/ui/input"

import {useForm} from "react-hook-form";
import {UserInsert, userInsertSchema} from "@/features/user/model";
import {zodResolver} from "@hookform/resolvers/zod"
import {useServerAction} from "zsa-react";
import {registerAction} from "@/features/auth/controller";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";

export const RegisterForm = () => {
  const {isPending, execute} = useServerAction(registerAction);
  const router = useRouter()

  const form = useForm<UserInsert>({
    resolver: zodResolver(userInsertSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  })

  const onSubmit = async (values: UserInsert) => {
    const [data, err] = await execute(values);
    if (err) {
      toast.error(err)
    } else {
      toast.success(data.message)
      form.reset();
      router.push("/auth/login")
    }

  }

  return (
    <Form {...form}>
      <form className="space-y-4 p-7" onSubmit={form.handleSubmit(onSubmit)}>

        <FormField
          control={form.control}
          name="name"
          render={({field}) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Enter your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({field}) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Enter your email" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({field}) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Enter your password" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({field}) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Confirm your password" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col lg:flex-row justify-between gap-4">
          <Button type="submit" variant="default" size="lg" disabled={isPending}>
            Register
            <span className="sr-only">Register</span>
          </Button>
          <Link href="/auth/login">
            <Button variant="link">
              Already have an account? Login
              <span className="sr-only">Login</span>
            </Button>
          </Link>
        </div>
      </form>
    </Form>
  );
};

