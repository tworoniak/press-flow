-- Create content_items table for PressFlow
CREATE TABLE IF NOT EXISTS content_items (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  summary TEXT NOT NULL DEFAULT '',
  content_type TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'idea',
  priority TEXT NOT NULL DEFAULT 'medium',
  author_id TEXT NOT NULL,
  editor_id TEXT,
  platform TEXT NOT NULL DEFAULT 'website',
  tags TEXT[] DEFAULT '{}',
  due_date DATE,
  publish_date DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  checklist JSONB DEFAULT '[]',
  notes TEXT DEFAULT '',
  seo_title TEXT DEFAULT '',
  seo_description TEXT DEFAULT '',
  revision_history JSONB DEFAULT '[]'
);

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS idx_content_items_status ON content_items(status);
CREATE INDEX IF NOT EXISTS idx_content_items_content_type ON content_items(content_type);
CREATE INDEX IF NOT EXISTS idx_content_items_author_id ON content_items(author_id);
CREATE INDEX IF NOT EXISTS idx_content_items_due_date ON content_items(due_date);
CREATE INDEX IF NOT EXISTS idx_content_items_publish_date ON content_items(publish_date);

-- Insert seed data
INSERT INTO content_items (id, title, slug, summary, content_type, status, priority, author_id, editor_id, platform, tags, due_date, publish_date, created_at, updated_at, checklist, notes, seo_title, seo_description, revision_history)
VALUES 
  (
    'content-1',
    'Spiritbox – Tsunami Sea Review',
    'spiritbox-tsunami-sea-review',
    'Album review draft covering standout tracks, vocal performance, and overall atmosphere.',
    'album-review',
    'editing',
    'high',
    'tm-2',
    'tm-1',
    'website',
    ARRAY['Spiritbox', 'Album Review', 'Metalcore'],
    '2026-03-18',
    '2026-03-20',
    '2026-03-10T09:00:00.000Z',
    '2026-03-15T14:30:00.000Z',
    '[{"id": "c1-1", "label": "Draft complete", "completed": true}, {"id": "c1-2", "label": "Quotes verified", "completed": true}, {"id": "c1-3", "label": "SEO complete", "completed": false}, {"id": "c1-4", "label": "Social copy written", "completed": false}]',
    'Needs stronger closing paragraph and final score confirmation before publish.',
    'Spiritbox Tsunami Sea Review | PressFlow',
    'A detailed review of Spiritbox''s Tsunami Sea with highlights, performance notes, and final verdict.',
    '[{"id": "r1-1", "timestamp": "2026-03-12T11:00:00.000Z", "user": "Jamie Carter", "action": "Submitted first draft"}, {"id": "r1-2", "timestamp": "2026-03-15T14:30:00.000Z", "user": "Thomas Woroniak", "action": "Requested edits to intro and conclusion"}]'
  ),
  (
    'content-2',
    'Aftershock 2026 Festival Preview',
    'aftershock-2026-festival-preview',
    'Preview piece focused on major headliners, daily highlights, and must-see undercard acts.',
    'festival-preview',
    'drafting',
    'urgent',
    'tm-4',
    'tm-1',
    'website',
    ARRAY['Aftershock', 'Festival Preview', 'Live Music'],
    '2026-03-22',
    '2026-03-25',
    '2026-03-11T08:15:00.000Z',
    '2026-03-14T18:00:00.000Z',
    '[{"id": "c2-1", "label": "Draft complete", "completed": false}, {"id": "c2-2", "label": "Lineup checked", "completed": true}, {"id": "c2-3", "label": "Images ready", "completed": false}, {"id": "c2-4", "label": "Social copy written", "completed": false}]',
    'Need final daily lineup confirmation and stronger section for emerging bands.',
    'Aftershock 2026 Festival Preview | PressFlow',
    'A preview of Aftershock 2026 featuring headliners, lineup highlights, and anticipated sets.',
    '[{"id": "r2-1", "timestamp": "2026-03-11T08:15:00.000Z", "user": "Thomas Woroniak", "action": "Created content item"}, {"id": "r2-2", "timestamp": "2026-03-14T18:00:00.000Z", "user": "Morgan Lee", "action": "Added lineup notes and outline"}]'
  ),
  (
    'content-3',
    'Interview: Yngwie Malmsteen on Touring and Legacy',
    'interview-yngwie-malmsteen-touring-legacy',
    'Interview feature centered on current touring plans, musicianship, and career perspective.',
    'interview',
    'scheduled',
    'high',
    'tm-1',
    'tm-1',
    'website',
    ARRAY['Interview', 'Yngwie Malmsteen', 'Guitar'],
    '2026-03-12',
    '2026-03-17',
    '2026-03-05T10:00:00.000Z',
    '2026-03-13T16:45:00.000Z',
    '[{"id": "c3-1", "label": "Transcript cleaned", "completed": true}, {"id": "c3-2", "label": "Quotes verified", "completed": true}, {"id": "c3-3", "label": "SEO complete", "completed": true}, {"id": "c3-4", "label": "Social copy written", "completed": true}]',
    'Ready to publish Tuesday morning.',
    'Yngwie Malmsteen Interview | PressFlow',
    'An interview discussing touring, legacy, and musicianship with Yngwie Malmsteen.',
    '[{"id": "r3-1", "timestamp": "2026-03-08T09:30:00.000Z", "user": "Thomas Woroniak", "action": "Uploaded cleaned transcript"}, {"id": "r3-2", "timestamp": "2026-03-13T16:45:00.000Z", "user": "Thomas Woroniak", "action": "Marked item as scheduled"}]'
  ),
  (
    'content-4',
    'Louder Than Life Social Promo Pack',
    'louder-than-life-social-promo-pack',
    'A set of social promo copy variations for upcoming festival coverage posts.',
    'social-post',
    'assigned',
    'medium',
    'tm-2',
    'tm-1',
    'instagram',
    ARRAY['Social Media', 'Louder Than Life', 'Promo'],
    '2026-03-19',
    '2026-03-21',
    '2026-03-13T12:00:00.000Z',
    '2026-03-13T12:00:00.000Z',
    '[{"id": "c4-1", "label": "Captions drafted", "completed": false}, {"id": "c4-2", "label": "Hashtags reviewed", "completed": false}, {"id": "c4-3", "label": "Graphic assets ready", "completed": false}]',
    'Need three caption tone variations: hype, informative, and concise.',
    '',
    '',
    '[{"id": "r4-1", "timestamp": "2026-03-13T12:00:00.000Z", "user": "Thomas Woroniak", "action": "Assigned social promo task"}]'
  )
ON CONFLICT (id) DO NOTHING;
