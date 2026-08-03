const postgres = require('postgres');
require('dotenv').config({path: '.env.local'});
const db = postgres(process.env.DATABASE_URL);
db`SELECT proname FROM pg_proc WHERE proname = 'increment_ai_used'`
  .then(res => { console.log(res); process.exit(0); })
  .catch(console.error);
