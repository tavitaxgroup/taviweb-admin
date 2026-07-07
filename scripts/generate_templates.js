const fs = require('fs');
const path = require('path');

const industries = [
  { id: "nha_khoa", name: "Nha khoa", color: "blue", heroMsg: "Nụ Cười Hoàn Mỹ", subMsg: "Chăm sóc nụ cười rạng rỡ của bạn với công nghệ hiện đại nhất.", s1: "Niềng răng", s2: "Trồng Răng Implant", s3: "Tẩy Trắng Răng" },
  { id: "spa", name: "Spa thẩm mỹ", color: "pink", heroMsg: "Thư Giãn Tuyệt Đối", subMsg: "Trải nghiệm không gian spa đẳng cấp và dịch vụ chăm sóc hoàn hảo.", s1: "Chăm sóc da", s2: "Massage Body", s3: "Tắm trắng" },
  { id: "tham_my_vien", name: "Thẩm mỹ viện", color: "rose", heroMsg: "Nâng Tầm Nhan Sắc", subMsg: "Khơi dậy vẻ đẹp tự nhiên của bạn với đội ngũ chuyên gia hàng đầu.", s1: "Phẫu thuật thẩm mỹ", s2: "Trẻ hóa da", s3: "Phun xăm" },
  { id: "noi_that", name: "Thiết kế nội thất", color: "slate", heroMsg: "Không Gian Sống Đẳng Cấp", subMsg: "Kiến tạo tổ ấm tương lai với thiết kế hiện đại và tinh tế.", s1: "Thiết kế 3D", s2: "Thi công trọn gói", s3: "Nội thất thông minh" },
  { id: "luat_su", name: "Văn phòng luật sư", color: "indigo", heroMsg: "Bảo Vệ Quyền Lợi Pháp Lý", subMsg: "Đồng hành cùng bạn giải quyết mọi tranh chấp và thủ tục pháp lý.", s1: "Tư vấn doanh nghiệp", s2: "Luật hình sự", s3: "Tranh chấp đất đai" },
  { id: "trung_tam_tieng_anh", name: "Trung tâm tiếng Anh", color: "cyan", heroMsg: "Chinh Phục Tiếng Anh", subMsg: "Mở khóa tương lai với phương pháp học chuẩn quốc tế.", s1: "Luyện thi IELTS", s2: "Tiếng Anh giao tiếp", s3: "Tiếng Anh trẻ em" },
  { id: "phong_kham", name: "Phòng khám đa khoa", color: "emerald", heroMsg: "Sức Khỏe Là Vàng", subMsg: "Chăm sóc sức khỏe toàn diện cho bạn và gia đình.", s1: "Khám tổng quát", s2: "Nhi khoa", s3: "Xét nghiệm" },
  { id: "studio_chup_anh", name: "Studio chụp ảnh", color: "purple", heroMsg: "Lưu Giữ Khoảnh Khắc", subMsg: "Lưu lại những thước phim và khung hình đẹp nhất của cuộc đời.", s1: "Chụp ảnh cưới", s2: "Chụp chân dung", s3: "Chụp sản phẩm" },
  { id: "nha_hang", name: "Nhà hàng sang trọng", color: "orange", heroMsg: "Hương Vị Tinh Tế", subMsg: "Trải nghiệm ẩm thực tuyệt đỉnh trong không gian lãng mạn.", s1: "Menu Á Âu", s2: "Tiệc cưới", s3: "Phòng VIP" },
  { id: "quan_cafe", name: "Quán cafe", color: "amber", heroMsg: "Góc Nhỏ Bình Yên", subMsg: "Thưởng thức ly cafe đậm đà trong không gian cực chill.", s1: "Cà phê máy", s2: "Bánh ngọt", s3: "Trà trái cây" },
  { id: "salon_toc", name: "Hair salon", color: "fuchsia", heroMsg: "Tạo Kiểu Tóc Thời Thượng", subMsg: "Thay đổi diện mạo với những kiểu tóc trend nhất hiện nay.", s1: "Cắt uốn", s2: "Nhuộm tóc", s3: "Phục hồi" },
  { id: "cong_ty_xay_dung", name: "Công ty xây dựng", color: "zinc", heroMsg: "Kiến Tạo Công Trình", subMsg: "Chất lượng, An toàn và Tiến độ là cam kết của chúng tôi.", s1: "Thi công dân dụng", s2: "Nhà xưởng", s3: "Thiết kế kiến trúc" },
  { id: "dich_vu_ve_sinh", name: "Dịch vụ vệ sinh", color: "teal", heroMsg: "Sạch Sẽ Gọn Gàng", subMsg: "Không gian sống và làm việc luôn tươi mới mỗi ngày.", s1: "Vệ sinh công nghiệp", s2: "Giặt sofa", s3: "Vệ sinh nhà cửa" },
  { id: "garage_oto", name: "Garage ô tô", color: "red", heroMsg: "Chăm Sóc Xế Yêu", subMsg: "Dịch vụ bảo dưỡng và sửa chữa ô tô chuyên nghiệp, uy tín.", s1: "Bảo dưỡng định kỳ", s2: "Sửa chữa động cơ", s3: "Đồng sơn" },
  { id: "phong_gym", name: "Phòng Gym Fitness", color: "yellow", heroMsg: "Bứt Phá Giới Hạn", subMsg: "Không gian luyện tập đạt chuẩn, máy móc hiện đại nhất.", s1: "Tập PT 1-1", s2: "Yoga", s3: "Zumba" }
];

const templateDir = path.join(__dirname, '../builder-agent/src/templates');

if (!fs.existsSync(templateDir)) {
  fs.mkdirSync(templateDir, { recursive: true });
}

industries.forEach(ind => {
  const componentName = ind.id.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('') + 'Template';
  const c = ind.color;
  
  const content = `import React from 'react';
import { Star, MapPin, Phone, CheckCircle2, ChevronRight, Calendar } from 'lucide-react';

export default function ${componentName}({ lead }: { lead: any }) {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden bg-slate-50">
        <div className="absolute inset-0 z-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-${c}-600 via-slate-50 to-slate-50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-${c}-100 text-${c}-700 font-bold text-sm mb-6">
              <Star size={16} className="fill-current" />
              Chuyên nghiệp & Uy tín
            </div>
            <h2 className="text-5xl lg:text-6xl font-black text-slate-900 leading-tight mb-6">
              {lead.name}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-${c}-600 to-${c}-400 mt-2">
                ${ind.heroMsg}
              </span>
            </h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-xl">
              ${ind.subMsg} Chúng tôi tự hào mang đến trải nghiệm tuyệt vời nhất cho bạn.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-${c}-600 hover:bg-${c}-700 text-white px-8 py-4 rounded-full font-bold shadow-lg shadow-${c}-600/30 transition-all flex items-center gap-2">
                <Calendar size={20} /> Đặt lịch ngay
              </button>
              <button className="bg-white hover:bg-slate-50 text-slate-700 px-8 py-4 rounded-full font-bold shadow-sm border border-slate-200 transition-all flex items-center gap-2">
                Tìm hiểu thêm
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-${c}-500 to-${c}-300 rounded-[3rem] rotate-3 opacity-20 scale-105 blur-lg"></div>
            <img 
              src={lead.image_url || "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80"} 
              alt={lead.name}
              className="relative z-10 rounded-[3rem] shadow-2xl object-cover h-[500px] w-full"
            />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h3 className="text-${c}-600 font-bold uppercase tracking-wider mb-2">Dịch vụ của chúng tôi</h3>
            <h2 className="text-4xl font-black text-slate-900">Giải pháp hoàn hảo cho bạn</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[ 
              { title: "${ind.s1}", desc: "Dịch vụ chất lượng cao, thực hiện bởi đội ngũ chuyên nghiệp." },
              { title: "${ind.s2}", desc: "Giải pháp toàn diện đáp ứng mọi nhu cầu của bạn." },
              { title: "${ind.s3}", desc: "Cam kết mang lại sự hài lòng tuyệt đối cho mọi khách hàng." }
            ].map((srv, i) => (
              <div key={i} className="bg-slate-50 rounded-3xl p-8 border border-slate-100 hover:shadow-xl transition-shadow group">
                <div className="w-16 h-16 bg-${c}-100 text-${c}-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <CheckCircle2 size={32} />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-3">{srv.title}</h4>
                <p className="text-slate-600 mb-6">{srv.desc}</p>
                <a href="#" className="text-${c}-600 font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                  Xem chi tiết <ChevronRight size={16} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
`;
  
  fs.writeFileSync(path.join(templateDir, `${componentName}.tsx`), content);
});

console.log('Successfully generated 15 templates with static tailwind classes!');
