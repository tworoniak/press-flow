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
  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid ID' });
  }

  try {
    if (req.method === 'GET') {
      const contentRows = await sql`
        SELECT * FROM content_items WHERE id = ${id}
      `;

      if (contentRows.length === 0) {
        return res.status(404).json({ error: 'Content not found' });
      }

      const checklistRows = await sql`
        SELECT * FROM content_checklist_items WHERE content_id = ${id}
      `;

      const revisionRows = await sql`
        SELECT * FROM content_revisions WHERE content_id = ${id} ORDER BY timestamp DESC
      `;

      const item = mapRowToContentItem(
        contentRows[0] as ContentRow,
        checklistRows as ChecklistRow[],
        revisionRows as RevisionRow[]
      );

      return res.status(200).json(item);
    }

    if (req.method === 'PUT' || req.method === 'PATCH') {
      const body = req.body;

      // Build dynamic update query
      const result = await sql`
        UPDATE content_items SET
          title = COALESCE(${body.title}, title),
          slug = COALESCE(${body.slug}, slug),
          summary = COALESCE(${body.summary}, summary),
          content_type = COALESCE(${body.contentType}, content_type),
          status = COALESCE(${body.status}, status),
          priority = COALESCE(${body.priority}, priority),
          author_id = COALESCE(${body.authorId}, author_id),
          editor_id = COALESCE(${body.editorId}, editor_id),
          platform = COALESCE(${body.platform}, platform),
          tags = COALESCE(${body.tags}, tags),
          due_date = COALESCE(${body.dueDate}, due_date),
          publish_date = COALESCE(${body.publishDate}, publish_date),
          notes = COALESCE(${body.notes}, notes),
          seo_title = COALESCE(${body.seoTitle}, seo_title),
          seo_description = COALESCE(${body.seoDescription}, seo_description),
          updated_at = NOW()
        WHERE id = ${id}
        RETURNING *
      `;

      if (result.length === 0) {
        return res.status(404).json({ error: 'Content not found' });
      }

      // Update checklist items if provided
      if (body.checklist) {
        // Delete existing and re-insert
        await sql`DELETE FROM content_checklist_items WHERE content_id = ${id}`;
        for (const item of body.checklist) {
          await sql`
            INSERT INTO content_checklist_items (id, content_id, label, completed)
            VALUES (${item.id}, ${id}, ${item.label}, ${item.completed})
          `;
        }
      }

      // Add revision entry for the update
      if (body.status) {
        await sql`
          INSERT INTO content_revisions (content_id, user_name, action)
          VALUES (${id}, 'System', ${'Changed status to ' + body.status})
        `;
      }

      const checklistRows = await sql`
        SELECT * FROM content_checklist_items WHERE content_id = ${id}
      `;

      const revisionRows = await sql`
        SELECT * FROM content_revisions WHERE content_id = ${id} ORDER BY timestamp DESC
      `;

      const updatedItem = mapRowToContentItem(
        result[0] as ContentRow,
        checklistRows as ChecklistRow[],
        revisionRows as RevisionRow[]
      );

      return res.status(200).json(updatedItem);
    }

    if (req.method === 'DELETE') {
      const result = await sql`
        DELETE FROM content_items WHERE id = ${id} RETURNING id
      `;

      if (result.length === 0) {
        return res.status(404).json({ error: 'Content not found' });
      }

      return res.status(200).json({ id });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
