
-- Fix: restrict ai_chat_logs insert to user's own logs
DROP POLICY "Service can insert ai logs" ON public.ai_chat_logs;
CREATE POLICY "Users can insert own ai logs" ON public.ai_chat_logs
FOR INSERT TO authenticated
WITH CHECK (auth.uid() = user_id);
