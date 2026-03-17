import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import {
  Card,
  CardContent,
  Chip,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

import type { ContentItem } from '../../features/content/types/content';
import type { TeamMember } from '../../features/team/types/team';
import { getContentTypeLabel } from '../../features/content/utils/contentLabels';
import PriorityChip from '../common/PriorityChip';

type KanbanCardProps = {
  item: ContentItem;
  team: TeamMember[];
  onClick?: (id: string) => void;
  draggable?: boolean;
};

export default function KanbanCard({
  item,
  team,
  onClick,
  draggable = true,
}: KanbanCardProps) {
  const author = team.find((member) => member.id === item.authorId);

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: item.id,
      disabled: !draggable,
    });

  const style = draggable
    ? { transform: CSS.Translate.toString(transform) }
    : undefined;

  return (
    <Card
      ref={setNodeRef}
      style={style}
      onClick={() => onClick?.(item.id)}
      sx={{
        cursor: 'default',
        opacity: isDragging ? 0.35 : 1,
        transition: 'transform 0.15s ease, box-shadow 0.15s ease',
        '&:hover': {
          boxShadow: 6,
        },
      }}
    >
      <CardContent>
        <Stack spacing={1.5}>
          <Stack
            direction='row'
            justifyContent='space-between'
            alignItems='flex-start'
          >
            <Typography variant='subtitle1' fontWeight={700}>
              {item.title}
            </Typography>

            {draggable && (
              <IconButton
                size='small'
                {...listeners}
                {...attributes}
                sx={{
                  cursor: 'grab',
                  color: 'text.secondary',
                  '&:hover': {
                    color: 'text.primary',
                  },
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <DragIndicatorOutlinedIcon fontSize='small' />
              </IconButton>
            )}
          </Stack>

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
