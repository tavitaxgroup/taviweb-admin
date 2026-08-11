import { DemoPageData } from "../../types/demo";

export const mockClinics: Record<string, DemoPageData> = {
  "aura-clinic": {
    business: {
      name: "Aura Clinic",
      phone: "090 123 4567",
      email: "contact@auraclinic.vn",
      address: "123 Đường Nam Kỳ Khởi Nghĩa, Quận 3, TP. Hồ Chí Minh",
      MessageCircle: "https://MessageCircle.com/auraclinic",
      Camera: "https://Camera.com/auraclinic",
      mapsUrl: "https://maps.google.com/?q=123+Nam+Ky+Khoi+Nghia+Quan+3+HCMC",
      logoText: "AURA CLINIC"
    },
    template: {
      key: "aesthetic-clinic",
      name: "Aesthetic Clinic Premium Template"
    },
    hero: {
      title: "AURA CLINIC",
      subtitle: "Đánh thức vẻ đẹp tự tin",
      description: "Trải nghiệm tiêu chuẩn thẩm mỹ thượng lưu, nơi khoa học hiện đại hòa quyện cùng sự tận tâm cá nhân hóa để tôn vinh nét đẹp độc bản của riêng bạn.",
      image: {
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAv8skZTlWKzD3n2us_bwsFt4dun-1o8gZriBB7ldT5y-JjdNTGOHKWpj2STgu1IlGhtA3aUKBc9xEqfwjlTPXP1BSA_fVv-fDxUYFkYjt5uegK1d8yaSc1wy_bCXbZHkZkflvnwriaUtSXaUP4l7f1_5IO8alPfpFED6gngRbBAVR_JQ2YVgtnopc3oukTddvyRvh5LMQlXaLB8Bg79OFNqlK8Ap6JgqovF3Svsytr-ihgduKWaeHDgA",
        alt: "A panoramic wide-shot of a luxury aesthetic clinic interior."
      },
      primaryAction: {
        label: "Đặt lịch tư vấn",
        href: "#contact-section"
      },
      secondaryAction: {
        label: "Xem dịch vụ",
        href: "#services-section"
      }
    },
    trust: {
      items: [
        {
          icon: "Star",
          value: "4.9/5",
          label: "Google Rating"
        },
        {
          icon: "HeartHandshake",
          value: "2000+",
          label: "Khách hàng hài lòng"
        },
        {
          icon: "UserCheck",
          value: "Cá nhân hóa",
          label: "Tư vấn chuyên sâu 1:1"
        },
        {
          icon: "ShieldAlert",
          value: "Riêng tư",
          label: "Không gian chuẩn Boutique"
        }
      ]
    },
    about: {
      badge: "GIỚI THIỆU",
      title: "Về AURA CLINIC",
      description1: "Tại Aura Clinic, chúng tôi tin rằng vẻ đẹp đích thực bắt nguồn từ sự tự tin và sức khỏe nội tại. Không chỉ là một phòng khám thẩm mỹ, Aura là không gian tĩnh lặng, sang trọng nơi mỗi khách hàng được chăm sóc bằng lộ trình chuyên biệt.",
      description2: "Với triết lý \"Tận tâm - Chuyên nghiệp - Riêng tư\", chúng tôi cam kết mang lại trải nghiệm làm đẹp an toàn và hiệu quả, giúp bạn tỏa sáng theo cách tự nhiên nhất.",
      image: {
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBCY_hmgasARYG7UzlOe9j6tVPckVKktgsQar8JynRV-cjnFKZgUA-C3_x3lNy3DlYMx0I4XlGeSJdthd47Osesqe_6ITvYFBblRdDWzISL0l8wZwoU6KjXwEYYrAowuNzbIFRdvlyIX_zQ6dpFzOAN14drfokVK4w35kwZpNrP7VzNiOPej6FeU-_k2cw7Nw2wulcunjGxCZi3KnE2KNO2VQ-gcbEhxwQ7l3SDlTITPAdMuUqNaNvgQw",
        alt: "A luxurious private consultation room in a high-end clinic."
      },
      experienceYears: 10,
      experienceLabel: "Năm kinh nghiệm trong ngành thẩm mỹ",
      points: [
        "Cơ sở vật chất hiện đại chuẩn 5 sao",
        "Đội ngũ chuyên viên giàu kinh nghiệm"
      ]
    },
    services: [
      {
        id: "srv-1",
        icon: "User",
        title: "Tư vấn thẩm mỹ",
        description: "Phân tích cấu trúc khuôn mặt và xây dựng lộ trình làm đẹp riêng biệt."
      },
      {
        id: "srv-2",
        icon: "Flower",
        title: "Chăm sóc da chuyên sâu",
        description: "Nuôi dưỡng làn da từ sâu bên trong với các dưỡng chất cao cấp."
      },
      {
        id: "srv-3",
        icon: "Sparkles",
        title: "Trẻ hóa da",
        description: "Xóa nhòa dấu vết thời gian bằng các phương pháp không xâm lấn."
      },
      {
        id: "srv-4",
        icon: "Activity",
        title: "Điều trị công nghệ cao",
        description: "Giải quyết các vấn đề sắc tố, sẹo, mụn bằng máy móc tiên tiến."
      },
      {
        id: "srv-5",
        icon: "Flame",
        title: "Chăm sóc vóc dáng",
        description: "Kiến tạo đường cong hoàn hảo với công nghệ định hình hiện đại."
      }
    ],
    gallery: [
      {
        image: {
          src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDWf-7OcAkxSwl-0E4YEXIFp0LhWS8tzcIJ923FzIdeKzxgBFBCWJUkJurtT22gA83d4bi7n_M5cFGXXTV-MNsrD3oaF9n73QzGBro4kaQT-lnZrdtJ_2GPEh03RN870QskODoPZTJoNumuP_-RC2pPSveC50h2FNtRhrKQQxLwHlJ0CGU8Zv2_FUyIyMZtXS9DTO17ibskxwxNDG1GA6I9ssBcBhmqa-FE92aU27vLcKfyAtQ9ELrbZA",
          alt: "Wide shot of a luxury clinic waiting area."
        },
        aspect: "md:col-span-2 md:row-span-2"
      },
      {
        image: {
          src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDLJFGAG7EklwP4eWAXHNlQ-G9H4XY5zonFTNyHbVmw30OHiZ7gE3iFUHWKR0PDqOnyrn5tT4vtIfOmyfpa_Gc013vqIMdwbCB218dURBRu3Ju6w6jjvqA4FzXhSVUE4FH5QLI4tnW4rqmCfDLw_7mbrSe0s8U8tdaEoK2dLDeB3Eu81WYKU0mZrdUbXtEMRyNbVEJOvjCiALNvsLl5Ov2cFOavO4pgaSeJWju1MFJ19_XnmEdTkBVtXw",
          alt: "Close-up of high-end skin analysis device."
        },
        aspect: "md:col-span-1"
      },
      {
        image: {
          src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCR8ZNslSVE5r3bL5uoDwSxa-RuYUGUxpqycCtj8jhgls2eD6nV3a1XamZ08whL8SRWooUPTE3WKSmN28AG7ntdil5P4luUuXeBMr3Lf9mlIR7UVdibcdjk5m2XXj9h7De5mj1CF9Tu6ToqfDXNr4yKx-sJXcw_-SA9oWbH-qDI93Kguhh5WEn8COLMNwzFZ9pfCXLv8asx20nYJzteeNSBcIU1lCcT1fxViqcCa8_Yp8uVIrozGk8lTA",
          alt: "Premium dermatological skincare products."
        },
        aspect: "md:col-span-1"
      },
      {
        image: {
          src: "https://lh3.googleusercontent.com/aida-public/AB6AXuB-z3fn_j7BDRWPQoSHctHuexkNAoSKTyQ-3AzEviuFewAopHhDHvET8KtyIU8yOZQc9kXLYs966zJ0xyPLQxE6eycCzpvPU9XI4meCHxTv9zCJDBaGOLEXoADaq4ts3AKYHnQuEvk-aOcKXjMdy9_W7Y40EySjDNA_d6i42AKYOxTQOY0K1XVkFP9M0Q4SbW8OZ_6yMGB7JCDXOPNZlFF8qC8bUY0QM_GLYtudJDgPp9BfiF8sk6TeJA",
          alt: "Calming medical treatment room."
        },
        aspect: "md:col-span-2"
      }
    ],
    reviews: [
      {
        id: "rev-1",
        text: "Tôi cực kỳ hài lòng với dịch vụ tại Aura. Không gian rất riêng tư, nhân viên nhẹ nhàng và chuyên nghiệp. Tôi cảm nhận được sự thay đổi rõ rệt của làn da sau liệu trình.",
        author: "Chị Lan Anh",
        role: "Khách hàng thân thiết"
      },
      {
        id: "rev-2",
        text: "Phòng khám sạch sẽ, thiết bị hiện đại. Bác sĩ tư vấn rất kỹ lưỡng và không hề có cảm giác bị chèo kéo. Một địa chỉ đáng tin cậy cho những ai yêu bản thân.",
        author: "Anh Minh Quang",
        role: "Khách hàng"
      },
      {
        id: "rev-3",
        text: "Lần đầu tiên tôi đi làm đẹp mà cảm thấy thoải mái như đi spa nghỉ dưỡng. Mọi thứ từ mùi hương đến thái độ phục vụ đều quá tuyệt vời. Sẽ quay lại nhiều lần nữa.",
        author: "Chị Tuyết Mai",
        role: "Khách hàng"
      }
    ],
    contact: {
      title: "Sẵn sàng để tỏa sáng?",
      description: "Đừng ngần ngại liên hệ với chuyên viên của chúng tôi để được tư vấn lộ trình phù hợp nhất cho riêng bạn.",
      primaryAction: {
        label: "Nhắn chuyên viên qua MessageCircle",
        href: "https://MessageCircle.com/auraclinic"
      },
      phoneAction: {
        label: "090 123 4567",
        href: "tel:0901234567"
      }
    },
    seo: {
      title: "AURA CLINIC - Đánh thức vẻ đẹp tự tin",
      description: "Trải nghiệm tiêu chuẩn thẩm mỹ thượng lưu, nơi khoa học hiện đại hòa quyện cùng sự tận tâm cá nhân hóa để tôn vinh nét đẹp độc bản."
    }
  },
  "essence-clinic": {
    business: {
      name: "Essence Wellness",
      phone: "091 999 8888",
      email: "info@essencewellness.vn",
      address: "456 Đường Lê Duẩn, Quận 1, TP. Hồ Chí Minh",
      MessageCircle: "https://MessageCircle.com/essencewellness",
      logoText: "ESSENCE"
    },
    template: {
      key: "aesthetic-clinic",
      name: "Aesthetic Clinic Premium Template"
    },
    hero: {
      title: "ESSENCE CLINIC",
      subtitle: "Nơi Khởi Nguồn Nhan Sắc Khỏe Mạnh",
      description: "Chăm sóc làn da và vóc dáng bằng công nghệ chuẩn y khoa từ Thụy Sĩ. Đội ngũ bác sĩ tu nghiệp nước ngoài trực tiếp lên phác đồ trị liệu chuyên sâu.",
      image: {
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBCY_hmgasARYG7UzlOe9j6tVPckVKktgsQar8JynRV-cjnFKZgUA-C3_x3lNy3DlYMx0I4XlGeSJdthd47Osesqe_6ITvYFBblRdDWzISL0l8wZwoU6KjXwEYYrAowuNzbIFRdvlyIX_zQ6dpFzOAN14drfokVK4w35kwZpNrP7VzNiOPej6FeU-_k2cw7Nw2wulcunjGxCZi3KnE2KNO2VQ-gcbEhxwQ7l3SDlTITPAdMuUqNaNvgQw",
        alt: "Essence Clinic premium wellness area."
      },
      primaryAction: {
        label: "Liên hệ tư vấn",
        href: "#contact-section"
      },
      secondaryAction: {
        label: "Tìm hiểu dịch vụ",
        href: "#services-section"
      }
    },
    trust: {
      items: [
        {
          icon: "Star",
          value: "5.0/5",
          label: "Đánh giá tuyệt đối"
        },
        {
          icon: "HeartHandshake",
          value: "1500+",
          label: "Khách hàng tin tưởng"
        },
        {
          icon: "UserCheck",
          value: "Chuẩn Thụy Sĩ",
          label: "Dịch vụ và thiết bị đẳng cấp"
        },
        {
          icon: "ShieldAlert",
          value: "Cam kết",
          label: "Tuyệt đối an toàn và hiệu quả"
        }
      ]
    },
    about: {
      badge: "VỀ CHÚNG TÔI",
      title: "Về ESSENCE WELLNESS",
      description1: "Essence Wellness mang đến cho bạn các giải pháp làm đẹp không xâm lấn tiên tiến nhất, giúp tôn vinh những nét đẹp thanh tú sẵn có của cơ thể và nuôi dưỡng sức khỏe làn da từ sâu bên trong.",
      description2: "Chúng tôi hướng đến một quy trình khép kín tối ưu, chuyên nghiệp và đầy tinh tế để đem lại sự an tâm cao nhất cho khách hàng của mình.",
      image: {
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAv8skZTlWKzD3n2us_bwsFt4dun-1o8gZriBB7ldT5y-JjdNTGOHKWpj2STgu1IlGhtA3aUKBc9xEqfwjlTPXP1BSA_fVv-fDxUYFkYjt5uegK1d8yaSc1wy_bCXbZHkZkflvnwriaUtSXaUP4l7f1_5IO8alPfpFED6gngRbBAVR_JQ2YVgtnopc3oukTddvyRvh5LMQlXaLB8Bg79OFNqlK8Ap6JgqovF3Svsytr-ihgduKWaeHDgA",
        alt: "Premium aesthetics consulting office."
      },
      experienceYears: 8,
      experienceLabel: "Năm hình thành và phát triển thương hiệu",
      points: [
        "Công nghệ nâng cơ và trẻ hóa độc quyền",
        "Dược mỹ phẩm nhập khẩu chính ngạch Thụy Sĩ"
      ]
    },
    services: [
      {
        id: "ess-srv-1",
        icon: "Sparkles",
        title: "Trẻ hóa tế bào",
        description: "Phương pháp kích hoạt sản sinh collagen tự nhiên từ cấp độ tế bào."
      },
      {
        id: "ess-srv-2",
        icon: "User",
        title: "Tạo hình không phẫu thuật",
        description: "Cân chỉnh đường nét thanh tú hài hòa tự nhiên không cần nghỉ dưỡng."
      },
      {
        id: "ess-srv-3",
        icon: "Flower",
        title: "Liệu trình Skincare cao cấp",
        description: "Đặc trị chuyên sâu cho các vấn đề lão hóa, sắc tố và mụn cám."
      }
    ],
    gallery: [
      {
        image: {
          src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDWf-7OcAkxSwl-0E4YEXIFp0LhWS8tzcIJ923FzIdeKzxgBFBCWJUkJurtT22gA83d4bi7n_M5cFGXXTV-MNsrD3oaF9n73QzGBro4kaQT-lnZrdtJ_2GPEh03RN870QskODoPZTJoNumuP_-RC2pPSveC50h2FNtRhrKQQxLwHlJ0CGU8Zv2_FUyIyMZtXS9DTO17ibskxwxNDG1GA6I9ssBcBhmqa-FE92aU27vLcKfyAtQ9ELrbZA",
          alt: "Essence Gallery 1"
        },
        aspect: "md:col-span-2 md:row-span-2"
      },
      {
        image: {
          src: "https://lh3.googleusercontent.com/aida-public/AB6AXuB-z3fn_j7BDRWPQoSHctHuexkNAoSKTyQ-3AzEviuFewAopHhDHvET8KtyIU8yOZQc9kXLYs966zJ0xyPLQxE6eycCzpvPU9XI4meCHxTv9zCJDBaGOLEXoADaq4ts3AKYHnQuEvk-aOcKXjMdy9_W7Y40EySjDNA_d6i42AKYOxTQOY0K1XVkFP9M0Q4SbW8OZ_6yMGB7JCDXOPNZlFF8qC8bUY0QM_GLYtudJDgPp9BfiF8sk6TeJA",
          alt: "Essence Gallery 2"
        },
        aspect: "md:col-span-2"
      }
    ],
    reviews: [
      {
        id: "ess-rev-1",
        text: "Essence Clinic đem đến trải nghiệm vô cùng khác biệt. Không gian tinh tế, nhẹ nhàng, bác sĩ có chuyên môn sâu làm tôi thấy cực kì an tâm.",
        author: "Chị Minh Thư",
        role: "Hội viên Diamond"
      }
    ],
    contact: {
      title: "Kiến tạo vẻ đẹp hoàn mỹ",
      description: "Đặt lịch hẹn ngay hôm nay để nhận được sự tư vấn trực tiếp từ bác sĩ chuyên khoa đầu ngành.",
      primaryAction: {
        label: "Nhắn tin Messenger",
        href: "https://MessageCircle.com/essencewellness"
      },
      phoneAction: {
        label: "091 999 8888",
        href: "tel:0919998888"
      }
    },
    seo: {
      title: "Essence Wellness - Nhan Sắc Khỏe Mạnh Khởi Nguồn",
      description: "Thẩm mỹ viện phong cách Thụy Sĩ sang trọng tại trung tâm Quận 1."
    }
  }
};

export function getMockBusinessByPlaceId(placeId: string): DemoPageData | null {
  if (!placeId) return null;
  // Fallback / loose matching
  const key = placeId.toLowerCase();
  if (mockClinics[key]) {
    return mockClinics[key];
  }
  // Try to find matching prefix or substring
  const foundKey = Object.keys(mockClinics).find(k => k.includes(key) || key.includes(k));
  if (foundKey) {
    return mockClinics[foundKey];
  }
  return null;
}

export function getMockDemoData(placeId: string): DemoPageData {
  const customData = getMockBusinessByPlaceId(placeId);
  if (customData) {
    return customData;
  }
  // Default fallback is the main "aura-clinic" dataset as requested!
  return mockClinics["aura-clinic"];
}
