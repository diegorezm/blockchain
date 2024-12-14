"use client";

import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"

import Link from "next/link"

import {useForm} from "react-hook-form";
import {userLoginSchema} from "@/features/user/model";

import {zodResolver} from "@hookform/resolvers/zod";
import {useServerAction} from 'zsa-react'
import {z} from "zod";
import {loginAction} from "@/features/auth/controller";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";

export const LoginForm = () => {
  const router = useRouter()
  const {execute, isPending} = useServerAction(loginAction)
  const form = useForm<z.infer<typeof userLoginSchema>>({
    resolver: zodResolver(userLoginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = async (values: z.infer<typeof userLoginSchema>) => {
    const [data, err] = await execute(values)

    if (err) {
      toast.error(err.message)
    } else {
      toast.success(data.message)
      form.reset()
      router.push("/dashboard")
    }
  }

  return (
    <Form {...form}>
      <form className="space-y-4 p-7" onSubmit={form.handleSubmit(onSubmit)}>
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
        <div className="flex flex-col lg:flex-row justify-between gap-4">
          <Button type="submit" size="lg" disabled={isPending}>
            Login
            <span className="sr-only">Login</span>
          </Button>
          <Link href="/auth/register">
            <Button variant="link" type="submit">
              Don&apos;t have an account? Register
              <span className="sr-only">Register</span>
            </Button>
          </Link>
        </div>
      </form>
    </Form>
  )
}
