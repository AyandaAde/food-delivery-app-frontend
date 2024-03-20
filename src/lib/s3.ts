import AWS from "aws-sdk";

const AWS_ACCESS_KEY_ID = import.meta.env.VITE_AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = import.meta.env.VITE_AWS_SECRET_ACCESS_KEY;
const S3_BUCKET_NAME = import.meta.env.VITE_S3_BUCKET_NAME;

export async function uploadToS3(file: File) {
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

    const file_key = `uploads/${Date.now().toString()}${file.name.replace(
      " ",
      "-"
    )}`;

    const params = {
      Bucket: S3_BUCKET_NAME,
      Key: file_key,
      Body: file,
    };
    const upload = s3
      .putObject(params)
      .on(`httpUploadProgress`, (evt) => {
        console.log(
          "uploading to s3...",
          parseInt(((evt.loaded * 100) / evt.total).toString()) + "%"
        );
      })
      .promise();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    await upload.then((data) => {
      console.log("successfully uploaded to S3!", file_key, data);
    });

    return Promise.resolve({
      file_key,
      file_name: file.name,
    });
  } catch (error) {
    console.log(error);
  }
}

export function getS3Url(file_key: string) {
  const url = `https://${S3_BUCKET_NAME}.s3.us-east-2.amazonaws.com/${file_key}`;
  return url;
}
