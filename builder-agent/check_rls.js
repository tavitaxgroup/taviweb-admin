const postgres = require('postgres');
require('dotenv').config({path: '.env.local'});
const db = postgres(process.env.DATABASE_URL);
db`SELECT relname, relrowsecurity FROM pg_class WHERE relname='tenants'`
  .then(res => { console.log(res); process.exit(0); })
  .catch(console.error);
