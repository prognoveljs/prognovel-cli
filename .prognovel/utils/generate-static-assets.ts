import { pickImage } from "./image";
import { failBuild } from "./build/fail";
import sharp from "sharp";
import { publishFiles } from "../_files";
import { join } from "path";
// import archiver from "archiver";
import { createWriteStream } from "fs";

export async function generateSiteImages() {
  const allowedImageExt = "{png,jpeg,webp,jpg,bmp}";
  const siteImages = {
    logo: await pickImage("logo." + allowedImageExt),
    favicon: await pickImage("favicon." + allowedImageExt),
  };

  Object.keys(siteImages).forEach((image) => {
    if (!siteImages[image])
      failBuild(
        `Make sure you have the required images in your project folder.
        Required filename is ${image}.${allowedImageExt}`,
        `image for ${image} not found`,
      );
    // const buffer = readFileSync(siteImages[image]);
    sharp(siteImages[image])
      .toFormat("png")
      .toFile(`${join(publishFiles().folder, image + ".png")}`);
    // post.push(cfWorkerKV().put(`image:${image}`, buffer));
  });
}

export async function generateNovelImages(novel: string) {
  const allowedImageExt = "{png,jpeg,webp,jpg,bmp}";
  const novelImages = {
    banner: await pickImage(`novels/${novel}/banner.${allowedImageExt}`),
    cover: await pickImage(`novels/${novel}/cover.${allowedImageExt}`),
  };

  Object.keys(novelImages).forEach((image) => {
    if (!novelImages[image])
      failBuild(
        `Make sure you have the required images in your novel folder.
  Required filename is novel/${novel}/${image}.${allowedImageExt}`,
        `image for ${image} not found`,
      );

    // const buffer = readFileSync(novelImages[image]);
    sharp(novelImages[image])
      .toFormat("png")
      .toFile(`${join(publishFiles().folder, novel, image + ".png")}`);

    // post.push(cfWorkerKV().put(`image:${novel}:${image}`, buffer));
  });
}

export async function zipDirectory(source, out) {
  const archiver = (await import("archiver")).default;
  const archive = archiver("zip", { zlib: { level: 9 } });
  const stream = createWriteStream(out);

  return new Promise((resolve, reject) => {
    archive
      .directory(source, false)
      .on("error", (err) => reject(err))
      .pipe(stream);

    stream.on("close", () => resolve(""));
    archive.finalize();
  });
}
