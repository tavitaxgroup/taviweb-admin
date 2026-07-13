import React, { useEffect, useState } from 'react';
import { CRMDeal, CRMActivity } from '../types';
import { CRMService } from '../api/crm.service';

interface DealDetailModalProps {
  deal: CRMDeal | null;
  onClose: () => void;
  onDelete?: (dealId: string) => void;
}

export default function DealDetailModal({ deal, onClose, onDelete }: DealDetailModalProps) {
  const [activities, setActivities] = useState<CRMActivity[]>([]);
  const [newNote, setNewNote] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (deal) {
      loadActivities();
    }
  }, [deal]);

  const loadActivities = async () => {
    if (!deal) return;
    try {
      const acts = await CRMService.getActivities(deal.id);
      setActivities(acts);
    } catch (error) {
      console.error('Failed to load activities', error);
    }
  };

  const handleAddNote = async () => {
    if (!newNote.trim() || !deal) return;
    setLoading(true);
    try {
      await CRMService.createActivity({
        deal_id: deal.id,
        type: 'note',
        content: newNote.trim()
      });
      setNewNote('');
      loadActivities();
    } catch (error) {
      console.error('Failed to add note', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteDeal = async () => {
    if (!deal) return;
    const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa khách hàng này khỏi CRM?');
    if (confirmDelete) {
      try {
        await CRMService.deleteDeal(deal.id);
        if (onDelete) {
          onDelete(deal.id);
        }
        onClose();
      } catch (error) {
        console.error('Failed to delete deal', error);
        alert('Có lỗi xảy ra khi xóa khách hàng');
      }
    }
  };

  if (!deal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-800">{deal.title}</h2>
          <div className="flex items-center gap-2">
            <button 
              onClick={handleDeleteDeal}
              className="text-xs px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 font-semibold rounded-md transition-colors"
            >
              Xóa khách
            </button>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1 bg-slate-100 hover:bg-slate-200 rounded-md ml-2 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-6">
          
          {/* Contact Info */}
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
            <h3 className="text-sm font-semibold text-slate-700 mb-3">Thông tin Khách hàng</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-slate-500 block">Tên liên hệ</span>
                <span className="font-medium">{deal.contact?.name || '-'}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Số điện thoại</span>
                <span className="font-medium">{deal.contact?.phone || '-'}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Website</span>
                <a href={deal.contact?.website} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                  {deal.contact?.website || '-'}
                </a>
              </div>
              <div>
                <span className="text-slate-500 block">Facebook</span>
                <a href={deal.contact?.facebook_url} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                  {deal.contact?.facebook_url || '-'}
                </a>
              </div>
            </div>
          </div>

          {/* Activity Log */}
          <div>
            <h3 className="text-sm font-semibold text-slate-700 mb-3">Lịch sử chăm sóc</h3>
            
            {/* Add note */}
            <div className="mb-4 flex flex-col gap-2">
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Ghi chú cuộc gọi, cuộc họp..."
                className="w-full text-sm rounded-md border border-slate-300 p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                rows={3}
              />
              <button 
                onClick={handleAddNote}
                disabled={loading || !newNote.trim()}
                className="self-end px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? 'Đang lưu...' : 'Thêm ghi chú'}
              </button>
            </div>

            {/* List activities */}
            <div className="flex flex-col gap-3">
              {activities.length === 0 ? (
                <div className="text-sm text-slate-500 italic text-center py-4">Chưa có lịch sử chăm sóc</div>
              ) : (
                activities.map(act => (
                  <div key={act.id} className="text-sm border-l-2 border-blue-400 pl-3 py-1">
                    <div className="text-slate-500 text-xs mb-1 flex justify-between">
                      <span>{act.user?.name || 'User'} ({act.type})</span>
                      <span>{new Date(act.created_at).toLocaleString('vi-VN')}</span>
                    </div>
                    <div className="text-slate-800 whitespace-pre-wrap">{act.content}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
