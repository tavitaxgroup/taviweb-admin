import { DemoPageData } from "../../types/demo";

export const DEFAULT_CLINIC_TEMPLATE_DATA: DemoPageData = {
  business: {
    name: "Aura Clinic",
    phone: "090 123 4567",
    email: "contact@auraclinic.vn",
    address: "123 Đường Nam Kỳ Khởi Nghĩa, Quận 3, TP. Hồ Chí Minh",
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
      alt: "Lobby"
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
      }
    ]
  },
  about: {
    badge: "GIỚI THIỆU",
    title: "Về AURA CLINIC",
    description1: "Tại Aura Clinic, chúng tôi tin rằng vẻ đẹp đích thực bắt nguồn từ sự tự tin và sức khỏe nội tại.",
    description2: "Chúng tôi cam kết mang lại trải nghiệm làm đẹp an toàn và hiệu quả.",
    image: {
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBCY_hmgasARYG7UzlOe9j6tVPckVKktgsQar8JynRV-cjnFKZgUA-C3_x3lNy3DlYMx0I4XlGeSJdthd47Osesqe_6ITvYFBblRdDWzISL0l8wZwoU6KjXwEYYrAowuNzbIFRdvlyIX_zQ6dpFzOAN14drfokVK4w35kwZpNrP7VzNiOPej6FeU-_k2cw7Nw2wulcunjGxCZi3KnE2KNO2VQ-gcbEhxwQ7l3SDlTITPAdMuUqNaNvgQw",
      alt: "Consultation"
    },
    experienceYears: 10,
    experienceLabel: "Năm kinh nghiệm trong ngành thẩm mỹ",
    points: [
      "Cơ sở vật chất chuẩn 5 sao",
      "Đội ngũ chuyên nghiệp"
    ]
  },
  services: [],
  gallery: [],
  reviews: [],
  contact: {
    title: "Sẵn sàng để tỏa sáng?",
    description: "Hãy để chúng tôi đồng hành cùng hành trình tôn vinh nét đẹp của bạn.",
    primaryAction: {
      label: "Liên hệ ngay",
      href: "#contact-section"
    },
    phoneAction: {
      label: "090 123 4567",
      href: "tel:0901234567"
    }
  },
  seo: {
    title: "Aura Clinic Premium",
    description: "Thẩm mỹ viện đẳng cấp thượng lưu"
  }
};
