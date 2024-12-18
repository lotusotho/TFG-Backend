import { createPool } from 'mysql2/promise';

const conxPool = await createPool({
  host: 'localhost',
  user: 'root',
  database: 'tfg_db',
});

export default conxPool;
