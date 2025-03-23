import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="h-full mx-auto">
      <SignIn
        appearance={{
          variables: {
            colorText: "#faf9f5",
            colorPrimary: "#f865b0",
            colorBackground: "#000000",
            colorInputBackground: "transparent",
            colorInputText: "#e2eeee",
            colorTextOnPrimaryBackground: "#000000",
            colorNeutral: "#d1f94d",
            colorTextSecondary: "#faf9f5",
          },
        }}
      />
    </div>
  );
}
