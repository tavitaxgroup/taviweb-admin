import { DemoPageData } from "../../types/demo";

export const MOCK_SPA_DATA: Record<string, DemoPageData> = {
  "lumina-spa": {
    business: {
      name: "Lumina Spa",
      description: "Chăm sóc vẻ đẹp tự nhiên và mang lại sự bình yên cho tâm hồn bằng những liệu pháp chuyên sâu nhất.",
      logoUrl: "",
      socials: {
        MessageCircle: "https://facebook.com/luminaspa",
        Camera: "https://Camera.com/luminaspa"
      }
    },
    template: {
      key: "spa",
      theme: "light"
    },
    hero: {
      title: "Nơi Thư Giãn Tuyệt Đối Tại Lumina Spa",
      subtitle: "Trải nghiệm không gian chăm sóc da và cơ thể chuyên sâu, giúp bạn tìm lại sự cân bằng và vẻ đẹp tự nhiên trong tâm hồn.",
      bgImage: {
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuD845kYdCDbb3mcDihpWhu9u9PJ-Gp_08X4M9YOWFbnUx2UDMSLyMljq4B1P3PMKKga4ljlgEgWuhE-R96XGWwnksZAKlEVOJ6WFAHHzU60bzU26xeU46i3tntCulsKIFtVEy670bgjZ5-Fpk08yGgYvK-OQCy_HOao9iltv3q3l_mL852IP7jGCqDyKS4BuUx9tQP2rYI96xyKy65A_i7HqsSVFo0NnciJY3TVda2uaF9MbsUPAkxe",
        alt: "Luxury spa entrance"
      },
      primaryAction: {
        label: "Đặt lịch chăm sóc",
        href: "#book"
      },
      secondaryAction: {
        label: "Liên hệ Facebook",
        href: "https://facebook.com/luminaspa"
      }
    },
    trust: {
      rating: {
        score: "4.9/5",
        label: "Rating trên Google"
      },
      followers: {
        count: "15,000+",
        label: "Followers trên Facebook"
      }
    },
    about: {
      title: "Về Lumina Spa",
      description: "Kiến trúc tối giản kết hợp cùng các yếu tố tự nhiên tạo nên một hành trình cảm xúc trọn vẹn. Chúng tôi tin rằng cái đẹp thực sự bắt nguồn từ một cơ thể khỏe mạnh và một tinh thần bình yên.",
      image: {
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDSmJKqj4-UJJdCKfDm-dmE8NS0ajfCi8Nw9S1ksQQQlQEgyg11TTDTG4vnYLTgNwUTDopc3-jPwJMrgAi3WbpqHpWVEYDtsu966KEse_hEOrR_RHIabnTxa9ljCZpRdYFyXKKL_sS2wtYcJJSHmE1-EZ62wsDZ96kcl-RfjA0pVBCxKAOyU0M5Y8Wh8wV1Qn8jyAv14R3mvc_vHLBhFaqEzZCzjmAH_9ZFjFy0ZJouodW9H8NRBmTs",
        alt: "Spa reception area with warm lighting"
      }
    },
    services: [
      {
        id: "skin-care",
        name: "Chăm sóc da mặt",
        category: "Skin Health",
        description: "Làm sạch sâu, phục hồi và nuôi dưỡng làn da rạng rỡ từ bên trong.",
        image: {
          src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBFfT5jeo_GjyxtzLKqYLTZn8zE3W6icTSV2kk-JqdiMcQHDFf0pJHEnNhdmkYchOT64MUTxAOrUjskRViFtKSQQsmjUeAcHI9uOlwX9ozE6wfd27Z2QV8cnQjAf0e-Z4kBnHrsFB6xMy0NhSZf7wiFrA2fXyJVXBiLbkdMOmfd-eG09D3vkcaaRBvfNbd5kQqc2drTu5pa_-nFgtg6IKLbvETPW5zZTo8k0la1F1lRR5spHt0rwRfq",
          alt: "Close-up of a luxurious facial treatment"
        }
      },
      {
        id: "massage",
        name: "Massage thư giãn",
        category: "Relaxation",
        description: "Giảm căng thẳng, khơi thông dòng chảy năng lượng và tạo cảm giác cân bằng.",
        image: {
          src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCOyWQmXimX_y2pJcdybD5RIefw5YYeXdQyrwpbIVIZhSvX_b3Uf_MDQg_oMKid9v1hF2Nt7cwy6e9MJ2g2j0OygFaNSvbqtqmEujFy6cSxAJWQVESszPm-pCGJCz5Xm020egJeF-Vq1_bI0xgn_ZgNiBWnnqLtX-J3WhLviYhe61BrS0AeQmAGG2cbBU96n4B2no_bd81d3oBEchtrw4kgW9Ys8WEawtY8_yAlFCWv40ytQTMgA7M0",
          alt: "Massage table with stones and oils"
        }
      },
      {
        id: "body-therapy",
        name: "Trị liệu body",
        category: "Body Care",
        description: "Liệu trình chăm sóc cơ thể toàn diện giúp thanh lọc và tái tạo tế bào.",
        image: {
          src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDmW0Am5N7dmyajYZLb1PPoilU338xHJWhEOLFoWiXTMv-J-A7r6lscAE39shhX72XK-fcAF07t65sqh2aV4uqIGSwNn0hB04a3Ma2zivF6LEcF4UmxoAzExhhhAkYB_mjyOYzYafZbm7GK_CmCDEyaYANoTn2AL6RvWZoulnbvVThImXwj0ocptVLr3CwgLS51gCud3z8gfGFFLREJydmSaQbE7oi8NxKFlfSVjZ0bnCukIouj2Zib",
          alt: "Botanical body therapy wrap"
        }
      },
      {
        id: "hair-wellness",
        name: "Gội đầu dưỡng sinh",
        category: "Hair Wellness",
        description: "Thư giãn tâm trí và tái tạo năng lượng qua kỹ thuật massage da đầu chuyên sâu.",
        image: {
          src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDSmJKqj4-UJJdCKfDm-dmE8NS0ajfCi8Nw9S1ksQQQlQEgyg11TTDTG4vnYLTgNwUTDopc3-jPwJMrgAi3WbpqHpWVEYDtsu966KEse_hEOrR_RHIabnTxa9ljCZpRdYFyXKKL_sS2wtYcJJSHmE1-EZ62wsDZ96kcl-RfjA0pVBCxKAOyU0M5Y8Wh8wV1Qn8jyAv14R3mvc_vHLBhFaqEzZCzjmAH_9ZFjFy0ZJouodW9H8NRBmTs",
          alt: "Scalp massage wellness relaxation"
        }
      },
      {
        id: "intensive-skincare",
        name: "Chăm sóc chuyên sâu",
        category: "Advanced",
        description: "Công nghệ phục hồi da hư tổn và trẻ hóa tế bào mang lại kết quả vượt trội.",
        image: {
          src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDWBzazSVGEpPKXQ2xsSDPw_kV96CKdrN8GKfiL3cZLRuGJnp-yMbThOOXS27iWvm3RppRgOrzbs8xfqZxjmzZQM0kVRAnaUXcBLjIf3eLULwo-UeZis03CNvMauFl0DHYl73Mwt699oL1W_w0sl1nC0CT1mFnUtZKSb_CI4AuY97WCijc2P0HsYo2puy7Ln9C6zZqU1HjxlrEH1etsfVIooeAFbCJI5kNI6qXlUoS4eBYSMTDcNyuB",
          alt: "High-tech skincare application in clean room"
        }
      }
    ],
    gallery: [
      {
        id: "g1",
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDSmJKqj4-UJJdCKfDm-dmE8NS0ajfCi8Nw9S1ksQQQlQEgyg11TTDTG4vnYLTgNwUTDopc3-jPwJMrgAi3WbpqHpWVEYDtsu966KEse_hEOrR_RHIabnTxa9ljCZpRdYFyXKKL_sS2wtYcJJSHmE1-EZ62wsDZ96kcl-RfjA0pVBCxKAOyU0M5Y8Wh8wV1Qn8jyAv14R3mvc_vHLBhFaqEzZCzjmAH_9ZFjFy0ZJouodW9H8NRBmTs",
        alt: "Lumina Spa reception area",
        colSpan: 2,
        rowSpan: 2
      },
      {
        id: "g2",
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuA8JUxJD--RMbl3RZfK2kR0xO81v2wUrteeSkUerSeHyFO0B5WXSaA8_UbNFt2omyucShEUkENLVDJzZ8r0eJw77R0XtZk4Zzyoa8_OLvRRIX_iMQRVT-7tWO4I2JSLZmohuSH3jvGrOEfSPep-tmDCkJB22AvSau3OknA7Hj8REpluL8IQQCI_Eh8-DsJKxzE3q6Axm1epDQcq3DMzt5HK1YZ8MwhDwQk4AgxbVdA_xj___DrQMFpV",
        alt: "Essential oil bottles on marble",
        colSpan: 1,
        rowSpan: 1
      },
      {
        id: "g3",
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuABjDqisiOd-X9Zut_9sa3N5hBAhza71LLou8_8TmxvvlXf0jwjl0nOZ4_KY5TspGdHK6O6k7bFtS5Wfcw1lAydW76cBvEWtQZ_TIC38fXRpukK4m0ruh6a1mzz5ujbIiHASeJQVWDCiyOl4tTZARnnZ9wK8_YAuVeCZdsKCYtjTX-VAYeokyLrkfSmuy7wsfUlvGRg00IXLFytdPFZbOuPwu5e8Q_caZ4zoo_biKNFND-u11Z-e83l",
        alt: "Tranquil room massage bed",
        colSpan: 1,
        rowSpan: 2
      },
      {
        id: "g4",
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuArts88wsvpRNCQucoLaj-RuNfyr5BELCiSr2URFrRHAjhfmg3VZCLAXh3Td2mayObfNNR_KlVReCex25km1Zyc7vjhuhQNqpPYPmgo5JYoa8JgfvsFhOqpZa6Nbp1oBp5cQTPhPnLyvbAOa5m6NY2Y9q-3sxNGV7Pt4rVPaG48B7G4zkvYLVGz-RSExGOYAIjRH-1HBSUSgIe2QcdRlZwHc24Z14vaAmji_gwf8IxWUnsp-I_kbHal",
        alt: "Freshly brewed herbal tea and towels",
        colSpan: 1,
        rowSpan: 1
      }
    ],
    reviews: [
      {
        id: "r1",
        rating: 5,
        text: "Không gian ở đây thực sự rất thư giãn. Kỹ thuật viên tay nghề cao và rất nhẹ nhàng. Tôi sẽ quay lại thường xuyên.",
        author: "Minh Anh",
        role: "Khách hàng thường xuyên"
      },
      {
        id: "r2",
        rating: 5,
        text: "Dịch vụ gội đầu dưỡng sinh là đỉnh nhất mình từng trải nghiệm. Mùi hương tinh dầu rất dễ chịu và thư thái.",
        author: "Hải Yến",
        role: "Beauty Blogger"
      }
    ],
    contact: {
      address: "123 Đường Lạc Long Quân, Quận Tây Hồ, Hà Nội",
      phone: "090 123 4567",
      email: "contact@luminaspa.vn",
      MessageCircle: "https://facebook.com/luminaspa",
      primaryAction: {
        label: "Đặt lịch ngay",
        href: "tel:0901234567"
      },
      secondaryAction: {
        label: "Tư vấn qua Facebook",
        href: "https://facebook.com/luminaspa"
      }
    },
    seo: {
      title: "Lumina Spa | Nơi Thư Giãn Tuyệt Đối Tại Hà Nội",
      description: "Trải nghiệm không gian chăm sóc da và cơ thể chuyên sâu tại Lumina Spa. Massage thư giãn, gội đầu dưỡng sinh, chăm sóc da mặt cao cấp."
    }
  }
};

export function getMockBusinessByPlaceId(placeId: string): DemoPageData {
  // If we match key exactly, or fallback to first element
  const cleanedId = placeId.trim().toLowerCase();
  if (MOCK_SPA_DATA[cleanedId]) {
    return MOCK_SPA_DATA[cleanedId];
  }
  
  // Default fallback if place_id doesn't exist
  return MOCK_SPA_DATA["lumina-spa"];
}

export function getMockDemoData(placeId: string): DemoPageData {
  return getMockBusinessByPlaceId(placeId);
}

export function buildDemoPageData(businessRawData: any): DemoPageData {
  // Simulates transforming a raw database record into structured DemoPageData
  return {
    business: {
      name: businessRawData?.name || "Lumina Spa",
      description: businessRawData?.description || "Chăm sóc sắc đẹp tự nhiên",
      logoUrl: businessRawData?.logoUrl || "",
      socials: businessRawData?.socials || {}
    },
    template: {
      key: businessRawData?.templateKey || "spa",
      theme: businessRawData?.theme || "light"
    },
    hero: {
      title: businessRawData?.heroTitle || "Nơi Thư Giãn Tuyệt Đối",
      subtitle: businessRawData?.heroSubtitle || "Trải nghiệm không gian chăm sóc da và cơ thể chuyên sâu.",
      bgImage: {
        src: businessRawData?.heroBgImage || "https://lh3.googleusercontent.com/aida-public/AB6AXuD845kYdCDbb3mcDihpWhu9u9PJ-Gp_08X4M9YOWFbnUx2UDMSLyMljq4B1P3PMKKga4ljlgEgWuhE-R96XGWwnksZAKlEVOJ6WFAHHzU60bzU26xeU46i3tntCulsKIFtVEy670bgjZ5-Fpk08yGgYvK-OQCy_HOao9iltv3q3l_mL852IP7jGCqDyKS4BuUx9tQP2rYI96xyKy65A_i7HqsSVFo0NnciJY3TVda2uaF9MbsUPAkxe",
        alt: businessRawData?.name || "Lumina Spa"
      },
      primaryAction: {
        label: businessRawData?.heroPrimaryLabel || "Đặt lịch chăm sóc",
        href: "#services"
      },
      secondaryAction: businessRawData?.facebookUrl ? {
        label: "Liên hệ Facebook",
        href: businessRawData?.facebookUrl
      } : undefined
    },
    trust: {
      rating: {
        score: businessRawData?.ratingScore || "4.9/5",
        label: "Rating trên Google"
      },
      followers: {
        count: businessRawData?.followersCount || "15,000+",
        label: "Followers trên Facebook"
      }
    },
    about: {
      title: "Không Gian Thư Giãn",
      description: businessRawData?.aboutText || "Kiến trúc tối giản kết hợp cùng các yếu tố tự nhiên tạo nên một hành trình cảm xúc trọn vẹn.",
      image: {
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDSmJKqj4-UJJdCKfDm-dmE8NS0ajfCi8Nw9S1ksQQQlQEgyg11TTDTG4vnYLTgNwUTDopc3-jPwJMrgAi3WbpqHpWVEYDtsu966KEse_hEOrR_RHIabnTxa9ljCZpRdYFyXKKL_sS2wtYcJJSHmE1-EZ62wsDZ96kcl-RfjA0pVBCxKAOyU0M5Y8Wh8wV1Qn8jyAv14R3mvc_vHLBhFaqEzZCzjmAH_9ZFjFy0ZJouodW9H8NRBmTs",
        alt: "Spa lobby"
      }
    },
    services: businessRawData?.services || [],
    gallery: businessRawData?.gallery || [],
    reviews: businessRawData?.reviews || [],
    contact: {
      address: businessRawData?.address || "123 Đường Lạc Long Quân, Quận Tây Hồ, Hà Nội",
      phone: businessRawData?.phone || "090 123 4567",
      email: businessRawData?.email || "contact@luminaspa.vn",
      MessageCircle: businessRawData?.facebookUrl,
      primaryAction: {
        label: "Đặt lịch ngay",
        href: businessRawData?.phone ? `tel:${businessRawData.phone}` : "#contact"
      }
    },
    seo: {
      title: `${businessRawData?.name || "Lumina Spa"} | Nơi Thư Giãn Tuyệt Đối`,
      description: businessRawData?.description || "Chăm sóc sắc đẹp chuyên sâu"
    }
  };
}
