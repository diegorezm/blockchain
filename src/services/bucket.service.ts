import "server-only"

import crypto from 'node:crypto'
import {S3Client, PutObjectCommand, DeleteObjectCommand} from "@aws-sdk/client-s3"
import {getSignedUrl} from "@aws-sdk/s3-request-presigner"
import env from '@/env'

type SignUrlProps = {
  fileType: string,
  fileSize: number,
  checksum: string,
  filePath?: string,
  metadata?: Record<string, string>
}

type SignUrlResponse = Promise<{objectURL: string, signedUrl: string, key: string} | {error: string}>

export interface IBucketService {
  getSignedUrl(props: SignUrlProps): SignUrlResponse
  deleteObject(key: string): Promise<{message?: string; error?: string}>;
}

export const BUCKET_ACCEPTED_FILE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "video/mp4",
  "video/quicktime"
]

export const BUCKET_ACCEPTED_FILE_SIZE = 1048576 * 10

const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex')

export class S3BucketService implements IBucketService {
  private client: S3Client

  constructor() {
    this.client = new S3Client({
      region: env.S3_BUCKET_REGION,
      credentials: {
        accessKeyId: env.AWS_ACCESS_KEY,
        secretAccessKey: env.AWS_SECRET_KEY
      }
    })
  }

  async getSignedUrl({fileType, fileSize, checksum, metadata, filePath}: SignUrlProps): SignUrlResponse {
    try {
      if (!BUCKET_ACCEPTED_FILE_TYPES.includes(fileType)) {
        return {error: "This is not a valid file type. Please upload an image or an MP4."};
      }
      if (fileSize > BUCKET_ACCEPTED_FILE_SIZE) {
        return {error: `This file is too big. The maximum file size is ${BUCKET_ACCEPTED_FILE_SIZE / 1048576}MB.`};
      }

      const key = filePath ? filePath + generateFileName() : generateFileName()
      const putObjCommand = new PutObjectCommand({
        Bucket: env.S3_BUCKET_NAME,
        Key: key,
        ContentType: fileType,
        ContentLength: fileSize,
        ChecksumSHA256: checksum,
        Metadata: metadata
      })

      const signedUrl = await getSignedUrl(this.client, putObjCommand, {
        expiresIn: 60
      })

      const url = signedUrl.split("?")[0]

      return {
        objectURL: url,
        signedUrl,
        key
      }
    } catch (e: unknown) {
      console.error("Error generating signed URL:", e);
      return {error: "Failed to generate signed URL. Please try again later."};
    }
  }

  async deleteObject(key: string) {
    try {
      await this.client.send(new DeleteObjectCommand({
        Bucket: env.S3_BUCKET_NAME,
        Key: key
      }))
      return {message: 'File deleted!'}
    } catch (e: unknown) {
      console.error(e)
      return {
        error: 'Something went wrong while deleting this file!'
      }
    }
  }
}
