REVOKE EXECUTE ON FUNCTION public.get_active_subscription(uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_active_subscription(uuid) TO service_role;