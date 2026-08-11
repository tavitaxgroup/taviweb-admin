import { DemoPageData } from '../../types/demo';

export const DEFAULT_IMAGES = {
  hero: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3I9P6PwBcqB4ly6rl_v80yTX5oKc_gi49I-ZOtw-cACY8CiAjkAY_kDdI-hMde_8uoZe1D3qdBLaSzNifGqwj9K_5WnWeSmYcDlHAqkmvjjvieqz7kSHwFuYc_LjaAZrhYl_rqtBHorULv3YaYnbQhRY2jBFcZT8yCPeFElLeC2Gu8pD8g1AA10h1Q5XQ4WCImtpZ6ywzJ4ZJqOREjVmoxGCNfUoN-tM10qWQq17UoFDwCq6h6XRq',
  about: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAPtl9sVvEgNwWGx18vLhhLBS4VNCnUU5CVDxLdH4-TNx5-s0M1fIYIWv4CECedLnrs05M5h2N2-oyaW1TRRSd8maXqJ-Y8xdruzdZQw_O6Doui60jYjTpwG8MqJO5xGGQ_jTU8N7Hwbwo-GxPCjbZ86BjO3aPTuyHVVnpzfysLXF_CaOxU6xUIb0SzSvECuRGLNg9DPA0ah-OHSBa0i7XmZPd2IFCXcK6qOYP9GqSTGFNkloVT1QRz',
  gallery1: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD48o3l3fU0ACK_Shl9NZnTsTMDVa-i_1cFClI7mvbALVzC9PJ7qM3U2P6czV8yUg79QeQmy6bVMLOFXBgeNzsvfkoDBFnx35fLSSZ_fYX9gVVg3Ro8hV6nPF3v8IcMkzQb8ukoaMfnIVDAFARy9bYQTLmS6AV5xBVVnBzZHiBvk1eHmWKjwHVCVBE_hk_jFucuOTtL9xjPYAizajtVhJzv5qhj-jPHBbxd060RJBQ3cOBmDQeOSgXL',
  gallery2: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAPtl9sVvEgNwWGx18vLhhLBS4VNCnUU5CVDxLdH4-TNx5-s0M1fIYIWv4CECedLnrs05M5h2N2-oyaW1TRRSd8maXqJ-Y8xdruzdZQw_O6Doui60jYjTpwG8MqJO5xGGQ_jTU8N7Hwbwo-GxPCjbZ86BjO3aPTuyHVVnpzfysLXF_CaOxU6xUIb0SzSvECuRGLNg9DPA0ah-OHSBa0i7XmZPd2IFCXcK6qOYP9GqSTGFNkloVT1QRz',
  gallery3: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDteKoEmsUZXtwbu5JEtYFwC-O8jy9orzc6Usxx56rlBrQSVPMUXCW9u-mJf1ZRnMCJvJTjuWK3mv3wfPtoBq_wAh_07-FUbJfu88RhYRnnPGchLta1ilS67NlSZRWOajWupgqAy4fWx62S8mvh6kIoIgC6aZ2FE_UXShmnxZEFf6CyuabwiNL7NtFLq6ZAxFX7ZoFfsjhN5KvmkSHmgAJlxoviLg3GL70cGqdbKMtm2YVV0mDpuFpd',
  gallery4: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCbf8G6mQFaqF301Q9ou7WtpuR0KkToD0r9L1uZuyxEqxz6m8K8-xyCRyXqYRgo1ojKm4khaWcKTnK_KtlbVi9b4zCUUW0L9P2NE6mxTN4RI-givKgG_GBY-EiR0mHAlZ0LYqOmxu01KMy0poxTQ6QDUqeOhrdpBM5Tjbg3Ry78y3egBjPnlXM3bpWqMp5IdzZzvJOmH6QLs5lqs7jC3lV7wAuRVw-jibUNxvzSuWsolIyscNAl3Ehw',
  avatar1: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBF2YqSxzyr3_dOdOvc2uaTDFeowfk9OIi7Q9swMkYOT1MvxyKrDo-SwJDwCerdRpmUQgUeq8tkB9sCo2R7iKPlzCFDFpbZdtnbUa4pC7WiCXGxV84RQ7qmTuTNomL7F1lNUeKZCLMQpqvmGxADEAnccRfjzF14SETtfdfaUA4mfGay520NGaHLmMz6q2-Si4Rk_DvcwSVKcQ0Iqhe6AKBGnlArNhBtV_jLjA28JasxUyDgf0wHQMov',
  avatar2: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBwbl5tG5UQuOw7ZZmVSHi5VzuWmvI3BJYUBWGDZySzSKE4bLWKRgl8h1E7uAzY_u2n4IrBqCct0ANTzvR4SLeWJgyJtV7U1d61mPDeeADBEBSUI-vUtJnPhfwGQVSeM4RY-PMTWaW_Du9TRN-0QdTIRlsHqmasKAxjqd5Wx0I4c87VuLQoOvkusIRVyCM8l3XDpPHX1d1jaqz_dhoTCUhWXRU2EEG6ltTa33IqB_OU2tk0_26Hwfiy',
  avatar3: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCfAlLnSw4F8LnROZMI5I66KinuU7zGTkZD1eNQa3HRUD_fbzb2rJHacjoP_Ka7TrccyLZMGugt3c8xoCJssJClnTY15neWAVlVBiZfYVy1HwXBpOGI4GYH8tGnUeiYRjwJ5QJ_mTMM0j79sdRXRLE8a8NphjdykZdT-_schziI6B4dXbHJ0-gDltBqnYoRfeVZ_jarNtG7WcATCgFWNr7VsCLDzala2rMGDqbRxv5D89OdCEgcNqpE',
  map: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAuvD21grnJO9dgyc5hOKUM3W6yHtOcIIaGi7CbaDPEhLePcigKKD-FLxNpgIwJbg1yTDjOauy45A4xDgStfwZjq_JJHoThzI1vTjBvdcPfYfsHzfk3lwzyVttK8Uwn_zoWb2KqGy7Fl2lRq1X185ylgAq2micClEEye0o8SKgbBpG9YbFRapkTOHoqXUqxdvcdHX3cASgFbR9EKjFbNkHsoJXTmkbls_GdC43vCBJ9h_GQJ5E3tmJT',
};

export const ENGLISH_CENTER_DEFAULTS: DemoPageData = {
  business: {
    id: 'default',
    name: 'English Center',
    logoUrl: undefined,
    phone: '1900 8888',
    email: 'info@englishcenter.edu.vn',
    address: 'Hanoi, Vietnam',
    MessageCircle: 'fb.com/englishcenter',
    rating: 4.9,
    followers: '50,000+',
    students: '10,000+',
  },
  template: {
    key: 'english-center',
    themeName: 'Academic Vitality',
  },
  hero: {
    title: 'Học Tiếng Anh Theo Lộ Trình - Bứt Phá Mục Tiêu Của Bạn',
    subtitle: 'Chương trình học cá nhân hóa, giáo viên tận tâm, cam kết sự tiến bộ rõ rệt qua từng khóa học chuẩn quốc tế.',
    image: {
      src: DEFAULT_IMAGES.hero,
      alt: 'Lớp học tiếng Anh hiện đại',
    },
    primaryAction: {
      label: 'Đăng ký tư vấn',
      href: '#dang-ky',
    },
    secondaryAction: {
      label: 'Kiểm tra trình độ',
      href: '#dang-ky',
    },
  },
  trust: {
    studentsCount: '10,000+',
    rating: 4.9,
    followersCount: '50,000+',
  },
  about: {
    title: 'Về English Center',
    description: 'Chúng tôi tin rằng mỗi học viên đều sở hữu tiềm năng vô hạn để vươn tầm quốc tế. Với triết lý giáo dục hiện đại, lộ trình được tối ưu hóa theo từng cá nhân, English Center là bệ phóng vững chắc nhất cho ước mơ của bạn.',
    image: {
      src: DEFAULT_IMAGES.about,
      alt: 'Lớp học tiếng Anh tương tác',
    },
    features: [
      {
        title: 'Lộ trình rõ ràng',
        description: 'Hệ thống bài giảng thiết kế khoa học, bám sát năng lực thực tế của từng học viên.',
        icon: 'Target',
      },
      {
        title: 'Giáo viên tận tâm',
        description: 'Đội ngũ giảng viên 8.0+ IELTS, giàu kinh nghiệm sư phạm và truyền cảm hứng.',
        icon: 'Heart',
      },
      {
        title: 'Cộng đồng năng động',
        description: 'Tham gia các câu lạc bộ tiếng Anh, workshop kỹ năng và ngoại khóa hấp dẫn.',
        icon: 'Sparkles',
      },
    ],
  },
  services: [
    {
      id: 'service-1',
      title: 'Tiếng Anh giao tiếp',
      description: 'Học ứng dụng thực tế trong môi trường đa văn hóa.',
      icon: 'MessageSquareText',
    },
    {
      id: 'service-2',
      title: 'Luyện thi IELTS/TOEIC',
      description: 'Lộ trình cá nhân hóa, cam kết đầu ra bằng văn bản.',
      icon: 'GraduationCap',
    },
    {
      id: 'service-3',
      title: 'Tiếng Anh trẻ em',
      description: 'Khơi gợi đam mê ngôn ngữ thông qua trò chơi và sáng tạo.',
      icon: 'Baby',
    },
    {
      id: 'service-4',
      title: 'Kiểm tra trình độ',
      description: 'Đánh giá 4 kỹ năng miễn phí & chính xác 100%.',
      icon: 'FileCheck2',
    },
    {
      id: 'service-5',
      title: 'Lớp nhóm nhỏ',
      description: 'Tương tác tối đa với giáo viên bản ngữ mỗi tiết học.',
      icon: 'Users',
    },
  ],
  gallery: [
    {
      id: 'gallery-1',
      src: DEFAULT_IMAGES.gallery1,
      alt: 'Học viên tích cực trong giờ học',
      caption: 'Giờ học tương tác sôi nổi',
    },
    {
      id: 'gallery-2',
      src: DEFAULT_IMAGES.gallery2,
      alt: 'Giáo viên hướng dẫn tận tình',
      caption: 'Sự kèm cặp tận tâm 1-1',
    },
    {
      id: 'gallery-3',
      src: DEFAULT_IMAGES.gallery3,
      alt: 'Học viên chúc mừng tiến bộ',
      caption: 'Lớp học vui vẻ, đầy năng lượng',
    },
    {
      id: 'gallery-4',
      src: DEFAULT_IMAGES.gallery4,
      alt: 'Khu vực tự học hiện đại',
      caption: 'Khu vực sảnh hiện đại',
    },
  ],
  reviews: [
    {
      id: 'review-1',
      name: 'Lê Minh Anh',
      role: 'Học viên lớp IELTS',
      rating: 5,
      content: 'Lộ trình học tại đây cực kỳ rõ ràng. Sau 3 tháng luyện IELTS, mình đã đạt được target 7.5 ngoài mong đợi. Giảng viên cực kỳ có tâm!',
      avatar: DEFAULT_IMAGES.avatar1,
    },
    {
      id: 'review-2',
      name: 'Nguyễn Văn Dũng',
      role: 'Học viên lớp Giao tiếp',
      rating: 5,
      content: 'Tôi là người đi làm rất bận rộn nhưng lớp nhóm nhỏ giúp tôi sắp xếp thời gian linh hoạt và giao tiếp tự tin hơn nhiều với đồng nghiệp nước ngoài.',
      avatar: DEFAULT_IMAGES.avatar2,
    },
    {
      id: 'review-3',
      name: 'Trần Thùy Trang',
      role: 'Phụ huynh học viên Kids',
      rating: 5,
      content: 'Bé nhà mình rất thích đi học ở đây. Các cô giáo luôn tạo ra không khí vui nhộn, giúp bé không còn sợ nói tiếng Anh nữa.',
      avatar: DEFAULT_IMAGES.avatar3,
    },
  ],
  contact: {
    title: 'Bắt Đầu Hành Trình Của Bạn Ngay Hôm Nay',
    description: 'Để lại thông tin để nhận tư vấn lộ trình cá nhân hóa miễn phí từ các chuyên gia giáo dục của chúng tôi.',
    phone: '1900 8888',
    facebookUrl: 'fb.com/englishcenter',
    mapImageUrl: DEFAULT_IMAGES.map,
    mapLocation: 'Hanoi, Vietnam',
    primaryAction: {
      label: 'Nhận tư vấn miễn phí',
      href: '#tu-van',
    },
  },
  seo: {
    title: 'English Center - Học Tiếng Anh Theo Lộ Trình',
    description: 'Landing page chuẩn quốc tế cho trung tâm tiếng Anh.',
  },
};
