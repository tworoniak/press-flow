import dayjs from 'dayjs';
import type { ContentItem, ContentStatus } from '../types/content';

export function countByStatus(items: ContentItem[], status: ContentStatus) {
  return items.filter((item) => item.status === status).length;
}

export function getOverdueItems(items: ContentItem[]) {
  const today = dayjs().startOf('day');

  return items.filter((item) => {
    if (!item.dueDate) return false;
    return dayjs(item.dueDate).isBefore(today) && item.status !== 'published';
  });
}

export function getDueThisWeek(items: ContentItem[]) {
  const start = dayjs().startOf('week');
  const end = dayjs().endOf('week');

  return items.filter((item) => {
    if (!item.dueDate) return false;
    const due = dayjs(item.dueDate);
    return due.isAfter(start) && due.isBefore(end);
  });
}

export function getScheduledItems(items: ContentItem[]) {
  return items.filter((item) => item.status === 'scheduled');
}

export function getPublishedThisMonth(items: ContentItem[]) {
  const now = dayjs();

  return items.filter((item) => {
    if (item.status !== 'published' || !item.publishDate) return false;
    const publishDate = dayjs(item.publishDate);
    return (
      publishDate.month() === now.month() && publishDate.year() === now.year()
    );
  });
}
