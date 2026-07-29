import { supabase } from '@/lib/supabase';
import { CRMCourse, CRMClass, CRMEnrollment, CRMMaterial } from '../types';

export const LMSService = {
  // === COURSES ===
  getCourses: async (tenantId: string): Promise<CRMCourse[]> => {
    const { data, error } = await supabase
      .from('crm_courses')
      .select('*')
      .eq('tenant_id', tenantId)
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('DB Error fetching courses, using mock data:', error);
      return [
        { id: 'c1', tenant_id: tenantId, name: 'Khóa học Demo 1', description: 'Mô tả khóa học 1', price: 500000, status: 'active', created_at: new Date().toISOString() },
        { id: 'c2', tenant_id: tenantId, name: 'Khóa học Demo 2', description: 'Mô tả khóa học 2', price: 1000000, status: 'draft', created_at: new Date().toISOString() }
      ] as CRMCourse[];
    }
    return data || [];
  },

  upsertCourse: async (tenantId: string, course: Partial<CRMCourse>): Promise<CRMCourse> => {
    const { data, error } = await supabase
      .from('crm_courses')
      .upsert({ ...course, tenant_id: tenantId })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  deleteCourse: async (tenantId: string, courseId: string) => {
    const { error } = await supabase
      .from('crm_courses')
      .delete()
      .eq('tenant_id', tenantId)
      .eq('id', courseId);

    if (error) throw error;
  },

  // === CLASSES ===
  getClasses: async (tenantId: string): Promise<CRMClass[]> => {
    const { data, error } = await supabase
      .from('crm_classes')
      .select('*, course:course_id(*)')
      .eq('tenant_id', tenantId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  upsertClass: async (tenantId: string, classData: Partial<CRMClass>): Promise<CRMClass> => {
    const { data, error } = await supabase
      .from('crm_classes')
      .upsert({ ...classData, tenant_id: tenantId })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  deleteClass: async (tenantId: string, classId: string) => {
    const { error } = await supabase
      .from('crm_classes')
      .delete()
      .eq('tenant_id', tenantId)
      .eq('id', classId);

    if (error) throw error;
  },

  // === ENROLLMENTS ===
  getEnrollmentsByClass: async (tenantId: string, classId: string): Promise<CRMEnrollment[]> => {
    const { data, error } = await supabase
      .from('crm_enrollments')
      .select('*, contact:contact_id(*)')
      .eq('tenant_id', tenantId)
      .eq('class_id', classId);

    if (error) throw error;
    return data || [];
  },

  addEnrollment: async (tenantId: string, enrollment: Partial<CRMEnrollment>): Promise<CRMEnrollment> => {
    const { data, error } = await supabase
      .from('crm_enrollments')
      .insert({ ...enrollment, tenant_id: tenantId })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  updateEnrollmentStatus: async (tenantId: string, enrollmentId: string, status: string, paymentStatus: string) => {
    const { data, error } = await supabase
      .from('crm_enrollments')
      .update({ status, payment_status: paymentStatus })
      .eq('tenant_id', tenantId)
      .eq('id', enrollmentId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },
  
  deleteEnrollment: async (tenantId: string, enrollmentId: string) => {
    const { error } = await supabase
      .from('crm_enrollments')
      .delete()
      .eq('tenant_id', tenantId)
      .eq('id', enrollmentId);

    if (error) throw error;
  },

  // === MATERIALS ===
  getMaterialsByClass: async (tenantId: string, classId: string): Promise<CRMMaterial[]> => {
    const { data, error } = await supabase
      .from('crm_materials')
      .select('*')
      .eq('tenant_id', tenantId)
      .eq('class_id', classId);

    if (error) throw error;
    return data || [];
  },

  uploadMaterial: async (tenantId: string, file: File): Promise<string> => {
    // This assumes there's a bucket called 'materials'
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${tenantId}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('materials')
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    const { data } = supabase.storage.from('materials').getPublicUrl(filePath);
    return data.publicUrl;
  },

  addMaterialRecord: async (tenantId: string, material: Partial<CRMMaterial>): Promise<CRMMaterial> => {
    const { data, error } = await supabase
      .from('crm_materials')
      .insert({ ...material, tenant_id: tenantId })
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};
