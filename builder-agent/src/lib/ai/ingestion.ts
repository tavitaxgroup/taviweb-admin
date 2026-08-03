import { embed, embedMany } from 'ai';
import { google } from '@ai-sdk/google';
import { supabase } from '../supabase'; // Supabase client from @/lib/supabase

const EMBEDDING_MODEL = google.textEmbeddingModel('gemini-embedding-2');

/**
 * Hàm cắt văn bản thành các chunk nhỏ sử dụng Recursive Text Splitting với Overlap
 */
export function chunkText(text: string, chunkSize: number = 1000, chunkOverlap: number = 200): string[] {
  const separators = ['\n\n', '\n', '. ', ' ', ''];
  const chunks: string[] = [];

  function splitRecursive(textToSplit: string, separatorIndex: number): string[] {
    if (textToSplit.length <= chunkSize) return [textToSplit];
    
    const separator = separators[separatorIndex];
    if (separator === undefined) {
      // Fallback nếu không có ký tự tách nào khả thi
      const result: string[] = [];
      let i = 0;
      while (i < textToSplit.length) {
        result.push(textToSplit.slice(i, i + chunkSize));
        i += (chunkSize - chunkOverlap > 0 ? chunkSize - chunkOverlap : chunkSize);
      }
      return result;
    }

    const splits = textToSplit.split(separator);
    const goodSplits: string[] = [];
    
    for (const split of splits) {
      // Đảm bảo không mất ký tự separator (trừ trường hợp rỗng)
      const content = split + (separator === ' ' || separator === '' ? '' : separator);
      if (content.length <= chunkSize) {
        goodSplits.push(content);
      } else {
        goodSplits.push(...splitRecursive(content, separatorIndex + 1));
      }
    }
    return goodSplits;
  }

  const rawSplits = splitRecursive(text, 0);
  let currentChunk = '';
  
  for (let i = 0; i < rawSplits.length; i++) {
    const split = rawSplits[i];
    if (currentChunk.length + split.length > chunkSize && currentChunk.trim().length > 0) {
      chunks.push(currentChunk.trim());
      
      // Tính toán Overlap
      let overlapText = '';
      if (chunkOverlap > 0 && currentChunk.length > chunkOverlap) {
        overlapText = currentChunk.slice(-chunkOverlap);
        const lastSpace = overlapText.indexOf(' ');
        if (lastSpace !== -1) overlapText = overlapText.slice(lastSpace + 1);
      }
      currentChunk = overlapText + split;
    } else {
      currentChunk += split;
    }
  }

  if (currentChunk.trim()) {
    chunks.push(currentChunk.trim());
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
