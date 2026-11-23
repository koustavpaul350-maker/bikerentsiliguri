DROP POLICY IF EXISTS "Anyone can send a contact message" ON public.contact_messages;

CREATE POLICY "Anyone can send a valid contact message"
ON public.contact_messages FOR INSERT TO anon, authenticated
WITH CHECK (
  char_length(btrim(full_name)) BETWEEN 2 AND 120
  AND char_length(email) <= 255
  AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND (subject IS NULL OR char_length(subject) <= 160)
  AND char_length(btrim(message)) BETWEEN 5 AND 2000
  AND created_at >= now() - interval '5 minutes'
  AND created_at <= now() + interval '5 minutes'
);