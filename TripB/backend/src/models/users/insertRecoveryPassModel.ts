import getPool from "../../db/getPool.ts";

const insertRecoveryPassModel = async (recoveryPass: string, email: string) => {
  const pool = await getPool();
  const now = new Date();

  await pool.query(
    `UPDATE users SET recoveryPass = ?, SET modifiedAt = ? WHERE email = ?`,
    [recoveryPass, now, email]
  );
};

export default insertRecoveryPassModel;