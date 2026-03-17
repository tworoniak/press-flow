import {
  Alert,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Stack,
  Typography,
} from '@mui/material';

import { useContent } from '../features/content/hooks/useContent';

export default function CalendarPage() {
  const { data: content = [], isLoading, isError } = useContent();

  if (isLoading) {
    return (
      <Stack spacing={2} alignItems='center'>
        <CircularProgress />
        <Typography color='text.secondary'>
          Loading publishing schedule...
        </Typography>
      </Stack>
    );
  }

  if (isError) {
    return (
      <Alert severity='error'>
        We couldn&apos;t load the publishing schedule.
      </Alert>
    );
  }

  const scheduledItems = content
    .filter((item) => item.publishDate)
    .sort((a, b) => (a.publishDate! > b.publishDate! ? 1 : -1));

  return (
    <Stack spacing={3}>
      <Typography variant='h4' fontWeight={800}>
        Publishing Schedule
      </Typography>

      {scheduledItems.map((item) => (
        <Card key={item.id}>
          <CardContent>
            <Stack spacing={1}>
              <Typography variant='h6' fontWeight={700}>
                {item.title}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                Publish Date: {item.publishDate ?? 'TBD'}
              </Typography>
              <Stack direction='row' spacing={1}>
                <Chip label={item.status} size='small' />
                <Chip label={item.platform} size='small' variant='outlined' />
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
}
