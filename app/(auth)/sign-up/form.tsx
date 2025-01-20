"use client"

import {DottedSeparator} from "@/app/_components/dotted-separator";
import {zodResolver} from "@hookform/resolvers/zod";
import {CardContent, CardFooter} from "@/app/_components/ui/card";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/app/_components/ui/form";
import {Input} from "@/app/_components/ui/input";
import Link from "next/link";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {useToast} from "@/app/_hooks/use-toast";
import {signUpAction} from "./actions";
import {useServerAction} from "zsa-react";
import {LoaderButton} from "@/app/_components/loader-button";
import {useRouter} from "next/navigation";

const signUpSchema = z.object
  ({
    name: z.string().min(4),
    email: z.string().email(),
    password: z.string().min(8),
    passwordConfirmation: z.string().min(8)
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ["PasswordConfirmation"]
  })

export function SignUpForm() {
  const {toast} = useToast();
  const router = useRouter()

  const {execute, isPending} = useServerAction(signUpAction, {
    onError({err}) {
      toast({
        title: "Something went wrong",
        description: err.message,
        variant: "destructive",
      });
    },
  });

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
    shouldFocusError: true
  });

  async function onSubmit(values: z.infer<typeof signUpSchema>) {
    await execute(values)
    router.push("/dashboard")
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent className="space-y-2">
          <DottedSeparator />
          <FormField
            control={form.control}
            name="name"
            render={({field}) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="w-full"
                    placeholder="Enter your name"
                    type="text"
                  />
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
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="w-full"
                    placeholder="Enter your email"
                    type="email"
                  />
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="w-full"
                    placeholder="Enter your password"
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="passwordConfirmation"
            render={({field}) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="w-full"
                    placeholder="Enter Confirm your Password"
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <LoaderButton type="submit" className="w-full" isLoading={isPending}>
            Sign Up
          </LoaderButton>
          <p className="text-sm text-center text-muted-foreground">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </CardFooter>
      </form>
    </Form>
  )
}
