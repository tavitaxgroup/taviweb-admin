'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, Video, FileText, ChevronDown, ChevronRight, GripVertical } from 'lucide-react';
import { supabase } from '@/lib/supabase/client';

interface Lesson {
  id: string;
  module_id: string;
  title: string;
  video_url: string;
  is_free_preview: boolean;
  order_index: number;
}

interface Module {
  id: string;
  title: string;
  order_index: number;
  lessons: Lesson[];
}

export default function CurriculumBuilder({ courseId }: { courseId: string }) {
  const [modules, setModules] = useState<Module[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (courseId !== 'new') {
      loadCurriculum();
    } else {
      setIsLoading(false);
    }
  }, [courseId]);

  const loadCurriculum = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('modules')
        .select(`
          id, title, order_index,
          lessons (id, module_id, title, video_url, is_free_preview, order_index)
        `)
        .eq('course_id', courseId)
        .order('order_index', { ascending: true });

      if (data) {
        // Sort lessons inside modules
        const formattedModules = data.map(m => ({
          ...m,
          lessons: (m.lessons || []).sort((a: any, b: any) => a.order_index - b.order_index)
        }));
        setModules(formattedModules);
        
        // Expand all by default
        const expandState: Record<string, boolean> = {};
        formattedModules.forEach(m => { expandState[m.id] = true; });
        setExpandedModules(expandState);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleModule = (id: string) => {
    setExpandedModules(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const addModule = async () => {
    if (courseId === 'new') {
      alert('Vui lòng lưu thông tin cơ bản của khóa học trước khi thêm chương trình học!');
      return;
    }

    const title = window.prompt('Tên chương học mới:');
    if (!title) return;

    try {
      const { data, error } = await supabase
        .from('modules')
        .insert({
          course_id: courseId,
          title,
          order_index: modules.length
        })
        .select()
        .single();

      if (data) {
        setModules([...modules, { ...data, lessons: [] }]);
        setExpandedModules(prev => ({ ...prev, [data.id]: true }));
      }
    } catch (e) {
      console.error(e);
      alert('Có lỗi xảy ra khi tạo chương học.');
    }
  };

  const addLesson = async (moduleId: string, moduleIndex: number) => {
    const title = window.prompt('Tên bài học mới:');
    if (!title) return;
    
    const videoUrl = window.prompt('Link YouTube (tùy chọn):') || '';

    try {
      const currentModule = modules[moduleIndex];
      const { data, error } = await supabase
        .from('lessons')
        .insert({
          module_id: moduleId,
          title,
          video_url: videoUrl,
          order_index: currentModule.lessons.length,
          is_free_preview: currentModule.lessons.length === 0 // Make first lesson free by default
        })
        .select()
        .single();

      if (data) {
        const newModules = [...modules];
        newModules[moduleIndex].lessons.push(data);
        setModules(newModules);
      }
    } catch (e) {
      console.error(e);
      alert('Có lỗi xảy ra khi tạo bài học.');
    }
  };

  const deleteModule = async (moduleId: string, index: number) => {
    if (!confirm('Bạn có chắc chắn muốn xóa chương này cùng tất cả bài học bên trong?')) return;

    try {
      await supabase.from('modules').delete().eq('id', moduleId);
      const newModules = [...modules];
      newModules.splice(index, 1);
      setModules(newModules);
    } catch (e) {
      console.error(e);
    }
  };

  const deleteLesson = async (moduleId: string, lessonId: string, mIndex: number, lIndex: number) => {
    if (!confirm('Bạn có chắc chắn muốn xóa bài học này?')) return;

    try {
      await supabase.from('lessons').delete().eq('id', lessonId);
      const newModules = [...modules];
      newModules[mIndex].lessons.splice(lIndex, 1);
      setModules(newModules);
    } catch (e) {
      console.error(e);
    }
  };

  if (isLoading) return <div className="p-8 text-center text-slate-400">Đang tải chương trình học...</div>;

  return (
    <div className="space-y-4">
      {modules.length === 0 ? (
        <div className="text-center p-12 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50">
          <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500 font-medium">Chưa có chương học nào.</p>
          <p className="text-sm text-slate-400 mt-1 mb-4">Hãy chia khóa học thành các chương nhỏ (Module) để dễ quản lý.</p>
          <button onClick={addModule} className="bg-white border border-slate-200 text-slate-700 font-medium px-4 py-2 rounded-lg hover:bg-slate-50">
            Thêm Chương mới
          </button>
        </div>
      ) : (
        modules.map((m, mIndex) => (
          <div key={m.id} className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <GripVertical className="w-5 h-5 text-slate-400 cursor-move" />
                <button onClick={() => toggleModule(m.id)} className="p-1 hover:bg-slate-200 rounded">
                  {expandedModules[m.id] ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>
                <h3 className="font-bold text-slate-800">Chương {mIndex + 1}: {m.title}</h3>
              </div>
              <div className="flex gap-2">
                <button onClick={() => addLesson(m.id, mIndex)} className="text-sm flex items-center gap-1 font-medium text-indigo-600 hover:text-indigo-700 px-3 py-1.5 rounded-lg hover:bg-indigo-50">
                  <Plus className="w-4 h-4" /> Thêm Bài học
                </button>
                <button onClick={() => deleteModule(m.id, mIndex)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {expandedModules[m.id] && (
              <div className="p-3 bg-white space-y-2">
                {m.lessons.length === 0 ? (
                  <p className="text-sm text-slate-400 italic text-center py-4">Chưa có bài học nào trong chương này.</p>
                ) : (
                  m.lessons.map((lesson, lIndex) => (
                    <div key={lesson.id} className="flex items-center justify-between p-3 border border-slate-100 bg-slate-50 rounded-lg group">
                      <div className="flex items-center gap-3">
                        <GripVertical className="w-4 h-4 text-slate-300 cursor-move" />
                        <div className="w-8 h-8 rounded bg-indigo-100 text-indigo-600 flex items-center justify-center flex-shrink-0">
                          {lesson.video_url ? <Video className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                        </div>
                        <div>
                          <p className="font-medium text-slate-800 text-sm">Bài {lIndex + 1}: {lesson.title}</p>
                          {lesson.video_url && <p className="text-xs text-slate-400 truncate max-w-xs">{lesson.video_url}</p>}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        {lesson.is_free_preview && (
                          <span className="text-[10px] uppercase font-bold tracking-wider bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded">Học thử</span>
                        )}
                        <button onClick={() => deleteLesson(m.id, lesson.id, mIndex, lIndex)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        ))
      )}
      
      {modules.length > 0 && (
        <button onClick={addModule} className="w-full py-3 border-2 border-dashed border-slate-200 text-slate-500 font-bold hover:bg-slate-50 hover:text-slate-700 rounded-xl transition-colors flex items-center justify-center gap-2">
          <Plus className="w-5 h-5" />
          Thêm Chương học mới
        </button>
      )}
    </div>
  );
}
