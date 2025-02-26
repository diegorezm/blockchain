"use server";

import { setSession } from "@/app/_actions/auth";
import { unauthenticatedAction } from "@/lib/safe-actions";
import { signInUseCase } from "@/server/modules/auth/use-cases/sign-in";
import { signUpUseCase } from "@/server/modules/user/use-cases/sign-up";
import { z } from "zod";

export const signUpAction = unauthenticatedAction
  .createServerAction()
  .input(
    z.object({
      name: z.string().min(2).max(255),
      email: z.string().email(),
      password: z.string().min(6).max(122),
    }),
    {
      type: "formData",
    },
  )
  .handler(async ({ input }) => {
    // await rateLimitByKey({ key: input.email, limit: 1, window: 3000 });
    await signUpUseCase(input);
    const session = await signInUseCase(input);
    const date = new Date(session.expiresAt);
    await setSession(session.id, date);
  });
