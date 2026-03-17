import type { ContentItem } from './content';

export type ContentFormValues = {
  title: string;
  slug: string;
  summary: string;
  contentType: ContentItem['contentType'];
  status: ContentItem['status'];
  priority: ContentItem['priority'];
  platform: ContentItem['platform'];
  dueDate: string;
  publishDate: string;
  notes: string;
  tags: string;
};
