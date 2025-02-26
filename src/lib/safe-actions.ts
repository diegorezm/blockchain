import { getSession } from "@/app/_actions/auth";
import { env } from "@/env";
import { PublicError } from "@/server/types/errors";
import { createServerActionProcedure } from "zsa";
import { rateLimitByKey } from "./limiter";

function shapeErrors({ err }: any) {
  const isAllowedError = err instanceof PublicError;
  const isDev = env.NODE_ENV === "development";
  if (isAllowedError || isDev) {
    console.error(err);
    return {
      code: err.code ?? "ERROR",
      message: `${!isAllowedError && isDev ? "DEV ONLY ENABLED - " : ""}${
        err.message
      }`,
    };
  } else {
    return {
      code: "ERROR",
      message: "Something went wrong",
    };
  }
}

export const authenticatedAction = createServerActionProcedure()
  .experimental_shapeError(shapeErrors)
  .handler(async () => {
    const { user, session } = await getSession();
    if (!user || !session) {
      throw new Error("unauthorized");
    }
    // await rateLimitByKey({
    //   key: `${user.id}-global`,
    //   limit: 10,
    //   window: 10000,
    // });
    return { user, session };
  });

export const unauthenticatedAction = createServerActionProcedure()
  .experimental_shapeError(shapeErrors)
  .handler(async () => {
    // await rateLimitByKey({
    //   key: `unauthenticated-global`,
    //   limit: 10,
    //   window: 10000,
    // });
  });
