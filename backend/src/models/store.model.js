import pool from "../db/connection.db.js";

const createStore=async ({name, email, address, owner_id})=>{
    const [result]=await pool.execute("INSERT INTO stores (name,email,address,owner_id) VALUES (?,?,?,?)",[name,email,address,owner_id]);

    return result.insertId;
};
    
const findById=async(id)=>{
    const [rows]=await pool.execute("SELECT id,name,email,address,owner_id FROM stores WHERE id=?",[id]);
    return rows[0];
}

const listStores=async({name,email,address, sortBy="id", order='ASC'})=>{
    const allowedSort=["id","name","email","address","created_at"];
    const sortColumn = allowedSort.includes(sortBy) ? sortBy : 'id';
    const sortOrder = order.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

    let query="SELECT id,name,email,address,created_at FROM stores WHERE 1=1";

    const params=[];

    if(name){
        query+=" AND name LIKE ?";
        params.push(`%${name}%`);
    }

    if(email){
        query+=" AND email LIKE ?";
        params.push(`%${email}%`);
    }

    if(address){
        query+=" AND address LIKE ?";
        params.push(`%${address}%`);
    }

   

    query+=`ORDER BY ${sortColumn} ${sortOrder}`;
    const [rows]=await pool.execute(query,params);

    return  rows;
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

export {
  createStore,
  findById,
  listStores,
  countStores,
  getStoreWithRatingForUser
};
