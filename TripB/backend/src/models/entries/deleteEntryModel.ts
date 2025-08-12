import getPool from '../../db/getPool.ts';
import removeImgUtil from '../../utils/removeImgUtil.ts';

const deleteEntryModel = async (entryId: number, userId: number) => {
  const pool = await getPool();

  const [photos] = await pool.query(
    `SELECT * FROM entryPhotos WHERE entryId = ?`,
    [entryId]
  );

  for (const value of photos as any[]) {
    await removeImgUtil(value.name as string);
  }

  await pool.query(`DELETE FROM entryPhotos WHERE entryId = ?`, [entryId]);
  await pool.query(`DELETE FROM entryVotes WHERE entryId = ?`, [entryId]);
  
  await pool.query(`DELETE FROM entryComments WHERE parentCommentId = ?`, [entryId]);
  
  await pool.query(`DELETE FROM entryComments WHERE id = ? AND userId = ? AND parentCommentId IS NULL`, [entryId, userId]);
};

export default deleteEntryModel;