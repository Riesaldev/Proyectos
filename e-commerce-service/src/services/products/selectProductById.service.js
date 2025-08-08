import getPool from "../../database/getPool.js";
import generateErrorUtils from '../../utils/generateErrorUtils.js';

const selectProductById = async (productId) => {

    const pool = await getPool();

    const [product] = await pool.query(`
        SELECT p.id, p.name, p.description, p.price, p.stock, p.image, c.name AS Categoria
        FROM products p
        INNER JOIN category c ON c.id = p.categoryId
        WHERE p.id = ?
    `, [productId]);

    if(product.length === 0) throw generateErrorUtils('El producto solicitado no existe', 404); 
    
    return product[0];
}

export default selectProductById;