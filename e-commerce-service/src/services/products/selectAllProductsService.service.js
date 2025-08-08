import getPool from '../../database/getPool.js';

const selectAllProductsService = async () => {

    const pool = await getPool();

    const [products] = await pool.query(`
        SELECT p.id, p.name, p.description, p.price, p.stock, p.image, c.name AS Categoria
        FROM products p
        INNER JOIN category c ON c.id = p.categoryId
        WHERE p.stock > 0
    `);
    
    return products;
}

export default selectAllProductsService;