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

export const templateCatalog: TemplateCatalogItem[] = [...renderTemplateItems].sort(
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
