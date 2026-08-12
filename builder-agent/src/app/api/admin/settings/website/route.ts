import { NextResponse } from 'next/server';
import { adminSupabase } from '@/lib/supabase';
import { WebsiteOverrides } from '@/types/demo';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'tavi-super-secret-key-for-jwt-123';

async function getTenantId() {
  const cookieStore = await cookies();
  const token = cookieStore.get('crm_token')?.value;
  if (!token) return null;
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    return decoded.tenant_id;
  } catch (err) {
    return null;
  }
}

export async function POST(request: Request) {
  try {
    const tenantId = await getTenantId();
    if (!tenantId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const overrides: WebsiteOverrides = await request.json();

    // Fetch existing theme_config
    const { data: tenant, error: fetchError } = await adminSupabase
      .from('tenants')
      .select('theme_config')
      .eq('id', tenantId)
      .single();

    if (fetchError || !tenant) {
      return NextResponse.json({ error: 'Tenant not found' }, { status: 404 });
    }

    // Merge new overrides into theme_config
    const currentThemeConfig = tenant.theme_config || {};
    const newThemeConfig = {
      ...currentThemeConfig,
      website_overrides: {
        ...(currentThemeConfig.website_overrides || {}),
        ...overrides,
        hero: {
          ...(currentThemeConfig.website_overrides?.hero || {}),
          ...overrides.hero,
        },
        about: {
          ...(currentThemeConfig.website_overrides?.about || {}),
          ...overrides.about,
        }
      }
    };

    const { error: updateError } = await adminSupabase
      .from('tenants')
      .update({ theme_config: newThemeConfig })
      .eq('id', tenantId);

    if (updateError) {
      return NextResponse.json({ error: 'Failed to update website settings' }, { status: 500 });
    }

    return NextResponse.json({ success: true, theme_config: newThemeConfig });
  } catch (error) {
    console.error('Error in POST /api/admin/settings/website:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const tenantId = await getTenantId();
    if (!tenantId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: tenant, error: fetchError } = await adminSupabase
      .from('tenants')
      .select('theme_config, slug, custom_domain')
      .eq('id', tenantId)
      .single();

    if (fetchError) {
      console.error('Error fetching tenant theme_config:', fetchError);
      return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
    }

    const websiteOverrides = tenant?.theme_config?.website_overrides || {};
    return NextResponse.json({
      ...websiteOverrides,
      _slug: tenant.slug,
      _custom_domain: tenant.custom_domain
    });
  } catch (error) {
    console.error('Error in GET /api/admin/settings/website:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
