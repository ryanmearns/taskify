import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  type S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from "crypto";

export const get = async (s3: S3Client, bucketName: string, key: string) => {
  const command = new GetObjectCommand({
    Key: key,
    Bucket: bucketName,
  });
  return await getSignedUrl(s3, command);
};

export const del = async (s3: S3Client, bucketName: string, key: string) => {
  const command = new DeleteObjectCommand({
    Key: key,
    Bucket: bucketName,
  });

  return s3.send(command);
};

export const put = async (s3: S3Client, bucketName: string) => {
  const key = crypto.randomUUID();

  const command = new PutObjectCommand({
    Key: key,
    Bucket: bucketName,
  });

  const url = await getSignedUrl(s3, command);

  return { key, url };
};
