import AWS from "aws-sdk";

const credentials = new AWS.Credentials({
  accessKeyId: process.env.ACCESS_KEY ?? "",
  secretAccessKey: process.env.SECRET_ACCESS_KEY ?? "",
});

const s3 = new AWS.S3({
  region: 'sa-east-1',
  credentials,
});

export default s3;
