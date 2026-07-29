import { DemoPageData } from '../../types/demo';

export const mockDemoData: Record<string, DemoPageData> = {
  'luxe-studio': {
    business: {
      name: 'LUXE STUDIO',
      phone: '0123456789',
      address: '123 Đường Lê Lợi, Quận 1, TP. Hồ Chí Minh',
      facebookUrl: 'https://MessageCircle.com/luxestudio',
      mapUrl: 'https://maps.google.com',
      email: 'contact@luxestudio.com',
      logoText: 'LUXE STUDIO',
    },
    template: {
      key: 'hair-salon',
      themeName: 'Atelier Aesthetic',
    },
    hero: {
      title: 'LUXE STUDIO:',
      italicSubtitle: 'Nơi Khơi Nguồn Vẻ Đẹp Tóc',
      description: 'Đội ngũ stylist chuyên nghiệp giúp bạn tự tin tỏa sáng với diện mạo mới thông qua những kỹ thuật tạo kiểu đỉnh cao và sản phẩm cao cấp.',
      backgroundImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDYcLAMl6bkuisfDT6Cefw_UXTyGGtsqRmWsFi4N-tJCl7Dz-rTmKxwNLU6Sex8LY0ERiCLLZ-SdEjD7k5kjVcpRSwk79uvfDzmTQExyYEYih4dsXixf9ZcHjdPhcHl0PVEMDhueaa_Ewf099X3a_POmq-5JHptbV1PAW4O1LEyV0amMFKZtcLaAf0nwuPInwMf9nE_S-1I5e0lLwx2jJHiqwZMsgRx_avqduasc8TwGKlsSj54v-7E',
      primaryCtaText: 'Đặt lịch làm tóc',
      secondaryCtaText: 'Xem dịch vụ',
    },
    trust: {
      rating: '4.9/5 Rating',
      followers: '10k+ Followers',
      certifiedText: 'Certified Stylists',
    },
    about: {
      subtitle: 'Câu chuyện của chúng tôi',
      title: 'Luxe Studio - Hơn cả một tiệm tóc, là không gian để bạn thư giãn và làm mới chính mình.',
      description: 'Tại Luxe Studio, chúng tôi tin rằng mỗi mái tóc là một tác phẩm nghệ thuật. Không chỉ tập trung vào kỹ thuật cắt, chúng tôi chú trọng vào sự cảm nhận và cá tính riêng của mỗi khách hàng để tạo nên những mẫu tóc phù hợp nhất với khuôn mặt và phong cách sống.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC440n5NbQ0vQ6EbF5qr_U0JU6RV-aee1EbajESo_C6_3yZLLtvCyhI3-IDIwp6rHAY95lB8aQ9QFI7dBhapQKb6Dgm-g5AmXsmK6ir2L5Xcz5bHQI2ZdwumAEOFOiYwW81EE-B_DNIh_AATuHCqpiWDHUBDRerLjkBA0ixwfGgi7iEtMXljPaB-c4byQmgQCJHy99B6HkVsmS_dogjGtPsiMBTIKSS2phISONvwZnijQl3Rl57Ey56',
      learnMoreLink: '#about',
    },
    services: [
      {
        id: '1',
        name: 'Cắt tạo kiểu',
        price: '350.000đ',
        description: 'Cắt, gội, sấy và tạo kiểu theo xu hướng mới nhất phù hợp với khuôn mặt.',
        category: 'Cut & Style',
      },
      {
        id: '2',
        name: 'Nhuộm tóc',
        price: '1.200.000đ',
        description: 'Sử dụng màu nhuộm cao cấp, bảo vệ cấu trúc tóc và lên màu chuẩn xác.',
        category: 'Color',
      },
      {
        id: '3',
        name: 'Uốn / Duỗi',
        price: '1.500.000đ',
        description: 'Kỹ thuật uốn lạnh/nóng hiện đại tạo nếp tóc bồng bềnh tự nhiên.',
        category: 'Wave & Straighten',
      },
      {
        id: '4',
        name: 'Phục hồi tóc',
        price: '800.000đ',
        description: 'Liệu trình chuyên sâu tái tạo nang tóc hư tổn và cấp ẩm tức thì.',
        category: 'Treatment',
      },
      {
        id: '5',
        name: 'Gội đầu thư giãn',
        price: '200.000đ',
        description: 'Gội đầu thảo dược kết hợp massage cổ vai gáy giúp xua tan mệt mỏi.',
        category: 'Spa',
      },
    ],
    gallery: [
      {
        id: 'g1',
        imageSrc: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDsnGvNSC1cP5Wd1HTbXWaoWkaF8iL7B_BATt73zgFnuOJPNn6fU2Pxq5fWs7xrZ8wF3CvHLbP-RpTNBzYN8UhRHwsTbpIQ_-7CGEDLUj-wQxm_d_P0cVc49q8-5fkdnyeDDj0WDIiC676FBsphH15bBDjeZ9f9Oteih1ND3hjzP0i3C0Bso30cKx3SzHDnf3whtlXL3DPQCl6QggEHKW-r_SQGJTfJVrCURCqhrbVGKuIMpPufcr37',
        alt: 'High-fashion model blonde waves',
        caption: 'Màu nhuộm Balayage & Uốn sóng lơi',
      },
      {
        id: 'g2',
        imageSrc: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDdxAjnXJzHG2TUezRVLm7P5SObDSOpz35z9aYuY7MSM9wg1rp7tEQNdjen9DNgb7k6RFtMeKv_Q2msCzgCF3gtJuif8U7xeO3nx9Yyge_BFeuKHX4TwO9fbjN56gA7raod6uB_fMFRzrD4NWUn9dr2ZoBsk7HV0bd8cXJv-ai4N3e6Q1hzdZnTAZJGGRWelLN701kh32C49QwlIw1QJ2l1FFzCggF_w2NlWuGnOCRVk75lSjVuhbMz',
        alt: 'Dụng cụ làm tóc chuyên nghiệp',
        caption: 'Dụng cụ cao cấp từ các thương hiệu hàng đầu',
      },
      {
        id: 'g3',
        imageSrc: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDneyH6in2hmSlt5zDKv49k9AHI4AD3ib92i5zQJs1jaWAorp0ICQ-7paiHfA-ooleGV8hsZfko_DMGgizjlJSEp_7sXZY0Z9CD7mzxxEBUDCH56-DuhFh5vH2qMFNowvsu4oSu8IL-swSVQ-7hnVGHK_NQSBXHVUuBM8x2mDLWMQnw1Pca6tw940NOvzyRpPsGvdMEUDWHpwyotqb2AzAr2PzmGHFtPWfrvLeE71bD4W2HFdhk1q6M',
        alt: 'Không gian góc thư giãn',
        caption: 'Góc thư giãn sang trọng & ấm cúng',
      },
      {
        id: 'g4',
        imageSrc: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDdq9sl-FYX88W3Wrjwjx45k7rf_caaG3PEUsTi9p690dS5F7FKbRVZAgjoiCgXiPbYY36LtxTdjfSzICNdwuI3gJkXp8BRlL7UJ1jH12uVi5rn1RRNIVjZFGQEzpS2-I9wLcaeSt0A8cS3NpAXGyytRUuE1G1Hl47G9tIHVn7Bt1GWQd3d4yGNA-T7Y4WRubFJ2iJSu2RPGAXyIOsreaBSRPolr2NtoPj_zVlGepXA9M_O08KC5nRM',
        alt: 'Kiểu tóc nam Textured Crop',
        caption: 'Cắt tạo kiểu nam chuyên nghiệp',
      },
    ],
    reviews: [
      {
        id: 'r1',
        rating: 5,
        text: 'Không gian ở đây thực sự rất thư giãn. Mình cực kỳ ưng ý với màu tóc mới, các bạn stylist tư vấn rất kỹ về cách chăm sóc tóc sau khi nhuộm.',
        authorName: 'Minh Anh',
        authorRole: 'Khách hàng thân thiết',
        avatarSrc: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBFJtFcaE-MJ6CE9WfUGQ7JVY1XQMpF_Ll77zuLsM1WXZcsDkI2UmQetLkqlFPGMjVtD1kJw7yEJBa3GH_XOZb8yQyb7TK4E408UBFDR5ESEMPuZhPqzRiEkTpzWOmaz4dmiVV7XMNkpdq6lGk7Voivgm3kkvTHIPG9R0l3N80H8576YwpWqtsbdOT2lXYsHwCnsPQm_k_8MRYoykQmX-BqxOlH_Fg8xySl3fk7sLQe8uGlW6WzWbmN',
      },
      {
        id: 'r2',
        rating: 5,
        text: 'Chất lượng dịch vụ xứng đáng 5 sao. Kỹ thuật uốn tóc rất tự nhiên, nếp tóc giữ được lâu và tóc vẫn rất mềm mượt chứ không bị khô xơ.',
        authorName: 'Hải Yến',
        authorRole: 'Khách hàng mới',
        avatarSrc: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCt8lY59b-j48-9qtkbNwpuiCKWLToQ2YVqHtrC7wVm4O3qLzenovkbkZyuiq0nQla5jqgg49VXFbyAxX-89RiEhE43Mh-nkI7HgYANpAA-j4tfCDRNFGtiV1z9QkEhpXcbuO6rOf6rGR5WL4ImyZxjjOX8Yf4maJDP5xNfQMXTKIlm8GX1DIYtPfbQT1OLAfHkMkgESZCzeNRaAu2CXgLFsyxhpvCKIfxfQpdc6i695v_ba7OM3paI',
      },
      {
        id: 'r3',
        rating: 5,
        text: 'Stylist rất có tâm, cắt tỉ mỉ từng chút một. Mình chưa bao giờ thấy hài lòng như vậy khi đi làm tóc. Sẽ chắc chắn quay lại và giới thiệu bạn bè.',
        authorName: 'Quốc Trung',
        authorRole: 'Khách hàng VIP',
        avatarSrc: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYndaybbz-IVi_iuflqecbfxbs-77yAAMlXJThNudVorawfAOfONPvT-D-_fw521ugu3kRK-BBJ1RJQpOIXE1oxsTaUkwuMCIS6-9Ru2UAO6OfdbrybxzocRSRN51qqqIK-c7zb0MHzaPlBHUVX8598Gk4QAOYB5w0XxXYaZCuxzeFoJ_hsQMhxWfSptZd_6EFRI1VQs7WDn2mXtPKu5r5LJhRHjaA-OKzozrg2o8KITtSBwgEh1JR',
      },
    ],
    contact: {
      title: 'Bắt đầu hành trình thay đổi phong cách cùng chúng tôi',
      facebookCtaText: 'Nhắn MessageCircle',
      callCtaText: 'Gọi ngay',
      bookCtaText: 'Đặt lịch làm tóc',
    },
    seo: {
      title: 'LUXE STUDIO | Nơi Khơi Nguồn Vẻ Đẹp Tóc',
      description: 'Đội ngũ stylist chuyên nghiệp giúp bạn tự tin tỏa sáng với diện mạo mới thông qua những kỹ thuật tạo kiểu đỉnh cao và sản phẩm cao cấp.',
    },
  },
  'salon-minh-anh': {
    business: {
      name: 'SALON MINH ANH',
      phone: '0901234567',
      address: '456 Đường CMT8, Quận 3, TP. Hồ Chí Minh',
      facebookUrl: 'https://MessageCircle.com/salonminhanh',
      mapUrl: 'https://maps.google.com',
      email: 'minhanh@salonminhanh.com',
      logoText: 'MINH ANH',
    },
    template: {
      key: 'hair-salon',
      themeName: 'Atelier Aesthetic',
    },
    hero: {
      title: 'SALON MINH ANH:',
      italicSubtitle: 'Sáng Tạo Kiểu Tóc Thời Thượng',
      description: 'Nâng tầm phong cách cá nhân của bạn với những xu hướng tóc mới nhất thế giới, được chăm sóc tỉ mỉ bởi các chuyên gia giàu kinh nghiệm.',
      backgroundImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDYcLAMl6bkuisfDT6Cefw_UXTyGGtsqRmWsFi4N-tJCl7Dz-rTmKxwNLU6Sex8LY0ERiCLLZ-SdEjD7k5kjVcpRSwk79uvfDzmTQExyYEYih4dsXixf9ZcHjdPhcHl0PVEMDhueaa_Ewf099X3a_POmq-5JHptbV1PAW4O1LEyV0amMFKZtcLaAf0nwuPInwMf9nE_S-1I5e0lLwx2jJHiqwZMsgRx_avqduasc8TwGKlsSj54v-7E',
      primaryCtaText: 'Đặt lịch ngay',
      secondaryCtaText: 'Menu bảng giá',
    },
    trust: {
      rating: '4.8/5 Đánh giá',
      followers: '8k+ Người theo dõi',
      certifiedText: 'Stylist đạt giải thưởng',
    },
    about: {
      subtitle: 'Về chúng tôi',
      title: 'Salon Minh Anh - Khẳng định cá tính qua mái tóc độc bản.',
      description: 'Chúng tôi hiểu rằng mỗi người sở hữu một chất tóc và phom mặt riêng biệt. Minh Anh cam kết tư vấn kỹ lưỡng, ứng dụng công nghệ hiện đại để mang lại giải pháp hoàn hảo nhất cho diện mạo của bạn.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC440n5NbQ0vQ6EbF5qr_U0JU6RV-aee1EbajESo_C6_3yZLLtvCyhI3-IDIwp6rHAY95lB8aQ9QFI7dBhapQKb6Dgm-g5AmXsmK6ir2L5Xcz5bHQI2ZdwumAEOFOiYwW81EE-B_DNIh_AATuHCqpiWDHUBDRerLjkBA0ixwfGgi7iEtMXljPaB-c4byQmgQCJHy99B6HkVsmS_dogjGtPsiMBTIKSS2phISONvwZnijQl3Rl57Ey56',
      learnMoreLink: '#about',
    },
    services: [
      {
        id: '1',
        name: 'Cắt tạo kiểu nữ',
        price: '250.000đ',
        description: 'Tạo kiểu tóc ngắn, bob, layer bay bổng theo tỉ lệ khuôn mặt.',
        category: 'Cut',
      },
      {
        id: '2',
        name: 'Nhuộm màu thời trang',
        price: '900.000đ',
        description: 'Tẩy tóc an toàn, nhuộm khói, rêu, bạch kim, ombre hợp mốt.',
        category: 'Color',
      },
      {
        id: '3',
        name: 'Uốn xoăn sóng nước',
        price: '1.100.000đ',
        description: 'Uốn sóng nước bồng bềnh, uốn cụp phồng tạo độ dày cho tóc.',
        category: 'Style',
      },
    ],
    gallery: [
      {
        id: 'g1',
        imageSrc: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDsnGvNSC1cP5Wd1HTbXWaoWkaF8iL7B_BATt73zgFnuOJPNn6fU2Pxq5fWs7xrZ8wF3CvHLbP-RpTNBzYN8UhRHwsTbpIQ_-7CGEDLUj-wQxm_d_P0cVc49q8-5fkdnyeDDj0WDIiC676FBsphH15bBDjeZ9f9Oteih1ND3hjzP0i3C0Bso30cKx3SzHDnf3whtlXL3DPQCl6QggEHKW-r_SQGJTfJVrCURCqhrbVGKuIMpPufcr37',
        alt: 'Blonde waves style',
      },
      {
        id: 'g2',
        imageSrc: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDdxAjnXJzHG2TUezRVLm7P5SObDSOpz35z9aYuY7MSM9wg1rp7tEQNdjen9DNgb7k6RFtMeKv_Q2msCzgCF3gtJuif8U7xeO3nx9Yyge_BFeuKHX4TwO9fbjN56gA7raod6uB_fMFRzrD4NWUn9dr2ZoBsk7HV0bd8cXJv-ai4N3e6Q1hzdZnTAZJGGRWelLN701kh32C49QwlIw1QJ2l1FFzCggF_w2NlWuGnOCRVk75lSjVuhbMz',
        alt: 'Tools',
      },
    ],
    reviews: [
      {
        id: 'r1',
        rating: 5,
        text: 'Nhuộm tóc ở đây rất ưng, tiệm sạch sẽ thơm tho, stylist vui tính làm cực kỳ cẩn thận.',
        authorName: 'Thanh Hằng',
        authorRole: 'Khách quen',
        avatarSrc: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBFJtFcaE-MJ6CE9WfUGQ7JVY1XQMpF_Ll77zuLsM1WXZcsDkI2UmQetLkqlFPGMjVtD1kJw7yEJBa3GH_XOZb8yQyb7TK4E408UBFDR5ESEMPuZhPqzRiEkTpzWOmaz4dmiVV7XMNkpdq6lGk7Voivgm3kkvTHIPG9R0l3N80H8576YwpWqtsbdOT2lXYsHwCnsPQm_k_8MRYoykQmX-BqxOlH_Fg8xySl3fk7sLQe8uGlW6WzWbmN',
      },
    ],
    contact: {
      title: 'Tự tin thay đổi - Tỏa sáng rực rỡ',
      facebookCtaText: 'Inbox MessageCircle',
      callCtaText: 'Gọi salon',
      bookCtaText: 'Đặt lịch ngay',
    },
    seo: {
      title: 'SALON MINH ANH | Sáng Tạo Kiểu Tóc Thời Thượng',
      description: 'Nâng tầm phong cách cá nhân của bạn với những xu hướng tóc mới nhất thế giới, được chăm sóc tỉ mỉ bởi các chuyên gia giàu kinh nghiệm.',
    },
  },
};

export function getMockBusinessByPlaceId(placeId: string): DemoPageData {
  const normalized = placeId.toLowerCase().trim();
  if (mockDemoData[normalized]) {
    return mockDemoData[normalized];
  }
  // Fallback to luxe-studio if place id is not found (complying with instruction to render a default instead of showing a list/404)
  return mockDemoData['luxe-studio'];
}
