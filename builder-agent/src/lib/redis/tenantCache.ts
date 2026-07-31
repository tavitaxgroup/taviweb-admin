import { redis } from './client'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl || 'https://placeholder.supabase.co', supabaseKey || 'placeholder', {
  auth: { persistSession: false }
})

export type CachedTenant = {
  id: string;
  name: string;
  slug: string;
  package_id: string | null;
  ai_quota: number;
  ai_used: number;
  active_modules: string[];
  isExpired: boolean;
}

export async function getTenantStatus(tenantId: string): Promise<CachedTenant | null> {
  const cacheKey = `tenant:${tenantId}`;
  
  // 1. Try get from Redis
  const cached = await redis.get<CachedTenant>(cacheKey);
  if (cached) {
    return cached;
  }
  
  // 2. Fetch from Supabase
  const { data: tenant, error } = await supabase
    .from('tenants')
    .select('id, name, slug, package_id, ai_quota, ai_used, active_modules, package_expires_at')
    .eq('id', tenantId)
    .single();
    
  if (error || !tenant) {
    return null;
  }
  
  const isExpired = tenant.package_expires_at ? new Date(tenant.package_expires_at) < new Date() : true;
  
  const payload: CachedTenant = {
    id: tenant.id,
    name: tenant.name,
    slug: tenant.slug,
    package_id: tenant.package_id,
    ai_quota: tenant.ai_quota,
    ai_used: tenant.ai_used,
    active_modules: tenant.active_modules,
    isExpired
  };
  
  // 3. Cache in Redis (TTL 60s)
  await redis.setex(cacheKey, 60, JSON.stringify(payload));
  
  return payload;
}
