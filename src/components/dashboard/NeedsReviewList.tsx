import { Card, CardContent, Stack, Typography } from '@mui/material';
import type { ContentItem } from '../../features/content/types/content';
import StatusChip from '../common/StatusChip';

type Props = {
  items: ContentItem[];
};

export default function NeedsReviewList({ items }: Props) {
  if (items.length === 0) {
    return (
      <Card>
        <CardContent>
          <Typography color='text.secondary'>
            Nothing waiting for review.
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Stack spacing={2}>
      {items.map((item) => (
        <Card key={item.id}>
          <CardContent>
            <Stack spacing={1}>
              <Typography fontWeight={600}>{item.title}</Typography>

              <StatusChip status={item.status} />

              <Typography variant='body2' color='text.secondary'>
                Due: {item.dueDate ?? 'TBD'}
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
}
