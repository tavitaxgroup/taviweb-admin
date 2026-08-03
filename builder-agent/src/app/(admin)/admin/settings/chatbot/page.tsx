'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Bot, Save, FileText, Database, Trash2, CheckCircle, RefreshCw, Upload, File } from 'lucide-react';

interface KnowledgeChunk {
  id: string;
  content: string;
  source_type: string;
  created_at: string;
}

export default function TenantChatbotSettings() {
  const [systemPrompt, setSystemPrompt] = useState('');
  const [loadingPrompt, setLoadingPrompt] = useState(true);
  const [savingPrompt, setSavingPrompt] = useState(false);

  const [ragContent, setRagContent] = useState('');
  const [loadingRag, setLoadingRag] = useState(false);
  
  const [chunks, setChunks] = useState<KnowledgeChunk[]>([]);
  const [loadingChunks, setLoadingChunks] = useState(true);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchPrompt();
    fetchChunks();
  }, []);

  const fetchPrompt = async () => {
    try {
      const res = await fetch('/api/admin/settings/chatbot');
      const data = await res.json();
      if (data.system_prompt) setSystemPrompt(data.system_prompt);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingPrompt(false);
    }
  };

  const fetchChunks = async () => {
    try {
      const res = await fetch('/api/admin/knowledge');
      const data = await res.json();
      if (data.data) setChunks(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingChunks(false);
    }
  };

  const savePrompt = async () => {
    setSavingPrompt(true);
    try {
      await fetch('/api/admin/settings/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ system_prompt: systemPrompt }),
      });
      alert('Đã lưu cấu hình Prompt thành công!');
    } catch (error) {
      alert('Có lỗi xảy ra khi lưu.');
    } finally {
      setSavingPrompt(false);
    }
  };

  const ingestRag = async () => {
    if (!ragContent.trim()) return alert('Vui lòng nhập nội dung kiến thức!');
    setLoadingRag(true);
    try {
      const res = await fetch('/api/admin/knowledge/ingest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: ragContent, source_type: \`custom:\${Date.now()}\` }),
      });
      const data = await res.json();
      if (data.success) {
        alert(`Đã nạp thành công! Tạo ra ${data.chunksCount} đoạn kiến thức nhỏ.`);
        setRagContent('');
        fetchChunks();
      } else {
        alert(data.error || 'Lỗi nạp dữ liệu');
      }
    } catch (error) {
      alert('Có lỗi xảy ra khi nạp RAG.');
    } finally {
      setLoadingRag(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset input
    if (fileInputRef.current) fileInputRef.current.value = '';

    const allowedTypes = ['.pdf', '.docx', '.xlsx', '.csv', '.txt'];
    const ext = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
    
    if (!allowedTypes.includes(ext)) {
      alert(`Định dạng ${ext} không được hỗ trợ. Vui lòng chọn PDF, DOCX, XLSX, CSV hoặc TXT.`);
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/admin/knowledge/upload', {
        method: 'POST',
        body: formData, // Không set Content-Type, trình duyệt tự xử lý boundary
      });
      const data = await res.json();
      if (data.success) {
        alert(`Đã phân tích file thành công! AI đã học được ${data.chunksCount} đoạn kiến thức mới.`);
        fetchChunks();
      } else {
        alert(data.error || 'Có lỗi khi tải lên file.');
      }
    } catch (error) {
      alert('Có lỗi mạng khi tải file.');
    } finally {
      setUploading(false);
    }
  };

  const deleteDocument = async (sourceType: string) => {
    if (!confirm('Bạn có chắc chắn muốn xóa tài liệu này? Toàn bộ kiến thức liên quan sẽ bị xóa khỏi AI.')) return;
    try {
      await fetch(`/api/admin/knowledge?source_type=${encodeURIComponent(sourceType)}`, { method: 'DELETE' });
      fetchChunks();
    } catch (error) {
      console.error(error);
    }
  };

  const groupedDocs = chunks.reduce((acc: any, chunk) => {
    if (!acc[chunk.source_type]) {
      acc[chunk.source_type] = {
        source_type: chunk.source_type,
        created_at: chunk.created_at,
        count: 0
      };
    }
    acc[chunk.source_type].count += 1;
    if (new Date(chunk.created_at) > new Date(acc[chunk.source_type].created_at)) {
      acc[chunk.source_type].created_at = chunk.created_at;
    }
    return acc;
  }, {});

  const documents = Object.values(groupedDocs).sort((a: any, b: any) => 
    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  ) as any[];

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600">
          <Bot className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">Cấu hình Trợ lý AI</h1>
          <p className="text-sm text-slate-500 mt-1">
            Thiết lập tính cách, quy tắc trả lời và nạp thêm kiến thức về doanh nghiệp để AI tư vấn thông minh hơn.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cột Trái: System Prompt */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col h-full">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-5 h-5 text-indigo-600" />
            <h2 className="text-lg font-bold text-slate-800">1. Tính cách & Quy tắc (System Prompt)</h2>
          </div>
          <p className="text-sm text-slate-500 mb-4">
            Hướng dẫn AI cách xưng hô với khách hàng (VD: "Tôi là trợ lý của shop X..."), giọng văn (Thân thiện, chuyên nghiệp) và những điều KHÔNG được nói.
          </p>
          <div className="flex-1 min-h-[300px]">
            {loadingPrompt ? (
              <div className="w-full h-full bg-slate-50 animate-pulse rounded-lg border border-slate-200"></div>
            ) : (
              <textarea
                value={systemPrompt}
                onChange={(e) => setSystemPrompt(e.target.value)}
                placeholder="VD: Bạn là nhân viên tư vấn của Cửa hàng Thời Trang Y. Xưng hô là 'Em' và gọi khách là 'Anh/Chị'. Luôn trả lời ngắn gọn, vui vẻ..."
                className="w-full h-full min-h-[300px] p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none resize-none transition"
              />
            )}
          </div>
          <button 
            onClick={savePrompt}
            disabled={savingPrompt || loadingPrompt}
            className="mt-4 flex items-center justify-center gap-2 bg-indigo-600 text-white w-full py-3 rounded-xl font-semibold shadow-md hover:bg-indigo-700 transition disabled:opacity-70"
          >
            {savingPrompt ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
            Lưu Cấu Hình Prompt
          </button>
        </div>

        {/* Cột Phải: RAG Ingestion */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col h-full">
          <div className="flex items-center gap-3 mb-4">
            <Database className="w-5 h-5 text-emerald-600" />
            <h2 className="text-lg font-bold text-slate-800">2. Nạp Kiến Thức (RAG / Knowledge Base)</h2>
          </div>
          <p className="text-sm text-slate-500 mb-4">
            Dán bảng giá, chính sách bảo hành, mô tả sản phẩm vào đây, hoặc upload file tài liệu. AI sẽ tự động học để trả lời khách.
          </p>
          <div className="flex-1 min-h-[200px] mb-4">
            <textarea
              value={ragContent}
              onChange={(e) => setRagContent(e.target.value)}
              placeholder="Nhập thông tin sản phẩm, bảng giá, FAQ... vào đây."
              className="w-full h-full min-h-[200px] p-4 bg-emerald-50 border border-emerald-100 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none resize-none transition"
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <button 
              onClick={ingestRag}
              disabled={loadingRag || uploading}
              className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 text-white py-3 rounded-xl font-semibold shadow-md hover:bg-emerald-700 transition disabled:opacity-70"
            >
              {loadingRag ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Database className="w-5 h-5" />}
              Nạp Chữ Trực Tiếp
            </button>

            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept=".pdf,.docx,.xlsx,.csv,.txt"
              onChange={handleFileUpload}
            />
            
            <button 
              onClick={() => fileInputRef.current?.click()}
              disabled={loadingRag || uploading}
              className="flex-1 flex items-center justify-center gap-2 bg-slate-800 text-white py-3 rounded-xl font-semibold shadow-md hover:bg-slate-900 transition disabled:opacity-70"
            >
              {uploading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Upload className="w-5 h-5" />}
              Tải Lên File (PDF, Word...)
            </button>
          </div>
        </div>
      </div>

      {/* Danh sách Documents */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <h2 className="text-lg font-bold text-slate-800">Tài liệu đã học ({documents.length} tài liệu)</h2>
          <button onClick={fetchChunks} className="text-sm text-indigo-600 font-semibold hover:underline flex items-center gap-1">
            <RefreshCw className="w-4 h-4" /> Làm mới
          </button>
        </div>
        <div className="divide-y divide-slate-100">
          {loadingChunks ? (
            <div className="p-8 text-center text-slate-400">Đang tải dữ liệu...</div>
          ) : documents.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-sm">Chưa có tài liệu kiến thức nào được nạp.</div>
          ) : (
            documents.map(doc => {
              const isFile = doc.source_type.startsWith('document:');
              const docName = isFile ? doc.source_type.replace('document:', '') : 'Dữ liệu nhập tay';
              
              return (
                <div key={doc.source_type} className="p-6 flex items-center gap-4 hover:bg-slate-50/50 transition">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                    {isFile ? <File className="w-5 h-5 text-indigo-500" /> : <FileText className="w-5 h-5 text-emerald-500" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-700 truncate">
                      {docName}
                    </p>
                    <div className="text-[12px] text-slate-500 mt-1 flex items-center gap-2">
                      <span className="bg-slate-100 px-2 py-0.5 rounded-full text-slate-600 font-medium">{doc.count} đoạn kiến thức</span>
                      <span>•</span>
                      <span>{new Date(doc.created_at).toLocaleString('vi-VN')}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => deleteDocument(doc.source_type)}
                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition"
                    title="Xóa tài liệu"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
