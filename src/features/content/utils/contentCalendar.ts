import dayjs from 'dayjs';
import type { ContentItem } from '../types/content';

export type CalendarEntryType = 'due' | 'publish';

export type CalendarEntry = {
  id: string;
  itemId: string;
  title: string;
  date: string;
  type: CalendarEntryType;
  status: ContentItem['status'];
  contentType: ContentItem['contentType'];
};

export function getMonthGridDays(month: dayjs.Dayjs) {
  const startOfMonth = month.startOf('month');
  const endOfMonth = month.endOf('month');

  const gridStart = startOfMonth.startOf('week');
  const gridEnd = endOfMonth.endOf('week');

  const days: dayjs.Dayjs[] = [];
  let current = gridStart;

  while (current.isBefore(gridEnd) || current.isSame(gridEnd, 'day')) {
    days.push(current);
    current = current.add(1, 'day');
  }

  return days;
}

export function getCalendarEntries(items: ContentItem[]): CalendarEntry[] {
  return items.flatMap((item) => {
    const entries: CalendarEntry[] = [];

    if (item.dueDate) {
      entries.push({
        id: `${item.id}-due`,
        itemId: item.id,
        title: item.title,
        date: item.dueDate,
        type: 'due',
        status: item.status,
        contentType: item.contentType,
      });
    }

    if (item.publishDate) {
      entries.push({
        id: `${item.id}-publish`,
        itemId: item.id,
        title: item.title,
        date: item.publishDate,
        type: 'publish',
        status: item.status,
        contentType: item.contentType,
      });
    }

    return entries;
  });
}

export function getEntriesForDay(entries: CalendarEntry[], date: dayjs.Dayjs) {
  return entries.filter((entry) => dayjs(entry.date).isSame(date, 'day'));
}
