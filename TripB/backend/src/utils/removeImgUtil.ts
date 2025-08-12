import path from "path";
import fs from "fs/promises";
import generateErrorUtil from "./generateErrorUtil.ts";

const removeImgUtil = async (imgName: string) => {
  try {
    const imgPath = path.join(
      process.cwd(),
      process.env.uploads_DIR as string,
      imgName,
    );

    try {
      await fs.access(imgPath);
    } catch {
      return;
    }

    await fs.unlink(imgPath);
  } catch (error) {
    console.error(error);
    generateErrorUtil(`Error removing image: ${imgName}`,500);
  }
};

export default removeImgUtil;