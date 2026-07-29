import { RawBusinessData } from './mockDemoData';
import { DemoPageData } from '../../types/demo';

export function buildDemoPageData(business: RawBusinessData): DemoPageData {
  return {
    business: {
      name: business.name || 'Wedding Studio',
      phone: business.phone,
      email: business.email,
      address: business.address,
      MessageCircle: business.MessageCircle,
      logoUrl: business.logoUrl
    },
    template: {
      key: business.templateKey || 'wedding-studio'
    },
    hero: {
      title: business.heroTitle || 'Lưu Giữ Khoảnh Khắc Hạnh Phúc',
      subtitle: business.heroSubtitle || 'Studio chụp ảnh cưới chuyên nghiệp, mang đến những câu chuyện tình yêu tinh tế và lãng mạn qua ống kính.',
      image: {
        src: business.heroImageSrc || 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop',
        alt: business.heroImageAlt || 'Wedding photo'
      },
      primaryAction: {
        label: business.contactPrimaryLabel || 'ĐẶT LỊCH TƯ VẤN',
        href: '#contact-cta'
      }
    },
    trust: {
      facebookFollowers: business.facebookFollowers || 'Hơn 10,000 người theo dõi trên Facebook',
      ratingText: business.ratingText || 'Đánh giá 5 sao từ các cặp đôi',
      ratingValue: business.ratingValue ?? 5
    },
    about: {
      badge: business.aboutBadge || 'OUR CRAFT',
      title: business.aboutTitle || 'Dịch Vụ Nghệ Thuật Cưới',
      description: business.aboutDescription || 'Chúng tôi tự hào là người đồng hành đáng tin cậy trên hành trình lưu giữ những kỉ niệm đẹp nhất đời người của bạn.',
      image: {
        src: business.aboutImageSrc || 'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?q=80&w=1200&auto=format&fit=crop',
        alt: business.aboutImageAlt || 'Wedding preparation'
      }
    },
    services: (business.services || []).map((service, index) => ({
      id: `service-${index}`,
      title: service.title,
      description: service.description,
      iconName: service.iconName
    })),
    whyChooseUs: {
      badge: business.whyChooseUsBadge || 'OUR PHILOSOPHY',
      title: business.whyChooseUsTitle || 'Tại sao chọn chúng tôi',
      items: (business.whyChooseUsItems || []).map((item) => ({
        title: item.title,
        description: item.description
      }))
    },
    gallery: (business.gallery || []).map((item, index) => ({
      id: `gallery-${index}`,
      image: {
        src: item.imageSrc,
        alt: item.imageAlt
      },
      category: item.category
    })),
    reviews: (business.reviews || []).map((review, index) => ({
      id: `review-${index}`,
      quote: review.quote,
      author: review.author,
      date: review.date,
      rating: review.rating
    })),
    contact: {
      title: business.contactTitle || 'Bắt đầu hành trình lưu giữ kỉ niệm',
      description: business.contactDescription || 'Đội ngũ của chúng tôi luôn sẵn sàng hỗ trợ bạn lên concept cưới lãng mạn và tinh tế nhất.',
      primaryAction: {
        label: business.contactPrimaryLabel || 'ĐẶT LỊCH TƯ VẤN',
        href: '#contact-cta'
      },
      secondaryAction: business.MessageCircle ? {
        label: business.contactSecondaryLabel?.replace(/MessageCircle/g, 'Facebook') || 'LIÊN HỆ FACEBOOK',
        href: business.MessageCircle
      } : undefined
    },
    seo: {
      title: `${business.name} | Studio Chụp Ảnh Cưới Chuyên Nghiệp & Tinh Tế`,
      description: business.heroSubtitle || 'Lưu giữ khoảnh khắc cưới trọn vẹn tinh tế.'
    }
  };
}
