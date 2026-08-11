export interface RawBusinessData {
  placeId: string;
  name: string;
  phone?: string;
  email?: string;
  address?: string;
  rating?: number;
  reviewCount?: number;
  templateKey: string;
  customHeroTitle?: string;
  customHeroSubtitle?: string;
  customHeroImage?: string;
  customAboutTitle?: string;
  customAboutText1?: string;
  customAboutText2?: string;
  customAboutImage?: string;
  customServices?: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  customGallery?: string[];
  customReviews?: Array<{
    author: string;
    rating: number;
    content: string;
    role?: string;
    date?: string;
  }>;
}

export const mockBusinesses: Record<string, RawBusinessData> = {
  "juris-integrity": {
    placeId: "juris-integrity",
    name: "Văn Phòng Luật Sư Juris & Integrity",
    phone: "+84 (0) 123 456 789",
    email: "contact@jurisintegrity.vn",
    address: "Tòa nhà Landmark 81, Quận Bình Thạnh, TP. Hồ Chí Minh",
    rating: 4.9,
    reviewCount: 124,
    templateKey: "law-firm",
    customHeroTitle: "Tư vấn pháp lý chuyên nghiệp và tận tâm",
    customHeroSubtitle: "Chúng tôi bảo vệ quyền lợi hợp pháp của bạn với sự minh bạch và uy tín tuyệt đối. Đồng hành cùng khách hàng trong mọi bước đi của công lý.",
    customHeroImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuCLudAGAMKW0xwjfCTg9UinDgiwxlVqwikGYNZ7zdEgm5gD4upmbg-_1ARzcoxFJmMUILAfj6f3hIPldSTteHyjz4ibe7SWd_fdy4XIggdX71bbAfkgETDaTCe4S4nKtQh7lFQv95YEwUv-2s--wPcbQ2L5z7s6dlaqghgx2J5h9hpnJthZgS6hJcllONx6UmhrsfGio99athGE0JC4kTwBwkSXeKsdA0-POJWdOfKoek4V5UHxyv0e",
    customAboutTitle: "Về Văn Phòng Luật Sư Juris & Integrity",
    customAboutText1: "Với hơn 15 năm kinh nghiệm thực chiến trong nhiều lĩnh vực pháp lý khác nhau, Juris & Integrity được thành lập với tôn chỉ đặt \"Chính trực\" làm nền tảng cốt lõi. Chúng tôi không chỉ là những chuyên gia pháp luật, mà là những người đồng hành đáng tin cậy.",
    customAboutText2: "Chúng tôi tin rằng sự chuyên nghiệp đến từ sự thấu hiểu sâu sắc nhu cầu của khách hàng và khả năng đưa ra những giải pháp pháp lý an toàn, tối ưu nhất.",
    customAboutImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuA-4MIXOBlUgt01rPAD9ZoCj09pbhroQ4NQuQWFxz7L_YXBI6fIefoNowki3JhXd_M7qOSw8TDPO0HM7EN88_HKOtCGkh7DletBp4Hu4Td0V_BXzqqsC9yEpW1VpX767ceMv-f6c6dLCDHDARIJVOVIqw6dxrWhnkbR1JwAaFj89L6bfoxKWvWe-Le-67SuC2ti4V-36E7XIMbordrNMl3V1S5tBWxfnRAzc6MMHrgzsP2q6awsjr4M",
    customServices: [
      {
        icon: "business",
        title: "Tư vấn doanh nghiệp",
        description: "Hỗ trợ pháp lý vận hành công ty, quản trị rủi ro và tuân thủ các quy định hiện hành của pháp luật kinh doanh."
      },
      {
        icon: "description",
        title: "Soạn thảo & Rà soát Hợp đồng",
        description: "Đảm bảo tính pháp lý chặt chẽ và giảm thiểu tối đa các rủi ro phát sinh trong quá trình thực hiện giao kết dân sự."
      },
      {
        icon: "gavel",
        title: "Tranh chấp dân sự",
        description: "Tư vấn hướng xử lý tranh chấp hiệu quả, bảo vệ tối ưu quyền và lợi ích hợp pháp của đương sự tại tòa án."
      },
      {
        icon: "groups",
        title: "Luật Lao động",
        description: "Hỗ trợ các vấn đề về hợp đồng lao động, nội quy công ty, kỷ luật lao động và các tranh chấp liên quan."
      },
      {
        icon: "person",
        title: "Pháp lý cá nhân",
        description: "Tư vấn theo nhu cầu riêng biệt của cá nhân về hôn nhân gia đình, thừa kế, quyền sở hữu tài sản và các thủ tục hành chính khác."
      }
    ],
    customGallery: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDsN_EpTc7mb5-TpGi8PMPDTVuECwk8I-bokuM3bIowR-MIhUqCLBjTNWgpTY0JUKbLTXPQjSRK7phJ6eWQAGSpXwIz62iJMLqZ6GFqE37LPSYIm5x-EkiovGLi9-gzHnJi5youxD5PV6nSyYDtSf8yVKSW183Ry_IZqkZh8ZN69mcT7EpFJf3D9P7-LWDPQb5hdew3qv4YoVv0ynsybOIT9wX1GTKmZdvr5g2scZVxODuYVl9g2qf8",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAYkFxE_uVfVcgowyZPveNF8vnGtWJeRLHjedZzMdP75bUaxFX94h5oKvupoZPTJdUH94t97MB6yy4fHqt_bLlTWfFFw04b_x9HU_MdKC3Sj0r6qu7uRTUex-UQTDyzjLyFjFFpKnaSGs9XlW7bZAd3ina-Zw47w64MANNfWHGrgC1B-612UaofQlRzmt_8CEBxNFH64HUd7evSV4WLSq9A9lF7EoBlXVkmsJ72qklA2pN06Phz9Y6A",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCC6h0UBRMQ5wqeGgZAbBIgo7Q71TshvsNlhXGtuo_-V7o3bLUluKl7bS6g6OyqLGChxhIXwnI-eCMK6bxkHILoVYxQOxs5uJSQI33eFmZpt77noTiHYHMUn-IhM1_i_B43hbQX03EFjqMnDIHGhvWUSOYT0IDiYVbsOv0SsWZG6-wiYukMKkNEEUkP-uXXL5CESOLoxY6Fb2uTit1tRuAlTnk8x9vT6_7mnyV0HxycfETjKfyuLtjK",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBnibOHzGz-8UGVhQCDp0TF7F7xzUlcOMvJ6AEuzR3idy0cnSCBN_27i22XdjY4ODt4Nv0XSwYIGgP58m8GVeawVmL-HYunoNiY-oEIcKNfpY3W14Qg_L7L1JQ1pQw3UIf_YXvK8Kx05xJOgqTF7opsqcyPtcUam2V9xhoT3iwllA2bIg6afxNgV8G0GVQAYCUu40UIwXlkf-mkGdG6SnpgagPRD7bBqWFNyhfr8-NGUXbcRIWNeY1W",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAiTvAVSp6u8Ye-WLsk2m0QTsko6Yf2t20qIU02MqXulonA8VFKi19Wm3IMFhUwkag-fNa7gy467-O8v5HoFsGdF7LpLHuKPSHikuwg0Y0SOcXnL1UywTJ2BnftVTbQW7wdWU5lLboMjHFNw7oUyFRheP-p_7n2fvWigGfMzfJaGOKzLnPCfvemr-PQ6WAMPBOGKP74cs9w4uPuKgGIRlYp9lG7-nmaIHz_qbOp9Ri3Bbbt26NbnOdc"
    ],
    customReviews: [
      {
        author: "Nguyễn Văn Hùng",
        rating: 5,
        content: "Văn phòng làm việc cực kỳ chuyên nghiệp và uy tín. Tôi đã nhận được sự tư vấn pháp lý rất chu đáo cho doanh nghiệp của mình. Rất hài lòng với giải pháp hợp đồng mà các luật sư cung cấp.",
        role: "Giám đốc điều hành TechVina",
        date: "01/06/2026"
      },
      {
        author: "Trần Thị Mai",
        rating: 5,
        content: "Luật sư tư vấn rất có tâm, rõ ràng và thấu hiểu. Quy trình giải quyết tranh chấp dân sự diễn ra minh bạch, an toàn. Cảm ơn Juris & Integrity rất nhiều!",
        role: "Khách hàng cá nhân",
        date: "15/05/2026"
      },
      {
        author: "Phạm Minh Tuấn",
        rating: 4.8,
        content: "Tôi rất ấn tượng với thái độ phục vụ và kiến thức chuyên môn của đội ngũ ở đây. Họ giải thích cặn kẽ các điều khoản phức tạp bằng ngôn ngữ rất dễ hiểu.",
        role: "Đại diện pháp lý tập đoàn",
        date: "20/04/2026"
      }
    ]
  },
  "minh-tam-law": {
    placeId: "minh-tam-law",
    name: "Văn Phòng Luật Sư Minh Tâm",
    // Missing phone to test fallback
    email: "lienhe@luatminhtam.vn",
    address: "Phố Bà Triệu, Quận Hoàn Kiếm, Hà Nội",
    // Missing rating to test fallback
    templateKey: "law-firm",
    customHeroTitle: "Bảo vệ công lý và quyền lợi hợp pháp",
    customHeroSubtitle: "Đội ngũ luật sư giàu kinh nghiệm thực tiễn tại Hà Nội chuyên tư vấn đất đai, dân sự, hôn nhân gia đình và sở hữu trí tuệ.",
    customHeroImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuCLudAGAMKW0xwjfCTg9UinDgiwxlVqwikGYNZ7zdEgm5gD4upmbg-_1ARzcoxFJmMUILAfj6f3hIPldSTteHyjz4ibe7SWd_fdy4XIggdX71bbAfkgETDaTCe4S4nKtQh7lFQv95YEwUv-2s--wPcbQ2L5z7s6dlaqghgx2J5h9hpnJthZgS6hJcllONx6UmhrsfGio99athGE0JC4kTwBwkSXeKsdA0-POJWdOfKoek4V5UHxyv0e",
    customAboutTitle: "Về Luật Sư Minh Tâm",
    customAboutText1: "Được sáng lập với tinh thần thượng tôn pháp luật và tận hiến vì quyền lợi hợp pháp của người dân, Văn Phòng Luật Sư Minh Tâm không ngừng nỗ lực trở thành chỗ dựa pháp lý vững chắc.",
    customAboutImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuA-4MIXOBlUgt01rPAD9ZoCj09pbhroQ4NQuQWFxz7L_YXBI6fIefoNowki3JhXd_M7qOSw8TDPO0HM7EN88_HKOtCGkh7DletBp4Hu4Td0V_BXzqqsC9yEpW1VpX767ceMv-f6c6dLCDHDARIJVOVIqw6dxrWhnkbR1JwAaFj89L6bfoxKWvWe-Le-67SuC2ti4V-36E7XIMbordrNMl3V1S5tBWxfnRAzc6MMHrgzsP2q6awsjr4M",
    customServices: [
      {
        icon: "gavel",
        title: "Tư vấn Tranh chấp Đất đai",
        description: "Giải quyết các tranh chấp quyền sử dụng đất, thừa kế nhà đất và thủ tục cấp sổ đỏ an toàn."
      },
      {
        icon: "person",
        title: "Hôn nhân & Gia đình",
        description: "Tư vấn ly hôn, phân chia tài sản chung, quyền nuôi con và nghĩa vụ cấp dưỡng chuyên nghiệp."
      },
      {
        icon: "business",
        title: "Sở hữu trí tuệ",
        description: "Đăng ký nhãn hiệu, bản quyền tác giả và bảo vệ thương hiệu doanh nghiệp trước các hành vi xâm phạm."
      }
    ],
    customGallery: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDsN_EpTc7mb5-TpGi8PMPDTVuECwk8I-bokuM3bIowR-MIhUqCLBjTNWgpTY0JUKbLTXPQjSRK7phJ6eWQAGSpXwIz62iJMLqZ6GFqE37LPSYIm5x-EkiovGLi9-gzHnJi5youxD5PV6nSyYDtSf8yVKSW183Ry_IZqkZh8ZN69mcT7EpFJf3D9P7-LWDPQb5hdew3qv4YoVv0ynsybOIT9wX1GTKmZdvr5g2scZVxODuYVl9g2qf8",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAYkFxE_uVfVcgowyZPveNF8vnGtWJeRLHjedZzMdP75bUaxFX94h5oKvupoZPTJdUH94t97MB6yy4fHqt_bLlTWfFFw04b_x9HU_MdKC3Sj0r6qu7uRTUex-UQTDyzjLyFjFFpKnaSGs9XlW7bZAd3ina-Zw47w64MANNfWHGrgC1B-612UaofQlRzmt_8CEBxNFH64HUd7evSV4WLSq9A9lF7EoBlXVkmsJ72qklA2pN06Phz9Y6A"
    ]
  }
};

export function getMockBusinessByPlaceId(placeId: string): RawBusinessData | undefined {
  return mockBusinesses[placeId];
}
