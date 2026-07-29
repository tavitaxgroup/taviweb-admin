import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    // Next.js 15 requires params to be awaited
    const { id: dealId } = await params;
    
    if (!dealId) {
      return NextResponse.json({ error: 'Missing deal ID' }, { status: 400 });
    }

    // 1. Fetch deal data and activities to feed to AI
    const { data: deal } = await supabase
      .from('crm_deals')
      .select('*, contact:crm_contacts(*)')
      .eq('id', dealId)
      .single();

    if (!deal) {
      return NextResponse.json({ error: 'Deal not found' }, { status: 404 });
    }

    const { data: activities } = await supabase
      .from('crm_activities')
      .select('*')
      .eq('deal_id', dealId)
      .order('created_at', { ascending: false });

    // 2. MOCK AI GENERATION (Here we would normally call OpenAI/Gemini API)
    // We will generate a smart-looking summary based on what we see in the deal.
    
    // Simulate AI thinking time
    await new Promise(resolve => setTimeout(resolve, 1500));

    const activityCount = activities?.length || 0;
    const hasBooking = activities?.some(a => a.content.toLowerCase().includes('booking') || a.content.toLowerCase().includes('đặt lịch'));
    const isNew = activityCount === 0;

    let summaryText = '';
    let nextSteps = [];

    if (isNew) {
      summaryText = `Khách hàng tiềm năng mới (**${deal.contact?.name || 'Chưa rõ tên'}**) chưa có lịch sử tương tác. Deal trị giá **${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(deal.value || 0)}**.`;
      nextSteps = [
        "Gọi điện thoại lần 1 để chào hỏi và tìm hiểu nhu cầu.",
        "Gửi email giới thiệu profile công ty."
      ];
    } else if (hasBooking) {
      summaryText = `Khách hàng **${deal.contact?.name || ''}** đã đặt lịch hẹn qua hệ thống. Dựa trên lịch sử, khách có vẻ quan tâm đến dịch vụ giá trị cao (**${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(deal.value)}**).`;
      nextSteps = [
        "Nhắc lịch hẹn trước 1 ngày qua Zalo/SMS.",
        "Chuẩn bị tài liệu tư vấn nâng cao (upsell) khi khách đến."
      ];
    } else {
      summaryText = `Đã có **${activityCount}** lần tương tác với khách hàng **${deal.contact?.name || ''}**. Gần đây nhất là: "${activities?.[0]?.content.substring(0, 50)}...". Khách hàng đang trong giai đoạn cân nhắc.`;
      nextSteps = [
        "Follow-up lại để xác nhận quyết định.",
        "Đề xuất một ưu đãi nhỏ để chốt deal nhanh hơn."
      ];
    }

    return NextResponse.json({
      summary: summaryText,
      next_steps: nextSteps,
      confidence_score: Math.floor(Math.random() * (95 - 60 + 1) + 60), // Random 60-95%
    });

  } catch (error: any) {
    console.error('AI Summary Error:', error);
    return NextResponse.json({ error: error.message || 'Internal error' }, { status: 500 });
  }
}
