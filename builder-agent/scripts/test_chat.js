async function test() {
  const res = await fetch('http://localhost:3000/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-tenant-id': '6064025b-7fe4-4840-a27f-2d5da65e15fa'
    },
    body: JSON.stringify({
      messages: [{ role: 'user', content: 'Tôi muốn đặt lịch làm dịch vụ Khám tổng quát lúc 14h ngày mai, tôi là Tín, sđt 0901234567' }]
    })
  });
  console.log(res.status);
  const text = await res.text();
  console.log(text);
}
test();
