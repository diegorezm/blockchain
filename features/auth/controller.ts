"use server"

import {createServerAction} from 'zsa'

import {HashingService} from "@/services/hashing.service"
import {userInsertSchema, userLoginSchema} from "@/features/user/model"
import {createUser, getUserByEmail, userExistsByEmail} from "@/features/user/queries"
import {createCookieSession, removeCookieSession} from "./lib"

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

    return {message: "User was created."}
  })

export const loginAction = createServerAction()
  .input(userLoginSchema, {type: "json"}).handler(async ({input}) => {
    const {email, password} = input
    const user = await getUserByEmail(email);
    if ('error' in user) throw new Error('Invalid password or email.')

    const hashingService = new HashingService();
    const isValidPassword = hashingService.compare(password, user.passwordHash);

    if (!isValidPassword) throw new Error("Invalid password or email.");

    const response = await createCookieSession(user.id);
    if (response) throw new Error(response.error)

    return {message: "Login was successful!"}
  })


export const logoutAction = createServerAction().handler(async () => {
  const response = await removeCookieSession()
  if (response) {
    throw new Error(response.error)
  } else {
    return {message: "Logout was successful!"}
  }
})
