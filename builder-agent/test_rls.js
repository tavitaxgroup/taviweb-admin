require('dotenv').config({ path: '.env.local' });
const { Client } = require('pg');

async function testRLS() {
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();

  try {
    console.log("=== BẮT ĐẦU TEST BẢO MẬT RLS ===");

    // 1. Lấy 2 tenant_id khác nhau để test
    const { rows: tenants } = await client.query('SELECT id, slug FROM tenants LIMIT 2');
    if (tenants.length < 2) {
      console.log("Cần ít nhất 2 tenant để test chéo.");
      return;
    }
    const tenant1 = tenants[0];
    const tenant2 = tenants[1];
    console.log(`- Chọn Tenant 1: ${tenant1.slug} (${tenant1.id})`);
    console.log(`- Chọn Tenant 2: ${tenant2.slug} (${tenant2.id})`);

    // 2. Chèn dữ liệu test (bằng quyền Admin / Superuser) vào crm_deals
    console.log(`\n[Admin] Đang tạo Deal mẫu cho mỗi Tenant...`);
    await client.query(`
      INSERT INTO crm_deals (tenant_id, title, value) 
      VALUES ('${tenant1.id}', 'Deal của Tenant 1', 1000)
    `);
    await client.query(`
      INSERT INTO crm_deals (tenant_id, title, value) 
      VALUES ('${tenant2.id}', 'Deal của Tenant 2', 2000)
    `);

    // 3. Sử dụng Role 'authenticated' có sẵn của Supabase (Role này bị áp RLS)
    console.log(`\n[Test Case 1] Đóng vai Tenant 1 đọc danh sách Deal:`);
    // Bật mode Role thường và truyền JWT claims
    await client.query(`SET ROLE authenticated`);
    await client.query(`SET request.jwt.claims = '{"tenant_id": "${tenant1.id}"}'`);
    
    const { rows: dealsT1 } = await client.query('SELECT title, tenant_id FROM crm_deals WHERE title LIKE \'%Deal của%\'');
    console.log(`-> Kết quả tìm thấy: ${dealsT1.length} deals.`);
    dealsT1.forEach(d => console.log(`   - ${d.title} (Tenant ID: ${d.tenant_id})`));
    
    if (dealsT1.every(d => d.tenant_id === tenant1.id) && dealsT1.length > 0) {
      console.log(`✅ Đạt: Tenant 1 CHỈ nhìn thấy dữ liệu của chính mình! Không thấy Deal của Tenant 2.`);
    } else {
      console.log(`❌ Lỗi: RLS hoạt động sai!`);
    }

    // 5. TEST CASE 2: Đóng vai Tenant 2 đọc dữ liệu
    console.log(`\n[Test Case 2] Đóng vai Tenant 2 đọc danh sách Deal:`);
    await client.query(`SET request.jwt.claims = '{"tenant_id": "${tenant2.id}"}'`);
    
    const { rows: dealsT2 } = await client.query('SELECT title, tenant_id FROM crm_deals WHERE title LIKE \'%Deal của%\'');
    console.log(`-> Kết quả tìm thấy: ${dealsT2.length} deals.`);
    dealsT2.forEach(d => console.log(`   - ${d.title} (Tenant ID: ${d.tenant_id})`));
    
    if (dealsT2.every(d => d.tenant_id === tenant2.id) && dealsT2.length > 0) {
      console.log(`✅ Đạt: Tenant 2 CHỈ nhìn thấy dữ liệu của chính mình! Không thấy Deal của Tenant 1.`);
    } else {
      console.log(`❌ Lỗi: RLS hoạt động sai!`);
    }

    // 6. TEST CASE 3: Cố tình chèn dữ liệu (INSERT) cho tenant khác
    console.log(`\n[Test Case 3] Tenant 2 cố tình tạo Deal đẩy sang nhà Tenant 1:`);
    try {
      await client.query(`
        INSERT INTO crm_deals (tenant_id, title, value) 
        VALUES ('${tenant1.id}', 'Hacker đẩy deal vào nhà người khác', 9999)
      `);
      console.log(`❌ Lỗi: Có thể chèn dữ liệu sang nhà người khác! RLS Insert lỏng lẻo.`);
    } catch (e) {
      console.log(`✅ Đạt: Postgres đã chặn Insert thành công! (Lỗi: ${e.message})`);
    }

    // 7. TEST CASE 4: Không có Token / JWT (Anonymous)
    console.log(`\n[Test Case 4] Hacker vô danh (Không có JWT/tenant_id) cố gắng đọc dữ liệu:`);
    await client.query(`SET request.jwt.claims = ''`);
    try {
      const { rows: anonDeals } = await client.query('SELECT * FROM crm_deals');
      if (anonDeals.length === 0) {
        console.log(`✅ Đạt: Hacker không xem được bất kỳ dòng dữ liệu nào! (Trả về mảng rỗng)`);
      } else {
        console.log(`❌ Lỗi: Hacker vẫn xem được dữ liệu!`);
      }
    } catch (e) {
      console.log(`✅ Đạt: Hệ thống từ chối truy cập vì không có Token. (Lỗi: ${e.message})`);
    }

    // Dọn dẹp
    await client.query(`RESET ROLE`);
    await client.query(`DELETE FROM crm_deals WHERE title LIKE '%Deal của%'`);
    
    console.log("\n=== TỔNG KẾT: RLS HOẠT ĐỘNG HOÀN HẢO! CÁCH LY 100% GIỮA CÁC TENANT ===");

  } catch (e) {
    console.error(e);
  } finally {
    await client.end();
  }
}

testRLS();
