import { DemoPageData } from "../../types/demo";

export const mockBusinesses: Record<string, DemoPageData> = {
  "elite-strength": {
    business: {
      name: "ELITE STRENGTH",
      phone: "0123 456 789",
      email: "contact@elitestrength.com",
      address: "123 Đường Số 4, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh",
      MessageCircle: "https://facebook.com/elitestrength",
      mapUrl: "https://maps.google.com/?q=Elite+Strength+Gym",
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
        alt: "Elite Strength state-of-the-art power zone"
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
        alt: "High contrast group strength training warehouse"
      }
    },
    services: [
      {
        id: "srv-1",
        title: "Tập gym tự do",
        description: "Không gian và thiết bị luyện tập hiện đại bậc nhất.",
        icon: "dumbbell"
      },
      {
        id: "srv-2",
        title: "Huấn luyện cá nhân",
        description: "Lộ trình bài bản theo mục tiêu riêng của từng cá nhân.",
        icon: "user-check"
      },
      {
        id: "srv-3",
        title: "Lớp nhóm",
        description: "Tăng động lực với cộng đồng năng động và nhiệt huyết.",
        icon: "users"
      },
      {
        id: "srv-4",
        title: "Tư vấn thể hình",
        description: "Định hướng chuyên sâu, khoa học cho người mới bắt đầu.",
        icon: "clipboard"
      },
      {
        id: "srv-5",
        title: "Yoga/Cardio",
        description: "Cân bằng hoàn hảo giữa sức khỏe tâm hồn và sức bền.",
        icon: "heart"
      }
    ],
    gallery: [
      {
        id: "gal-1",
        image: {
          src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCtWCkMojdAE3q_oYj_8b9kF9fn0Loj5K6sn6XoIonZJUO_RujaahxiNL6cOOc9P31fd5klSkgBbWgS2tOKp5QvE2550UT-6tFnkGmBcd5h5a4YzRwYQ6bxypf-e43l4b9mdJKQ0YZS-d9OOJC_JOIgYVIc24SFkzOuPy-ATsPGXGbuQasR0cYje_SPGj4Lo8zomNqqRyGBbVGliMCKFQg7LsjExwY2HFvtBxhR8WLwV8iBz2ueJLCx",
          alt: "Squat racks and Olympic platforms under neon accents"
        }
      },
      {
        id: "gal-2",
        image: {
          src: "https://lh3.googleusercontent.com/aida-public/AB6AXuClB85FSSX6TOYvpdF7V8Mr1TnQdVoMzF1drQFLPpTOtHqeIFwRGDg5jUpUDa5YtWIeZD_M_O9-MbXUcEAGk_UM3Vf2c6eR82B-uHT8oJcxmUiKYNxRNaseCO0IinyWtgPNhVQ3yBcAdBe8SUdkr4xpRghJ2rHOmHY5jcQY8u5rl1YWUAFASCrDVMVHzKPpEu7-5RKWmr7m-bBIPACW2yGemW0kvumZbSP5pNz4qEhktvb_V-GKC9Cl",
          alt: "Premium heavy dumbbells racked neatly"
        }
      },
      {
        id: "gal-3",
        image: {
          src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBoCIAQm-3d_TCUjN3g-GRQMrgmuIb00hV6w3imRPWND2zpzWNzmZRmCaOugy1o-RhuV5iQtOWEzmEMOU6-S6rTl1lyRgQuQXyZH4WrnELzP37Ewc__5Rb_FlJ2gjkhnfx_-_XVgCAD4uO9r-wJDpwXngXl1ZT9Jo_POwHTaUlnU_A5Ny0UAo5FdVUvzulrGiJGO4rCbmxdRMAoc3Kly-kBLqQfMFvxYzkcpcr9AESEToS11UY8JMZS",
          alt: "Crisp dynamic cardio treadmills layout"
        }
      },
      {
        id: "gal-4",
        image: {
          src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBgkwuRTV4-ZmO-wtXMVXIhWOG-N2hk6LW3tEkA4C9zao8z5PiMUWTpQfSLrTaebulJ-zotOSyuwH0en0HcStyk82hGi4OnDTlb1EijK65PSVmWx8WvMwpENzD9ZYk8PLrY1V-YwnbR4QV_RQeYrwG7g31BeKxAYd8gI31fVMJCd6tJkPdfzuC4SKTg2O66oPJMPe0FOYKYLC-n4WsdDvo1KZ3AZo_9lKxSx1zZQdR3mTPcFnSLdLPA",
          alt: "Energetic and intensive group class training session"
        }
      }
    ],
    reviews: [
      {
        id: "rev-1",
        author: "Nguyễn Văn An",
        comment: "Không gian ở đây cực kỳ chuyên nghiệp. Tôi đã thay đổi hoàn toàn thói quen tập luyện và thấy rõ kết quả chỉ sau 3 tháng.",
        rating: 5,
        membershipDuration: "Hội viên 2 năm"
      },
      {
        id: "rev-2",
        author: "Trần Thị Mai",
        comment: "Các lớp nhóm rất năng động. HLV nhiệt tình và luôn thúc đẩy mọi người vượt qua giới hạn của chính mình.",
        rating: 5,
        membershipDuration: "Hội viên VIP"
      },
      {
        id: "rev-3",
        author: "Lê Minh Tuấn",
        comment: "Dịch vụ PT cực kỳ tận tâm. Lộ trình ăn uống và tập luyện được cá nhân hóa sát sao giúp tôi không bỏ cuộc.",
        rating: 5,
        membershipDuration: "Hội viên mới"
      }
    ],
    contact: {
      title: "ĐĂNG KÝ TƯ VẤN NGAY HÔM NAY",
      subtitle: "Sẵn sàng để thay đổi? Hãy để các chuyên gia của chúng tôi giúp bạn lập kế hoạch tập luyện hoàn hảo nhất.",
      primaryAction: {
        label: "Đăng ký ngay",
        href: "#register-form"
      },
      phoneAction: {
        label: "0123 456 789",
        phone: "0123456789"
      },
      mapAction: {
        label: "Xem đường đi",
        href: "https://maps.google.com/?q=Elite+Strength+Gym"
      }
    },
    seo: {
      title: "ELITE STRENGTH - BỨT PHÁ GIỚI HẠN",
      description: "Hệ thống phòng tập cao cấp 24/7 với trang thiết bị chuẩn quốc tế và lộ trình luyện tập bài bản."
    }
  },
  "titan-gym": {
    business: {
      name: "TITAN GYM & FITNESS",
      phone: "0987 654 321",
      email: "support@titangym.vn",
      address: "456 Đường CMT8, Quận 3, TP. Hồ Chí Minh",
      MessageCircle: "https://facebook.com/titangymvn",
      mapUrl: "https://maps.google.com/?q=Titan+Gym+Vietnam",
      workingHours: "Mở cửa 5:00 - 22:00"
    },
    template: {
      key: "gym-fitness"
    },
    hero: {
      title: "KÍCH HOẠT SỨC MẠNH VÔ HẠN",
      subtitle: "Nâng tầm sức mạnh cơ thể với hệ thống thiết bị hàng đầu và huấn luyện viên tận tâm.",
      image: {
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuClA_L8qVSIvaANqIWimsaXWfXFszJ7NPAG54rSGIYdNQuTcesYYdPEjsOTCdS0wWo0Dt8hzBQndBHaUH1xGMmgHF3EoUhIMpIWvZHH5oN--SZjjzyjKggtUrPNGgQDNySOMnr_KgMUeXcICRCWecDzerEWwYeGg8NLdGIGmZ1Bg3YTi5SDeNyNL2GDQaqOtJxWlUWKhK3hdWpYNllGqyvX5-bQadmmdGQ32csOMkECu2TLSqHHl7_T",
        alt: "Titan fitness raw intensity weightlifting setup"
      },
      primaryAction: {
        label: "Nhận vé tập thử",
        href: "#register"
      },
      secondaryAction: {
        label: "Trải nghiệm ngay",
        href: "#about"
      }
    },
    trust: {
      rating: 4.8,
      ratingCount: 850,
      badges: ["Máy tập nhập khẩu", "Đội ngũ PT Chu đáo", "Môi trường văn minh"]
    },
    about: {
      title: "CHẤT LƯỢNG LÀM NÊN UY TÍN",
      badge: "Không ngừng nỗ lực",
      description1: "Titan Gym mang tới trải nghiệm thể hình hoàn hảo. Với chúng tôi, mỗi học viên đều có một lộ trình tối ưu và chế độ dinh dưỡng đo lường khoa học.",
      description2: "Dù bạn muốn tăng cân, giảm mỡ hay cải thiện sức bền, Titan Gym cam kết đồng hành từng bước để bạn sở hữu hình thể hoàn hảo.",
      stats: [
        { value: "10+", label: "PT Quốc tế" },
        { value: "1200㎡", label: "Tổng diện tích" }
      ],
      image: {
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCvLI72G4FB1TGVTyFRks7ue5MIystaRtDvhEU396k_RZiYlRd3Qg-VxcLTpTt5fZqe_w7CuCoOZ2MOwtPWaiLZv_BCzfZOg-E8z8YJlR4Fop3IkXYAsKIQfIzQuOA9IBuCw-hlpyQrUlWeppmE0_bvvTEvFIZgWfOmyD8-1FCyP1rMEomXa2ebpBS44JYvGMJMwyxGIHemmi6laOy1UDPahKXUsRY0bzwqDIbk637JqRSI3mylEB-v",
        alt: "Titan Gym weight training section"
      }
    },
    services: [
      {
        id: "srv-2-1",
        title: "Tập tạ chuyên sâu",
        description: "Dàn tạ đòn, tạ đơn đa dạng cân nặng phục vụ mọi cấp độ.",
        icon: "dumbbell"
      },
      {
        id: "srv-2-2",
        title: "Kèm cặp 1:1",
        description: "Huấn luyện viên lên thực đơn và theo sát động tác chuẩn xác.",
        icon: "user-check"
      },
      {
        id: "srv-2-3",
        title: "Cardio Đốt mỡ",
        description: "Đốt cháy năng lượng dư thừa với máy chạy và leo dốc dốc.",
        icon: "heart"
      }
    ],
    gallery: [
      {
        id: "gal-2-1",
        image: {
          src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCtWCkMojdAE3q_oYj_8b9kF9fn0Loj5K6sn6XoIonZJUO_RujaahxiNL6cOOc9P31fd5klSkgBbWgS2tOKp5QvE2550UT-6tFnkGmBcd5h5a4YzRwYQ6bxypf-e43l4b9mdJKQ0YZS-d9OOJC_JOIgYVIc24SFkzOuPy-ATsPGXGbuQasR0cYje_SPGj4Lo8zomNqqRyGBbVGliMCKFQg7LsjExwY2HFvtBxhR8WLwV8iBz2ueJLCx",
          alt: "Olympic racks and high performance turf area"
        }
      },
      {
        id: "gal-2-2",
        image: {
          src: "https://lh3.googleusercontent.com/aida-public/AB6AXuClB85FSSX6TOYvpdF7V8Mr1TnQdVoMzF1drQFLPpTOtHqeIFwRGDg5jUpUDa5YtWIeZD_M_O9-MbXUcEAGk_UM3Vf2c6eR82B-uHT8oJcxmUiKYNxRNaseCO0IinyWtgPNhVQ3yBcAdBe8SUdkr4xpRghJ2rHOmHY5jcQY8u5rl1YWUAFASCrDVMVHzKPpEu7-5RKWmr7m-bBIPACW2yGemW0kvumZbSP5pNz4qEhktvb_V-GKC9Cl",
          alt: "Solid steel dumbbells and bench setup"
        }
      }
    ],
    reviews: [
      {
        id: "rev-2-1",
        author: "Phạm Minh Hoàng",
        comment: "Địa điểm tập rộng rãi, máy chạy bộ đời mới êm chân, nhân viên lễ tân dễ thương nhiệt tình.",
        rating: 5,
        membershipDuration: "Hội viên 1 năm"
      }
    ],
    contact: {
      title: "ĐĂNG KÝ TẬP THỬ MIỄN PHÍ",
      subtitle: "Điền thông tin để nhận buổi phân tích chỉ số cơ thể InBody và 1 buổi tập cùng PT hoàn toàn miễn phí.",
      primaryAction: {
        label: "Đăng ký ngay",
        href: "#register-form"
      },
      phoneAction: {
        label: "0987 654 321",
        phone: "0987654321"
      },
      mapAction: {
        label: "Tìm đường tới Titan Gym",
        href: "https://maps.google.com/?q=Titan+Gym+Vietnam"
      }
    },
    seo: {
      title: "TITAN GYM - THỂ HÌNH VÀ SỨC KHỎE",
      description: "Nhận buổi tập thử và tư vấn chế độ ăn miễn phí ngay hôm nay tại Titan Gym."
    }
  }
};
