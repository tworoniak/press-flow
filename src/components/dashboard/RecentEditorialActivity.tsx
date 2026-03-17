import { Card, CardContent, Stack, Typography } from '@mui/material';

import type { ContentItem } from '../../features/content/types/content';

type ActivityItem = {
  id: string;
  title: string;
  action: string;
  user: string;
  timestamp: string;
};

type Props = {
  items: ContentItem[];
};

export default function RecentEditorialActivity({ items }: Props) {
  const activity: ActivityItem[] = items
    .flatMap((item) =>
      item.revisionHistory.map((entry) => ({
        id: entry.id,
        title: item.title,
        action: entry.action,
        user: entry.user,
        timestamp: entry.timestamp,
      })),
    )
    .sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1))
    .slice(0, 6);

  if (activity.length === 0) {
    return (
      <Card>
        <CardContent>
          <Typography color='text.secondary'>
            No recent editorial activity.
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent>
        <Stack spacing={2}>
          {activity.map((entry, index) => (
            <Stack
              key={entry.id}
              spacing={0.5}
              sx={{
                pb: index !== activity.length - 1 ? 2 : 0,
                borderBottom:
                  index !== activity.length - 1 ? '1px solid' : 'none',
                borderColor: 'divider',
              }}
            >
              <Typography fontWeight={600}>{entry.action}</Typography>

              <Typography variant='body2' color='text.secondary'>
                {entry.title}
              </Typography>

              <Typography variant='caption' color='text.secondary'>
                {entry.user} • {entry.timestamp}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}
