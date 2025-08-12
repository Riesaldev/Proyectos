import getPool from '../../db/getPool.ts';
import removeImgUtil from '../../utils/removeImgUtil.ts';
import generateErrorUtil from '../../utils/generateErrorUtil.ts';

const deletePhotoModel = async (photoId: number, userId: number) => {
  const pool = await getPool();

  const [photos] = await pool.query(
    `SELECT id, name FROM entryPhotos WHERE entryId = ? AND userId = ?`,
    [photoId, userId]
  ) as any[];
  if (photos.length === 0) {
    generateErrorUtil('Entry would have min one photo', 409);
  }

  const photo = photos.find((value: any) => value.id === Number(photoId));

  if (!photo) {
    generateErrorUtil('Photo not found', 404);
  }

  await removeImgUtil(photo.name);
  await pool.query(`DELETE FROM entryPhotos WHERE id = ?`, [photoId]);
};

export default deletePhotoModel;
