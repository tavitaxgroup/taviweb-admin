import { DemoPageData } from "../../types/demo";

export const DEFAULT_CLEANING_IMAGES = {
  hero: "https://lh3.googleusercontent.com/aida-public/AB6AXuCZzvh2QBRquTUw8_S_bmH6vXj2gjBuqr7BDkP7TWAGHK5mz7tehSYBzkaxaG-_vVdVq39hiAxxaFEHix3tmPYBy8TMnwQhwH4giOLEU9A78KVeogdLXMc_9Y-1oQXrDQhqquzPVaqOaWHn3nHJet594bQUHRmQF4G51pFVABrxXM48dhnC5DECFqHe4ZiNd9gWz532RUXl-c2FGEdJWJmC-p9LjCkVBhGpKcBRoZwsUg58WswoEthnqQ",
  about: "https://lh3.googleusercontent.com/aida-public/AB6AXuAq6baBc6YtauK8jPvBJPA4VlcUiqJz7N20B7mfWiTZ6bCBVEbc9LCl_PuVvf-dTpADMS7eSvbntSV1EjNf5wlbjawQheRR57VDIoSyTKgTQS2kDeO919WmGbjxzgwjVrUuU7-6L698lZO1pnwH6XCHcY9zjyQXmG2gjjyZMDcqk9cOM4c1UFFdQ3MMdlPsjX0Gm9EDgi2V0CQulLpSuAXswWTHw8HjRrYHUJWje0cRdtAg4JzaCD6o6w",
  machine: "https://lh3.googleusercontent.com/aida-public/AB6AXuC86sAx0pflYY-W8E-_b23RYlc9dIBwsNpeFNf0YWM7fN9mW02I54AODPBibnQNjKlmiBYvkcnhInv3dBWMkY_n92nM1mOIK30SdBOb8psZg5A8-LT1CY-rF2b23-BiDB70LzQuVtRqZsC-BpbXCRBwazAihAPi5rygzCHT-MNrw3fy6Uc30LqdHPCUNj8M9j41ekBGWCiASkow5YCIky90g6hnbWg3WPX-DbpAaUkohhZ3hx2Pi9sybg",
  gallery1: "https://lh3.googleusercontent.com/aida-public/AB6AXuDD8a1JVW6E-DMkEg9q8c9QECx2DaCsT2oAGRZNhYed6ZZa0pWgLgJM6fCLerfDiDmlBxgI5vYCj435bscsiO47EnGoPmx4l49WQMyuVofiKHcmeZ3ulPzaYwAFaYWYEzQy63yLg_idEHGoVKK4xXKbSkj0-uV0ALN7WwiU_yR3Pdydpdqcyh4MvLzSXkWujOUo3vSgPZ3GG9dKZWPAoNWvkx1YDUnszTftHO-lt9D_-amVPpVd_0cbIg",
  gallery2: "https://lh3.googleusercontent.com/aida-public/AB6AXuCXdBVsLcLlVvv6hBnKzY7wwUr-DxFL5cWpjSDikzZPZ499SYBdynOo18CT8S-zRrGsmaCAxqSS-rvFul3e7VGEJEo5Ci7A1VT-jrszJxk5VucUoyV-BnKia2GEKlCOIUjW7Nj9Sbe0EjbJ26aBcE-GCWEzffLrssin7ZR-7uKjweDrNoEcenQtRArMnpn-vdQy0dPFNhXZv4ugvwsPl5rPpc8q75Isf9OJSudRuQ3GYX2CJq5YHaKzaw",
  gallery3: "https://lh3.googleusercontent.com/aida-public/AB6AXuCvHBFWQkH7_IXnsDaZTPNw1B46dzoJjM9l5zMTrw9fImUG1V_6JV1_GV812eQwvhgzIJzMyCxwuCI7wjnqm-euig096h0a5PnslvosuRzypkAMpWiCvls0UNUWFDWWgcnE7hcmzfOCQ05toGs2m7tC7IEyqLalOWL0Y_sw2Y-IXTD8dc0Rfx_u7lwPDOsjSKINkXjCeMVOoQlqyUjlLyKjKjc5LFvkvL-HS5JXd8FY3X2qcVqsPMRfGg",
  gallery4: "https://lh3.googleusercontent.com/aida-public/AB6AXuAtNWJkRfgFr2-ppjEFECNvyi3hCmpI_pDtFTUy2RNvpep3ev7aAHYkZSkCOkMvb9X8Ft-TMLO2gb5dA6oeE9Gg9nIlZbxCc36K9ZXt4B2lHRxUWBcJgHpnzlTJxFqDWhvEap_xw0qBV_wLEpA1iN6yQTz2vGGDYpXLKQvyJhPBpa806hrUNlEDCvxtppEvqWngdwCq7dyXyof6MGWl5E31SKpDshqS81hEzrfpdCeRMn4IfQ6ESwMfkA",
};

export const defaultTemplateData: DemoPageData = {
  business: {
    id: "default_biz",
    placeId: "default",
    name: "CleanPro Services",
    phone: "1900 1234",
    email: "contact@cleanpro.com",
    address: "Tòa nhà TechCore, Cầu Giấy, Hà Nội",
    MessageCircle: "https://MessageCircle.com/cleanpro",
    rating: 4.8,
    reviewCount: 500,
  },
  template: {
    key: "cleaning-service",
    name: "Industrial Vitality",
  },
  hero: {
    title: "Dịch Vụ Vệ Sinh Công Nghiệp Chuyên Nghiệp & Tận Tâm",
    subtitle: "Sạch nhanh chóng, giá minh bạch, quy trình chuẩn mực tại khu vực của bạn. Mang lại không gian làm việc và sinh hoạt chuẩn y khoa.",
    tagline: "TOP RATED IN VIETNAM",
    image: {
      src: DEFAULT_CLEANING_IMAGES.hero,
      alt: "CleanPro Professional Industrial Cleaning Crew in Corporate Lobby",
    },
    primaryAction: {
      label: "Gọi báo giá ngay",
      href: "tel:19001234",
    },
    secondaryAction: {
      label: "Xem bảng giá",
      href: "#services",
    },
  },
  trust: {
    badges: [
      {
        icon: "schedule",
        title: "Đúng Hẹn Tuyệt Đối",
        description: "Luôn có mặt đúng giờ yêu cầu.",
      },
      {
        icon: "receipt_long",
        title: "Báo Giá Minh Bạch",
        description: "Không phát sinh chi phí ẩn.",
      },
      {
        icon: "verified",
        title: "Quy Trình Nhanh Gọn",
        description: "Tiết kiệm thời gian của bạn.",
      },
    ],
  },
  about: {
    title: "Tại Sao Hàng Ngàn Khách Hàng Tin Tưởng CleanPro?",
    description: "Chúng tôi tự hào là đối tác vệ sinh tin cậy của hơn 500+ doanh nghiệp và hàng ngàn hộ gia đình lớn nhỏ, mang đến dịch vụ chuẩn mực và an tâm nhất.",
    image: {
      src: DEFAULT_CLEANING_IMAGES.about,
      alt: "CleanPro team discussing floor plan in modern corporate building",
    },
    highlights: [
      "Trang Thiết Bị Hiện Đại: Máy móc công nghiệp nhập khẩu từ Châu Âu, tăng hiệu quả làm sạch gấp 5 lần.",
      "Hóa Chất Thân Thiện: 100% hóa chất sử dụng có chứng chỉ an toàn môi trường và sức khỏe con người.",
      "Đội Ngũ Kinh Nghiệm: Nhân viên được đào tạo bài bản, trung thực và luôn có giám sát tại hiện trường.",
    ],
  },
  services: [
    {
      id: "srv_1",
      icon: "corporate_fare",
      title: "Vệ sinh văn phòng",
      description: "Duy trì không gian làm việc sạch sẽ, nâng tầm chuyên nghiệp và sức khỏe nhân viên.",
      badge: "Standard",
    },
    {
      id: "srv_2",
      icon: "home_work",
      title: "Tổng vệ sinh nhà ở",
      description: "Làm sạch sâu sau xây dựng hoặc khi chuyển nhà. Đảm bảo mọi ngóc ngách đều sáng bóng.",
      badge: "Popular",
    },
    {
      id: "srv_3",
      icon: "apartment",
      title: "Vệ sinh kính tòa nhà",
      description: "Giải pháp chuyên biệt cho các tòa nhà cao tầng với thiết bị đu dây an toàn chuẩn quốc tế.",
      badge: "Specialist",
    },
    {
      id: "srv_4",
      icon: "construction",
      title: "Vệ sinh công trình",
      description: "Bàn giao mặt bằng sạch đẹp sau thi công. Loại bỏ bụi xi măng và vết sơn khó chịu.",
      badge: "Industrial",
    },
    {
      id: "srv_5",
      icon: "chair",
      title: "Giặt thảm & Sofa",
      description: "Khử khuẩn, làm sạch sâu bằng thiết bị hơi nước nóng hiện đại, loại bỏ 99% vi khuẩn.",
      badge: "Hygiene",
    },
  ],
  gallery: [
    {
      id: "gal_1",
      image: {
        src: DEFAULT_CLEANING_IMAGES.gallery1,
        alt: "Modern luxury office lobby with gleaming granite floors after deep clean",
      },
    },
    {
      id: "gal_2",
      image: {
        src: DEFAULT_CLEANING_IMAGES.gallery2,
        alt: "CleanPro specialist steam cleaning designer sofa in living room",
      },
    },
    {
      id: "gal_3",
      image: {
        src: DEFAULT_CLEANING_IMAGES.gallery3,
        alt: "Professional high-rise window cleaners working on platform",
      },
    },
    {
      id: "gal_4",
      image: {
        src: DEFAULT_CLEANING_IMAGES.gallery4,
        alt: "Completely sanitized and cleared spacious industrial warehouse floor",
      },
    },
  ],
  reviews: [
    {
      id: "rev_1",
      authorName: "Trần Mạnh",
      role: "CEO, TechCore Solutions",
      rating: 5,
      comment: "CleanPro là đối tác vệ sinh định kỳ của văn phòng chúng tôi hơn 2 năm nay. Đội ngũ rất chuyên nghiệp, luôn đúng giờ và quan trọng nhất là báo giá rất rõ ràng từ đầu.",
      avatarLetter: "TM",
    },
    {
      id: "rev_2",
      authorName: "Lê Hoa",
      role: "Chủ căn hộ, Vinhomes Grand Park",
      rating: 5,
      comment: "Sau khi sửa nhà xong bụi bẩn khắp nơi, may có đội ngũ CleanPro đến xử lý trong 1 ngày mà sạch bong từ trần đến sàn. Rất hài lòng với dịch vụ vệ sinh công trình này.",
      avatarLetter: "LH",
    },
    {
      id: "rev_3",
      authorName: "Nguyễn Văn",
      role: "Quản lý hành chính, VN-Bank",
      rating: 4.8,
      comment: "Chúng tôi đánh giá cao việc sử dụng hóa chất an toàn của CleanPro. Văn phòng sau khi vệ sinh không có mùi hắc khó chịu, sàn thảm được giặt rất kỹ.",
      avatarLetter: "NV",
    },
  ],
  contact: {
    title: "Bạn cần tư vấn hoặc báo giá ngay?",
    subtitle: "Chỉ mất 5 phút để chúng tôi khảo sát và đưa ra giải pháp vệ sinh tối ưu nhất cho không gian của bạn.",
    phoneLabel: "Hotline 24/7",
    phoneValue: "1900 1234",
    features: [
      "Khảo sát miễn phí trong 30p",
      "Phục vụ cả ngày lễ và chủ nhật",
    ],
  },
  seo: {
    title: "CleanPro Services - Dịch Vụ Vệ Sinh Công Nghiệp Chuyên Nghiệp",
    description: "Sạch nhanh chóng, giá minh bạch, quy trình chuẩn mực hàng đầu. Hãy gọi ngay để khảo sát miễn phí và nhận báo giá ưu đãi trong 30 phút.",
  },
};
