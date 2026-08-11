import { DemoPageData } from '../../types/demo';

export const defaultAutoGarageData: DemoPageData = {
  business: {
    name: 'AutoGarage Việt Nam',
    phone: '1900 1234',
    email: 'info@autogarage-vietnam.vn',
    address: 'Địa chỉ đang được cập nhật',
  },
  template: {
    key: 'auto-garage',
    name: 'Industrial Integrity',
  },
  hero: {
    title: 'Dịch Vụ Sửa Chữa Ô Tô Đáng Tin Cậy',
    subtitle: 'Bảo dưỡng định kỳ, kiểm tra nhanh chóng, khắc phục triệt để mọi sự cố. Sự an tâm của quý khách trên mọi nẻo đường là trách nhiệm của chúng tôi.',
    image: {
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBcRVPB6YdpUMr6ElInFZZ8wxDW6LSSK1gmY-N6PJZ35OAwqAROBB-1xo9z5j1laMHYIEVOOGsjEQ3htG2p6iUci0MFwsVR71GFFIyPbSRzNGAjkRBXd91P2AmrNSTB8u4PbTmnM0oT08SDf9QTJgWSOrlepy7LIPovFytRtq9EbceZuBLQwHw5uj8rwyan8UPg1ANz74IzWKareBGS3gzRVP-cIKJUYWalXKGU6wwbFQbtET5LCPym1g',
      alt: 'Xưởng dịch vụ chăm sóc và sửa chữa ô tô chuyên nghiệp.',
    },
    primaryAction: {
      label: 'Gọi kiểm tra xe',
      href: 'tel:19001234',
    },
    stats: {
      badge: 'CHỨNG NHẬN',
      title: 'Chuyên Gia Kỹ Thuật',
      values: [
        { value: '2000+', label: 'Xe Đã Sửa' },
        { value: '5+', label: 'Năm Kinh Nghiệm' },
      ],
    },
  },
  trust: {
    badges: [
      {
        icon: 'report_problem',
        title: 'Bảo lỗi rõ ràng',
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
        description: 'Hỗ trợ nhanh chóng qua hotline',
      },
    ],
  },
  about: {
    label: 'GIỚI THIỆU CHÚNG TÔI',
    title: 'Giải Pháp Chăm Sóc Ô Tô Chuyên Nghiệp Hàng Đầu',
    description1: 'Chúng tôi tự hào là đơn vị sửa chữa ô tô uy tín, nhận được sự tin yêu của đông đảo chủ xe. Tại đây, chúng tôi đầu tư toàn diện từ trang thiết bị hiện đại đến đội ngũ thợ lành nghề.',
    description2: 'Với quy trình làm việc chuẩn hóa, chúng tôi cam kết bắt đúng bệnh, báo đúng giá và bàn giao xe đúng hẹn.',
    points: [
      'Kỹ thuật viên lành nghề nhiều năm kinh nghiệm',
      'Cam kết sử dụng linh kiện đạt chuẩn chất lượng',
    ],
    image: {
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDzZ2uP51kKfBq1jGeYTYagpEyP7T4nw_ji7ezDHsQQyOgeH6RmjGi9M-44NW7NyybCXnYtCg7MYqnwGSvShnUNznA6PnoGiwwcqddQvQzSK4OYT6llmC-aKnUGDbAfYp9dA8ZN8CnIukzvsZ7JEjW8z3E498ZoY-hjYk8pWLWnASgeJ9ymJm4V9VmDeQwrvi3VLV-KcDMKm8IR3XKa-rI5tIZxLEatJAjRPBpesr6WGPyUc3HjrpV7jQ',
      alt: 'Thao tác chẩn đoán sửa chữa động cơ chuyên nghiệp.',
    },
    badge: {
      label: 'CHẤT LƯỢNG HÀNG ĐẦU',
      value: 'Linh Kiện Chính Hãng & Đạt Chuẩn',
    },
  },
  services: [
    {
      id: 'default-s1',
      title: 'Bảo dưỡng định kỳ',
      description: 'Thay dầu động cơ, thay cốc lọc gió, kiểm tra toàn bộ hệ thống phanh lái gầm.',
      icon: 'calendar_today',
      href: '#contact',
    },
    {
      id: 'default-s2',
      title: 'Sửa chữa động cơ',
      description: 'Khắc phục các tiếng kêu lạ, rò rỉ nước làm mát, sửa chữa đại tu máy.',
      icon: 'settings_suggest',
      href: '#contact',
    },
    {
      id: 'default-s3',
      title: 'Điện & Điều hòa không khí',
      description: 'Khắc phục lỗi điều hòa yếu, chập điện cầu chì, máy quét lỗi báo đèn check engine.',
      icon: 'bolt',
      href: '#contact',
    },
  ],
  gallery: [
    {
      image: {
        src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCtAGU1u3YmklMgXLUu_CF-L6G6d0PyMCue402228I1p_0xHMLe_yFOK7k0cxxNCRjeNOsJWKuyFxwyvNkHoRAc6dqw40QdPPPq8SpjHW8EGt2__EFnxOhytqwng7PJPWilloD881aI8JoS2M_WTgxWpGvfC0-7gDk0cCgqTLIg7Ylp-xou0B-RSLAH2gmRPLFO4KkwB1GtHHf6FAJuTdn4MJlJBVdvAiFFvzmPIvfQfeAZyr5fqyUoBA',
        alt: 'Xưởng dịch vụ lớn.',
      },
      caption: 'Khu Vực Sửa Chữa Động Cơ',
      size: 'large',
    },
    {
      image: {
        src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCQkxJskTYTMfSe4aVj8ucZc7ZdFE7DzMUwcd9TKh2kxv1nVkKCmI0Xico-0KwjRQLVn9SqmuoWXMnKqjdappM5Xk91UrUGE1HYpSHGLKNk4QqhQqQ2cxUlSgOqpOPzAYP8ukxmAS6WCByW_VmSHovATpmrCIgGG852rlTED4n61IXcHIENTlNUiSJqUgtzo5OyjkCSpnTQ8SROP3G1u3yf6jkOVEMbnoW806QGltJv-9F69yek0onuNQ',
        alt: 'Bảng dụng cụ chuyên dùng.',
      },
      caption: 'Thiết Bị Đo Đạc Đo Lỗi Chuyên Dụng',
      size: 'normal',
    },
  ],
  reviews: [
    {
      id: 'default-r1',
      author: 'Anh Tuấn',
      authorInitials: 'AT',
      vehicle: 'Chủ xe Honda Civic',
      text: 'Sửa chữa chu đáo, đúng tiến độ. Gặp đúng thợ giỏi nhiệt tình.',
      rating: 5,
    },
  ],
  contact: {
    title: 'Liên Hệ Với Chúng Tôi',
    address: 'Vui lòng liên hệ hotline để nhận hướng dẫn đường đi chi tiết',
    phone: '1900 1234',
    hours: [
      'Thứ 2 - Thứ 7: 08:00 - 18:00',
    ],
    mapImage: {
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBmkJtSoFaAncdruoam8y7ij0XELKFsAHWKAmCzeTRupHZh3OiTCoAsWfdPgjlZtaYKvl6O__3tSGBijLW4RMrohHbGM77LdESo_4hThC78_A4GsqCTJClGhgqOLt7bC7-R73Zo499DK7OFie5Xk5mBRsO-UAmFj5aWZ-lZzk-zrOKIMmA_pgwcvXNUXZk__3suEeRiTovKrYIDUK0pER0bgq8CcIvJ1d7B0kZiLTA9yZ8aGFHnV5mAbQ',
      alt: 'Bản đồ vị trí garage.',
    },
    location: 'Việt Nam',
    primaryAction: {
      label: 'Xem bản đồ',
      href: 'https://maps.google.com',
    },
  },
  seo: {
    title: 'AutoGarage Việt Nam | Dịch Vụ Sửa Chữa Ô Tô Đáng Tin Cậy',
    description: 'Hệ thống xưởng dịch vụ bảo dưỡng, đại tu và khắc phục sự cố điện ô tô chuyên nghiệp, an tâm tuyệt đối.',
  },
};
