async function test() {
  const url = "http://localhost:3000/api/webhook/leads?tenant=6b381b43-4359-49d3-9c0e-8bf77c8a43b5";
  const body = {
    name: "Chị Khách Hàng Thử Nghiệm",
    phone: "0988111222",
    email: "khachhang@gmail.com",
    source: "Facebook Ads",
    Dich_vu_quan_tam: "Nhổ răng khôn",
    Ghi_chu: "Khách hẹn cuối tuần tới"
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    
    const text = await res.text();
    console.log("Status:", res.status);
    console.log("Response:", text);
  } catch(e) {
    console.log("Error:", e);
  }
}

test();
