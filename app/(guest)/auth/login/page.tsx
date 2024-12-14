import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {LoginForm} from "./form";
import {DottedSeparator} from "@/components/dotted-separator";

export default async function LoginPage() {
  return (
    <Card className="w-full h-full md:w-[500px] bg-white border-none shadow-md mx-auto">
      <CardHeader className="flex flex-col items-center">
        <CardTitle className="text-2xl">
          Login
        </CardTitle>
        <CardDescription>
          Login to your account
        </CardDescription>
      </CardHeader>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent>
        <LoginForm />
      </CardContent>
    </Card>
  )
}
