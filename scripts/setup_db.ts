import { Client } from 'pg';
import * as dotenv from 'dotenv';
dotenv.config();

const connectionString = process.env.DATABASE_URL;

const createTableQuery = `
CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  place_id TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  industry TEXT,
  formatted_address TEXT,
  formatted_phone_number TEXT,
  website TEXT,
  status TEXT DEFAULT 'new',
  facebook_url TEXT,
  facebook_followers TEXT,
  facebook_email TEXT,
  image_url TEXT,
  rating NUMERIC,
  user_ratings_total INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
`;

async function setupDatabase() {
  if (!connectionString) {
    console.error('Missing DATABASE_URL in .env');
    process.exit(1);
  }

  const client = new Client({
    connectionString,
  });

  try {
    await client.connect();
    console.log('Connected to PostgreSQL');
    
    await client.query(createTableQuery);
    console.log('Successfully created leads table (or it already exists).');
  } catch (error) {
    console.error('Error creating table:', error);
  } finally {
    await client.end();
  }
}

setupDatabase();
