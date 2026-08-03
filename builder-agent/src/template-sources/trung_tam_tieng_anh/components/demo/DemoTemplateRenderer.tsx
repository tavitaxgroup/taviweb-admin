import React from 'react';
import { DemoPageData } from '../../types/demo';
import { EnglishCenterTemplate } from './templates/EnglishCenterTemplate';

export default function DemoTemplateRenderer({ data }: { data: any }) {
  let buildDemoPageData;
  try {
    buildDemoPageData = require('../../lib/demo/buildDemoPageData').buildDemoPageData;
  } catch(e) {
    console.error("No local buildDemoPageData found", e);
  }

  let specificData = data;
  if (buildDemoPageData) {
    const placeId = data?.business?.placeId || '';
    let baseData;
    
    try {
      baseData = buildDemoPageData(placeId);
    } catch(e1) {
      try {
        baseData = buildDemoPageData({ placeId: placeId, name: data?.business?.name });
      } catch(e2) {
        baseData = data;
      }
    }
    
    if (baseData) {
      specificData = {
        ...baseData,
        business: {
          ...(baseData.business || {}),
          name: data?.business?.name || baseData.business?.name,
          phone: data?.contact?.phone || data?.business?.phone || baseData.business?.phone,
          address: data?.contact?.address || data?.business?.address || baseData.business?.address,
          email: data?.contact?.email || data?.business?.email || baseData.business?.email,
        },
        hero: {
          ...(baseData.hero || {}),
          title: data?.business?.name ? `Chào mừng đến với ${data.business.name}` : baseData.hero?.title,
        }
      };

      if (specificData.contact) {
        if ('address' in specificData.contact) specificData.contact.address = data?.contact?.address || specificData.contact.address;
        if ('addressValue' in specificData.contact) specificData.contact.addressValue = data?.contact?.address || specificData.contact.addressValue;
        if ('phone' in specificData.contact) specificData.contact.phone = data?.contact?.phone || specificData.contact.phone;
        if ('phoneValue' in specificData.contact) specificData.contact.phoneValue = data?.contact?.phone || specificData.contact.phoneValue;
        if ('email' in specificData.contact) specificData.contact.email = data?.contact?.email || specificData.contact.email;
        if ('emailValue' in specificData.contact) specificData.contact.emailValue = data?.contact?.email || specificData.contact.emailValue;
      }
    }
  }

  return <EnglishCenterTemplate data={specificData} />;
}
