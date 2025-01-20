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
import {signInAction} from "./actions";
import {useServerAction} from "zsa-react";
import {LoaderButton} from "@/app/_components/loader-button";
import {useRouter} from "next/navigation";

const signInSchema = z.object
  ({
    email: z.string().email(),
    password: z.string().min(8),
  })

export function SignInForm() {
  const {toast} = useToast()
  const router = useRouter()

  const {execute, isPending} = useServerAction(signInAction, {
    onError({err}) {
      toast({
        title: "Something went wrong",
        description: err.message,
        variant: "destructive",
      });
    },
  });

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof signInSchema>) {
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
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <LoaderButton type="submit" className="w-full" isLoading={isPending}>
            Sign In
          </LoaderButton>
          <p className="text-sm text-center text-muted-foreground">
            Don{"'"}t have an account yet?{" "}
            <Link href="/sign-up" className="text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </form>
    </Form>
  )
}
