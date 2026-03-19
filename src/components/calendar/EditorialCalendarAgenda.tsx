import dayjs from 'dayjs';
import { Card, CardContent, Stack, Typography } from '@mui/material';

import type { CalendarEntry } from '../../features/content/utils/contentCalendar';
import CalendarEntryChip from './CalendarEntryChip';

type EditorialCalendarAgendaProps = {
  month: dayjs.Dayjs;
  entries: CalendarEntry[];
  onEntryClick: (itemId: string) => void;
};

export default function EditorialCalendarAgenda({
  month,
  entries,
  onEntryClick,
}: EditorialCalendarAgendaProps) {
  const monthEntries = entries
    .filter((entry) => dayjs(entry.date).isSame(month, 'month'))
    .sort((a, b) => (a.date > b.date ? 1 : -1));

  const grouped = monthEntries.reduce<Record<string, CalendarEntry[]>>(
    (acc, entry) => {
      if (!acc[entry.date]) acc[entry.date] = [];
      acc[entry.date].push(entry);
      return acc;
    },
    {},
  );

  const dates = Object.keys(grouped).sort();

  if (dates.length === 0) {
    return (
      <Card>
        <CardContent>
          <Typography color='text.secondary'>
            No calendar entries this month.
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Stack spacing={2} sx={{ minWidth: 0 }}>
      {dates.map((date) => (
        <Card key={date} sx={{ minWidth: 0 }}>
          <CardContent sx={{ minWidth: 0 }}>
            <Stack spacing={1.5} sx={{ minWidth: 0 }}>
              <Typography variant='subtitle1' fontWeight={700}>
                {dayjs(date).format('MMMM D, YYYY')}
              </Typography>

              <Stack spacing={1} sx={{ minWidth: 0 }}>
                {grouped[date].map((entry) => (
                  <CalendarEntryChip
                    key={entry.id}
                    entry={entry}
                    onClick={onEntryClick}
                  />
                ))}
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
}
