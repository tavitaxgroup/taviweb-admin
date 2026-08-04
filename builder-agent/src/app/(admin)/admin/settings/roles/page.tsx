"use client";

import React, { useState, useEffect } from 'react';
import { CRMService } from '@/modules/crm/api/crm.service';
import { CRMRole } from '@/modules/crm/types';
import { useAuth } from '@/modules/crm/contexts/AuthContext';
import toast from 'react-hot-toast';
import { ShieldAlert, Plus, Shield, Check, Trash2, Edit3, X, Save } from 'lucide-react';

const PERMISSION_GROUPS = [
  {
    title: 'Quản lý Cơ hội (Deals)',
    key: 'deals',
    items: [
      { id: 'view_all_deals', label: 'Xem tất cả cơ hội' },
      { id: 'edit_all_deals', label: 'Chỉnh sửa tất cả cơ hội' },
      { id: 'delete_deals', label: 'Xóa cơ hội' },
      { id: 'view_own_deals', label: 'Chỉ xem cơ hội được giao' },
      { id: 'edit_own_deals', label: 'Chỉnh sửa cơ hội được giao' },
    ]
  },
  {
    title: 'Cài đặt Hệ thống (Settings)',
    key: 'settings',
    items: [
      { id: 'manage_pipelines', label: 'Quản lý Quy trình (Pipelines)' },
      { id: 'manage_users', label: 'Thêm/Xóa Nhân viên' },
      { id: 'edit_users', label: 'Chỉnh sửa thông tin & quyền Nhân viên' },
      { id: 'manage_roles', label: 'Quản lý Phân quyền (Roles)' },
      { id: 'manage_settings', label: 'Thiết lập Chung' },
    ]
  }
];

export default function RolesManagementPage() {
  const { user } = useAuth();
  const [roles, setRoles] = useState<CRMRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeRole, setActiveRole] = useState<CRMRole | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<Partial<CRMRole>>({});

  useEffect(() => {
    if (user?.tenant_id) {
      loadRoles();
    }
  }, [user?.tenant_id]);

  const loadRoles = async () => {
    if (!user?.tenant_id) return;
    setLoading(true);
    try {
      const data = await CRMService.getRoles(user.tenant_id);
      setRoles(data);
      if (data.length > 0 && !activeRole) {
        setActiveRole(data[0]);
      }
    } catch (error) {
      toast.error('Không thể tải danh sách quyền');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNew = () => {
    setActiveRole(null);
    setIsEditing(true);
    setEditForm({
      name: 'Chức danh mới',
      description: '',
      permissions: []
    });
  };

  const handleEdit = (role: CRMRole) => {
    setActiveRole(role);
    setIsEditing(true);
    setEditForm({ ...role });
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (!activeRole && roles.length > 0) {
      setActiveRole(roles[0]);
    }
  };

  const handleTogglePermission = (permId: string) => {
    setEditForm(prev => {
      const perms = prev.permissions || [];
      if (perms.includes(permId)) {
        return { ...prev, permissions: perms.filter(p => p !== permId) };
      } else {
        return { ...prev, permissions: [...perms, permId] };
      }
    });
  };

  const handleSave = async () => {
    if (!user?.tenant_id) return;
    if (!editForm.name) {
      toast.error('Vui lòng nhập tên chức danh');
      return;
    }
    
    const loadingToast = toast.loading('Đang lưu...');
    try {
      if (editForm.id) {
        await CRMService.updateRole(user.tenant_id, editForm.id, {
          name: editForm.name,
          description: editForm.description,
          permissions: editForm.permissions
        });
        toast.success('Đã cập nhật quyền', { id: loadingToast });
      } else {
        const newRole = await CRMService.createRole(user.tenant_id, {
          name: editForm.name,
          description: editForm.description,
          permissions: editForm.permissions
        });
        toast.success('Đã tạo quyền mới', { id: loadingToast });
        setActiveRole(newRole);
      }
      setIsEditing(false);
      loadRoles();
    } catch (error) {
      toast.error('Lưu thất bại', { id: loadingToast });
    }
  };

  const handleDelete = async (id: string) => {
    if (!user?.tenant_id) return;
    if (!confirm('Bạn có chắc chắn muốn xóa quyền này? Các nhân viên đang có quyền này có thể mất quyền truy cập.')) return;
    
    try {
      await CRMService.deleteRole(user.tenant_id, id);
      toast.success('Đã xóa quyền');
      setActiveRole(roles[0] || null);
      loadRoles();
    } catch (error) {
      toast.error('Không thể xóa quyền (có thể đang được sử dụng)');
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 animate-in fade-in zoom-in-95 duration-500">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 flex items-center gap-3">
            <ShieldAlert className="w-8 h-8 text-indigo-600" />
            Quản lý Phân Quyền
          </h1>
          <p className="text-slate-500 mt-2 font-medium">Định nghĩa các chức danh và giới hạn quyền truy cập cho từng chức danh.</p>
        </div>
        <button 
          onClick={handleCreateNew}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold shadow-sm transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Tạo Chức danh Mới
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Col: Role List */}
        <div className="w-full lg:w-1/3 flex flex-col gap-3">
          {loading && roles.length === 0 ? (
            <div className="animate-pulse flex flex-col gap-3">
              {[1, 2, 3].map(i => <div key={i} className="h-16 bg-slate-200 rounded-2xl"></div>)}
            </div>
          ) : (
            roles.map(role => (
              <div 
                key={role.id}
                onClick={() => {
                  if (!isEditing) setActiveRole(role);
                }}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                  activeRole?.id === role.id && !isEditing
                    ? 'border-indigo-500 bg-indigo-50 shadow-md scale-[1.02]' 
                    : 'border-transparent bg-white shadow-sm hover:border-slate-200 hover:scale-[1.01]'
                } ${isEditing ? 'opacity-50 pointer-events-none' : ''}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${activeRole?.id === role.id ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                    <Shield className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-800">{role.name}</h3>
                    <p className="text-xs text-slate-500 line-clamp-1">{role.description || 'Không có mô tả'}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Right Col: Permission Details / Editor */}
        <div className="w-full lg:w-2/3">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 min-h-[500px]">
            {isEditing ? (
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                  <h2 className="text-xl font-bold text-slate-800">
                    {editForm.id ? 'Chỉnh sửa Quyền' : 'Tạo Quyền mới'}
                  </h2>
                  <div className="flex gap-2">
                    <button onClick={handleCancel} className="px-4 py-2 bg-slate-100 text-slate-600 font-bold rounded-lg hover:bg-slate-200 transition-colors flex gap-2 items-center text-sm">
                      <X className="w-4 h-4" /> Hủy
                    </button>
                    <button onClick={handleSave} className="px-4 py-2 bg-emerald-500 text-white font-bold rounded-lg hover:bg-emerald-600 transition-colors flex gap-2 items-center text-sm">
                      <Save className="w-4 h-4" /> Lưu
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Tên chức danh</label>
                    <input 
                      type="text" 
                      value={editForm.name || ''} 
                      onChange={e => setEditForm({...editForm, name: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-xl px-4 py-2 outline-none font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Mô tả ngắn</label>
                    <input 
                      type="text" 
                      value={editForm.description || ''} 
                      onChange={e => setEditForm({...editForm, description: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-xl px-4 py-2 outline-none font-medium"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="font-bold text-slate-800 mb-4 text-lg">Ma trận Quyền (Permissions)</h3>
                  <div className="space-y-6">
                    {PERMISSION_GROUPS.map(group => (
                      <div key={group.key} className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                        <h4 className="font-bold text-indigo-900 mb-3">{group.title}</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {group.items.map(item => {
                            const isChecked = editForm.permissions?.includes(item.id);
                            return (
                              <label key={item.id} className="flex items-start gap-3 cursor-pointer group">
                                <div className={`mt-0.5 w-5 h-5 rounded flex items-center justify-center border transition-colors ${isChecked ? 'bg-indigo-600 border-indigo-600' : 'bg-white border-slate-300 group-hover:border-indigo-400'}`}>
                                  {isChecked && <Check className="w-3.5 h-3.5 text-white" />}
                                </div>
                                <input 
                                  type="checkbox" 
                                  className="hidden" 
                                  checked={isChecked}
                                  onChange={() => handleTogglePermission(item.id)}
                                />
                                <span className={`text-sm font-medium ${isChecked ? 'text-slate-800' : 'text-slate-500 group-hover:text-slate-700'}`}>
                                  {item.label}
                                </span>
                              </label>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : activeRole ? (
              <div className="space-y-6">
                <div className="flex justify-between items-start border-b border-slate-100 pb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800">{activeRole.name}</h2>
                    <p className="text-slate-500 font-medium">{activeRole.description || 'Không có mô tả'}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(activeRole)} className="px-3 py-1.5 bg-indigo-50 text-indigo-600 font-bold rounded-lg hover:bg-indigo-100 transition-colors flex gap-2 items-center text-sm">
                      <Edit3 className="w-4 h-4" /> Sửa
                    </button>
                    {activeRole.name !== 'Quản trị viên' && (
                      <button onClick={() => handleDelete(activeRole.id)} className="px-3 py-1.5 bg-red-50 text-red-600 font-bold rounded-lg hover:bg-red-100 transition-colors flex gap-2 items-center text-sm">
                        <Trash2 className="w-4 h-4" /> Xóa
                      </button>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-slate-800 mb-4 text-lg">Quyền hạn (Permissions)</h3>
                  {activeRole.permissions.length === 0 ? (
                    <p className="text-slate-500 italic">Chưa được cấp quyền nào.</p>
                  ) : (
                    <div className="space-y-6">
                      {PERMISSION_GROUPS.map(group => {
                        const activeItemsInGroup = group.items.filter(item => activeRole.permissions.includes(item.id));
                        if (activeItemsInGroup.length === 0) return null;
                        
                        return (
                          <div key={group.key} className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                            <h4 className="font-bold text-indigo-900 mb-3">{group.title}</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {activeItemsInGroup.map(item => (
                                <div key={item.id} className="flex items-center gap-2">
                                  <Check className="w-4 h-4 text-emerald-500" />
                                  <span className="text-sm font-medium text-slate-700">{item.label}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-400">
                <ShieldAlert className="w-16 h-16 mb-4 opacity-20" />
                <p className="font-medium">Chọn một chức danh để xem chi tiết</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
