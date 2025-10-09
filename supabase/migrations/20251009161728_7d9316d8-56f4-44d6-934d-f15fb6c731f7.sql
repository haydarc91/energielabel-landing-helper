-- Add label_check_service column to contact_submissions table
ALTER TABLE public.contact_submissions 
ADD COLUMN label_check_service boolean DEFAULT false;