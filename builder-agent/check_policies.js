const postgres = require('postgres');
require('dotenv').config({path: '.env.local'});
const db = postgres(process.env.DATABASE_URL);
db`SELECT polname, polcmd, polroles, polqual FROM pg_policy WHERE polrelid = 'tenants'::regclass`
  .then(res => { console.log(res); process.exit(0); })
  .catch(console.error);
