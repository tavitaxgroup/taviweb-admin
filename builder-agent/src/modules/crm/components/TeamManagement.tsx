import React, { useEffect, useState } from 'react';
import { CRMUser, CRMRole } from '../types';
import { CRMService } from '../api/crm.service';
import { useAuth } from '../contexts/AuthContext';

export default function TeamManagement() {
  const { user } = useAuth();
  const [users, setUsers] = useState<CRMUser[]>([]);
  const [roles, setRoles] = useState<CRMRole[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState<CRMUser | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', role_id: '' });

  useEffect(() => {
    if (user?.tenant_id) {
      loadData();
    }
  }, [user?.tenant_id]);

  const loadData = async () => {
    if (!user?.tenant_id) return;
    setLoading(true);
    try {
      const [u, r] = await Promise.all([
        CRMService.getUsers(user.tenant_id),
        CRMService.getRoles(user.tenant_id)
      ]);
      setUsers(u);
      setRoles(r);
      if (r.length > 0) {
        setFormData(prev => ({ ...prev, role_id: r[0].id }));
      }
    } catch (error) {
      console.error('Failed to load data', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.role_id || !user?.tenant_id) return;
    try {
      if (editingUser) {
        await CRMService.updateUser(user.tenant_id, editingUser.id, {
          name: formData.name,
          email: formData.email,
          role_id: formData.role_id
        });
      } else {
        await CRMService.createUser(user.tenant_id, {
          name: formData.name,
          email: formData.email,
          role_id: formData.role_id
        });
      }
      setShowForm(false);
      setEditingUser(null);
      setFormData({ name: '', email: '', role_id: roles[0]?.id || '' });
      loadData();
    } catch (error: any) {
      console.error('Failed to save user', error);
      if (error.message && error.message.includes('limit_exceeded')) {
        const match = error.message.match(/limit_exceeded:(\d+)/);
        const limit = match ? match[1] : '10';
        alert(`Gói cước hiện tại của bạn chỉ cho phép tối đa ${limit} nhân viên. Vui lòng nâng cấp gói để thêm mới!`);
      } else {
        alert('Có lỗi xảy ra khi lưu nhân viên');
      }
    }
  };

  const openForm = (u?: CRMUser) => {
    if (u) {
      setEditingUser(u);
      setFormData({ name: u.name, email: u.email, role_id: u.role_id || (roles[0]?.id || '') });
    } else {
      setEditingUser(null);
      setFormData({ name: '', email: '', role_id: roles[0]?.id || '' });
    }
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingUser(null);
  };

  const handleDeleteUser = async (id: string, name: string) => {
    if (!user?.tenant_id) return;
    if (confirm(`Bạn có chắc chắn muốn xóa nhân viên ${name}?`)) {
      try {
        await CRMService.deleteUser(user.tenant_id, id);
        loadData();
      } catch (error) {
        console.error('Failed to delete user', error);
        alert('Có lỗi xảy ra khi xóa nhân viên');
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow border border-slate-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-slate-800">Quản lý Team Sale</h2>
        <button
          onClick={() => showForm ? handleCancel() : openForm()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
        >
          {showForm ? 'Hủy' : '+ Thêm nhân viên'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAddUser} className="mb-6 p-4 bg-slate-50 border border-slate-200 rounded-lg flex flex-col gap-4 max-w-md">
          <h3 className="font-bold text-slate-800 border-b pb-2">{editingUser ? 'Sửa thông tin nhân viên' : 'Thêm nhân viên mới'}</h3>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Tên nhân viên</label>
            <input 
              type="text" 
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input 
              type="email" 
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Phân quyền</label>
            <select 
              value={formData.role_id}
              onChange={(e) => setFormData({...formData, role_id: e.target.value})}
              className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500"
            >
              {roles.map(r => (
                <option key={r.id} value={r.id}>{r.name}</option>
              ))}
            </select>
          </div>
          <div className="flex justify-end gap-2 mt-2">
            <button type="button" onClick={handleCancel} className="px-4 py-2 border rounded text-sm text-slate-600 hover:bg-slate-100">
              Hủy
            </button>
            <button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded font-medium text-sm">
              {editingUser ? 'Cập nhật' : 'Thêm mới'}
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <div className="text-center text-slate-500 py-4">Đang tải...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-600 border-b border-slate-200">
                <th className="p-3 font-semibold text-sm">Tên</th>
                <th className="p-3 font-semibold text-sm">Email</th>
                <th className="p-3 font-semibold text-sm">Quyền</th>
                <th className="p-3 font-semibold text-sm">Ngày tham gia</th>
                <th className="p-3 font-semibold text-sm text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="p-3 text-sm font-medium text-slate-800">{user.name}</td>
                  <td className="p-3 text-sm text-slate-600">{user.email}</td>
                  <td className="p-3 text-sm">
                    <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded text-xs font-bold">
                      {user.role_data?.name || 'Chưa gán quyền'}
                    </span>
                  </td>
                  <td className="p-3 text-sm text-slate-500">
                    {new Date(user.created_at).toLocaleDateString('vi-VN')}
                  </td>
                  <td className="p-3 text-sm text-right">
                    <button 
                      onClick={() => openForm(user)}
                      className="text-blue-600 hover:text-blue-800 font-medium mr-3"
                    >
                      Sửa
                    </button>
                    <button 
                      onClick={() => handleDeleteUser(user.id, user.name)}
                      className="text-red-600 hover:text-red-800 font-medium"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-4 text-center text-slate-500 text-sm">Chưa có nhân viên nào</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
