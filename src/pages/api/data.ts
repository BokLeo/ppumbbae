import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../_lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const conn = await pool.getConnection();
    const [rows] = await conn.query('SELECT * FROM USER_INFO');
    conn.release();
    res.status(200).json(rows);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}