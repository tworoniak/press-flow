import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import {
  Card,
  CardContent,
  Chip,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';

import type { ContentItem } from '../../features/content/types/content';
import type { TeamMember } from '../../features/team/types/team';
import {
  getContentTypeLabel,
  getPlatformLabel,
} from '../../features/content/utils/contentLabels';
import PriorityChip from '../common/PriorityChip';
import StatusChip from '../common/StatusChip';

type ContentMobileListProps = {
  items: ContentItem[];
  team: TeamMember[];
  onCardClick: (id: string) => void;
  onEditClick: (id: string) => void;
};

export default function ContentMobileList({
  items,
  team,
  onCardClick,
  onEditClick,
}: ContentMobileListProps) {
  return (
    <Stack spacing={2}>
      {items.map((item) => {
        const author = team.find((member) => member.id === item.authorId);

        return (
          <Card
            key={item.id}
            onClick={() => onCardClick(item.id)}
            sx={{
              cursor: 'pointer',
            }}
          >
            <CardContent>
              <Stack spacing={2}>
                <Stack
                  direction='row'
                  justifyContent='space-between'
                  alignItems='flex-start'
                  spacing={2}
                >
                  <Stack spacing={0.5} sx={{ minWidth: 0 }}>
                    <Typography variant='h6' fontWeight={700}>
                      {item.title}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      {author?.name ?? 'Unknown'}
                    </Typography>
                  </Stack>

                  <IconButton
                    aria-label='Edit content item'
                    onClick={(event) => {
                      event.stopPropagation();
                      onEditClick(item.id);
                    }}
                  >
                    <EditOutlinedIcon fontSize='small' />
                  </IconButton>
                </Stack>

                <Stack direction='row' spacing={1} useFlexGap flexWrap='wrap'>
                  <StatusChip status={item.status} />
                  <PriorityChip priority={item.priority} />
                  <Chip
                    label={getContentTypeLabel(item.contentType)}
                    size='small'
                    variant='outlined'
                  />
                </Stack>

                <Stack spacing={0.75}>
                  <Typography variant='body2' color='text.secondary'>
                    Platform: {getPlatformLabel(item.platform)}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    Due: {item.dueDate ?? 'TBD'}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    Publish: {item.publishDate ?? 'TBD'}
                  </Typography>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        );
      })}
    </Stack>
  );
}
