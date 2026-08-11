import { DemoPageData } from '../../types/demo';

export const DEFAULT_CLINIC_DATA: DemoPageData = {
  business: {
    name: 'MedCore Clinic',
    phone: '1900 68XX',
    address: '123 Đường Sức Khỏe, Quận 1, TP. Hồ Chí Minh',
    workingHours: 'Thứ 2 - Chủ Nhật: 07:00 - 20:00'
  },
  template: {
    key: 'general-clinic',
    name: 'Phòng Khám Đa Khoa'
  },
  hero: {
    badge: 'PHÒNG KHÁM ĐẠT CHUẨN QUỐC TẾ',
    title: 'Chăm Sóc Sức Khỏe Toàn Diện Cho Gia Đình',
    subtitle: 'Tận hưởng dịch vụ y tế chuyên nghiệp ngay tại TP. Hồ Chí Minh với đội ngũ y bác sĩ tận tâm, trang thiết bị hiện đại và quy trình khám chữa bệnh nhanh chóng.',
    primaryAction: {
      label: 'Đặt Lịch Khám Ngay',
      href: '#contact'
    },
    secondaryAction: {
      label: 'Tìm Hiểu Thêm',
      href: '#about'
    },
    image: {
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC-lOaoYrWiIIUsnPWFobKFXlgHQZe4TSf9GE5Bpu_jSMszWWef_d7Iv6tvCJT_xd4u_eJjifMFHHkKH0yx_qmE3p55o4ekRoGFn7WN1WmKODlFcoCzO-4gHuNds2JfKr5sxOE8Fe2qtqM0PfhJubOJPhWyfZeKoiSI2bXZpyP-Bv_INYkrWidwH_QyGA5n3O8BQ0bGXmPl-YQdNrc56dW0EKwzWjWJFHxRT8oS7vpYFetvDf5OHskYtw',
      alt: 'MedCore Clinic Modern Interior Background'
    }
  },
  trust: {
    rating: 4.9,
    reviewCount: 500,
    achievements: ['ISO 9001:2015', 'Hội Y Học Việt Nam', 'Top 10 Clinic 2023']
  },
  about: {
    title: 'Tận Tâm Vì Sức Khỏe Cộng Đồng',
    description: 'MedCore Clinic được thành lập với sứ mệnh mang đến dịch vụ y tế chất lượng cao, dễ dàng tiếp cận cho mọi gia đình. Chúng tôi tin rằng mỗi bệnh nhân đều xứng đáng nhận được sự chăm sóc tận tình nhất trong một không gian an toàn và chuyên nghiệp.',
    stats: [
      {
        value: '50+ Bác Sĩ',
        label: 'Đội ngũ chuyên môn',
        description: 'Chuyên gia hàng đầu từ các bệnh viện lớn.'
      },
      {
        value: '10k+ Bệnh Nhân',
        label: 'Khách hàng tin cậy',
        description: 'Tin tưởng và lựa chọn khám chữa bệnh mỗi năm.'
      }
    ],
    image: {
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1Ib-dH6x4RjjsQXwtBAqDYWkZoIsFDAva_1Fn77dKQPApTmhzYwBZMsVaALRLrSmS1pgnmHzAdnsrIjc1mDhAYYnqN8yI9SgyrC1jkx042R6jP_Smtb89NsDjIPjvltKYHEg6LC0nN6wxNYKU5UMmFETmW-BTBNiZIT8z6_w89ldqBWmB8g51pXQGL_uUqGPSVqQ7ugGOkzGBQuGkLDet_XrZFEDUaziU1V79MTQ7lU5nMpcayU_Ejg',
      alt: 'Modern medical laboratory at MedCore'
    },
    ctaLabel: 'Tìm hiểu thêm về đội ngũ'
  },
  services: [
    {
      id: 'sv-1',
      title: 'Khám Tổng Quát',
      description: 'Tư vấn sức khỏe ban đầu, kiểm tra các chỉ số cơ bản để phòng ngừa và phát hiện sớm các nguy cơ bệnh lý.',
      icon: 'clinical_notes'
    },
    {
      id: 'sv-2',
      title: 'Khám Chuyên Khoa',
      description: 'Đội ngũ bác sĩ giàu kinh nghiệm trong các lĩnh vực Nội khoa, Ngoại khoa, Nhi khoa và Sản phụ khoa.',
      icon: 'psychiatry'
    },
    {
      id: 'sv-3',
      title: 'Xét Nghiệm',
      description: 'Quy trình lấy mẫu và trả kết quả nhanh chóng, chính xác tuyệt đối.',
      icon: 'biotech'
    },
    {
      id: 'sv-4',
      title: 'Tư Vấn Gia Đình',
      description: 'Thân thiện, tận tâm, giúp xây dựng lối sống lành mạnh cho cả nhà.',
      icon: 'family_restroom'
    },
    {
      id: 'sv-5',
      title: 'Theo Dõi Tái Khám',
      description: 'Chăm sóc liên tục sau điều trị, nhắc lịch khám định kỳ chu đáo.',
      icon: 'update'
    }
  ],
  gallery: [
    {
      id: 'gal-1',
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_o339UBYZARKD2s_bMz7OiNLpEnwzgq3x2buUuAAZseEzwEcj42XOwfDdyvQdgNAqJT12LEh60AiSaUhWNmou-xwr60ksqNVWcXrR6dRgZoO9QgeuLKNkZgyQF2hw4qk7XHaCMmi2VbjPodZ-okOYHTU8X-pxUhmwLkMq2c2WDAG5m4FXhUVMs_S9jsJ8Cb35YEIpt6Tl9AYmVfax_DcUraMfMMVLc5C_U9cdGcY7hO5a-sQmRCIP5A',
      alt: 'Khu Vực Tiếp Đón Sang Trọng',
      title: 'Khu Vực Tiếp Đón Sang Trọng'
    },
    {
      id: 'gal-2',
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5Fb3dJs2VVx1ZWWgtRBikD-tHLmwtiA_Qq2zPICAxfmU86A2TTih8BeUAydPuDpxcRSB5DXV7-FwwNt4Jx6Igsw1TzbZHWEraRt60aN4cM8FMa3PlThkz1pjPN7PrN4puUguc8W8WvOJapbmnJV9felLxA6Rl44XrrvlolUSv-3riertv41w_1rr-gkCIlmbVL7OidKCwcU4Wo84M6b6tc4jMb4isQVCE0uG4UU7w8h1a-saRZc6QLA',
      alt: 'Phòng Chờ Hiện Đại',
      title: 'Phòng Chờ Hiện Đại'
    },
    {
      id: 'gal-3',
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBHmbkFQ8UGatBse3v56JaCSKjk3d9TRJH0wYu9Plc44i7GOl-wQSzhUNDybAHGymUx8yH4CemSaww7UpMlX2w-VywcPPlEbq5egBEKbP3s8ykuKU6SpP39IKxNm8RsldRALQnXEFUMG46sqN8nFy-TNUI95bT_pW3NZ3Qm2dS68JrURjKm5O2AWRs7sZj6pAOZtjjn7IOy4i1z73gWm2duBq4TZzS4Jd4qoI0Lyr3nakEYl5i5KY2KfA',
      alt: 'Trang Thiết Bị Tiên Tiến',
      title: 'Trang Thiết Bị Tiên Tiến'
    }
  ],
  reviews: [
    {
      id: 'rev-1',
      author: 'Chị Lan Hương',
      rating: 5,
      text: '"Dịch vụ rất chuyên nghiệp. Tôi không phải chờ đợi lâu và bác sĩ tư vấn cực kỳ kỹ lưỡng. Sẽ quay lại!"',
      avatarSrc: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAuXXVgf3joRhYYMLgR-CUpVC6wM5mbXqsURSMLf1fDV7k6-RrbQf7LM_l20Pk93WX5G2-sIwo5dffjRXrfLIbCouXMnY22UOgF6tc16SMlkPe2dSQUGZ5TnL3QH1LiVdfoNjWCYBAI5HDfyCFQI4HyQ8o13jsS0Va2ue2_fxp2beuM0now0OSc-Wnq8iwI52OsE_FB0Pic05sia7WLy9u7k6I80-jQ2DN8DVWZNNxxZ9B7qdY0wQ4ATA',
      avatarAlt: 'Portrait of Lan Huong'
    },
    {
      id: 'rev-2',
      author: 'Anh Minh Tuấn',
      rating: 5,
      text: '"Phòng khám sạch sẽ, trang thiết bị hiện đại. Con tôi rất thích các cô y tá ở đây vì các cô rất nhẹ nhàng."',
      avatarSrc: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1EgOGK7J5SbNcycjPfk9wD-HGTcRaPbsgST-y8lOs0iS9KutxPpnpAsYp2ARyabjN2qlQQVyLgduU2v7tX27SfQqKHnn0yoIRkwYSQg7v0K4Z7AQ2npi-8e5FT5ILkHL0WY3ZnYty_CJRMTBGWyXmkDjPi1KgIDL0vQ_Nzjk5ksqf1tvQYrD_QJLsAozq3unZbCC_C84ki3cxZXTB-7Jhb-S-6cP5c0CcrphL3jQKKuwXjNIAZKzYHw',
      avatarAlt: 'Portrait of Minh Tuan'
    },
    {
      id: 'rev-3',
      author: 'Bác Hùng',
      rating: 5,
      text: '"Giá cả hợp lý, minh bạch. Thủ tục khám bảo hiểm nhanh gọn. Rất hài lòng với dịch vụ tại đây."',
      avatarSrc: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAymNKtMFmOHmeZ2e0RsHGtapiy5F_uQd1Z6TzABTEW2789OCmWvAMO7CLMbAQF8l-m54GKn3E_c2NBRHNACltNi-6x2imLT_FvM1WgAVOgRFCWLHfcG-qnHoeO5_zEH2nqb5ObD700WpSjsZX6108XYHqFtO1sPo6yGU21mvRMmAy_PCI69GUHv3-1NK8wPNnZj9l8JIqTkFsJ77x_58ZJg0qUUGZI_D8lboDCRz3-hCC4gSTgxSBdYg',
      avatarAlt: 'Portrait of Bac Hung'
    }
  ],
  contact: {
    title: 'Liên Hệ Với Chúng Tôi',
    phone: '1900 68XX',
    address: '123 Đường Sức Khỏe, Quận 1, TP. Hồ Chí Minh',
    workingHours: 'Thứ 2 - Chủ Nhật: 07:00 - 20:00',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.485292437343!2d106.69904321533413!3d10.774100662181604!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f385570472f%3A0x178de34ca0190bd3!2zMTIzIMSQxrDhu51uZyBT4bupYyBLaOG7j2UsIFF14bqtbiAxLCBUUC4gSOG7kyBDaMOtIE1pbmg!5e0!3m2!1svi!2svn!4v1689123456789!5m2!1svi!2svn'
  },
  seo: {
    title: 'MedCore Clinic - Chăm Sóc Sức Khỏe Toàn Diện',
    description: 'Chăm sóc sức khỏe toàn diện cho gia đình bạn với đội ngũ bác sĩ uy tín, trang thiết bị y tế hiện đại đạt chuẩn quốc tế tại TP. Hồ Chí Minh.'
  }
};

export const mockBusinesses: Record<string, DemoPageData> = {
  'medcore-clinic': DEFAULT_CLINIC_DATA,
  'phong-kham-tam-anh': {
    ...DEFAULT_CLINIC_DATA,
    business: {
      name: 'Phòng Khám Đa Khoa Tâm Anh',
      phone: '1800 60XX',
      address: '2B Phổ Quang, Phường 2, Quận Tân Bình, TP. Hồ Chí Minh',
      workingHours: 'Thứ 2 - Thứ 7: 06:30 - 19:00 | Chủ Nhật: 07:00 - 12:00'
    },
    hero: {
      ...DEFAULT_CLINIC_DATA.hero,
      title: 'Tận Tâm Chăm Sóc, Chia Sẻ Yêu Thương',
      subtitle: 'Quy tụ đội ngũ chuyên gia đầu ngành, trang bị hệ thống máy móc tối tân hàng đầu thế giới, mang lại chất lượng khám chữa bệnh vượt trội.'
    },
    contact: {
      ...DEFAULT_CLINIC_DATA.contact,
      phone: '1800 60XX',
      address: '2B Phổ Quang, Phường 2, Quận Tân Bình, TP. Hồ Chí Minh',
      workingHours: 'Thứ 2 - Thứ 7: 06:30 - 19:00 | Chủ Nhật: 07:00 - 12:00'
    },
    seo: {
      title: 'Phòng Khám Đa Khoa Tâm Anh - Chuyên Nghiệp & Đáng Tin Cậy',
      description: 'Chất lượng khám chữa bệnh vượt trội với trang thiết bị tối tân hàng đầu thế giới tại Phòng Khám Tâm Anh.'
    }
  },
  'phong-kham-minh-tam': {
    ...DEFAULT_CLINIC_DATA,
    business: {
      name: 'Phòng Khám Đa Khoa Minh Tâm',
      phone: '028 3844 XXXX',
      address: '42A Trần Quốc Thảo, Võ Thị Sáu, Quận 3, TP. Hồ Chí Minh',
      workingHours: 'Thứ 2 - Chủ Nhật: 07:30 - 20:30'
    },
    hero: {
      ...DEFAULT_CLINIC_DATA.hero,
      title: 'Y Đức Hàng Đầu, Sức Khỏe Khởi Đầu',
      subtitle: 'Phòng khám đa khoa Minh Tâm mang đến dịch vụ khám chữa bệnh chất lượng cao với chi phí tối ưu, bảo lãnh viện phí nhanh gọn.'
    },
    contact: {
      ...DEFAULT_CLINIC_DATA.contact,
      phone: '028 3844 XXXX',
      address: '42A Trần Quốc Thảo, Võ Thị Sáu, Quận 3, TP. Hồ Chí Minh',
      workingHours: 'Thứ 2 - Chủ Nhật: 07:30 - 20:30'
    },
    seo: {
      title: 'Phòng Khám Đa Khoa Minh Tâm - Khám Bệnh Uy Tín Quận 3',
      description: 'Dịch vụ khám chữa bệnh chất lượng cao với chi phí tối ưu, thuận tiện và bảo lãnh viện phí nhanh tại Phòng khám Minh Tâm.'
    }
  }
};

export function getMockBusinessByPlaceId(placeId: string): DemoPageData {
  if (!placeId) {
    return DEFAULT_CLINIC_DATA;
  }
  
  const found = mockBusinesses[placeId];
  if (found) {
    return found;
  }
  
  // Dynamic generation for unknown place_id to make it super cool and realistic!
  const formattedName = placeId
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const clinicName = formattedName.toLowerCase().includes('clinic') || formattedName.toLowerCase().includes('khám')
    ? formattedName
    : `Phòng Khám ${formattedName}`;

  return {
    ...DEFAULT_CLINIC_DATA,
    business: {
      ...DEFAULT_CLINIC_DATA.business,
      name: clinicName
    },
    contact: {
      ...DEFAULT_CLINIC_DATA.contact,
      title: `Liên Hệ Với ${clinicName}`
    },
    seo: {
      title: `${clinicName} - Phòng Khám Đa Khoa Uy Tín`,
      description: `Khám sức khỏe uy tín, chất lượng hàng đầu tại ${clinicName}. Đội ngũ bác sĩ giàu kinh nghiệm.`
    }
  };
}
