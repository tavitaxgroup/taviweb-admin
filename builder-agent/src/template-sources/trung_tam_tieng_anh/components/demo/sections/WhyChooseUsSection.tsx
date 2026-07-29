"use client";
import React from 'react';
import { Target, Heart, Sparkles } from 'lucide-react';

export const WhyChooseUsSection: React.FC = () => {
  return (
    <section className="py-20 md:py-24 bg-blue-50/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* Item 1 */}
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl border border-slate-100/80 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mb-6 shadow-md shadow-blue-500/20">
              <Target size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Lộ trình rõ ràng</h3>
            <p className="text-sm md:text-base text-slate-500 leading-relaxed">
              Hệ thống bài giảng được thiết kế khoa học, bám sát năng lực thực tế và mục tiêu cụ thể của từng học viên.
            </p>
          </div>

          {/* Item 2 */}
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl border border-slate-100/80 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mb-6 shadow-md shadow-blue-500/20">
              <Heart size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Giáo viên tận tâm</h3>
            <p className="text-sm md:text-base text-slate-500 leading-relaxed">
              Đội ngũ giảng viên 8.0+ IELTS, có bề dày sư phạm quốc tế và luôn sẵn sàng hỗ trợ, truyền lửa nhiệt huyết.
            </p>
          </div>

          {/* Item 3 */}
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl border border-slate-100/80 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mb-6 shadow-md shadow-blue-500/20">
              <Sparkles size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Cộng đồng năng động</h3>
            <p className="text-sm md:text-base text-slate-500 leading-relaxed">
              Các hoạt động dã ngoại dồi dào, câu lạc bộ Debate hàng tuần, nâng cao kỹ năng mềm toàn diện.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};
