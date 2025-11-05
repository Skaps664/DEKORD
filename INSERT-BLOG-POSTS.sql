-- Insert the three existing blog posts into the database
-- Run this in your Supabase SQL Editor

-- First, let's insert the blog posts
INSERT INTO blog_posts (
  title,
  slug,
  excerpt,
  content,
  featured_image,
  author_id,
  author_name,
  category,
  tags,
  status,
  featured,
  view_count,
  like_count,
  published_at,
  created_at,
  updated_at
) VALUES 
(
  'dekord: Where Love Meets Hard Work',
  'dekord-where-love-meets-hard-work',
  'Every product we create is a promise. A promise that you won''t have to deal with frayed cables, slow charging, or unreliable connections. We test, refine, and perfect until we''re confident you''ll love what we''ve built.',
  '<h2>We Don''t Just Build Products—We Build Trust</h2>
<p>Every product we create is a promise. A promise that you won''t have to deal with frayed cables, slow charging, or unreliable connections. We test, refine, and perfect until we''re confident you''ll love what we''ve built.</p>

<h3>Behind the Scenes: How We Build</h3>
<p>Our process is simple:</p>
<ul>
  <li><strong>Design with care:</strong> We focus on everyday needs—charging your phone, syncing data, powering your laptop.</li>
  <li><strong>Choose quality materials:</strong> From braided nylon to reinforced connectors, every component is selected to last.</li>
  <li><strong>Test rigorously:</strong> We bend, twist, pull, and push every product through real-world scenarios to ensure it holds up over time.</li>
  <li><strong>Deliver with pride:</strong> When our product reaches you, we want you to feel the difference immediately.</li>
</ul>

<h3>Why This Matters to Pakistan</h3>
<p>For too long, Pakistani consumers have had to choose between low-quality local alternatives or expensive imported products. We''re changing that narrative. dekord is proof that Pakistan can produce world-class technology accessories that rival international brands—without the inflated price tags.</p>

<h3>What Drives Us</h3>
<p>It''s not just about cables or chargers. It''s about respect—for your time, your money, and your expectations. We know that when you choose dekord, you''re trusting us to deliver. That trust is what drives us to do better every single day.</p>

<p>This is more than a business. It''s a commitment to excellence, built on love for what we do and hard work to make it real.</p>',
  '/premium-braided-cable-lifestyle.jpg',
  (SELECT id FROM auth.users LIMIT 1), -- Use first admin user
  'dekord Team',
  'Brand Story',
  ARRAY['brand', 'story', 'quality', 'pakistan'],
  'published',
  true,
  0,
  0,
  '2025-11-03T10:00:00Z',
  NOW(),
  NOW()
),
(
  'Dekord is Launching Soon',
  'dekord-launching-soon',
  'At Dekord, we believe Pakistan deserves world-class technology made right here at home. We are proud to announce that Dekord (SMC-Private) Limited is officially launching its first flagship product this October.',
  '<h2>Pakistan Deserves Premium Tech—Made Here</h2>
<p>At Dekord, we believe Pakistan deserves world-class technology made right here at home. We are proud to announce that Dekord (SMC-Private) Limited is officially launching its first flagship product this October.</p>

<h3>What We''re Launching</h3>
<p>Our debut product is a premium braided charging cable—engineered for durability, speed, and reliability. It''s not just another cable. It''s a statement that Pakistan can build products that compete globally.</p>

<h3>Why Now?</h3>
<p>Because it''s time. Time to stop settling for subpar products that break after a few weeks. Time to stop paying premium prices for imported goods. Time to support local innovation that actually works.</p>

<h3>What Makes Us Different</h3>
<ul>
  <li><strong>Premium Quality:</strong> Every cable is built with reinforced connectors and military-grade braided nylon.</li>
  <li><strong>Fast Charging:</strong> Supports rapid charging protocols for all your devices.</li>
  <li><strong>Built to Last:</strong> Tested to withstand 10,000+ bends and pulls.</li>
  <li><strong>Made with Pride:</strong> Designed and manufactured with Pakistani craftsmanship.</li>
</ul>

<h3>Join Us on This Journey</h3>
<p>This is just the beginning. Stay tuned for our official launch date, exclusive pre-order offers, and a behind-the-scenes look at how we''re building the future of tech accessories in Pakistan.</p>

<p>Together, we''re redefining what "Made in Pakistan" means.</p>',
  '/braided-cable-coiled-aesthetic-still.jpg',
  (SELECT id FROM auth.users LIMIT 1),
  'dekord Team',
  'Product Launch',
  ARRAY['launch', 'product', 'pakistan', 'premium'],
  'published',
  true,
  0,
  0,
  '2025-10-01T10:00:00Z',
  NOW(),
  NOW()
),
(
  'dekord – Defy Ordinary: Premium Charging Cables in Pakistan',
  'dekord-defy-ordinary',
  'Why should Pakistan always settle for ordinary? We''re building the country''s first premium charging accessories brand — one that focuses on durability, performance, and trust.',
  '<h2>Defy Ordinary</h2>
<p>Why should Pakistan always settle for ordinary? We''re building the country''s first premium charging accessories brand — one that focuses on durability, performance, and trust.</p>

<h3>The Problem We''re Solving</h3>
<p>Walk into any electronics market in Pakistan, and you''ll find hundreds of charging cables. But here''s the catch: most of them break within weeks. Frayed wires, loose connectors, slow charging—it''s the same story every time.</p>

<p>Meanwhile, premium international brands charge thousands of rupees for a single cable. The average Pakistani consumer is stuck between cheap quality and expensive imports.</p>

<h3>Our Solution: Premium Quality at Fair Prices</h3>
<p>dekord was born from a simple belief: Pakistan deserves better. We''re creating premium charging accessories that:</p>
<ul>
  <li><strong>Last longer:</strong> Reinforced with military-grade materials</li>
  <li><strong>Charge faster:</strong> Support for rapid charging protocols</li>
  <li><strong>Look better:</strong> Sleek, modern designs that complement your devices</li>
  <li><strong>Cost less:</strong> Premium quality without the premium markup</li>
</ul>

<h3>Built for Pakistan, By Pakistan</h3>
<p>Every dekord product is designed with Pakistani consumers in mind. We understand the local market, the price sensitivity, and the quality expectations. That''s why we''re committed to delivering products that exceed expectations without breaking the bank.</p>

<h3>Join the Movement</h3>
<p>This is more than just a brand launch. It''s a movement to change how Pakistan perceives locally-made technology products. We''re proving that "Made in Pakistan" can mean premium, reliable, and world-class.</p>

<p>Don''t settle for ordinary. Defy it with dekord.</p>',
  '/premium-braided-cable-lifestyle.jpg',
  (SELECT id FROM auth.users LIMIT 1),
  'dekord Team',
  'Brand Story',
  ARRAY['brand', 'story', 'defy-ordinary', 'pakistan', 'premium'],
  'published',
  false,
  0,
  0,
  '2025-09-15T10:00:00Z',
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  content = EXCLUDED.content,
  featured_image = EXCLUDED.featured_image,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags,
  updated_at = NOW();

-- Verify the insert
SELECT id, title, slug, status, featured, published_at, category
FROM blog_posts 
ORDER BY published_at DESC;
