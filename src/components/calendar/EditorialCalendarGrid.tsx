import dayjs from 'dayjs';
import { Box, Paper, Stack, Typography } from '@mui/material';

import {
  getEntriesForDay,
  getMonthGridDays,
  type CalendarEntry,
} from '../../features/content/utils/contentCalendar';
import CalendarEntryChip from './CalendarEntryChip';

type EditorialCalendarGridProps = {
  month: dayjs.Dayjs;
  entries: CalendarEntry[];
  onEntryClick: (itemId: string) => void;
};

const weekdayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function EditorialCalendarGrid({
  month,
  entries,
  onEntryClick,
}: EditorialCalendarGridProps) {
  const days = getMonthGridDays(month);

  return (
    <Stack spacing={1.5}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, minmax(0, 1fr))',
          gap: 1,
        }}
      >
        {weekdayLabels.map((label) => (
          <Paper
            key={label}
            elevation={0}
            sx={{
              p: 1,
              textAlign: 'center',
              bgcolor: 'background.paper',
              border: 1,
              borderColor: 'divider',
            }}
          >
            <Typography variant='body2' fontWeight={700}>
              {label}
            </Typography>
          </Paper>
        ))}
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, minmax(0, 1fr))',
          gap: 1,
        }}
      >
        {days.map((day) => {
          const dayEntries = getEntriesForDay(entries, day);
          const isCurrentMonth = day.isSame(month, 'month');
          const isToday = day.isSame(dayjs(), 'day');

          return (
            <Paper
              key={day.toISOString()}
              sx={{
                minHeight: 150,
                p: 1,
                border: 1,
                borderColor: isToday ? 'primary.main' : 'divider',
                bgcolor: isCurrentMonth ? 'background.paper' : 'action.hover',
              }}
            >
              <Stack spacing={1}>
                <Typography
                  variant='body2'
                  fontWeight={isToday ? 800 : 600}
                  color={isCurrentMonth ? 'text.primary' : 'text.secondary'}
                >
                  {day.format('D')}
                </Typography>

                <Stack spacing={0.75}>
                  {dayEntries.slice(0, 3).map((entry) => (
                    <CalendarEntryChip
                      key={entry.id}
                      entry={entry}
                      onClick={onEntryClick}
                    />
                  ))}

                  {dayEntries.length > 3 ? (
                    <Typography variant='caption' color='text.secondary'>
                      +{dayEntries.length - 3} more
                    </Typography>
                  ) : null}
                </Stack>
              </Stack>
            </Paper>
          );
        })}
      </Box>
    </Stack>
  );
}
