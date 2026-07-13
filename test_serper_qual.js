require('dotenv').config();
const axios = require('axios');

async function test() {
  try {
    let res = await axios.post(
      'https://google.serper.dev/search',
      { q: '"Phone: +84 835 981 168" "Nha khoa Sài Gòn - CN Bình Dương"', gl: 'vn', hl: 'vi' },
      { headers: { 'X-API-KEY': process.env.SERPER_API_KEY, 'Content-Type': 'application/json' } }
    );
    console.log("Success! Results:", res.data.organic.length);
  } catch (e) {
    console.error("Error:", e.response ? e.response.data : e.message);
  }
}
test();
