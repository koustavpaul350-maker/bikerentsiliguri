CREATE TABLE public.booking_enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL CHECK (char_length(full_name) BETWEEN 2 AND 120),
  email text NOT NULL CHECK (char_length(email) BETWEEN 5 AND 255 AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  phone text NOT NULL CHECK (char_length(phone) BETWEEN 7 AND 20),
  motorcycle text NOT NULL CHECK (char_length(motorcycle) BETWEEN 2 AND 80),
  pickup_date date NOT NULL,
  return_date date NOT NULL,
  message text CHECK (message IS NULL OR char_length(message) <= 2000),
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT return_not_before_pickup CHECK (return_date >= pickup_date)
);

GRANT INSERT ON public.booking_enquiries TO anon, authenticated;
GRANT ALL ON public.booking_enquiries TO service_role;
ALTER TABLE public.booking_enquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a booking enquiry"
ON public.booking_enquiries FOR INSERT TO anon, authenticated
WITH CHECK (status = 'new');

CREATE OR REPLACE FUNCTION public.validate_booking_dates()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  IF NEW.pickup_date < (now() AT TIME ZONE 'Asia/Kolkata')::date THEN
    RAISE EXCEPTION 'Pickup date cannot be in the past';
  END IF;
  IF NEW.return_date < NEW.pickup_date THEN
    RAISE EXCEPTION 'Return date cannot be before pickup date';
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER booking_enquiries_validate_dates
BEFORE INSERT ON public.booking_enquiries
FOR EACH ROW EXECUTE FUNCTION public.validate_booking_dates();

CREATE TABLE public.contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL CHECK (char_length(full_name) BETWEEN 2 AND 120),
  email text NOT NULL CHECK (char_length(email) BETWEEN 5 AND 255 AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  subject text CHECK (subject IS NULL OR char_length(subject) <= 160),
  message text NOT NULL CHECK (char_length(message) BETWEEN 5 AND 2000),
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.contact_messages TO anon, authenticated;
GRANT ALL ON public.contact_messages TO service_role;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can send a contact message"
ON public.contact_messages FOR INSERT TO anon, authenticated
WITH CHECK (true);