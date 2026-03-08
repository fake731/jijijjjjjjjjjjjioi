-- Add conversation_id to group messages into conversations
ALTER TABLE public.ai_chat_logs ADD COLUMN conversation_id uuid DEFAULT gen_random_uuid();

-- Allow users to view their own chat logs (for chat history)
CREATE POLICY "Users can view own ai logs"
ON public.ai_chat_logs
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);