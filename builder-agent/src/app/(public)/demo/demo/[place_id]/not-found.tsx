import Link from "next/link";

export default function DemoNotFound() {
  return (
    <main className="system-home">
      <section>
        <p className="eyebrow">Không tìm thấy demo</p>
        <h1>Lead này chưa có dữ liệu demo</h1>
        <p>
          Kiểm tra lại <code>place_id</code>, trạng thái record trong Supabase hoặc dùng route mock như{" "}
          <code>/demo/mock-nha_khoa</code> để preview hệ thống.
        </p>
        <Link href="/">Quay về trang hệ thống</Link>
      </section>
    </main>
  );
}
