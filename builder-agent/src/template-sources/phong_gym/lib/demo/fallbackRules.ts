import { DemoPageData, ImageAsset } from "../../types/demo";

export const FALLBACK_IMAGES = {
  hero: "https://lh3.googleusercontent.com/aida-public/AB6AXuAX3Mco8GjruAVp3M1lxCqhQiQNGYJSVLhE0NuolXExx0kfJ6EHnAktwOFg2-9Ym60YMtIrp_gzCMoNYsOQj6tBPsmco2q1VlHb0nm7ClJUbTb_jwRe8g84Be9I15fqqKRlJlaua-zU_2qij7shTqhhYvInvyzjx8l8eCYwvQkJPczD7sSuTzvuHiUJPn70Ws2S6PGKm9J-wyDRd7USBv6SH83VcwMuqKG5cZLxYxcm_lnDShlBcIBT",
  about: "https://lh3.googleusercontent.com/aida-public/AB6AXuCvLI72G4FB1TGVTyFRks7ue5MIystaRtDvhEU396k_RZiYlRd3Qg-VxcLTpTt5fZqe_w7CuCoOZ2MOwtPWaiLZv_BCzfZOg-E8z8YJlR4Fop3IkXYAsKIQfIzQuOA9IBuCw-hlpyQrUlWeppmE0_bvvTEvFIZgWfOmyD8-1FCyP1rMEomXa2ebpBS44JYvGMJMwyxGIHemmi6laOy1UDPahKXUsRY0bzwqDIbk637JqRSI3mylEB-v",
  gallery: [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCtWCkMojdAE3q_oYj_8b9kF9fn0Loj5K6sn6XoIonZJUO_RujaahxiNL6cOOc9P31fd5klSkgBbWgS2tOKp5QvE2550UT-6tFnkGmBcd5h5a4YzRwYQ6bxypf-e43l4b9mdJKQ0YZS-d9OOJC_JOIgYVIc24SFkzOuPy-ATsPGXGbuQasR0cYje_SPGj4Lo8zomNqqRyGBbVGliMCKFQg7LsjExwY2HFvtBxhR8WLwV8iBz2ueJLCx",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuClB85FSSX6TOYvpdF7V8Mr1TnQdVoMzF1drQFLPpTOtHqeIFwRGDg5jUpUDa5YtWIeZD_M_O9-MbXUcEAGk_UM3Vf2c6eR82B-uHT8oJcxmUiKYNxRNaseCO0IinyWtgPNhVQ3yBcAdBe8SUdkr4xpRghJ2rHOmHY5jcQY8u5rl1YWUAFASCrDVMVHzKPpEu7-5RKWmr7m-bBIPACW2yGemW0kvumZbSP5pNz4qEhktvb_V-GKC9Cl",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBoCIAQm-3d_TCUjN3g-GRQMrgmuIb00hV6w3imRPWND2zpzWNzmZRmCaOugy1o-RhuV5iQtOWEzmEMOU6-S6rTl1lyRgQuQXyZH4WrnELzP37Ewc__5Rb_FlJ2gjkhnfx_-_XVgCAD4uO9r-wJDpwXngXl1ZT9Jo_POwHTaUlnU_A5Ny0UAo5FdVUvzulrGiJGO4rCbmxdRMAoc3Kly-kBLqQfMFvxYzkcpcr9AESEToS11UY8JMZS",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBgkwuRTV4-ZmO-wtXMVXIhWOG-N2hk6LW3tEkA4C9zao8z5PiMUWTpQfSLrTaebulJ-zotOSyuwH0en0HcStyk82hGi4OnDTlb1EijK65PSVmWx8WvMwpENzD9ZYk8PLrY1V-YwnbR4QV_RQeYrwG7g31BeKxAYd8gI31fVMJCd6tJkPdfzuC4SKTg2O66oPJMPe0FOYKYLC-n4WsdDvo1KZ3AZo_9lKxSx1zZQdR3mTPcFnSLdLPA"
  ]
};

export function applyFallbackRules(data: Partial<DemoPageData>): DemoPageData {
  const merged = JSON.parse(JSON.stringify(data)) as DemoPageData;

  // Handle missing business info
  if (!merged.business) {
    merged.business = {
      name: "ELITE STRENGTH GYM",
      workingHours: "Mở cửa 24/7"
    };
  }

  // Handle missing image fallbacks
  if (!merged.hero) merged.hero = {} as any;
  if (!merged.hero.image || !merged.hero.image.src) {
    merged.hero.image = {
      src: FALLBACK_IMAGES.hero,
      alt: "Elite Strength Gym dynamic zone"
    };
  }

  if (!merged.about) merged.about = {} as any;
  if (!merged.about.image || !merged.about.image.src) {
    merged.about.image = {
      src: FALLBACK_IMAGES.about,
      alt: "Kỷ luật tạo nên sức mạnh"
    };
  }

  // Handle gallery fallbacks
  if (!merged.gallery || merged.gallery.length === 0) {
    merged.gallery = FALLBACK_IMAGES.gallery.map((src, index) => ({
      id: `fallback-gal-${index}`,
      image: { src, alt: `Elite space preview ${index + 1}` }
    }));
  } else {
    // Fill up if there are less than 4 images
    merged.gallery.forEach((item, index) => {
      if (!item.image || !item.image.src) {
        item.image = {
          src: FALLBACK_IMAGES.gallery[index % FALLBACK_IMAGES.gallery.length],
          alt: `Elite fitness zone ${index + 1}`
        };
      }
    });
  }

  // Handle phone fallback for CTAs
  if (!merged.business.phone) {
    // If phone is missing, update CTAs to link to map or Facebook
    if (merged.contact && merged.contact.phoneAction) {
      if (merged.business.MessageCircle) {
        merged.contact.phoneAction = {
          label: "Facebook",
          phone: merged.business.MessageCircle
        };
      } else if (merged.business.email) {
        merged.contact.phoneAction = {
          label: "Email tư vấn",
          phone: `mailto:${merged.business.email}`
        };
      } else {
        // Remove or hide
        delete merged.contact.phoneAction;
      }
    }
  }

  return merged;
}
