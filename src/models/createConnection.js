import mysql from 'mysql2/promise';

const conxPool = await mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'tfg_db',
});

export default conxPool;
