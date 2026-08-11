import { RawBusinessData } from './mockDemoData';
import { DemoPageData, ServiceInfo, ReviewItem, GalleryItem } from '../../types/demo';
import { DEFAULT_DENTAL_SERVICES, DEFAULT_DENTAL_REVIEWS, DEFAULT_DENTAL_GALLERY, DENTAL_FALLBACK_IMAGES } from './templateDefaults';
import { resolvePhoneAction, resolveMapAction } from './fallbackRules';
import { generateSeoData } from './seo';

export function buildDemoPageData(raw: RawBusinessData): DemoPageData {
  const ratingVal = raw.rating || 4.9;
  const reviewsCount = raw.reviewCount || 120;
  const areaName = raw.area || "TP. Hồ Chí Minh";

  // Build services
  const services: ServiceInfo[] = raw.customServices && raw.customServices.length > 0
    ? raw.customServices.map((s, index) => ({
        id: `svc-${index}`,
        title: s.title,
        description: s.description,
        iconName: s.iconName
      }))
    : DEFAULT_DENTAL_SERVICES;

  // Build reviews
  const reviews: ReviewItem[] = raw.customReviews && raw.customReviews.length > 0
    ? raw.customReviews.map((r, index) => ({
        id: `rev-${index}`,
        author: r.author,
        source: r.source,
        rating: r.rating,
        text: r.text,
        date: "Khách hàng chia sẻ",
        serviceUsed: r.serviceUsed
      }))
    : DEFAULT_DENTAL_REVIEWS;

  // Build gallery
  const gallery: GalleryItem[] = raw.customGallery && raw.customGallery.length > 0
    ? raw.customGallery.map((imgUrl, index) => ({
        id: `gal-${index}`,
        image: {
          src: imgUrl,
          alt: `Không gian và trang thiết bị khám chữa bệnh tại ${raw.name}`
        },
        caption: index === 0 ? "Phòng điều trị hiện đại" : index === 1 ? "Hệ thống chẩn đoán tiên tiến" : "Đội ngũ chuyên nghiệp"
      }))
    : DEFAULT_DENTAL_GALLERY;

  return {
    business: {
      placeId: raw.placeId,
      name: raw.name,
      phone: raw.phone,
      address: raw.address,
      rating: ratingVal,
      reviewCount: reviewsCount,
      area: areaName,
      logoUrl: raw.logoUrl || ""
    },
    template: {
      key: "dental",
      name: "Dental Premium Template",
      theme: "clinical-warmth"
    },
    hero: {
      badge: `⭐ ${ratingVal.toFixed(1)} Google Rating`,
      title: "Nụ Cười Khỏe Đẹp Bắt Đầu Từ Một Lịch Hẹn Rõ Ràng",
      subtitle: `Trải nghiệm dịch vụ nha khoa chuẩn quốc tế với công nghệ hiện đại và không gian thư giãn. Chúng tôi cam kết mang lại vẻ đẹp tự nhiên và sự tự tin cho nụ cười của bạn.`,
      image: {
        src: raw.customGallery?.[0] || DENTAL_FALLBACK_IMAGES.hero,
        alt: `Không gian đón khách và lễ tân tại phòng khám nha khoa ${raw.name}`
      },
      primaryAction: {
        label: "Đặt lịch tư vấn",
        href: "#contact",
        type: "primary"
      },
      secondaryAction: resolveMapAction(raw.address)
    },
    trust: {
      metrics: [
        { value: `${ratingVal.toFixed(1)}`, label: "ON GOOGLE" },
        { value: `${reviewsCount}+`, label: "REVIEWS" },
        { value: "5,000+", label: "MessageCircle FOLLOWERS" }
      ],
      ratingText: `${ratingVal.toFixed(1)} Google Rating`,
      reviewCountText: `${reviewsCount}+ đánh giá tích cực`
    },
    about: {
      badge: "Về Chúng Tôi",
      title: "Chăm sóc bằng y đức - Điều trị bằng công nghệ",
      subtitle: "Kiến tạo nụ cười tự nhiên, khỏe mạnh bền vững cho cả gia đình.",
      description: `Tại ${raw.name}, mỗi ca điều trị đều được trực tiếp thực hiện bởi các bác sĩ giàu kinh nghiệm. Chúng tôi sử dụng vật liệu nha khoa chính hãng cao cấp, quy trình vô trùng khép kín tuyệt đối để mang lại kết quả hoàn hảo và sự an tâm trọn vẹn.`,
      image: {
        src: raw.customGallery?.[1] || DENTAL_FALLBACK_IMAGES.gallery2,
        alt: `Hệ thống thiết bị máy móc nội nha công nghệ cao tại ${raw.name}`
      },
      features: [
        "Đội ngũ bác sĩ chuyên môn giàu y đức",
        "Trang thiết bị chẩn đoán hình ảnh 3D chuẩn xác",
        "Hỗ trợ bảo hành dịch vụ sứ thẩm mỹ dài hạn",
        "Tư vấn đúng bệnh, chi phí minh bạch rõ ràng"
      ]
    },
    services,
    gallery,
    reviews,
    contact: {
      title: "Sẵn Sàng Cho Một Nụ Cười Mới?",
      subtitle: "Để lại lời nhắn hoặc liên hệ hotline để nhận lịch hẹn khám miễn phí cùng bác sĩ chuyên khoa.",
      phone: raw.phone,
      email: raw.email,
      address: raw.address,
      MessageCircle: raw.MessageCircle,
      primaryAction: resolvePhoneAction(raw.phone, raw.MessageCircle, raw.email),
      secondaryAction: resolveMapAction(raw.address)
    },
    seo: generateSeoData(raw.name, areaName)
  };
}
