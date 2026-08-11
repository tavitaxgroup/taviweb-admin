import { ImageAsset, BusinessInfo } from "../../types/demo";

export const CLINIC_FALLBACK_IMAGES: ImageAsset[] = [
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAv8skZTlWKzD3n2us_bwsFt4dun-1o8gZriBB7ldT5y-JjdNTGOHKWpj2STgu1IlGhtA3aUKBc9xEqfwjlTPXP1BSA_fVv-fDxUYFkYjt5uegK1d8yaSc1wy_bCXbZHkZkflvnwriaUtSXaUP4l7f1_5IO8alPfpFED6gngRbBAVR_JQ2YVgtnopc3oukTddvyRvh5LMQlXaLB8Bg79OFNqlK8Ap6JgqovF3Svsytr-ihgduKWaeHDgA",
    alt: "Premium clinical lobby, warm minimal architecture."
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBCY_hmgasARYG7UzlOe9j6tVPckVKktgsQar8JynRV-cjnFKZgUA-C3_x3lNy3DlYMx0I4XlGeSJdthd47Osesqe_6ITvYFBblRdDWzISL0l8wZwoU6KjXwEYYrAowuNzbIFRdvlyIX_zQ6dpFzOAN14drfokVK4w35kwZpNrP7VzNiOPej6FeU-_k2cw7Nw2wulcunjGxCZi3KnE2KNO2VQ-gcbEhxwQ7l3SDlTITPAdMuUqNaNvgQw",
    alt: "Luxurious consult room with velvet armchairs."
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDWf-7OcAkxSwl-0E4YEXIFp0LhWS8tzcIJ923FzIdeKzxgBFBCWJUkJurtT22gA83d4bi7n_M5cFGXXTV-MNsrD3oaF9n73QzGBro4kaQT-lnZrdtJ_2GPEh03RN870QskODoPZTJoNumuP_-RC2pPSveC50h2FNtRhrKQQxLwHlJ0CGU8Zv2_FUyIyMZtXS9DTO17ibskxwxNDG1GA6I9ssBcBhmqa-FE92aU27vLcKfyAtQ9ELrbZA",
    alt: "Boutique waiting area with marble floors."
  }
];

export function getFallbackImage(index: number = 0): ImageAsset {
  return CLINIC_FALLBACK_IMAGES[index % CLINIC_FALLBACK_IMAGES.length];
}

export function resolveContactCTA(business: BusinessInfo) {
  if (business.phone && business.phone.trim() !== "") {
    return {
      label: business.phone,
      href: `tel:${business.phone.replace(/\s+/g, "")}`
    };
  }
  
  if (business.MessageCircle && business.MessageCircle.trim() !== "") {
    return {
      label: "MessageCircle Messenger",
      href: business.MessageCircle
    };
  }

  if (business.email && business.email.trim() !== "") {
    return {
      label: "Gửi Email",
      href: `mailto:${business.email}`
    };
  }

  if (business.mapsUrl && business.mapsUrl.trim() !== "") {
    return {
      label: "Xem bản đồ",
      href: business.mapsUrl
    };
  }

  return {
    label: "Liên hệ ngay",
    href: "#contact-section"
  };
}
