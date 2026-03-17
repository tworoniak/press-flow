export type ContentStatus =
  | 'idea'
  | 'pitching'
  | 'assigned'
  | 'drafting'
  | 'editing'
  | 'scheduled'
  | 'published'
  | 'archived';

export type ContentPriority = 'low' | 'medium' | 'high' | 'urgent';

export type ContentType =
  | 'album-review'
  | 'interview'
  | 'festival-preview'
  | 'festival-review'
  | 'concert-review'
  | 'news'
  | 'feature'
  | 'social-post';

export type Platform =
  | 'website'
  | 'instagram'
  | 'facebook'
  | 'bluesky'
  | 'newsletter'
  | 'youtube';

export interface ChecklistItem {
  id: string;
  label: string;
  completed: boolean;
}

export interface RevisionEntry {
  id: string;
  timestamp: string;
  user: string;
  action: string;
}

export interface ContentItem {
  id: string;
  title: string;
  slug: string;
  summary: string;
  contentType: ContentType;
  status: ContentStatus;
  priority: ContentPriority;
  authorId: string;
  editorId?: string;
  platform: Platform;
  tags: string[];
  dueDate?: string;
  publishDate?: string;
  createdAt: string;
  updatedAt: string;
  checklist: ChecklistItem[];
  notes: string;
  seoTitle?: string;
  seoDescription?: string;
  revisionHistory: RevisionEntry[];
}
