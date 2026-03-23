import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sql } from '../_lib/db';

interface ContentRow {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content_type: string;
  status: string;
  priority: string;
  author_id: string;
  editor_id: string | null;
  platform: string;
  tags: string[];
  due_date: string | null;
  publish_date: string | null;
  created_at: string;
  updated_at: string;
  notes: string;
  seo_title: string | null;
  seo_description: string | null;
}

interface ChecklistRow {
  id: string;
  content_id: string;
  label: string;
  completed: boolean;
}

interface RevisionRow {
  id: string;
  content_id: string;
  timestamp: string;
  user_name: string;
  action: string;
}

function mapRowToContentItem(
  row: ContentRow,
  checklist: ChecklistRow[],
  revisions: RevisionRow[]
) {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    summary: row.summary || '',
    contentType: row.content_type,
    status: row.status,
    priority: row.priority,
    authorId: row.author_id,
    editorId: row.editor_id || undefined,
    platform: row.platform,
    tags: row.tags || [],
    dueDate: row.due_date || undefined,
    publishDate: row.publish_date || undefined,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    notes: row.notes || '',
    seoTitle: row.seo_title || undefined,
    seoDescription: row.seo_description || undefined,
    checklist: checklist.map((c) => ({
      id: c.id,
      label: c.label,
      completed: c.completed,
    })),
    revisionHistory: revisions.map((r) => ({
      id: r.id,
      timestamp: r.timestamp,
      user: r.user_name,
      action: r.action,
    })),
  };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method === 'GET') {
      // Fetch all content items with their checklists and revisions
      const contentRows = await sql`
        SELECT * FROM content_items ORDER BY created_at DESC
      `;

      const checklistRows = await sql`
        SELECT * FROM content_checklist_items
      `;

      const revisionRows = await sql`
        SELECT * FROM content_revisions ORDER BY timestamp DESC
      `;

      const items = contentRows.map((row) => {
        const checklist = checklistRows.filter(
          (c) => c.content_id === row.id
        ) as ChecklistRow[];
        const revisions = revisionRows.filter(
          (r) => r.content_id === row.id
        ) as RevisionRow[];
        return mapRowToContentItem(row as ContentRow, checklist, revisions);
      });

      return res.status(200).json(items);
    }

    if (req.method === 'POST') {
      const body = req.body;

      const result = await sql`
        INSERT INTO content_items (
          id, title, slug, summary, content_type, status, priority,
          author_id, editor_id, platform, tags, due_date, publish_date,
          notes, seo_title, seo_description
        ) VALUES (
          ${body.id},
          ${body.title},
          ${body.slug},
          ${body.summary || ''},
          ${body.contentType},
          ${body.status},
          ${body.priority},
          ${body.authorId},
          ${body.editorId || null},
          ${body.platform},
          ${body.tags || []},
          ${body.dueDate || null},
          ${body.publishDate || null},
          ${body.notes || ''},
          ${body.seoTitle || null},
          ${body.seoDescription || null}
        )
        RETURNING *
      `;

      // Insert checklist items if provided
      if (body.checklist && body.checklist.length > 0) {
        for (const item of body.checklist) {
          await sql`
            INSERT INTO content_checklist_items (id, content_id, label, completed)
            VALUES (${item.id}, ${body.id}, ${item.label}, ${item.completed})
          `;
        }
      }

      // Insert initial revision
      await sql`
        INSERT INTO content_revisions (content_id, user_name, action)
        VALUES (${body.id}, 'System', 'Created content item')
      `;

      const newItem = mapRowToContentItem(
        result[0] as ContentRow,
        body.checklist || [],
        [{ id: 'new', content_id: body.id, timestamp: new Date().toISOString(), user_name: 'System', action: 'Created content item' }]
      );

      return res.status(201).json(newItem);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
