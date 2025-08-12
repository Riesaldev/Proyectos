import getPool from '../../db/getPool.ts';
import generateErrorUtil from '../../utils/generateErrorUtil.ts';

const insertVoteModel = async (entryId: number, userId: number, value: number) => {
  const pool = await getPool();
  console.log('Inserting vote for entryId:', entryId, 'by userId:', userId, 'with value:', value);

  const [entryExists] = await pool.query(
    `SELECT id FROM entryComments WHERE id = ?`,
    [entryId]
  ) as any[];

  if (entryExists.length === 0) {
    generateErrorUtil('Entry not found', 404);
  }

  const [votes] = await pool.query(
    `SELECT id, value FROM entryVotes WHERE entryId = ? AND userId = ?`,
    [entryId, userId]
  ) as any[];

  if (votes.length > 0) {
    generateErrorUtil('You have already voted on this entry', 409);
  }

  await pool.query(
    `INSERT INTO entryVotes (entryId, userId, value, createdAt) VALUES (?, ?, ?, ?)`,
    [entryId, userId, value, new Date()]
  );

};

export default insertVoteModel;
