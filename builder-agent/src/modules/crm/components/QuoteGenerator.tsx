import React, { useState, useEffect, useRef } from 'react';
import { CRMService } from '../api/crm.service';
import { CRMProduct, CRMDeal } from '../types';
import { useAuth } from '../contexts/AuthContext';

interface QuoteGeneratorProps {
  deal: CRMDeal;
  onClose: () => void;
  onQuoteCreated: () => void;
}

export default function QuoteGenerator({ deal, onClose, onQuoteCreated }: QuoteGeneratorProps) {
  const { user } = useAuth();
  const [products, setProducts] = useState<CRMProduct[]>([]);
  const [selectedItems, setSelectedItems] = useState<Array<{ product: CRMProduct, quantity: number }>>([]);
  const [loading, setLoading] = useState(false);
  
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    if (!user?.tenant_id) return;
    try {
      const prods = await CRMService.getProducts(user.tenant_id);
      setProducts(prods);
    } catch (error) {
      console.error('Lỗi khi tải danh mục sản phẩm', error);
    }
  };

  const handleAddItem = (product: CRMProduct) => {
    const existing = selectedItems.find(i => i.product.id === product.id);
    if (existing) {
      setSelectedItems(selectedItems.map(i => i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i));
    } else {
      setSelectedItems([...selectedItems, { product, quantity: 1 }]);
    }
  };

  const handleRemoveItem = (productId: string) => {
    setSelectedItems(selectedItems.filter(i => i.product.id !== productId));
  };

  const updateQuantity = (productId: string, qty: number) => {
    if (qty < 1) return;
    setSelectedItems(selectedItems.map(i => i.product.id === productId ? { ...i, quantity: qty } : i));
  };

  const totalAmount = selectedItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  const handleGenerateQuote = async () => {
    if (selectedItems.length === 0) {
      alert("Vui lòng chọn ít nhất 1 gói dịch vụ!");
      return;
    }
    setLoading(true);
    try {
      const itemsPayload = selectedItems.map(i => ({
        product_id: i.product.id,
        product_name: i.product.name,
        quantity: i.quantity,
        unit_price: i.product.price,
        total: i.product.price * i.quantity
      }));
      if (!user) return;
      await CRMService.createQuote(user.tenant_id || '', deal.id, itemsPayload);
      
      // In PDF thông qua browser
      if (printRef.current) {
         const printContent = printRef.current.innerHTML;
         const originalContent = document.body.innerHTML;
         document.body.innerHTML = printContent;
         window.print();
         document.body.innerHTML = originalContent;
         window.location.reload(); // Khôi phục lại trạng thái React
      }

    } catch (error) {
      console.error(error);
      alert('Có lỗi khi tạo báo giá');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-slate-50 w-full max-w-5xl h-[90vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-slate-200">
        
        {/* Header */}
        <div className="flex justify-between items-center p-4 bg-slate-900 text-white">
          <h2 className="text-lg font-bold">Tạo Báo Giá - {deal.title}</h2>
          <button onClick={onClose} className="p-1 hover:bg-slate-700 rounded transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>

        {/* Layout: Trái (Chọn sản phẩm) - Phải (Preview Báo giá) */}
        <div className="flex flex-1 overflow-hidden">
          
          {/* Cột trái: Danh mục */}
          <div className="w-1/3 bg-white border-r border-slate-200 p-4 overflow-y-auto custom-scrollbar">
            <h3 className="font-bold text-slate-800 mb-4 text-sm uppercase tracking-wider">Danh mục Gói Dịch vụ</h3>
            <div className="flex flex-col gap-3">
              {products.map(prod => (
                <div key={prod.id} className="border border-slate-200 p-3 rounded-xl hover:border-indigo-400 hover:shadow-md transition-all cursor-pointer group" onClick={() => handleAddItem(prod)}>
                  <h4 className="font-bold text-slate-800 text-sm group-hover:text-indigo-600">{prod.name}</h4>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">{prod.description}</p>
                  <div className="font-bold text-emerald-600 text-sm mt-2">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(prod.price)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cột phải: Preview Báo giá */}
          <div className="w-2/3 p-6 overflow-y-auto bg-slate-100 flex flex-col items-center custom-scrollbar">
            
            {/* The Print Layout */}
            <div ref={printRef} className="bg-white p-10 shadow-xl w-full max-w-[21cm] min-h-[29.7cm] border border-slate-200 relative print-area">
              {/* Header Báo giá */}
              <div className="flex justify-between items-end border-b-2 border-slate-800 pb-6 mb-8">
                <div>
                  <h1 className="text-4xl font-black text-slate-900 tracking-tighter">BÁO GIÁ DỊCH VỤ</h1>
                  <p className="text-slate-500 font-medium mt-2">Mã BG: QTE-{new Date().getTime().toString().slice(-6)}</p>
                  <p className="text-slate-500 font-medium">Ngày lập: {new Date().toLocaleDateString('vi-VN')}</p>
                </div>
                <div className="text-right">
                  <h2 className="text-xl font-bold text-indigo-700">TAVI WEB BUILDER</h2>
                  <p className="text-sm text-slate-600 mt-1">contact@taviweb.com</p>
                  <p className="text-sm text-slate-600">+84 123 456 789</p>
                </div>
              </div>

              {/* Thông tin khách hàng */}
              <div className="mb-8 p-4 bg-slate-50 rounded-lg border border-slate-100">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Kính gửi khách hàng:</h3>
                <p className="text-lg font-bold text-slate-800">{deal.contact?.name || deal.title}</p>
                {deal.contact?.phone && <p className="text-sm text-slate-600 mt-1">SĐT: {deal.contact.phone}</p>}
                {deal.contact?.website && <p className="text-sm text-slate-600 mt-1">Web: {deal.contact.website}</p>}
              </div>

              {/* Table chi tiết */}
              <table className="w-full mb-8 text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-slate-800 text-slate-800">
                    <th className="py-3 font-bold text-sm w-12 text-center">STT</th>
                    <th className="py-3 font-bold text-sm">Hạng mục dịch vụ</th>
                    <th className="py-3 font-bold text-sm text-center w-20">SL</th>
                    <th className="py-3 font-bold text-sm text-right w-32">Đơn giá</th>
                    <th className="py-3 font-bold text-sm text-right w-40">Thành tiền</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {selectedItems.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center py-8 text-slate-400 italic">Chưa chọn gói dịch vụ nào. Hãy chọn ở danh sách bên trái.</td>
                    </tr>
                  ) : (
                    selectedItems.map((item, idx) => (
                      <tr key={idx} className="group">
                        <td className="py-4 text-sm text-slate-500 text-center">{idx + 1}</td>
                        <td className="py-4">
                          <p className="font-bold text-slate-800">{item.product.name}</p>
                          <p className="text-xs text-slate-500 mt-1 max-w-[250px]">{item.product.description}</p>
                        </td>
                        <td className="py-4 text-center">
                          {/* Ẩn nút khi in */}
                          <div className="flex items-center justify-center gap-2 print-hidden">
                            <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="w-6 h-6 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center font-bold text-slate-600">-</button>
                            <span className="font-bold text-sm w-4">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="w-6 h-6 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center font-bold text-slate-600">+</button>
                          </div>
                          {/* Hiển thị text khi in */}
                          <span className="hidden print-visible font-bold">{item.quantity}</span>
                        </td>
                        <td className="py-4 text-right font-medium text-slate-600">
                          {new Intl.NumberFormat('vi-VN').format(item.product.price)}
                        </td>
                        <td className="py-4 text-right font-bold text-slate-800 relative">
                          {new Intl.NumberFormat('vi-VN').format(item.product.price * item.quantity)}
                          <button onClick={() => handleRemoveItem(item.product.id)} className="absolute right-[-30px] top-4 text-red-400 hover:text-red-600 print-hidden">
                            ✕
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>

              {/* Tổng tiền */}
              <div className="flex justify-end pt-6 border-t-2 border-slate-800">
                <div className="w-1/2">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-slate-500 font-bold uppercase text-sm">Tổng cộng:</span>
                    <span className="text-2xl font-black text-indigo-700">
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalAmount)}
                    </span>
                  </div>
                  <p className="text-right text-xs text-slate-400 italic">(Đã bao gồm VAT 10% nếu có)</p>
                </div>
              </div>
              
              {/* Footer Báo giá */}
              <div className="absolute bottom-10 left-10 right-10 text-center text-xs text-slate-400 border-t border-slate-100 pt-6">
                Báo giá này có giá trị trong vòng 15 ngày. Cảm ơn quý khách đã tin tưởng dịch vụ của chúng tôi!
              </div>

            </div>
          </div>
        </div>
        
        {/* Footer Actions */}
        <div className="p-4 bg-white border-t border-slate-200 flex justify-end gap-3">
          <button onClick={onClose} className="px-5 py-2 rounded-lg font-bold text-slate-600 hover:bg-slate-100 transition-colors">
            Hủy bỏ
          </button>
          <button 
            onClick={handleGenerateQuote} 
            disabled={loading || selectedItems.length === 0}
            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold shadow-md shadow-indigo-200 transition-all disabled:opacity-50 flex items-center gap-2"
          >
            {loading ? 'Đang tạo...' : '💾 Lưu CRM & In PDF'}
          </button>
        </div>
        
        {/* CSS for printing hidden elements inside print area */}
        <style dangerouslySetInnerHTML={{__html: `
          @media print {
            .print-hidden { display: none !important; }
            .print-visible { display: inline !important; }
            body { margin: 0; padding: 0; }
            .print-area { box-shadow: none; border: none; }
          }
          .print-visible { display: none; }
        `}} />
      </div>
    </div>
  );
}
