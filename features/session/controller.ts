"use server"

import {createServerAction} from 'zsa'

import {HashingService} from "@/services/hashing.service"
import {userInsertSchema, userLoginSchema} from "@/features/user/model"
import {createUser, userExistsByEmail} from "@/features/user/queries"

export const registerAction = createServerAction()
  .input(userInsertSchema, {type: "json"}).handler(async ({input}) => {
    const userExists = await userExistsByEmail(input.email)

    if (userExists) {
      throw new Error("User already exists.")
    }

    const hashingService = new HashingService()
    const passwordHash = hashingService.hash(input.password)
    const request = {
      ...input,
      passwordHash
    }

    const response = await createUser(request)

    if (response) {
      throw new Error(response.error)
    }

    return {message: "User created."}
  })

export const loginAction = createServerAction()
  .input(userLoginSchema, {type: "json"}).handler(async ({input}) => {
  })
