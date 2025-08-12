import getPool from '../../db/getPool.ts';
import generateErrorUtil from '../../utils/generateErrorUtil.ts';

const insertPhotoModel = async (photoName: string, entryId: number, userId: number) => {
  const pool = await getPool();

  const [photos] = await pool.query(
    `SELECT id FROM entryPhotos WHERE entryId = ? AND userId = ?`,
    [entryId, userId]
  ) as any[];

  if (photos.length >= 5) {
    generateErrorUtil('You can only upload up to 5 photos per entry',409);
  }

  const now = new Date();
  const [newPhoto] = await pool.query(
    `INSERT INTO entryPhotos (name, entryId, userId, createdAt) VALUES (?, ?, ?, ?)`,
    [photoName, entryId, userId, now]
  ) as any[];

  return newPhoto.insertId;
};

export default insertPhotoModel;
