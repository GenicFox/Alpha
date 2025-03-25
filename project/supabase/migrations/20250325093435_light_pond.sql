/*
  # Create contact form submissions table

  1. New Tables
    - `contact_submissions`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `email` (text, required)
      - `subject` (text, required)
      - `message` (text, required)
      - `created_at` (timestamp with timezone)
      - `status` (text, default: 'pending')

  2. Security
    - Enable RLS on `contact_submissions` table
    - Add policies for:
      - Authenticated users can insert submissions
      - Only admins can view and manage submissions
*/

-- Create the contact_submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  CONSTRAINT valid_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  CONSTRAINT valid_status CHECK (status IN ('pending', 'in_progress', 'completed', 'archived'))
);

-- Enable RLS
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Enable insert access for authenticated users"
  ON contact_submissions
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Only admins can view submissions (you'll need to set up admin roles)
CREATE POLICY "Enable read access for admins"
  ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');

-- Create index for faster status-based queries
CREATE INDEX contact_submissions_status_idx ON contact_submissions (status);