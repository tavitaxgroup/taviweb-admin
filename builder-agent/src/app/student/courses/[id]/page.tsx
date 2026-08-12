import { ArrowLeft, PlayCircle, CheckCircle2, Circle } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase/client';

export const dynamic = 'force-dynamic';

export default async function LearningPortal({ params }: { params: { id: string } }) {
  // In a real app, verify enrollment first
  let course: any = null;
  
  try {
    const { data } = await supabase
      .from('courses')
      .select(`
        *,
        modules (
          id, title, order_index,
          lessons (id, title, video_url, is_free_preview, order_index)
        )
      `)
      .eq('id', params.id)
      .single();
      
    if (data) {
      course = data;
      // Sort modules and lessons
      course.modules?.sort((a: any, b: any) => a.order_index - b.order_index);
      course.modules?.forEach((m: any) => {
        m.lessons?.sort((a: any, b: any) => a.order_index - b.order_index);
      });
    }
  } catch (e) {
    console.error('Error loading course:', e);
  }

  if (!course) {
    return <div className="p-12 text-center text-slate-500">Không tìm thấy khóa học!</div>;
  }

  // Lấy YouTube ID từ URL
  const getYoutubeId = (url: string) => {
    if (!url) return null;
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/);
    return match ? match[1] : null;
  };

  // Mặc định lấy bài đầu tiên
  const currentLesson = course.modules?.[0]?.lessons?.[0];
  const videoId = currentLesson ? getYoutubeId(currentLesson.video_url) : null;

  return (
    <div className="flex h-screen bg-slate-950 text-slate-200 overflow-hidden">
      
      {/* Cột Video Player */}
      <div className="flex-1 flex flex-col">
        {/* Navbar nhỏ gọn */}
        <div className="h-16 border-b border-slate-800 bg-slate-900 flex items-center px-6 justify-between flex-shrink-0">
          <div className="flex items-center gap-4">
            <Link href="/student/courses" className="text-slate-400 hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="font-bold text-white truncate max-w-xl">{course.title}</h1>
          </div>
          <div className="text-sm font-medium text-slate-400">
            Tiến độ: <span className="text-emerald-400">0%</span>
          </div>
        </div>

        {/* Video Area */}
        <div className="flex-1 bg-black flex flex-col p-6">
          {videoId ? (
            <div className="flex-1 w-full max-w-5xl mx-auto aspect-video rounded-2xl overflow-hidden bg-slate-900 shadow-2xl ring-1 ring-white/10">
              <iframe 
                src={`https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0`}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <div className="flex-1 w-full max-w-5xl mx-auto rounded-2xl bg-slate-900 border border-slate-800 flex flex-col items-center justify-center">
              <PlayCircle className="w-16 h-16 text-slate-700 mb-4" />
              <p className="text-slate-400 font-medium">Bài học này không có video</p>
            </div>
          )}
          
          <div className="w-full max-w-5xl mx-auto mt-6">
            <h2 className="text-2xl font-bold text-white">{currentLesson?.title || 'Chưa có bài học'}</h2>
            <div className="mt-4 flex gap-4">
              <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-lg font-bold transition-colors">
                Hoàn thành & Tiếp tục
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Cột Curriculum Menu (Bên phải) */}
      <div className="w-80 bg-slate-900 border-l border-slate-800 flex flex-col flex-shrink-0">
        <div className="p-4 border-b border-slate-800 bg-slate-900/50 font-bold text-white uppercase tracking-wider text-xs">
          Nội dung khóa học
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {course.modules?.map((m: any, mIndex: number) => (
            <div key={m.id} className="border-b border-slate-800">
              <div className="p-4 bg-slate-900/80 sticky top-0 backdrop-blur z-10">
                <h3 className="font-bold text-slate-200 text-sm">Chương {mIndex + 1}: {m.title}</h3>
                <p className="text-xs text-slate-500 mt-1">0/{m.lessons?.length || 0} bài học</p>
              </div>
              <div>
                {m.lessons?.map((l: any, lIndex: number) => {
                  const isActive = currentLesson?.id === l.id;
                  return (
                    <button key={l.id} className={`w-full text-left flex items-start gap-3 p-3 pl-4 transition-colors ${isActive ? 'bg-indigo-900/40 text-indigo-200' : 'hover:bg-slate-800 text-slate-400'}`}>
                      <div className="mt-0.5 flex-shrink-0">
                        <Circle className="w-4 h-4 text-slate-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium line-clamp-2 ${isActive ? 'text-indigo-300' : 'text-slate-300'}`}>
                          {l.title}
                        </p>
                        <p className="text-xs mt-1 opacity-60 flex items-center gap-1">
                          <PlayCircle className="w-3 h-3" /> {lIndex + 1}. Video
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
