
-- Create notifications table
CREATE TABLE public.notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  message text NOT NULL,
  is_read boolean NOT NULL DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  sent_by uuid REFERENCES auth.users(id) ON DELETE SET NULL
);

-- NULL user_id means broadcast to all users
-- Enable RLS
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Users can see their own notifications + broadcast notifications
CREATE POLICY "Users can view own notifications"
ON public.notifications
FOR SELECT
TO authenticated
USING (user_id = auth.uid() OR user_id IS NULL);

-- Users can update (mark as read) their own notifications
CREATE POLICY "Users can update own notifications"
ON public.notifications
FOR UPDATE
TO authenticated
USING (user_id = auth.uid() OR user_id IS NULL);

-- Developers can insert notifications
CREATE POLICY "Developers can insert notifications"
ON public.notifications
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'developer'));

-- Developers can view all notifications
CREATE POLICY "Developers can view all notifications"
ON public.notifications
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'developer'));

-- Developers can delete notifications
CREATE POLICY "Developers can delete notifications"
ON public.notifications
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'developer'));
