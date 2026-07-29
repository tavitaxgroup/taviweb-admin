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
  const [newUser, setNewUser] = useState({ name: '', email: '', role_id: '' });

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
        setNewUser(prev => ({ ...prev, role_id: r[0].id }));
      }
    } catch (error) {
      console.error('Failed to load data', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email || !newUser.role_id || !user?.tenant_id) return;
    try {
      await CRMService.createUser(user.tenant_id, {
        name: newUser.name,
        email: newUser.email,
        role_id: newUser.role_id
      });
      setShowForm(false);
      setNewUser({ name: '', email: '', role_id: roles[0]?.id || '' });
      loadData();
    } catch (error) {
      console.error('Failed to add user', error);
      alert('Có lỗi xảy ra khi thêm nhân viên');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow border border-slate-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-slate-800">Quản lý Team Sale</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
        >
          {showForm ? 'Hủy' : '+ Thêm nhân viên'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAddUser} className="mb-6 p-4 bg-slate-50 border border-slate-200 rounded-lg flex flex-col gap-4 max-w-md">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Tên nhân viên</label>
            <input 
              type="text" 
              required
              value={newUser.name}
              onChange={(e) => setNewUser({...newUser, name: e.target.value})}
              className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input 
              type="email" 
              required
              value={newUser.email}
              onChange={(e) => setNewUser({...newUser, email: e.target.value})}
              className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Phân quyền</label>
            <select 
              value={newUser.role_id}
              onChange={(e) => setNewUser({...newUser, role_id: e.target.value})}
              className="w-full border border-slate-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500"
            >
              {roles.map(r => (
                <option key={r.id} value={r.id}>{r.name}</option>
              ))}
            </select>
          </div>
          <button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded font-medium text-sm">
            Lưu
          </button>
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
