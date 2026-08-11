import { DemoPageData } from "../../types/demo";

export const FALLBACK_IMAGES = {
  constructionSite: "https://lh3.googleusercontent.com/aida-public/AB6AXuCqftVVw_jqo46U09TMbChdxQK49zg4PnSDS5BxGkekasGfotRdPiDG66heqEKGtMiJjEAPQvjDxkkxJ1m9skTPLYZR-hK_0mqBGcx4p2QAZ4YD5g5Dh10nFY4MXN8R5Y5xP7trtKtIxLy2V5nG6gEfz4Zkao5XEX-Rzixh5B40Cw3kf63Sc6SINcsC7KXUdbrl7ZNFh3ipoX7IGzH3rmZZMKebJskIx3slTgNq-4yS0GwTNgj_55aZ2w",
  modernHouse: "https://lh3.googleusercontent.com/aida-public/AB6AXuCzzXWoAp5LZN4sugqCdHWncVfNDyr4Vil76z-Q1RKTGk-lt0GoKzbeSjMzHicQb_sApwnuAwSuVwEM92Q2A87BIZEintBCBE1YiWQi2_p7MRPVzU95hzof9oyDwGec22MAnOWGNo-wdBuZ8hzGsXdCiS6bc2zdjPMcfdoF7UsMyXdpFr0xktNJgEQ3uUCf7Hooi_z01xKbQ400gBUMChBPb1ipEw0-3QuSdh8ryVX6nchvmT6l53DdFg",
  renovation: "https://lh3.googleusercontent.com/aida-public/AB6AXuAeNwACDuEwK2rB4tR60Zj2YClWhlOBCFHbJAVQc2y8uRZDnutCT4ilfLuEE1hzXUlRTrbQkoUUDkjTlvRsOL5W-ISu6ZgFB9C37umbz7fH6072iS6vW9ghek5MdwxYvt9V2ddQDyvDsYeTKmcKqUt3L5mzegSUk3rnvs0BQmWGt6X5G_-0xYL0Zl2ZBS5WZziqSlfm0ThWKWa7n_x0LplA-70dDh5PIM09iKxX3pYcm4G1-6Kbj9hPEQ",
};

export function validateAndApplyFallbackRules(data: DemoPageData): DemoPageData {
  const result = { ...data };

  // 1. If hero image is missing or invalid, use construction site fallback
  if (!result.hero.image.src) {
    result.hero.image = {
      src: FALLBACK_IMAGES.constructionSite,
      alt: "Công trình xây dựng chất lượng cao"
    };
  }

  // 2. Ensure all services have safe fallback images
  result.services = result.services.map(srv => {
    if (!srv.image.src) {
      return {
        ...srv,
        image: {
          src: FALLBACK_IMAGES.modernHouse,
          alt: srv.title
        }
      };
    }
    return srv;
  });

  return result;
}
