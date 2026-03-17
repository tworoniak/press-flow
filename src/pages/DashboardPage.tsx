import {
  Alert,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Stack,
  Typography,
} from '@mui/material';

import { useContent } from '../features/content/hooks/useContent';
import {
  getDueThisWeek,
  getOverdueItems,
  getPublishedThisMonth,
  getScheduledItems,
} from '../features/content/utils/contentHelpers';

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <Card>
      <CardContent>
        <Stack spacing={1}>
          <Typography variant='body2' color='text.secondary'>
            {label}
          </Typography>
          <Typography variant='h4' fontWeight={700}>
            {value}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default function DashboardPage() {
  const { data: content = [], isLoading, isError } = useContent();

  if (isLoading) {
    return (
      <Stack spacing={2} alignItems='center'>
        <CircularProgress />
        <Typography color='text.secondary'>Loading dashboard...</Typography>
      </Stack>
    );
  }

  if (isError) {
    return (
      <Alert severity='error'>
        We couldn&apos;t load the dashboard content summary.
      </Alert>
    );
  }

  const totalItems = content.length;
  const dueThisWeek = getDueThisWeek(content).length;
  const overdue = getOverdueItems(content).length;
  const scheduled = getScheduledItems(content).length;
  const publishedThisMonth = getPublishedThisMonth(content).length;

  return (
    <Stack spacing={3}>
      <Typography variant='h4' fontWeight={800}>
        Dashboard
      </Typography>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard label='Total Content Items' value={totalItems} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard label='Due This Week' value={dueThisWeek} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard label='Overdue' value={overdue} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard label='Scheduled' value={scheduled} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard label='Published This Month' value={publishedThisMonth} />
        </Grid>
      </Grid>
    </Stack>
  );
}
