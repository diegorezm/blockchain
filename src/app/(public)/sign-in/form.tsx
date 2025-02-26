"use client";
import styles from "./signin.module.css";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useServerAction } from "zsa-react";
import { signInAction } from "./actions";
import { FormEvent } from "react";
import ErrorAlert from "@/components/ErrorAlert";
import { useRouter } from "next/navigation";

export function SignInForm() {
  const { execute, isPending, error, isError } = useServerAction(signInAction);

  const router = useRouter();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    await execute(formData);
    if (!isPending && !isError) {
      router.push("/dashboard");
    }
  };

  return (
    <>
      <form className={styles.form} onSubmit={onSubmit}>
        <Input type="email" placeholder="Email Address" name="email" />
        <Input
          type="password"
          placeholder="Password"
          minLength={6}
          maxLength={122}
          name="password"
        />
        <Button variant="outline" disabled={isPending}>
          Submit
        </Button>
      </form>
      {isError && <ErrorAlert message={error.message} />}
    </>
  );
}
