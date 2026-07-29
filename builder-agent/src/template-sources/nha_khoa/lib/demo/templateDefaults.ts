import { ServiceInfo, ReviewItem, GalleryItem } from '../../types/demo';

export const DENTAL_FALLBACK_IMAGES = {
  hero: "https://lh3.googleusercontent.com/aida-public/AB6AXuAk-iOjX7hK4plffHZzj8ASaQFzhddPr_aaWt7i03ssue5hYt1QpvinyqEhkKUFogh42t2d0DiFzslD71PHLjVLpEohBPjKb9SJlJk5tfLYOdnGeoM87NvPgR6TndGKWqqaEfx0xq9YkTWjoiWAh69X715ok1u4uTib2Dh0CILWq61Bf-gLwxKy9H4PaBH8QqBvV7kce---3fLXHI0sd0ljvOQsW6h80WxtmnXwa-VndeK2koskDB3bAA",
  gallery1: "https://lh3.googleusercontent.com/aida-public/AB6AXuAhbTGTxgPMvMAUo1yntDWBCnY9Bfjp8fTLYyjuXOCjuugwIqpRdPxGuqw1Cdo0eHHRLS8PxX38ztHke2VjNUZ6Iw7G4GWf_3i17cCkejZagqW--GClqasSaTPndNxtHQxx2bYOTSnVFtAUzUK6EF2wgfqPzw4mQ41FmdOm8WYafUTIoVHxVjufRllagKHpCxCcU97BA5WU9rKxWYH9L2w-iRUHtCLYuSsFWgI5foUxn8lxkEeq0Q8H7A",
  gallery2: "https://lh3.googleusercontent.com/aida-public/AB6AXuDfWJkL6rVYad9tEUo_4Le-XmUfapqISLZSY5K506V-qWsZAk1f-QnKPy6ql4cqVWVdccLS9At7OytCxDv8EhdPl0rPKOmx9KI1wR1dfvNN-ltpvGp484dcic4JIdY9tyCoyWOE3jtkTAIr6zU2--oQ84aXX5Yi0NsoZNG3U5UzTv8MGmX29N6CYobA8EipXfO5V038agCgMoUa8_Lv4FvG5-htyTWbOgDFDNWmVHy7ckAjN-MwXcAgaQ",
  gallery3: "https://lh3.googleusercontent.com/aida-public/AB6AXuDIEib7qRdSdZyWkPCESdCYAFzCgcHcI1ziuXF5y3BgGrelBLNJCN72yxzKlXt71vtVnioNUEl1rKR93VV7eUEbqT30zFEJDFpM8V76k4qi38DqY50ebaI6ar66gR2WMo18RkgrAgMS6p9P19relJu3aSdFAkZ6r75VdMhaPTf1fQOE60eHvvOBxWX1u988Il-M7FGtLLbQMJLowNq-i15LKMGZBvhALaK92m-WBipBNB8xZRJT2o45oQ"
};

export const DEFAULT_DENTAL_SERVICES: ServiceInfo[] = [
  {
    id: "consultation",
    title: "Khám và tư vấn nha khoa",
    description: "Kiểm tra định kỳ và đánh giá tình trạng răng miệng chi tiết bởi đội ngũ bác sĩ chuyên khoa.",
    iconName: "Stethoscope"
  },
  {
    id: "cleaning",
    title: "Cạo vôi và vệ sinh răng",
    description: "Loại bỏ mảng bám, ngăn ngừa các bệnh lý về nướu và viêm nhiễm nha chu định kỳ.",
    iconName: "Sparkles"
  },
  {
    id: "whitening",
    title: "Tẩy trắng răng chuyên sâu",
    description: "Mang lại nụ cười rạng rỡ với công nghệ Laser hiện đại không gây tổn thương men răng.",
    iconName: "Zap"
  },
  {
    id: "orthodontics",
    title: "Niềng răng thẩm mỹ",
    description: "Chỉnh nha chuyên sâu cho mọi lứa tuổi bằng phương pháp hiện đại, tối ưu khớp cắn.",
    iconName: "Smile"
  },
  {
    id: "porcelain",
    title: "Răng sứ thẩm mỹ",
    description: "Phục hình răng sứ chất lượng cao, mang lại độ bền chắc và thẩm mỹ tự nhiên tối đa.",
    iconName: "ShieldCheck"
  },
  {
    id: "treatment",
    title: "Điều trị răng đau & Nội nha",
    description: "Hỗ trợ khẩn cấp, khắc phục đau buốt triệt để với quy trình điều trị tủy vi phẫu êm ái.",
    iconName: "Activity"
  }
];

export const DEFAULT_DENTAL_REVIEWS: ReviewItem[] = [
  {
    id: "rev1",
    author: "Khách hàng Google",
    source: "Google",
    rating: 5,
    text: "Dịch vụ cực kỳ chu đáo và chuyên nghiệp. Phòng khám sạch sẽ khang trang, bác sĩ làm rất êm tay và tư vấn dễ hiểu.",
    date: "Vừa mới đây",
    serviceUsed: "Vệ sinh răng định kỳ"
  },
  {
    id: "rev2",
    author: "Khách hàng MessageCircle",
    source: "MessageCircle",
    rating: 5,
    text: "Mình làm răng sứ ở đây rất ưng ý. Màu sắc tự nhiên, ăn nhai thoải mái, bác sĩ hướng dẫn chăm sóc sau điều trị cực kỳ tận tình.",
    date: "1 tuần trước",
    serviceUsed: "Răng sứ thẩm mỹ"
  },
  {
    id: "rev3",
    author: "Khách hàng Google",
    source: "Google",
    rating: 5,
    text: "Trải nghiệm tẩy trắng răng tuyệt vời! Răng sáng lên rõ rệt, quy trình nhanh gọn, phòng khám hiện đại và an tâm tuyệt đối.",
    date: "2 tuần trước",
    serviceUsed: "Tẩy trắng răng"
  }
];

export const DEFAULT_DENTAL_GALLERY: GalleryItem[] = [
  {
    id: "gal1",
    image: {
      src: DENTAL_FALLBACK_IMAGES.gallery1,
      alt: "Phòng khám nha khoa hiện đại, trang thiết bị vô trùng tối tân"
    },
    caption: "Phòng khám điều trị vô trùng, hiện đại"
  },
  {
    id: "gal2",
    image: {
      src: DENTAL_FALLBACK_IMAGES.gallery2,
      alt: "Hệ thống máy móc chụp X-quang và chẩn đoán số hóa chuẩn xác"
    },
    caption: "Trang thiết bị chẩn đoán công nghệ cao"
  },
  {
    id: "gal3",
    image: {
      src: DENTAL_FALLBACK_IMAGES.gallery3,
      alt: "Đội ngũ nha sĩ và y tá tận tâm, thân thiện và giàu kinh nghiệm"
    },
    caption: "Đội ngũ chuyên môn phục vụ tận tình"
  }
];
