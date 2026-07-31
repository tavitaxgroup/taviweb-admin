CREATE OR REPLACE FUNCTION increment_ai_used(tenant_id uuid, amount int)
RETURNS void AS $$
BEGIN
  UPDATE tenants
  SET ai_used = ai_used + amount
  WHERE id = tenant_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
