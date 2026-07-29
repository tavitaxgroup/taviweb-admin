import { DemoPageData } from "../../types/demo";

export const defaultGymFitnessData: DemoPageData = {
  business: {
    name: "ELITE STRENGTH GYM",
    phone: "0123 456 789",
    email: "contact@elitestrength.com",
    address: "123 Đường Số 4, Quận 1, TP. Hồ Chí Minh",
    MessageCircle: "https://facebook.com",
    mapUrl: "https://maps.google.com",
    workingHours: "Mở cửa 24/7"
  },
  template: {
    key: "gym-fitness"
  },
  hero: {
    title: "BỨT PHÁ GIỚI HẠN - CHINH PHỤC VÓC DÁNG",
    subtitle: "Không gian tập luyện chuyên nghiệp, lộ trình cá nhân hóa giúp bạn đạt mục tiêu nhanh chóng.",
    image: {
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAX3Mco8GjruAVp3M1lxCqhQiQNGYJSVLhE0NuolXExx0kfJ6EHnAktwOFg2-9Ym60YMtIrp_gzCMoNYsOQj6tBPsmco2q1VlHb0nm7ClJUbTb_jwRe8g84Be9I15fqqKRlJlaua-zU_2qij7shTqhhYvInvyzjx8l8eCYwvQkJPczD7sSuTzvuHiUJPn70Ws2S6PGKm9J-wyDRd7USBv6SH83VcwMuqKG5cZLxYxcm_lnDShlBcIBT",
      alt: "Gym Hero"
    },
    primaryAction: {
      label: "Đăng ký tư vấn",
      href: "#register"
    },
    secondaryAction: {
      label: "Xem bảng giá",
      href: "#services"
    }
  },
  trust: {
    rating: 4.9,
    ratingCount: 1000,
    badges: ["Không gian hiện đại", "Lộ trình rõ ràng", "Đăng ký dễ dàng"]
  },
  about: {
    title: "KỶ LUẬT LÀ SỨC MẠNH",
    badge: "Kỷ luật là sức mạnh",
    description1: "Tại Elite Strength Gym, chúng tôi không chỉ cung cấp máy móc. Chúng tôi xây dựng một môi trường nơi kỷ luật được tôi luyện và giới hạn bị phá bỏ.",
    description2: "Mỗi buổi tập là một bước tiến gần hơn đến phiên bản tốt nhất của chính bạn. Với cộng đồng năng động và đội ngũ hỗ trợ tận tâm, bạn sẽ không bao giờ đơn độc trên hành trình này.",
    stats: [
      { value: "15+", label: "Huấn luyện viên" },
      { value: "2000㎡", label: "Diện tích tập" }
    ],
    image: {
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCvLI72G4FB1TGVTyFRks7ue5MIystaRtDvhEU396k_RZiYlRd3Qg-VxcLTpTt5fZqe_w7CuCoOZ2MOwtPWaiLZv_BCzfZOg-E8z8YJlR4Fop3IkXYAsKIQfIzQuOA9IBuCw-hlpyQrUlWeppmE0_bvvTEvFIZgWfOmyD8-1FCyP1rMEomXa2ebpBS44JYvGMJMwyxGIHemmi6laOy1UDPahKXUsRY0bzwqDIbk637JqRSI3mylEB-v",
      alt: "About Gym"
    }
  },
  services: [
    {
      id: "srv-default-1",
      title: "Tập gym tự do",
      description: "Không gian và thiết bị luyện tập hiện đại bậc nhất.",
      icon: "dumbbell"
    },
    {
      id: "srv-default-2",
      title: "Huấn luyện cá nhân",
      description: "Lộ trình bài bản theo mục tiêu riêng của từng cá nhân.",
      icon: "user-check"
    },
    {
      id: "srv-default-3",
      title: "Lớp nhóm",
      description: "Tăng động lực với cộng đồng năng động và nhiệt huyết.",
      icon: "users"
    }
  ],
  gallery: [],
  reviews: [],
  contact: {
    title: "ĐĂNG KÝ TƯ VẤN NGAY HÔM NAY",
    subtitle: "Sẵn sàng để thay đổi? Hãy để các chuyên gia của chúng tôi giúp bạn lập kế hoạch tập luyện hoàn hảo nhất.",
    primaryAction: {
      label: "Đăng ký ngay",
      href: "#register"
    }
  },
  seo: {
    title: "ELITE STRENGTH - BỨT PHÁ GIỚI HẠN",
    description: "Hệ thống phòng tập cao cấp 24/7 với trang thiết bị chuẩn quốc tế."
  }
};
