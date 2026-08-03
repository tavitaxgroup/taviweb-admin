const fs = require('fs');
fs.appendFileSync('.env.local', '\nGOOGLE_GENERATIVE_AI_API_KEY="AIzaSyCjEtuouy2no_Rnu73qUTyjxnlnweFiYl4"\n');
console.log('Appended');
