import { Card, CardContent, Stack, Typography } from '@mui/material';

import type { ContentItem } from '../../features/content/types/content';
import PriorityChip from '../common/PriorityChip';
import StatusChip from '../common/StatusChip';

type Props = {
  items: ContentItem[];
};

export default function DueSoonList({ items }: Props) {
  if (items.length === 0) {
    return (
      <Card>
        <CardContent>
          <Typography color='text.secondary'>Nothing due soon.</Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Stack spacing={2}>
      {items.map((item) => (
        <Card key={item.id}>
          <CardContent>
            <Stack spacing={1.25}>
              <Typography fontWeight={600}>{item.title}</Typography>

              <Stack direction='row' spacing={1} useFlexGap flexWrap='wrap'>
                <StatusChip status={item.status} />
                <PriorityChip priority={item.priority} />
              </Stack>

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
