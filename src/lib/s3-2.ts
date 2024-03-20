import AWS from "aws-sdk";
import fs from "fs";

const AWS_ACCESS_KEY_ID = import.meta.env.VITE_AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = import.meta.env.VITE_AWS_SECRET_ACCESS_KEY;
const S3_BUCKET_NAME = import.meta.env.VITE_S3_BUCKET_NAME;

export async function downloadFromS3(file_key: string) {
  try {
    AWS.config.update({
      accessKeyId: AWS_ACCESS_KEY_ID,
      secretAccessKey: AWS_SECRET_ACCESS_KEY,
    });

    const s3 = new AWS.S3({
      params: {
        Bucket: S3_BUCKET_NAME,
      },
      region: "us-east-2",
    });

    const params = {
      Bucket: S3_BUCKET_NAME,
      Key: file_key,
    };

    const obj = await s3.getObject(params).promise();
    //   const file_name = `/tmp/pdf-${Date.now()}.pdf`;
    const file_name = `/tmp/pdf-${Date.now()}.pdf`;
    fs.writeFileSync(file_name, obj.Body as Buffer);
    return file_name;
  } catch (error) {
    console.log(error);
    return null;
  }
}
