import { DemoPageData } from '../../types/demo';

export const mockBusinesses: Record<string, DemoPageData> = {
  'atelier-ethos': {
    business: {
      name: 'Atelier Ethos',
      phone: '0901234567',
      email: 'contact@atelierethos.vn',
      address: 'The River Thủ Thiêm, Quận 2, TP. Hồ Chí Minh',
      facebookUrl: 'https://MessageCircle.com/atelierethos',
      mapsUrl: 'https://maps.google.com/?q=The+River+Thủ+Thiêm',
      logoText: 'STUDIO'
    },
    template: {
      key: 'interior-design',
      theme: 'minimalist'
    },
    hero: {
      title: 'Kiến Tạo Không Gian Sống Tinh Tế',
      subtitle: 'Giải pháp thiết kế nội thất toàn diện, nâng tầm giá trị ngôi nhà của bạn qua ngôn ngữ kiến trúc tối giản và vật liệu cao cấp.',
      image: {
        src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC8P19AHV6k1GIgKKz2nzHt1vy1GfJD_YctGVT6C4tgU8XxfUF1DrdiYxKa1R5Eu3NFI-TnHOZqtkeVVYnOeq4KyED2kuxTnm1gvl8waoGtpo1suM9Oq-tgXRx_oqp1vFXvE1rsj3PzMY8yzXiwu2gyA1gvtqmoF5vY1YY1lseA2uWCrXQI-TpgqW-t5WhXo5rgkYsipkhwJYtbV39uWoY7h2WfPlD2zTVAE2ckX7l9tde30PxYKJmk',
        alt: 'A grand, high-ceilinged modern living room with floor-to-ceiling windows'
      },
      primaryActionLabel: 'Nhận tư vấn thiết kế'
    },
    trust: {
      items: [
        {
          icon: 'PenTool',
          title: 'Concept Rõ Ràng',
          description: 'Tư duy thiết kế mạch lạc, tôn trọng bản sắc riêng của từng gia chủ.'
        },
        {
          icon: 'Grid',
          title: 'Tối Ưu Công Năng',
          description: 'Bố trí mặt bằng khoa học, khai thác triệt để diện tích sử dụng.'
        },
        {
          icon: 'Layers',
          title: 'Thiết Kế Đồng Bộ',
          description: 'Sự nhất quán từ ý tưởng sơ phác đến chi tiết hoàn thiện cuối cùng.'
        }
      ]
    },
    about: {
      badge: 'CHÚNG TÔI LÀ ATELIER ETHOS',
      title: 'Triết lý thiết kế dựa trên sự bền vững và thẩm mỹ vượt thời gian.',
      description: 'Tại Atelier Ethos, mỗi dự án là một cuộc đối thoại giữa kiến trúc và tâm hồn. Chúng tôi không chỉ sắp đặt nội thất, chúng tôi kiến tạo cảm xúc qua những khoảng lặng và điểm chạm tinh tế.',
      image: {
        src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBP6sfEwbGrzG08aaUgxgwPib8JQb-mzlwCokHV8QflnuLHjpAcxNsM2A8i7_-S23W2u0WsDQY94yNomCgZDZcpd_veDWt6Q4isaiVtCwCnGtc2ex_Yz5dhUSq7AE7LVGWMbszwwqsY41gXcLNmm2wJ5OarZO43SI5uHXNwhlkdHGJFQZ8Dk1_7AjWcshkE54XIdM0u0ZrX14ssW6Fc8qmn3VPC5qbZE-dr2N13TCKvEbyFpFilYrd8',
        alt: 'An artistic close-up of high-end architectural materials: concrete, oak, brass'
      },
      stats: [
        { value: '150+', label: 'DỰ ÁN HOÀN THÀNH' },
        { value: '12', label: 'GIẢI THƯỞNG KIẾN TRÚC' }
      ]
    },
    services: [
      {
        icon: 'Building2',
        title: 'Thiết kế căn hộ',
        description: 'Tối ưu công năng và thẩm mỹ cho không gian sống hiện đại.'
      },
      {
        icon: 'Home',
        title: 'Thiết kế nhà phố',
        description: 'Giải pháp kiến trúc đồng bộ, tối ưu hóa ánh sáng và gió trời.'
      },
      {
        icon: 'Briefcase',
        title: 'Thiết kế văn phòng',
        description: 'Tạo dựng môi trường làm việc sáng tạo và chuyên nghiệp.'
      },
      {
        icon: 'Wrench',
        title: 'Thi công nội thất',
        description: 'Hiện thực hóa bản vẽ với chất lượng hoàn thiện cao cấp nhất.'
      },
      {
        icon: 'Lightbulb',
        title: 'Tư vấn phong cách',
        description: 'Gợi ý những định hướng thẩm mỹ phù hợp với cá tính gia chủ.'
      }
    ],
    gallery: [
      {
        id: '1',
        category: 'PENTHOUSE',
        title: 'The Zen Sanctuary',
        image: {
          src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuANt2uXqwfBLib1DOXdyOpO2ggmfU9bGs78feGcQz-a66VnPMsdfr89tIF-A_jkgCBR-eN75Q50CzdUycO_0-JgVlaXxbahe_uE8_y7rhXi_8Ant4qpW8m-ap6lggsisXnEpWxBWtS9mp9HHjJF9IHO9RR9MOMN_ZDT7gOUk0GxDOxJEWsEXt3dNGr64mEK_-0kq82-te9hAA85tdViZfpDeeG06NGZxfTh72h2Ltynsrdz3Ag1EMDd',
          alt: 'Modern Japanese-inspired living room with shoji screens'
        }
      },
      {
        id: '2',
        category: 'KITCHEN',
        title: 'Marble Elegance',
        image: {
          src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAjCg9L3NPF13Xrfjk7F-uy7ubdKzdJaRAzLixsfY9CNne26taSZfPeLZKzSvt_JtCvLd2VmG3mv2QNNX7FK5022tYfZcdsCVKRMRgNdUUFR1F88N37wK-mRasb4de4mVLCwOFzUrbRZkf9bnXILIfKEKC_2y3kW2RLUo390-ZKw_BjVFERrBxn7qvGPlocPLsPRNysqfGV8NHn-ogFck614hWrkoBL0zjmcvd2E-f4R6BN8XZdkIo_',
          alt: 'Elegant minimalist kitchen design with marble countertops'
        }
      },
      {
        id: '3',
        category: 'BEDROOM',
        title: 'Quiet Luxury',
        image: {
          src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDWCvf6tjcStkSeIQBBCCEdG9kEW4EHW2mrZlNy4uG4C-7cFUsOTHCzw8wB2iWX5vsSMQD9cCh_RHA-qat-j57goCzXCmXygvsH2t9X3AmYyzKjINwBZzvAXNfXV7wQcNHXmZSI6RQOIN27iG7ONUjAx0--wueF7TaTmHcGvnx1BGMlEQ8fUrygsgkJpycNQofSlif6_6_15j7VanFeUUZGDFVBcHjmjqEkxVTyKCYdQiLs8s1j5Wyv',
          alt: 'Master bedroom with quiet luxury aesthetic'
        }
      },
      {
        id: '4',
        category: 'OFFICE',
        title: 'Sleek Workspace',
        image: {
          src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBfPdZsJ7dYSmsQH5OAWt__IAC2La-dSSPV-NMGsit0nF8MbhdGIK0sARlhPDblRUIKY3WtJZuFzkp5Wu6Zl3pcTdFKW5c-KmLcDFdap6zY7hI0eGXV46eV4lVYIHgayuoqb7KB-qZrraJqZKVIZ2Q_DlF-6JONdPKFGd1ngtNxgsicMwnXs9R5LqiZS1-aZWF1rBLXqcT12A1wNQheEY5I9tc9B78gtMZQ6GoVQnsnzym0xi_f6Ad-',
          alt: 'Sophisticated home office with custom wood bookshelf'
        }
      },
      {
        id: '5',
        category: 'BATHROOM',
        title: 'Minimal Spa',
        image: {
          src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAyuWY0gvhqYkGZ31eZJ3zWKFVvzJopLzh80YuIwD8sW2DLv0a-FdeA2-1IuIgHKA_DmyVnuI_PXjKb-z1ceDf7Y3Z5l2-gTj98kiDAcwp3dL1iX_o-8LT_n1rVsJnzZZBih99wafqPYU9RMmEDYGJgEajpFnUgS9gCj-j9x0hH2GOn-A19IiP7i0mF2v9299WTcPLjfIk0_QxU0oSftnv7Tpb5W32NL8PnZPTIh3hQPKStp-_h_Ni9',
          alt: 'Luxurious bathroom with freestanding soaking tub'
        }
      }
    ],
    reviews: [
      {
        quote: 'Atelier Ethos đã biến ngôi nhà của chúng tôi thành một tác phẩm nghệ thuật thực thụ. Không chỉ là đẹp, đó là sự tiện nghi và cảm giác bình yên mỗi khi trở về.',
        author: 'CHỊ LAN ANH',
        role: 'THE RIVER THỦ THIÊM'
      }
    ],
    contact: {
      title: 'Bắt đầu hành trình kiến tạo tổ ấm',
      primaryAction: {
        label: 'Nhận tư vấn ngay',
        href: '#contact'
      },
      secondaryAction: {
        label: 'Xem bản đồ',
        href: 'https://maps.google.com/?q=The+River+Thủ+Thiêm',
        icon: 'MapPin'
      }
    },
    seo: {
      title: 'Atelier Ethos - Kiến Tạo Không Gian Sống Tinh Tế',
      description: 'Dịch vụ thiết kế và thi công nội thất cao cấp. Mang lại không gian sống sang trọng, tối giản, và đầy cảm xúc.'
    }
  },
  'zenspace-interiors': {
    business: {
      name: 'ZenSpace Interiors',
      phone: '0987654321',
      email: 'hello@zenspace.vn',
      address: 'Vinhomes Central Park, Bình Thạnh, TP. Hồ Chí Minh',
      facebookUrl: 'https://MessageCircle.com/zenspace',
      mapsUrl: 'https://maps.google.com/?q=Vinhomes+Central+Park',
      logoText: 'ZENSPACE'
    },
    template: {
      key: 'interior-design',
      theme: 'japanese-minimalist'
    },
    hero: {
      title: 'Thiết Kế Đậm Chất Thiền Tịnh',
      subtitle: 'Tìm lại sự an yên trong tổ ấm với phong cách thiết kế Japandi tinh sảo, ưu tiên chất liệu thô mộc tự nhiên.',
      image: {
        src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuANt2uXqwfBLib1DOXdyOpO2ggmfU9bGs78feGcQz-a66VnPMsdfr89tIF-A_jkgCBR-eN75Q50CzdUycO_0-JgVlaXxbahe_uE8_y7rhXi_8Ant4qpW8m-ap6lggsisXnEpWxBWtS9mp9HHjJF9IHO9RR9MOMN_ZDT7gOUk0GxDOxJEWsEXt3dNGr64mEK_-0kq82-te9hAA85tdViZfpDeeG06NGZxfTh72h2Ltynsrdz3Ag1EMDd',
        alt: 'Zen style living space'
      },
      primaryActionLabel: 'Đăng Ký Khảo Sát'
    },
    trust: {
      items: [
        {
          icon: 'Heart',
          title: 'Sự Thấu Hiểu',
          description: 'Mỗi nét vẽ là kết quả của việc lắng nghe thói quen sinh hoạt và sở thích sâu xa nhất.'
        },
        {
          icon: 'Leaf',
          title: 'Chất Liệu Xanh',
          description: 'Sử dụng gỗ tự nhiên bền vững, sơn không độc hại và vật liệu thân thiện môi trường.'
        },
        {
          icon: 'Sparkles',
          title: 'Sự Tinh Tế',
          description: 'Tinh giản tối đa chi tiết thừa để làm nổi bật vẻ đẹp nguyên bản của không gian.'
        }
      ]
    },
    about: {
      badge: 'CHÚNG TÔI LÀ ZENSPACE',
      title: 'Nơi triết lý tối giản Wabi-Sabi hòa quyện cùng công năng sống hiện đại.',
      description: 'ZenSpace đồng hành cùng bạn tìm kiếm vẻ đẹp trong những điều không hoàn hảo. Không gian thiết kế của chúng tôi mang đậm hơi thở thiên nhiên, lấy ánh sáng tự nhiên làm chất xúc tác kết nối cảm xúc.',
      image: {
        src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBP6sfEwbGrzG08aaUgxgwPib8JQb-mzlwCokHV8QflnuLHjpAcxNsM2A8i7_-S23W2u0WsDQY94yNomCgZDZcpd_veDWt6Q4isaiVtCwCnGtc2ex_Yz5dhUSq7AE7LVGWMbszwwqsY41gXcLNmm2wJ5OarZO43SI5uHXNwhlkdHGJFQZ8Dk1_7AjWcshkE54XIdM0u0ZrX14ssW6Fc8qmn3VPC5qbZE-dr2N13TCKvEbyFpFilYrd8',
        alt: 'A detailed abstract texture'
      },
      stats: [
        { value: '95+', label: 'BIỆT THỰ & CĂN HỘ CAO CẤP' },
        { value: '100%', label: 'KHÁCH HÀNG HÀI LÒNG' }
      ]
    },
    services: [
      {
        icon: 'Compass',
        title: 'Quy hoạch mặt bằng',
        description: 'Tái cấu trúc không gian nhằm tối ưu hóa luồng di chuyển và lưu thông sinh khí.'
      },
      {
        icon: 'Palette',
        title: 'Phác thảo 3D',
        description: 'Mô phỏng chân thực phong cách, sự kết hợp màu sắc và vật liệu nội thất.'
      },
      {
        icon: 'Hammer',
        title: 'Sản xuất mộc thủ công',
        description: 'Xưởng sản xuất riêng giúp đảm bảo từng góc cạnh, khớp nối mộc đạt độ khít hoàn hảo.'
      },
      {
        icon: 'ShieldCheck',
        title: 'Giám sát tác giả',
        description: 'Đồng hành chặt chẽ cùng đội ngũ thi công để hiện thực hóa chính xác thiết kế.'
      },
      {
        icon: 'Home',
        title: 'Trang trí hoàn thiện',
        description: 'Cung cấp và sắp đặt rèm, tranh, thảm, cây xanh để tạo nên cái hồn cho ngôi nhà.'
      }
    ],
    gallery: [
      {
        id: '1',
        category: 'LIVING ROOM',
        title: 'Japandi Harmony',
        image: {
          src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC8P19AHV6k1GIgKKz2nzHt1vy1GfJD_YctGVT6C4tgU8XxfUF1DrdiYxKa1R5Eu3NFI-TnHOZqtkeVVYnOeq4KyED2kuxTnm1gvl8waoGtpo1suM9Oq-tgXRx_oqp1vFXvE1rsj3PzMY8yzXiwu2gyA1gvtqmoF5vY1YY1lseA2uWCrXQI-TpgqW-t5WhXo5rgkYsipkhwJYtbV39uWoY7h2WfPlD2zTVAE2ckX7l9tde30PxYKJmk',
          alt: 'Japandi living room with wooden furniture'
        }
      },
      {
        id: '2',
        category: 'DINING',
        title: 'The Organic Table',
        image: {
          src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAjCg9L3NPF13Xrfjk7F-uy7ubdKzdJaRAzLixsfY9CNne26taSZfPeLZKzSvt_JtCvLd2VmG3mv2QNNX7FK5022tYfZcdsCVKRMRgNdUUFR1F88N37wK-mRasb4de4mVLCwOFzUrbRZkf9bnXILIfKEKC_2y3kW2RLUo390-ZKw_BjVFERrBxn7qvGPlocPLsPRNysqfGV8NHn-ogFck614hWrkoBL0zjmcvd2E-f4R6BN8XZdkIo_',
          alt: 'Sleek dining area with wooden and brass touches'
        }
      }
    ],
    reviews: [
      {
        quote: 'Không gian sống của tôi như bừng sáng kể từ khi ZenSpace can thiệp. Thiết kế tối giản nhưng cực kì ấm cúng, đúng chất thiền tịnh tôi tìm kiếm.',
        author: 'ANH HOÀNG NAM',
        role: 'VILLA VINHOMES GREEN VILLAS'
      }
    ],
    contact: {
      title: 'Đánh thức vẻ đẹp nguyên bản của không gian',
      primaryAction: {
        label: 'Tư Vấn Thiết Kế Wabi-Sabi',
        href: '#contact'
      },
      secondaryAction: {
        label: 'Đường đi Vinhomes Central Park',
        href: 'https://maps.google.com/?q=Vinhomes+Central+Park',
        icon: 'MapPin'
      }
    },
    seo: {
      title: 'ZenSpace Interiors - Thiết Kế Japandi & Wabi-Sabi',
      description: 'Thiết kế nội thất mang phong cách thiền tịnh, Japandi và Wabi-Sabi sang trọng, gần gũi với thiên nhiên.'
    }
  }
};

export function getMockBusinessByPlaceId(placeId: string): DemoPageData {
  const normalized = placeId?.toLowerCase();
  // If exact match found, use it, otherwise fall back to first one ('atelier-ethos')
  return mockBusinesses[normalized] || mockBusinesses['atelier-ethos'];
}

export function getMockDemoData(placeId: string): DemoPageData {
  return getMockBusinessByPlaceId(placeId);
}
