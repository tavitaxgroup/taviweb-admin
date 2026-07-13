require('dotenv').config();
const axios = require('axios');

async function test() {
  try {
    let res = await axios.post(
      'https://google.serper.dev/search',
      { q: 'site:facebook.com "Nha khoa" "Đà Nẵng" "Việt Nam"', gl: 'vn', hl: 'vi', num: 20 },
      { headers: { 'X-API-KEY': process.env.SERPER_API_KEY, 'Content-Type': 'application/json' } }
    );
    console.log("num: 20 -> Success! Results:", res.data.organic.length);
  } catch (e) {
    console.error("num: 20 -> Error:", e.response ? e.response.data.message : e.message);
  }

  try {
    let res2 = await axios.post(
      'https://google.serper.dev/search',
      { q: 'site:facebook.com "Nha khoa" "Đà Nẵng" "Việt Nam"', gl: 'vn', hl: 'vi', page: 2 },
      { headers: { 'X-API-KEY': process.env.SERPER_API_KEY, 'Content-Type': 'application/json' } }
    );
    console.log("page: 2 -> Success! Results:", res2.data.organic.length);
  } catch (e) {
    console.error("page: 2 -> Error:", e.response ? e.response.data.message : e.message);
  }
}
test();
