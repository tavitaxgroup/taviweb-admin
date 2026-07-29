'use client';

import React, { useState, useMemo } from 'react';
import SalesStatusSelect from './SalesStatusSelect';
import { extractCityDistrict } from '@/lib/utils';
import PushToCrmModal from './PushToCrmModal';
import { useAuth } from '@/modules/crm/contexts/AuthContext';

export default function LeadsTable({ initialLeads }: { initialLeads: any[] }) {
  const { user } = useAuth();
  const [dataSourceFilter, setDataSourceFilter] = useState('all');
  const [dataStatusFilter, setDataStatusFilter] = useState('all');
  const [salesStatusFilter, setSalesStatusFilter] = useState('all');
  const [industryFilter, setIndustryFilter] = useState('all');
  const [cityFilter, setCityFilter] = useState('all');
  const [districtFilter, setDistrictFilter] = useState('all');
  
  // Sorting state
  const [sortConfig, setSortConfig] = useState<{ key: string, direction: 'asc' | 'desc' } | null>({ key: 'created_at', direction: 'desc' });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;

  const [leadsToPush, setLeadsToPush] = useState<any[]>([]);
  const [selectedLeadIds, setSelectedLeadIds] = useState<Set<string>>(new Set());

  // Compute addresses for all leads
  const addressData = initialLeads.map(lead => {
    const { city, district } = extractCityDistrict(lead.formatted_address);
    return { id: lead.id, city, district };
  });

  const uniqueCities = Array.from(new Set(addressData.map(a => a.city).filter(Boolean))).sort();
  const uniqueDistricts = Array.from(new Set(
    addressData
      .filter(a => cityFilter === 'all' || a.city === cityFilter)
      .map(a => a.district)
      .filter(Boolean)
  )).sort();

  // Lấy danh sách ngành nghề độc nhất để làm menu thả xuống
  const uniqueIndustries = Array.from(new Set(initialLeads.map(lead => lead.industry).filter(Boolean)));

  const filteredLeads = useMemo(() => {
    let result = initialLeads.filter(lead => {
      let matchDataSource = true;
      if (dataSourceFilter === 'google') {
        matchDataSource = !lead.place_id?.startsWith('FB_');
      } else if (dataSourceFilter === 'facebook') {
        matchDataSource = lead.place_id?.startsWith('FB_');
      }

      let matchData = true;
      if (dataStatusFilter !== 'all') {
        if (dataStatusFilter === 'new') {
          matchData = lead.status === 'new' || lead.status === 'facebook';
        } else {
          matchData = lead.status === dataStatusFilter;
        }
      }
      
      let matchSales = true;
      if (salesStatusFilter !== 'all') {
        matchSales = lead.sales_status === salesStatusFilter;
      }

      let matchIndustry = true;
      if (industryFilter !== 'all') {
        matchIndustry = lead.industry === industryFilter;
      }

      let matchCity = true;
      let matchDistrict = true;
      if (cityFilter !== 'all' || districtFilter !== 'all') {
        const { city, district } = extractCityDistrict(lead.formatted_address);
        if (cityFilter !== 'all') matchCity = city === cityFilter;
        if (districtFilter !== 'all') matchDistrict = district === districtFilter;
      }

      return matchDataSource && matchData && matchSales && matchIndustry && matchCity && matchDistrict;
    });

    if (sortConfig !== null) {
      result.sort((a, b) => {
        let aVal = a[sortConfig.key];
        let bVal = b[sortConfig.key];
        
        if (sortConfig.key === 'city' || sortConfig.key === 'district') {
           const aLoc = extractCityDistrict(a.formatted_address);
           const bLoc = extractCityDistrict(b.formatted_address);
           aVal = sortConfig.key === 'city' ? aLoc.city : aLoc.district;
           bVal = sortConfig.key === 'city' ? bLoc.city : bLoc.district;
        }

        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    
    return result;
  }, [initialLeads, dataSourceFilter, dataStatusFilter, salesStatusFilter, industryFilter, cityFilter, districtFilter, sortConfig]);

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const totalPages = Math.ceil(filteredLeads.length / itemsPerPage);
  const paginatedLeads = filteredLeads.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }).format(date);
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const newSelected = new Set(selectedLeadIds);
      paginatedLeads.forEach(lead => newSelected.add(lead.id));
      setSelectedLeadIds(newSelected);
    } else {
      const newSelected = new Set(selectedLeadIds);
      paginatedLeads.forEach(lead => newSelected.delete(lead.id));
      setSelectedLeadIds(newSelected);
    }
  };

  const handleSelectOne = (leadId: string, checked: boolean) => {
    const newSelected = new Set(selectedLeadIds);
    if (checked) {
      newSelected.add(leadId);
    } else {
      newSelected.delete(leadId);
    }
    setSelectedLeadIds(newSelected);
  };

  const isAllCurrentPageSelected = paginatedLeads.length > 0 && paginatedLeads.every(lead => selectedLeadIds.has(lead.id));

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
      <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
        <div className="flex items-center gap-4">
          {selectedLeadIds.size > 0 && (
            <button
              onClick={() => {
                const selectedLeads = filteredLeads.filter(l => selectedLeadIds.has(l.id));
                setLeadsToPush(selectedLeads);
              }}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm transition-all flex items-center gap-2"
            >
              🚀 Đẩy {selectedLeadIds.size} Leads vào CRM
            </button>
          )}
        </div>
        <div className="text-sm text-slate-500 font-semibold">
          Hiển thị: {filteredLeads.length} / {initialLeads.length}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[1200px]">
          <thead>
            <tr className="bg-slate-900 text-white">
              <th className="p-4 w-[40px]">
                <input 
                  type="checkbox" 
                  className="rounded border-slate-600 bg-slate-800"
                  checked={isAllCurrentPageSelected}
                  onChange={handleSelectAll}
                />
              </th>
              <th className="p-4 font-bold uppercase text-xs tracking-wider w-[12%] text-left align-top cursor-pointer hover:bg-slate-800 transition" onClick={() => handleSort('name')}>
                <div className="mb-2">Tên doanh nghiệp {sortConfig?.key === 'name' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}</div>
              </th>
              <th className="p-4 font-bold uppercase text-xs tracking-wider w-[10%] text-left align-top cursor-pointer hover:bg-slate-800 transition" onClick={() => handleSort('created_at')}>
                <div className="mb-2">Ngày thêm {sortConfig?.key === 'created_at' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}</div>
              </th>
              <th className="p-4 font-bold uppercase text-xs tracking-wider w-[10%] text-left align-top">
                <div className="flex flex-col gap-2">
                  <span>Ngành nghề</span>
                  <select 
                    className="text-xs text-slate-900 bg-white border border-slate-300 rounded py-1 px-1 outline-none w-full font-normal"
                    value={industryFilter}
                    onChange={(e) => { setIndustryFilter(e.target.value); setCurrentPage(1); }}
                  >
                    <option value="all">Tất cả</option>
                    {uniqueIndustries.map((industry: any, idx) => (
                      <option key={idx} value={industry}>{industry}</option>
                    ))}
                  </select>
                </div>
              </th>
              <th className="p-4 font-bold uppercase text-xs tracking-wider w-[10%] text-left align-top cursor-pointer hover:bg-slate-800 transition" onClick={() => handleSort('formatted_phone_number')}>
                <div className="mb-2">Số điện thoại {sortConfig?.key === 'formatted_phone_number' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}</div>
              </th>
              <th className="p-4 font-bold uppercase text-xs tracking-wider w-[8%] text-left align-top">
                <div className="mb-2">Website</div>
              </th>
              <th className="p-4 font-bold uppercase text-xs tracking-wider w-[15%] text-left align-top">
                <div className="mb-2">Số nhà / Đường</div>
              </th>
              <th className="p-4 font-bold uppercase text-xs tracking-wider w-[10%] text-left align-top">
                <div className="flex flex-col gap-2">
                  <span>Quận/Huyện</span>
                  <select 
                    className="text-xs text-slate-900 bg-white border border-slate-300 rounded py-1 px-1 outline-none w-full font-normal"
                    value={districtFilter}
                    onChange={(e) => { setDistrictFilter(e.target.value); setCurrentPage(1); }}
                  >
                    <option value="all">Tất cả</option>
                    {uniqueDistricts.map((district: any, idx) => (
                      <option key={idx} value={district}>{district}</option>
                    ))}
                  </select>
                </div>
              </th>
              <th className="p-4 font-bold uppercase text-xs tracking-wider w-[10%] text-left align-top">
                <div className="flex flex-col gap-2">
                  <span>Tỉnh/Thành</span>
                  <select 
                    className="text-xs text-slate-900 bg-white border border-slate-300 rounded py-1 px-1 outline-none w-full font-normal"
                    value={cityFilter}
                    onChange={(e) => { setCityFilter(e.target.value); setDistrictFilter('all'); setCurrentPage(1); }}
                  >
                    <option value="all">Tất cả</option>
                    {uniqueCities.map((city: any, idx) => (
                      <option key={idx} value={city}>{city}</option>
                    ))}
                  </select>
                </div>
              </th>
              <th className="p-4 font-bold uppercase text-xs tracking-wider w-[8%] text-center align-top">
                <div className="flex flex-col gap-2">
                  <span>Nguồn</span>
                  <select 
                    className="text-xs text-slate-900 bg-white border border-slate-300 rounded py-1 px-1 outline-none w-full font-normal"
                    value={dataSourceFilter}
                    onChange={(e) => { setDataSourceFilter(e.target.value); setCurrentPage(1); }}
                  >
                    <option value="all">Tất cả</option>
                    <option value="google">Google Maps</option>
                    <option value="facebook">Facebook</option>
                  </select>
                </div>
              </th>
              <th className="p-4 font-bold uppercase text-xs tracking-wider w-[8%] text-center align-top">
                <div className="flex flex-col gap-2">
                  <span>Trạng thái</span>
                  <select 
                    className="text-xs text-slate-900 bg-white border border-slate-300 rounded py-1 px-1 outline-none w-full font-normal"
                    value={dataStatusFilter}
                    onChange={(e) => { setDataStatusFilter(e.target.value); setCurrentPage(1); }}
                  >
                    <option value="all">Tất cả</option>
                    <option value="new">Mới cào</option>
                    <option value="verified">Khách Xịn</option>
                    <option value="has_website">Đã Có Web</option>
                  </select>
                </div>
              </th>
              <th className="p-4 font-bold uppercase text-xs tracking-wider w-[10%] text-center sticky right-0 bg-slate-900 z-10 shadow-[-4px_0_15px_rgba(0,0,0,0.2)] align-top">
                <div className="flex flex-col gap-2">
                  <span>Hành động</span>
                  <select 
                    className="text-xs text-slate-900 bg-white border border-slate-300 rounded py-1 px-1 outline-none w-full font-normal"
                    value={salesStatusFilter}
                    onChange={(e) => { setSalesStatusFilter(e.target.value); setCurrentPage(1); }}
                  >
                    <option value="all">Lọc Sales: Tất cả</option>
                    <option value="chưa sale">Chưa Sale</option>
                    <option value="đang liên hệ">Đang liên hệ</option>
                    <option value="đã chốt">Đã chốt</option>
                    <option value="fail">Fail</option>
                  </select>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {paginatedLeads.map((lead, idx) => (
              <tr key={idx} className="hover:bg-slate-50 transition-colors group">
                <td className="p-4">
                  <input 
                    type="checkbox" 
                    className="rounded border-slate-300"
                    checked={selectedLeadIds.has(lead.id)}
                    onChange={(e) => handleSelectOne(lead.id, e.target.checked)}
                  />
                </td>
                <td className="p-4 font-semibold text-slate-800 break-words" title={lead.name}>
                  {lead.name}
                </td>
                <td className="p-4 text-xs text-slate-500 whitespace-nowrap">
                  {formatDate(lead.created_at)}
                </td>
                <td className="p-4 text-sm text-slate-500 truncate">
                  <span className="bg-slate-100 px-3 py-1 rounded-full text-xs font-bold">{lead.industry}</span>
                </td>
                <td className="p-4 font-mono text-sm font-bold text-slate-700 truncate">
                  {lead.formatted_phone_number ? (
                    lead.formatted_phone_number
                  ) : (
                    <span className="text-slate-300 italic">Trống</span>
                  )}
                </td>
                <td className="p-4 text-sm font-medium">
                   {lead.website ? (
                      <a href={lead.website.startsWith('http') ? lead.website : `https://${lead.website}`} target="_blank" className="text-blue-600 hover:underline max-w-[120px] inline-block truncate" title={lead.website}>Link</a>
                   ) : (
                      <span className="text-slate-300 italic">Trống</span>
                   )}
                </td>
                <td className="p-4 text-sm text-slate-600 truncate" title={lead.formatted_address}>
                  {extractCityDistrict(lead.formatted_address).street}
                </td>
                <td className="p-4 text-sm text-slate-600 truncate font-semibold">
                  {extractCityDistrict(lead.formatted_address).district || '-'}
                </td>
                <td className="p-4 text-sm text-blue-700 font-bold truncate">
                  {extractCityDistrict(lead.formatted_address).city || '-'}
                </td>
                <td className="p-4 text-center">
                  {lead.place_id?.startsWith('FB_') ? (
                    <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-600 px-3 py-1.5 rounded-md text-xs font-bold border border-blue-200 whitespace-nowrap">
                      Facebook
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 bg-orange-50 text-orange-600 px-3 py-1.5 rounded-md text-xs font-bold border border-orange-200 whitespace-nowrap">
                      Google Maps
                    </span>
                  )}
                </td>
                <td className="p-4 text-center">
                  {lead.status === 'verified' ? (
                    <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-md text-xs font-bold border border-emerald-200 whitespace-nowrap">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Khách Xịn
                    </span>
                  ) : lead.status === 'facebook' ? (
                    <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-600 px-3 py-1.5 rounded-md text-xs font-bold border border-slate-200 whitespace-nowrap">
                       Mới cào
                    </span>
                  ) : lead.status === 'has_website' ? (
                    <span className="inline-flex items-center gap-1 bg-rose-50 text-rose-600 px-3 py-1.5 rounded-md text-xs font-bold border border-rose-200 whitespace-nowrap">
                       Đã Có Web
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-600 px-3 py-1.5 rounded-md text-xs font-bold border border-slate-200 whitespace-nowrap">
                       Mới cào
                    </span>
                  )}
                </td>
                <td className="p-4 text-center flex items-center justify-center gap-2 sticky right-0 bg-white group-hover:bg-slate-50 transition-colors z-10 shadow-[-4px_0_15px_rgba(0,0,0,0.05)] border-l border-slate-100 flex-wrap min-h-[64px]">
                  <SalesStatusSelect leadId={lead.id} initialStatus={lead.sales_status} />
                  
                  <a 
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(lead.name + " " + lead.formatted_address)}`} 
                    target="_blank"
                    className="bg-slate-800 hover:bg-slate-900 text-white px-3 py-1.5 rounded-md text-xs font-bold shadow-sm transition-all whitespace-nowrap"
                    title="Xem trên Google Maps"
                  >
                    📍 Maps
                  </a>
                  <button
                    onClick={() => setLeadsToPush([lead])}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-md text-xs font-bold shadow-sm transition-all whitespace-nowrap"
                    title="Đẩy sang CRM"
                  >
                    🚀 Đẩy CRM
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredLeads.length === 0 && (
          <div className="text-center py-20 text-slate-500">
            Không tìm thấy dữ liệu phù hợp với bộ lọc.
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="p-4 border-t border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="text-sm text-slate-500 font-semibold">
            Trang {currentPage} / {totalPages}
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded-md text-sm font-bold border border-slate-300 disabled:opacity-50 hover:bg-slate-200"
            >
              Trang trước
            </button>
            <button 
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded-md text-sm font-bold border border-slate-300 disabled:opacity-50 hover:bg-slate-200"
            >
              Trang sau
            </button>
          </div>
        </div>
      )}

      {leadsToPush.length > 0 && (
        <PushToCrmModal 
          leads={leadsToPush}
          onClose={() => setLeadsToPush([])}
          onConfirm={async (pipelineId, stageId, assigneeId) => {
            try {
              const { CRMService } = await import('@/modules/crm/api/crm.service');
              const { AuditService } = await import('@/lib/audit.service');
              const users = user?.tenant_id ? await CRMService.getUsers(user.tenant_id) : [];
              
              for (const lead of leadsToPush) {
                let finalAssigneeId = assigneeId;
                if (!finalAssigneeId) {
                   if (users.length > 0) {
                     const randomUser = users[Math.floor(Math.random() * users.length)];
                     finalAssigneeId = randomUser.id;
                   }
                }

                if (user?.tenant_id) {
                  await CRMService.createDealAndContact(
                    user.tenant_id,
                    {
                      name: lead.name,
                      phone: lead.formatted_phone_number || '',
                      website: lead.website || '',
                      facebook_url: lead.place_id?.startsWith('FB_') ? lead.place_id.replace('FB_', '') : '',
                      source: lead.place_id?.startsWith('FB_') ? 'facebook' : 'google_maps',
                    },
                    {
                      title: `Cơ hội từ ${lead.name}`,
                      stage_id: stageId,
                      assignee_id: finalAssigneeId,
                      value: 0
                    }
                  );
                }
              }
              
              await AuditService.logActivity({
                module: 'LEADS',
                action: 'PUSH',
                entityType: 'LEAD',
                description: `Đã đẩy ${leadsToPush.length} Leads sang CRM (Pipeline ID: ${pipelineId}, Stage ID: ${stageId})`
              });

              alert(`Đã đẩy thành công ${leadsToPush.length} Leads sang CRM!`);
              setSelectedLeadIds(new Set()); // clear selection after push
              setLeadsToPush([]);
            } catch (error) {
              console.error(error);
              alert('Có lỗi xảy ra khi đẩy sang CRM');
            }
          }}
        />
      )}
    </div>
  );
}
