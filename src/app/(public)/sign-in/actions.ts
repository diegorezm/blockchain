"use server";

import { setSession } from "@/app/_actions/auth";
import { unauthenticatedAction } from "@/lib/safe-actions";
import { signInUseCase } from "@/server/modules/auth/use-cases/sign-in";
import { z } from "zod";

export const signInAction = unauthenticatedAction
  .createServerAction()
  .input(
    z.object({
      email: z.string().email(),
      password: z.string(),
    }),
    {
      type: "formData",
    },
  )
  .handler(async ({ input }) => {
    // await rateLimitByKey({ key: input.email, limit: 1, window: 3000 });
    const session = await signInUseCase(input);
    const date = new Date(session.expiresAt);
    await setSession(session.id, date);
  });
