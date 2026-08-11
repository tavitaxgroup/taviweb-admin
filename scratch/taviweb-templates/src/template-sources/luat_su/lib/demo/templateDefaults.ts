import { DemoPageData } from "../../types/demo";

export const DEFAULT_HERO_IMAGE = "https://lh3.googleusercontent.com/aida-public/AB6AXuCLudAGAMKW0xwjfCTg9UinDgiwxlVqwikGYNZ7zdEgm5gD4upmbg-_1ARzcoxFJmMUILAfj6f3hIPldSTteHyjz4ibe7SWd_fdy4XIggdX71bbAfkgETDaTCe4S4nKtQh7lFQv95YEwUv-2s--wPcbQ2L5z7s6dlaqghgx2J5h9hpnJthZgS6hJcllONx6UmhrsfGio99athGE0JC4kTwBwkSXeKsdA0-POJWdOfKoek4V5UHxyv0e";
export const DEFAULT_ABOUT_IMAGE = "https://lh3.googleusercontent.com/aida-public/AB6AXuA-4MIXOBlUgt01rPAD9ZoCj09pbhroQ4NQuQWFxz7L_YXBI6fIefoNowki3JhXd_M7qOSw8TDPO0HM7EN88_HKOtCGkh7DletBp4Hu4Td0V_BXzqqsC9yEpW1VpX767ceMv-f6c6dLCDHDARIJVOVIqw6dxrWhnkbR1JwAaFj89L6bfoxKWvWe-Le-67SuC2ti4V-36E7XIMbordrNMl3V1S5tBWxfnRAzc6MMHrgzsP2q6awsjr4M";

export const defaultLawFirmData: DemoPageData = {
  business: {
    name: "Văn Phòng Luật Sư Juris & Integrity",
    phone: "+84 (0) 123 456 789",
    email: "contact@jurisintegrity.vn",
    address: "Tòa nhà Landmark 81, Quận Bình Thạnh, TP. Hồ Chí Minh",
    rating: 5.0,
    reviewCount: 15
  },
  template: {
    key: "law-firm",
    name: "Law Firm Template"
  },
  hero: {
    title: "Tư vấn pháp lý chuyên nghiệp và tận tâm",
    subtitle: "Chúng tôi bảo vệ quyền lợi hợp pháp của bạn với sự minh bạch và uy tín tuyệt đối. Đồng hành cùng khách hàng trong mọi bước đi của công lý.",
    image: {
      src: DEFAULT_HERO_IMAGE,
      alt: "Văn phòng luật sư sang trọng và chuyên nghiệp"
    },
    primaryAction: {
      label: "Đặt lịch tư vấn",
      href: "#contact"
    },
    secondaryAction: {
      label: "Tìm hiểu thêm",
      href: "#about"
    }
  },
  trust: {
    items: [
      {
        icon: "shield_lock",
        title: "Bảo mật tuyệt đối",
        description: "Cam kết an toàn dữ liệu khách hàng tuyệt đối"
      },
      {
        icon: "verified_user",
        title: "Tư vấn minh bạch",
        description: "Quy trình làm việc rõ ràng, trung thực"
      },
      {
        icon: "event_available",
        title: "Cam kết đúng hẹn",
        description: "Tôn trọng thời gian của quý đối tác"
      }
    ]
  },
  about: {
    title: "Về Văn Phòng Luật Sư Juris & Integrity",
    description1: "Với hơn 15 năm kinh nghiệm thực chiến trong nhiều lĩnh vực pháp lý khác nhau, chúng tôi tự hào mang lại các giải pháp pháp lý an toàn, tin cậy và hiệu quả cho quý khách hàng.",
    description2: "Chúng tôi tin rằng sự chuyên nghiệp đến từ sự thấu hiểu sâu sắc nhu cầu của khách hàng và tinh thần làm việc không mệt mỏi vì lợi ích chính đáng của bạn.",
    image: {
      src: DEFAULT_ABOUT_IMAGE,
      alt: "Luật sư tư vấn chuyên nghiệp"
    },
    stats: [
      { value: "15+", label: "Năm kinh nghiệm" },
      { value: "500+", label: "Dự án hoàn thành" }
    ]
  },
  services: [
    {
      icon: "business",
      title: "Tư vấn doanh nghiệp",
      description: "Hỗ trợ pháp lý vận hành công ty, quản trị rủi ro và tuân thủ các quy định pháp luật."
    },
    {
      icon: "description",
      title: "Hợp đồng & Văn bản",
      description: "Soạn thảo, rà soát và đảm bảo tính chặt chẽ của các giao kết dân sự, thương mại."
    },
    {
      icon: "gavel",
      title: "Tranh chấp dân sự",
      description: "Bảo vệ tối ưu quyền lợi và lợi ích hợp pháp của đương sự tại tòa án các cấp."
    },
    {
      icon: "groups",
      title: "Luật Lao động",
      description: "Tư vấn chế độ, hợp đồng, nội quy và tranh chấp phát sinh trong quan hệ lao động."
    },
    {
      icon: "person",
      title: "Pháp lý cá nhân",
      description: "Hôn nhân gia đình, thừa kế, quyền sở hữu tài sản và các thủ tục hành chính khác."
    }
  ],
  gallery: [
    {
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDsN_EpTc7mb5-TpGi8PMPDTVuECwk8I-bokuM3bIowR-MIhUqCLBjTNWgpTY0JUKbLTXPQjSRK7phJ6eWQAGSpXwIz62iJMLqZ6GFqE37LPSYIm5x-EkiovGLi9-gzHnJi5youxD5PV6nSyYDtSf8yVKSW183Ry_IZqkZh8ZN69mcT7EpFJf3D9P7-LWDPQb5hdew3qv4YoVv0ynsybOIT9wX1GTKmZdvr5g2scZVxODuYVl9g2qf8",
      alt: "Hồ sơ tài liệu ngăn nắp"
    },
    {
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAYkFxE_uVfVcgowyZPveNF8vnGtWJeRLHjedZzMdP75bUaxFX94h5oKvupoZPTJdUH94t97MB6yy4fHqt_bLlTWfFFw04b_x9HU_MdKC3Sj0r6qu7uRTUex-UQTDyzjLyFjFFpKnaSGs9XlW7bZAd3ina-Zw47w64MANNfWHGrgC1B-612UaofQlRzmt_8CEBxNFH64HUd7evSV4WLSq9A9lF7EoBlXVkmsJ72qklA2pN06Phz9Y6A",
      alt: "Phòng họp hiện đại và sáng sủa"
    }
  ],
  reviews: [
    {
      author: "Nguyễn Văn Hùng",
      rating: 5,
      content: "Văn phòng làm việc cực kỳ chuyên nghiệp và uy tín. Tôi rất hài lòng với giải pháp hợp đồng các luật sư cung cấp.",
      role: "Giám đốc công ty",
      date: "01/06/2026"
    }
  ],
  contact: {
    title: "Liên hệ tư vấn",
    description: "Để lại thông tin hoặc liên hệ trực tiếp với chúng tôi để nhận được sự hỗ trợ pháp lý kịp thời nhất.",
    phone: "+84 (0) 123 456 789",
    email: "contact@jurisintegrity.vn",
    address: "Tòa nhà Landmark 81, Quận Bình Thạnh, TP. Hồ Chí Minh",
    primaryAction: {
      label: "Gửi yêu cầu tư vấn",
      href: "#contact"
    }
  },
  seo: {
    title: "Văn Phòng Luật Sư Juris & Integrity | Tư vấn pháp lý chuyên nghiệp",
    description: "Văn phòng luật sư uy tín hỗ trợ tư vấn doanh nghiệp, tranh chấp dân sự, luật lao động, thừa kế và hôn nhân gia đình."
  }
};
