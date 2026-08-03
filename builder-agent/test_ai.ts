import { ingestKnowledge, searchKnowledge } from './src/lib/ai/ingestion';
import { config } from 'dotenv';
config({ path: '.env.local' });

(async () => {
  try {
    const tenantId = '6064025b-7fe4-4840-a27f-2d5da65e15fa'; // tavi-admin tenant
    console.log('Testing Ingestion...');
    const ingestRes = await ingestKnowledge(
      tenantId, 
      'TaviWeb là nền tảng SaaS Multi-tenant cung cấp giải pháp quản trị doanh nghiệp toàn diện. Các tính năng bao gồm CRM, Booking, AI, LMS.',
      'custom'
    );
    console.log('Ingestion Result:', ingestRes);

    console.log('Testing Search...');
    const searchRes = await searchKnowledge(tenantId, 'TaviWeb có tính năng gì?', 2);
    console.log('Search Result:', searchRes);
  } catch(e) {
    console.error('Error during test:', e);
  }
})();
