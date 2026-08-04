"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";

const phoneNumber = "0337367643";
const displayPhone = "0337.367.643";

const stats = [
  { value: "7 ngày", label: "Bản demo đầu tiên" },
  { value: "14+", label: "Ngành nghề hỗ trợ" },
  { value: "90+", label: "Điểm hiệu năng" },
  { value: "24/7", label: "Theo dõi hệ thống" },
];

const industries = [
  { icon: "🦷", name: "Nha khoa" },
  { icon: "🌿", name: "Spa" },
  { icon: "✨", name: "Thẩm mỹ viện" },
  { icon: "🏥", name: "Phòng khám" },
  { icon: "💇", name: "Hair salon" },
  { icon: "⚖️", name: "Luật sư" },
  { icon: "📚", name: "Trung tâm tiếng Anh" },
  { icon: "🛋️", name: "Nội thất" },
  { icon: "🏗️", name: "Xây dựng" },
  { icon: "🍽️", name: "Nhà hàng" },
  { icon: "☕", name: "Quán cafe" },
  { icon: "💪", name: "Gym & Fitness" },
  { icon: "📸", name: "Studio ảnh cưới" },
  { icon: "🔧", name: "Garage ô tô" },
];

const features = [
  {
    icon: "⚡",
    title: "Tốc độ cao & Chuẩn SEO",
    desc: "Website đạt 90+ điểm Lighthouse, tối ưu Core Web Vitals, cấu trúc sẵn sàng lên top Google ngay từ ngày đầu.",
  },
  {
    icon: "🤖",
    title: "AI Chatbot tích hợp",
    desc: "Trợ lý AI trả lời khách 24/7, thu lead tự động và kết nối CRM để không bỏ sót bất kỳ cơ hội kinh doanh nào.",
  },
  {
    icon: "📊",
    title: "CRM & Quản lý khách hàng",
    desc: "Theo dõi lead, pipeline bán hàng, phân chia nhân viên và đo lường chuyển đổi trên một nền tảng thống nhất.",
  },
  {
    icon: "📅",
    title: "Hệ thống Booking online",
    desc: "Khách đặt lịch hẹn, đặt bàn, đặt lớp học trực tiếp trên website — không cần qua Zalo hay điện thoại.",
  },
  {
    icon: "🎨",
    title: "Giao diện đẹp theo ngành",
    desc: "Hơn 14 mẫu giao diện được thiết kế riêng cho từng ngành nghề, responsive chuẩn mobile và dễ chỉnh sửa.",
  },
  {
    icon: "🔒",
    title: "Bảo mật & Bảo trì",
    desc: "SSL, backup định kỳ, monitoring uptime 24/7 và cập nhật bảo mật không giới hạn trong thời gian hợp đồng.",
  },
];

const plans = [
  {
    name: "Starter",
    price: "6.000.000₫",
    sub: "Khởi đầu chuyên nghiệp",
    items: [
      "Website 5–7 trang giới thiệu",
      "Responsive mobile chuẩn",
      "Form liên hệ & nhận lead",
      "SEO cơ bản chuẩn Google",
    ],
    cta: "Nhận tư vấn",
    highlight: false,
  },
  {
    name: "Business",
    price: "12.000.000₫",
    sub: "Phổ biến nhất",
    items: [
      "CMS quản trị nội dung",
      "AI Chatbot thu lead 24/7",
      "CRM quản lý khách hàng",
      "SEO nâng cao & tốc độ cao",
      "Bảo trì 12 tháng",
    ],
    cta: "Chọn gói Business",
    highlight: true,
  },
  {
    name: "Growth",
    price: "Theo yêu cầu",
    sub: "Doanh nghiệp lớn",
    items: [
      "Website bán hàng / booking",
      "Tích hợp automation & API",
      "Đo lường chuyển đổi nâng cao",
      "Hỗ trợ ưu tiên 24/7",
    ],
    cta: "Trao đổi dự án",
    highlight: false,
  },
];

const process = [
  {
    step: "01",
    title: "Tư vấn & khảo sát",
    desc: "Hiểu đúng khách hàng mục tiêu, sản phẩm, mục tiêu kinh doanh và ngân sách thực tế.",
  },
  {
    step: "02",
    title: "Thiết kế giao diện",
    desc: "Layout mobile-first, nội dung thuyết phục, CTA được tối ưu theo đặc thù từng ngành.",
  },
  {
    step: "03",
    title: "Lập trình & tích hợp",
    desc: "Frontend hiệu năng cao, CMS, chatbot AI, form lead, SEO kỹ thuật và tracking chuyển đổi.",
  },
  {
    step: "04",
    title: "Bàn giao & tối ưu",
    desc: "Hướng dẫn quản trị, kiểm tra hiệu năng, hỗ trợ liên tục sau khi ra mắt.",
  },
];

export function CompanyHome() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [heroForm, setHeroForm] = useState<"idle" | "success">("idle");
  const [contactForm, setContactForm] = useState<"idle" | "success">("idle");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleHeroSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setHeroForm("success");
    e.currentTarget.reset();
  }

  function handleContactSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setContactForm("success");
    e.currentTarget.reset();
  }

  return (
    <div id="tw" style={{ background: "#09090F", color: "#E0E0EE", fontFamily: "'Inter','Segoe UI',sans-serif", minHeight: "100vh" }}>
      <style>{`
        #tw *, #tw *::before, #tw *::after { box-sizing: border-box; margin: 0; padding: 0; }
        #tw a { text-decoration: none; }

        /* --- NAV --- */
        .tn { position: fixed; top: 0; left: 0; right: 0; z-index: 100; height: 66px;
          display: flex; align-items: center; justify-content: space-between; padding: 0 40px;
          transition: background .3s, backdrop-filter .3s, border-color .3s; }
        .tn.scrolled { background: rgba(9,9,15,0.88); backdrop-filter: blur(24px);
          border-bottom: 1px solid rgba(255,255,255,0.06); }
        .tn-logo { font-size: 1.35rem; font-weight: 900; color: #fff; letter-spacing: -0.5px; }
        .tn-logo em { font-style: normal; color: #7C6AFF; }
        .tn-links { display: flex; align-items: center; gap: 36px; list-style: none; }
        .tn-links a { color: rgba(255,255,255,0.65); font-size: 0.88rem; font-weight: 500; transition: color .2s; }
        .tn-links a:hover { color: #fff; }
        .tn-cta { background: linear-gradient(135deg, #7C6AFF 0%, #6C63FF 100%) !important;
          color: #fff !important; padding: 9px 22px !important; border-radius: 100px !important;
          font-weight: 700 !important; font-size: 0.84rem !important;
          box-shadow: 0 0 20px rgba(108,99,255,0.35); transition: all .2s !important; }
        .tn-cta:hover { transform: translateY(-1px); box-shadow: 0 6px 30px rgba(108,99,255,0.5) !important; }
        .tn-burger { display: none; background: none; border: none; cursor: pointer;
          flex-direction: column; gap: 5px; padding: 6px; }
        .tn-burger span { display: block; width: 22px; height: 2px; background: #fff; border-radius: 2px; }

        /* --- HERO --- */
        .th { min-height: 100vh; display: flex; align-items: center; justify-content: center;
          text-align: center; padding: 100px 24px 80px; position: relative; overflow: hidden; }
        .th-bg { position: absolute; inset: 0; pointer-events: none; }
        .th-orb { position: absolute; border-radius: 50%; filter: blur(130px); opacity: .28; animation: orb-float 8s ease-in-out infinite; }
        .th-orb1 { width: 700px; height: 700px; background: #6C63FF; top: -150px; left: 50%; transform: translateX(-55%); }
        .th-orb2 { width: 450px; height: 450px; background: #00C9A7; bottom: -100px; right: 5%; animation-delay: -3s; }
        .th-orb3 { width: 350px; height: 350px; background: #8B5CF6; top: 25%; left: -100px; animation-delay: -5s; }
        @keyframes orb-float { 0%,100% { transform: translateY(0) translateX(var(--tx,0)); } 50% { transform: translateY(-30px) translateX(var(--tx,0)); } }
        .th-orb1 { --tx: -55%; }
        .th-tag { display: inline-flex; align-items: center; gap: 8px; background: rgba(108,99,255,.12);
          border: 1px solid rgba(108,99,255,.3); color: #a78bfa; font-size: .75rem; font-weight: 700;
          padding: 6px 18px; border-radius: 100px; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 32px; }
        .th h1 { font-size: clamp(3rem, 8vw, 6rem); font-weight: 900; line-height: 1.05; letter-spacing: -3px;
          color: #fff; margin-bottom: 28px; }
        .th h1 .g { background: linear-gradient(135deg, #7C6AFF, #00C9A7); -webkit-background-clip: text;
          -webkit-text-fill-color: transparent; background-clip: text; }
        .th-lead { font-size: 1.15rem; color: rgba(255,255,255,.55); max-width: 580px;
          margin: 0 auto 52px; line-height: 1.75; }
        .th-btns { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; margin-bottom: 52px; }
        .btn-p { display: inline-block; background: linear-gradient(135deg, #7C6AFF, #8B5CF6); color: #fff;
          padding: 15px 36px; border-radius: 100px; font-weight: 700; font-size: .95rem;
          box-shadow: 0 0 28px rgba(108,99,255,.4); transition: all .25s; border: none; cursor: pointer; }
        .btn-p:hover { transform: translateY(-2px); box-shadow: 0 10px 40px rgba(108,99,255,.55); }
        .btn-g { display: inline-block; background: rgba(255,255,255,.06); color: rgba(255,255,255,.85);
          padding: 15px 36px; border-radius: 100px; font-weight: 600; font-size: .95rem;
          border: 1px solid rgba(255,255,255,.12); transition: all .2s; }
        .btn-g:hover { background: rgba(255,255,255,.1); }
        .th-form { display: flex; gap: 12px; max-width: 460px; margin: 0 auto; flex-wrap: wrap; justify-content: center; }
        .th-form input { flex: 1; min-width: 200px; background: rgba(255,255,255,.08);
          border: 1px solid rgba(255,255,255,.12); color: #fff; padding: 14px 22px;
          border-radius: 100px; font-size: .94rem; outline: none; transition: border-color .2s; }
        .th-form input::placeholder { color: rgba(255,255,255,.3); }
        .th-form input:focus { border-color: #7C6AFF; }
        .th-ok { color: #00C9A7; font-size: .9rem; font-weight: 600; margin-top: 16px; }

        /* --- STATS STRIP --- */
        .ts { display: grid; grid-template-columns: repeat(4, 1fr); border-top: 1px solid rgba(255,255,255,.05);
          border-bottom: 1px solid rgba(255,255,255,.05); }
        .ts-item { padding: 44px 20px; text-align: center; border-right: 1px solid rgba(255,255,255,.05); }
        .ts-item:last-child { border-right: none; }
        .ts-val { font-size: 2.4rem; font-weight: 900; background: linear-gradient(135deg, #7C6AFF, #00C9A7);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; letter-spacing: -1px; }
        .ts-lbl { color: rgba(255,255,255,.45); font-size: .84rem; margin-top: 8px; }

        /* --- SECTIONS GENERAL --- */
        .sec { padding: 96px 24px; max-width: 1200px; margin: 0 auto; }
        .sec-hd { text-align: center; margin-bottom: 64px; }
        .eye { display: inline-block; color: #7C6AFF; font-size: .75rem; font-weight: 800;
          letter-spacing: 2.5px; text-transform: uppercase; margin-bottom: 16px; }
        .sec-h2 { font-size: clamp(2rem, 4.5vw, 3.2rem); font-weight: 900; color: #fff;
          letter-spacing: -1.5px; margin-bottom: 16px; line-height: 1.1; }
        .sec-sub { color: rgba(255,255,255,.48); max-width: 580px; margin: 0 auto; line-height: 1.8; font-size: .95rem; }

        /* --- INDUSTRIES GRID --- */
        .ind-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 14px; }
        .ind-card { background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.07);
          border-radius: 18px; padding: 22px 12px; text-align: center; transition: all .25s;
          display: flex; flex-direction: column; align-items: center; gap: 10px; }
        .ind-card:hover { background: rgba(108,99,255,.1); border-color: rgba(108,99,255,.4); transform: translateY(-4px); }
        .ind-icon { font-size: 1.8rem; }
        .ind-nm { color: rgba(255,255,255,.75); font-size: .78rem; font-weight: 600; }

        /* --- FEATURES GRID --- */
        .ft-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; }
        .ft-card { background: rgba(255,255,255,.035); border: 1px solid rgba(255,255,255,.07);
          border-radius: 24px; padding: 36px 30px; transition: all .25s; }
        .ft-card:hover { background: rgba(108,99,255,.08); border-color: rgba(108,99,255,.25); transform: translateY(-4px); }
        .ft-ico { font-size: 2.2rem; margin-bottom: 20px; display: block; }
        .ft-ttl { font-size: 1.05rem; font-weight: 800; color: #fff; margin-bottom: 12px; }
        .ft-dsc { color: rgba(255,255,255,.48); font-size: .88rem; line-height: 1.75; }

        /* --- PROCESS --- */
        .pr-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
        .pr-item { text-align: center; padding: 20px 12px; }
        .pr-num { width: 68px; height: 68px; border-radius: 50%; background: linear-gradient(135deg, #7C6AFF, #8B5CF6);
          display: flex; align-items: center; justify-content: center; font-size: 1.3rem; font-weight: 900;
          color: #fff; margin: 0 auto 20px; box-shadow: 0 0 30px rgba(108,99,255,.35); }
        .pr-ttl { font-size: 1rem; font-weight: 800; color: #fff; margin-bottom: 10px; }
        .pr-dsc { color: rgba(255,255,255,.45); font-size: .84rem; line-height: 1.7; }

        /* --- PRICING --- */
        .pc-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; align-items: start; }
        .pc { background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.07); border-radius: 28px; padding: 40px 32px; }
        .pc.hi { background: linear-gradient(145deg, rgba(108,99,255,.15), rgba(139,92,246,.06));
          border-color: rgba(108,99,255,.55); box-shadow: 0 0 60px rgba(108,99,255,.12); transform: scale(1.04); }
        .pc-badge { display: inline-block; background: linear-gradient(135deg, #7C6AFF, #8B5CF6);
          color: #fff; font-size: .73rem; font-weight: 800; padding: 4px 14px; border-radius: 100px; margin-bottom: 18px; letter-spacing: .5px; }
        .pc-nm { font-size: 1.2rem; font-weight: 900; color: #fff; margin-bottom: 6px; }
        .pc-sb { color: rgba(255,255,255,.38); font-size: .8rem; margin-bottom: 22px; }
        .pc-am { font-size: 2.1rem; font-weight: 900; color: #fff; margin-bottom: 28px; letter-spacing: -1px; }
        .pc-ul { list-style: none; display: flex; flex-direction: column; gap: 12px; margin-bottom: 36px; }
        .pc-ul li { color: rgba(255,255,255,.68); font-size: .88rem; display: flex; align-items: flex-start; gap: 10px; }
        .pc-ul li::before { content: '✓'; color: #00C9A7; font-weight: 800; flex-shrink: 0; }
        .pc-btn { display: block; text-align: center; padding: 14px; border-radius: 100px; font-weight: 700; font-size: .92rem; transition: all .2s; }
        .hi .pc-btn { background: linear-gradient(135deg, #7C6AFF, #8B5CF6); color: #fff; box-shadow: 0 4px 22px rgba(108,99,255,.4); }
        .hi .pc-btn:hover { box-shadow: 0 8px 36px rgba(108,99,255,.55); transform: translateY(-1px); }
        .pc:not(.hi) .pc-btn { background: rgba(255,255,255,.07); color: rgba(255,255,255,.8); border: 1px solid rgba(255,255,255,.1); }
        .pc:not(.hi) .pc-btn:hover { background: rgba(255,255,255,.12); }

        /* --- CONTACT FORM --- */
        .cf { display: flex; flex-direction: column; gap: 14px; max-width: 540px; margin: 0 auto; }
        .cf input, .cf select, .cf textarea {
          background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.1); color: #fff;
          padding: 14px 20px; border-radius: 14px; font-size: .94rem; outline: none;
          transition: border-color .2s; width: 100%; font-family: inherit; }
        .cf input::placeholder, .cf textarea::placeholder { color: rgba(255,255,255,.28); }
        .cf input:focus, .cf select:focus, .cf textarea:focus { border-color: #7C6AFF; }
        .cf select option { background: #1a1a2e; color: #fff; }
        .cf textarea { min-height: 110px; resize: vertical; }
        .cf-ok { background: rgba(0,201,167,.08); border: 1px solid rgba(0,201,167,.2);
          border-radius: 20px; padding: 52px 24px; text-align: center; }

        /* --- FOOTER --- */
        .tfoot { border-top: 1px solid rgba(255,255,255,.05); padding: 48px 24px; text-align: center; }
        .tfoot-logo { font-size: 1.5rem; font-weight: 900; color: #fff; margin-bottom: 12px; }
        .tfoot-logo em { font-style: normal; color: #7C6AFF; }
        .tfoot-copy { color: rgba(255,255,255,.3); font-size: .84rem; }

        /* --- FLOAT BTN --- */
        .tfloat { position: fixed; bottom: 28px; right: 22px; display: flex; flex-direction: column;
          gap: 10px; z-index: 99; }
        .tfloat a { width: 50px; height: 50px; border-radius: 50%; display: flex; align-items: center;
          justify-content: center; font-size: 1.3rem; text-decoration: none;
          box-shadow: 0 4px 20px rgba(0,0,0,.45); transition: transform .2s; }
        .tfloat a:hover { transform: scale(1.1); }

        /* --- BG VARIANTS --- */
        .bg-alt { background: rgba(108,99,255,.03); border-top: 1px solid rgba(255,255,255,.04); border-bottom: 1px solid rgba(255,255,255,.04); }

        /* --- RESPONSIVE --- */
        @media (max-width: 1000px) {
          .ind-grid { grid-template-columns: repeat(4, 1fr); }
          .ft-grid, .pr-grid, .pc-grid { grid-template-columns: 1fr; }
          .pc.hi { transform: none; }
          .ts { grid-template-columns: repeat(2, 1fr); }
          .tn-links { display: none; }
          .tn-links.open { display: flex; flex-direction: column; position: fixed;
            inset: 66px 0 0; background: rgba(9,9,15,.97); backdrop-filter: blur(20px);
            padding: 32px 28px; gap: 28px; align-items: flex-start; }
          .tn-burger { display: flex; }
          .tn { padding: 0 20px; }
        }
        @media (max-width: 520px) {
          .ind-grid { grid-template-columns: repeat(3, 1fr); }
          .th-btns { flex-direction: column; align-items: center; }
          .ts { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>

      {/* ── NAVBAR ── */}
      <nav className={`tn${scrolled ? " scrolled" : ""}`}>
        <span className="tn-logo">TAVI<em>WEB</em></span>
        <button className="tn-burger" onClick={() => setMenuOpen(v => !v)} aria-label="Menu">
          <span /><span /><span />
        </button>
        <ul className={`tn-links${menuOpen ? " open" : ""}`}>
          <li><a href="#industries" onClick={() => setMenuOpen(false)}>Ngành nghề</a></li>
          <li><a href="#features" onClick={() => setMenuOpen(false)}>Tính năng</a></li>
          <li><a href="#process" onClick={() => setMenuOpen(false)}>Quy trình</a></li>
          <li><a href="#pricing" onClick={() => setMenuOpen(false)}>Bảng giá</a></li>
          <li><a href="#contact" className="tn-cta" onClick={() => setMenuOpen(false)}>Liên hệ ngay</a></li>
        </ul>
      </nav>

      {/* ── HERO ── */}
      <section className="th">
        <div className="th-bg">
          <div className="th-orb th-orb1" />
          <div className="th-orb th-orb2" />
          <div className="th-orb th-orb3" />
        </div>
        <div style={{ position: "relative", zIndex: 1 }}>
          <div className="th-tag">✦ Nền tảng website thông minh cho doanh nghiệp Việt</div>
          <h1>
            Website <span className="g">chuyển đổi</span>
            <br />không chỉ đẹp
          </h1>
          <p className="th-lead">
            TAVIWEB thiết kế website tốc độ cao, tích hợp AI Chatbot, CRM và Booking — giúp doanh nghiệp tự động hóa việc thu hút và chăm sóc khách hàng 24/7.
          </p>
          <div className="th-btns">
            <a href="#contact" className="btn-p">🚀 Nhận tư vấn miễn phí</a>
            <a href="#features" className="btn-g">Tìm hiểu tính năng →</a>
          </div>
          {heroForm === "idle" ? (
            <form className="th-form" onSubmit={handleHeroSubmit}>
              <input type="tel" placeholder="Số điện thoại của bạn..." required />
              <button type="submit" className="btn-p" style={{ padding: "14px 28px", fontSize: ".88rem" }}>
                Đăng ký ngay
              </button>
            </form>
          ) : (
            <p className="th-ok">✅ TAVIWEB đã nhận thông tin! Sẽ liên hệ bạn trong hôm nay.</p>
          )}
        </div>
      </section>

      {/* ── STATS ── */}
      <div className="ts">
        {stats.map(s => (
          <div className="ts-item" key={s.label}>
            <div className="ts-val">{s.value}</div>
            <div className="ts-lbl">{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── INDUSTRIES ── */}
      <div style={{ background: "linear-gradient(180deg, #09090F 0%, rgba(108,99,255,0.04) 100%)" }}>
        <div className="sec" id="industries">
          <div className="sec-hd">
            <div className="eye">14+ ngành nghề</div>
            <h2 className="sec-h2">Giao diện được thiết kế riêng cho từng ngành</h2>
            <p className="sec-sub">Mỗi mẫu tối ưu theo tâm lý khách hàng và mục tiêu chuyển đổi của từng lĩnh vực kinh doanh.</p>
          </div>
          <div className="ind-grid">
            {industries.map(ind => (
              <div className="ind-card" key={ind.name}>
                <span className="ind-icon">{ind.icon}</span>
                <span className="ind-nm">{ind.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FEATURES ── */}
      <div className="bg-alt">
        <div className="sec" id="features">
          <div className="sec-hd">
            <div className="eye">Tính năng</div>
            <h2 className="sec-h2">Nhiều hơn một website thông thường</h2>
            <p className="sec-sub">TAVIWEB tích hợp sẵn các công cụ kinh doanh hiện đại để đội sales làm việc hiệu quả ngay từ ngày đầu.</p>
          </div>
          <div className="ft-grid">
            {features.map(f => (
              <div className="ft-card" key={f.title}>
                <span className="ft-ico">{f.icon}</span>
                <h3 className="ft-ttl">{f.title}</h3>
                <p className="ft-dsc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── PROCESS ── */}
      <div className="sec" id="process">
        <div className="sec-hd">
          <div className="eye">Quy trình</div>
          <h2 className="sec-h2">Triển khai rõ ràng, không phát sinh</h2>
          <p className="sec-sub">Mỗi giai đoạn có tiêu chí nghiệm thu rõ ràng và người phụ trách đồng hành xuyên suốt dự án.</p>
        </div>
        <div className="pr-grid">
          {process.map(p => (
            <div className="pr-item" key={p.step}>
              <div className="pr-num">{p.step}</div>
              <h3 className="pr-ttl">{p.title}</h3>
              <p className="pr-dsc">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── PRICING ── */}
      <div className="bg-alt">
        <div className="sec" id="pricing">
          <div className="sec-hd">
            <div className="eye">Bảng giá</div>
            <h2 className="sec-h2">Gói thiết kế linh hoạt</h2>
            <p className="sec-sub">Chi phí được chốt sau khi TAVIWEB nắm rõ phạm vi, nội dung và tính năng cụ thể của từng dự án.</p>
          </div>
          <div className="pc-grid">
            {plans.map(p => (
              <div className={`pc${p.highlight ? " hi" : ""}`} key={p.name}>
                {p.highlight && <div className="pc-badge">⭐ PHỔ BIẾN NHẤT</div>}
                <div className="pc-nm">{p.name}</div>
                <div className="pc-sb">{p.sub}</div>
                <div className="pc-am">{p.price}</div>
                <ul className="pc-ul">{p.items.map(i => <li key={i}>{i}</li>)}</ul>
                <a href="#contact" className="pc-btn">{p.cta}</a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CONTACT ── */}
      <div style={{ background: "linear-gradient(180deg, rgba(108,99,255,0.05) 0%, #09090F 100%)", borderTop: "1px solid rgba(255,255,255,.04)" }}>
        <div className="sec" id="contact">
          <div className="sec-hd">
            <div className="eye">Liên hệ</div>
            <h2 className="sec-h2">Bắt đầu ngay hôm nay</h2>
            <p className="sec-sub">Gửi nhu cầu, TAVIWEB phản hồi với hướng triển khai, thời gian và chi phí cụ thể trong ngày làm việc.</p>
          </div>
          {contactForm === "idle" ? (
            <form className="cf" onSubmit={handleContactSubmit}>
              <input type="text" name="name" placeholder="Họ và tên *" required />
              <input type="tel" name="phone" placeholder="Số điện thoại *" required />
              <input type="email" name="email" placeholder="Email (không bắt buộc)" />
              <select name="service">
                <option value="">-- Nhu cầu thiết kế --</option>
                <option>Website doanh nghiệp</option>
                <option>Website bán hàng</option>
                <option>Landing page quảng cáo</option>
                <option>Bảo trì / Nâng cấp</option>
                <option>Website + AI Chatbot + CRM</option>
              </select>
              <textarea name="note" placeholder="Mô tả ngắn về dự án (nếu có)..." />
              <button type="submit" className="btn-p" style={{ border: "none", cursor: "pointer" }}>
                🚀 Gửi yêu cầu tư vấn
              </button>
            </form>
          ) : (
            <div className="cf-ok" style={{ maxWidth: 540, margin: "0 auto" }}>
              <div style={{ fontSize: "3rem", marginBottom: 16 }}>✅</div>
              <h3 style={{ color: "#fff", fontSize: "1.3rem", marginBottom: 12 }}>TAVIWEB đã nhận yêu cầu!</h3>
              <p style={{ color: "rgba(255,255,255,.55)" }}>Đội ngũ sẽ liên hệ với bạn trong vòng 2 giờ làm việc.</p>
            </div>
          )}
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer className="tfoot">
        <div className="tfoot-logo">TAVI<em>WEB</em></div>
        <p className="tfoot-copy">© 2024 TAVIWEB — Thiết kế website chuyên nghiệp cho doanh nghiệp Việt Nam &nbsp;·&nbsp; {displayPhone}</p>
      </footer>

      {/* ── FLOATING BUTTONS ── */}
      <div className="tfloat">
        <a href="https://zalo.me/0337367643" style={{ background: "#0068FF" }} title="Chat Zalo" target="_blank" rel="noreferrer">💬</a>
        <a href={`tel:${phoneNumber}`} style={{ background: "#00C9A7" }} title={displayPhone}>📞</a>
      </div>
    </div>
  );
}
