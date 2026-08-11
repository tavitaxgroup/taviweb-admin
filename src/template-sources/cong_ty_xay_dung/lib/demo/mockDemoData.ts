export interface RawBusiness {
  placeId: string;
  name: string;
  phone?: string;
  email?: string;
  address?: string;
  rating?: number;
  ratingCount?: number;
  templateKey: string;
  heroTitle?: string;
  heroDescription?: string;
  aboutTagline?: string;
  aboutTitle?: string;
  aboutDescription1?: string;
  aboutDescription2?: string;
  yearsOfExperience?: string;
  services?: Array<{
    title: string;
    description: string;
    isPopular?: boolean;
    imageSrc?: string;
    highlights?: string[];
  }>;
  gallery?: Array<{
    title: string;
    location: string;
    category: string;
    imageSrc: string;
  }>;
  reviews?: Array<{
    rating: number;
    text: string;
    authorName: string;
    authorRole: string;
  }>;
}

export const mockBusinesses: Record<string, RawBusiness> = {
  "constructum": {
    placeId: "constructum",
    name: "CONSTRUCTUM Engineering",
    phone: "028 3456 7890",
    email: "contact@constructum.vn",
    address: "123 Đường Công Trình, Quận 1, TP. Hồ Chí Minh",
    rating: 4.9,
    ratingCount: 142,
    templateKey: "construction-company",
    heroTitle: "Xây dựng niềm tin từ những công trình vững chãi",
    heroDescription: "Tư vấn minh bạch, thi công chuyên nghiệp và cam kết chất lượng trên từng mét vuông. Chúng tôi không chỉ xây nhà, chúng tôi kiến tạo không gian sống bền vững.",
    aboutTagline: "Câu chuyện thương hiệu",
    aboutTitle: "Về chúng tôi",
    aboutDescription1: "Tại CONSTRUCTUM Engineering, chúng tôi tin rằng mỗi viên gạch được đặt xuống không chỉ để tạo nên một bức tường, mà là để xây dựng nền móng cho những ước mơ và sự thịnh vượng của gia chủ.",
    aboutDescription2: "Được thành lập bởi đội ngũ kỹ sư tâm huyết, chúng tôi đã trải qua hơn một thập kỷ thực hiện hàng trăm công trình lớn nhỏ từ nhà phố hiện đại đến biệt thự sang trọng và các tòa nhà văn phòng.",
    yearsOfExperience: "15+",
    services: [
      {
        title: "Xây nhà trọn gói",
        description: "Giải pháp chìa khóa trao tay, chúng tôi lo mọi khâu từ xin phép xây dựng, thiết kế đến hoàn thiện nội thất.",
        isPopular: true,
        imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuCzzXWoAp5LZN4sugqCdHWncVfNDyr4Vil76z-Q1RKTGk-lt0GoKzbeSjMzHicQb_sApwnuAwSuVwEM92Q2A87BIZEintBCBE1YiWQi2_p7MRPVzU95hzof9oyDwGec22MAnOWGNo-wdBuZ8hzGsXdCiS6bc2zdjPMcfdoF7UsMyXdpFr0xktNJgEQ3uUCf7Hooi_z01xKbQ400gBUMChBPb1ipEw0-3QuSdh8ryVX6nchvmT6l53DdFg",
        highlights: ["Miễn phí hồ sơ thiết kế", "Bảo hành kết cấu 10 năm"]
      },
      {
        title: "Sửa chữa cải tạo",
        description: "Làm mới không gian sống cũ với kỹ thuật gia cố hiện đại và tối ưu hóa công năng sử dụng.",
        imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuAeNwACDuEwK2rB4tR60Zj2YClWhlOBCFHbJAVQc2y8uRZDnutCT4ilfLuEE1hzXUlRTrbQkoUUDkjTlvRsOL5W-ISu6ZgFB9C37umbz7fH6072iS6vW9ghek5MdwxYvt9V2ddQDyvDsYeTKmcKqUt3L5mzegSUk3rnvs0BQmWGt6X5G_-0xYL0Zl2ZBS5WZziqSlfm0ThWKWa7n_x0LplA-70dDh5PIM09iKxX3pYcm4G1-6Kbj9hPEQ"
      },
      {
        title: "Thi công phần thô",
        description: "Đảm bảo xương sống của công trình bền bỉ với thời gian thông qua tiêu chuẩn kỹ thuật khắt khe.",
        imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuDHyVbE2QgwSXrwUud6SRqy3PiTUSjCVxRP8uztI44fNyT1KhKguXd2OBhrp6GNCjGqAEQgOpTCiUCPyOjR2pQUBnNNSpgH_qUlpdfBwximRPbVRfhsgacMjN9GsF6Y3DNOwZSVqyf2N00bOcLrv1MQwVNZcM5AHRI7zmc3GXor-C1z6P5uiWloYm89oX0SqQgN6nSK3zKE3-7mTRMKIv1GyKBmZIX-uC1HAMifzO48pjBlx_GJEeL2_A"
      },
      {
        title: "Hoàn thiện nội thất",
        description: "Mang cái tôi vào không gian sống bằng những vật liệu tinh tế và tay nghề mộc điêu luyện.",
        imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuA27Yt1VyEkbBT2uX29fkwN0RgBsmtxWjT-ffXl0kN-tocQY7cyTQJH5ZxSF6vM2pUiAfdoDSZSc2-K1P8be1mx1fiz2WIRDWtQjhx3KIrcB1XVPBhBwjtDA8m_DKSoFk3f8bM7Hv79ZW86WM749XXq2KixABh7kqvUDqjMIYSi7-1AJXgFZaZJsQ8xbQFiVeLJknSP1Gn9CvqM7am-OTASktR40AvseEMWRpD0MNkfQSA4uxT4TnKNBg"
      }
    ],
    gallery: [
      {
        title: "Biệt thự Thảo Điền Garden",
        location: "Thành phố Hồ Chí Minh",
        category: "Biệt thự",
        imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuBUPmN3LZRTp9yf0ym6G7Gvs0G_mRVid2M5r8RtuKmrZOOSdre0y1keYjEA20jUXYB188LYQ6sYC8ykhbzdnPVEz-EtuiyINWNlM90mOJrEfqbnskZq58HMo-T6kw2XIhgynI4YV2sQDxBCTiaqLkMZiLDOVvRFvi8p8DuTwnVh2nQiJNbFV4s_eeabSbAjXASmm9BRzZ1Krj0yBA1OoAHnnPtUQNuE9WYxLjJanuhU_zqgrNGOL3Rayg"
      },
      {
        title: "Penthouse Sky Villa",
        location: "Hà Nội",
        category: "Biệt thự",
        imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuBEUCMKbnZeoWHR-GqmW5XJ6z30AUt-g9cyd1dMmv-eWMttj32ZoSu90OV4pNMk_9GPCWivS5amczCsm-fb1ZgQkdL10kTE9rnItaG6d6HM1E90_8OxWKUiYFq6lP0xxx3s0_jxoPubCoIb2BEdOfeBYL_vhqXlXi4AGa06482N_5GFOzTLxJOaS5rStRVoL9WNNo8bYhzp8pLgSQ6Iv-c0xHdrbSF8e26wnyFM8-whw3mI4cbGoYNtdA"
      },
      {
        title: "Văn phòng TechHub Center",
        location: "Đà Nẵng",
        category: "Khác",
        imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuB_oDMd3hmYS40d0Usg4nxVLFA3TH9RHEEksm-3iunFr-I88y7jedFhHjoc4IEARlzG8q2lmnT4Akm0-LqD0AcYpIVgXJJLtmsruXZFX0jgRdV3MoSiZfOgNPJYqw03VwR6uB25QGTZnKIZ6Bksmiif4FxQ2-Rp_9WyVgri9iFM4Vg7sUAZk9DVxNMgxutrDXSiXqvDRxhznqRm-LAYNriGoHuW6ctLiA8QZ_a9rS9EvDFJtWel2hmiAg"
      },
      {
        title: "Townhouse Park View",
        location: "Bình Dương",
        category: "Nhà phố",
        imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuANejKuLJEcf__QRs-v93lOp6XkPwb2Wp2YyIMsoFnq0Cd65IWpjbHZu1Yytsu3ieLdg2TOn8M2xGx8k-bgK_nfemPuLAxtIyWPBEH9pc_H-KHtQI6_2Nw3_RA549OCjNALz42WBwPya5PopYknpg_onEtvy5R6ZvYaQSf5HOkJOyc6MEcENbMn8W_xSBj9ujL1MFsCno8d-KrH9gouBT9E6ZpRTivdt_ARqihPuovHVSDyVkLuBzAmdA"
      },
      {
        title: "Nhà Cổ Cải Tạo Zen House",
        location: "Huế",
        category: "Nhà phố",
        imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuC43H1DslDCNbsvX4kgZMxg3dP5FDLnusTNKe7XzPPSuTkXj3m6lkeFNJDjFZ9dGudU1cunAFR8WHyGHa3HBB6j6gqgVmrFM0V-RMp_Sv8ucUoPpO__z05GmxBLcjTxG2xXbeh1yL4sdlnr2dfG83zRerpQHkpuj7yjkl0WtTuboI-DQ1JjIYUDvgWOxPtksCn8EQcYoPAFTXn92CF71wbnKU5plL6orQnasYiQddRH7m7fSYUmIDRigw"
      },
      {
        title: "Tổ hợp Thương mại Riverside",
        location: "Cần Thơ",
        category: "Khác",
        imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuDBQsZmOcinvGXMBl5ErNAz9qhzVj3NDFqXcIT2wNh42RpRbkMkLrtekDM0FtuSq7efuoMKT0lM2xa9qd3QGmebHnreynAiLZ9Kzt916zOJDFl4MJq7OE_7FS2h-Tzi0y6bE6nZajqIKKYaCK7VK0GE4ErozKsmLqJw-XuFOhLoCAnDaxcmZ5-giJdtWAw7RNUSp-bqukF8Jhy54pYEzjrly-F6lmIVtWCbKY8UoWhv26HeVTQdXow7UA"
      }
    ],
    reviews: [
      {
        rating: 5,
        text: "Tôi hoàn toàn yên tâm khi giao căn nhà của mình cho Constructum. Họ làm việc rất chuyên nghiệp, báo cáo tiến độ hàng ngày giúp tôi dù bận rộn vẫn kiểm soát được chất lượng.",
        authorName: "Anh Hoàng Nam",
        authorRole: "Chủ đầu tư biệt thự Thảo Điền"
      },
      {
        rating: 5,
        text: "Báo giá rất minh bạch, không hề có chi phí phát sinh vô lý. Đội ngũ thi công tay nghề cao, đặc biệt là phần nội thất gỗ rất tinh xảo và sắc nét.",
        authorName: "Chị Minh Lan",
        authorRole: "Chủ sở hữu Sky Villa"
      },
      {
        rating: 5,
        text: "Quy trình làm việc rõ ràng giúp tôi tiết kiệm được rất nhiều thời gian. Kỹ sư tư vấn rất có tâm, đưa ra nhiều giải pháp tối ưu hóa không gian cho ngôi nhà nhỏ của tôi.",
        authorName: "Anh Quốc Tuấn",
        authorRole: "Cải tạo nhà phố Q.3"
      }
    ]
  },
  "minh-long": {
    placeId: "minh-long",
    name: "Công Ty Xây Dựng Minh Long",
    phone: "090 123 4567",
    email: "lienhe@xaydungminhlong.vn",
    address: "456 Đường Lê Lợi, Quận Hải Châu, Đà Nẵng",
    rating: 4.8,
    ratingCount: 89,
    templateKey: "construction-company",
    heroTitle: "Kiến tạo không gian, dựng vững tương lai",
    heroDescription: "Với đội ngũ kỹ sư chuyên môn cao và quy trình làm việc chuẩn mực, Minh Long mang đến những công trình chất lượng vượt trội, tối ưu chi phí và bàn giao đúng hẹn.",
    aboutTagline: "Về thương hiệu chúng tôi",
    aboutTitle: "Xây Dựng Minh Long",
    aboutDescription1: "Xây Dựng Minh Long tự hào là một trong những đơn vị thiết kế và thi công xây dựng uy tín hàng đầu miền Trung, luôn mang chữ Tâm và chữ Tín đặt lên trên hết.",
    aboutDescription2: "Chúng tôi luôn áp dụng các kỹ thuật thi công tiên tiến, quản lý nghiêm ngặt chất lượng vật tư đầu vào để đem lại cho khách hàng những ngôi nhà bền vững nhất.",
    yearsOfExperience: "12+",
    services: [
      {
        title: "Xây nhà trọn gói",
        description: "Cung cấp giải pháp toàn diện từ thiết kế bản vẽ đến thi công phần thô, lắp đặt nội thất và bàn giao hoàn thiện.",
        isPopular: true,
        imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuCzzXWoAp5LZN4sugqCdHWncVfNDyr4Vil76z-Q1RKTGk-lt0GoKzbeSjMzHicQb_sApwnuAwSuVwEM92Q2A87BIZEintBCBE1YiWQi2_p7MRPVzU95hzof9oyDwGec22MAnOWGNo-wdBuZ8hzGsXdCiS6bc2zdjPMcfdoF7UsMyXdpFr0xktNJgEQ3uUCf7Hooi_z01xKbQ400gBUMChBPb1ipEw0-3QuSdh8ryVX6nchvmT6l53DdFg",
        highlights: ["Thiết kế 3D hoàn toàn miễn phí", "Cam kết không phát sinh chi phí"]
      },
      {
        title: "Thi công phần thô",
        description: "Xây dựng kết cấu bê tông cốt thép kiên cố, chuẩn chỉ kỹ thuật theo đúng bản vẽ thiết kế.",
        imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuDHyVbE2QgwSXrwUud6SRqy3PiTUSjCVxRP8uztI44fNyT1KhKguXd2OBhrp6GNCjGqAEQgOpTCiUCPyOjR2pQUBnNNSpgH_qUlpdfBwximRPbVRfhsgacMjN9GsF6Y3DNOwZSVqyf2N00bOcLrv1MQwVNZcM5AHRI7zmc3GXor-C1z6P5uiWloYm89oX0SqQgN6nSK3zKE3-7mTRMKIv1GyKBmZIX-uC1HAMifzO48pjBlx_GJEeL2_A"
      },
      {
        title: "Cải tạo và sửa chữa",
        description: "Gia cố móng, nâng tầng, thay đổi công năng và nâng cấp diện mạo căn nhà cũ thành không gian mới hiện đại.",
        imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuAeNwACDuEwK2rB4tR60Zj2YClWhlOBCFHbJAVQc2y8uRZDnutCT4ilfLuEE1hzXUlRTrbQkoUUDkjTlvRsOL5W-ISu6ZgFB9C37umbz7fH6072iS6vW9ghek5MdwxYvt9V2ddQDyvDsYeTKmcKqUt3L5mzegSUk3rnvs0BQmWGt6X5G_-0xYL0Zl2ZBS5WZziqSlfm0ThWKWa7n_x0LplA-70dDh5PIM09iKxX3pYcm4G1-6Kbj9hPEQ"
      }
    ],
    gallery: [
      {
        title: "Nhà phố Minh Long House",
        location: "Đà Nẵng",
        category: "Nhà phố",
        imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuANejKuLJEcf__QRs-v93lOp6XkPwb2Wp2YyIMsoFnq0Cd65IWpjbHZu1Yytsu3ieLdg2TOn8M2xGx8k-bgK_nfemPuLAxtIyWPBEH9pc_H-KHtQI6_2Nw3_RA549OCjNALz42WBwPya5PopYknpg_onEtvy5R6ZvYaQSf5HOkJOyc6MEcENbMn8W_xSBj9ujL1MFsCno8d-KrH9gouBT9E6ZpRTivdt_ARqihPuovHVSDyVkLuBzAmdA"
      },
      {
        title: "Biệt thự sườn đồi Minh Long Villa",
        location: "Quảng Nam",
        category: "Biệt thự",
        imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuBUPmN3LZRTp9yf0ym6G7Gvs0G_mRVid2M5r8RtuKmrZOOSdre0y1keYjEA20jUXYB188LYQ6sYC8ykhbzdnPVEz-EtuiyINWNlM90mOJrEfqbnskZq58HMo-T6kw2XIhgynI4YV2sQDxBCTiaqLkMZiLDOVvRFvi8p8DuTwnVh2nQiJNbFV4s_eeabSbAjXASmm9BRzZ1Krj0yBA1OoAHnnPtUQNuE9WYxLjJanuhU_zqgrNGOL3Rayg"
      }
    ],
    reviews: [
      {
        rating: 5,
        text: "Công ty Minh Long làm việc tận tâm. Giám sát kỹ thuật có mặt thường xuyên tại công trình, xử lý nhanh các tình huống phát sinh và giải thích rất rõ cho tôi.",
        authorName: "Anh Nguyễn Tuấn",
        authorRole: "Chủ nhà phố Liên Chiểu"
      },
      {
        rating: 4,
        text: "Rất hài lòng với bản thiết kế 3D và tiến độ thi công. Đội thợ mộc hoàn thiện nội thất đẹp, sắc nét từng chi tiết.",
        authorName: "Chị Hoài Thương",
        authorRole: "Chủ biệt thự Hòa Xuân"
      }
    ]
  }
};

export function getMockBusinessByPlaceId(placeId: string): RawBusiness | undefined {
  return mockBusinesses[placeId] || mockBusinesses["constructum"];
}
