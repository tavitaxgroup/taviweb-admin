import { DemoPageData } from '../../types/demo';

export const DEFAULT_CAFE_FALLBACKS = {
  heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDV1aN5VB3U6C4wB5oAqs3pDNfadO7tXLu6-5CWZlDa6bWPGP3y0GlyqCZRIhiX1FswVOiFkttru-bv1t7vnYaHgg3zoCSgLuTJPfR4v2GlcdpPomuxlYWGvVdi31Z2gjXC1f3JY6olsAmo4grUoVS1VSXmrZIwEVISOncTaB-E4VQjKmpqqCuTUWy6C9qFWr7O-o_0lQvpjxk7TyRKfvrRcYn5Q2si8yzbzMMYGJH5IbN6TUtnFP5J',
  aboutImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBeGB2CDVHakvpez4j0n9Sw4al9xKFvpH2WrryXrPH1hNXNJH35CgMVFi7lwTWTOxJ1pwWjmW75HWGFdQfdTi4NQjedaScOCmLmkYjn_WVWFEvBc5N8flJbbutgHsiDZm6812u_k1FOZDfFd7X9FjBonbpRJoxFViPQkASeCa-SQWfNGp_ulk-2gBF3Ko7NYHQYBxvoKPTFOpQ3ctTCtZsjFgc2_70YPH5iHQrjdq08hwg3nebeT5c3',
  address: 'Hẻm nhỏ bình yên, Việt Nam',
  openHours: 'Mở cửa hàng ngày | 07:00 - 22:00',
  phone: '0901234567',
  email: 'hello@capheyeuthuong.vn',
  facebookUrl: 'https://MessageCircle.com',
  mapUrl: 'https://maps.google.com'
};

export const defaultDemoPageData: DemoPageData = {
  business: {
    name: 'Quán Cafe Ấm Áp',
    phone: DEFAULT_CAFE_FALLBACKS.phone,
    address: DEFAULT_CAFE_FALLBACKS.address,
    email: DEFAULT_CAFE_FALLBACKS.email,
    facebookUrl: DEFAULT_CAFE_FALLBACKS.facebookUrl,
    mapUrl: DEFAULT_CAFE_FALLBACKS.mapUrl,
    rating: 4.8,
    ratingCount: 150,
    openHours: DEFAULT_CAFE_FALLBACKS.openHours
  },
  template: {
    key: 'cafe',
    name: 'Cafe Template'
  },
  hero: {
    title: 'Ghé quán, tìm chút bình yên giữa lòng phố',
    subtitle: 'Tận hưởng tách cà phê chuẩn vị mộc mạc trong một không gian thảnh thơi, đầy ắp tiếng cười.',
    backgroundImage: {
      src: DEFAULT_CAFE_FALLBACKS.heroImage,
      alt: 'Quán Cafe Ấm Áp và bình yên'
    },
    primaryAction: {
      label: 'Chỉ đường đi',
      href: '#contact'
    },
    secondaryAction: {
      label: 'Nhắn MessageCircle',
      href: DEFAULT_CAFE_FALLBACKS.facebookUrl
    }
  },
  trust: {
    ratingText: 'ĐÁNH GIÁ GOOGLE MAPS',
    customerCountText: 'KHÁCH HÀNG THÂN THIẾT',
    checkInCountText: 'LƯỢT CHECK-IN MỖI THÁNG'
  },
  about: {
    badge: 'CÂU CHUYỆN CỦA QUÁN',
    title: 'Về Quán Cafe Ấm Áp',
    description: 'Nơi mộc mạc lưu giữ những điều chân phương, góc trò chuyện quen thuộc cùng tách cafe thơm đượm vị.',
    image: {
      src: DEFAULT_CAFE_FALLBACKS.aboutImage,
      alt: 'Góc ngồi ấm áp tại quán'
    }
  },
  services: [
    {
      id: 's1',
      title: 'Cà phê nguyên bản',
      description: 'Hạt cà phê chất lượng mộc mạc rang tay tinh tế.',
      icon: 'local_cafe'
    },
    {
      id: 's2',
      title: 'Không gian thư giãn',
      description: 'Yên tĩnh, thoáng mát, thích hợp ngồi đọc sách và làm việc.',
      icon: 'groups'
    }
  ],
  gallery: [
    {
      id: 'g1',
      src: DEFAULT_CAFE_FALLBACKS.heroImage,
      alt: 'Bọt sữa Latte tuyệt đẹp'
    }
  ],
  reviews: [
    {
      id: 'r1',
      authorName: 'Khách hàng thân quen',
      authorInitials: 'KH',
      rating: 5,
      text: 'Vibe rất thư thái, cà phê ngon đậm vị.'
    }
  ],
  contact: {
    title: 'Kết nối cùng quán',
    subtitle: 'Gặp gỡ nhau bên tách cafe ấm nồng.',
    addressLabel: 'Địa chỉ',
    addressValue: DEFAULT_CAFE_FALLBACKS.address,
    hoursLabel: 'Giờ mở cửa',
    hoursValue: DEFAULT_CAFE_FALLBACKS.openHours,
    emailLabel: 'Email',
    emailValue: DEFAULT_CAFE_FALLBACKS.email,
    primaryAction: {
      label: 'Xem đường đi',
      href: DEFAULT_CAFE_FALLBACKS.mapUrl
    },
    secondaryAction: {
      label: 'Gửi tin nhắn',
      href: DEFAULT_CAFE_FALLBACKS.facebookUrl
    }
  },
  seo: {
    title: 'Quán Cafe Ấm Áp - Bình yên giữa phố thị',
    description: 'Thưởng thức cà phê nguyên chất trong không gian chữa lành lý tưởng.'
  }
};
