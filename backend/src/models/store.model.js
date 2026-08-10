import pool from "../db/connection.db.js";

const createStore=async ({name, email, address, owner_id})=>{
    const [result]=await pool.execute("INSERT INTO stores (name,email,address,owner_id) VALUES (?,?,?,?)",[name,email,address,owner_id]);

    return result.insertId;
};
    
const findById=async(id)=>{
    const [rows]=await pool.execute("SELECT id,name,email,address,owner_id FROM stores WHERE id=?",[id]);
    return rows[0];
}

const listStores = async ({ name, email, address, userId, sortBy = "id", order = 'ASC' }) => {
    const allowedSort = ["id", "name", "email", "address", "created_at", "average_rating"];
    const sortColumn = allowedSort.includes(sortBy) ? sortBy : 'id';
    const sortOrder = order.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

    let query = `
        SELECT 
            s.id, 
            s.name, 
            s.email, 
            s.address, 
            s.created_at,
            COALESCE(AVG(r.rating), 0) AS average_ratings,
            (SELECT rating FROM ratings WHERE store_id = s.id AND user_id = ?) AS user_ratings
        FROM stores s
        LEFT JOIN ratings r ON r.store_id = s.id
        WHERE 1=1
    `;

    const params = [userId];

    if (name) {
        query += " AND s.name LIKE ?";
        params.push(`%${name}%`);
    }

    if (email) {
        query += " AND s.email LIKE ?";
        params.push(`%${email}%`);
    }

    if (address) {
        query += " AND s.address LIKE ?";
        params.push(`%${address}%`);
    }

    // Group by store columns because we are using AVG() aggregate math
    query += ` GROUP BY s.id, s.name, s.email, s.address, s.created_at`;

    query += ` ORDER BY ${sortColumn} ${sortOrder}`;
    
    const [rows] = await pool.execute(query, params);

    return rows;
};

const countStores = async () => {
  const [rows] = await pool.execute('SELECT COUNT(*) as total FROM stores');
  return rows[0].total;
};

const getStoreWithRatingForUser=async(storeId,userId)=>{

     const [rows] = await pool.execute(
    `
    SELECT s.id, s.name, s.address,
    COALESCE(AVG(r.rating),0) AS average_ratings,
    (SELECT rating FROM ratings WHERE store_id=s.id AND user_id=?) AS user_ratings
    FROM stores s LEFT JOIN ratings r ON r.store_id=s.id  WHERE s.id = ?    GROUP BY s.id
    `,
    [userId, storeId]
  );
   return rows[0];


};

const findStoreByOwnerId = async (ownerId) => {
  const [rows] = await pool.execute(
    'SELECT * FROM stores WHERE owner_id = ?',
    [ownerId]
  );
  return rows[0];
};

const findStoreByEmail = async (email) => {
  const [rows] = await pool.execute(
    'SELECT * FROM stores WHERE email = ?',
    [email]
  );
  return rows[0];
}

export {
  createStore,
  findById,
  listStores,
  countStores,
  getStoreWithRatingForUser,
  findStoreByEmail,
    findStoreByOwnerId
};
