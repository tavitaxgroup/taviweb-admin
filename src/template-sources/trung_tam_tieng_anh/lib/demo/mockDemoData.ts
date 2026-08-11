import { DemoPageData } from '../../types/demo';
import { applyFallbackRules } from './fallbackRules';

export const MOCK_BUSINESSES: Record<string, Partial<DemoPageData>> = {
  'central-academy': {
    business: {
      id: 'central-academy',
      name: 'Central English Academy',
      phone: '1900 8888',
      email: 'contact@centralenglish.edu.vn',
      address: '72 Trần Hưng Đạo, Hoàn Kiếm, Hà Nội',
      MessageCircle: 'facebook.com/centralenglishacademy',
      rating: 4.9,
      followers: '85,000+',
      students: '12,500+',
    },
    template: {
      key: 'english-center',
      themeName: 'Academic Vitality',
    },
    hero: {
      title: 'Học Tiếng Anh Theo Lộ Trình - Bứt Phá Mục Tiêu Của Bạn',
      subtitle: 'Chương trình Anh ngữ chuẩn quốc tế cho người đi làm và học sinh chuẩn bị đi du học. Tối ưu lộ trình cá nhân hóa.',
      image: {
        src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3I9P6PwBcqB4ly6rl_v80yTX5oKc_gi49I-ZOtw-cACY8CiAjkAY_kDdI-hMde_8uoZe1D3qdBLaSzNifGqwj9K_5WnWeSmYcDlHAqkmvjjvieqz7kSHwFuYc_LjaAZrhYl_rqtBHorULv3YaYnbQhRY2jBFcZT8yCPeFElLeC2Gu8pD8g1AA10h1Q5XQ4WCImtpZ6ywzJ4ZJqOREjVmoxGCNfUoN-tM10qWQq17UoFDwCq6h6XRq',
        alt: 'Lớp học hiện đại tại Central English Academy',
      },
      primaryAction: {
        label: 'Đăng ký tư vấn',
        href: '#dang-ky-form',
      },
      secondaryAction: {
        label: 'Thi thử IELTS',
        href: '#dang-ky-form',
      },
    },
    services: [
      {
        id: 'c-s-1',
        title: 'Tiếng Anh giao tiếp công sở',
        description: 'Tập trung phản xạ tự nhiên, thuyết trình, đàm phán bằng tiếng Anh dành riêng cho người đi làm.',
        icon: 'MessageSquareText',
      },
      {
        id: 'c-s-2',
        title: 'Luyện thi IELTS cam kết 7.5+',
        description: 'Lộ trình luyện thi tinh gọn, chấm chữa 1-1 sát sao cùng đội ngũ Mentor 8.5 IELTS.',
        icon: 'GraduationCap',
      },
      {
        id: 'c-s-3',
        title: 'Luyện thi TOEIC cấp tốc',
        description: 'Học mẹo làm bài, mở rộng vốn từ vựng chuyên ngành kinh tế, cam kết tăng 200+ điểm.',
        icon: 'FileCheck2',
      },
      {
        id: 'c-s-4',
        title: 'Tư vấn lộ trình du học',
        description: 'Tư vấn hoàn thiện hồ sơ học thuật, luyện phỏng vấn visa và viết bài luận học bổng.',
        icon: 'Globe',
      },
      {
        id: 'c-s-5',
        title: 'Lớp gia sư nhóm nhỏ (1-4)',
        description: 'Học tương tác chuyên sâu, sửa lỗi phát âm và phản xạ trực tiếp với giáo viên bản xứ.',
        icon: 'Users',
      },
    ],
  },
  'bright-futures': {
    business: {
      id: 'bright-futures',
      name: 'Bright Futures English Kids',
      phone: '024 3322 9999',
      email: 'info@brightfutures.edu.vn',
      address: '102 Nguyễn Văn Cừ, Long Biên, Hà Nội',
      MessageCircle: 'facebook.com/brightfutureskids',
      rating: 4.8,
      followers: '32,000+',
      students: '4,200+',
    },
    template: {
      key: 'english-center',
      themeName: 'Academic Vitality',
    },
    hero: {
      title: 'Khơi Dậy Đam Mê Tiếng Anh Cho Trẻ Từ 4-15 Tuổi',
      subtitle: 'Học tiếng Anh qua dự án, trò chơi trí tuệ và phương pháp tư duy sáng tạo 21st Century Skills.',
      image: {
        src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAPtl9sVvEgNwWGx18vLhhLBS4VNCnUU5CVDxLdH4-TNx5-s0M1fIYIWv4CECedLnrs05M5h2N2-oyaW1TRRSd8maXqJ-Y8xdruzdZQw_O6Doui60jYjTpwG8MqJO5xGGQ_jTU8N7Hwbwo-GxPCjbZ86BjO3aPTuyHVVnpzfysLXF_CaOxU6xUIb0SzSvECuRGLNg9DPA0ah-OHSBa0i7XmZPd2IFCXcK6qOYP9GqSTGFNkloVT1QRz',
        alt: 'Trẻ vui học tiếng Anh tại Bright Futures',
      },
      primaryAction: {
        label: 'Đăng ký học thử miễn phí',
        href: '#dang-ky-form',
      },
      secondaryAction: {
        label: 'Tư vấn lộ trình',
        href: '#dang-ky-form',
      },
    },
    services: [
      {
        id: 'bf-s-1',
        title: 'Tiếng Anh mẫu giáo (4-6 tuổi)',
        description: 'Phát triển ngữ âm chuẩn tự nhiên, khơi gợi tình yêu ngôn ngữ thông qua bài hát và chuyện kể.',
        icon: 'Baby',
      },
      {
        id: 'bf-s-2',
        title: 'Tiếng Anh thiếu nhi (7-11 tuổi)',
        description: 'Xây dựng nền tảng vững chắc cả 4 kỹ năng, rèn luyện tư duy phản biện qua phương pháp STEAM.',
        icon: 'School',
      },
      {
        id: 'bf-s-3',
        title: 'Tiếng Anh thiếu niên (12-15 tuổi)',
        description: 'Luyện thi chứng chỉ Cambridge (KET, PET), tự tin thuyết trình và bảo vệ quan điểm cá nhân.',
        icon: 'GraduationCap',
      },
      {
        id: 'bf-s-4',
        title: 'Trại hè Anh ngữ Quốc tế',
        description: 'Trải nghiệm học tập thực tế, dã ngoại sinh thái kết hợp rèn luyện kỹ năng sinh tồn và làm việc nhóm.',
        icon: 'Sparkles',
      },
      {
        id: 'bf-s-5',
        title: 'Câu lạc bộ Debate tiếng Anh',
        description: 'Nơi các bạn trẻ rèn luyện tư duy tranh biện, rành mạch hóa ý kiến bằng tiếng Anh hàng tuần.',
        icon: 'MessageSquareText',
      },
    ],
  },
};

/**
 * Returns business details based on placeId, fallbacking to central-academy if not found
 */
export function getMockBusinessByPlaceId(placeId: string): DemoPageData {
  const customData = MOCK_BUSINESSES[placeId] || MOCK_BUSINESSES['central-academy'];
  return applyFallbackRules(customData);
}

/**
 * Fallback rules for any other unknown place ID
 */
export function getMockDemoData(placeId: string): DemoPageData {
  return getMockBusinessByPlaceId(placeId);
}
