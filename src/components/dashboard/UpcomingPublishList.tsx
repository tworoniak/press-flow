import { Card, CardContent, Stack, Typography } from '@mui/material';
import type { ContentItem } from '../../features/content/types/content';

type Props = {
  items: ContentItem[];
};

export default function UpcomingPublishList({ items }: Props) {
  if (items.length === 0) {
    return (
      <Card>
        <CardContent>
          <Typography color='text.secondary'>
            No scheduled publications.
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
            <Stack spacing={0.5}>
              <Typography fontWeight={600}>{item.title}</Typography>

              <Typography variant='body2' color='text.secondary'>
                Publish: {item.publishDate ?? 'TBD'}
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
}
