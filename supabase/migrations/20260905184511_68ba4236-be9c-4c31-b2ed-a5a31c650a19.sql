
CREATE POLICY "Developers can view all roles" ON public.user_roles FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'developer'));
CREATE POLICY "Developers can grant roles" ON public.user_roles FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'developer'));
CREATE POLICY "Developers can revoke roles" ON public.user_roles FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'developer'));
GRANT SELECT, INSERT, DELETE ON public.user_roles TO authenticated;
