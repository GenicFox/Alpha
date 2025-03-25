/*
  # Add additional fields to user profiles

  1. Changes to Tables
    - `user_profiles`
      Added fields:
      - `bio` (text) - User's biography/description
      - `avatar_url` (text) - URL to user's profile picture
      - `github_url` (text) - GitHub profile link
      - `linkedin_url` (text) - LinkedIn profile link
      - `website_url` (text) - Personal website URL
      - `skills` (text[]) - Array of user's skills
      - `interests` (text[]) - Array of user's interests
      - `achievements` (jsonb) - JSON object storing user achievements
      - `experience_level` (text) - User's experience level
      - `preferred_language` (text) - Preferred programming language

  2. Security
    - Maintain existing RLS policies
    - All new fields inherit existing row-level security
*/

-- Add new columns to user_profiles table
ALTER TABLE user_profiles
ADD COLUMN IF NOT EXISTS bio text,
ADD COLUMN IF NOT EXISTS avatar_url text,
ADD COLUMN IF NOT EXISTS github_url text,
ADD COLUMN IF NOT EXISTS linkedin_url text,
ADD COLUMN IF NOT EXISTS website_url text,
ADD COLUMN IF NOT EXISTS skills text[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS interests text[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS achievements jsonb DEFAULT '{}',
ADD COLUMN IF NOT EXISTS experience_level text,
ADD COLUMN IF NOT EXISTS preferred_language text;

-- Add check constraints for URLs
ALTER TABLE user_profiles
ADD CONSTRAINT valid_github_url CHECK (github_url IS NULL OR github_url ~ '^https?://'),
ADD CONSTRAINT valid_linkedin_url CHECK (linkedin_url IS NULL OR linkedin_url ~ '^https?://'),
ADD CONSTRAINT valid_website_url CHECK (website_url IS NULL OR website_url ~ '^https?://'),
ADD CONSTRAINT valid_avatar_url CHECK (avatar_url IS NULL OR avatar_url ~ '^https?://');

-- Add check constraint for experience level
ALTER TABLE user_profiles
ADD CONSTRAINT valid_experience_level CHECK (
  experience_level IS NULL OR
  experience_level IN ('Beginner', 'Intermediate', 'Advanced', 'Expert')
);

-- Create an index for skills array to improve search performance
CREATE INDEX IF NOT EXISTS idx_user_profiles_skills ON user_profiles USING gin(skills);

-- Create an index for interests array to improve search performance
CREATE INDEX IF NOT EXISTS idx_user_profiles_interests ON user_profiles USING gin(interests);

-- Comment on new columns
COMMENT ON COLUMN user_profiles.bio IS 'User''s biography or description';
COMMENT ON COLUMN user_profiles.avatar_url IS 'URL to user''s profile picture';
COMMENT ON COLUMN user_profiles.github_url IS 'GitHub profile URL';
COMMENT ON COLUMN user_profiles.linkedin_url IS 'LinkedIn profile URL';
COMMENT ON COLUMN user_profiles.website_url IS 'Personal website URL';
COMMENT ON COLUMN user_profiles.skills IS 'Array of user''s technical skills';
COMMENT ON COLUMN user_profiles.interests IS 'Array of user''s interests and focus areas';
COMMENT ON COLUMN user_profiles.achievements IS 'JSON object storing user achievements and badges';
COMMENT ON COLUMN user_profiles.experience_level IS 'Overall experience level of the user';
COMMENT ON COLUMN user_profiles.preferred_language IS 'User''s preferred programming language';