import type { IndustryKey, TemplateDefaults } from "@/types/demo";

const image = (src: string, alt: string) => ({
  src,
  alt,
  source: "fallback" as const
});

export const templateDefaults: Record<IndustryKey, TemplateDefaults> = {
  phong_kham: {
    key: "phong_kham",
    label: "Phòng khám đa khoa",
    shortLabel: "Phòng khám",
    heroTitle: "Dịch vụ chăm sóc sức khỏe đáng tin cậy cho gia đình bạn",
    heroSubtitle: "Không gian khám hiện đại, quy trình rõ ràng và đội ngũ tận tâm giúp khách hàng an tâm hơn trong từng lần thăm khám.",
    aboutTitle: "Phòng khám hướng đến trải nghiệm y tế rõ ràng và tử tế",
    aboutBody: "Template này nhấn mạnh sự tin cậy, minh bạch và cảm giác an toàn. Nội dung demo sẽ tự động lấy tên, địa chỉ, đánh giá và kênh liên hệ từ dữ liệu lead.",
    services: [
      { title: "Khám tổng quát", description: "Tư vấn và kiểm tra sức khỏe cơ bản theo nhu cầu.", iconKey: "health" },
      { title: "Tư vấn chuyên khoa", description: "Điều hướng khách hàng tới dịch vụ phù hợp.", iconKey: "doctor" },
      { title: "Theo dõi sức khỏe", description: "Nhắc lịch và hỗ trợ liên hệ sau thăm khám.", iconKey: "care" }
    ],
    highlights: ["Quy trình tiếp nhận rõ ràng", "Thông tin liên hệ dễ thấy", "Phù hợp nhiều nhóm khách hàng"],
    badges: ["Thông tin rõ ràng", "Dễ đặt lịch", "Thân thiện di động"],
    fallbackImages: [
      image("https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1400&q=80", "Không gian phòng khám hiện đại"),
      image("https://images.unsplash.com/photo-1580281657527-47f249e8f4df?auto=format&fit=crop&w=900&q=80", "Khu vực tư vấn sức khỏe")
    ],
    primaryCtaLabel: "Đặt lịch tư vấn",
    secondaryCtaLabel: "Xem vị trí",
    palette: { background: "#f7fbff", surface: "#ffffff", text: "#102033", muted: "#607086", primary: "#116d8f", secondary: "#e8f6fb", accent: "#20a4a8", border: "#dbeaf2" }
  },
  quan_cafe: {
    key: "quan_cafe",
    label: "Quán cafe đẹp",
    shortLabel: "Cafe",
    heroTitle: "Không gian cafe dễ nhớ cho những cuộc hẹn mỗi ngày",
    heroSubtitle: "Một landing page giàu hình ảnh, tập trung vào không gian, đồ uống nổi bật và chỉ đường nhanh.",
    aboutTitle: "Một điểm hẹn có cá tính riêng",
    aboutBody: "Template cafe ưu tiên ảnh không gian, cảm giác thư giãn và CTA chỉ đường. Dữ liệu lead sẽ tự động thay tên quán, địa chỉ, ảnh và rating.",
    services: [
      { title: "Cafe & đồ uống", description: "Giới thiệu nhóm món chủ lực của quán.", iconKey: "coffee" },
      { title: "Không gian check-in", description: "Làm nổi bật hình ảnh và trải nghiệm tại quán.", iconKey: "camera" },
      { title: "Làm việc & gặp gỡ", description: "Gợi ý không gian phù hợp đi một mình hoặc theo nhóm.", iconKey: "wifi" }
    ],
    highlights: ["Ảnh quán nổi bật", "CTA chỉ đường nhanh", "Rating hiển thị tự động"],
    badges: ["Không gian đẹp", "Dễ tìm đường", "Phù hợp check-in"],
    fallbackImages: [
      image("https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1400&q=80", "Không gian quán cafe"),
      image("https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80", "Ly cafe trên bàn")
    ],
    primaryCtaLabel: "Chỉ đường đến quán",
    secondaryCtaLabel: "Gọi cho quán",
    palette: { background: "#fbf8f3", surface: "#ffffff", text: "#251915", muted: "#735f55", primary: "#8a4f2b", secondary: "#f3e5d5", accent: "#c08442", border: "#ead9c7" }
  },
  garage_oto: {
    key: "garage_oto",
    label: "Garage sửa chữa ô tô",
    shortLabel: "Garage",
    heroTitle: "Dịch vụ chăm sóc và sửa chữa ô tô rõ ràng, nhanh gọn",
    heroSubtitle: "Landing page tạo niềm tin bằng thông tin liên hệ rõ, vị trí dễ đi và các nhóm dịch vụ chính.",
    aboutTitle: "Garage cần thể hiện sự chắc chắn và minh bạch",
    aboutBody: "Template garage dùng bố cục mạnh, tương phản tốt, giúp khách nhanh chóng gọi điện, xem vị trí và hiểu dịch vụ chính.",
    services: [
      { title: "Bảo dưỡng định kỳ", description: "Giới thiệu dịch vụ kiểm tra và chăm sóc xe thường xuyên.", iconKey: "wrench" },
      { title: "Sửa chữa kỹ thuật", description: "Trình bày nhóm dịch vụ sửa chữa phổ biến.", iconKey: "tool" },
      { title: "Tư vấn tình trạng xe", description: "Khuyến khích khách liên hệ để được kiểm tra ban đầu.", iconKey: "car" }
    ],
    highlights: ["CTA gọi điện rõ ràng", "Tối ưu khách đang cần sửa gấp", "Hình ảnh thực tế từ Google Maps"],
    badges: ["Nhanh chóng", "Minh bạch", "Dễ liên hệ"],
    fallbackImages: [
      image("https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=1400&q=80", "Khu vực sửa chữa ô tô"),
      image("https://images.unsplash.com/photo-1625047509168-a7026f36de04?auto=format&fit=crop&w=900&q=80", "Kỹ thuật viên garage ô tô")
    ],
    primaryCtaLabel: "Gọi kiểm tra xe",
    secondaryCtaLabel: "Xem bản đồ",
    palette: { background: "#f5f6f7", surface: "#ffffff", text: "#101214", muted: "#66707a", primary: "#f97316", secondary: "#fff0e5", accent: "#20242a", border: "#d8dee5" }
  },
  tham_my_vien: {
    key: "tham_my_vien",
    label: "Thẩm mỹ viện",
    shortLabel: "Thẩm mỹ",
    heroTitle: "",
    heroSubtitle: "Template sang trọng, an toàn về claims, phù hợp demo cho clinic, viện thẩm mỹ và dịch vụ làm đẹp chuyên sâu.",
    aboutTitle: "Tạo cảm giác cao cấp nhưng vẫn gần gũi",
    aboutBody: "Nội dung tránh cam kết kết quả thẩm mỹ tuyệt đối. Trang tập trung vào trải nghiệm, tư vấn, không gian và thông tin liên hệ.",
    services: [
      { title: "Tư vấn liệu trình", description: "Định hướng dịch vụ theo nhu cầu chăm sóc cá nhân.", iconKey: "sparkle" },
      { title: "Chăm sóc da", description: "Giới thiệu nhóm dịch vụ làm đẹp và phục hồi da.", iconKey: "skin" },
      { title: "Không gian cao cấp", description: "Nhấn mạnh trải nghiệm riêng tư, sạch sẽ và chỉn chu.", iconKey: "room" }
    ],
    highlights: ["Không cam kết kết quả quá mức", "Ảnh clinic là trung tâm", "CTA tư vấn nổi bật"],
    badges: ["Tư vấn cá nhân", "Không gian cao cấp", "Dễ đặt lịch"],
    fallbackImages: [
      image("https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1400&q=80", "Không gian thẩm mỹ viện cao cấp"),
      image("https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=900&q=80", "Dịch vụ chăm sóc sắc đẹp")
    ],
    primaryCtaLabel: "Đặt lịch tư vấn",
    secondaryCtaLabel: "Nhắn Facebook",
    palette: { background: "#fff8fa", surface: "#ffffff", text: "#2b1622", muted: "#78606c", primary: "#7a274f", secondary: "#f7d9e2", accent: "#b89b5e", border: "#eed8df" }
  },
  nha_hang: {
    key: "nha_hang",
    label: "Nhà hàng sang trọng",
    shortLabel: "Nhà hàng",
    heroTitle: "Trải nghiệm ẩm thực tinh tế trong không gian đáng nhớ",
    heroSubtitle: "Template ưu tiên hình ảnh món ăn, không gian, đánh giá và CTA đặt bàn.",
    aboutTitle: "Tôn vinh không gian, hương vị và trải nghiệm tiếp khách",
    aboutBody: "Landing page cho nhà hàng cần tạo cảm giác muốn đặt bàn ngay, đồng thời hiển thị rõ địa chỉ, điện thoại và social proof.",
    services: [
      { title: "Đặt bàn", description: "CTA nhanh cho khách muốn giữ chỗ.", iconKey: "calendar" },
      { title: "Thực đơn nổi bật", description: "Không hard-code món cụ thể, dễ thay bằng dữ liệu sau.", iconKey: "menu" },
      { title: "Không gian tiếp khách", description: "Phù hợp hẹn hò, gia đình hoặc đối tác.", iconKey: "table" }
    ],
    highlights: ["Hình ảnh ẩm thực lớn", "CTA đặt bàn rõ", "Tối ưu mobile"],
    badges: ["Ẩm thực tinh tế", "Không gian đẹp", "Dễ đặt bàn"],
    fallbackImages: [
      image("https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1400&q=80", "Không gian nhà hàng sang trọng"),
      image("https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=900&q=80", "Bàn ăn nhà hàng")
    ],
    primaryCtaLabel: "Đặt bàn ngay",
    secondaryCtaLabel: "Xem vị trí",
    palette: { background: "#120d0b", surface: "#211815", text: "#fff8ef", muted: "#d2c2b4", primary: "#c9a45c", secondary: "#2c211d", accent: "#8f1d2c", border: "#3b2c26" }
  },
  noi_that: {
    key: "noi_that",
    label: "Công ty thiết kế nội thất",
    shortLabel: "Nội thất",
    heroTitle: "Giải pháp thiết kế nội thất tinh gọn, thẩm mỹ và thực tế",
    heroSubtitle: "Landing page giúp thể hiện năng lực thiết kế qua hình ảnh, quy trình và CTA tư vấn dự án.",
    aboutTitle: "Tập trung vào gu thẩm mỹ và khả năng triển khai",
    aboutBody: "Template nội thất cần nhiều khoảng thở, ảnh lớn và thông điệp rõ về phong cách thiết kế.",
    services: [
      { title: "Tư vấn concept", description: "Khởi tạo định hướng thiết kế theo nhu cầu.", iconKey: "layout" },
      { title: "Thiết kế không gian", description: "Trình bày năng lực thiết kế nhà ở, văn phòng hoặc showroom.", iconKey: "home" },
      { title: "Triển khai dự án", description: "Tạo niềm tin bằng quy trình rõ ràng.", iconKey: "ruler" }
    ],
    highlights: ["Ảnh dự án là trọng tâm", "Bố cục tối giản", "CTA tư vấn dự án"],
    badges: ["Thiết kế tinh gọn", "Quy trình rõ", "Thẩm mỹ cao"],
    fallbackImages: [
      image("https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=80", "Không gian nội thất hiện đại"),
      image("https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=80", "Phòng khách thiết kế đẹp")
    ],
    primaryCtaLabel: "Tư vấn dự án",
    secondaryCtaLabel: "Xem vị trí",
    palette: { background: "#f7f4ef", surface: "#ffffff", text: "#26231f", muted: "#70695f", primary: "#5f6f52", secondary: "#ebe5dc", accent: "#b8895b", border: "#ddd4c8" }
  },
  spa: {
    key: "spa",
    label: "Spa thẩm mỹ",
    shortLabel: "Spa",
    heroTitle: "Không gian thư giãn và chăm sóc sắc đẹp nhẹ nhàng",
    heroSubtitle: "Template mềm mại, sạch sẽ, phù hợp spa, chăm sóc da và dịch vụ thư giãn.",
    aboutTitle: "Mang lại cảm giác thư thái ngay từ lần xem đầu tiên",
    aboutBody: "Spa cần tạo cảm xúc dịu, tin cậy và dễ đặt lịch. Dữ liệu business được map tự động vào các điểm chạm quan trọng.",
    services: [
      { title: "Chăm sóc da", description: "Nhóm dịch vụ chăm sóc và phục hồi da.", iconKey: "leaf" },
      { title: "Massage thư giãn", description: "Giới thiệu trải nghiệm thư giãn nhẹ nhàng.", iconKey: "spa" },
      { title: "Tư vấn liệu trình", description: "CTA chuyển đổi cho khách mới.", iconKey: "chat" }
    ],
    highlights: ["Tone dịu nhẹ", "Ảnh dịch vụ rõ", "Không claims quá đà"],
    badges: ["Thư giãn", "Tận tâm", "Dễ đặt lịch"],
    fallbackImages: [
      image("https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1400&q=80", "Không gian spa thư giãn"),
      image("https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=900&q=80", "Dịch vụ chăm sóc spa")
    ],
    primaryCtaLabel: "Đặt lịch spa",
    secondaryCtaLabel: "Nhắn tư vấn",
    palette: { background: "#fffaf7", surface: "#ffffff", text: "#2d2420", muted: "#7a6860", primary: "#b56b70", secondary: "#f7e4df", accent: "#8aa07a", border: "#ead9d2" }
  },
  cong_ty_xay_dung: {
    key: "cong_ty_xay_dung",
    label: "Công ty xây dựng",
    shortLabel: "Xây dựng",
    heroTitle: "Giải pháp xây dựng rõ tiến độ, rõ quy trình, rõ liên hệ",
    heroSubtitle: "Template mạnh mẽ cho đơn vị thi công, xây dựng và cải tạo công trình.",
    aboutTitle: "Thể hiện năng lực thi công bằng cấu trúc thông tin chắc chắn",
    aboutBody: "Landing page xây dựng cần truyền cảm giác đáng tin, thực tế và có khả năng triển khai dự án.",
    services: [
      { title: "Thi công công trình", description: "Giới thiệu nhóm dịch vụ thi công chính.", iconKey: "crane" },
      { title: "Cải tạo sửa chữa", description: "Phù hợp khách hàng cần làm mới không gian.", iconKey: "hammer" },
      { title: "Tư vấn dự toán", description: "CTA thu lead cho nhu cầu báo giá.", iconKey: "estimate" }
    ],
    highlights: ["Tone chắc chắn", "CTA báo giá rõ", "Phù hợp B2B và dân dụng"],
    badges: ["Quy trình rõ", "Tư vấn nhanh", "Dễ báo giá"],
    fallbackImages: [
      image("https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1400&q=80", "Công trường xây dựng"),
      image("https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=900&q=80", "Kỹ sư xây dựng tại công trình")
    ],
    primaryCtaLabel: "Nhận tư vấn báo giá",
    secondaryCtaLabel: "Xem vị trí",
    palette: { background: "#f6f7f8", surface: "#ffffff", text: "#17202a", muted: "#65717d", primary: "#d98821", secondary: "#fff3df", accent: "#34495e", border: "#dce1e7" }
  },
  luat_su: {
    key: "luat_su",
    label: "Văn phòng luật sư",
    shortLabel: "Luật sư",
    heroTitle: "Tư vấn pháp lý rõ ràng, chuyên nghiệp và đáng tin cậy",
    heroSubtitle: "Template trang nhã cho văn phòng luật, nhấn mạnh sự kín đáo, tin cậy và CTA đặt lịch tư vấn.",
    aboutTitle: "Tạo cảm giác chuyên nghiệp ngay từ điểm chạm đầu tiên",
    aboutBody: "Nội dung không cam kết thắng kiện. Trang tập trung vào phạm vi tư vấn, thông tin liên hệ và niềm tin ban đầu.",
    services: [
      { title: "Tư vấn pháp lý", description: "Tiếp nhận nhu cầu và định hướng bước tiếp theo.", iconKey: "scale" },
      { title: "Hồ sơ & hợp đồng", description: "Giới thiệu dịch vụ rà soát, chuẩn bị văn bản.", iconKey: "document" },
      { title: "Đại diện làm việc", description: "Trình bày năng lực hỗ trợ theo vụ việc.", iconKey: "briefcase" }
    ],
    highlights: ["Không cam kết kết quả pháp lý", "Tone nghiêm túc", "Thông tin liên hệ rõ"],
    badges: ["Bảo mật", "Chuyên nghiệp", "Rõ quy trình"],
    fallbackImages: [
      image("https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1400&q=80", "Không gian văn phòng luật"),
      image("https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=900&q=80", "Tài liệu pháp lý")
    ],
    primaryCtaLabel: "Đặt lịch tư vấn",
    secondaryCtaLabel: "Xem địa chỉ",
    palette: { background: "#f7f8fb", surface: "#ffffff", text: "#111827", muted: "#5f6b7a", primary: "#1e3a5f", secondary: "#e9eef5", accent: "#b08d57", border: "#dce3ec" }
  },
  dich_vu_ve_sinh: {
    key: "dich_vu_ve_sinh",
    label: "Dịch vụ vệ sinh công nghiệp",
    shortLabel: "Vệ sinh",
    heroTitle: "Dịch vụ vệ sinh sạch gọn, linh hoạt cho nhà ở và doanh nghiệp",
    heroSubtitle: "Template rõ dịch vụ, rõ CTA báo giá, phù hợp nhóm khách cần xử lý nhanh.",
    aboutTitle: "Sạch sẽ, nhanh chóng và dễ đặt dịch vụ",
    aboutBody: "Landing page vệ sinh cần giúp khách hiểu nhanh dịch vụ và liên hệ báo giá với ít bước nhất.",
    services: [
      { title: "Vệ sinh định kỳ", description: "Dành cho văn phòng, cửa hàng hoặc nhà ở.", iconKey: "clean" },
      { title: "Tổng vệ sinh", description: "Phù hợp sau xây dựng, chuyển nhà hoặc khai trương.", iconKey: "sparkle" },
      { title: "Báo giá nhanh", description: "CTA thu thông tin nhu cầu để tư vấn.", iconKey: "quote" }
    ],
    highlights: ["Dễ gọi báo giá", "Tone sạch và sáng", "Tối ưu khách cần nhanh"],
    badges: ["Sạch gọn", "Linh hoạt", "Báo giá nhanh"],
    fallbackImages: [
      image("https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1400&q=80", "Dịch vụ vệ sinh chuyên nghiệp"),
      image("https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=900&q=80", "Không gian sạch sẽ")
    ],
    primaryCtaLabel: "Nhận báo giá",
    secondaryCtaLabel: "Gọi tư vấn",
    palette: { background: "#f5fcfb", surface: "#ffffff", text: "#12302c", muted: "#617672", primary: "#0f9f8f", secondary: "#dff7f2", accent: "#38bdf8", border: "#cbece6" }
  },
  salon_toc: {
    key: "salon_toc",
    label: "Hair salon",
    shortLabel: "Salon tóc",
    heroTitle: "Không gian làm tóc hiện đại cho phong cách riêng của bạn",
    heroSubtitle: "Template giàu hình ảnh, CTA đặt lịch nhanh và dịch vụ dễ thay thế bằng dữ liệu sau.",
    aboutTitle: "Tập trung vào phong cách, tay nghề và cảm giác tự tin",
    aboutBody: "Salon cần một trang đẹp, gọn, thể hiện gu thẩm mỹ và giúp khách đặt lịch nhanh trên mobile.",
    services: [
      { title: "Cắt & tạo kiểu", description: "Dịch vụ nền tảng cho khách mới.", iconKey: "scissors" },
      { title: "Nhuộm & phục hồi", description: "Giới thiệu nhóm dịch vụ chăm sóc tóc.", iconKey: "color" },
      { title: "Tư vấn phong cách", description: "Khuyến khích khách nhắn tin hoặc gọi đặt lịch.", iconKey: "chat" }
    ],
    highlights: ["Ảnh style nổi bật", "CTA đặt lịch nhanh", "Phù hợp mobile"],
    badges: ["Phong cách", "Tỉ mỉ", "Dễ đặt lịch"],
    fallbackImages: [
      image("https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1400&q=80", "Không gian salon tóc"),
      image("https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=80", "Dịch vụ làm tóc")
    ],
    primaryCtaLabel: "Đặt lịch làm tóc",
    secondaryCtaLabel: "Nhắn tư vấn",
    palette: { background: "#fbf7f5", surface: "#ffffff", text: "#251f1d", muted: "#766761", primary: "#a65f4b", secondary: "#f1ddd6", accent: "#202020", border: "#e7d5ce" }
  },
  nha_khoa: {
    key: "nha_khoa",
    label: "Nha khoa",
    shortLabel: "Nha khoa",
    heroTitle: "Nụ cười khỏe đẹp bắt đầu từ một lịch hẹn rõ ràng",
    heroSubtitle: "Template nha khoa sạch, sáng, tạo niềm tin bằng rating, vị trí và CTA đặt lịch.",
    aboutTitle: "Một trang nha khoa cần sạch, tin cậy và dễ đặt lịch",
    aboutBody: "Thông tin lead được tự động map vào hero, social proof, liên hệ và SEO. Nội dung tránh claims điều trị quá mức.",
    services: [
      { title: "Khám & tư vấn răng miệng", description: "Tạo điểm vào nhẹ nhàng cho khách mới.", iconKey: "tooth" },
      { title: "Chăm sóc nha khoa", description: "Giới thiệu nhóm dịch vụ tổng quát.", iconKey: "smile" },
      { title: "Đặt lịch nhanh", description: "CTA giúp khách liên hệ ngay trên điện thoại.", iconKey: "calendar" }
    ],
    highlights: ["Tone sạch và sáng", "Rating nổi bật", "CTA đặt lịch rõ"],
    badges: ["Tận tâm", "Sạch sẽ", "Dễ đặt lịch"],
    fallbackImages: [
      image("https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1400&q=80", "Phòng khám nha khoa hiện đại"),
      image("https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=900&q=80", "Ghế nha khoa hiện đại")
    ],
    primaryCtaLabel: "Đặt lịch nha khoa",
    secondaryCtaLabel: "Xem đường đi",
    palette: { background: "#f4fbfb", surface: "#ffffff", text: "#102a2b", muted: "#607677", primary: "#1aa6a6", secondary: "#dff7f6", accent: "#59c3c3", border: "#ccebea" }
  },
  studio_chup_anh: {
    key: "studio_chup_anh",
    label: "Studio chụp ảnh cưới",
    shortLabel: "Studio",
    heroTitle: "Lưu giữ khoảnh khắc cưới bằng những khung hình có cảm xúc",
    heroSubtitle: "Template lãng mạn, nhiều ảnh, CTA tư vấn gói chụp và xem vị trí studio.",
    aboutTitle: "Ảnh là ngôn ngữ chính của studio",
    aboutBody: "Landing page studio cần tạo cảm xúc nhanh, dùng gallery làm trọng tâm và dẫn khách tới hành động nhắn tư vấn.",
    services: [
      { title: "Chụp ảnh cưới", description: "Giới thiệu nhóm dịch vụ chính của studio.", iconKey: "camera" },
      { title: "Concept & styling", description: "Nhấn mạnh khả năng tư vấn phong cách.", iconKey: "sparkle" },
      { title: "Tư vấn gói chụp", description: "CTA chuyển đổi cho khách đang so sánh.", iconKey: "chat" }
    ],
    highlights: ["Gallery cảm xúc", "Tone lãng mạn", "CTA tư vấn rõ"],
    badges: ["Lãng mạn", "Chỉn chu", "Dễ tư vấn"],
    fallbackImages: [
      image("https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=80", "Ảnh cưới lãng mạn"),
      image("https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=900&q=80", "Studio chụp ảnh cưới")
    ],
    primaryCtaLabel: "Tư vấn gói chụp",
    secondaryCtaLabel: "Xem studio",
    palette: { background: "#fff8fb", surface: "#ffffff", text: "#2f1e28", muted: "#76616c", primary: "#b85f7f", secondary: "#f8dde8", accent: "#c8a15a", border: "#efd7e2" }
  },
  trung_tam_tieng_anh: {
    key: "trung_tam_tieng_anh",
    label: "Trung tâm tiếng Anh",
    shortLabel: "Tiếng Anh",
    heroTitle: "Lộ trình học tiếng Anh rõ ràng cho từng mục tiêu",
    heroSubtitle: "Template giáo dục hiện đại, tập trung vào niềm tin phụ huynh/học viên, chương trình học và CTA tư vấn.",
    aboutTitle: "Giúp trung tâm trông đáng tin và dễ đăng ký tư vấn",
    aboutBody: "Trang tự động map tên trung tâm, địa chỉ, rating, liên hệ. Nội dung tránh cam kết điểm số tuyệt đối nếu chưa xác thực.",
    services: [
      { title: "Khóa học giao tiếp", description: "Phù hợp học viên cần ứng dụng hằng ngày.", iconKey: "message" },
      { title: "Luyện thi", description: "Giới thiệu nhóm lớp theo mục tiêu học tập.", iconKey: "book" },
      { title: "Tư vấn lộ trình", description: "CTA thu lead học thử hoặc tư vấn.", iconKey: "target" }
    ],
    highlights: ["Tone học thuật thân thiện", "CTA tư vấn/học thử", "Dễ đọc trên mobile"],
    badges: ["Lộ trình rõ", "Dễ đăng ký", "Thân thiện học viên"],
    fallbackImages: [
      image("https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1400&q=80", "Lớp học tiếng Anh"),
      image("https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=900&q=80", "Học viên trong lớp học")
    ],
    primaryCtaLabel: "Đăng ký tư vấn",
    secondaryCtaLabel: "Xem địa chỉ",
    palette: { background: "#f5f8ff", surface: "#ffffff", text: "#0f1d33", muted: "#5d6c82", primary: "#2563eb", secondary: "#e8f0ff", accent: "#f59e0b", border: "#dbe5f7" }
  },
  phong_gym: {
    key: "phong_gym",
    label: "Phòng Gym Fitness",
    shortLabel: "Gym",
    heroTitle: "Không gian tập luyện mạnh mẽ cho mục tiêu mới của bạn",
    heroSubtitle: "Template năng lượng cao, nhấn vào tiện ích, huấn luyện và CTA đăng ký tư vấn.",
    aboutTitle: "Tạo động lực hành động ngay trên mobile",
    aboutBody: "Gym cần CTA rõ, ảnh mạnh, nội dung ngắn và dễ chuyển đổi. Dữ liệu lead được map tự động từ Supabase.",
    services: [
      { title: "Tập luyện cá nhân", description: "Giới thiệu hỗ trợ huấn luyện theo mục tiêu.", iconKey: "dumbbell" },
      { title: "Khu vực thiết bị", description: "Nhấn mạnh không gian và thiết bị tập.", iconKey: "fitness" },
      { title: "Tư vấn gói tập", description: "CTA cho khách muốn bắt đầu nhanh.", iconKey: "bolt" }
    ],
    highlights: ["CTA mạnh", "Hình ảnh năng lượng", "Tối ưu khách mobile"],
    badges: ["Năng lượng", "Mục tiêu rõ", "Dễ đăng ký"],
    fallbackImages: [
      image("https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1400&q=80", "Không gian phòng gym"),
      image("https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80", "Thiết bị tập gym")
    ],
    primaryCtaLabel: "Đăng ký tư vấn",
    secondaryCtaLabel: "Xem phòng tập",
    palette: { background: "#0f1115", surface: "#181b21", text: "#f7f8fa", muted: "#c1c7d0", primary: "#b6f000", secondary: "#242a31", accent: "#ff6b35", border: "#2e343d" }
  }
};

export function getTemplateDefaults(key: IndustryKey): TemplateDefaults {
  return templateDefaults[key] ?? templateDefaults.phong_kham;
}
