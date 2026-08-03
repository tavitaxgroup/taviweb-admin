import { embed, embedMany } from 'ai';
import { google } from '@ai-sdk/google';
import { supabase } from '../supabase'; // Supabase client from @/lib/supabase

const EMBEDDING_MODEL = google.textEmbeddingModel('gemini-embedding-2');

/**
 * Hàm cắt văn bản thành các chunk nhỏ sử dụng Recursive Text Splitting với Overlap
 */
export function chunkText(text: string, chunkSize: number = 1000, chunkOverlap: number = 200): string[] {
  const chunks: string[] = [];
  let i = 0;
  
  while (i < text.length) {
    let end = Math.min(i + chunkSize, text.length);
    
    // Lùi lại để không cắt ngang câu hoặc từ
    if (end < text.length) {
      const lastNewline = text.lastIndexOf('\n', end);
      const lastPeriod = text.lastIndexOf('. ', end);
      const lastSpace = text.lastIndexOf(' ', end);
      
      if (lastNewline > i + chunkSize * 0.5) {
        end = lastNewline;
      } else if (lastPeriod > i + chunkSize * 0.5) {
        end = lastPeriod + 1;
      } else if (lastSpace > i + chunkSize * 0.5) {
        end = lastSpace;
      }
    }
    
    const chunk = text.slice(i, end).trim();
    if (chunk) {
      chunks.push(chunk);
    }
    
    if (end >= text.length) break;
    
    // Tính toán vị trí bắt đầu của chunk tiếp theo (có overlap)
    i = end - chunkOverlap;
    
    // Căn chỉnh vị trí bắt đầu để không bị cụt chữ
    const nextNewline = text.indexOf('\n', i);
    const nextSpace = text.indexOf(' ', i);
    
    if (nextNewline !== -1 && nextNewline < i + 50) {
      i = nextNewline + 1;
    } else if (nextSpace !== -1 && nextSpace < i + 20) {
      i = nextSpace + 1;
    }
    
    // Chống lặp vô hạn
    if (i <= end - chunkSize) {
      i = end;
    }
  }
  
  return chunks;
}

/**
 * Nhập dữ liệu vào vector database cho 1 tenant
 */
export async function ingestKnowledge(tenantId: string, content: string, sourceType: string = 'custom') {
  try {
    const chunks = chunkText(content);
    if (chunks.length === 0) return { success: false, error: 'No content' };

    // Tạo embedding cho tất cả các chunk
    const { embeddings } = await embedMany({
      model: EMBEDDING_MODEL,
      values: chunks,
    });

    // Tạo dữ liệu để insert vào Supabase (cắt embedding về 768 chiều vì giới hạn của hnsw)
    const insertData = chunks.map((chunk, i) => ({
      tenant_id: tenantId,
      content: chunk,
      embedding: embeddings[i],
      source_type: sourceType,
    }));

    const { error } = await supabase.from('knowledge_chunks').insert(insertData);

    if (error) throw error;
    
    return { success: true, chunksCount: chunks.length };
  } catch (error) {
    console.error('Ingestion Error:', error);
    return { success: false, error };
  }
}

/**
 * Tìm kiếm văn bản tương tự (Similarity Search)
 */
export async function searchKnowledge(tenantId: string, query: string, limit: number = 10) {
  try {
    const { embedding } = await embed({
      model: EMBEDDING_MODEL,
      value: query,
    });

    // Supabase RPC function (cần phải tạo function match_knowledge_chunks trong DB)
    // Nhưng vì ta đang dùng pgvector query trực tiếp hoặc RPC
    // Tạm thời query dùng RPC chuẩn của pgvector
    const { data, error } = await supabase.rpc('match_knowledge_chunks', {
      query_embedding: embedding,
      match_threshold: 0.5,
      match_count: limit,
      p_tenant_id: tenantId
    });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Search Knowledge Error:', error);
    return [];
  }
}
