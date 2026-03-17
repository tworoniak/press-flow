import { Paper, Stack, Typography } from '@mui/material';

import type {
  ContentItem,
  ContentStatus,
} from '../../features/content/types/content';
import type { TeamMember } from '../../features/team/types/team';
import { getStatusLabel } from '../../features/content/utils/contentLabels';
import KanbanCard from './KanbanCard';

type KanbanColumnProps = {
  title: ContentStatus;
  items: ContentItem[];
  team: TeamMember[];
  onCardClick: (id: string) => void;
};

export default function KanbanColumn({
  title,
  items,
  team,
  onCardClick,
}: KanbanColumnProps) {
  return (
    <Paper
      sx={{
        minWidth: 320,
        width: 320,
        p: 2,
        borderRadius: 3,
        bgcolor: 'background.paper',
      }}
    >
      <Stack spacing={2}>
        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='center'
        >
          <Typography variant='h6' fontWeight={700}>
            {getStatusLabel(title)}
          </Typography>

          <Typography variant='body2' color='text.secondary'>
            {items.length}
          </Typography>
        </Stack>

        <Stack spacing={2}>
          {items.length > 0 ? (
            items.map((item) => (
              <KanbanCard
                key={item.id}
                item={item}
                team={team}
                onClick={onCardClick}
              />
            ))
          ) : (
            <Typography variant='body2' color='text.secondary'>
              No items in this stage.
            </Typography>
          )}
        </Stack>
      </Stack>
    </Paper>
  );
}
