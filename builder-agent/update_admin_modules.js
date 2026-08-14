const { Client } = require('pg');
const client = new Client({ connectionString: 'postgresql://postgres.llposvgrqjsrqktahrtw:SwZczgd%21q%233%2Fn.5@aws-1-ap-southeast-2.pooler.supabase.com:6543/postgres' });
client.connect().then(async () => { 
  await client.query('UPDATE tenants SET active_modules = $1 WHERE id = $2', [JSON.stringify(['crm', 'booking', 'cms', 'lms', 'chatbot']), '6064025b-7fe4-4840-a27f-2d5da65e15fa']); 
  console.log('Updated superadmin modules'); 
  client.end(); 
});
