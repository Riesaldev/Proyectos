import getPool from '../../db/getPool.ts';

const selectAllEntriesModel = async (place: string = '', author: string = '') => {
  const pool = await getPool();

  const [entries] = await pool.query(
    `SELECT
      e.id,
      e.title,
      e.place,
      e.userId,
      u.username,
      AVG (v.value) as avgVotes,
      e.createdAt
    FROM entryComments e
    INNER JOIN users u ON u.id = e.userId
    LEFT JOIN entryVotes v ON v.entryId = e.id
    WHERE e.place LIKE ? AND u.username LIKE ? AND e.parentCommentId IS NULL
    GROUP BY e.id
    ORDER BY e.createdAt DESC
    `,
    [`%${place}%`, `%${author}%`]
  )

  for (const value of entries as any[]) {
    const [photos] = await pool.query(
      `SELECT id, name FROM entryPhotos WHERE entryId = ?`,
      [value.id]
    );
    value.photos = (photos as any[])[0]?.name;
    value.avgVotes = Number(value.avgVotes);
  }
    
  return entries;
};

export default selectAllEntriesModel;
