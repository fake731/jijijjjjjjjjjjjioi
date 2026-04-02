
-- Create inquiries table
CREATE TABLE public.inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  message text NOT NULL,
  file_name text,
  created_at timestamptz NOT NULL DEFAULT now(),
  is_read boolean NOT NULL DEFAULT false
);

-- Enable RLS
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- Anyone authenticated can insert inquiries
CREATE POLICY "Anyone can submit inquiries"
ON public.inquiries FOR INSERT
TO authenticated
WITH CHECK (true);

-- Allow anon to insert too (for non-logged-in users)
CREATE POLICY "Anon can submit inquiries"
ON public.inquiries FOR INSERT
TO anon
WITH CHECK (true);

-- Developers can view all inquiries
CREATE POLICY "Developers can view all inquiries"
ON public.inquiries FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'developer'));

-- Developers can update inquiries (mark as read)
CREATE POLICY "Developers can update inquiries"
ON public.inquiries FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'developer'));

-- Developers can delete inquiries
CREATE POLICY "Developers can delete inquiries"
ON public.inquiries FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'developer'));

-- Enable realtime for notifications
ALTER PUBLICATION supabase_realtime ADD TABLE public.inquiries;
