import { DemoPageData } from '../../types/demo';

export function applyFallbackRules(data: DemoPageData): DemoPageData {
  const fallbackImage = 'https://lh3.googleusercontent.com/aida-public/AB6AXuC-lOaoYrWiIIUsnPWFobKFXlgHQZe4TSf9GE5Bpu_jSMszWWef_d7Iv6tvCJT_xd4u_eJjifMFHHkKH0yx_qmE3p55o4ekRoGFn7WN1WmKODlFcoCzO-4gHuNds2JfKr5sxOE8Fe2qtqM0PfhJubOJPhWyfZeKoiSI2bXZpyP-Bv_INYkrWidwH_QyGA5n3O8BQ0bGXmPl-YQdNrc56dW0EKwzWjWJFHxRT8oS7vpYFetvDf5OHskYtw';

  const updated = { ...data };

  if (!updated.hero.image || !updated.hero.image.src) {
    updated.hero.image = {
      src: fallbackImage,
      alt: updated.business.name
    };
  }

  if (!updated.business.phone) {
    updated.hero.primaryAction = {
      label: 'Xem Bản Đồ & Địa Chỉ',
      href: '#contact'
    };
  }

  if (!updated.services || updated.services.length === 0) {
    updated.services = [
      { id: 'fb-1', title: 'Khám Tổng Quát', description: 'Kiểm tra sức khỏe tổng quát định kỳ.', icon: 'clinical_notes' }
    ];
  }

  return updated;
}
