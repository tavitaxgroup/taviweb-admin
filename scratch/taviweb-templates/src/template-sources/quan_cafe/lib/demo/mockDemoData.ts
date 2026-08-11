import { DemoPageData } from '../../types/demo';

export const mockBusinesses: Record<string, DemoPageData> = {
  'quan-cafe-dep': {
    business: {
      name: 'Quán Cafe Đẹp',
      phone: '0901234567',
      address: '123 Đường Sáng Tạo, Quận 1, TP. Hồ Chí Minh',
      email: 'hello@quancafedep.vn',
      facebookUrl: 'https://MessageCircle.com/quancafedep',
      mapUrl: 'https://maps.google.com/?q=123+Duong+Sang+Tao+Quan+1+TPHCM',
      rating: 4.9,
      ratingCount: 1250,
      openHours: 'Thứ 2 - Chủ Nhật | 07:00 - 22:30'
    },
    template: {
      key: 'cafe',
      name: 'Cafe Template'
    },
    hero: {
      title: 'Ghé quán, tìm chút bình yên giữa lòng phố',
      subtitle: 'Một không gian ấm cúng, tách cà phê đậm vị và những bản nhạc nhẹ nhàng. Dù bạn đến để làm việc hay hẹn hò, chúng tôi luôn sẵn sàng đón tiếp.',
      backgroundImage: {
        src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDV1aN5VB3U6C4wB5oAqs3pDNfadO7tXLu6-5CWZlDa6bWPGP3y0GlyqCZRIhiX1FswVOiFkttru-bv1t7vnYaHgg3zoCSgLuTJPfR4v2GlcdpPomuxlYWGvVdi31Z2gjXC1f3JY6olsAmo4grUoVS1VSXmrZIwEVISOncTaB-E4VQjKmpqqCuTUWy6C9qFWr7O-o_0lQvpjxk7TyRKfvrRcYn5Q2si8yzbzMMYGJH5IbN6TUtnFP5J',
        alt: 'Không gian ấm cúng của Quán Cafe Đẹp'
      },
      primaryAction: {
        label: 'Xem đường đi',
        href: '#contact'
      },
      secondaryAction: {
        label: 'Gọi quán ngay',
        href: 'tel:0901234567'
      }
    },
    trust: {
      ratingText: 'ĐÁNH GIÁ TRÊN GOOGLE MAPS',
      customerCountText: 'KHÁCH HÀNG TIN YÊU',
      checkInCountText: 'LƯỢT CHECK-IN MỖI THÁNG'
    },
    about: {
      badge: 'CHÚNG TÔI LÀ AI',
      title: 'Về Quán Cafe Đẹp',
      description: 'Được thành lập với sứ mệnh mang đến những khoảnh khắc bình yên cho những người bận rộn. Chúng tôi trân trọng hạt cà phê Việt, gìn giữ cách pha chế thủ công và chú trọng từng chi tiết trong thiết kế không gian.',
      image: {
        src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBeGB2CDVHakvpez4j0n9Sw4al9xKFvpH2WrryXrPH1hNXNJH35CgMVFi7lwTWTOxJ1pwWjmW75HWGFdQfdTi4NQjedaScOCmLmkYjn_WVWFEvBc5N8flJbbutgHsiDZm6812u_k1FOZDfFd7X9FjBonbpRJoxFViPQkASeCa-SQWfNGp_ulk-2gBF3Ko7NYHQYBxvoKPTFOpQ3ctTCtZsjFgc2_70YPH5iHQrjdq08hwg3nebeT5c3',
        alt: 'Góc ngồi thảnh thơi tại Quán Cafe Đẹp'
      }
    },
    services: [
      {
        id: 's1',
        title: 'Cà phê & Đồ uống',
        description: 'Hương vị mộc mạc, từ Robusta đậm đà đến Latte nghệ thuật.',
        icon: 'local_cafe'
      },
      {
        id: 's2',
        title: 'Gặp gỡ & Kết nối',
        description: 'Không gian lý tưởng cho các buổi họp nhóm hay làm việc tập trung.',
        icon: 'groups'
      },
      {
        id: 's3',
        title: 'Take-away',
        description: 'Tiện lợi và nhanh chóng, sẵn sàng cho những ngày bận rộn của bạn.',
        icon: 'shopping_bag'
      },
      {
        id: 's4',
        title: 'Góc check-in',
        description: 'Mỗi mét vuông đều được thiết kế để bạn lưu lại những bức hình đẹp nhất.',
        icon: 'photo_camera'
      },
      {
        id: 's5',
        title: 'Sự kiện nhỏ',
        description: 'Hỗ trợ tổ chức workshop, sinh nhật ấm cúng theo yêu cầu.',
        icon: 'celebration'
      }
    ],
    gallery: [
      {
        id: 'g1',
        src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuARiMfc8lnxYgM_HeceqUjHK28OLl3nl_SOJdLRpoD0KZDorsuCq254SEwedtCHdaY_TkbACpt2OndLXaE54BwuQFOZanCsGE-jS5jLYwNqWE4n7nBhu0uO8avInGqnd8IkxQK8c0_mnE7d7T1r-uDuiodJGsxcoN1vj3cwaIqlJYPt7W_LNgwxLleC1U6etS-hBnWwyL63Pk5vCFj1YjeKO02vAOaj-wGtO-EHTesB4d49rLS7U5Px',
        alt: 'Nghệ thuật vẽ bọt sữa Latte',
        title: 'Hương vị tinh tế',
        subtitle: 'Nghệ thuật pha chế từ những nghệ nhân tâm huyết.'
      },
      {
        id: 'g2',
        src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBeGB2CDVHakvpez4j0n9Sw4al9xKFvpH2WrryXrPH1hNXNJH35CgMVFi7lwTWTOxJ1pwWjmW75HWGFdQfdTi4NQjedaScOCmLmkYjn_WVWFEvBc5N8flJbbutgHsiDZm6812u_k1FOZDfFd7X9FjBonbpRJoxFViPQkASeCa-SQWfNGp_ulk-2gBF3Ko7NYHQYBxvoKPTFOpQ3ctTCtZsjFgc2_70YPH5iHQrjdq08hwg3nebeT5c3',
        alt: 'Mặt tiền Quán Cafe Đẹp nên thơ',
        title: 'Bên ngoài hiên quán',
        subtitle: 'Nơi cây xanh đón nắng mai.'
      },
      {
        id: 'g3',
        src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA613ur8Fp-ValDKKpRDaJI_JjMlsj2-eB72Vir-dCoGgi2ySYTamCWgmpN9-2ucO8OQEh58fPEZxXBtQb9Whccs26RNJgRRyLMpSUXkbxh9P-Nd0DylRwcqCTkdEUQ95Aits4OFw18AP_p2bkTgtr-80-vqONfzDOquzsznW8pNQWbnP8CTudnLQ7G2weGXcJ0KbRYCTHXPG35xX73YfnU2WIW7mWBn_3aIuLSTnaz9TNHjLio67t5',
        alt: 'Cà phê nóng hổi và bánh croissant giòn rụm',
        title: 'Thực đơn ngọt ngào',
        subtitle: 'Bánh sừng bò mới ra lò thơm bơ.'
      },
      {
        id: 'g4',
        src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMR9DR_STaAgOf5w_oo6FBdahPA5TKLNiQMPrYg-qwE4zDHS4wNjcPUd-zh4-vWf4A68AGhtxHFRZILcgr0CuHuG_KOq9HmRby6w2O9PBsfTRUSfQ4_YKcprZXaW79r87EYNkZmrAD6WDEjYNodbwfVASUgyaIcb38wqptFONXxHKjIHzj2BjykE3EGnYBdQWtGJQOR4o7KA_16rMBIqteu4ZaTOAyyYV4zLWwYd792i659now-3Fr',
        alt: 'Khách hàng trò chuyện vui vẻ tại quán',
        title: 'Góc tâm tình',
        subtitle: 'Nơi những câu chuyện bắt đầu.'
      }
    ],
    whyChooseUs: {
      badge: 'GIÁ TRỊ CỐT LÕI',
      title: 'Tại sao khách hàng luôn quay trở lại?',
      items: [
        {
          id: 'w1',
          title: 'Cà phê nguyên bản',
          description: 'Chúng tôi chọn lọc kỹ lưỡng từ các nông hộ bền vững tại Việt Nam, mang đến hương vị cà phê mộc mạc và chân thực nhất.',
          icon: 'eco'
        },
        {
          id: 'w2',
          title: 'Kiến trúc chữa lành',
          description: 'Sự kết hợp hoàn hảo giữa vật liệu gỗ tự nhiên và ánh sáng mặt trời, tạo nên một không gian "zen" thực thụ giữa phố thị.',
          icon: 'architecture'
        },
        {
          id: 'w3',
          title: 'Sự phục vụ tận tâm',
          description: 'Mỗi khách hàng là một người bạn. Đội ngũ barista của chúng tôi không chỉ pha chế, họ gửi gắm cả tâm tình vào mỗi ly nước.',
          icon: 'volunteer_activism'
        }
      ]
    },
    reviews: [
      {
        id: 'r1',
        authorName: 'Minh Tú',
        authorRole: 'Google Local Guide',
        authorInitials: 'MT',
        rating: 5,
        text: 'Quán có vibe rất chill, đặc biệt là góc ngồi bên cửa sổ. Cà phê sữa đá ở đây đậm vị đúng chuẩn mình thích. Cảm giác thật sự thư giãn.'
      },
      {
        id: 'r2',
        authorName: 'An Nguyên',
        authorRole: 'Freelancer Designer',
        authorInitials: 'AN',
        rating: 5,
        text: 'Không gian làm việc cực kỳ yên tĩnh. Playlist nhạc của quán rất có gu, nhẹ nhàng vừa đủ để tập trung. Nhân viên lại cực kỳ tâm lý!'
      },
      {
        id: 'r3',
        authorName: 'Lan Hương',
        authorRole: 'Marketing Specialist',
        authorInitials: 'LH',
        rating: 5,
        text: 'Bánh croissant ở đây ăn kèm cà phê latte là tuyệt vời nhất. Vỏ bánh giòn rụm, bơ thơm lừng. Chắc chắn sẽ còn quay lại nhiều lần.'
      }
    ],
    contact: {
      title: 'Liên hệ với quán',
      subtitle: 'Hãy để chúng tôi mời bạn một tách cafe. Một ngày của bạn sẽ tuyệt vời hơn bắt đầu từ Quán Cafe Đẹp.',
      addressLabel: 'Địa chỉ',
      addressValue: '123 Đường Sáng Tạo, Quận 1, TP. Hồ Chí Minh',
      hoursLabel: 'Giờ mở cửa',
      hoursValue: 'Thứ 2 - Chủ Nhật | 07:00 - 22:30',
      emailLabel: 'Email',
      emailValue: 'hello@quancafedep.vn',
      primaryAction: {
        label: 'Chỉ đường',
        href: 'https://maps.google.com/?q=123+Duong+Sang+Tao+Quan+1+TPHCM'
      },
      secondaryAction: {
        label: 'Nhắn MessageCircle',
        href: 'https://MessageCircle.com/quancafedep'
      }
    },
    seo: {
      title: 'Quán Cafe Đẹp - Bình yên giữa lòng phố',
      description: 'Ghé Quán Cafe Đẹp để thưởng thức cà phê nguyên bản, bánh croissant thơm ngon và trải nghiệm không gian chữa lành tuyệt đẹp tại Sài Gòn.'
    }
  },
  'coffee-house-signature': {
    business: {
      name: 'Artisanal Brew & Hearth',
      phone: '02899998888',
      address: '456 Đại lộ Hòa Bình, Quận 3, TP. Hồ Chí Minh',
      email: 'contact@artisanalbrew.vn',
      facebookUrl: 'https://MessageCircle.com/artisanalbrew',
      mapUrl: 'https://maps.google.com/?q=456+Dai+lo+Hoa+Binh+Quan+3+TPHCM',
      rating: 4.8,
      ratingCount: 840,
      openHours: 'Mỗi ngày | 06:30 - 22:00'
    },
    template: {
      key: 'cafe',
      name: 'Cafe Template'
    },
    hero: {
      title: 'Hương vị cà phê nguyên bản từ cao nguyên',
      subtitle: 'Chế tác tinh tế từ những hạt cà phê Arabica hảo hạng thu hoạch thủ công tại Lâm Đồng, sấy mộc và rang mẻ nhỏ mỗi tuần.',
      backgroundImage: {
        src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDXr9OXJluDAnQzv8UziXUC1sx-Y4WPXqxHSVuskfPq7ntEFLdzZ267VlEni5bpY6pn3jzklpvbzdVoLAvgYXIbTNcHVqPGE_Ky9M3JpluD01KgmTp3eOZoJtaO-E_lNLmMPt4oazU3thZ6JFoZjf_jLZPkrFTcgLRIJC2Vj4hfxAdEvM6Y9FjVnGAB90mfsSeyn0lepbDJi0qsMXIolGzNaaxRitMh-prxdhxccArnoYePAMpkzgAx',
        alt: 'Sàng lọc hạt cà phê Arabica chất lượng'
      },
      primaryAction: {
        label: 'Bản đồ vị trí',
        href: '#contact'
      },
      secondaryAction: {
        label: 'Đặt bàn trước',
        href: 'tel:02899998888'
      }
    },
    trust: {
      ratingText: 'GOOGLE LOCAL REVIEW',
      customerCountText: 'TÁCH CAFE ĐÃ PHỤC VỤ',
      checkInCountText: 'ĐÁNH GIÁ 5 SAO TRỰC TUYẾN'
    },
    about: {
      badge: 'BẢN SẮC CỦA CHÚNG TÔI',
      title: 'Tận tâm trong từng mẻ rang',
      description: 'Chúng tôi tin rằng ly cà phê ngon nhất là ly cà phê giữ lại trọn vẹn đặc trưng vùng trồng. Với hệ thống rang hiện đại kết hợp giác quan nhạy bén của nghệ nhân, mỗi ngụm cà phê tại Brew & Hearth đều kể một câu chuyện về đất mẹ Lâm Đồng.',
      image: {
        src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuARiMfc8lnxYgM_HeceqUjHK28OLl3nl_SOJdLRpoD0KZDorsuCq254SEwedtCHdaY_TkbACpt2OndLXaE54BwuQFOZanCsGE-jS5jLYwNqWE4n7nBhu0uO8avInGqnd8IkxQK8c0_mnE7d7T1r-uDuiodJGsxcoN1vj3cwaIqlJYPt7W_LNgwxLleC1U6etS-hBnWwyL63Pk5vCFj1YjeKO02vAOaj-wGtO-EHTesB4d49rLS7U5Px',
        alt: 'Nghệ nhân rót nước sôi pha chế cà phê filter'
      }
    },
    services: [
      {
        id: 's1',
        title: 'Pour Over & Cold Brew',
        description: 'Thưởng thức độ sáng trong của cà phê Specialty bằng các phương pháp pha giấy lọc thủ công.',
        icon: 'local_cafe'
      },
      {
        id: 's2',
        title: 'Espresso Bar',
        description: 'Hệ thống máy pha chất lượng cao bảo đảm áp suất trích xuất hoàn hảo nhất.',
        icon: 'coffee'
      },
      {
        id: 's3',
        title: 'Bánh mì nướng lò',
        description: 'Bánh mỳ sourdough, croissants và muffin thơm phức nướng tươi hàng ngày.',
        icon: 'shopping_bag'
      }
    ],
    gallery: [
      {
        id: 'g1',
        src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBeGB2CDVHakvpez4j0n9Sw4al9xKFvpH2WrryXrPH1hNXNJH35CgMVFi7lwTWTOxJ1pwWjmW75HWGFdQfdTi4NQjedaScOCmLmkYjn_WVWFEvBc5N8flJbbutgHsiDZm6812u_k1FOZDfFd7X9FjBonbpRJoxFViPQkASeCa-SQWfNGp_ulk-2gBF3Ko7NYHQYBxvoKPTFOpQ3ctTCtZsjFgc2_70YPH5iHQrjdq08hwg3nebeT5c3',
        alt: 'Góc làm việc lãng mạn'
      },
      {
        id: 'g2',
        src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMR9DR_STaAgOf5w_oo6FBdahPA5TKLNiQMPrYg-qwE4zDHS4wNjcPUd-zh4-vWf4A68AGhtxHFRZILcgr0CuHuG_KOq9HmRby6w2O9PBsfTRUSfQ4_YKcprZXaW79r87EYNkZmrAD6WDEjYNodbwfVASUgyaIcb38wqptFONXxHKjIHzj2BjykE3EGnYBdQWtGJQOR4o7KA_16rMBIqteu4ZaTOAyyYV4zLWwYd792i659now-3Fr',
        alt: 'Cuộc gặp gỡ sôi nổi tại bàn trung tâm'
      }
    ],
    reviews: [
      {
        id: 'r1',
        authorName: 'Hoàng Long',
        authorRole: 'Coffee Critic',
        authorInitials: 'HL',
        rating: 5,
        text: 'Hạt cà phê có hậu vị ngọt tự nhiên rất xuất sắc. Cách trang trí mộc mạc làm tôi cảm thấy thư giãn hoàn toàn sau những giờ chạy deadline bận rộn.'
      }
    ],
    contact: {
      title: 'Đến với Brew & Hearth',
      subtitle: 'Chúng tôi mong muốn mang đến cho bạn trải nghiệm thưởng thức cà phê trọn vẹn nhất trong không gian tràn ngập ánh sáng.',
      addressLabel: 'Địa chỉ xưởng',
      addressValue: '456 Đại lộ Hòa Bình, Quận 3, TP. Hồ Chí Minh',
      hoursLabel: 'Thời gian đón khách',
      hoursValue: 'Mỗi ngày | 06:30 - 22:00',
      emailLabel: 'Hộp thư điện tử',
      emailValue: 'contact@artisanalbrew.vn',
      primaryAction: {
        label: 'Tìm đường đi',
        href: 'https://maps.google.com/?q=456+Dai+lo+Hoa+Binh+Quan+3+TPHCM'
      },
      secondaryAction: {
        label: 'Gửi tin nhắn',
        href: 'https://MessageCircle.com/artisanalbrew'
      }
    },
    seo: {
      title: 'Artisanal Brew & Hearth - Cà phê nguyên bản',
      description: 'Hương vị Specialty Coffee thơm ngon tuyển lựa từ Lâm Đồng, không gian chữa lành lý tưởng tại Quận 3.'
    }
  }
};

export function getMockBusinessByPlaceId(placeId: string): DemoPageData | undefined {
  return mockBusinesses[placeId] || mockBusinesses['quan-cafe-dep'];
}

export function getMockDemoData(placeId: string): DemoPageData {
  return getMockBusinessByPlaceId(placeId) || mockBusinesses['quan-cafe-dep'];
}
