const postgres = require('postgres');
require('dotenv').config({path: '.env.local'});
const db = postgres(process.env.DATABASE_URL);
db`SELECT * FROM tenants ORDER BY created_at DESC LIMIT 5`
  .then(res => { console.log(res); process.exit(0); })
  .catch(console.error);
