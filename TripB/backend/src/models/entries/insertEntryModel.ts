import getPool from "../../db/getPool.ts";

const insertEntryModel = async (
  title: string,
  place: string,
  description: string,
  userId: number
) => {
  const pool = await getPool();

  const now = new Date();

  const [newEntry] = await pool.query(
    `INSERT INTO entryComments (title, place, description, content, userId, parentCommentId, createdAt) VALUES (?, ?, ?, ?, ?, NULL, ?)`,
    [title, place, description, description, userId, now]
  ) as any[];

  return newEntry.insertId;
};

export default insertEntryModel;
