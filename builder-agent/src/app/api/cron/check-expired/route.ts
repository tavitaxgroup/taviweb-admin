import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(req: Request) {
  try {
    // Optional: Protect cron route with a secret key if Vercel Cron is configured to send it
    const authHeader = req.headers.get('authorization');
    if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log('Running expired packages cron job...');

    // Find tenants where package_expires_at is in the past
    // and they currently have an active package.
    const { data: expiredTenants, error: fetchError } = await supabase
      .from('tenants')
      .select('id, package_name, package_expires_at')
      .not('package_name', 'is', null)
      .not('package_expires_at', 'is', null)
      .lt('package_expires_at', new Date().toISOString());

    if (fetchError) {
      throw fetchError;
    }

    if (!expiredTenants || expiredTenants.length === 0) {
      return NextResponse.json({ success: true, message: 'No expired packages found.', count: 0 });
    }

    const expiredIds = expiredTenants.map(t => t.id);
    
    // Update these tenants to remove their package
    const { error: updateError } = await supabase
      .from('tenants')
      .update({
        package_name: null,
        ai_quota: 0,
        ai_used: 0,
        package_expires_at: null
      })
      .in('id', expiredIds);

    if (updateError) {
      throw updateError;
    }

    console.log(`Successfully deactivated ${expiredIds.length} expired packages.`);
    return NextResponse.json({ success: true, count: expiredIds.length, disabledTenants: expiredIds });

  } catch (error) {
    console.error('Check Expired Packages Cron Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
