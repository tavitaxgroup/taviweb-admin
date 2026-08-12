"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { industryCatalog } from "@/lib/templates/templateCatalog";
import { Check, CheckCircle2, Heart, Sparkles, Scissors, Activity, Scale, Home, Construction, Utensils, Brush, GraduationCap, Phone } from "lucide-react";

const phoneNumber = "0337367643";
const displayPhone = "0337.367.643";

const services = [
  {
    id: "01",
    title: "Website doanh nghiệp",
    tagline: "Hỗ trợ giới thiệu thương hiệu và dự án",
    badge: "Website giới thiệu",
    text: "Hỗ trợ doanh nghiệp trình bày hồ sơ năng lực, danh sách dự án tiêu biểu và tích hợp biểu mẫu tiếp nhận thông tin yêu cầu tự động từ đối tác.",
    metric: "Chuẩn SEO & Tải nhanh",
    deliverables: [
      "Thiết kế giao diện phù hợp với nhận diện thương hiệu",
      "Cấu trúc sơ đồ trang rõ ràng, tối ưu SEO",
      "Tích hợp biểu mẫu thu thập thông tin khách hàng",
      "Tối ưu mã nguồn giúp trang hoạt động ổn định"
    ]
  },
  {
    id: "02",
    title: "Website giới thiệu sản phẩm",
    tagline: "Trình bày danh mục sản phẩm trực quan",
    badge: "Danh mục sản phẩm",
    text: "Hỗ trợ trình bày chi tiết sản phẩm, tích hợp bộ lọc tìm kiếm sản phẩm và các nút liên hệ trực tiếp qua Zalo/Hotline hỗ trợ khách hàng nhanh.",
    metric: "Giao diện thân thiện di động",
    deliverables: [
      "Danh mục phân loại sản phẩm rõ ràng, dễ tra cứu",
      "Trang chi tiết sản phẩm hiển thị đầy đủ thông số",
      "Tích hợp các nút liên hệ nhanh (Zalo, Hotline)",
      "Hệ quản trị sản phẩm đơn giản, dễ dàng cập nhật"
    ]
  },
  {
    id: "03",
    title: "Landing page quảng cáo",
    tagline: "Tập trung giới thiệu một sản phẩm, dịch vụ",
    badge: "Landing Page",
    text: "Trang đơn tối ưu hiển thị thông tin về một sản phẩm hoặc chương trình cụ thể, tích hợp form đăng ký nhận ưu đãi và cài đặt sẵn mã đo lường quảng cáo.",
    metric: "Thời gian hoàn thành ngắn",
    deliverables: [
      "Bố cục tinh gọn, tập trung giới thiệu thông tin dịch vụ",
      "Nút kêu gọi hành động (CTA) rõ ràng, trực quan",
      "Tích hợp sẵn các công cụ đo lường chiến dịch",
      "Tương thích hiển thị tốt trên các thiết bị di động"
    ]
  },
  {
    id: "04",
    title: "Bảo trì và nâng cấp",
    tagline: "Chăm sóc và vận hành website ổn định",
    badge: "Bảo trì định kỳ",
    text: "Hỗ trợ doanh nghiệp cập nhật nội dung, kiểm tra tình trạng vận hành, sao lưu dữ liệu hệ thống định kỳ và hỗ trợ xử lý lỗi phát sinh.",
    metric: "Hỗ trợ kỹ thuật định kỳ",
    deliverables: [
      "Hỗ trợ sao lưu dữ liệu trang web định kỳ",
      "Kiểm tra tình trạng chứng chỉ bảo mật SSL",
      "Cập nhật nội dung, hình ảnh mới theo yêu cầu",
      "Hỗ trợ xử lý nhanh các lỗi hiển thị phát sinh"
    ]
  }
];

function getIndustrySymbolicImage(key: string): string {
  switch (key) {
    case "nha_khoa":
      return "/template-previews/nha_khoa_user.png";
    case "spa":
      return "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=400&q=80";
    case "tham_my_vien":
      return "/template-previews/tham_my_vien_user.png";
    case "phong_kham":
      return "/template-previews/phong_kham_user.png";
    case "luat_su":
      return "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=400&q=80";
    case "noi_that":
      return "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=400&q=80";
    case "cong_ty_xay_dung":
      return "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=400&q=80";
    case "nha_hang":
      return "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80";
    case "dich_vu_ve_sinh":
      return "/template-previews/dich_vu_ve_sinh_user.png";
    case "trung_tam_tieng_anh":
      return "/template-previews/trung_tam_tieng_anh_user.png";
    case "quan_cafe":
      return "/template-previews/quan_cafe_user.jpg";
    case "salon_toc":
      return "/template-previews/salon_toc_user.jpg";
    case "phong_gym":
      return "/template-previews/phong_gym_user.png";
    case "garage_oto":
      return "/template-previews/garage_oto_user.jpg";
    case "studio_chup_anh":
      return "/template-previews/studio_chup_anh_user.jpg";
    default:
      return "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=400&q=80";
  }
}

function DraggableMarquee() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const isDraggingRef = useRef(false);
  const [isUserDragging, setIsUserDragging] = useState(false);

  // Duplicate catalog to create seamless loop
  const list = [...industryCatalog, ...industryCatalog, ...industryCatalog];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animId = 0;
    let delayTimer = 0;
    let isPaused = false;

    const autoScroll = () => {
      if (isPaused) return;

      container.scrollLeft += 0.75; // Slow flowing speed

      const singleSetWidth = container.scrollWidth / 3;
      if (container.scrollLeft >= singleSetWidth * 2) {
        container.scrollLeft -= singleSetWidth;
      } else if (container.scrollLeft <= 0) {
        container.scrollLeft += singleSetWidth;
      }

      animId = requestAnimationFrame(autoScroll);
    };

    animId = requestAnimationFrame(autoScroll);

    const onMouseDown = (e: MouseEvent) => {
      isDownRef.current = true;
      isDraggingRef.current = false;
      setIsUserDragging(true);
      isPaused = true;
      if (animId) cancelAnimationFrame(animId);
      if (delayTimer) clearTimeout(delayTimer);

      startXRef.current = e.pageX - container.offsetLeft;
      scrollLeftRef.current = container.scrollLeft;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDownRef.current) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startXRef.current) * 1.5;
      isDraggingRef.current = Math.abs(walk) > 4;
      container.scrollLeft = scrollLeftRef.current - walk;

      const singleSetWidth = container.scrollWidth / 3;
      if (container.scrollLeft >= singleSetWidth * 2) {
        container.scrollLeft -= singleSetWidth;
        scrollLeftRef.current -= singleSetWidth;
        startXRef.current = x;
      } else if (container.scrollLeft <= 0) {
        container.scrollLeft += singleSetWidth;
        scrollLeftRef.current += singleSetWidth;
        startXRef.current = x;
      }
    };

    const stopDragging = () => {
      if (!isDownRef.current) return;
      isDownRef.current = false;
      setIsUserDragging(false);

      delayTimer = window.setTimeout(() => {
        isPaused = false;
        animId = requestAnimationFrame(autoScroll);
      }, 1200);
    };

    const onTouchStart = (e: TouchEvent) => {
      isDownRef.current = true;
      isDraggingRef.current = false;
      isPaused = true;
      if (animId) cancelAnimationFrame(animId);
      if (delayTimer) clearTimeout(delayTimer);

      startXRef.current = e.touches[0].pageX - container.offsetLeft;
      scrollLeftRef.current = container.scrollLeft;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDownRef.current) return;
      const x = e.touches[0].pageX - container.offsetLeft;
      const walk = (x - startXRef.current) * 1.5;
      isDraggingRef.current = Math.abs(walk) > 4;
      container.scrollLeft = scrollLeftRef.current - walk;

      const singleSetWidth = container.scrollWidth / 3;
      if (container.scrollLeft >= singleSetWidth * 2) {
        container.scrollLeft -= singleSetWidth;
        scrollLeftRef.current -= singleSetWidth;
        startXRef.current = x;
      } else if (container.scrollLeft <= 0) {
        container.scrollLeft += singleSetWidth;
        scrollLeftRef.current += singleSetWidth;
        startXRef.current = x;
      }
    };

    const onLinkClick = (e: MouseEvent) => {
      if (isDraggingRef.current) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    container.addEventListener("mousedown", onMouseDown);
    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseup", stopDragging);
    container.addEventListener("mouseleave", stopDragging);

    container.addEventListener("touchstart", onTouchStart, { passive: true });
    container.addEventListener("touchmove", onTouchMove, { passive: true });
    container.addEventListener("touchend", stopDragging);

    const links = container.querySelectorAll("a");
    links.forEach((link) => link.addEventListener("click", onLinkClick));

    // Wait until track layout completes
    const timer = setTimeout(() => {
      const singleSetWidth = container.scrollWidth / 3;
      container.scrollLeft = singleSetWidth;
    }, 100);

    return () => {
      if (animId) cancelAnimationFrame(animId);
      if (delayTimer) clearTimeout(delayTimer);
      clearTimeout(timer);
      container.removeEventListener("mousedown", onMouseDown);
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseup", stopDragging);
      container.removeEventListener("mouseleave", stopDragging);
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchmove", onTouchMove);
      container.removeEventListener("touchend", stopDragging);
      links.forEach((link) => link.removeEventListener("click", onLinkClick));
    };
  }, []);

  return (
    <div
      className={`marquee-scroller-wrap ${isUserDragging ? "is-dragging" : ""}`}
      ref={containerRef}
    >
      <div className="marquee-scroller-track">
        {list.map((item, idx) => (
          <Link
            className="marquee-card"
            href={`/kho-giao-dien/${item.key}`}
            key={`${item.key}-${idx}`}
            draggable={false}
          >
            <div className="marquee-card-image">
              <img
                src={getIndustrySymbolicImage(item.key)}
                alt={item.name}
                loading="lazy"
                draggable={false}
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
            <div className="marquee-card-info">
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <span className="marquee-card-link">Xem mẫu →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
const processSteps = [
  {
    number: "01",
    title: "Tư vấn & Định hướng",
    description: "Khảo sát nhu cầu thực tế, tư vấn cấu trúc trang phù hợp và thống nhất giải pháp website tối ưu theo định hướng phát triển của doanh nghiệp.",
    deliverables: [
      "Khảo sát yêu cầu chi tiết",
      "Đề xuất giải pháp & sơ đồ trang",
      "Thống nhất kế hoạch triển khai"
    ]
  },
  {
    number: "02",
    title: "Thiết kế giao diện",
    description: "Xây dựng bản vẽ cấu trúc và thiết kế giao diện trực quan, tập trung tối ưu hóa trải nghiệm người dùng thân thiện trên mọi thiết bị.",
    deliverables: [
      "Bản vẽ phác thảo cấu trúc (Wireframe)",
      "Thiết kế giao diện mỹ thuật (UI)",
      "Tối ưu luồng trải nghiệm (UX)"
    ]
  },
  {
    number: "03",
    title: "Lập trình & Hoàn thiện",
    description: "Phát triển mã nguồn tối ưu hiệu năng, tích hợp hệ quản lý nội dung (CMS) dễ sử dụng và cài đặt các tính năng theo yêu cầu.",
    deliverables: [
      "Lập trình giao diện Frontend",
      "Thiết lập hệ thống quản trị (CMS)",
      "Tối ưu kỹ thuật & bảo mật cơ bản"
    ]
  },
  {
    number: "04",
    title: "Kiểm thử & Bàn giao",
    description: "Kiểm tra toàn diện tính năng, hỗ trợ vận hành chạy thử và hướng dẫn doanh nghiệp tiếp nhận quản lý website một cách độc lập.",
    deliverables: [
      "Kiểm thử vận hành hệ thống",
      "Hướng dẫn bàn giao quản trị",
      "Kích hoạt chính sách hỗ trợ kỹ thuật"
    ]
  }
];

const pricing = [
  {
    title: "Basic",
    price: "Miễn phí",
    desc: "Lựa chọn thử nghiệm ban đầu",
    items: [
      "Đường dẫn con miễn phí (ten-mien-he-thong.com/ten-cua-ban)",
      "Sử dụng kho giao diện mẫu sẵn có",
      "Hỗ trợ thay đổi thông tin cơ bản",
      "Lựa chọn hoàn hảo để trải nghiệm dịch vụ"
    ],
    popular: false
  },
  {
    title: "Starter",
    price: "250k / tháng",
    desc: "Website cơ bản & CRM nhỏ",
    items: [
      "Hỗ trợ kết nối tên miền riêng của bạn",
      "Thiết kế giao diện Website cơ bản, chuẩn SEO",
      "Hệ quản trị khách hàng CRM (10 tài khoản)",
      "Hệ thống đặt lịch hẹn trực tuyến (Booking)",
      "Bảng điều khiển báo cáo (Dashboard) cơ bản",
      "Chatbot AI trả lời tự động (250 hội thoại/tháng)"
    ],
    popular: false
  },
  {
    title: "Pro",
    price: "550k / tháng",
    desc: "Giải pháp toàn diện & AI Booking",
    items: [
      "Hỗ trợ kết nối tên miền riêng của bạn",
      "Thiết kế giao diện Website nâng cao, tối ưu UX",
      "Hệ quản trị khách hàng CRM (100 tài khoản)",
      "CMS quản lý bài viết doanh nghiệp",
      "AI đặt lịch hẹn thông minh (AI Booking)",
      "Bảng điều khiển báo cáo (Dashboard) nâng cao",
      "Chatbot AI trả lời tự động (500 hội thoại/tháng)",
      "Huấn luyện AI chuyên sâu theo tài liệu DN"
    ],
    popular: true
  },
  {
    title: "Super",
    price: "950k / tháng",
    desc: "Tự động hóa tối đa & CMS AI",
    items: [
      "Hỗ trợ kết nối tên miền riêng của bạn",
      "Thiết kế giao diện Website nâng cao chuyên sâu",
      "CRM tự động hóa quy trình (1.000+ tài khoản)",
      "AI tự động biên soạn nội dung & đăng bài (CMS AI)",
      "AI Booking & Nhắc lịch hẹn tin nhắn tự động",
      "Dashboard tùy biến linh hoạt theo yêu cầu",
      "Chatbot AI trả lời tự động (1.000 hội thoại/tháng)",
      "Huấn luyện AI chuyên sâu theo tài liệu DN"
    ],
    popular: false
  }
];

export function CompanyHome() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [consultMessage, setConsultMessage] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [isConsultSubmitting, setIsConsultSubmitting] = useState(false);
  const [isContactSubmitting, setIsContactSubmitting] = useState(false);
  const [activeServiceId, setActiveServiceId] = useState("01");

  async function submitConsult(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setIsConsultSubmitting(true);
    setConsultMessage("");

    const formData = new FormData(form);
    const phone = formData.get("phone") as string;

    if (!phone || phone.trim() === "") {
      setConsultMessage("Vui lòng nhập số điện thoại hợp lệ.");
      setIsConsultSubmitting(false);
      return;
    }

    try {
      const res = await fetch("/api/public/submit-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "consult", phone })
      });

      if (res.ok) {
        setConsultMessage("TAVIWEB đã ghi nhận thông tin. Đội ngũ tư vấn sẽ liên hệ lại sớm.");
        form.reset();
      } else {
        const errorData = await res.json().catch(() => ({}));
        setConsultMessage(errorData.error || "Gửi thông tin thất bại. Vui lòng thử lại.");
      }
    } catch (err) {
      console.error(err);
      setConsultMessage("Đã xảy ra lỗi kết nối. Vui lòng thử lại sau.");
    } finally {
      setIsConsultSubmitting(false);
    }
  }

  async function submitContact(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setIsContactSubmitting(true);
    setContactMessage("");

    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const phone = formData.get("phone") as string;
    const service = formData.get("service") as string;

    if (!phone || phone.trim() === "") {
      setContactMessage("Vui lòng nhập số điện thoại.");
      setIsContactSubmitting(false);
      return;
    }

    try {
      const res = await fetch("/api/public/submit-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "contact", name, phone, service })
      });

      if (res.ok) {
        setContactMessage("TAVIWEB đã ghi nhận yêu cầu. Chúng tôi sẽ phản hồi trong ngày làm việc.");
        form.reset();
      } else {
        const errorData = await res.json().catch(() => ({}));
        setContactMessage(errorData.error || "Gửi yêu cầu thất bại. Vui lòng thử lại.");
      }
    } catch (err) {
      console.error(err);
      setContactMessage("Đã xảy ra lỗi kết nối. Vui lòng thử lại sau.");
    } finally {
      setIsContactSubmitting(false);
    }
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  const activeService = services.find((s) => s.id === activeServiceId) || services[0];

  return (
    <div className="company-site company-software">
      <a className="skip-link" href="#main">
        Chuyển đến nội dung chính
      </a>

      <header className="site-header">
        <nav className="nav-shell" aria-label="Điều hướng chính">
          <Link className="brand" href="#main" aria-label="TAVIWEB" onClick={closeMenu}>
            <span className="brand-symbol" aria-hidden="true">
              T
            </span>
            <span className="brand-copy">
              <strong>TAVIWEB</strong>
              <small>Website & Automation</small>
            </span>
          </Link>

          <button
            className="nav-toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="primary-menu"
            onClick={() => setMenuOpen((value) => !value)}
          >
            <span className="nav-toggle-lines" aria-hidden="true" />
            <span className="sr-only">Mở menu</span>
          </button>

          <div className={`primary-menu${menuOpen ? " is-open" : ""}`} id="primary-menu">
            <Link href="#services" onClick={closeMenu}>
              Dịch vụ
            </Link>
            <div className="nav-dropdown">
              <Link href="/kho-giao-dien/noi_that" onClick={closeMenu}>
                Kho giao diện
              </Link>
              <div className="nav-dropdown-panel" aria-label="Danh mục kho giao diện">
                {industryCatalog.map((industry) => (
                  <Link href={`/kho-giao-dien/${industry.key}`} key={industry.key} onClick={closeMenu}>
                    {industry.name}
                  </Link>
                ))}
              </div>
            </div>
            <Link href="#projects" onClick={closeMenu}>
              Dự án
            </Link>
            <Link href="#process" onClick={closeMenu}>
              Quy trình
            </Link>
            <Link href="#pricing" onClick={closeMenu}>
              Bảng giá
            </Link>
            <Link className="nav-contact" href="#contact" onClick={closeMenu}>
              Liên hệ
            </Link>
          </div>
        </nav>
      </header>

      <main id="main">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-inner">
            <div className="hero-copy">
              <p className="eyebrow">TAVIWEB</p>
              <h1 id="hero-title">
                <span>Thiết kế website</span> <strong>chuyên nghiệp</strong>
              </h1>
              <p className="hero-lead">Tối ưu chi phí - Đột phá doanh thu</p>
              <p className="hero-description">
                TAVIWEB đồng hành cùng doanh nghiệp xây dựng website bán hàng, website công ty
                và hệ thống landing page tốc độ cao, tối ưu chuyển đổi, dễ quản trị.
              </p>

              <ul className="benefit-list" aria-label="Ưu đãi khi đăng ký tư vấn">
                <li>Tặng tên miền quốc tế năm đầu tiên</li>
                <li>Tặng livechat và form thu lead tự động</li>
                <li>Tặng gói lưu trữ Hosting năm đầu, tối ưu tốc độ tải trang</li>
              </ul>

              <form className="consult-form" id="consult-form" onSubmit={submitConsult}>
                <p>Đăng ký nhận tư vấn miễn phí ngay hôm nay</p>
                <div className="consult-row">
                  <label className="sr-only" htmlFor="phone">
                    Số điện thoại
                  </label>
                  <input id="phone" name="phone" type="tel" placeholder="Số điện thoại" autoComplete="tel" />
                  <button className="button button-primary" type="submit" disabled={isConsultSubmitting}>
                    {isConsultSubmitting ? "Đang gửi..." : "Đăng ký tư vấn"}
                  </button>
                </div>
                <small className="form-message" role="status" aria-live="polite">
                  {consultMessage}
                </small>
              </form>
            </div>
          </div>
        </section>

        <section className="trust-strip" aria-label="Cam kết dịch vụ">
          <div>
            <strong>7 ngày</strong>
            <span>Bản demo đầu tiên</span>
          </div>
          <div>
            <strong>90+</strong>
            <span>Điểm hiệu năng mục tiêu</span>
          </div>
          <div>
            <strong>24/7</strong>
            <span>Theo dõi form và hosting</span>
          </div>
          <div>
            <strong>Bảo mật</strong>
            <span>SSL và sao lưu dữ liệu tự động</span>
          </div>
        </section>

        <section className="section content-section services-section-tabs" id="services" aria-labelledby="services-title">
          <div className="section-heading">
            <p className="eyebrow">Dịch vụ</p>
            <h2 id="services-title">Giải pháp website phù hợp với doanh nghiệp</h2>
            <p>
              TAVIWEB thiết kế giao diện trực quan, tối ưu tốc độ tải trang và tính năng
              để hỗ trợ vận hành hiệu quả.
            </p>
          </div>

          <div className="services-tabs-layout">
            {/* Cột trái: Danh sách các tab */}
            <div className="services-tabs-left" role="tablist" aria-label="Danh mục dịch vụ">
              {services.map((service) => {
                const isActive = service.id === activeServiceId;
                return (
                  <button
                    key={service.id}
                    className={`services-tab-btn${isActive ? " is-active" : ""}`}
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`service-panel-${service.id}`}
                    id={`service-tab-${service.id}`}
                    onClick={() => setActiveServiceId(service.id)}
                  >
                    <span className="services-tab-num">{service.id}</span>
                    <div className="services-tab-meta">
                      <h3>{service.title}</h3>
                      <p>{service.tagline}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Cột phải: Chi tiết nội dung của dịch vụ đang active */}
            <div
              className="services-content-right"
              id={`service-panel-${activeService.id}`}
              role="tabpanel"
              aria-labelledby={`service-tab-${activeService.id}`}
            >
              <div className="services-content-card animate-fade-in">
                <div className="services-content-header">
                  <span className="services-content-badge">{activeService.badge}</span>
                  <h2>{activeService.title}</h2>
                  <p className="services-content-tagline">{activeService.tagline}</p>
                </div>

                <p className="services-content-desc">{activeService.text}</p>

                <div className="services-content-body">
                  <div className="services-deliverables-wrap">
                    <h4>Hạng mục bàn giao chi tiết:</h4>
                    <ul className="services-deliverables-list">
                      {activeService.deliverables.map((item, index) => (
                        <li key={index}>
                          <span className="check-icon" aria-hidden="true">
                            <CheckCircle2 size={16} />
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="services-sidebar-info">
                    <div className="services-metric-box">
                      <span className="metric-label">Cam kết kỹ thuật</span>
                      <span className="metric-value">{activeService.metric}</span>
                    </div>

                    {/* SVG Graphic Mockup mini for the active service */}
                    <div className="services-mini-mockup" aria-hidden="true">
                      <svg viewBox="0 0 240 140" width="100%" height="100%">
                        {/* Browser Frame */}
                        <rect x="10" y="10" width="220" height="120" rx="8" stroke="var(--software-border)" strokeWidth="1.5" fill="#f8fafc" />
                        <line x1="10" y1="34" x2="230" y2="34" stroke="var(--software-border)" strokeWidth="1.5" />
                        <circle cx="24" cy="22" r="4" fill="#ef4444" />
                        <circle cx="36" cy="22" r="4" fill="#f59e0b" />
                        <circle cx="48" cy="22" r="4" fill="#10b981" />

                        {/* Custom content depending on the service */}
                        {activeService.id === "01" && (
                          <>
                            {/* Corporate layout */}
                            <rect x="25" y="48" width="60" height="16" rx="2" fill="var(--software-blue)" opacity="0.15" />
                            <rect x="25" y="70" width="100" height="6" rx="1" fill="#64748b" opacity="0.5" />
                            <rect x="25" y="80" width="80" height="6" rx="1" fill="#64748b" opacity="0.3" />

                            <rect x="140" y="48" width="75" height="55" rx="4" fill="var(--software-red)" opacity="0.1" />
                            <circle cx="177" cy="75" r="10" stroke="var(--software-red)" strokeWidth="1.5" />
                          </>
                        )}
                        {activeService.id === "02" && (
                          <>
                            {/* Product catalog layout */}
                            <rect x="25" y="48" width="55" height="40" rx="4" fill="#cbd5e1" />
                            <rect x="90" y="48" width="55" height="40" rx="4" fill="#cbd5e1" />
                            <rect x="155" y="48" width="55" height="40" rx="4" fill="#cbd5e1" />

                            <rect x="25" y="96" width="40" height="6" rx="1" fill="#64748b" opacity="0.5" />
                            <rect x="90" y="96" width="40" height="6" rx="1" fill="#64748b" opacity="0.5" />
                            <rect x="155" y="96" width="40" height="6" rx="1" fill="#64748b" opacity="0.5" />

                            <circle cx="205" cy="115" r="12" fill="var(--software-red)" opacity="0.15" />
                            <path d="M201 115h8M205 111v8" stroke="var(--software-red)" strokeWidth="1.5" />
                          </>
                        )}
                        {activeService.id === "03" && (
                          <>
                            {/* Landing page landing focused form */}
                            <rect x="25" y="48" width="100" height="10" rx="2" fill="var(--software-blue)" opacity="0.15" />
                            <rect x="25" y="65" width="80" height="6" rx="1" fill="#64748b" opacity="0.5" />
                            <rect x="25" y="75" width="90" height="6" rx="1" fill="#64748b" opacity="0.3" />

                            <rect x="145" y="48" width="70" height="65" rx="4" fill="#ffffff" stroke="var(--software-blue)" strokeWidth="1.5" />
                            <rect x="155" y="60" width="50" height="8" rx="2" fill="#e2e8f0" />
                            <rect x="155" y="74" width="50" height="8" rx="2" fill="#e2e8f0" />
                            <rect x="155" y="90" width="50" height="12" rx="2" fill="var(--software-red)" />
                          </>
                        )}
                        {activeService.id === "04" && (
                          <>
                            {/* Dashboard maintenance health layout */}
                            <circle cx="60" cy="80" r="24" stroke="var(--software-blue)" strokeWidth="3" strokeDasharray="100 40" fill="none" />
                            <text x="60" y="84" textAnchor="middle" fontSize="11" fill="var(--software-blue)" fontWeight="bold">99.9%</text>

                            <rect x="110" y="55" width="100" height="8" rx="2" fill="#10b981" />
                            <rect x="110" y="72" width="100" height="8" rx="2" fill="#10b981" />
                            <rect x="110" y="89" width="100" height="8" rx="2" fill="#10b981" />
                          </>
                        )}
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="services-action-footer" style={{ marginTop: "32px" }}>
                  <a className="button button-primary" href="#contact">
                    Đăng ký tư vấn giải pháp này
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section project-section" id="projects" aria-labelledby="projects-title">
          <div className="section-heading narrow">
            <p className="eyebrow">Dự án mẫu</p>
            <h2 id="projects-title">Giao diện phù hợp từng ngành</h2>
            <p style={{ color: "var(--software-ink-muted)", marginTop: "8px" }}>
              Kéo chuột sang trái hoặc phải để khám phá các mẫu giao diện. Nhấp vào ngành bất kỳ để xem chi tiết.
            </p>
          </div>

          <DraggableMarquee />
        </section>

        <section className="section process-section" id="process" aria-labelledby="process-title">
          <div className="section-heading center">
            <p className="eyebrow">Quy trình</p>
            <h2 id="process-title">Quy trình triển khai</h2>
            <p>
              Mỗi giai đoạn đều có đầu việc rõ ràng, tiêu chí nghiệm thu cụ thể và người phụ trách
              đồng hành cùng doanh nghiệp.
            </p>
          </div>

          <div className="process-timeline-stacked-wide">
            {processSteps.map((step, index) => (
              <div
                className="process-step-card-outer"
                key={step.number}
                style={{ "--stack-idx": index } as React.CSSProperties}
              >
                <div className="process-step-card-inner">
                  <div className="process-step-header">
                    <span className="process-step-number">{step.number}</span>
                    <h3>{step.title}</h3>
                  </div>
                  <div className="process-card-body">
                    <p>{step.description}</p>
                    <ul className="process-deliverables-list">
                      {step.deliverables.map((item) => (
                        <li key={item}>
                          <CheckCircle2 size={16} className="deliverable-check-icon" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="section pricing-section" id="pricing" aria-labelledby="pricing-title">
          <div className="section-heading narrow">
            <p className="eyebrow">Bảng giá</p>
            <h2 id="pricing-title">Gói thiết kế linh hoạt</h2>
            <p>Chi phí được chốt sau khi TAVIWEB nắm rõ phạm vi, nội dung và tính năng.</p>
          </div>

          <div className="pricing-structure-section">
            <div className="section-heading center">
              <h3 style={{ marginTop: "32px" }}>Chi phí sở hữu Website</h3>
            </div>

            <div className="pricing-structure-grid">
              <div className="cost-card-outer">
                <div className="cost-card-inner">
                  <span className="cost-tag tag-red">Chi trả 1 lần</span>
                  <h4>Thiết kế & Khởi tạo</h4>
                  <p className="cost-value">0đ <span className="cost-value-divider">—</span> 5-20tr</p>
                  <ul className="cost-details">
                    <li><strong>Giao diện mẫu (Template):</strong> Miễn phí hoàn toàn phí thiết lập & khởi tạo ban đầu.</li>
                    <li><strong>May đo theo yêu cầu:</strong> Từ 5.000.000đ cho giao diện thiết kế mỹ thuật độc quyền, chuẩn SEO, tối ưu UX, lập trình tính năng riêng biệt.</li>
                  </ul>
                </div>
              </div>

              <div className="cost-card-outer">
                <div className="cost-card-inner">
                  <span className="cost-tag tag-blue">Hàng tháng</span>
                  <h4>Duy trì & Vận hành</h4>
                  <p className="cost-value">0đ <span className="cost-value-divider">—</span> 950k <span className="cost-period">/ tháng</span></p>
                  <ul className="cost-details">
                    <li><strong>Hạ tầng lưu trữ (Hosting):</strong> Đã bao gồm Hosting SSD tốc độ cao, chứng chỉ bảo mật SSL, băng thông rộng không giới hạn.</li>
                    <li><strong>Hệ quản trị & Công nghệ AI:</strong> Bảng quản trị khách hàng CRM, CMS đăng bài, trợ lý đặt lịch hẹn AI và Chatbot tự động phản hồi.</li>
                  </ul>
                </div>
              </div>

              <div className="cost-card-outer">
                <div className="cost-card-inner">
                  <span className="cost-tag tag-green">Hàng năm</span>
                  <h4>Tên miền / Domain</h4>
                  <p className="cost-value">0đ <span className="cost-value-divider">—</span> 1.000k <span className="cost-period">/ năm</span></p>
                  <ul className="cost-details">
                    <li><strong>Đường dẫn con hệ thống:</strong> Tặng kèm đường dẫn con miễn phí trọn đời (dạng <code>ten-mien-he-thong.com/ten-doanh-nghiep</code>).</li>
                    <li><strong>Tên miền riêng:</strong> Hỗ trợ đăng ký và cấu hình tự động tên miền thương mại (.com, .net, .vn...) từ 400.000đ / năm.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="section-heading center" style={{ marginTop: "64px" }}>
            <h3>Bảng giá duy trì các gói dịch vụ</h3>
          </div>

          <div className="pricing-grid">
            {pricing.map((plan) => (
              <div className={`price-card-outer price-card-${plan.title.toLowerCase()}`} key={plan.title}>
                <article className="price-card-inner">
                  <div className="price-card-header">
                    <span className="price-card-title">{plan.title}</span>
                    <h4 className="price-card-desc">{plan.desc}</h4>
                    <p className="price">
                      {plan.price === "Miễn phí" ? (
                        <span className="price-number">Miễn phí</span>
                      ) : (
                        <>
                          <span className="price-number">{plan.price.split(" / ")[0]}</span>
                          <span className="price-period">/ tháng</span>
                        </>
                      )}
                    </p>
                  </div>
                  <ul>
                    {plan.items.map((item) => (
                      <li key={item}>
                        <Check size={16} className="price-check-icon" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </div>
            ))}
          </div>

          <details className="pricing-comparison">
            <summary className="pricing-comparison-summary">
              <span>Xem bảng so sánh chi tiết tính năng</span>
              <span className="pricing-comparison-arrow">▼</span>
            </summary>
            <div className="pricing-comparison-table-wrap">
              <table className="pricing-comparison-table">
                <thead>
                  <tr>
                    <th>Tính năng / Dịch vụ</th>
                    <th>Basic</th>
                    <th>Starter</th>
                    <th className="highlight-col">Pro (Khuyên dùng)</th>
                    <th>Super</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Giá gói vận hành</strong></td>
                    <td className="price-val">Miễn phí</td>
                    <td className="price-val">250k / tháng</td>
                    <td className="price-val highlight-col">550k / tháng</td>
                    <td className="price-val">950k / tháng</td>
                  </tr>
                  <tr>
                    <td>Tên miền (Domain)</td>
                    <td>Đường dẫn con trên tên miền hệ thống</td>
                    <td>Tên miền riêng của khách</td>
                    <td className="highlight-col">Tên miền riêng của khách</td>
                    <td>Tên miền riêng của khách</td>
                  </tr>
                  <tr>
                    <td>Thiết kế Web</td>
                    <td>Giao diện Template (có cập nhật tên, địa chỉ, sđt)</td>
                    <td>Web thiết kế cơ bản</td>
                    <td className="highlight-col">Web thiết kế nâng cao</td>
                    <td>Web thiết kế nâng cao</td>
                  </tr>
                  <tr>
                    <td>CRM (Số tài khoản)</td>
                    <td>—</td>
                    <td>Tối đa 10 tài khoản</td>
                    <td className="highlight-col">Tối đa 100 tài khoản</td>
                    <td>1000 + automation</td>
                  </tr>
                  <tr>
                    <td>CMS quản lý nội dung</td>
                    <td>—</td>
                    <td>—</td>
                    <td className="highlight-col">Đăng bài thủ công</td>
                    <td>AI tự tạo tin tức đăng bài</td>
                  </tr>
                  <tr>
                    <td>Hệ thống Booking</td>
                    <td>—</td>
                    <td>Có hỗ trợ</td>
                    <td className="highlight-col">Tính năng AI</td>
                    <td>Tính năng AI + nhắc lịch</td>
                  </tr>
                  <tr>
                    <td>Dashboard</td>
                    <td>—</td>
                    <td>Cơ bản</td>
                    <td className="highlight-col">Nâng cao</td>
                    <td>Nâng cao + chỉnh sửa được</td>
                  </tr>
                  <tr>
                    <td>Chatbot AI (Số hội thoại)</td>
                    <td>—</td>
                    <td>250 hội thoại / tháng</td>
                    <td className="highlight-col">500 hội thoại / tháng</td>
                    <td>1.000 hội thoại / tháng</td>
                  </tr>
                  <tr>
                    <td>Huấn luyện kịch bản Chatbot</td>
                    <td>—</td>
                    <td>—</td>
                    <td className="highlight-col">Train theo tài liệu, kịch bản DN</td>
                    <td>Train theo tài liệu, kịch bản DN</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </details>
        </section>

        <section className="contact-section" id="contact" aria-labelledby="contact-title">
          <div className="contact-copy">
            <p className="eyebrow">Liên hệ</p>
            <h2 id="contact-title">Bắt đầu website mới cho doanh nghiệp của bạn</h2>
            <p>
              Gửi nhu cầu, TAVIWEB sẽ phản hồi với hướng triển khai, thời gian và ngân sách
              phù hợp trong ngày làm việc.
            </p>
          </div>
          <form className="contact-form" onSubmit={submitContact}>
            <label>
              <span>Họ và tên</span>
              <input type="text" name="name" placeholder="Nguyễn Văn A" autoComplete="name" />
            </label>
            <label>
              <span>Số điện thoại</span>
              <input type="tel" name="phone" placeholder={displayPhone} autoComplete="tel" />
            </label>
            <label>
              <span>Nhu cầu thiết kế</span>
              <input
                type="text"
                name="service"
                placeholder="Ví dụ: Website spa, landing page bất động sản..."
                autoComplete="off"
              />
            </label>
            <button className="button button-primary" type="submit" disabled={isContactSubmitting}>
              {isContactSubmitting ? "Đang gửi..." : "Gửi yêu cầu"}
            </button>
            <small className="form-message" role="status" aria-live="polite">
              {contactMessage}
            </small>
          </form>
        </section>
      </main>

      <div className="floating-actions" aria-label="Liên hệ nhanh">
        <a
          className="float-zalo"
          href={`https://zalo.me/${phoneNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Liên hệ Zalo"
        >
          <svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor">
            <path d="M12 2C6.48 2 2 5.84 2 10.59c0 2.82 1.63 5.31 4.14 6.78-.14.54-.51 1.94-.65 2.48-.15.58.29 1.07.82.86.87-.34 2.37-1.04 3.12-1.4 1 .23 2.06.37 3.14.37 5.52 0 10-3.84 10-8.59S17.52 2 12 2z" fill="#ffffff" />
            <text x="12" y="14" fontSize="9" fontFamily="system-ui, sans-serif" fontWeight="900" textAnchor="middle" fill="#0068FF">Z</text>
          </svg>
        </a>
        <a
          className="float-phone"
          href={`tel:${phoneNumber}`}
          aria-label={`Gọi ${displayPhone}`}
        >
          <div className="float-phone-icon-box">
            <Phone size={22} strokeWidth={2.5} />
          </div>
          <span className="float-phone-number">{displayPhone}</span>
        </a>
      </div>

      <footer className="site-footer">
        <div className="footer-top">
          <div className="footer-brand">
            <Link href="/" className="footer-logo">TAVIWEB</Link>
            <p className="footer-tagline">
              Nền tảng thiết kế website thông minh & demo tự động dành cho doanh nghiệp Việt.
            </p>
            <div className="footer-contact-info">
              <p>Email: contact@taviweb.vn</p>
              <p>Hotline: 0337.367.666</p>
            </div>
          </div>
          
          <div className="footer-links-grid">
            <div className="footer-col">
              <h4>Giải pháp</h4>
              <ul>
                <li><Link href="#services">Website Doanh nghiệp</Link></li>
                <li><Link href="#services">Website Sản phẩm</Link></li>
                <li><Link href="#services">Landing Page quảng cáo</Link></li>
                <li><Link href="#services">Bảo trì & Nâng cấp</Link></li>
              </ul>
            </div>
            
            <div className="footer-col">
              <h4>Quy trình & Báo giá</h4>
              <ul>
                <li><Link href="#process">Quy trình triển khai</Link></li>
                <li><Link href="#pricing">Gói thiết kế linh hoạt</Link></li>
                <li><Link href="#faq">Câu hỏi thường gặp</Link></li>
              </ul>
            </div>
            
            <div className="footer-col">
              <h4>Hỗ trợ & Liên hệ</h4>
              <ul>
                <li><Link href="#contact">Tư vấn thiết kế</Link></li>
                <li><Link href="/kho-giao-dien">Kho giao diện mẫu</Link></li>
                <li><a href="https://zalo.me/0337367666" target="_blank" rel="noopener noreferrer">Liên hệ qua Zalo</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} TAVIWEB. Tất cả các quyền được bảo lưu.</p>
          <a href="#main" className="scroll-top-link">Lên đầu trang ↑</a>
        </div>
      </footer>
    </div>
  );
}
