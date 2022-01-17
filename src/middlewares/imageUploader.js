import responseHandler from "../helpers/responseHandler";
import AWS from "aws-sdk";

export default async (req, res, next) => {
  const file = [].concat(...Object.values(req.files));

  let imageDetails = [];
  if (!file || !file[0]) {
    return next();
  }

  let s3bucket = new AWS.S3({
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
    Bucket: process.env.AWS_BUCKET_NAME,
  });

  s3bucket.createBucket(() => {
    file.map((item) => {
      var params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: item.originalname,
        Body: item.buffer,
      };
      const imageExtension = item.originalname.split(".").reverse()[0];
      const allowedImgextensions = ["jpg", "bmp", "gif", "png", "svg"];
      !allowedImgextensions.includes(imageExtension)
        ? responseHandler(res, `The image with the extension ${imageExtension} is not supported`, 400)
        : s3bucket.upload(params, async (err, data) => {
            const { fieldname: type, Location: url } = { ...data, ...item };
            if (err) {
              responseHandler(res, "Oops, something went wrong while uploading your image", 500);
            }
            imageDetails.push({ type, url });
            if (imageDetails.length === file.length) {
              req.body.imageDetails = imageDetails;
              next();
            }
          });
    });
  });
};
