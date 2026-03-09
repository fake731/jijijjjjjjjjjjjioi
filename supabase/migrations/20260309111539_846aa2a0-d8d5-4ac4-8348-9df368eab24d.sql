
-- Add image_urls column to ai_chat_logs
ALTER TABLE public.ai_chat_logs ADD COLUMN IF NOT EXISTS image_urls text[] DEFAULT '{}';

-- Create storage bucket for AI chat images
INSERT INTO storage.buckets (id, name, public) VALUES ('ai-chat-images', 'ai-chat-images', true)
ON CONFLICT (id) DO NOTHING;

-- Allow authenticated users to upload to ai-chat-images bucket
CREATE POLICY "Authenticated users can upload ai images"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'ai-chat-images');

-- Allow public read access
CREATE POLICY "Public can view ai images"
ON storage.objects FOR SELECT TO public
USING (bucket_id = 'ai-chat-images');

-- Allow service role to manage (for edge functions)
CREATE POLICY "Service role can manage ai images"
ON storage.objects FOR ALL TO service_role
USING (bucket_id = 'ai-chat-images');
