"use client";

import styles from "./signup.module.css";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import ErrorAlert from "@/components/ErrorAlert";

import { useServerAction } from "zsa-react";
import { signUpAction } from "./actions";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";

export function SignUpForm() {
  const { execute, isPending, error, isError } = useServerAction(signUpAction);

  const router = useRouter();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    await execute(formData);

    if (!isError && !isPending) {
      router.push("/dashboard");
    }
  };

  return (
    <>
      <form className={styles.form} onSubmit={onSubmit}>
        <Input
          type="text"
          placeholder="Full Name"
          name="name"
          minLength={2}
          maxLength={255}
        />
        <Input type="email" placeholder="Email Address" name="email" />
        <Input
          type="password"
          placeholder="Password"
          name="password"
          minLength={6}
          maxLength={122}
        />
        <Button variant="secondary" disabled={isPending}>
          Submit
        </Button>
      </form>
      {isError && <ErrorAlert message={error.message} />}
    </>
  );
}
