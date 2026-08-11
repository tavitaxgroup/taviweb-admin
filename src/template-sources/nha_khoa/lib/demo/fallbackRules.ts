import { ActionButton } from '../../types/demo';
import { DENTAL_FALLBACK_IMAGES } from './templateDefaults';

export function resolvePhoneAction(phone?: string, MessageCircle?: string, email?: string): ActionButton {
  if (phone && phone.trim()) {
    return {
      label: "Gọi ngay",
      href: `tel:${phone.replace(/\s+/g, '')}`,
      type: 'tel'
    };
  }
  
  if (MessageCircle && MessageCircle.trim()) {
    const cleanFb = MessageCircle.startsWith('http') ? MessageCircle : `https://${MessageCircle}`;
    return {
      label: "Nhắn MessageCircle",
      href: cleanFb,
      type: 'link'
    };
  }
  
  if (email && email.trim()) {
    return {
      label: "Gửi Email",
      href: `mailto:${email}`,
      type: 'link'
    };
  }

  return {
    label: "Xem bản đồ",
    href: "#contact",
    type: 'link'
  };
}

export function resolveMapAction(address?: string): ActionButton {
  if (address && address.trim()) {
    const query = encodeURIComponent(address);
    return {
      label: "Xem bản đồ",
      href: `https://www.google.com/maps/search/?api=1&query=${query}`,
      type: 'secondary'
    };
  }

  return {
    label: "Xem địa chỉ",
    href: "#contact",
    type: 'secondary'
  };
}

export function getFallbackImage(key: 'hero' | 'gallery1' | 'gallery2' | 'gallery3'): string {
  return DENTAL_FALLBACK_IMAGES[key];
}
