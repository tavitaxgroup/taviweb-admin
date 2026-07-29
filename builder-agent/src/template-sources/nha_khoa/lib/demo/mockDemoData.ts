export interface RawBusinessData {
  placeId: string;
  name: string;
  phone?: string;
  address?: string;
  rating?: number;
  reviewCount?: number;
  area?: string;
  MessageCircle?: string;
  email?: string;
  logoUrl?: string;
  customServices?: { title: string; description: string; iconName: string }[];
  customReviews?: { author: string; text: string; rating: number; source: 'Google' | 'MessageCircle'; serviceUsed: string }[];
  customGallery?: string[];
}

export const mockBusinesses: Record<string, RawBusinessData> = {
  "lumina-dental": {
    placeId: "lumina-dental",
    name: "Nha Khoa Lumina",
    phone: "0901234567",
    address: "123 Đường Ba Tháng Hai, Phường 11, Quận 10, TP. Hồ Chí Minh",
    rating: 4.9,
    reviewCount: 312,
    area: "Quận 10",
    MessageCircle: "MessageCircle.com/luminadental",
    email: "contact@luminadental.vn",
    logoUrl: "",
    customServices: [
      {
        title: "Khám và tư vấn nha khoa",
        description: "Kiểm tra răng miệng định kỳ hoàn toàn miễn phí, chụp X-quang và lên phác đồ điều trị chi tiết cùng chuyên gia.",
        iconName: "Stethoscope"
      },
      {
        title: "Cạo vôi và vệ sinh răng",
        description: "Làm sạch mảng bám cứng đầu bằng công nghệ sóng siêu âm, bảo vệ nướu và phòng ngừa viêm lợi triệt để.",
        iconName: "Sparkles"
      },
      {
        title: "Tẩy trắng răng Laser",
        description: "Bật tông trắng sáng tự nhiên chỉ sau 45 phút với công nghệ Laser Whitening an toàn, không ê buốt.",
        iconName: "Zap"
      },
      {
        title: "Niềng răng thẩm mỹ",
        description: "Căn chỉnh khớp cắn bằng khay niềng trong suốt Invisalign hoặc mắc cài sứ cao cấp, tối ưu thẩm mỹ.",
        iconName: "Smile"
      },
      {
        title: "Răng sứ thẩm mỹ cao cấp",
        description: "Thiết kế dáng răng phong thủy bền đẹp tự nhiên, bảo hành chính hãng đến 15 năm.",
        iconName: "ShieldCheck"
      },
      {
        title: "Điều trị tủy & nội nha không đau",
        description: "Giải quyết dứt điểm các cơn đau nhức răng bằng phương pháp điều trị tủy vi phẫu tiên tiến.",
        iconName: "Activity"
      }
    ],
    customReviews: [
      {
        author: "Nguyễn Văn Hùng",
        text: "Dịch vụ ở đây rất tốt, bác sĩ tận tâm và không gian phòng khám cực kỳ sạch sẽ. Tôi cảm thấy rất an tâm khi làm răng tại đây.",
        rating: 5,
        source: "Google",
        serviceUsed: "Tẩy trắng răng"
      },
      {
        author: "Lê Thị Mai Chi",
        text: "Niềng răng là một hành trình dài nhưng đội ngũ Lumina đã hỗ trợ mình rất nhiệt tình. Rất hài lòng với kết quả hiện tại, răng đều và cười tự tin hẳn.",
        rating: 5,
        source: "MessageCircle",
        serviceUsed: "Niềng răng"
      },
      {
        author: "Trần Minh Quân",
        text: "Phòng khám hiện đại, máy móc mới tinh. Nhân viên lễ tân cũng rất nhẹ nhàng và chu đáo. Sẽ quay lại định kỳ để lấy cao răng.",
        rating: 5,
        source: "Google",
        serviceUsed: "Vệ sinh răng"
      }
    ],
    customGallery: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAk-iOjX7hK4plffHZzj8ASaQFzhddPr_aaWt7i03ssue5hYt1QpvinyqEhkKUFogh42t2d0DiFzslD71PHLjVLpEohBPjKb9SJlJk5tfLYOdnGeoM87NvPgR6TndGKWqqaEfx0xq9YkTWjoiWAh69X715ok1u4uTib2Dh0CILWq61Bf-gLwxKy9H4PaBH8QqBvV7kce---3fLXHI0sd0ljvOQsW6h80WxtmnXwa-VndeK2koskDB3bAA",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAhbTGTxgPMvMAUo1yntDWBCnY9Bfjp8fTLYyjuXOCjuugwIqpRdPxGuqw1Cdo0eHHRLS8PxX38ztHke2VjNUZ6Iw7G4GWf_3i17cCkejZagqW--GClqasSaTPndNxtHQxx2bYOTSnVFtAUzUK6EF2wgfqPzw4mQ41FmdOm8WYafUTIoVHxVjufRllagKHpCxCcU97BA5WU9rKxWYH9L2w-iRUHtCLYuSsFWgI5foUxn8lxkEeq0Q8H7A",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDIEib7qRdSdZyWkPCESdCYAFzCgcHcI1ziuXF5y3BgGrelBLNJCN72yxzKlXt71vtVnioNUEl1rKR93VV7eUEbqT30zFEJDFpM8V76k4qi38DqY50ebaI6ar66gR2WMo18RkgrAgMS6p9P19relJu3aSdFAkZ6r75VdMhaPTf1fQOE60eHvvOBxWX1u988Il-M7FGtLLbQMJLowNq-i15LKMGZBvhALaK92m-WBipBNB8xZRJT2o45oQ"
    ]
  },
  "minh-tam-dental": {
    placeId: "minh-tam-dental",
    name: "Nha Khoa Minh Tâm",
    phone: "0911223344",
    address: "456 Đường Trần Hưng Đạo, Phường 2, Quận 5, TP. Hồ Chí Minh",
    rating: 4.8,
    reviewCount: 185,
    area: "Quận 5",
    MessageCircle: "MessageCircle.com/nhakhoaminhtam",
    email: "info@nhakhoaminhtam.vn",
    logoUrl: "",
    customServices: [
      {
        title: "Tư vấn răng miệng tổng quát",
        description: "Khám tổng quát, phát hiện sâu răng, viêm lợi và các vấn đề về nướu sớm để ngăn ngừa biến chứng.",
        iconName: "Stethoscope"
      },
      {
        title: "Lấy cao răng & Thải độc nướu",
        description: "Vệ sinh mảng bám nướu kỹ lưỡng bằng công nghệ hiện đại, hạn chế ê buốt, đem lại hơi thở thơm mát.",
        iconName: "Sparkles"
      },
      {
        title: "Răng sứ Zirconia Thẩm mỹ",
        description: "Phục hình răng sứt, mẻ hoặc tối màu bằng dòng răng sứ cao cấp nhập khẩu từ Đức, bảo hành dài hạn.",
        iconName: "ShieldCheck"
      },
      {
        title: "Nhổ răng khôn không đau",
        description: "Sử dụng máy rung siêu âm Piezotome giúp nhổ răng khôn nhanh chóng, ít tổn thương, lành thương thần tốc.",
        iconName: "Zap"
      }
    ],
    customReviews: [
      {
        author: "Hoàng Anh Tuấn",
        text: "Bác sĩ nhổ răng khôn rất êm, về nhà không bị sưng đau nhiều như lần trước nhổ ở nơi khác. Rất hài lòng về tay nghề của phòng khám.",
        rating: 5,
        source: "Google",
        serviceUsed: "Nhổ răng khôn"
      },
      {
        author: "Phạm Minh Hạnh",
        text: "Không gian sạch sẽ, dụng cụ được tiệt trùng kỹ trước mặt khách. Nhân viên tư vấn đúng tình trạng, không chèo kéo làm thêm dịch vụ phụ.",
        rating: 5,
        source: "Google",
        serviceUsed: "Khám tổng quát"
      }
    ],
    customGallery: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDfWJkL6rVYad9tEUo_4Le-XmUfapqISLZSY5K506V-qWsZAk1f-QnKPy6ql4cqVWVdccLS9At7OytCxDv8EhdPl0rPKOmx9KI1wR1dfvNN-ltpvGp484dcic4JIdY9tyCoyWOE3jtkTAIr6zU2--oQ84aXX5Yi0NsoZNG3U5UzTv8MGmX29N6CYobA8EipXfO5V038agCgMoUa8_Lv4FvG5-htyTWbOgDFDNWmVHy7ckAjN-MwXcAgaQ",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAk-iOjX7hK4plffHZzj8ASaQFzhddPr_aaWt7i03ssue5hYt1QpvinyqEhkKUFogh42t2d0DiFzslD71PHLjVLpEohBPjKb9SJlJk5tfLYOdnGeoM87NvPgR6TndGKWqqaEfx0xq9YkTWjoiWAh69X715ok1u4uTib2Dh0CILWq61Bf-gLwxKy9H4PaBH8QqBvV7kce---3fLXHI0sd0ljvOQsW6h80WxtmnXwa-VndeK2koskDB3bAA",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDIEib7qRdSdZyWkPCESdCYAFzCgcHcI1ziuXF5y3BgGrelBLNJCN72yxzKlXt71vtVnioNUEl1rKR93VV7eUEbqT30zFEJDFpM8V76k4qi38DqY50ebaI6ar66gR2WMo18RkgrAgMS6p9P19relJu3aSdFAkZ6r75VdMhaPTf1fQOE60eHvvOBxWX1u988Il-M7FGtLLbQMJLowNq-i15LKMGZBvhALaK92m-WBipBNB8xZRJT2o45oQ"
    ]
  }
};

export function getMockBusinessByPlaceId(placeId: string): RawBusinessData | undefined {
  return mockBusinesses[placeId];
}

export function getMockDemoData(placeId: string): RawBusinessData {
  // Returns specific business or falls back to standard "lumina-dental"
  return mockBusinesses[placeId] || mockBusinesses["lumina-dental"];
}
