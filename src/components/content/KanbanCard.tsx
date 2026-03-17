import { Card, CardContent, Chip, Stack, Typography } from '@mui/material';

import type { ContentItem } from '../../features/content/types/content';
import type { TeamMember } from '../../features/team/types/team';
import { getContentTypeLabel } from '../../features/content/utils/contentLabels';
import PriorityChip from '../common/PriorityChip';

type KanbanCardProps = {
  item: ContentItem;
  team: TeamMember[];
  onClick: (id: string) => void;
};

export default function KanbanCard({ item, team, onClick }: KanbanCardProps) {
  const author = team.find((member) => member.id === item.authorId);

  return (
    <Card
      onClick={() => onClick(item.id)}
      sx={{
        cursor: 'pointer',
        transition: 'transform 0.15s ease, box-shadow 0.15s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: 6,
        },
      }}
    >
      <CardContent>
        <Stack spacing={1.5}>
          <Typography variant='subtitle1' fontWeight={700}>
            {item.title}
          </Typography>

          <Typography variant='body2' color='text.secondary'>
            {author?.name ?? 'Unknown'}
          </Typography>

          <Stack direction='row' spacing={1} useFlexGap flexWrap='wrap'>
            <PriorityChip priority={item.priority} />
            <Chip
              label={getContentTypeLabel(item.contentType)}
              size='small'
              variant='outlined'
            />
          </Stack>

          <Typography variant='body2' color='text.secondary'>
            Due: {item.dueDate ?? 'TBD'}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
