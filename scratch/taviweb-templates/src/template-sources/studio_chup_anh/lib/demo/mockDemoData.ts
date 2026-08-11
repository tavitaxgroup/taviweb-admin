import { DemoPageData } from '../../types/demo';

export interface RawBusinessData {
  placeId: string;
  name: string;
  phone?: string;
  email?: string;
  address?: string;
  MessageCircle?: string;
  logoUrl?: string;
  templateKey: string;
  // Hero
  heroTitle?: string;
  heroSubtitle?: string;
  heroImageSrc?: string;
  heroImageAlt?: string;
  // Trust
  facebookFollowers?: string;
  ratingText?: string;
  ratingValue?: number;
  // About
  aboutBadge?: string;
  aboutTitle?: string;
  aboutDescription?: string;
  aboutImageSrc?: string;
  aboutImageAlt?: string;
  // Services
  services?: {
    title: string;
    description: string;
    iconName: string;
  }[];
  // Gallery
  gallery?: {
    imageSrc: string;
    imageAlt: string;
    category: string;
  }[];
  // Why Choose Us
  whyChooseUsBadge?: string;
  whyChooseUsTitle?: string;
  whyChooseUsItems?: {
    title: string;
    description: string;
  }[];
  // Reviews
  reviews?: {
    quote: string;
    author: string;
    date: string;
    rating: number;
  }[];
  // Contact CTA
  contactTitle?: string;
  contactDescription?: string;
  contactPrimaryLabel?: string;
  contactSecondaryLabel?: string;
}

export const mockBusinesses: Record<string, RawBusinessData> = {
  'aura-weddings': {
    placeId: 'aura-weddings',
    name: 'Aura Weddings',
    phone: '0900 123 456',
    email: 'hello@auraweddings.vn',
    address: '123 Đường Hồ Văn Huê, Quận Phú Nhuận, TP. Hồ Chí Minh',
    MessageCircle: 'https://facebook.com/auraweddings',
    logoUrl: 'Aura Weddings',
    templateKey: 'wedding-studio',
    
    // Hero
    heroTitle: 'Lưu Giữ Khoảnh Khắc Vĩnh Cửu',
    heroSubtitle: 'Studio chụp ảnh cưới chuyên nghiệp, mang đến những bộ ảnh đậm chất riêng và tinh tế cho ngày trọng đại của bạn.',
    heroImageSrc: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop',
    heroImageAlt: 'Lễ đường tiệc cưới ngập tràn ánh đèn lãng mạn',
    
    // Trust
    facebookFollowers: 'Hơn 50,000 người theo dõi trên Facebook',
    ratingText: 'Đánh giá 5 sao từ +1000 cặp đôi',
    ratingValue: 5,
    
    // About
    aboutBadge: 'OUR CRAFT',
    aboutTitle: 'Dịch Vụ Nghệ Thuật Tại Aura',
    aboutDescription: 'Tại Aura Weddings, chúng tôi không chỉ chụp ảnh, chúng tôi lưu lại cảm xúc và những chương hạnh phúc nhất trong cuộc đời bạn. Mỗi concept đều được may đo riêng, đồng hành tỉ mỉ từ khâu lên ý tưởng đến khi album hoàn thiện cầm trên tay.',
    aboutImageSrc: 'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?q=80&w=1200&auto=format&fit=crop',
    aboutImageAlt: 'Chi tiết chiếc váy cưới lộng lẫy treo trong phòng chuẩn bị',

    // Services
    services: [
      {
        title: 'Chụp ảnh cưới',
        description: 'Indoor/Outdoor với phong cách ánh sáng tự nhiên và góc máy điện ảnh.',
        iconName: 'Camera'
      },
      {
        title: 'Trang phục',
        description: 'Bộ sưu tập Váy & Vest cao cấp nhập khẩu từ các thương hiệu hàng đầu.',
        iconName: 'Shirt'
      },
      {
        title: 'Makeup',
        description: 'Phong cách trang điểm tự nhiên, sang trọng tôn vinh nét đẹp sẵn có của cô dâu.',
        iconName: 'Sparkles'
      },
      {
        title: 'Album cưới',
        description: 'Sản phẩm in ấn chất lượng cao, chất liệu giấy cao cấp bền màu theo thời gian.',
        iconName: 'BookOpen'
      },
      {
        title: 'Concept',
        description: 'Cá nhân hóa câu chuyện tình yêu độc bản qua từng khung hình sắp đặt.',
        iconName: 'Palette'
      }
    ],

    // Why Choose Us
    whyChooseUsBadge: 'WHY AURA',
    whyChooseUsTitle: 'Cam Kết Vàng Cho Ngày Trọng Đại',
    whyChooseUsItems: [
      {
        title: 'TƯ VẤN CONCEPT ĐỘC BẢN',
        description: 'Ý tưởng được phát triển dựa trên hành trình tình yêu chân thật của từng cặp đôi.'
      },
      {
        title: 'ĐỒNG HÀNH TRỌN VẸN NGÀY CƯỚI',
        description: 'Đội ngũ chuyên nghiệp tận tâm luôn bên cạnh hỗ trợ cô dâu chú rể mọi lúc.'
      },
      {
        title: 'CHỈNH CHU TRONG TỪNG KHUNG HÌNH',
        description: 'Từng bức ảnh đều trải qua quá trình hậu kỳ tỉ mỉ để đạt được chất màu nghệ thuật hoàn mỹ nhất.'
      }
    ],

    // Gallery
    gallery: [
      {
        imageSrc: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop',
        imageAlt: 'Không gian tiệc cưới lung linh ngoài trời',
        category: 'Trang trí'
      },
      {
        imageSrc: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=800&auto=format&fit=crop',
        imageAlt: 'Cặp nhẫn cưới tinh tế đặt trên thiệp mời handmade',
        category: 'Chi tiết'
      },
      {
        imageSrc: 'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?q=80&w=900&auto=format&fit=crop',
        imageAlt: 'Váy cưới cô dâu thướt tha bên ô cửa sổ đầy nắng',
        category: 'Váy cưới'
      },
      {
        imageSrc: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=800&auto=format&fit=crop',
        imageAlt: 'Bàn tiệc cưới decor sang trọng với hoa tươi',
        category: 'Tiệc cưới'
      },
      {
        imageSrc: 'https://images.unsplash.com/photo-1546842931-886c185b4c8c?q=80&w=800&auto=format&fit=crop',
        imageAlt: 'Bó hoa cầm tay cô dâu với tone màu blush nhẹ nhàng',
        category: 'Bó hoa'
      }
    ],

    // Reviews
    reviews: [
      {
        quote: 'Aura đã giúp chúng mình hiện thực hóa giấc mơ về một bộ ảnh cưới nhẹ nhàng nhưng cực kỳ tinh tế. Từng khung hình đều chứa đựng cảm xúc chân thật nhất.',
        author: 'MINH & THỦY',
        date: 'Tháng 12, 2023',
        rating: 5
      },
      {
        quote: 'Sự chuyên nghiệp và tận tâm của ê-kíp làm mình hoàn toàn yên tâm. Váy cưới ở đây thực sự đẳng cấp và tôn dáng vô cùng.',
        author: 'HOÀNG & LAN',
        date: 'Tháng 02, 2024',
        rating: 5
      },
      {
        quote: 'Không chỉ là ảnh cưới, Aura còn tư vấn cho chúng mình một concept kể lại hành trình 5 năm yêu nhau một cách trọn vẹn nhất.',
        author: 'ĐỨC & HẠNH',
        date: 'Tháng 05, 2024',
        rating: 5
      }
    ],

    // Contact CTA
    contactTitle: 'Bắt đầu hành trình lưu giữ kỉ niệm',
    contactDescription: 'Hãy để Aura Wedding Studio cùng bạn viết tiếp chương mới của cuộc đời bằng những thước phim và hình ảnh đầy nghệ thuật.',
    contactPrimaryLabel: 'ĐẶT LỊCH TƯ VẤN',
    contactSecondaryLabel: 'LIÊN HỆ FACEBOOK'
  }
};

export function getMockBusinessByPlaceId(placeId: string): RawBusinessData | undefined {
  return mockBusinesses[placeId];
}

export function getDefaultBusiness(): RawBusinessData {
  return mockBusinesses['aura-weddings'];
}
