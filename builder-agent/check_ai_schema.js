require('dotenv').config({path: '.env.local'});
const { Client } = require('pg');

(async () => {
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  try {
    await client.connect();
    
    // Check pgvector extension
    const extRes = await client.query("SELECT extname FROM pg_extension WHERE extname = 'vector'");
    console.log('pgvector extension:', extRes.rowCount > 0 ? 'INSTALLED' : 'MISSING');
    
    // Check knowledge_chunks table columns
    const colRes = await client.query("SELECT column_name, data_type, udt_name FROM information_schema.columns WHERE table_name = 'knowledge_chunks'");
    console.log('knowledge_chunks columns:');
    colRes.rows.forEach(r => console.log(`  - ${r.column_name}: ${r.data_type} (${r.udt_name})`));
    
    // Check indexes on knowledge_chunks
    const idxRes = await client.query("SELECT indexname, indexdef FROM pg_indexes WHERE tablename = 'knowledge_chunks'");
    console.log('knowledge_chunks indexes:');
    idxRes.rows.forEach(r => console.log(`  - ${r.indexname}`));
    
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
})();
