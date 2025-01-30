"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/app/_components/ui/card";
import {SignInForm} from "./form";

export default function SignIn() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <SignInForm />
    </Card>
  );
}
