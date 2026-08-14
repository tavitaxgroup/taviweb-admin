"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { industryCatalog } from '@/lib/templates/templateCatalog';
import { Copy, CheckCircle2, Factory, Globe, LayoutTemplate, Zap, Building2, ExternalLink, Calendar as CalendarIcon, Users, Search, Plus, Edit2, Trash2, X, FileText, BookOpen, MessageSquare } from 'lucide-react';

export default function WorkspacesPage() {
  const [tenants, setTenants] = useState<any[]>([]);
  const [dbPackages, setDbPackages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTenantId, setEditingTenantId] = useState<string | null>(null);

  // Form state
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [templateKey, setTemplateKey] = useState('nha_khoa');
  const [modules, setModules] = useState<string[]>(['crm']);
  const [selectedPackageId, setSelectedPackageId] = useState<string>('');
  const [selectedDuration, setSelectedDuration] = useState<number>(1);

  // Success state
  const [newCredentials, setNewCredentials] = useState<{email: string, password: string, slug: string} | null>(null);
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchTenants();
    fetchPackages();
  }, []);

  async function fetchPackages() {
    const { data } = await supabase.from('packages').select('*').order('tier');
    if (data) setDbPackages(data);
  }

  async function fetchTenants() {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/tenants', { cache: 'no-store' });
      const data = await res.json();
      if (res.ok && data) {
        const enrichedData = data.map((t: any) => {
          const total = t.ai_quota || 0;
          const used = t.ai_used || 0;
          return {
            ...t,
            ai_package: dbPackages.find(p => p.id === t.package_id)?.name || 'Chưa đăng ký',
            package_name: dbPackages.find(p => p.id === t.package_id)?.name,
            ai_used: used,
            ai_total: total,
            package_expires_at: t.package_expires_at
          };
        });
        setTenants(enrichedData);
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  }

  function resetForm() {
    setName('');
    setSlug('');
    setTemplateKey('nha_khoa');
    setModules(['crm']);
    setSelectedPackageId('');
    setSelectedDuration(1);
    setEditingTenantId(null);
    setNewCredentials(null);
  }

  function handleOpenCreate() {
    resetForm();
    setIsModalOpen(true);
  }

  function handleOpenEdit(t: any) {
    resetForm();
    setEditingTenantId(t.id);
    setName(t.name);
    setSlug(t.slug);
    setTemplateKey(t.template_key || 'nha_khoa');
    setModules(t.active_modules || ['crm']);
    setSelectedPackageId(t.package_id || '');
    setSelectedDuration(1);
    setIsModalOpen(true);
  }

  async function handleSaveTenant(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setNewCredentials(null);
    setCopied(false);

    try {
      if (editingTenantId) {
        // Edit Mode
        const res = await fetch('/api/admin/tenants', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: editingTenantId,
            name,
            slug,
            template_key: templateKey,
            active_modules: modules
          })
        });
        
        if (!res.ok) throw new Error('Lỗi cập nhật');
        await fetchTenants();
        setIsModalOpen(false);
      } else {
        // Create Mode
        const res = await fetch('/api/admin/tenants', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, slug, templateKey, modules, packageId: selectedPackageId, durationMonths: selectedDuration })
        });

        const data = await res.json();

        if (!res.ok) {
          alert(data.error || 'Lỗi khi tạo hệ thống');
        } else {
          setNewCredentials({
            email: data.credentials.email,
            password: data.credentials.password,
            slug: data.tenant.slug
          });
          await fetchTenants();
          // Keep modal open to show credentials
        }
      }
    } catch (err) {
      alert('Lỗi kết nối đến máy chủ');
    }
    
    setIsSubmitting(false);
  }

  async function handleDeleteTenant(id: string, tenantName: string) {
    if (window.confirm(`⚠️ BÁO ĐỘNG ĐỎ: Bạn có chắc chắn muốn XÓA VĨNH VIỄN khách hàng "${tenantName}" không?\n\nToàn bộ dữ liệu của họ sẽ bị xóa và không thể khôi phục!`)) {
      const res = await fetch(`/api/admin/tenants?id=${id}`, { method: 'DELETE' });
      if (!res.ok) {
        alert('Có lỗi xảy ra khi xóa!');
      } else {
        setTenants(tenants.filter(t => t.id !== id));
      }
    }
  }

  async function handleRefillToken(id: string, name: string) {
    const amount = parseInt(prompt(`Nhập số Token muốn nạp thêm cho ${name}:`, '50000') || '0');
    if (amount > 0) {
      const tenant = tenants.find(t => t.id === id);
      const newTotal = (tenant?.ai_total || 0) + amount;
      const res = await fetch('/api/admin/tenants', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ai_quota: newTotal })
      });
      if (!res.ok) alert('Lỗi hệ thống');
      else setTenants(tenants.map(t => t.id === id ? { ...t, ai_total: newTotal, ai_quota: newTotal } : t));
    }
  }

  async function handleSelectPackage(id: string, pkgId: string) {
    const pkg = dbPackages.find(p => p.id === pkgId);
    const tenant = tenants.find(t => t.id === id);
    
    // Đổi gói thì set tổng quota bằng chính hạn mức của gói đó
    let newQuota = tenant?.ai_total || 0;
    if (pkg && pkg.added_quota > 0) {
      newQuota = pkg.added_quota;
    }

    const res = await fetch('/api/admin/tenants', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, package_id: pkgId || null, ai_quota: newQuota })
    });

    if (!res.ok) {
      alert('Lỗi hệ thống');
    } else {
      setTenants(tenants.map(t => t.id === id ? { 
        ...t, 
        package_id: pkgId,
        ai_package: pkg?.name || 'Chưa đăng ký', 
        package_name: pkg?.name,
        ai_total: newQuota,
        ai_quota: newQuota 
      } : t));
    }
  }

  function toggleModule(module: string) {
    if (modules.includes(module)) {
      setModules(modules.filter(m => m !== module));
    } else {
      setModules([...modules, module]);
    }
  }

  const handleCopyCredentials = () => {
    if (!newCredentials) return;
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://taviweb.vercel.app';
    const text = `🎉 Hệ thống của bạn đã sẵn sàng!\n\n🌐 Website: ${origin}/${newCredentials.slug}\n🔑 Đăng nhập Admin: ${origin}/admin/crm/login\n\n- Email: ${newCredentials.email}\n- Mật khẩu: ${newCredentials.password}\n\nVui lòng đổi mật khẩu sau khi đăng nhập thành công.`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const filteredTenants = tenants.filter(t => 
    t.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.slug?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Factory className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">SaaS Factory</h1>
              <p className="text-slate-500 font-medium mt-1">Trung tâm điều khiển và quản lý Vòng đời Khách hàng</p>
            </div>
          </div>
          
          <button 
            onClick={handleOpenCreate}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold shadow-md transition-all active:scale-95"
          >
            <Plus className="w-5 h-5" /> Thêm Khách Hàng
          </button>
        </div>

        {/* Bảng Dữ Liệu */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
          {/* Toolbar */}
          <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                type="text"
                placeholder="Tìm kiếm theo Tên hoặc Tên miền (Slug)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition text-sm"
              />
            </div>
            <div className="text-sm font-bold text-slate-500 bg-white px-4 py-2 rounded-lg border border-slate-200">
              Tổng số: <span className="text-indigo-600">{filteredTenants.length}</span> Hệ thống
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-bold tracking-wider">
                <tr>
                  <th className="p-4 border-b border-slate-200 w-1/5">Doanh Nghiệp</th>
                  <th className="p-4 border-b border-slate-200 w-1/6">Mô Hình</th>
                  <th className="p-4 border-b border-slate-200 w-1/6">Modules</th>
                  <th className="p-4 border-b border-slate-200 w-1/4">Gói AI & Token</th>
                  <th className="p-4 border-b border-slate-200 text-right w-1/5">Thao Tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="p-10 text-center text-slate-400">
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-3"></div>
                        Đang tải danh sách...
                      </div>
                    </td>
                  </tr>
                ) : filteredTenants.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-10 text-center text-slate-400">
                      Không tìm thấy khách hàng nào.
                    </td>
                  </tr>
                ) : filteredTenants.map(t => (
                  <tr key={t.id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="p-4">
                      <div className="font-bold text-slate-800 text-base mb-1 truncate max-w-[200px]" title={t.name}>{t.name}</div>
                      <a href={`${typeof window !== 'undefined' ? window.location.origin : 'https://taviweb.vercel.app'}/${t.slug}`} target="_blank" rel="noreferrer" className="text-indigo-600 hover:text-indigo-500 hover:underline flex items-center gap-1 text-xs font-mono">
                        <Globe className="w-3 h-3" /> /{t.slug}
                      </a>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2 text-slate-600 bg-slate-100 w-fit px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold">
                        <LayoutTemplate className="w-4 h-4 text-slate-400" />
                        {industryCatalog.find(i => i.key === t.template_key)?.name || t.template_key || 'N/A'}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {t.active_modules?.includes('crm') && (
                          <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100" title="CRM Module">
                            <Users className="w-4 h-4" />
                          </div>
                        )}
                        {t.active_modules?.includes('booking') && (
                          <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-100" title="Booking Module">
                            <CalendarIcon className="w-4 h-4" />
                          </div>
                        )}
                        {t.active_modules?.includes('cms') && (
                          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100" title="CMS Module">
                            <FileText className="w-4 h-4" />
                          </div>
                        )}
                        {t.active_modules?.includes('lms') && (
                          <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center border border-sky-100" title="LMS Module">
                            <BookOpen className="w-4 h-4" />
                          </div>
                        )}
                        {t.active_modules?.includes('chatbot') && (
                          <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-100" title="Chatbot Module">
                            <MessageSquare className="w-4 h-4" />
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      {(() => {
                        const percent = Math.min(100, Math.round((t.ai_used / t.ai_total) * 100));
                        const isWarning = percent > 85;
                        return (
                          <div className="w-full min-w-[150px]">
                            <div className="flex items-center justify-between mb-1.5">
                              <select 
                                value={t.package_id || ''}
                                onChange={(e) => handleSelectPackage(t.id, e.target.value)}
                                className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[10px] font-bold border border-slate-200 outline-none cursor-pointer max-w-[100px] text-ellipsis"
                              >
                                <option value="">Chưa đăng ký</option>
                                {dbPackages.map(p => (
                                  <option key={p.id} value={p.id}>{p.name}</option>
                                ))}
                              </select>
                              <span className={`text-xs font-bold ${isWarning ? 'text-rose-500' : 'text-emerald-500'}`}>{percent}%</span>
                            </div>
                            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden mb-1">
                              <div 
                                className={`h-full rounded-full transition-all duration-1000 ${percent > 95 ? 'bg-rose-500' : percent > 80 ? 'bg-amber-400' : 'bg-emerald-500'}`}
                                style={{ width: `${percent}%` }}
                              ></div>
                            </div>
                            <div className="font-mono text-[10px] text-slate-400 text-right">
                              <strong className={isWarning ? 'text-rose-600' : 'text-slate-700'}>{t.ai_used.toLocaleString()}</strong> / {t.ai_total.toLocaleString()}
                            </div>
                            {t.package_expires_at && (
                              <div className="text-[10px] text-slate-500 text-right mt-1 font-semibold">
                                HSD: {new Date(t.package_expires_at).toLocaleDateString('vi-VN')}
                              </div>
                            )}
                          </div>
                        );
                      })()}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => handleRefillToken(t.id, t.name)}
                          className="px-3 py-1.5 text-xs font-bold bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white rounded-lg border border-emerald-100 shadow-sm transition-colors"
                          title="Nạp Token"
                        >
                          + Nạp
                        </button>
                        <button 
                          onClick={() => handleOpenEdit(t)}
                          className="p-1.5 text-slate-500 hover:text-indigo-600 bg-white hover:bg-indigo-50 rounded-lg border border-slate-200 shadow-sm transition-colors"
                          title="Chỉnh sửa"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteTenant(t.id, t.name)}
                          className="p-1.5 text-rose-500 bg-white hover:bg-rose-500 hover:text-white rounded-lg border border-rose-200 shadow-sm transition-colors"
                          title="Xóa Khách Hàng"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* MODAL THÊM / SỬA KHÁCH HÀNG */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => !isSubmitting && setIsModalOpen(false)}></div>
          <div className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl p-6 mx-4 animate-in zoom-in-95 duration-200">
            
            <button 
              onClick={() => setIsModalOpen(false)}
              disabled={isSubmitting}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 bg-slate-100 hover:bg-slate-200 p-2 rounded-full transition"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Zap className="w-6 h-6 text-amber-500" /> 
              {editingTenantId ? 'Chỉnh sửa Khách hàng' : 'Khởi tạo Hệ thống mới'}
            </h2>

            {newCredentials ? (
              // Màn hình Thành công (Chỉ hiện khi tạo mới thành công)
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-emerald-700">Tạo thành công!</h3>
                </div>
                
                <div className="bg-white rounded-lg p-4 space-y-3 font-mono text-sm text-slate-700 mb-4 border border-slate-200 shadow-sm">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                    <span className="text-slate-500">Website:</span>
                    <a href={`${typeof window !== 'undefined' ? window.location.origin : 'https://taviweb.vercel.app'}/${newCredentials.slug}`} target="_blank" rel="noreferrer" className="text-indigo-600 hover:underline flex items-center gap-1 font-bold">
                      /{newCredentials.slug}
                    </a>
                  </div>
                  <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                    <span className="text-slate-500">Admin:</span>
                    <a href={`${typeof window !== 'undefined' ? window.location.origin : 'https://taviweb.vercel.app'}/admin/crm/login`} target="_blank" rel="noreferrer" className="text-indigo-600 hover:underline flex items-center gap-1 font-bold">
                      /admin/crm/login
                    </a>
                  </div>
                  <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                    <span className="text-slate-500">Email:</span>
                    <span className="font-bold">{newCredentials.email}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Mật khẩu:</span>
                    <span className="font-bold">{newCredentials.password}</span>
                  </div>
                </div>

                <button 
                  onClick={handleCopyCredentials}
                  className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-bold transition-colors"
                >
                  {copied ? <CheckCircle2 className="w-5 h-5 text-white" /> : <Copy className="w-5 h-5" />}
                  {copied ? 'Đã sao chép' : 'Copy thông tin bàn giao'}
                </button>
              </div>
            ) : (
              // Form Nhập liệu
              <form onSubmit={handleSaveTenant} className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Tên Doanh nghiệp <span className="text-rose-500">*</span></label>
                  <div className="relative">
                    <Building2 className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input 
                      required autoFocus
                      type="text" 
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                      placeholder="VD: Nha Khoa Tâm Đức"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Tên miền (Slug) <span className="text-rose-500">*</span></label>
                  <div className="flex items-stretch shadow-sm rounded-xl">
                    <span className="px-3 py-2.5 bg-slate-100 border border-r-0 border-slate-300 rounded-l-xl text-slate-500 text-sm flex items-center">
                      <Globe className="w-4 h-4 mr-1 opacity-70" />
                      tavisaas.com/
                    </span>
                    <input 
                      required
                      type="text" 
                      value={slug}
                      onChange={e => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))}
                      disabled={!!editingTenantId} // Không cho sửa slug nếu đang Edit
                      className="flex-1 min-w-0 px-3 py-2.5 bg-white border border-slate-300 rounded-r-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all disabled:bg-slate-100 disabled:text-slate-500"
                      placeholder="nha-khoa"
                    />
                  </div>
                  {editingTenantId && <p className="text-xs text-slate-400 mt-1">Không thể thay đổi tên miền sau khi đã khởi tạo.</p>}
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Template Giao diện <span className="text-rose-500">*</span></label>
                  <div className="relative">
                    <LayoutTemplate className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <select
                      required
                      value={templateKey}
                      onChange={e => setTemplateKey(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all appearance-none"
                    >
                      {industryCatalog.map(ind => (
                        <option key={ind.key} value={ind.key}>{ind.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Modules kích hoạt</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <label className={`flex items-center space-x-3 p-3 rounded-xl border transition-all cursor-pointer ${modules.includes('crm') ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
                      <input type="checkbox" checked={modules.includes('crm')} onChange={() => toggleModule('crm')} className="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                      <Users className="w-5 h-5" />
                      <span className="font-bold text-sm">CRM & Leads</span>
                    </label>
                    <label className={`flex items-center space-x-3 p-3 rounded-xl border transition-all cursor-pointer ${modules.includes('booking') ? 'bg-purple-50 border-purple-200 text-purple-700' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
                      <input type="checkbox" checked={modules.includes('booking')} onChange={() => toggleModule('booking')} className="w-5 h-5 rounded border-slate-300 text-purple-600 focus:ring-purple-500" />
                      <CalendarIcon className="w-5 h-5" />
                      <span className="font-bold text-sm">Booking</span>
                    </label>
                    <label className={`flex items-center space-x-3 p-3 rounded-xl border transition-all cursor-pointer ${modules.includes('cms') ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
                      <input type="checkbox" checked={modules.includes('cms')} onChange={() => toggleModule('cms')} className="w-5 h-5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500" />
                      <FileText className="w-5 h-5" />
                      <span className="font-bold text-sm">AI CMS (Bài viết)</span>
                    </label>
                    <label className={`flex items-center space-x-3 p-3 rounded-xl border transition-all cursor-pointer ${modules.includes('lms') ? 'bg-sky-50 border-sky-200 text-sky-700' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
                      <input type="checkbox" checked={modules.includes('lms')} onChange={() => toggleModule('lms')} className="w-5 h-5 rounded border-slate-300 text-sky-600 focus:ring-sky-500" />
                      <BookOpen className="w-5 h-5" />
                      <span className="font-bold text-sm">LMS (Khóa học)</span>
                    </label>
                    <label className={`flex items-center space-x-3 p-3 rounded-xl border transition-all cursor-pointer ${modules.includes('chatbot') ? 'bg-rose-50 border-rose-200 text-rose-700' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
                      <input type="checkbox" checked={modules.includes('chatbot')} onChange={() => toggleModule('chatbot')} className="w-5 h-5 rounded border-slate-300 text-rose-600 focus:ring-rose-500" />
                      <MessageSquare className="w-5 h-5" />
                      <span className="font-bold text-sm">AI Chatbot</span>
                    </label>
                  </div>
                </div>

                {!editingTenantId && (
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Đăng ký Gói AI & Token</label>
                    <div className="grid grid-cols-1 gap-3 mb-3">
                      <select 
                        value={selectedPackageId}
                        onChange={e => setSelectedPackageId(e.target.value)}
                        className="w-full px-3 py-2.5 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm font-semibold"
                      >
                        <option value="">Chưa đăng ký (Dùng thử)</option>
                        {dbPackages.map(p => (
                          <option key={p.id} value={p.id}>{p.name} - {p.added_quota.toLocaleString()} Token/tháng</option>
                        ))}
                      </select>
                    </div>
                    {selectedPackageId && (
                      <div className="flex gap-2">
                        <button type="button" onClick={() => setSelectedDuration(1)} className={`flex-1 py-2 text-xs font-bold rounded-lg border ${selectedDuration === 1 ? 'bg-indigo-50 border-indigo-500 text-indigo-700' : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'}`}>1 Tháng</button>
                        <button type="button" onClick={() => setSelectedDuration(6)} className={`flex-1 py-2 text-xs font-bold rounded-lg border ${selectedDuration === 6 ? 'bg-indigo-50 border-indigo-500 text-indigo-700' : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'}`}>6 Tháng (-10%)</button>
                        <button type="button" onClick={() => setSelectedDuration(12)} className={`flex-1 py-2 text-xs font-bold rounded-lg border ${selectedDuration === 12 ? 'bg-indigo-50 border-indigo-500 text-indigo-700' : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'}`}>1 Năm (-20%)</button>
                      </div>
                    )}
                  </div>
                )}

                <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2.5 text-slate-600 font-bold hover:bg-slate-100 rounded-xl transition"
                  >
                    Hủy bỏ
                  </button>
                  <button 
                    type="submit" 
                    disabled={isSubmitting || !name || !slug}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-2.5 rounded-xl shadow-md shadow-indigo-200 transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
                  >
                    {isSubmitting ? 'Đang xử lý...' : (editingTenantId ? 'Lưu thay đổi' : 'Khởi tạo Tenant')}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
