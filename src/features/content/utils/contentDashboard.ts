import dayjs from 'dayjs';

import type { ContentItem } from '../types/content';

export function getDueSoonItems(items: ContentItem[]) {
  const today = dayjs().startOf('day');
  const nextSevenDays = dayjs().add(7, 'day').endOf('day');

  return items
    .filter((item) => {
      if (!item.dueDate) return false;
      const dueDate = dayjs(item.dueDate);
      return (
        dueDate.isAfter(today.subtract(1, 'day')) &&
        dueDate.isBefore(nextSevenDays.add(1, 'day')) &&
        item.status !== 'published' &&
        item.status !== 'archived'
      );
    })
    .sort((a, b) => ((a.dueDate ?? '') > (b.dueDate ?? '') ? 1 : -1));
}
