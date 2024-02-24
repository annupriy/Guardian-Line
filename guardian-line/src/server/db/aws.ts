import aws from "aws-sdk";
import { Timestamp } from "mongodb";

const s3Bucket = process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME || "";

aws.config.update({
  region: process.env.NEXT_PUBLIC_AWS_REGION,
  accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET,
});

const s3 = new aws.S3();

export const uploadFile = async (file: File|null) => {

  // @ts-ignore
  // convert file name to file_timestamp(in milliseconds) format
  const fileName = file?.name + "_" + Timestamp.now().toMillis();

  const params = {
    Bucket: s3Bucket,
    Key: `guardianline/${fileName}`, // The key under which the file will be stored in S3
    Body: file!, // The file data
    ACL: "public-read", // You can set the ACL as needed
  };

  const s3UploadResponse = await s3.upload(params).promise();

  // Get the public URL of the uploaded file
  const publicUrl = s3UploadResponse.Location;
  return publicUrl;
};