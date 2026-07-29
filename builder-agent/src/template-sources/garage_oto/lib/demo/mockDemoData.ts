import { DemoPageData } from '../../types/demo';

export const mockDemoData: Record<string, DemoPageData> = {
  'garage-hcm': {
    business: {
      name: 'AutoGarage Hồ Chí Minh',
      phone: '090 123 4567',
      phoneAlt: '098 765 4321',
      email: 'contact@hcm-autogarage.com',
      address: '123 Đường Số 7, Phường Tân Tạo, Quận Bình Tân, TP.HCM',
    },
    template: {
      key: 'auto-garage',
      name: 'Industrial Integrity',
    },
    hero: {
      title: 'Dịch Vụ Sửa Chữa Ô Tô Đáng Tin Cậy',
      subtitle: 'Bảo dưỡng chuyên nghiệp, kiểm tra nhanh chóng, minh bạch chi phí. Chúng tôi chăm sóc xe của bạn bằng sự chính xác và công nghệ hiện đại.',
      image: {
        src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBcRVPB6YdpUMr6ElInFZZ8wxDW6LSSK1gmY-N6PJZ35OAwqAROBB-1xo9z5j1laMHYIEVOOGsjEQ3htG2p6iUci0MFwsVR71GFFIyPbSRzNGAjkRBXd91P2AmrNSTB8u4PbTmnM0oT08SDf9QTJgWSOrlepy7LIPovFytRtq9EbceZuBLQwHw5uj8rwyan8UPg1ANz74IzWKareBGS3gzRVP-cIKJUYWalXKGU6wwbFQbtET5LCPym1g',
        alt: 'A professional automotive workshop with clean, industrial aesthetic. A modern silver car is elevated on a hydraulic lift in the center of the frame. High-key clinical lighting highlights organized tool racks and a polished concrete floor.',
      },
      primaryAction: {
        label: 'Gọi kiểm tra xe',
        href: 'tel:0901234567',
      },
      stats: {
        badge: 'CHỨNG NHẬN',
        title: 'Chuyên Gia Kỹ Thuật',
        values: [
          { value: '5000+', label: 'Xe Đã Sửa' },
          { value: '10+', label: 'Năm Kinh Nghiệm' },
        ],
      },
    },
    trust: {
      badges: [
        {
          icon: 'report_problem',
          title: 'Báo lỗi rõ ràng',
          description: 'Chi tiết mọi vấn đề kỹ thuật',
        },
        {
          icon: 'speed',
          title: 'Kiểm tra nhanh chóng',
          description: 'Tiết kiệm thời gian cho bạn',
        },
        {
          icon: 'contact_support',
          title: 'Dễ dàng liên hệ',
          description: 'Hỗ trợ 24/7 qua hotline',
        },
      ],
    },
    about: {
      label: 'GIỚI THIỆU CHÚNG TÔI',
      title: 'Hơn Một Thập Kỷ Tận Tâm Với Mọi Loại Xe',
      description1: 'AutoGarage được thành lập với mục tiêu thay đổi trải nghiệm sửa chữa ô tô tại Việt Nam. Chúng tôi kết hợp đội ngũ kỹ thuật viên tay nghề cao với những thiết bị chẩn đoán tiên tiến nhất thế giới.',
      description2: 'Mọi quy trình tại xưởng đều được chuẩn hóa, từ khâu tiếp nhận xe đến khâu bàn giao. Chúng tôi không chỉ sửa xe, chúng tôi mang lại sự an tâm tuyệt đối trên mỗi dặm đường bạn đi.',
      points: [
        'Đội ngũ kỹ thuật được đào tạo bài bản',
        'Báo giá minh bạch, không phát sinh',
      ],
      image: {
        src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDzZ2uP51kKfBq1jGeYTYagpEyP7T4nw_ji7ezDHsQQyOgeH6RmjGi9M-44NW7NyybCXnYtCg7MYqnwGSvShnUNznA6PnoGiwwcqddQvQzSK4OYT6llmC-aKnUGDbAfYp9dA8ZN8CnIukzvsZ7JEjW8z3E498ZoY-hjYk8pWLWnASgeJ9ymJm4V9VmDeQwrvi3VLV-KcDMKm8IR3XKa-rI5tIZxLEatJAjRPBpesr6WGPyUc3HjrpV7jQ',
        alt: "Close-up of a skilled mechanic's hands wearing black nitrile gloves, using a high-tech digital diagnostic tablet to scan an engine.",
      },
      badge: {
        label: 'CHẤT LƯỢNG HÀNG ĐẦU',
        value: 'Cam Kết Phụ Tùng Chính Hãng',
      },
    },
    services: [
      {
        id: 's1',
        title: 'Bảo dưỡng định kỳ',
        description: 'Thay dầu, lọc gió, kiểm tra hệ thống an toàn theo tiêu chuẩn hãng.',
        icon: 'calendar_today',
        href: '#contact',
      },
      {
        id: 's2',
        title: 'Sửa chữa động cơ',
        description: 'Đại tu, sửa chữa các lỗi động cơ từ đơn giản đến phức tạp.',
        icon: 'settings_suggest',
        href: '#contact',
      },
      {
        id: 's3',
        title: 'Điện/điện lạnh ô tô',
        description: 'Kiểm tra hệ thống điện, điều hòa, xử lý triệt để các lỗi cảm biến.',
        icon: 'bolt',
        href: '#contact',
      },
      {
        id: 's4',
        title: 'Lốp và phanh',
        description: 'Cân bằng động, thay lốp, bảo dưỡng hệ thống phanh an toàn.',
        icon: 'tire_repair',
        href: '#contact',
      },
      {
        id: 's5',
        title: 'Kiểm tra tổng quát',
        description: 'Chẩn đoán bằng máy chuyên dụng trước khi mua bán hoặc đi xa.',
        icon: 'fact_check',
        href: '#contact',
      },
    ],
    gallery: [
      {
        image: {
          src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCtAGU1u3YmklMgXLUu_CF-L6G6d0PyMCue402228I1p_0xHMLe_yFOK7k0cxxNCRjeNOsJWKuyFxwyvNkHoRAc6dqw40QdPPPq8SpjHW8EGt2__EFnxOhytqwng7PJPWilloD881aI8JoS2M_WTgxWpGvfC0-7gDk0cCgqTLIg7Ylp-xou0B-RSLAH2gmRPLFO4KkwB1GtHHf6FAJuTdn4MJlJBVdvAiFFvzmPIvfQfeAZyr5fqyUoBA',
          alt: 'A wide angle shot of a clean, brightly lit, and spacious modern automotive garage.',
        },
        caption: 'Xưởng Dịch Vụ Tổng Quát',
        size: 'large',
      },
      {
        image: {
          src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCQkxJskTYTMfSe4aVj8ucZc7ZdFE7DzMUwcd9TKh2kxv1nVkKCmI0Xico-0KwjRQLVn9SqmuoWXMnKqjdappM5Xk91UrUGE1HYpSHGLKNk4QqhQqQ2cxUlSgOqpOPzAYP8ukxmAS6WCByW_VmSHovATpmrCIgGG852rlTED4n61IXcHIENTlNUiSJqUgtzo5OyjkCSpnTQ8SROP3G1u3yf6jkOVEMbnoW806QGltJv-9F69yek0onuNQ',
          alt: 'Detailed close-up of high-quality professional automotive tools arranged neatly on a dark gray shadow board.',
        },
        caption: 'Công Cụ Chẩn Đoán & Thiết Bị',
        size: 'normal',
      },
      {
        image: {
          src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDWSOS_pHtarWPZQKihAFykeDWrIV_lMScy4dZ7OKgJXFs9VcHf8lMc8IHYDCXC8tay8aFh5GIs_xhwDgyG0laXoDlbJzwvFRJ8roOZ1fLVipp1G76j3mAeeF3Eek17DvlJlleCjs4tC0DgK9HRSBfCc8ChS_hS7xoTj9sw5roEddy3wMWpK0PaHgK5EZasEE_q9Y8ALOZCTnrMjOY9ydYBr6XlbE7H0M6Lz_MQB6UDNIU0JvdW9RleHw',
          alt: 'A skilled automotive technician focuses on a complex electrical board inside a modern car cabin.',
        },
        caption: 'Sửa Hệ Thống Điện Ô Tô',
        size: 'normal',
      },
      {
        image: {
          src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBD3YOa05a78a4hxReUW8eCQzIfImadra1z3WFVzGMbxGPLSQF0TYrboObnEqFKmE5wLewtIN1QkpMt43Cgzgu-25t--fTVI3j5ArhGQJbP--f-GTzahjuem84eB37N_R9C4xh63qtLpiSqHdR6W40cFND5FMVXDpHWKblhIpQjqpPwC3_0EJnuIkT9R2B97BDPyowA-f0cFbPkGiU2McTxQ__-_vcqOnMScIB0Pxfx0IeHL8zHgFbo-w',
          alt: 'A wide interior view of the reception area and lounge for customers.',
        },
        caption: 'Phòng Chờ Khách Hàng',
        size: 'large',
      },
    ],
    reviews: [
      {
        id: 'r1',
        author: 'Nguyễn Anh',
        authorInitials: 'NA',
        vehicle: 'Chủ xe Toyota Camry',
        text: 'Dịch vụ rất chuyên nghiệp, nhân viên tư vấn nhiệt tình và báo giá rất rõ ràng. Tôi rất yên tâm khi gửi xe ở đây.',
        rating: 5,
      },
      {
        id: 'r2',
        author: 'Lê Tuấn',
        authorInitials: 'LT',
        vehicle: 'Chủ xe Mercedes C200',
        text: 'Máy lạnh xe tôi bị hỏng lâu ngày, đi nhiều nơi không hết. AutoGarage đã xử lý triệt để chỉ trong 1 ngày. Rất hài lòng!',
        rating: 5,
      },
      {
        id: 'r3',
        author: 'Phạm Hùng',
        authorInitials: 'PH',
        vehicle: 'Chủ xe Honda CR-V',
        text: 'Giá cả cực kỳ minh bạch. Thợ giải thích lỗi rất cặn kẽ để mình hiểu. Đây sẽ là địa chỉ tin cậy lâu dài của gia đình tôi.',
        rating: 5,
      },
    ],
    contact: {
      title: 'Liên Hệ Với Chúng Tôi',
      address: '123 Đường Số 7, Phường Tân Tạo, Quận Bình Tân, TP.HCM',
      phone: '090 123 4567',
      phoneAlt: '098 765 4321',
      hours: [
        'Thứ 2 - Thứ 7: 08:00 - 18:00',
        'Chủ Nhật: 08:00 - 12:00',
      ],
      mapImage: {
        src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBmkJtSoFaAncdruoam8y7ij0XELKFsAHWKAmCzeTRupHZh3OiTCoAsWfdPgjlZtaYKvl6O__3tSGBijLW4RMrohHbGM77LdESo_4hThC78_A4GsqCTJClGhgqOLt7bC7-R73Zo499DK7OFie5Xk5mBRsO-UAmFj5aWZ-lZzk-zrOKIMmA_pgwcvXNUXZk__3suEeRiTovKrYIDUK0pER0bgq8CcIvJ1d7B0kZiLTA9yZ8aGFHnV5mAbQ',
        alt: 'A clean, minimalist overhead map view of urban district showing the garage location.',
      },
      location: 'Ho Chi Minh City',
      primaryAction: {
        label: 'Xem đường đi',
        href: 'https://maps.google.com/?q=123+Duong+So+7,+Binh+Tan,+TP.HCM',
      },
    },
    seo: {
      title: 'AutoGarage Hồ Chí Minh | Sửa Chữa Ô Tô Uy Tín Giá Tốt',
      description: 'Dịch vụ sửa chữa, bảo dưỡng ô tô uy tín hàng đầu TP.HCM. Kỹ thuật viên giàu kinh nghiệm, phụ tùng chính hãng, chẩn đoán lỗi chính xác.',
    },
  },
  'garage-hn': {
    business: {
      name: 'AutoGarage Hà Nội',
      phone: '091 999 8888',
      email: 'hanoi@hanoi-autogarage.vn',
      address: '456 Phố Trần Thái Tông, Quận Cầu Giấy, Hà Nội',
    },
    template: {
      key: 'auto-garage',
      name: 'Industrial Integrity',
    },
    hero: {
      title: 'Xưởng Chăm Sóc Sửa Chữa Xe Toàn Diện',
      subtitle: 'Kỹ thuật viên lành nghề chuẩn hãng, hệ thống máy quét lỗi hiện đại, báo giá trực tuyến minh bạch, cam kết chất lượng.',
      image: {
        src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBcRVPB6YdpUMr6ElInFZZ8wxDW6LSSK1gmY-N6PJZ35OAwqAROBB-1xo9z5j1laMHYIEVOOGsjEQ3htG2p6iUci0MFwsVR71GFFIyPbSRzNGAjkRBXd91P2AmrNSTB8u4PbTmnM0oT08SDf9QTJgWSOrlepy7LIPovFytRtq9EbceZuBLQwHw5uj8rwyan8UPg1ANz74IzWKareBGS3gzRVP-cIKJUYWalXKGU6wwbFQbtET5LCPym1g',
        alt: 'Professional auto garage interior with diagnostic computers and premium service bay.',
      },
      primaryAction: {
        label: 'Gọi kiểm tra ngay',
        href: 'tel:0919998888',
      },
      stats: {
        badge: 'CHUYÊN NGHIỆP',
        title: 'Tiêu Chuẩn Chuẩn Hãng',
        values: [
          { value: '3000+', label: 'Khách Thân Thiết' },
          { value: '8+', label: 'Năm Hoạt Động' },
        ],
      },
    },
    trust: {
      badges: [
        {
          icon: 'report_problem',
          title: 'Chuẩn Đoán Đọc Lỗi Đúng',
          description: 'Tuyệt đối không vẽ thêm bệnh',
        },
        {
          icon: 'speed',
          title: 'Bàn Giao Đúng Hẹn',
          description: 'Hỗ trợ giao nhận xe tận nhà',
        },
        {
          icon: 'contact_support',
          title: 'Hỗ Trợ 24/7',
          description: 'Tổng đài phản hồi sau 5 phút',
        },
      ],
    },
    about: {
      label: 'CHÚNG TÔI LÀ AI',
      title: 'Đơn Vị Chăm Sóc Ô Tô Đạt Chuẩn Tại Hà Nội',
      description1: 'Tại AutoGarage Hà Nội, chúng tôi hiểu rằng chiếc xe là người bạn đồng hành tin cậy và quý giá. Vì thế mỗi dịch vụ đều được đầu tư tỉ mỉ từng chi tiết nhỏ.',
      description2: 'Xưởng máy lạnh rộng lớn được trang bị đầy đủ dàn cầu nâng, máy test lỗi hiện đại nhất đảm bảo rút ngắn thời gian sửa chữa và đạt hiệu quả tối ưu.',
      points: [
        'Linh kiện có tem mác bảo hành rõ ràng',
        'Phòng chờ máy lạnh đầy đủ tiện ích miễn phí',
      ],
      image: {
        src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDzZ2uP51kKfBq1jGeYTYagpEyP7T4nw_ji7ezDHsQQyOgeH6RmjGi9M-44NW7NyybCXnYtCg7MYqnwGSvShnUNznA6PnoGiwwcqddQvQzSK4OYT6llmC-aKnUGDbAfYp9dA8ZN8CnIukzvsZ7JEjW8z3E498ZoY-hjYk8pWLWnASgeJ9ymJm4V9VmDeQwrvi3VLV-KcDMKm8IR3XKa-rI5tIZxLEatJAjRPBpesr6WGPyUc3HjrpV7jQ',
        alt: 'Automotive expert conducting full electronic scan of a premium car.',
      },
      badge: {
        label: 'TIỂU CHUẨN KỸ THUẬT',
        value: 'Quy Trình Sửa Chữa Khép Kín',
      },
    },
    services: [
      {
        id: 's1',
        title: 'Bảo dưỡng định kỳ',
        description: 'Thay nhớt cao cấp, vệ sinh lọc gió, tra mỡ bôi trơn hệ thống treo.',
        icon: 'calendar_today',
        href: '#contact',
      },
      {
        id: 's2',
        title: 'Sửa chữa động cơ',
        description: 'Chẩn đoán kêu gõ động cơ, căn chỉnh cam sên, vệ sinh buồng đốt.',
        icon: 'settings_suggest',
        href: '#contact',
      },
      {
        id: 's3',
        title: 'Hệ thống Điện & Lạnh',
        description: 'Bảo dưỡng lốc nén điều hòa, nạp gas R134a chính hãng, dò tìm rò rỉ điện.',
        icon: 'bolt',
        href: '#contact',
      },
    ],
    gallery: [
      {
        image: {
          src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCtAGU1u3YmklMgXLUu_CF-L6G6d0PyMCue402228I1p_0xHMLe_yFOK7k0cxxNCRjeNOsJWKuyFxwyvNkHoRAc6dqw40QdPPPq8SpjHW8EGt2__EFnxOhytqwng7PJPWilloD881aI8JoS2M_WTgxWpGvfC0-7gDk0cCgqTLIg7Ylp-xou0B-RSLAH2gmRPLFO4KkwB1GtHHf6FAJuTdn4MJlJBVdvAiFFvzmPIvfQfeAZyr5fqyUoBA',
          alt: 'Hanoi Auto Garage workshop row.',
        },
        caption: 'Hệ Thống Cầu Nâng Hiện Đại',
        size: 'large',
      },
      {
        image: {
          src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCQkxJskTYTMfSe4aVj8ucZc7ZdFE7DzMUwcd9TKh2kxv1nVkKCmI0Xico-0KwjRQLVn9SqmuoWXMnKqjdappM5Xk91UrUGE1HYpSHGLKNk4QqhQqQ2cxUlSgOqpOPzAYP8ukxmAS6WCByW_VmSHovATpmrCIgGG852rlTED4n61IXcHIENTlNUiSJqUgtzo5OyjkCSpnTQ8SROP3G1u3yf6jkOVEMbnoW806QGltJv-9F69yek0onuNQ',
          alt: 'Engineers working with state of the art tools.',
        },
        caption: 'Thiết Bị Căn Chỉnh Góc Đặt Bánh Xe',
        size: 'normal',
      },
    ],
    reviews: [
      {
        id: 'r1',
        author: 'Trần Minh',
        authorInitials: 'TM',
        vehicle: 'Chủ xe Hyundai SantaFe',
        text: 'Cực kỳ hài lòng về thái độ phục vụ tại đây. Sửa điện lạnh rất nhanh và không hề bị tái phát.',
        rating: 5,
      },
    ],
    contact: {
      title: 'Thông Tin Liên Hệ Hà Nội',
      address: '456 Phố Trần Thái Tông, Quận Cầu Giấy, Hà Nội',
      phone: '091 999 8888',
      hours: [
        'Thứ 2 - Thứ 7: 08:00 - 18:00',
        'Chủ Nhật: Nghỉ',
      ],
      mapImage: {
        src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBmkJtSoFaAncdruoam8y7ij0XELKFsAHWKAmCzeTRupHZh3OiTCoAsWfdPgjlZtaYKvl6O__3tSGBijLW4RMrohHbGM77LdESo_4hThC78_A4GsqCTJClGhgqOLt7bC7-R73Zo499DK7OFie5Xk5mBRsO-UAmFj5aWZ-lZzk-zrOKIMmA_pgwcvXNUXZk__3suEeRiTovKrYIDUK0pER0bgq8CcIvJ1d7B0kZiLTA9yZ8aGFHnV5mAbQ',
        alt: 'Map location placeholder for Hanoi Cầu Giấy region.',
      },
      location: 'Hanoi',
      primaryAction: {
        label: 'Xem đường đi',
        href: 'https://maps.google.com/?q=456+Tran+Thai+Tong,+Cau+Giay,+Ha+Noi',
      },
    },
    seo: {
      title: 'AutoGarage Hà Nội | Sửa Chữa Bảo Dưỡng Ô Tô Chuyên Nghiệp',
      description: 'Hệ thống xưởng sửa xe ô tô uy tín hàng đầu Cầu Giấy Hà Nội. Quy trình bài bản, phụ tùng chính hãng, có xe kéo cứu hộ 24/7.',
    },
  },
};

export const defaultPlaceId = 'garage-hcm';
