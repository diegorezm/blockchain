import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/app/_components/ui/card";
import {SignUpForm} from "./form";

export default function SignUp() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create an Account</CardTitle>
        <CardDescription>
          Enter your details to create your account
        </CardDescription>
      </CardHeader>
      <SignUpForm />
    </Card>
  );
}
