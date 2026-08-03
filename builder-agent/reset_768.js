require('dotenv').config({path: '.env.local'});
const { Client } = require('pg');

(async () => {
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  try {
    await client.connect();
    
    await client.query('DROP INDEX IF EXISTS knowledge_chunks_embedding_idx');
    await client.query('ALTER TABLE knowledge_chunks ALTER COLUMN embedding TYPE vector(768)');
    await client.query('CREATE INDEX knowledge_chunks_embedding_idx ON public.knowledge_chunks USING hnsw (embedding vector_cosine_ops)');
    
    const sql = `
CREATE OR REPLACE FUNCTION match_knowledge_chunks (
  query_embedding vector(768),
  match_threshold float,
  match_count int,
  p_tenant_id uuid
) RETURNS TABLE (
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
    console.log('Altered to 768 and recreated index!');
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
})();
