import getPool from '../../db/getPool.ts';

const selectEntryByIdModel = async (entryId: number) => {
  const pool = await getPool();

  const [entries] = await pool.query(
    `SELECT
      e.id,
      e.title,
      e.place,
      e.description,
      e.content,
      e.userId,
      u.username,
      AVG (v.value) as avgVotes,
      e.createdAt
    FROM entryComments e
    INNER JOIN users u ON u.id = e.userId
    LEFT JOIN entryVotes v ON v.entryId = e.id
    WHERE e.id = ? AND e.parentCommentId IS NULL
    GROUP BY e.id
    `,
    [entryId]
  ) as any[];

  if (entries.length === 0) {
    return null;
  }

  const [photos] = await pool.query(
    `SELECT id, name FROM entryPhotos WHERE entryId = ?`,
    [entries[0].id]
  ) as any[];

  entries[0].photos = photos;
  entries[0].avgVotes = Number(entries[0].avgVotes);

  return entries[0];
};

export default selectEntryByIdModel;