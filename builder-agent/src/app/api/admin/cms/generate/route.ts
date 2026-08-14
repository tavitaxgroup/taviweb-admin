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
      Bạn là một chuyên gia SEO và Content Marketing. 
      Hãy viết một bài blog chuẩn SEO về chủ đề: "${topic}".
      Giọng văn: "${tone}".
      ${keywords ? `Từ khóa cần SEO: ${keywords}` : ''}
      
      YÊU CẦU ĐẦU RA:
      - Bài viết phải dài, chi tiết, phân chia rõ ràng bằng các Heading (H2, H3).
      - Nội dung phải cuốn hút, giữ chân người đọc.
      - **HÌNH ẢNH MINH HỌA:** Bạn chỉ việc tạo ra một đường link (URL) ảnh dựa trên từ khóa tiếng Anh, không được dùng công cụ vẽ ảnh. 
        Hãy chèn 2-3 thẻ <img src="..."> vào nội dung bài viết theo mẫu sau:
        <img src="https://image.pollinations.ai/prompt/dien-ta-chi-tiet-anh-bang-tieng-anh?width=800&height=400&nologo=true" alt="mô tả ngắn">
        Ví dụ: <img src="https://image.pollinations.ai/prompt/modern-dental-clinic-interior-bright-lighting-professional?width=800&height=400&nologo=true" alt="dental clinic">
      
      TRẢ VỀ DUY NHẤT 1 JSON (KHÔNG BỌC TRONG MARKDOWN, KHÔNG BACKTICKS) VỚI ĐỊNH DẠNG SAU:
      {
        "title": "Tiêu đề bài viết hấp dẫn (dưới 70 ký tự)",
        "contentHtml": "Nội dung bài viết được format bằng HTML (sử dụng <h2>, <h3>, <p>, <ul>, <li>, <strong>, và <img src='...'> cho hình ảnh minh họa thay vì markdown image)"
      }
    `;

    // Đảm bảo GOOGLE_GENERATIVE_AI_API_KEY đã được set trong .env
    const result = await generateText({
      model: google('gemini-3.5-flash'),
      prompt: systemPrompt,
      temperature: 0.7,
    });
    
    const text = result.text;

    let parsedResult;
    try {
      // Find the first { and last } to extract JSON in case AI adds markdown formatting
      const jsonStr = text.substring(text.indexOf('{'), text.lastIndexOf('}') + 1);
      parsedResult = JSON.parse(jsonStr);
    } catch (e) {
      console.error("Failed to parse JSON from AI response:", text);
      throw new Error("AI trả về sai định dạng");
    }

    const title = parsedResult.title || topic;
    const contentHtml = parsedResult.contentHtml || text;

    return NextResponse.json({
      title,
      contentHtml
    });

  } catch (error: any) {
    console.error('Error generating AI content:', error);
    return NextResponse.json({ error: error.message || 'Failed to generate content' }, { status: 500 });
  }
}
