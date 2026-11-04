
import fs from "node:fs";
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";

import { PutObjectCommand } from "@aws-sdk/client-s3";

import { Upload } from "@aws-sdk/lib-storage";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import type { GetUploadUrlResponse } from "../../schemas/upload/upload.schema";
import { s3 } from "../../configs/cloudflareR2";

const BUCKET = "yume";
const FIVE_MB = 5 * 1024 * 1024;


export class UploadService {
  async uploadToR2(fileName: string, filePath: string) {
    const fileStats = await stat(filePath);

    if (fileStats.size < FIVE_MB) {
      const file = await fs.promises.readFile(filePath);

      const result = await s3.send(
        new PutObjectCommand({
          Bucket: BUCKET,
          Key: fileName,
          Body: file,
        })
      );

      return {
        key: fileName,
        size: fileStats.size,
        etag: result.ETag,
      };
    }

    const upload = new Upload({
      client: s3,
      params: {
        Bucket: BUCKET,
        Key: fileName,
        Body: createReadStream(filePath),
      },
      queueSize: 4,
      partSize: FIVE_MB,
      leavePartsOnError: false,
    });

    const result = await upload.done();

    return {
      key: fileName,
      size: fileStats.size,
      etag: result.ETag,
    };
  }

  async getUploadUrl(
    fileName: string
  ): Promise<GetUploadUrlResponse> {
    const command = new PutObjectCommand({
      Bucket: BUCKET,
      Key: fileName,
      ContentType: "application/octet-stream",
    });

    const singendUrl = await getSignedUrl(s3, command, {
      expiresIn: 3600,
    });

    return { singendUrl };
  }
}
