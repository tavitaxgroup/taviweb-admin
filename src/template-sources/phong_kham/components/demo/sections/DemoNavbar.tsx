import { useState } from 'react';
import { Menu, X, Calendar } from 'lucide-react';
import { BusinessData } from '../../../types/demo';

interface DemoNavbarProps {
  business: BusinessData;
}

export default function DemoNavbar({ business }: DemoNavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleBook = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="bg-white/80 backdrop-blur-md font-sans text-slate-800 sticky top-0 border-b border-slate-100 shadow-sm z-50">
      <nav className="flex justify-between items-center gap-5 w-full px-6 md:px-12 py-4 max-w-7xl mx-auto">
        <a
          href="#"
          className="min-w-0 max-w-[340px] whitespace-normal break-words font-display text-lg font-extrabold leading-tight text-[#004ac6] tracking-tight sm:max-w-[420px] md:max-w-[500px] md:text-xl"
          title={business.name}
        >
          {business.name}
        </a>
        
        {/* Desktop Nav */}
        <div className="hidden shrink-0 md:flex items-center gap-8 font-medium">
          <a className="text-slate-600 hover:text-[#004ac6] transition-colors" href="#services">Dịch vụ</a>
          <a className="text-slate-600 hover:text-[#004ac6] transition-colors" href="#about">Về chúng tôi</a>
          <a className="text-slate-600 hover:text-[#004ac6] transition-colors" href="#why-choose-us">Ưu điểm</a>
          <a className="text-slate-600 hover:text-[#004ac6] transition-colors" href="#reviews">Đánh giá</a>
          <a className="text-slate-600 hover:text-[#004ac6] transition-colors" href="#contact">Liên hệ</a>
          <button 
            onClick={handleBook}
            className="bg-[#004ac6] text-white px-6 py-2.5 rounded-full font-bold active:scale-95 transition-all hover:bg-blue-700 shadow-lg shadow-blue-500/20 text-sm flex items-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            Đặt Lịch Hẹn
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-[#004ac6]" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-100 px-6 py-4 space-y-4 shadow-inner">
          <a onClick={() => setIsOpen(false)} className="block text-slate-600 hover:text-[#004ac6] font-medium" href="#services">Dịch vụ</a>
          <a onClick={() => setIsOpen(false)} className="block text-slate-600 hover:text-[#004ac6] font-medium" href="#about">Về chúng tôi</a>
          <a onClick={() => setIsOpen(false)} className="block text-slate-600 hover:text-[#004ac6] font-medium" href="#why-choose-us">Ưu điểm</a>
          <a onClick={() => setIsOpen(false)} className="block text-slate-600 hover:text-[#004ac6] font-medium" href="#reviews">Đánh giá</a>
          <a onClick={() => setIsOpen(false)} className="block text-slate-600 hover:text-[#004ac6] font-medium" href="#contact">Liên hệ</a>
          <button 
            onClick={() => { setIsOpen(false); handleBook(); }}
            className="w-full bg-[#004ac6] text-white px-6 py-3 rounded-xl font-bold transition-all text-center flex items-center justify-center gap-2"
          >
            <Calendar className="w-5 h-5" />
            Đặt Lịch Hẹn
          </button>
        </div>
      )}
    </header>
  );
}
