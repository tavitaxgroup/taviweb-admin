import { Client } from 'pg';
import * as dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

async function setupAuth() {
  try {
    await client.connect();
    console.log('Connected to PostgreSQL database for Auth Setup');

    // Add password_hash column if not exists
    await client.query(`
      ALTER TABLE crm_users 
      ADD COLUMN IF NOT EXISTS password_hash TEXT;
    `);
    console.log('Added password_hash column to crm_users');

    // Create 2 default accounts
    const adminPassword = await bcrypt.hash('admin123', 10);
    const salePassword = await bcrypt.hash('sale123', 10);

    const users = [
      { name: 'Admin Sếp', email: 'admin@tavi.com', role: 'admin', hash: adminPassword },
      { name: 'Sale Tùng', email: 'sale@tavi.com', role: 'sale', hash: salePassword },
    ];

    for (const u of users) {
      await client.query(`
        INSERT INTO crm_users (name, email, role, password_hash)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (email) DO UPDATE 
        SET password_hash = EXCLUDED.password_hash, role = EXCLUDED.role;
      `, [u.name, u.email, u.role, u.hash]);
    }

    console.log('Seeded default accounts: admin@tavi.com and sale@tavi.com');

  } catch (error) {
    console.error('Error setting up auth:', error);
  } finally {
    await client.end();
  }
}

setupAuth();
