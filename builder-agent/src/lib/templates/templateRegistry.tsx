import dynamic from 'next/dynamic';
import React from 'react';

// Using dynamic imports to keep the main bundle small
const templates: Record<string, React.ComponentType<any>> = {
  nha_khoa: dynamic(() => import('@/template-sources/nha_khoa/components/demo/DemoTemplateRenderer').catch(() => {
    return function Fallback() { return <div className="p-8 text-center">Template "nha_khoa" đang được cập nhật.</div> };
  }), { ssr: true }),
  
  spa: dynamic(() => import('@/template-sources/spa/components/demo/DemoTemplateRenderer').catch(() => {
    return function Fallback() { return <div className="p-8 text-center">Template "spa" đang được cập nhật.</div> };
  }), { ssr: true }),

  tham_my_vien: dynamic(() => import('@/template-sources/tham_my_vien/components/demo/DemoTemplateRenderer').catch(() => {
    return function Fallback() { return <div className="p-8 text-center">Template "tham_my_vien" đang được cập nhật.</div> };
  }), { ssr: true }),

  phong_kham: dynamic(() => import('@/template-sources/phong_kham/components/demo/DemoTemplateRenderer').catch(() => {
    return function Fallback() { return <div className="p-8 text-center">Template "phong_kham" đang được cập nhật.</div> };
  }), { ssr: true }),

  salon_toc: dynamic(() => import('@/template-sources/salon_toc/components/demo/DemoTemplateRenderer').catch(() => {
    return function Fallback() { return <div className="p-8 text-center">Template "salon_toc" đang được cập nhật.</div> };
  }), { ssr: true }),

  luat_su: dynamic(() => import('@/template-sources/luat_su/components/demo/DemoTemplateRenderer').catch(() => {
    return function Fallback() { return <div className="p-8 text-center">Template "luat_su" đang được cập nhật.</div> };
  }), { ssr: true }),

  trung_tam_tieng_anh: dynamic(() => import('@/template-sources/trung_tam_tieng_anh/components/demo/DemoTemplateRenderer').catch(() => {
    return function Fallback() { return <div className="p-8 text-center">Template "trung_tam_tieng_anh" đang được cập nhật.</div> };
  }), { ssr: true }),

  dich_vu_ve_sinh: dynamic(() => import('@/template-sources/dich_vu_ve_sinh/components/demo/DemoTemplateRenderer').catch(() => {
    return function Fallback() { return <div className="p-8 text-center">Template "dich_vu_ve_sinh" đang được cập nhật.</div> };
  }), { ssr: true }),

  noi_that: dynamic(() => import('@/template-sources/noi_that/components/demo/DemoTemplateRenderer').catch(() => {
    return function Fallback() { return <div className="p-8 text-center">Template "noi_that" đang được cập nhật.</div> };
  }), { ssr: true }),

  cong_ty_xay_dung: dynamic(() => import('@/template-sources/cong_ty_xay_dung/components/demo/DemoTemplateRenderer').catch(() => {
    return function Fallback() { return <div className="p-8 text-center">Template "cong_ty_xay_dung" đang được cập nhật.</div> };
  }), { ssr: true }),

  nha_hang: dynamic(() => import('@/template-sources/nha_hang/components/demo/DemoTemplateRenderer').catch(() => {
    return function Fallback() { return <div className="p-8 text-center">Template "nha_hang" đang được cập nhật.</div> };
  }), { ssr: true }),

  quan_cafe: dynamic(() => import('@/template-sources/quan_cafe/components/demo/DemoTemplateRenderer').catch(() => {
    return function Fallback() { return <div className="p-8 text-center">Template "quan_cafe" đang được cập nhật.</div> };
  }), { ssr: true }),

  studio_chup_anh: dynamic(() => import('@/template-sources/studio_chup_anh/components/demo/DemoTemplateRenderer').catch(() => {
    return function Fallback() { return <div className="p-8 text-center">Template "studio_chup_anh" đang được cập nhật.</div> };
  }), { ssr: true }),

  phong_gym: dynamic(() => import('@/template-sources/phong_gym/components/demo/DemoTemplateRenderer').catch(() => {
    return function Fallback() { return <div className="p-8 text-center">Template "phong_gym" đang được cập nhật.</div> };
  }), { ssr: true }),

  garage_oto: dynamic(() => import('@/template-sources/garage_oto/components/demo/DemoTemplateRenderer').catch(() => {
    return function Fallback() { return <div className="p-8 text-center">Template "garage_oto" đang được cập nhật.</div> };
  }), { ssr: true }),
};

export function getTemplateComponent(templateKey: string): React.ComponentType<any> | null {
  return templates[templateKey] || null;
}
