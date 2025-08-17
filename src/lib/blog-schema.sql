-- Tabel untuk menyimpan artikel blog
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT,
  excerpt TEXT,
  author TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  published BOOLEAN DEFAULT false,
 slug TEXT UNIQUE,
  tags TEXT[]
);

-- Index untuk pencarian berdasarkan slug
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts (slug);

-- Index untuk pencarian berdasarkan tanggal dibuat
CREATE INDEX IF NOT EXISTS idx_blog_posts_created_at ON blog_posts (created_at DESC);

-- Index untuk pencarian berdasarkan status publikasi
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts (published);

-- Index untuk pencarian berdasarkan tags
CREATE INDEX IF NOT EXISTS idx_blog_posts_tags ON blog_posts USING GIN (tags);

-- Trigger untuk memperbarui updated_at setiap kali ada perubahan
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_blog_posts_updated_at 
  BEFORE UPDATE ON blog_posts 
  FOR EACH ROW 
  EXECUTE PROCEDURE update_updated_at_column();