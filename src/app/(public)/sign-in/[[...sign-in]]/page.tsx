import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="h-full mx-auto">
      <SignIn />
    </div>
  );
}
