import getPool from '../../database/getPool.js';

const insertNewOrderService = async (userId, products) => {

    const pool = await getPool();

    const [result] = await pool.query(`
        INSERT INTO orders (date, userId)
        VALUES (?,?)
    `,[new Date(), userId]);

    const {insertId} = result;

    for await (const productId of products) {

        //console.log(typeof productId.productId);
        
        await pool.query(`
            INSERT INTO order_detail (orderId, productId)
            VALUES (?,?)
        `,[insertId, productId.productId]);

        await pool.query(`
            UPDATE products
            SET stock=stock - 1
            WHERE id=?
        `,[productId.productId]);
    }

}

export default insertNewOrderService;