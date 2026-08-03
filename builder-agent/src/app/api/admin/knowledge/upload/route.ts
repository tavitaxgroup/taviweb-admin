import { NextResponse } from 'next/server';
import { ingestKnowledge } from '@/lib/ai/ingestion';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import mammoth from 'mammoth';
import * as xlsx from 'xlsx';

export const dynamic = 'force-dynamic';

const JWT_SECRET = process.env.JWT_SECRET || 'tavi-super-secret-key-for-jwt-123';

async function getTenantId() {
  const cookieStore = await cookies();
  const token = cookieStore.get('crm_token')?.value;
  if (!token) return null;
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    return decoded.tenant_id;
  } catch (err) {
    return null;
  }
}

export async function POST(request: Request) {
  try {
    const tenantId = await getTenantId();
    if (!tenantId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'Không tìm thấy file tải lên' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    let extractedText = '';

    const fileName = file.name.toLowerCase();

    if (fileName.endsWith('.pdf')) {
      const pdfParseModule = await import('pdf-parse');
      const pdfParse = (pdfParseModule as any).default || pdfParseModule;
      const data = await pdfParse(buffer);
      extractedText = data.text;
    } else if (fileName.endsWith('.docx')) {
      const result = await mammoth.extractRawText({ buffer });
      extractedText = result.value;
    } else if (fileName.endsWith('.xlsx') || fileName.endsWith('.csv')) {
      const workbook = xlsx.read(buffer, { type: 'buffer' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const json = xlsx.utils.sheet_to_json(sheet, { header: 1 }) as any[][];
      
      // Chuyển array 2D thành text, phân tách bằng dấu phẩy và xuống dòng
      extractedText = json
        .map(row => row.filter(cell => cell !== null && cell !== undefined).join(', '))
        .filter(rowStr => rowStr.trim().length > 0)
        .join('\n');
    } else if (fileName.endsWith('.txt')) {
      extractedText = buffer.toString('utf-8');
    } else {
      return NextResponse.json({ error: 'Định dạng file không được hỗ trợ. Vui lòng dùng PDF, DOCX, XLSX, CSV hoặc TXT.' }, { status: 400 });
    }

    if (!extractedText || extractedText.trim().length === 0) {
      return NextResponse.json({ error: 'Không thể trích xuất nội dung từ file hoặc file trống.' }, { status: 400 });
    }

    // Nạp dữ liệu vào RAG
    const result = await ingestKnowledge(tenantId, extractedText, \`document:\${file.name}\`);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json({ success: true, chunksCount: result.chunksCount });

  } catch (err: any) {
    console.error('File Upload Ingest Error:', err);
    return NextResponse.json({ error: 'Có lỗi xảy ra khi xử lý file: ' + err.message }, { status: 500 });
  }
}
