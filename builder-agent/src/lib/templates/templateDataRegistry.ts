import { DemoPageData } from "@/types/demo";

// Static imports for data builders (these are just pure TS functions, no React components, so bundle size impact is minimal)
import { buildDemoPageData as buildNhaKhoa } from "@/template-sources/nha_khoa/lib/demo/buildDemoPageData";
import { buildDemoPageData as buildSpa } from "@/template-sources/spa/lib/demo/buildDemoPageData";
import { buildDemoPageData as buildThamMyVien } from "@/template-sources/tham_my_vien/lib/demo/buildDemoPageData";
import { buildDemoPageData as buildPhongKham } from "@/template-sources/phong_kham/lib/demo/buildDemoPageData";
import { buildDemoPageData as buildSalonToc } from "@/template-sources/salon_toc/lib/demo/buildDemoPageData";
import { buildDemoPageData as buildLuatSu } from "@/template-sources/luat_su/lib/demo/buildDemoPageData";
import { buildDemoPageData as buildTrungTamTiengAnh } from "@/template-sources/trung_tam_tieng_anh/lib/demo/buildDemoPageData";
import { buildDemoPageData as buildDichVuVeSinh } from "@/template-sources/dich_vu_ve_sinh/lib/demo/buildDemoPageData";
import { buildDemoPageData as buildNoiThat } from "@/template-sources/noi_that/lib/demo/buildDemoPageData";
import { buildDemoPageData as buildCongTyXayDung } from "@/template-sources/cong_ty_xay_dung/lib/demo/buildDemoPageData";
import { buildDemoPageData as buildNhaHang } from "@/template-sources/nha_hang/lib/demo/buildDemoPageData";
import { buildDemoPageData as buildQuanCafe } from "@/template-sources/quan_cafe/lib/demo/buildDemoPageData";
import { buildDemoPageData as buildStudioChupAnh } from "@/template-sources/studio_chup_anh/lib/demo/buildDemoPageData";
import { buildDemoPageData as buildPhongGym } from "@/template-sources/phong_gym/lib/demo/buildDemoPageData";
import { buildDemoPageData as buildGarageOto } from "@/template-sources/garage_oto/lib/demo/buildDemoPageData";

export type BuildDemoDataFunction = (placeId: string, partialData?: Partial<DemoPageData>) => DemoPageData;

// Helper to deep merge partial data into the generated demo data
function mergeData(base: DemoPageData, partial?: Partial<DemoPageData>): DemoPageData {
  if (!partial) return base;
  return {
    ...base,
    ...partial,
    business: {
      ...base.business,
      ...(partial.business || {})
    },
    seo: {
      ...base.seo,
      ...(partial.seo || {})
    },
    hero: {
      ...base.hero,
      ...(partial.hero || {})
    },
    about: {
      ...base.about,
      ...(partial.about || {})
    },
    trust: {
      ...base.trust,
      ...(partial.trust || {})
    },
    contact: {
      ...base.contact,
      ...(partial.contact || {})
    },
    template: {
      ...base.template,
      ...(partial.template || {})
    }
  };
}

const dataBuilders: Record<string, BuildDemoDataFunction> = {
  nha_khoa: (id, partial) => mergeData(buildNhaKhoa({ placeId: id, name: partial?.business?.name || "Nha Khoa", address: partial?.business?.address, phone: partial?.business?.phone } as any) as any, partial),
  spa: (id, partial) => mergeData(buildSpa({ placeId: id, name: partial?.business?.name || "Spa", address: partial?.business?.address, phone: partial?.business?.phone } as any) as any, partial),
  tham_my_vien: (id, partial) => mergeData(buildThamMyVien(id) as any, partial),
  phong_kham: (id, partial) => mergeData(buildPhongKham(id) as any, partial),
  salon_toc: (id, partial) => mergeData(buildSalonToc(id) as any, partial),
  luat_su: (id, partial) => mergeData(buildLuatSu({ placeId: id, name: partial?.business?.name || "Luật Sư" } as any) as any, partial),
  trung_tam_tieng_anh: (id, partial) => mergeData(buildTrungTamTiengAnh({ placeId: id, name: partial?.business?.name || "Trung Tâm Tiếng Anh" } as any) as any, partial),
  dich_vu_ve_sinh: (id, partial) => mergeData(buildDichVuVeSinh(id) as any, partial),
  noi_that: (id, partial) => mergeData(buildNoiThat(id, partial as any) as any, partial),
  cong_ty_xay_dung: (id, partial) => mergeData(buildCongTyXayDung({ placeId: id, name: partial?.business?.name || "Công Ty Xây Dựng" } as any) as any, partial),
  nha_hang: (id, partial) => mergeData(buildNhaHang(id) as any, partial),
  quan_cafe: (id, partial) => mergeData(buildQuanCafe(id, partial as any) as any, partial),
  studio_chup_anh: (id, partial) => mergeData(buildStudioChupAnh({ placeId: id, name: partial?.business?.name || "Studio" } as any) as any, partial),
  phong_gym: (id, partial) => mergeData(buildPhongGym((partial as any) || {}) as any, partial),
  garage_oto: (id, partial) => mergeData(buildGarageOto(id) as any, partial),
};

export function getTemplateDataBuilder(templateKey: string): BuildDemoDataFunction | null {
  return dataBuilders[templateKey] || null;
}
