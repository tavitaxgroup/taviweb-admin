import { NextResponse } from 'next/server';
import { generateText } from 'ai';
import { google } from '@ai-sdk/google';

export async function POST(req: Request) {
  try {
    const { topic, tone, keywords } = await req.json();

    if (!topic) {
      return NextResponse.json({ error: 'Topic is required' }, { status: 400 });
    }

    const systemPrompt = `
      Bạn là một chuyên gia Content SEO xuất sắc. Nhiệm vụ của bạn là viết một bài blog chuẩn SEO chuyên nghiệp.
      Yêu cầu bài viết:
      - Chủ đề: ${topic}
      - Giọng văn: ${tone || 'Chuyên nghiệp, cung cấp thông tin hữu ích'}
      - Từ khóa bắt buộc (nếu có): ${keywords || 'Không có'}
      - Định dạng đầu ra: HTML thuần (sử dụng các thẻ <h1>, <h2>, <h3>, <p>, <ul>, <li>, <strong>).
      - KHÔNG SỬ DỤNG markdown, chỉ trả về code HTML. KHÔNG có thẻ <html> hay <body>, chỉ trả về phần ruột content.
      - Trả về thêm 1 dòng đầu tiên là tiêu đề bài viết định dạng: TITLE: <Tiêu đề của bài>
    `;

    // Chúng ta dùng gemini-3.5-flash làm mặc định vì nó nhanh và rẻ.
    // Đảm bảo GOOGLE_GENERATIVE_AI_API_KEY đã được set trong .env
    const { text } = await generateText({
      model: google('gemini-3.5-flash'),
      prompt: systemPrompt,
      maxTokens: 3000,
      temperature: 0.7,
    });

    // Parse the response to extract title and html content
    const lines = text.split('\n');
    let title = '';
    let contentHtml = text;

    for (let i = 0; i < Math.min(5, lines.length); i++) {
      if (lines[i].trim().startsWith('TITLE:')) {
        title = lines[i].replace('TITLE:', '').trim();
        // Xóa dòng TITLE khỏi contentHtml
        lines.splice(i, 1);
        contentHtml = lines.join('\n');
        break;
      }
    }

    if (!title) {
      title = topic; // Fallback title
    }

    // Làm sạch HTML nếu AI lỡ bọc trong markdown code block
    contentHtml = contentHtml.replace(/```html/gi, '').replace(/```/g, '').trim();

    return NextResponse.json({
      title,
      contentHtml
    });

  } catch (error: any) {
    console.error('Error generating AI content:', error);
    return NextResponse.json({ error: error.message || 'Failed to generate content' }, { status: 500 });
  }
}
