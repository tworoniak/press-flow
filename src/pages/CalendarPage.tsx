import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import {
  Alert,
  CircularProgress,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import dayjs from 'dayjs';
import { useMemo, useState } from 'react';

import EditorialCalendarAgenda from '../components/calendar/EditorialCalendarAgenda';
import EditorialCalendarGrid from '../components/calendar/EditorialCalendarGrid';
import ContentDetailsDrawer from '../components/content/ContentDetailsDrawer';
import { useContent } from '../features/content/hooks/useContent';
import { getCalendarEntries } from '../features/content/utils/contentCalendar';

export default function CalendarPage() {
  const { data: content = [], isLoading, isError } = useContent();
  const [month, setMonth] = useState(dayjs());
  const [selectedContentId, setSelectedContentId] = useState<string>();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const entries = useMemo(() => getCalendarEntries(content), [content]);

  const handleEntryClick = (itemId: string) => {
    setSelectedContentId(itemId);
    setDrawerOpen(true);
  };

  if (isLoading) {
    return (
      <Stack spacing={2} alignItems='center'>
        <CircularProgress />
        <Typography color='text.secondary'>
          Loading editorial calendar...
        </Typography>
      </Stack>
    );
  }

  if (isError) {
    return (
      <Alert severity='error'>
        We couldn&apos;t load the editorial calendar.
      </Alert>
    );
  }

  return (
    <>
      <Stack spacing={3} sx={{ minWidth: 0, overflowX: 'hidden' }}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent='space-between'
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          spacing={2}
        >
          <Stack spacing={0.5}>
            <Typography variant='h4' fontWeight={800}>
              Editorial Calendar
            </Typography>
            <Typography color='text.secondary'>
              Plan upcoming due dates and publication schedule by month.
            </Typography>
          </Stack>

          <Stack direction='row' alignItems='center' spacing={1}>
            <IconButton
              onClick={() => setMonth((prev) => prev.subtract(1, 'month'))}
            >
              <ChevronLeftOutlinedIcon />
            </IconButton>

            <Typography
              variant='h6'
              fontWeight={700}
              sx={{ minWidth: 160, textAlign: 'center' }}
            >
              {month.format('MMMM YYYY')}
            </Typography>

            <IconButton
              onClick={() => setMonth((prev) => prev.add(1, 'month'))}
            >
              <ChevronRightOutlinedIcon />
            </IconButton>
          </Stack>
        </Stack>

        {isMobile ? (
          <EditorialCalendarAgenda
            month={month}
            entries={entries}
            onEntryClick={handleEntryClick}
          />
        ) : (
          <EditorialCalendarGrid
            month={month}
            entries={entries}
            onEntryClick={handleEntryClick}
          />
        )}
      </Stack>

      <ContentDetailsDrawer
        open={drawerOpen}
        contentId={selectedContentId}
        onClose={() => setDrawerOpen(false)}
        onEdit={() => {
          setDrawerOpen(false);
        }}
      />
    </>
  );
}
