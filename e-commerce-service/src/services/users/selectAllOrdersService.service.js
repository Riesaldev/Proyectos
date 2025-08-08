import getPool from "../../database/getPool.js";
import generateErrorUtils from "../../utils/generateErrorUtils.js";

const selectAllOrdersService = async (userId) => {
    
    const pool = await getPool();

    const [orders] = await pool.query(`
        SELECT p.name, p.description, p.price, o.date
        FROM orders o 
        JOIN order_detail od ON od.orderId = o.id
        JOIN products p ON p.id = od.productId 
        WHERE o.userId = ?
        ORDER BY o.date
    `,[userId]);

    if(orders.length === 0) throw generateErrorUtils('Todavía no has realizado ninguna compra', 400);
    
    return orders;
}

export default selectAllOrdersService;