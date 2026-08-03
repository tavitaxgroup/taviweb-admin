const fs = require('fs');
const { Client } = require('pg');

const env = fs.readFileSync('.env.local', 'utf8');
const dbUrlLine = env.split('\n').find(line => line.startsWith('DATABASE_URL'));
const dbUrl = dbUrlLine.substring(dbUrlLine.indexOf('=') + 1).replace(/"/g, '').trim();

async function run() {
  const client = new Client({ connectionString: dbUrl });
  await client.connect();
  const sql = `
CREATE OR REPLACE FUNCTION match_knowledge_chunks (
  query_embedding vector(1536),
  match_threshold float,
  match_count int,
  p_tenant_id uuid
)
RETURNS TABLE (
  id uuid,
  content text,
  similarity float
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    knowledge_chunks.id,
    knowledge_chunks.content,
    1 - (knowledge_chunks.embedding <=> query_embedding) AS similarity
  FROM knowledge_chunks
  WHERE tenant_id = p_tenant_id
    AND 1 - (knowledge_chunks.embedding <=> query_embedding) > match_threshold
  ORDER BY knowledge_chunks.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;
  `;
  await client.query(sql);
  await client.end();
  console.log('RPC deployed successfully!');
}
run().catch(console.error);
