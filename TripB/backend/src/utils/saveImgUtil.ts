import path from "path";
import fs from "fs/promises";
import sharp from "sharp";
import generateErrorUtil from "./generateErrorUtil.ts";

const saveImgUtil = async (img: any, width: number) => {

  try{
    const uploadsPath = path.join(process.cwd(), process.env.uploads_DIR as string);
    try{
      await fs.access(uploadsPath);
    } catch {
      await fs.mkdir(uploadsPath);
    }
    const imgName = `${crypto.randomUUID()}.png`;
    const imgPath = path.join(uploadsPath, imgName);
    const sharpImg = sharp(img.data);

    sharpImg.resize( width );
    await sharpImg.toFile(imgPath);
    return imgName;
  } catch (error) {
    console.error('Error saving image:', error);
    generateErrorUtil('Error saving image', 500);
  }
}
