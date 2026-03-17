import type { ContentItem, ContentStatus } from '../types/content';

export const boardStatuses: ContentStatus[] = [
  'idea',
  'drafting',
  'editing',
  'scheduled',
  'published',
];

export function getBoardItemsByStatus(
  items: ContentItem[],
  status: ContentStatus,
) {
  return items.filter((item) => item.status === status);
}
