"use server"
import {setSession} from "@/app/_actions/auth";
import {rateLimitByKey} from "@/app/_lib/limiter";
import {unauthenticatedAction} from "@/app/_lib/safe-action";
import {signInUseCase} from "@/src/modules/auth/use-cases/sign-in";
import {z} from "zod";

export const signInAction = unauthenticatedAction
  .createServerAction()
  .input(
    z.object({
      email: z.string(),
      password: z.string()
    })
  )
  .handler(async ({input}) => {
    await rateLimitByKey({key: input.email, limit: 1, window: 3000})
    const session = await signInUseCase(input)
    await setSession(session.id, session.expiresAt)
  })
