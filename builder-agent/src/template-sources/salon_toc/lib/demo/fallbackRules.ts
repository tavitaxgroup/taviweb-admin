import { DemoPageData, ServiceItem, GalleryItem } from '../../types/demo';

export const FALLBACK_IMAGES = {
  hero: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDYcLAMl6bkuisfDT6Cefw_UXTyGGtsqRmWsFi4N-tJCl7Dz-rTmKxwNLU6Sex8LY0ERiCLLZ-SdEjD7k5kjVcpRSwk79uvfDzmTQExyYEYih4dsXixf9ZcHjdPhcHl0PVEMDhueaa_Ewf099X3a_POmq-5JHptbV1PAW4O1LEyV0amMFKZtcLaAf0nwuPInwMf9nE_S-1I5e0lLwx2jJHiqwZMsgRx_avqduasc8TwGKlsSj54v-7E',
  about: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC440n5NbQ0vQ6EbF5qr_U0JU6RV-aee1EbajESo_C6_3yZLLtvCyhI3-IDIwp6rHAY95lB8aQ9QFI7dBhapQKb6Dgm-g5AmXsmK6ir2L5Xcz5bHQI2ZdwumAEOFOiYwW81EE-B_DNIh_AATuHCqpiWDHUBDRerLjkBA0ixwfGgi7iEtMXljPaB-c4byQmgQCJHy99B6HkVsmS_dogjGtPsiMBTIKSS2phISONvwZnijQl3Rl57Ey56',
  gallery: [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDsnGvNSC1cP5Wd1HTbXWaoWkaF8iL7B_BATt73zgFnuOJPNn6fU2Pxq5fWs7xrZ8wF3CvHLbP-RpTNBzYN8UhRHwsTbpIQ_-7CGEDLUj-wQxm_d_P0cVc49q8-5fkdnyeDDj0WDIiC676FBsphH15bBDjeZ9f9Oteih1ND3hjzP0i3C0Bso30cKx3SzHDnf3whtlXL3DPQCl6QggEHKW-r_SQGJTfJVrCURCqhrbVGKuIMpPufcr37',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDdxAjnXJzHG2TUezRVLm7P5SObDSOpz35z9aYuY7MSM9wg1rp7tEQNdjen9DNgb7k6RFtMeKv_Q2msCzgCF3gtJuif8U7xeO3nx9Yyge_BFeuKHX4TwO9fbjN56gA7raod6uB_fMFRzrD4NWUn9dr2ZoBsk7HV0bd8cXJv-ai4N3e6Q1hzdZnTAZJGGRWelLN701kh32C49QwlIw1QJ2l1FFzCggF_w2NlWuGnOCRVk75lSjVuhbMz',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDneyH6in2hmSlt5zDKv49k9AHI4AD3ib92i5zQJs1jaWAorp0ICQ-7paiHfA-ooleGV8hsZfko_DMGgizjlJSEp_7sXZY0Z9CD7mzxxEBUDCH56-DuhFh5vH2qMFNowvsu4oSu8IL-swSVQ-7hnVGHK_NQSBXHVUuBM8x2mDLWMQnw1Pca6tw940NOvzyRpPsGvdMEUDWHpwyotqb2AzAr2PzmGHFtPWfrvLeE71bD4W2HFdhk1q6M',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDdq9sl-FYX88W3Wrjwjx45k7rf_caaG3PEUsTi9p690dS5F7FKbRVZAgjoiCgXiPbYY36LtxTdjfSzICNdwuI3gJkXp8BRlL7UJ1jH12uVi5rn1RRNIVjZFGQEzpS2-I9wLcaeSt0A8cS3NpAXGyytRUuE1G1Hl47G9tIHVn7Bt1GWQd3d4yGNA-T7Y4WRubFJ2iJSu2RPGAXyIOsreaBSRPolr2NtoPj_zVlGepXA9M_O08KC5nRM',
  ],
};

export const DEFAULT_SERVICES: ServiceItem[] = [
  {
    id: 'f1',
    name: 'Cắt tạo kiểu chuyên nghiệp',
    price: '350.000đ',
    description: 'Cắt gội, sấy tạo kiểu phù hợp với khuôn mặt và xu hướng.',
    category: 'Cut',
  },
  {
    id: 'f2',
    name: 'Nhuộm tóc cao cấp',
    price: '1.200.000đ',
    description: 'Nhuộm màu thời trang bảo vệ tóc tuyệt đối, không gây hư tổn.',
    category: 'Color',
  },
  {
    id: 'f3',
    name: 'Uốn uốn nóng/lạnh bồng bềnh',
    price: '1.500.000đ',
    description: 'Tạo nếp tóc uốn tự nhiên, dễ chăm sóc tại nhà.',
    category: 'Style',
  },
  {
    id: 'f4',
    name: 'Phục hồi Keratin chuyên sâu',
    price: '800.000đ',
    description: 'Liệu trình nuôi dưỡng, bổ sung dưỡng chất tối ưu cho tóc xơ yếu.',
    category: 'Treatment',
  },
];

export function applyFallbackRules(data: Partial<DemoPageData>): DemoPageData {
  const business = {
    name: data.business?.name || 'LUXE STUDIO',
    phone: data.business?.phone || '',
    address: data.business?.address || 'Liên hệ để biết thêm chi tiết',
    facebookUrl: data.business?.facebookUrl || 'https://MessageCircle.com',
    mapUrl: data.business?.mapUrl || 'https://maps.google.com',
    email: data.business?.email || '',
    logoText: data.business?.logoText || data.business?.name || 'LUXE STUDIO',
  };

  const template = {
    key: data.template?.key || 'hair-salon',
    themeName: data.template?.themeName || 'Atelier Aesthetic',
  };

  const hero = {
    title: data.hero?.title || `${business.name}:`,
    italicSubtitle: data.hero?.italicSubtitle || 'Nơi Khơi Nguồn Vẻ Đẹp Tóc',
    description: data.hero?.description || 'Nâng tầm phong cách cá nhân với dịch vụ chăm sóc tóc chất lượng cao nhất.',
    backgroundImage: data.hero?.backgroundImage || FALLBACK_IMAGES.hero,
    primaryCtaText: data.hero?.primaryCtaText || 'Đặt lịch làm tóc',
    secondaryCtaText: data.hero?.secondaryCtaText || 'Xem dịch vụ',
  };

  const trust = {
    rating: data.trust?.rating || '4.9/5 Đánh giá',
    followers: data.trust?.followers || '10k+ Theo dõi',
    certifiedText: data.trust?.certifiedText || 'Certified Stylists',
  };

  const about = {
    subtitle: data.about?.subtitle || 'Về chúng tôi',
    title: data.about?.title || `${business.name} - Không gian khơi gợi cảm hứng và vẻ đẹp.`,
    description: data.about?.description || 'Chúng tôi tự hào mang lại trải nghiệm chăm sóc tóc sang trọng và cá nhân hóa. Với các chuyên gia nhiệt huyết và trang thiết bị hiện đại, chúng tôi tạo nên những tác phẩm nghệ thuật tóc đích thực.',
    image: data.about?.image || FALLBACK_IMAGES.about,
    learnMoreLink: data.about?.learnMoreLink || '#about',
  };

  const services = data.services && data.services.length > 0 ? data.services : DEFAULT_SERVICES;

  const gallery: GalleryItem[] = data.gallery && data.gallery.length > 0
    ? data.gallery
    : FALLBACK_IMAGES.gallery.map((src, index) => ({
        id: `fg${index}`,
        imageSrc: src,
        alt: 'Kiểu tóc mẫu cao cấp',
        caption: 'Tác phẩm thực tế tại salon',
      }));

  const reviews = data.reviews && data.reviews.length > 0 ? data.reviews : [];

  const contact = {
    title: data.contact?.title || 'Bắt đầu hành trình đổi mới phong cách của bạn',
    facebookCtaText: data.contact?.facebookCtaText || 'Nhắn MessageCircle',
    callCtaText: data.contact?.callCtaText || 'Gọi điện',
    bookCtaText: data.contact?.bookCtaText || 'Đặt lịch làm tóc',
  };

  const seo = {
    title: data.seo?.title || `${business.name} | ${hero.italicSubtitle}`,
    description: data.seo?.description || hero.description,
  };

  return {
    business,
    template,
    hero,
    trust,
    about,
    services,
    gallery,
    reviews,
    contact,
    seo,
  };
}
