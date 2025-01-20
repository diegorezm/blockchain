"use server"

import {setSession} from "@/app/_actions/auth";
import {rateLimitByKey} from "@/app/_lib/limiter";
import {unauthenticatedAction} from "@/app/_lib/safe-action";
import {signInUseCase} from "@/src/modules/auth/use-cases/sign-in";
import {signUpUseCase} from "@/src/modules/user/use-cases/sign-up";
import {z} from "zod";

export const signUpAction = unauthenticatedAction
  .createServerAction()
  .input(z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
  }))
  .handler(async ({input}) => {
    await rateLimitByKey({key: input.email, limit: 1, window: 3000})
    await signUpUseCase(input)
    const session = await signInUseCase(input)
    await setSession(session.id, session.expiresAt)
  })
