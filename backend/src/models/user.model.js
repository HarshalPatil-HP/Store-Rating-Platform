import pool from "../db/connection.db.js";

const createUser=async ({name, email, password, address, role})=>{
    const [result]=await pool.execute("INSERT INTO users (name,email,password,address,role) VALUES (?,?,?,?,?)",[name,email,password,address,role]);

    return result.insertId;
};

const findByEmail=async(email)=>{
    const [rows]=await pool.execute("SELECT * FROM users WHERE email=?",[email]);
    return rows[0];
}

const findById=async(id)=>{
    const [rows]=await pool.execute("SELECT id,name,email,address,role FROM users WHERE id=?",[id]);
    return rows[0];
}

const countUsers = async () => {
  const [rows] = await pool.execute('SELECT COUNT(*) as total FROM users');
  return rows[0].total;
};

const listUsers=async({name,email,address,role, sortBy="id", order='ASC'})=>{
    const allowedSort=["id","name","email","address","role","created_at"];
    const sortColumn = allowedSort.includes(sortBy) ? sortBy : 'id';
    const sortOrder = order.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

    let query="SELECT id,name,email,address,role,created_at FROM users WHERE 1=1";

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

    if(role){
        query+=" AND role = ?";
        params.push(role);
    }

    query+=`ORDER BY ${sortColumn} ${sortOrder}`;
    const [rows]=await pool.execute(query,params);

    return  rows;
};

const updatePassword=async({id,newPass})=>{

    const [result]=await pool.execute("UPDATE users SET password=? WHERE id=?",[newPass,id]);
    return result;
}

export {
  createUser,
  findByEmail,
  findById,
  listUsers,
  countUsers,
  updatePassword
};