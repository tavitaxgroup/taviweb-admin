"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const phoneNumber = "0337367643";
const displayPhone = "0337.367.643";

export function TaviWebLayout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div id="tw" style={{ background: "#000000", color: "#FAFAFA", fontFamily: "'Plus Jakarta Sans','Inter',sans-serif", minHeight: "100vh" }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
        :where(#tw *), :where(#tw *::before), :where(#tw *::after) { box-sizing: border-box; margin: 0; padding: 0; }
        :where(#tw a) { text-decoration: none; }


        /* --- NAV --- */
        .tn { position: fixed; top: 0; left: 0; right: 0; z-index: 100; height: 66px;
          display: flex; align-items: center; justify-content: space-between; padding: 0 40px;
          transition: background .3s, backdrop-filter .3s, border-color .3s; border-bottom: 1px solid transparent; }
        .tn.scrolled { background: rgba(0,0,0,0.8); backdrop-filter: blur(24px);
          border-bottom: 1px solid rgba(255,255,255,0.08); }
        .tn-logo { font-size: 1.35rem; font-weight: 800; color: #fff; letter-spacing: -0.5px; }
        .tn-logo em { font-style: normal; font-weight: 400; color: rgba(255,255,255,0.7); }
        .tn-links { display: flex; align-items: center; gap: 36px; list-style: none; }
        .tn-links a { color: rgba(255,255,255,0.65); font-size: 0.88rem; font-weight: 500; transition: color .2s; }
        .tn-links a:hover { color: #fff; }
        .tn-cta { background: #fff !important; color: #000 !important; padding: 9px 22px !important; border-radius: 100px !important;
          font-weight: 700 !important; font-size: 0.84rem !important; transition: all .2s !important; }
        .tn-cta:hover { transform: translateY(-1px); box-shadow: 0 4px 20px rgba(255,255,255,0.2) !important; }
        .tn-burger { display: none; background: none; border: none; cursor: pointer;
          flex-direction: column; gap: 5px; padding: 6px; }
        .tn-burger span { display: block; width: 22px; height: 2px; background: #fff; border-radius: 2px; }

        /* --- HERO --- */
        .th { min-height: 100vh; display: flex; align-items: center; justify-content: center;
          text-align: center; padding: 120px 24px 80px; position: relative; overflow: hidden; }
        .th-bg { position: absolute; inset: 0; pointer-events: none; }
        .th-orb { position: absolute; border-radius: 50%; filter: blur(150px); opacity: .15; animation: orb-float 8s ease-in-out infinite; }
        .th-orb1 { width: 700px; height: 700px; background: #3B82F6; top: -150px; left: 50%; transform: translateX(-55%); }
        .th-orb2 { width: 450px; height: 450px; background: #10B981; bottom: -100px; right: 5%; animation-delay: -3s; }
        .th-orb3 { width: 350px; height: 350px; background: #8B5CF6; top: 25%; left: -100px; animation-delay: -5s; }
        @keyframes orb-float { 0%,100% { transform: translateY(0) translateX(var(--tx,0)); } 50% { transform: translateY(-30px) translateX(var(--tx,0)); } }
        .th-orb1 { --tx: -55%; }
        .th-tag { display: inline-flex; align-items: center; gap: 8px; background: rgba(255,255,255,.06);
          border: 1px solid rgba(255,255,255,.1); color: #D4D4D8; font-size: .75rem; font-weight: 600;
          padding: 6px 18px; border-radius: 100px; letter-spacing: 0.5px; margin-bottom: 32px; }
        .th h1 { font-size: clamp(3rem, 8vw, 5.5rem); font-weight: 800; line-height: 1.1; letter-spacing: -2px;
          color: #fff; margin-bottom: 28px; }
        .th h1 .g { background: linear-gradient(180deg, #FFFFFF 0%, #A1A1AA 100%); -webkit-background-clip: text;
          -webkit-text-fill-color: transparent; background-clip: text; }
        .th-lead { font-size: 1.15rem; color: #A1A1AA; max-width: 580px;
          margin: 0 auto 52px; line-height: 1.75; font-weight: 400; }
        .th-btns { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; margin-bottom: 52px; }
        .btn-p { display: inline-block; background: #fff; color: #000;
          padding: 15px 36px; border-radius: 100px; font-weight: 700; font-size: .95rem;
          box-shadow: 0 0 0 rgba(255,255,255,0); transition: all .25s; border: none; cursor: pointer; }
        .btn-p:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(255,255,255,.2); }
        .btn-g { display: inline-block; background: rgba(255,255,255,.04); color: #E4E4E7;
          padding: 15px 36px; border-radius: 100px; font-weight: 600; font-size: .95rem;
          border: 1px solid rgba(255,255,255,.12); transition: all .2s; }
        .btn-g:hover { background: rgba(255,255,255,.08); color: #fff; }
        .th-form { display: flex; gap: 12px; max-width: 460px; margin: 0 auto; flex-wrap: wrap; justify-content: center; }
        .th-form input { flex: 1; min-width: 200px; background: rgba(255,255,255,.04);
          border: 1px solid rgba(255,255,255,.1); color: #fff; padding: 14px 22px;
          border-radius: 100px; font-size: .94rem; outline: none; transition: border-color .2s; }
        .th-form input::placeholder { color: rgba(255,255,255,.3); }
        .th-form input:focus { border-color: rgba(255,255,255,.3); background: rgba(255,255,255,.08); }
        .th-ok { color: #10B981; font-size: .9rem; font-weight: 600; margin-top: 16px; }

        /* --- STATS STRIP --- */
        .ts { display: grid; grid-template-columns: repeat(4, 1fr); border-top: 1px solid rgba(255,255,255,.05);
          border-bottom: 1px solid rgba(255,255,255,.05); }
        .ts-item { padding: 44px 20px; text-align: center; border-right: 1px solid rgba(255,255,255,.05); }
        .ts-item:last-child { border-right: none; }
        .ts-val { font-size: 2.4rem; font-weight: 800; color: #fff; letter-spacing: -1px; }
        .ts-lbl { color: #A1A1AA; font-size: .84rem; margin-top: 8px; font-weight: 500; }

        /* --- SECTIONS GENERAL --- */
        .sec { padding: 112px 24px; max-width: 1200px; margin: 0 auto; }
        .sec-hd { text-align: center; margin-bottom: 72px; }
        .eye { display: inline-block; color: #fff; font-size: .75rem; font-weight: 700;
          letter-spacing: 2px; text-transform: uppercase; margin-bottom: 16px; padding: 4px 12px; background: rgba(255,255,255,.08); border-radius: 100px; }
        .sec-h2 { font-size: clamp(2rem, 4vw, 3rem); font-weight: 800; color: #fff;
          letter-spacing: -1px; margin-bottom: 16px; line-height: 1.1; }
        .sec-sub { color: #A1A1AA; max-width: 580px; margin: 0 auto; line-height: 1.8; font-size: 1rem; }

        /* --- INDUSTRIES GRID --- */
        .ind-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; }
        .ind-card { background: rgba(255,255,255,.02); border: 1px solid rgba(255,255,255,.06);
          border-radius: 20px; padding: 36px 32px; text-align: left; transition: all .25s;
          display: flex; flex-direction: column; align-items: flex-start; gap: 16px; }
        .ind-card:hover { background: rgba(255,255,255,.04); border-color: rgba(255,255,255,.15); transform: translateY(-4px); }
        .ind-icon { font-size: 2.8rem; background: rgba(255,255,255,0.05); width: 64px; height: 64px; display: flex; align-items: center; justify-content: center; border-radius: 16px; }
        .ind-nm { color: #fff; font-size: 1.25rem; font-weight: 700; }
        .ind-desc { color: #A1A1AA; font-size: .95rem; line-height: 1.6; }

        /* --- FEATURES GRID --- */
        .ft-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .ft-card { background: rgba(255,255,255,.02); border: 1px solid rgba(255,255,255,.06);
          border-radius: 20px; padding: 40px 32px; transition: all .25s; }
        .ft-card:hover { background: rgba(255,255,255,.04); border-color: rgba(255,255,255,.15); }
        .ft-ico { font-size: 2.2rem; margin-bottom: 24px; display: block; }
        .ft-ttl { font-size: 1.1rem; font-weight: 700; color: #fff; margin-bottom: 12px; }
        .ft-dsc { color: #A1A1AA; font-size: .9rem; line-height: 1.7; }

        /* --- PROCESS --- */
        .pr-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
        .pr-item { text-align: center; padding: 20px 12px; }
        .pr-num { width: 56px; height: 56px; border-radius: 50%; background: #111; border: 1px solid rgba(255,255,255,.1);
          display: flex; align-items: center; justify-content: center; font-size: 1.1rem; font-weight: 700;
          color: #fff; margin: 0 auto 24px; }
        .pr-ttl { font-size: 1.05rem; font-weight: 700; color: #fff; margin-bottom: 12px; }
        .pr-dsc { color: #A1A1AA; font-size: .88rem; line-height: 1.7; }

        /* --- PRICING --- */
        .pc-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; align-items: start; }
        .pc { background: rgba(255,255,255,.02); border: 1px solid rgba(255,255,255,.06); border-radius: 24px; padding: 44px 36px; }
        .pc.hi { background: rgba(255,255,255,.04); border-color: rgba(255,255,255,.2); position: relative; }
        .pc.hi::before { content: ""; position: absolute; inset: -1px; border-radius: 24px; padding: 1px;
          background: linear-gradient(180deg, rgba(255,255,255,0.3), rgba(255,255,255,0)); -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0); -webkit-mask-composite: xor; pointer-events: none; }
        .pc-badge { display: inline-block; background: #fff;
          color: #000; font-size: .7rem; font-weight: 700; padding: 6px 14px; border-radius: 100px; margin-bottom: 24px; letter-spacing: .5px; }
        .pc-nm { font-size: 1.25rem; font-weight: 700; color: #fff; margin-bottom: 6px; }
        .pc-sb { color: #71717A; font-size: .85rem; margin-bottom: 24px; }
        .pc-am { font-size: 2.2rem; font-weight: 800; color: #fff; margin-bottom: 32px; letter-spacing: -1px; }
        .pc-ul { list-style: none; display: flex; flex-direction: column; gap: 14px; margin-bottom: 40px; }
        .pc-ul li { color: #D4D4D8; font-size: .9rem; display: flex; align-items: flex-start; gap: 12px; }
        .pc-ul li::before { content: '✓'; color: #fff; font-weight: 800; flex-shrink: 0; }
        .pc-btn { display: block; text-align: center; padding: 14px; border-radius: 100px; font-weight: 600; font-size: .92rem; transition: all .2s; }
        .hi .pc-btn { background: #fff; color: #000; }
        .hi .pc-btn:hover { background: #E4E4E7; }
        .pc:not(.hi) .pc-btn { background: rgba(255,255,255,.04); color: #fff; border: 1px solid rgba(255,255,255,.1); }
        .pc:not(.hi) .pc-btn:hover { background: rgba(255,255,255,.1); }

        /* --- CONTACT FORM --- */
        .cf { display: flex; flex-direction: column; gap: 16px; max-width: 540px; margin: 0 auto; }
        .cf input, .cf select, .cf textarea {
          background: rgba(255,255,255,.02); border: 1px solid rgba(255,255,255,.1); color: #fff;
          padding: 16px 20px; border-radius: 14px; font-size: .95rem; outline: none;
          transition: border-color .2s; width: 100%; font-family: inherit; }
        .cf input::placeholder, .cf textarea::placeholder { color: #71717A; }
        .cf input:focus, .cf select:focus, .cf textarea:focus { border-color: rgba(255,255,255,.4); background: rgba(255,255,255,.04); }
        .cf select option { background: #000; color: #fff; }
        .cf textarea { min-height: 120px; resize: vertical; }
        .cf-ok { background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.1);
          border-radius: 20px; padding: 52px 24px; text-align: center; }

        /* --- FOOTER --- */
        .tfoot { border-top: 1px solid rgba(255,255,255,.06); padding: 64px 24px; text-align: center; }
        .tfoot-logo { font-size: 1.5rem; font-weight: 800; color: #fff; margin-bottom: 12px; }
        .tfoot-logo em { font-style: normal; font-weight: 400; color: rgba(255,255,255,0.7); }
        .tfoot-copy { color: #71717A; font-size: .85rem; }

        /* --- FLOAT BTN --- */
        .tfloat { position: fixed; bottom: 28px; right: 22px; display: flex; flex-direction: column;
          gap: 10px; z-index: 99; }
        .tfloat a { width: 52px; height: 52px; border-radius: 50%; display: flex; align-items: center;
          justify-content: center; font-size: 1.3rem; text-decoration: none;
          box-shadow: 0 4px 20px rgba(0,0,0,.45); transition: transform .2s; }
        .tfloat a:hover { transform: scale(1.1); }

        /* --- BG VARIANTS --- */
        .bg-alt { background: rgba(255,255,255,.015); border-top: 1px solid rgba(255,255,255,.03); border-bottom: 1px solid rgba(255,255,255,.03); }

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
      `}} />

      {/* ── NAVBAR ── */}
      <nav className={`tn${scrolled ? " scrolled" : ""}`}>
        <Link href="/" className="tn-logo">TAVI<em>WEB</em></Link>
        <button className="tn-burger" onClick={() => setMenuOpen(v => !v)} aria-label="Menu">
          <span /><span /><span />
        </button>
        <ul className={`tn-links${menuOpen ? " open" : ""}`}>
          <li><Link href="/kho-giao-dien" onClick={() => setMenuOpen(false)}>Kho giao diện</Link></li>
          <li><Link href="/#industries" onClick={() => setMenuOpen(false)}>Ngành nghề</Link></li>
          <li><Link href="/#features" onClick={() => setMenuOpen(false)}>Tính năng</Link></li>
          <li><Link href="/#pricing" onClick={() => setMenuOpen(false)}>Bảng giá</Link></li>
          <li><Link href="/#contact" className="tn-cta" onClick={() => setMenuOpen(false)}>Liên hệ ngay</Link></li>
        </ul>
      </nav>

      {/* ── MAIN CONTENT ── */}
      <main style={{ paddingTop: '66px' }}>
        {children}
      </main>

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
