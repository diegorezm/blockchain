import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {RegisterForm} from "./form";
import {DottedSeparator} from "@/components/dotted-separator";

export default function RegisterPage() {
  return (
    <Card className="w-full h-full md:w-[500px] bg-white border-none shadow-md mx-auto">
      <CardHeader className="flex flex-col items-center">
        <CardTitle className="text-2xl">Register</CardTitle>
        <CardDescription>
          Join us!
        </CardDescription>
      </CardHeader>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent>
        <RegisterForm />
      </CardContent>
    </Card>
  )
}
