import type { IndustryKey } from "@/types/demo";

export type TemplateCatalogType = "render_template" | "reference_image";

export type IndustryCatalogItem = {
  key: IndustryKey;
  name: string;
  description: string;
  order: number;
};

export type TemplateCatalogItem = {
  id: string;
  type: TemplateCatalogType;
  industryKey: IndustryKey;
  templateKey?: IndustryKey;
  name: string;
  description: string;
  tags: string[];
  thumbnail: string;
  longPreviewImage?: string;
  packageName?: string;
  priceLabel?: string;
  demoUrl?: string;
  status: "active" | "draft";
  order: number;
};

export const industryCatalog: IndustryCatalogItem[] = [
  {
    key: "nha_khoa",
    name: "Nha khoa",
    description: "Mẫu website dành cho phòng khám nha khoa, nha khoa thẩm mỹ và dịch vụ chăm sóc nụ cười.",
    order: 10
  },
  {
    key: "spa",
    name: "Spa",
    description: "Mẫu website dành cho spa, chăm sóc da, trị liệu và dịch vụ thư giãn.",
    order: 20
  },
  {
    key: "tham_my_vien",
    name: "Thẩm mỹ viện",
    description: "Mẫu website dành cho clinic thẩm mỹ, làm đẹp và tư vấn cá nhân hóa.",
    order: 30
  },
  {
    key: "phong_kham",
    name: "Phòng khám",
    description: "Mẫu website dành cho phòng khám đa khoa, phòng khám chuyên khoa và dịch vụ y tế.",
    order: 40
  },
  {
    key: "salon_toc",
    name: "Hair salon",
    description: "Mẫu website dành cho salon tóc, barber, nhuộm, uốn và tạo kiểu.",
    order: 50
  },
  {
    key: "luat_su",
    name: "Luật sư",
    description: "Mẫu website dành cho văn phòng luật, tư vấn pháp lý và dịch vụ doanh nghiệp.",
    order: 60
  },
  {
    key: "trung_tam_tieng_anh",
    name: "Trung tâm tiếng Anh",
    description: "Mẫu website dành cho trung tâm ngoại ngữ, luyện thi và khóa học.",
    order: 70
  },
  {
    key: "dich_vu_ve_sinh",
    name: "Dịch vụ vệ sinh",
    description: "Mẫu website dành cho vệ sinh công nghiệp, vệ sinh văn phòng và dịch vụ theo hợp đồng.",
    order: 80
  },
  {
    key: "noi_that",
    name: "Thiết kế nội thất",
    description: "Mẫu website portfolio cho thiết kế nội thất, thi công và tư vấn không gian.",
    order: 90
  },
  {
    key: "cong_ty_xay_dung",
    name: "Công ty xây dựng",
    description: "Mẫu website dành cho nhà thầu, thiết kế thi công và báo giá công trình.",
    order: 100
  },
  {
    key: "nha_hang",
    name: "Nhà hàng sang trọng",
    description: "Mẫu website dành cho nhà hàng cao cấp, đặt bàn, thực đơn và không gian.",
    order: 110
  },
  {
    key: "quan_cafe",
    name: "Quán cafe",
    description: "Mẫu website dành cho cafe concept, menu, không gian và booking sự kiện nhỏ.",
    order: 120
  },
  {
    key: "studio_chup_anh",
    name: "Studio chụp ảnh",
    description: "Mẫu website dành cho studio cưới, chụp ảnh gia đình và dịch vụ hình ảnh.",
    order: 130
  },
  {
    key: "phong_gym",
    name: "Gym fitness",
    description: "Mẫu website dành cho phòng gym, fitness, PT và lớp nhóm.",
    order: 140
  },
  {
    key: "garage_oto",
    name: "Garage ô tô",
    description: "Mẫu website dành cho garage, bảo dưỡng, sửa chữa và chăm sóc xe.",
    order: 150
  }
];

const renderTemplateItems: TemplateCatalogItem[] = industryCatalog.map((industry) => ({
  id: `${industry.key}-main-template`,
  type: "render_template",
  industryKey: industry.key,
  templateKey: industry.key,
  name: `Mẫu website ${industry.name}`,
  description: industry.description,
  tags: [industry.name, "Mẫu website", "TAVIWEB"],
  thumbnail: `/template-previews/${industry.key}.jpg`,
  demoUrl: `/demo/mock-${industry.key}`,
  status: "active",
  order: industry.order
}));

const referenceTemplateItems: TemplateCatalogItem[] = [
  {
    id: "NK001",
    type: "reference_image",
    industryKey: "nha_khoa",
    name: "Website nha khoa NK001",
    description: "Mẫu website nha khoa dạng ảnh dài, phù hợp phòng khám nha khoa và chăm sóc răng miệng.",
    tags: ["Nha khoa", "Ảnh dài", "Phòng khám"],
    thumbnail: "/assets/anh-template/nha-khoa/NK001.jpeg",
    longPreviewImage: "/assets/anh-template/nha-khoa/NK001.jpeg",
    packageName: "Gói website nha khoa",
    priceLabel: "Liên hệ",
    status: "active",
    order: 101
  },
  {
    id: "NK002",
    type: "reference_image",
    industryKey: "nha_khoa",
    name: "Website nha khoa NK002",
    description: "Mẫu giao diện nha khoa thẩm mỹ hiện đại, trình bày dịch vụ và đội ngũ bác sĩ.",
    tags: ["Nha khoa", "Ảnh dài", "Chuyên nghiệp"],
    thumbnail: "/assets/anh-template/nha-khoa/NK002.jpeg",
    longPreviewImage: "/assets/anh-template/nha-khoa/NK002.jpeg",
    packageName: "Gói website nha khoa",
    priceLabel: "Liên hệ",
    status: "active",
    order: 102
  },
  {
    id: "NK003",
    type: "reference_image",
    industryKey: "nha_khoa",
    name: "Website nha khoa NK003",
    description: "Mẫu thiết kế nha khoa tập trung vào các case thành công và phản hồi khách hàng.",
    tags: ["Nha khoa", "Ảnh dài", "Tin cậy"],
    thumbnail: "/assets/anh-template/nha-khoa/NK003.jpeg",
    longPreviewImage: "/assets/anh-template/nha-khoa/NK003.jpeg",
    packageName: "Gói website nha khoa",
    priceLabel: "Liên hệ",
    status: "active",
    order: 103
  },
  {
    id: "NK004",
    type: "reference_image",
    industryKey: "nha_khoa",
    name: "Website nha khoa NK004",
    description: "Mẫu ảnh dài cho trung tâm nha khoa lớn cần giới thiệu công nghệ và trang thiết bị.",
    tags: ["Nha khoa", "Ảnh dài", "Công nghệ"],
    thumbnail: "/assets/anh-template/nha-khoa/NK004.jpeg",
    longPreviewImage: "/assets/anh-template/nha-khoa/NK004.jpeg",
    packageName: "Gói website nha khoa",
    priceLabel: "Liên hệ",
    status: "active",
    order: 104
  },
  {
    id: "SPA001",
    type: "reference_image",
    industryKey: "spa",
    name: "Website spa SPA001",
    description: "Mẫu website spa dạng ảnh dài, phù hợp spa làm đẹp, chăm sóc da và trị liệu.",
    tags: ["Spa", "Ảnh dài", "Làm đẹp"],
    thumbnail: "/assets/anh-template/spa/SPA001.jpeg",
    longPreviewImage: "/assets/anh-template/spa/SPA001.jpeg",
    packageName: "Gói website spa",
    priceLabel: "Liên hệ",
    status: "active",
    order: 201
  },
  {
    id: "SPA002",
    type: "reference_image",
    industryKey: "spa",
    name: "Website spa SPA002",
    description: "Mẫu giao diện spa thư giãn nhẹ nhàng, tập trung vào bảng giá dịch vụ và đặt lịch.",
    tags: ["Spa", "Ảnh dài", "Thư giãn"],
    thumbnail: "/assets/anh-template/spa/SPA002.jpeg",
    longPreviewImage: "/assets/anh-template/spa/SPA002.jpeg",
    packageName: "Gói website spa",
    priceLabel: "Liên hệ",
    status: "active",
    order: 202
  },
  {
    id: "SPA003",
    type: "reference_image",
    industryKey: "spa",
    name: "Website spa SPA003",
    description: "Mẫu thiết kế spa cao cấp, phong cách tối giản và tinh tế.",
    tags: ["Spa", "Ảnh dài", "Cao cấp"],
    thumbnail: "/assets/anh-template/spa/SPA003.jpeg",
    longPreviewImage: "/assets/anh-template/spa/SPA003.jpeg",
    packageName: "Gói website spa",
    priceLabel: "Liên hệ",
    status: "active",
    order: 203
  },
  {
    id: "SPA004",
    type: "reference_image",
    industryKey: "spa",
    name: "Website spa SPA004",
    description: "Mẫu ảnh dài cho trung tâm thẩm mỹ trị liệu và chăm sóc toàn diện.",
    tags: ["Spa", "Ảnh dài", "Trị liệu"],
    thumbnail: "/assets/anh-template/spa/SPA004.jpeg",
    longPreviewImage: "/assets/anh-template/spa/SPA004.jpeg",
    packageName: "Gói website spa",
    priceLabel: "Liên hệ",
    status: "active",
    order: 204
  },
  {
    id: "TMV001",
    type: "reference_image",
    industryKey: "tham_my_vien",
    name: "Website thẩm mỹ viện TMV001",
    description: "Mẫu website thẩm mỹ viện dạng ảnh dài, phù hợp viện thẩm mỹ và clinic làm đẹp công nghệ cao.",
    tags: ["Thẩm mỹ viện", "Ảnh dài", "Clinic"],
    thumbnail: "/assets/anh-template/tham-my-vien/TMV001.jpeg",
    longPreviewImage: "/assets/anh-template/tham-my-vien/TMV001.jpeg",
    packageName: "Gói website thẩm mỹ viện",
    priceLabel: "Liên hệ",
    status: "active",
    order: 301
  },
  {
    id: "TMV002",
    type: "reference_image",
    industryKey: "tham_my_vien",
    name: "Website thẩm mỹ viện TMV002",
    description: "Mẫu giao diện thẩm mỹ viện sang trọng, tôn vinh vẻ đẹp tự nhiên và dịch vụ cao cấp.",
    tags: ["Thẩm mỹ viện", "Ảnh dài", "Sang trọng"],
    thumbnail: "/assets/anh-template/tham-my-vien/TMV002.jpeg",
    longPreviewImage: "/assets/anh-template/tham-my-vien/TMV002.jpeg",
    packageName: "Gói website thẩm mỹ viện",
    priceLabel: "Liên hệ",
    status: "active",
    order: 302
  },
  {
    id: "TMV003",
    type: "reference_image",
    industryKey: "tham_my_vien",
    name: "Website thẩm mỹ viện TMV003",
    description: "Mẫu thiết kế clinic thẩm mỹ chú trọng đội ngũ chuyên gia bác sĩ và chứng nhận an toàn.",
    tags: ["Thẩm mỹ viện", "Ảnh dài", "Bác sĩ"],
    thumbnail: "/assets/anh-template/tham-my-vien/TMV003.jpeg",
    longPreviewImage: "/assets/anh-template/tham-my-vien/TMV003.jpeg",
    packageName: "Gói website thẩm mỹ viện",
    priceLabel: "Liên hệ",
    status: "active",
    order: 303
  },
  {
    id: "TMV004",
    type: "reference_image",
    industryKey: "tham_my_vien",
    name: "Website thẩm mỹ viện TMV004",
    description: "Mẫu ảnh dài cho trung tâm làm đẹp toàn diện, giới thiệu các liệu trình phẫu thuật hoặc không xâm lấn.",
    tags: ["Thẩm mỹ viện", "Ảnh dài", "Làm đẹp"],
    thumbnail: "/assets/anh-template/tham-my-vien/TMV004.jpeg",
    longPreviewImage: "/assets/anh-template/tham-my-vien/TMV004.jpeg",
    packageName: "Gói website thẩm mỹ viện",
    priceLabel: "Liên hệ",
    status: "active",
    order: 304
  },
  {
    id: "PK001",
    type: "reference_image",
    industryKey: "phong_kham",
    name: "Website phòng khám PK001",
    description: "Mẫu website phòng khám dạng ảnh dài, phù hợp phòng khám đa khoa, chuyên khoa và y tế gia đình.",
    tags: ["Phòng khám", "Ảnh dài", "Đa khoa"],
    thumbnail: "/assets/anh-template/phong-kham/PK001.jpeg",
    longPreviewImage: "/assets/anh-template/phong-kham/PK001.jpeg",
    packageName: "Gói website phòng khám",
    priceLabel: "Liên hệ",
    status: "active",
    order: 401
  },
  {
    id: "PK002",
    type: "reference_image",
    industryKey: "phong_kham",
    name: "Website phòng khám PK002",
    description: "Mẫu giao diện phòng khám chuyên khoa, giới thiệu dịch vụ khám bệnh và đặt lịch hẹn khám.",
    tags: ["Phòng khám", "Ảnh dài", "Chuyên khoa"],
    thumbnail: "/assets/anh-template/phong-kham/PK002.jpeg",
    longPreviewImage: "/assets/anh-template/phong-kham/PK002.jpeg",
    packageName: "Gói website phòng khám",
    priceLabel: "Liên hệ",
    status: "active",
    order: 402
  },
  {
    id: "PK003",
    type: "reference_image",
    industryKey: "phong_kham",
    name: "Website phòng khám PK003",
    description: "Mẫu thiết kế y tế nhi khoa/phụ sản ấm áp, tạo cảm giác an tâm và tận tâm.",
    tags: ["Phòng khám", "Ảnh dài", "Nhi khoa"],
    thumbnail: "/assets/anh-template/phong-kham/PK003.jpeg",
    longPreviewImage: "/assets/anh-template/phong-kham/PK003.jpeg",
    packageName: "Gói website phòng khám",
    priceLabel: "Liên hệ",
    status: "active",
    order: 403
  },
  {
    id: "PK004",
    type: "reference_image",
    industryKey: "phong_kham",
    name: "Website phòng khám PK004",
    description: "Mẫu ảnh dài cho trung tâm xét nghiệm, chẩn đoán hình ảnh hiện đại.",
    tags: ["Phòng khám", "Ảnh dài", "Xét nghiệm"],
    thumbnail: "/assets/anh-template/phong-kham/PK004.jpeg",
    longPreviewImage: "/assets/anh-template/phong-kham/PK004.jpeg",
    packageName: "Gói website phòng khám",
    priceLabel: "Liên hệ",
    status: "active",
    order: 404
  },
  {
    id: "LUAT001",
    type: "reference_image",
    industryKey: "luat_su",
    name: "Website luật sư LUAT001",
    description: "Mẫu website luật sư dạng ảnh dài, phù hợp văn phòng luật, tư vấn pháp lý và dịch vụ doanh nghiệp.",
    tags: ["Luật sư", "Ảnh dài", "Pháp lý"],
    thumbnail: "/assets/anh-template/luat-su/LUAT001.jpeg",
    longPreviewImage: "/assets/anh-template/luat-su/LUAT001.jpeg",
    packageName: "Gói website luật sư",
    priceLabel: "Liên hệ",
    status: "active",
    order: 601
  },
  {
    id: "LUAT002",
    type: "reference_image",
    industryKey: "luat_su",
    name: "Website luật sư LUAT002",
    description: "Mẫu giao diện hãng luật chuyên nghiệp, giới thiệu đội ngũ luật sư cộng sự danh tiếng.",
    tags: ["Luật sư", "Ảnh dài", "Hãng luật"],
    thumbnail: "/assets/anh-template/luat-su/LUAT002.jpeg",
    longPreviewImage: "/assets/anh-template/luat-su/LUAT002.jpeg",
    packageName: "Gói website luật sư",
    priceLabel: "Liên hệ",
    status: "active",
    order: 602
  },
  {
    id: "LUAT003",
    type: "reference_image",
    industryKey: "luat_su",
    name: "Website luật sư LUAT003",
    description: "Mẫu thiết kế văn phòng luật chú trọng tư vấn trực tuyến và giải quyết tranh chấp.",
    tags: ["Luật sư", "Ảnh dài", "Tư vấn"],
    thumbnail: "/assets/anh-template/luat-su/LUAT003.jpeg",
    longPreviewImage: "/assets/anh-template/luat-su/LUAT003.jpeg",
    packageName: "Gói website luật sư",
    priceLabel: "Liên hệ",
    status: "active",
    order: 603
  },
  {
    id: "LUAT004",
    type: "reference_image",
    industryKey: "luat_su",
    name: "Website luật sư LUAT004",
    description: "Mẫu ảnh dài cho luật sư sở hữu trí tuệ, luật dân sự hoặc hình sự.",
    tags: ["Luật sư", "Ảnh dài", "Sở hữu trí tuệ"],
    thumbnail: "/assets/anh-template/luat-su/LUAT004.jpeg",
    longPreviewImage: "/assets/anh-template/luat-su/LUAT004.jpeg",
    packageName: "Gói website luật sư",
    priceLabel: "Liên hệ",
    status: "active",
    order: 604
  },
  {
    id: "TA001",
    type: "reference_image",
    industryKey: "trung_tam_tieng_anh",
    name: "Website tiếng Anh TA001",
    description: "Mẫu website trung tâm tiếng Anh dạng ảnh dài, phù hợp trung tâm ngoại ngữ, luyện thi IELTS/TOEIC.",
    tags: ["Trung tâm tiếng Anh", "Ảnh dài", "Giáo dục"],
    thumbnail: "/assets/anh-template/trung-tam-tieng-anh/TA001.jpeg",
    longPreviewImage: "/assets/anh-template/trung-tam-tieng-anh/TA001.jpeg",
    packageName: "Gói website trung tâm tiếng Anh",
    priceLabel: "Liên hệ",
    status: "active",
    order: 701
  },
  {
    id: "TA002",
    type: "reference_image",
    industryKey: "trung_tam_tieng_anh",
    name: "Website tiếng Anh TA002",
    description: "Mẫu giao diện trung tâm Anh ngữ hiện đại, giới thiệu các khóa học và lộ trình đào tạo.",
    tags: ["Trung tâm tiếng Anh", "Ảnh dài", "Hiện đại"],
    thumbnail: "/assets/anh-template/trung-tam-tieng-anh/TA002.jpeg",
    longPreviewImage: "/assets/anh-template/trung-tam-tieng-anh/TA002.jpeg",
    packageName: "Gói website trung tâm tiếng Anh",
    priceLabel: "Liên hệ",
    status: "active",
    order: 702
  },
  {
    id: "TA003",
    type: "reference_image",
    industryKey: "trung_tam_tieng_anh",
    name: "Website tiếng Anh TA003",
    description: "Mẫu thiết kế website giáo dục tinh tế, tập trung vào trải nghiệm học tập và phản hồi học viên.",
    tags: ["Trung tâm tiếng Anh", "Ảnh dài", "Tinh tế"],
    thumbnail: "/assets/anh-template/trung-tam-tieng-anh/TA003.jpeg",
    longPreviewImage: "/assets/anh-template/trung-tam-tieng-anh/TA003.jpeg",
    packageName: "Gói website trung tâm tiếng Anh",
    priceLabel: "Liên hệ",
    status: "active",
    order: 703
  },
  {
    id: "TA004",
    type: "reference_image",
    industryKey: "trung_tam_tieng_anh",
    name: "Website tiếng Anh TA004",
    description: "Mẫu ảnh dài cho trung tâm tiếng Anh trẻ em hoặc đào tạo kỹ năng chuyên nghiệp.",
    tags: ["Trung tâm tiếng Anh", "Ảnh dài", "Kids"],
    thumbnail: "/assets/anh-template/trung-tam-tieng-anh/TA004.jpeg",
    longPreviewImage: "/assets/anh-template/trung-tam-tieng-anh/TA004.jpeg",
    packageName: "Gói website trung tâm tiếng Anh",
    priceLabel: "Liên hệ",
    status: "active",
    order: 704
  },
  {
    id: "VS001",
    type: "reference_image",
    industryKey: "dich_vu_ve_sinh",
    name: "Website vệ sinh VS001",
    description: "Mẫu website dịch vụ vệ sinh dạng ảnh dài, phù hợp vệ sinh công nghiệp, văn phòng.",
    tags: ["Dịch vụ vệ sinh", "Ảnh dài", "Vệ sinh công nghiệp"],
    thumbnail: "/assets/anh-template/dich-vu-ve-sinh/VS001.jpeg",
    longPreviewImage: "/assets/anh-template/dich-vu-ve-sinh/VS001.jpeg",
    packageName: "Gói website dịch vụ vệ sinh",
    priceLabel: "Liên hệ",
    status: "active",
    order: 801
  },
  {
    id: "VS002",
    type: "reference_image",
    industryKey: "dich_vu_ve_sinh",
    name: "Website vệ sinh VS002",
    description: "Mẫu giao diện công ty vệ sinh hiện đại, giới thiệu dịch vụ và quy trình làm sạch.",
    tags: ["Dịch vụ vệ sinh", "Ảnh dài", "Hiện đại"],
    thumbnail: "/assets/anh-template/dich-vu-ve-sinh/VS002.jpeg",
    longPreviewImage: "/assets/anh-template/dich-vu-ve-sinh/VS002.jpeg",
    packageName: "Gói website dịch vụ vệ sinh",
    priceLabel: "Liên hệ",
    status: "active",
    order: 802
  },
  {
    id: "VS003",
    type: "reference_image",
    industryKey: "dich_vu_ve_sinh",
    name: "Website vệ sinh VS003",
    description: "Mẫu thiết kế dịch vụ dọn dẹp nhà cửa chuyên nghiệp, có bảng giá dịch vụ rõ ràng.",
    tags: ["Dịch vụ vệ sinh", "Ảnh dài", "Gia đình"],
    thumbnail: "/assets/anh-template/dich-vu-ve-sinh/VS003.jpeg",
    longPreviewImage: "/assets/anh-template/dich-vu-ve-sinh/VS003.jpeg",
    packageName: "Gói website dịch vụ vệ sinh",
    priceLabel: "Liên hệ",
    status: "active",
    order: 803
  },
  {
    id: "VS004",
    type: "reference_image",
    industryKey: "dich_vu_ve_sinh",
    name: "Website vệ sinh VS004",
    description: "Mẫu ảnh dài cho doanh nghiệp cung cấp dịch vụ vệ sinh thảm, rèm, sofa chuyên sâu.",
    tags: ["Dịch vụ vệ sinh", "Ảnh dài", "Chuyên sâu"],
    thumbnail: "/assets/anh-template/dich-vu-ve-sinh/VS004.jpeg",
    longPreviewImage: "/assets/anh-template/dich-vu-ve-sinh/VS004.jpeg",
    packageName: "Gói website dịch vụ vệ sinh",
    priceLabel: "Liên hệ",
    status: "active",
    order: 804
  },
  {
    id: "NT001",
    type: "reference_image",
    industryKey: "noi_that",
    name: "Website nội thất NT001",
    description: "Mẫu website nội thất dạng ảnh dài, phù hợp doanh nghiệp thiết kế và thi công không gian.",
    tags: ["Nội thất", "Ảnh dài", "Portfolio"],
    thumbnail: "/assets/anh-template/noi-that/NT001.jpg",
    longPreviewImage: "/assets/anh-template/noi-that/NT001.jpg",
    packageName: "Gói website nội thất",
    priceLabel: "Liên hệ",
    status: "active",
    order: 901
  },
  {
    id: "NT002",
    type: "reference_image",
    industryKey: "noi_that",
    name: "Website nội thất NT002",
    description: "Mẫu giao diện nội thất tập trung vào hình ảnh dự án, dịch vụ và thông tin tư vấn.",
    tags: ["Nội thất", "Ảnh dài", "Dự án"],
    thumbnail: "/assets/anh-template/noi-that/NT002.jpg",
    longPreviewImage: "/assets/anh-template/noi-that/NT002.jpg",
    packageName: "Gói website nội thất",
    priceLabel: "Liên hệ",
    status: "active",
    order: 902
  },
  {
    id: "NT003",
    type: "reference_image",
    industryKey: "noi_that",
    name: "Website nội thất NT003",
    description: "Mẫu website tham khảo cho công ty nội thất cần trình bày năng lực và hạng mục thi công.",
    tags: ["Nội thất", "Ảnh dài", "Thi công"],
    thumbnail: "/assets/anh-template/noi-that/NT003.jpg",
    longPreviewImage: "/assets/anh-template/noi-that/NT003.jpg",
    packageName: "Gói website nội thất",
    priceLabel: "Liên hệ",
    status: "active",
    order: 903
  },
  {
    id: "NT004",
    type: "reference_image",
    industryKey: "noi_that",
    name: "Website nội thất NT004",
    description: "Mẫu ảnh dài cho thương hiệu nội thất muốn nhấn mạnh phong cách, sản phẩm và liên hệ.",
    tags: ["Nội thất", "Ảnh dài", "Thương hiệu"],
    thumbnail: "/assets/anh-template/noi-that/NT004.jpg",
    longPreviewImage: "/assets/anh-template/noi-that/NT004.jpg",
    packageName: "Gói website nội thất",
    priceLabel: "Liên hệ",
    status: "active",
    order: 904
  },
  {
    id: "XD001",
    type: "reference_image",
    industryKey: "cong_ty_xay_dung",
    name: "Website xây dựng XD001",
    description: "Mẫu website xây dựng dạng ảnh dài, phù hợp công ty thi công, cảnh quan hoặc nhà thầu.",
    tags: ["Xây dựng", "Ảnh dài", "Công trình"],
    thumbnail: "/assets/anh-template/xay-dung/XD001.webp",
    longPreviewImage: "/assets/anh-template/xay-dung/XD001.webp",
    packageName: "Gói website xây dựng",
    priceLabel: "Liên hệ",
    status: "active",
    order: 1001
  },
  {
    id: "XD002",
    type: "reference_image",
    industryKey: "cong_ty_xay_dung",
    name: "Website xây dựng XD002",
    description: "Mẫu thiết kế website xây dựng nhấn mạnh giới thiệu công ty, dịch vụ và dự án tiêu biểu.",
    tags: ["Xây dựng", "Ảnh dài", "Giới thiệu công ty"],
    thumbnail: "/assets/anh-template/xay-dung/XD002.jpg",
    longPreviewImage: "/assets/anh-template/xay-dung/XD002.jpg",
    packageName: "Gói website xây dựng",
    priceLabel: "5.700.000",
    status: "active",
    order: 1002
  },
  {
    id: "XD003",
    type: "reference_image",
    industryKey: "cong_ty_xay_dung",
    name: "Website xây dựng XD003",
    description: "Mẫu ảnh dài cho lĩnh vực xây dựng/cảnh quan, có nhiều khu vực dịch vụ và công trình.",
    tags: ["Xây dựng", "Ảnh dài", "Cảnh quan"],
    thumbnail: "/assets/anh-template/xay-dung/XD003.jpg",
    longPreviewImage: "/assets/anh-template/xay-dung/XD003.jpg",
    packageName: "Gói website xây dựng",
    priceLabel: "Liên hệ",
    status: "active",
    order: 1003
  },
  {
    id: "XD004",
    type: "reference_image",
    industryKey: "cong_ty_xay_dung",
    name: "Website xây dựng XD004",
    description: "Mẫu website tham khảo cho công ty xây dựng cần trình bày sản phẩm, dịch vụ và tư vấn.",
    tags: ["Xây dựng", "Ảnh dài", "Dịch vụ"],
    thumbnail: "/assets/anh-template/xay-dung/XD004.webp",
    longPreviewImage: "/assets/anh-template/xay-dung/XD004.webp",
    packageName: "Gói website xây dựng",
    priceLabel: "Liên hệ",
    status: "active",
    order: 1004
  },
  {
    id: "XD005",
    type: "reference_image",
    industryKey: "cong_ty_xay_dung",
    name: "Website xây dựng XD005",
    description: "Mẫu ảnh dài cho doanh nghiệp xây dựng muốn có bố cục nhiều nội dung và hình ảnh.",
    tags: ["Xây dựng", "Ảnh dài", "Doanh nghiệp"],
    thumbnail: "/assets/anh-template/xay-dung/XD005.webp",
    longPreviewImage: "/assets/anh-template/xay-dung/XD005.webp",
    packageName: "Gói website xây dựng",
    priceLabel: "Liên hệ",
    status: "active",
    order: 1005
  },
  {
    id: "NH001",
    type: "reference_image",
    industryKey: "nha_hang",
    name: "Website nhà hàng NH001",
    description: "Mẫu website nhà hàng dạng ảnh dài, phù hợp giới thiệu không gian, thực đơn và đặt bàn.",
    tags: ["Nhà hàng", "Ảnh dài", "Đặt bàn"],
    thumbnail: "/assets/anh-template/nha-hang/NH001.jpg",
    longPreviewImage: "/assets/anh-template/nha-hang/NH001.jpg",
    packageName: "Gói website nhà hàng",
    priceLabel: "Liên hệ",
    status: "active",
    order: 1101
  }
];

export const templateCatalog: TemplateCatalogItem[] = [...renderTemplateItems, ...referenceTemplateItems].sort(
  (a, b) => a.order - b.order
);

export function getIndustryByKey(industryKey: string) {
  return industryCatalog.find((industry) => industry.key === industryKey);
}

export function getTemplatesByIndustry(industryKey: string) {
  return templateCatalog
    .filter((template) => template.industryKey === industryKey)
    .sort((a, b) => a.order - b.order);
}

export function getTemplateCatalogItem(industryKey: string, templateId: string) {
  return templateCatalog.find(
    (template) => template.industryKey === industryKey && template.id === templateId
  );
}
