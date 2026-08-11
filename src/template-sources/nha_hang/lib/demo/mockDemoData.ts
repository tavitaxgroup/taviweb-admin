import { DemoPageData } from "../../types/demo";

export const mockRestaurants: Record<string, DemoPageData> = {
  "lechelle": {
    business: {
      name: "L'ÉCHELLE",
      logo: "L'ÉCHELLE",
      phone: "+84 (0) 24 3942 1234",
      address: "123 Phố Heritage, Quận Hoàn Kiếm, Hà Nội",
      email: "contact@lechelle.vn",
      mapUrl: "https://maps.google.com/?q=Hoan+Kiem+Hanoi",
      rating: 4.9,
      reviewsCount: 528
    },
    template: {
      key: "fine-dining-restaurant",
      name: "Fine Dining Restaurant Template"
    },
    hero: {
      title: "Nâng Tầm Trải Nghiệm\nẨm Thực",
      subtitle: "Heritage & Harvest",
      backgroundImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuAHG4rEjv_t73ckxKESKgUY71hV0XKvMewTT2shBacMy-1pZi3-WN0Cwhk_6yG-eCziGLXfy_72u0bciPuiF0fox79zk87MUehCjgmogAzpZoB4j2Bw66qLsTnlM6EgoqRIFB_xbzTYRJE5HQJUd2JQmWOG7muccjmRkbEwbVKyFz_21KqUWovjJHUiO2uxumxCqWSjbflhmZM7eaejWwhgCbcZq3mWTMi0xZB-XpR22KhdzzbrzwQX",
      primaryCta: {
        label: "Đặt bàn ngay",
        href: "#dat-ban"
      },
      secondaryCta: {
        label: "Xem thực đơn",
        href: "#thuc-don"
      }
    },
    trust: {
      rating: 4.9,
      reviewsCount: 528,
      badges: [
        { icon: "restaurant", label: "Không gian đẹp" },
        { icon: "calendar_month", label: "Dễ đặt bàn" },
        { icon: "workspace_premium", label: "Michelin Guide" },
        { icon: "eco", label: "Nông sản sạch" }
      ]
    },
    about: {
      badge: "Nghệ thuật bày trí",
      title: "Concept: Heritage & Harvest",
      italicQuote: "Chúng tôi không chỉ phục vụ thức ăn, chúng tôi kể những câu chuyện về mùa vụ, về đất đai và về bàn tay khéo léo của người nông dân qua ngôn ngữ của ẩm thực hiện đại.",
      content: "Tại L'ÉCHELLE, triết lý của chúng tôi bắt nguồn từ sự trân trọng tuyệt đối với Heritage (Di sản) – những kỹ thuật chế biến thủ công truyền thống và Harvest (Thu hoạch) – sự tinh khiết của nguyên liệu theo mùa.\n\nChúng tôi làm việc trực tiếp với các trang trại địa phương để đảm bảo mỗi hạt gạo, mỗi lá rau đều mang trong mình hơi thở của đất mẹ trước khi được đưa vào quy trình chế biến khắt khe tại nhà bếp.\n\nHành trình của L'ÉCHELLE không chỉ là về ẩm thực, mà là về việc gìn giữ những giá trị vượt thời gian trong một thế giới hiện đại đầy biến động.",
      experienceYears: 25,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCVgLWHzfjoN0zzPBKl9HjWXyaAtUg4K9dSVdraMkJWqH7_nBpNNmj5fcZRawvS9mu45g6oRo1IRJaAsjSzl3dsZneExZcGtIxUglfGDeIJsi7EPqXVrqnGxM7rdH38rzMl4ARoQ_2OwDWGfxOR7HV5ZK877DG3l3TAtyrhdLr2fb5f8ZtrQNeFBzJONR6WfabDfZ0XOHbXr0E6hS9D8VodwkYKKSusDnahEn8Ym2VAwH_dzO59Qs2U",
      stats: [
        { value: "100%", label: "Organic" },
        { value: "Michelin", label: "Certified" }
      ]
    },
    services: [
      {
        title: "Dùng bữa tại nhà hàng",
        description: "Trải nghiệm không gian sang trọng và cung cách phục vụ chuẩn mực dưới ánh nến ấm áp.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAFuKlWY11yTVGGLZG891UD32L-34OxqY57uZjXP9ZJ_VrLcf6i_4Bk7ZhHkX_Eo2nS-1Dw2IFWxxld_dZ_i8LSGtw-fgaJbTc3PdfgwXWz4P-HvgwYhsr_YXFioYnmSPVEQ5kWFuL0Et9J3cHCUXHEW8YM3ybCzw3siFxKe5hlZIgSA142fXpaITnn4UnthYoSG-EI3OlM5M4sFpcvpF88fBAFLJ8i_cDFWoRv0_LUrr-PhqLthRaQ",
        href: "#dining"
      },
      {
        title: "Đặt bàn nhóm",
        description: "Tận hưởng bữa tối ấm cúng cùng bạn bè và người thân bên bàn tiệc trải dài sang trọng.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDLp7zqLPd8owJRtstvQ_ro5QyzGAEawOAYOegtDH9zRhj8M_XllvYacNlIhtFwk1jTe2ZbQhSONDlYpLc9PACU7m11Ll7YLBIHhX8kRfuxkpTOy9S-g3ZUm_fBHrmZcilK3Ax1hYTwOdE1GXX9Q1NKiu25XMqpzR0C6thaHNxKpQnTJic8MkTqCXkLdfPSxqO7ZNLNTfzLJDEvW0lDGurD8fr4YYy5deKePoK0zJse3MI_Jv0EgQLw",
        href: "#group"
      },
      {
        title: "Tiệc riêng",
        description: "Không gian biệt lập cho những sự kiện quan trọng và yêu cầu khắt khe về tính riêng tư.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDi-iP3DHtBHRjeTtdVeY31Cks39OicRVN9Uu4BWTgkrJMAd6heuLlKXpYILD869ELZs1H5aAsmHF43vmKQMYQHfRbM7eu5bu3-2jC1vKC3p6usdQvgZCnJ5zXP3BR21hLaJQWily-Jl64OVsPuu9eQO5zcomdTPeibuEsZotI1-drIaAIVYA6g4ao-r4daCCzxVCF4fC1SZddzKHxkt8z0i-9-SKVwGq2PNkFB02D28dEYFJPJ_jMH",
        href: "#private"
      },
      {
        title: "Thực đơn đặc trưng",
        description: "Khám phá hành trình vị giác với Tasting Menu được thiết kế kỳ công bởi Bếp trưởng.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBMEzAoxqngYerVlHUEsv6MnsneYJ7W6E9wYSDIDnah_Ua2Zgwd-Kf5Qe9nRNkGBMjLJuKJKy4-VdW63spjVGW9uTrO9b6ZF-om-IjDsAUOGzz5OWtO8cpVXiJngYvG-vn8lpIKgLGl8v6DbcxA_ycfIwPp3T23vHi3euKZuNEPNVpqpA45x0_dGweEvdTWT-elNSBitovgEblfoFvvzzaX6Qn3s4EQQX1QKG8hXM1TvwKDKsDW6RIq",
        href: "#menu"
      }
    ],
    gallery: [
      {
        title: "Sò điệp áp chảo Caviar",
        subtitle: "Scallop & Caviar Symphony",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBQRfMgYF-iNzpbUPDwScjvA4F8NvFtTEgya2a1ycRpmCrL9FwSOjbEIqGtWXDQAG-crbSPcIpAuzryXcRIFXRO9vrhBBX4RA7ThemX-IEpXnKvTJ2Krj_Myrj4DpUqk7A3u-mxObfFCzQ2ZEEqdWSyde8U8sFMPsGDzsaUfrw3aX5v0nx074dV_XFioheo2gxV0FsBuIS6F-NHGG5zQItCF9GW8mcucTttAKT0l9Rh8FAFLELTckLN"
      },
      {
        title: "Ức vịt sốt Truffle",
        subtitle: "Glazed Duck with Truffle Reduction",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDKfO_sztD6zB8j6uDbs1Vl8ZIfCB-IY3Us8KKIcJc5UlVdnDR9fpTgVclevbyUH5ESxvnMgkKZqGMXKM4PlNFxIW-_XkCiFM3wsKyZkRwTP_EqV8oIpg9JvhsI4-hoiyCtbEMTGdtauaMehTVpFD4vT9eLdSrpVL9k_33K_Iz21HkuGYt0C7xnDwMpBn3jv0qD7Y58ZqmbDZ7EJT2Lf7fRm7Ei9Noh9fW-r2BR6O-2s6cJnqE0E87Q"
      }
    ],
    reviews: [
      {
        author: "Anh Tuấn Nguyễn",
        content: "Không gian sang trọng bậc nhất Hà Nội. Sò điệp áp chảo cùng trứng cá tầm đạt độ tinh tế tuyệt đối về hương vị.",
        rating: 5,
        date: "2 tuần trước"
      },
      {
        author: "Minh Trang Phạm",
        content: "Phong cách phục vụ chu đáo, chuyên nghiệp. Tasting menu là một bản giao hưởng vị giác khó quên.",
        rating: 5,
        date: "1 tháng trước"
      },
      {
        author: "Jean-Pierre Laurent",
        content: "The concept of Heritage & Harvest is perfectly executed. A true gem of gastronomy in Vietnam.",
        rating: 5,
        date: "3 tuần trước"
      }
    ],
    contact: {
      title: "Liên hệ với chúng tôi",
      phone: "+84 (0) 24 3942 1234",
      address: "123 Phố Heritage, Quận Hoàn Kiếm, Hà Nội",
      workingHours: "Thứ 2 - Chủ Nhật: 11:30 - 14:30 | 18:00 - 22:30",
      mapImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuCmncDSytAgYXYHdP564yQ-s1IXya8Dc8RrQZk6HPHv1q1Xl9OmTABomRNT8rTaHAQ6lmI5JMI_i14yxEog3fbDR5Yb_3jEWV48_U0xX0wF4Hf4zhL9UcoVEyIcjKF51-Tqz4t9ytfrrNw0xrAq9ThxSDnGbvVZ1qrwQnJ4uIiWuik9nYhj83nt4cSy9bVISH_n69vO6SCAc-jNn7ow4Em8w8Vk0dGqz2Wd7kxjNIiqxk5MUXwx-0zF",
      mapLocation: "L'ÉCHELLE Gastronomy",
      socialLinks: {
        website: "https://lechelle.vn",
        email: "contact@lechelle.vn",
        MessageCircle: "https://MessageCircle.com/lechelle.gastronomy"
      }
    },
    seo: {
      title: "L'ÉCHELLE - Heritage & Harvest Fine Dining",
      description: "Nhà hàng ẩm thực sang trọng bậc nhất Hà Nội với triết lý kết hợp di sản văn hóa và nông sản thu hoạch hữu cơ tinh khiết nhất."
    }
  }
};

export function getMockBusinessByPlaceId(placeId: string): DemoPageData {
  // If the placeId doesn't exist, we fallback to 'lechelle' as mandated by prompt
  const key = placeId && mockRestaurants[placeId] ? placeId : "lechelle";
  return mockRestaurants[key];
}
