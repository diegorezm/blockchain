"use server"

import {authenticatedAction} from "@/app/_lib/safe-action";
import {updateUserUseCase} from "@/src/modules/user/use-cases/update";
import {S3BucketService} from "@/src/services/bucket.service";
import {computeFileSHA256} from "@/src/utils/hashing";
import {z} from "zod";

export const updateUserAction = authenticatedAction
  .createServerAction()
  .input(
    z.object({
      name: z.string().optional(),
      email: z.string().email().optional()
    })
  )
  .handler(async ({ctx, input}) => {
    await updateUserUseCase(ctx.user.id, input)
  })


export const removeUserProfilePicAction = authenticatedAction
  .createServerAction()
  .handler(async ({ctx}) => {
    const {user} = ctx
    const s3BucketService = new S3BucketService();

    if (user.imgKey && user.imgUrl) {
      const deleteResponse = await s3BucketService.deleteObject(user.imgKey);
      if (deleteResponse.error !== undefined) {
        return {error: deleteResponse.error}
      }
      await updateUserUseCase(user.id, {
        imgKey: null,
        imgUrl: null
      })
    }
  })

export const updateUserProfilePicAction = authenticatedAction
  .createServerAction()
  .input(
    z.object({
      file: z
        .any()
        .refine(async (file) => file instanceof File, 'Invalid file')
        .refine(async (file) => file.size < 1048576, `Max size is ${1048576 / 1024 / 1024}MB`),
    })
  )
  .handler(async ({input, ctx}) => {
    const {user} = ctx
    const s3BucketService = new S3BucketService();
    // If the user has an existing profile picture, delete it
    if (user.imgKey && user.imgUrl) {
      const deleteResponse = await s3BucketService.deleteObject(user.imgKey);
      if (deleteResponse.error !== undefined) {
        throw new Error(deleteResponse.error)
      }
    }

    // Process the new file
    const {file} = input;
    const checksum = await computeFileSHA256(file);
    const filePath = `profile/${user.id}/pic/`;

    const response = await s3BucketService.getSignedUrl({
      fileSize: file.size,
      fileType: file.type,
      checksum,
      filePath,
    });

    if ('error' in response) {
      throw new Error(response.error)
    }

    // Upload the file to S3
    await fetch(response.signedUrl, {
      method: 'PUT',
      headers: {
        "Content-Type": file.type,
      },
      body: file,
    });

    await updateUserUseCase(user.id, {
      imgUrl: response.objectURL,
      imgKey: response.key,
    });
  })
