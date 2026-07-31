import { embed, embedMany } from 'ai';
import { google } from '@ai-sdk/google';
import { supabase } from '../supabase'; // Supabase client from @/lib/supabase

const EMBEDDING_MODEL = google.textEmbeddingModel('gemini-embedding-2');

/**
 * Hàm cắt văn bản thành các chunk nhỏ
 */
export function chunkText(text: string, maxTokens: number = 300): string[] {
  // Đơn giản hóa: Cắt theo đoạn văn hoặc số ký tự (1 token ~ 4 ký tự)
  const maxLength = maxTokens * 4;
  const chunks: string[] = [];
  let currentChunk = '';

  const sentences = text.split(/(?<=[.?!])\s+/);
  
  for (const sentence of sentences) {
    if (currentChunk.length + sentence.length > maxLength) {
      if (currentChunk.trim()) chunks.push(currentChunk.trim());
      currentChunk = sentence + ' ';
    } else {
      currentChunk += sentence + ' ';
    }
  }
  
  if (currentChunk.trim()) chunks.push(currentChunk.trim());
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
      embedding: embeddings[i].slice(0, 768),
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
export async function searchKnowledge(tenantId: string, query: string, limit: number = 3) {
  try {
    const { embedding } = await embed({
      model: EMBEDDING_MODEL,
      value: query,
    });

    // Supabase RPC function (cần phải tạo function match_knowledge_chunks trong DB)
    // Nhưng vì ta đang dùng pgvector query trực tiếp hoặc RPC
    // Tạm thời query dùng RPC chuẩn của pgvector
    const { data, error } = await supabase.rpc('match_knowledge_chunks', {
      query_embedding: embedding.slice(0, 768),
      match_threshold: 0.7,
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
