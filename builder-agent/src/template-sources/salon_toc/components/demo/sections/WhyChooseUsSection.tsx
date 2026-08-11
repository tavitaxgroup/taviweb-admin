import { Scissors, Sparkles, Heart } from 'lucide-react';

export default function WhyChooseUsSection() {
  return (
    <section className="py-24 bg-[#121315] text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {/* Item 1 */}
          <div className="text-center px-4 flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-[#855316]/10 flex items-center justify-center text-[#855316] mb-6">
              <Scissors size={32} />
            </div>
            <h3 
              className="text-lg md:text-xl font-bold mb-4"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              Stylist Tận Tâm
            </h3>
            <p 
              className="text-sm text-gray-400 leading-relaxed font-normal"
              style={{ fontFamily: 'Hanken Grotesk, sans-serif' }}
            >
              Đội ngũ nghệ sĩ tóc với nhiều năm kinh nghiệm, luôn lắng nghe, tư vấn tận tình và thấu hiểu mong muốn của từng khách hàng.
            </p>
          </div>

          {/* Item 2 */}
          <div className="text-center px-4 flex flex-col items-center border-y md:border-y-0 md:border-x border-gray-800 py-12 md:py-0">
            <div className="w-16 h-16 rounded-full bg-[#855316]/10 flex items-center justify-center text-[#855316] mb-6">
              <Sparkles size={32} />
            </div>
            <h3 
              className="text-lg md:text-xl font-bold mb-4"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              Sản Phẩm Cao Cấp
            </h3>
            <p 
              className="text-sm text-gray-400 leading-relaxed font-normal"
              style={{ fontFamily: 'Hanken Grotesk, sans-serif' }}
            >
              Chúng tôi cam kết sử dụng 100% các dòng sản phẩm chăm sóc tóc organic và cao cấp từ các thương hiệu hàng đầu thế giới.
            </p>
          </div>

          {/* Item 3 */}
          <div className="text-center px-4 flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-[#855316]/10 flex items-center justify-center text-[#855316] mb-6">
              <Heart size={32} />
            </div>
            <h3 
              className="text-lg md:text-xl font-bold mb-4"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              Không Gian Sang Trọng
            </h3>
            <p 
              className="text-sm text-gray-400 leading-relaxed font-normal"
              style={{ fontFamily: 'Hanken Grotesk, sans-serif' }}
            >
              Thiết kế hiện đại, tinh tế cùng tiếng nhạc êm dịu mang đến cho quý khách những giây phút thư giãn, tái tạo năng lượng tuyệt vời.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
