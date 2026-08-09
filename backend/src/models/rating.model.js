import pool from "../db/connection.db.js";

const upsertRating = async ({ user_id, store_id, rating }) => {
    let query = `
        INSERT INTO ratings (user_id, store_id, rating) 
        VALUES (?, ?, ?) 
        ON DUPLICATE KEY UPDATE rating = VALUES(rating);
    `;

    const [result] = await pool.execute(query, [user_id, store_id, rating]);
    
    return result;
};

const getAverageRatingForStore = async (storeId) => {
    let query = `
        SELECT COALESCE(AVG(rating), 0) AS averageRating 
        FROM ratings 
        WHERE store_id = ?
    `;

    const [rows] = await pool.execute(query, [storeId]);
    
    return rows[0].averageRating;
};

const getRatersForStore = async (storeId) => {
    
    let query = `
        SELECT 
            u.id AS userId,
            u.name AS userName,
            u.email AS userEmail,
            r.rating,
            r.created_at
        FROM ratings r
        JOIN users u ON r.user_id = u.id
        WHERE r.store_id = ?
        ORDER BY r.created_at DESC;
    `;
    const [rows] = await pool.execute(query, [storeId]);
    
    return rows;            
};

const countRatings = async () => {
    const [rows] = await pool.execute('SELECT COUNT(*) as total FROM ratings');
    return rows[0].total;
};

export {
    upsertRating,
    getAverageRatingForStore,
    getRatersForStore,
    countRatings
};