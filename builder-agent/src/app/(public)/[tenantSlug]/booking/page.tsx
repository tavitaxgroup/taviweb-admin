import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import PublicBookingForm from "@/modules/booking/components/PublicBookingForm";

export default async function PublicBookingPage({ params }: { params: Promise<{ tenantSlug: string }> }) {
  const resolvedParams = await params;
  
  const { data: tenant } = await supabase
    .from('tenants')
    .select('id, name, template_key')
    .eq('slug', resolvedParams.tenantSlug)
    .single();

  if (!tenant) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-slate-50 to-purple-50 flex items-start justify-center p-4 md:p-8 relative overflow-x-hidden">
      {/* Ambient background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-indigo-200/40 rounded-full blur-[120px]"></div>
        <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-purple-200/40 rounded-full blur-[120px]"></div>
      </div>
      
      <div className="w-full max-w-5xl relative z-10 py-12">
        <PublicBookingForm 
          tenantId={tenant.id} 
          tenantName={tenant.name} 
          templateKey={tenant.template_key || 'salon'} 
        />
      </div>
    </div>
  );
}
