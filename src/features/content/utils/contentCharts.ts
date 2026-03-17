import type { ContentItem } from '../types/content';
import { getContentTypeLabel, getStatusLabel } from './contentLabels';

export function getStatusChartData(items: ContentItem[]) {
  const counts = new Map<string, number>();

  items.forEach((item) => {
    counts.set(item.status, (counts.get(item.status) ?? 0) + 1);
  });

  return Array.from(counts.entries()).map(([status, value]) => ({
    name: getStatusLabel(status as ContentItem['status']),
    value,
  }));
}

export function getContentTypeChartData(items: ContentItem[]) {
  const counts = new Map<string, number>();

  items.forEach((item) => {
    counts.set(item.contentType, (counts.get(item.contentType) ?? 0) + 1);
  });

  return Array.from(counts.entries()).map(([type, value]) => ({
    name: getContentTypeLabel(type as ContentItem['contentType']),
    value,
  }));
}
