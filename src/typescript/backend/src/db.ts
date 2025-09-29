import { Pool } from 'pg';
import { User } from './types';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://user:password@db:5432/userdb',
});

export async function searchUsersByName(name: string): Promise<User[]> {
  if (!name.trim()) {
    throw new Error('検索名が空です');
  }

  const query = `
    SELECT id, name, age, del_flg 
    FROM users 
    WHERE name ILIKE $1 AND del_flg = false
    ORDER BY name, id
  `;
  
  const result = await pool.query(query, [`%${name.trim()}%`]);
  return result.rows;
}
