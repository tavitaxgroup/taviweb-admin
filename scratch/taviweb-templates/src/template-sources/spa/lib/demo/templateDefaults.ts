import { ServiceItem, GalleryItem, ReviewItem } from "../../types/demo";

export const FALLBACK_SPA_SERVICES: ServiceItem[] = [
  {
    id: "fb-s1",
    name: "Chăm sóc da mặt cơ bản",
    category: "Skin Health",
    description: "Liệu trình làm sạch và cấp ẩm sâu cho da khỏe mạnh tươi trẻ.",
    image: {
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBFfT5jeo_GjyxtzLKqYLTZn8zE3W6icTSV2kk-JqdiMcQHDFf0pJHEnNhdmkYchOT64MUTxAOrUjskRViFtKSQQsmjUeAcHI9uOlwX9ozE6wfd27Z2QV8cnQjAf0e-Z4kBnHrsFB6xMy0NhSZf7wiFrA2fXyJVXBiLbkdMOmfd-eG09D3vkcaaRBvfNbd5kQqc2drTu5pa_-nFgtg6IKLbvETPW5zZTo8k0la1F1lRR5spHt0rwRfq",
      alt: "Skincare fallback"
    }
  },
  {
    id: "fb-s2",
    name: "Massage bấm huyệt Thụy Điển",
    category: "Relaxation",
    description: "Giúp giải tỏa căng cơ, tăng cường tuần hoàn máu và đem lại cảm giác sảng khoái.",
    image: {
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCOyWQmXimX_y2pJcdybD5RIefw5YYeXdQyrwpbIVIZhSvX_b3Uf_MDQg_oMKid9v1hF2Nt7cwy6e9MJ2g2j0OygFaNSvbqtqmEujFy6cSxAJWQVESszPm-pCGJCz5Xm020egJeF-Vq1_bI0xgn_ZgNiBWnnqLtX-J3WhLviYhe61BrS0AeQmAGG2cbBU96n4B2no_bd81d3oBEchtrw4kgW9Ys8WEawtY8_yAlFCWv40ytQTMgA7M0",
      alt: "Massage fallback"
    }
  }
];

export const FALLBACK_SPA_GALLERY: GalleryItem[] = [
  {
    id: "fb-g1",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDSmJKqj4-UJJdCKfDm-dmE8NS0ajfCi8Nw9S1ksQQQlQEgyg11TTDTG4vnYLTgNwUTDopc3-jPwJMrgAi3WbpqHpWVEYDtsu966KEse_hEOrR_RHIabnTxa9ljCZpRdYFyXKKL_sS2wtYcJJSHmE1-EZ62wsDZ96kcl-RfjA0pVBCxKAOyU0M5Y8Wh8wV1Qn8jyAv14R3mvc_vHLBhFaqEzZCzjmAH_9ZFjFy0ZJouodW9H8NRBmTs",
    alt: "Beautiful lobby",
    colSpan: 2,
    rowSpan: 2
  },
  {
    id: "fb-g2",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuA8JUxJD--RMbl3RZfK2kR0xO81v2wUrteeSkUerSeHyFO0B5WXSaA8_UbNFt2omyucShEUkENLVDJzZ8r0eJw77R0XtZk4Zzyoa8_OLvRRIX_iMQRVT-7tWO4I2JSLZmohuSH3jvGrOEfSPep-tmDCkJB22AvSau3OknA7Hj8REpluL8IQQCI_Eh8-DsJKxzE3q6Axm1epDQcq3DMzt5HK1YZ8MwhDwQk4AgxbVdA_xj___DrQMFpV",
    alt: "Wellness oil",
    colSpan: 1,
    rowSpan: 1
  }
];

export const FALLBACK_SPA_REVIEWS: ReviewItem[] = [
  {
    id: "fb-r1",
    rating: 5,
    text: "Không gian trang nhã, phục vụ tận tình và chu đáo cực kỳ. Rất đáng trải nghiệm!",
    author: "Khánh Linh",
    role: "Khách hàng mới"
  }
];
