import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data: tenants, error: tenantsError } = await supabase.from('tenants').select('*');
    if (!tenants) return NextResponse.json({ message: 'No tenants' });

    const results = [];

    for (const tenant of tenants) {
      const email = `admin@${tenant.slug}.com`;
      const { data: existingUser } = await supabase.from('crm_users').select('id').eq('email', email).single();
      
      if (!existingUser) {
        const passwordHash = await bcrypt.hash('admin', 10);
        const { error: insertError } = await supabase.from('crm_users').insert([{
          email,
          password: 'admin',
          password_hash: passwordHash,
          name: `Quản trị viên (${tenant.name})`,
          role: 'admin',
          tenant_id: tenant.id,
          status: 'active'
        }]);
        
        if (insertError) {
          results.push(`Error inserting for ${tenant.slug}: ${insertError.message}`);
        } else {
          results.push(`Created user for ${tenant.slug}`);
        }
      } else {
        results.push(`User exists for ${tenant.slug}`);
      }
    }

    return NextResponse.json({ success: true, results });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
