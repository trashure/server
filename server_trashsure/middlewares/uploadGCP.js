"use strict";
require("dotenv").config();
const Storage = require("@google-cloud/storage"),
  CLOUD_BUCKET = process.env.CLOUD_BUCKET,
  storage = new Storage(
    {
      projectId: process.env.GCLOUD_PROJECT,
      keyFilename: process.env.KEYFILE_PATH
    }),
  bucket = storage.bucket(CLOUD_BUCKET),
  getPublicUrl = filename => {
    return `https://storage.googleapis.com/${CLOUD_BUCKET}/${filename}`;
  };


const sendUploadToGCS = (req, res, next) => {
  if (!req.file) return next();

  const gcsname = Date.now() + req.file.originalname;
  const file = bucket.file(gcsname);
  const stream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype
    }
  });

  stream.on("error", err => {
    req.file.cloudStorageError = err;
    next(err);
  });

  stream.on("finish", () => {
    req.file.cloudStorageObject = gcsname;
    file.makePublic().then(() => {
      if (!req.file) next();
      req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
      next();
    });
  });

  stream.end(req.file.buffer);
};

const Multer = require("multer"),
  multer = Multer({
    storage: Multer.MemoryStorage,
    limits: {
      fileSize: 5 * 1024 * 1024
    },
  })

module.exports = {
  getPublicUrl,
  sendUploadToGCS,
  multer
};