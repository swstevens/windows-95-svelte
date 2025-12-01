# Supabase Setup Instructions

## 1. Create Supabase Project
1. Go to https://supabase.com
2. Create a new project
3. Note your project URL and anon key from Settings > API

## 2. Create Database Tables

Run these SQL commands in the Supabase SQL Editor:

```sql
-- Create guestbook table
CREATE TABLE guestbook (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  message TEXT NOT NULL,
  date TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create visitor_count table
CREATE TABLE visitor_count (
  id INTEGER PRIMARY KEY DEFAULT 1,
  count INTEGER NOT NULL DEFAULT 1337,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT single_row CHECK (id = 1)
);

-- Insert initial visitor count
INSERT INTO visitor_count (id, count) VALUES (1, 1337)
ON CONFLICT (id) DO NOTHING;

-- Enable Row Level Security
ALTER TABLE guestbook ENABLE ROW LEVEL SECURITY;
ALTER TABLE visitor_count ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access on guestbook"
  ON guestbook FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public read access on visitor_count"
  ON visitor_count FOR SELECT
  TO public
  USING (true);

-- Allow public insert on guestbook only
CREATE POLICY "Allow public insert on guestbook"
  ON guestbook FOR INSERT
  TO public
  WITH CHECK (true);

-- Create index for faster queries
CREATE INDEX guestbook_created_at_idx ON guestbook(created_at DESC);
```


## 4. Configure Environment Variables

### Local Development

Create a `.env` file in the `windows-95-svelte/` directory:

```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

**IMPORTANT:** The `.env` file is already in `.gitignore` - never commit it to git!

### GitHub Pages Deployment

Add these as GitHub Repository Secrets (Settings > Secrets and variables > Actions > New repository secret):

1. `VITE_SUPABASE_URL` - Your Supabase project URL
2. `VITE_SUPABASE_ANON_KEY` - Your Supabase anon/public key

The GitHub Actions workflow (`.github/workflows/deploy.yml`) is already configured to use these secrets during the build process.

## 5. Database Schema

### guestbook table
- `id` (bigserial) - Auto-incrementing primary key
- `name` (text) - Guest name
- `message` (text) - Guest message
- `date` (text) - Display date (e.g., "Nov 18")
- `created_at` (timestamp) - Actual creation timestamp

### visitor_count table
- `id` (integer) - Always 1 (single row table)
- `count` (integer) - Current visitor count
- `updated_at` (timestamp) - Last update time

## 6. Security Notes

- Read access is public for both tables
- Only inserts are allowed on guestbook (no updates/deletes from client)
- Visitor count cannot be modified from client (you'll need to update it manually or create a database function)
- The anon key is safe to expose in client code (it has limited permissions via RLS policies)
