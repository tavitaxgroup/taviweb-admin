import { BookOpen, PlayCircle, Trophy } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase/client';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'tavi-super-secret-key-for-jwt-123';

export const dynamic = 'force-dynamic';

export default async function StudentCoursesPage() {
  let enrollments: any[] = [];
  
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('crm_token')?.value; // In a real app, student might have a different token
    
    if (token) {
      const decoded = jwt.verify(token, JWT_SECRET) as any;
      const { data } = await supabase
        .from('enrollments')
        .select(`
          id, status,
          courses (id, title, thumbnail_url, description)
        `)
        .eq('student_id', decoded.id)
        .eq('status', 'active');
        
      if (data) {
        enrollments = data;
      }
    }
  } catch (e) {
    console.error('Error loading enrolled courses:', e);
  }

  return (
    <div className="p-8 max-w-6xl mx-auto animate-in fade-in zoom-in-95 duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-3">
          <BookOpen className="w-8 h-8 text-indigo-600" />
          Khóa học của tôi
        </h1>
        <p className="text-slate-500 mt-2 font-medium">Tiếp tục hành trình học tập của bạn.</p>
      </div>

      {enrollments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrollments.map((enrollment) => {
            const course = enrollment.courses;
            // Fake progress for demo
            const progress = Math.floor(Math.random() * 100); 
            
            return (
              <div key={enrollment.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col hover:shadow-md transition-all group">
                <div className="aspect-video bg-slate-100 relative overflow-hidden">
                  {course.thumbnail_url ? (
                    <img src={course.thumbnail_url} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                      <BookOpen className="w-12 h-12" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Link href={`/student/courses/${course.id}`} className="bg-white/90 text-slate-900 px-6 py-2 rounded-full font-bold shadow-lg backdrop-blur flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all">
                      <PlayCircle className="w-5 h-5 text-indigo-600" /> Học tiếp
                    </Link>
                  </div>
                </div>
                
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-slate-900 line-clamp-2 mb-2">{course.title}</h3>
                  <p className="text-sm text-slate-500 line-clamp-2 flex-1 mb-4">{course.description || 'Chưa có mô tả.'}</p>
                  
                  <div>
                    <div className="flex justify-between items-center text-xs font-bold mb-2">
                      <span className="text-slate-500">Tiến độ hoàn thành</span>
                      <span className="text-indigo-600">{progress}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${progress}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white border-2 border-dashed border-slate-200 rounded-3xl p-12 flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 bg-indigo-50 text-indigo-500 rounded-full flex items-center justify-center mb-4">
            <Trophy className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Bạn chưa đăng ký khóa học nào!</h2>
          <p className="text-slate-500 max-w-md mx-auto mb-6">Hãy khám phá các khóa học thú vị từ trung tâm và bắt đầu nâng cao kỹ năng của bạn ngay hôm nay.</p>
          <Link href="/" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-xl transition-colors">
            Khám phá Khóa học
          </Link>
        </div>
      )}
    </div>
  );
}
