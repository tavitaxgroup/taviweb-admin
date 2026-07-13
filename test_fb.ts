import axios from 'axios';

async function run() {
  try {
    const res = await axios.get('https://mbasic.facebook.com/HoiYeuYogaQuanTanPhu/', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36'
      }
    });
    const html = res.data;
    const phoneRegex = /(?:0|\+84)(?:[3|5|7|8|9])[0-9]{8}\b/g;
    const matches = html.replace(/[\.\s\,\-]/g, '').match(phoneRegex);
    console.log("Found phones:", matches ? [...new Set(matches)] : "None");
  } catch (e) {
    console.error("Error fetching FB", e.message);
  }
}
run();
