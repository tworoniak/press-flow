import {
  Alert,
  CircularProgress,
  Grid,
  Stack,
  Typography,
} from '@mui/material';

import ChartCard from '../components/dashboard/ChartCard';
import ContentTypeDistributionChart from '../components/dashboard/ContentTypeDistributionChart';
import DueSoonList from '../components/dashboard/DueSoonList';
import NeedsReviewList from '../components/dashboard/NeedsReviewList';
import RecentEditorialActivity from '../components/dashboard/RecentEditorialActivity';
import StatCard from '../components/dashboard/StatCard';
import StatusBreakdownChart from '../components/dashboard/StatusBreakdownChart';
import UpcomingPublishList from '../components/dashboard/UpcomingPublishList';
import { useContent } from '../features/content/hooks/useContent';
import {
  getContentTypeChartData,
  getStatusChartData,
} from '../features/content/utils/contentCharts';
import { getDueSoonItems } from '../features/content/utils/contentDashboard';

export default function DashboardPage() {
  const { data: content = [], isLoading, isError } = useContent();

  if (isLoading) {
    return (
      <Stack spacing={2} alignItems='center'>
        <CircularProgress />
        <Typography color='text.secondary'>
          Loading editorial dashboard...
        </Typography>
      </Stack>
    );
  }

  if (isError) {
    return (
      <Alert severity='error'>
        We couldn&apos;t load the editorial dashboard.
      </Alert>
    );
  }

  const drafting = content.filter((item) => item.status === 'drafting');
  const editing = content.filter((item) => item.status === 'editing');
  const scheduled = content.filter((item) => item.status === 'scheduled');

  const needsReview = content.filter((item) => item.status === 'editing');
  const dueSoon = getDueSoonItems(content).slice(0, 5);

  const upcomingPublish = content
    .filter((item) => item.publishDate)
    .sort((a, b) => (a.publishDate! > b.publishDate! ? 1 : -1))
    .slice(0, 5);

  const statusChartData = getStatusChartData(content);
  const contentTypeChartData = getContentTypeChartData(content);

  return (
    <Stack spacing={4}>
      <Stack spacing={0.5}>
        <Typography variant='h4' fontWeight={800}>
          Editorial Dashboard
        </Typography>
        <Typography color='text.secondary'>
          Track drafts, review stages, deadlines, and upcoming publishing
          activity.
        </Typography>
      </Stack>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard label='Total Content' value={content.length} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard label='Drafting' value={drafting.length} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard label='Editing' value={editing.length} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard label='Scheduled' value={scheduled.length} />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 7 }}>
          <ChartCard
            title='Workflow Status Breakdown'
            subtitle='A quick view of where content currently sits in the editorial process.'
          >
            <StatusBreakdownChart data={statusChartData} />
          </ChartCard>
        </Grid>

        <Grid size={{ xs: 12, lg: 5 }}>
          <ChartCard
            title='Content Type Distribution'
            subtitle='See how coverage is currently distributed across editorial formats.'
          >
            <ContentTypeDistributionChart data={contentTypeChartData} />
          </ChartCard>
        </Grid>
      </Grid>

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Stack spacing={2}>
            <Typography variant='h6' fontWeight={700}>
              Needs Review
            </Typography>
            <NeedsReviewList items={needsReview.slice(0, 5)} />
          </Stack>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Stack spacing={2}>
            <Typography variant='h6' fontWeight={700}>
              Due Soon
            </Typography>
            <DueSoonList items={dueSoon} />
          </Stack>
        </Grid>
      </Grid>

      <Stack spacing={2}>
        <Typography variant='h6' fontWeight={700}>
          Upcoming Publishing
        </Typography>
        <UpcomingPublishList items={upcomingPublish} />
      </Stack>

      <Stack spacing={2}>
        <Typography variant='h6' fontWeight={700}>
          Recent Editorial Activity
        </Typography>
        <RecentEditorialActivity items={content} />
      </Stack>
    </Stack>
  );
}
