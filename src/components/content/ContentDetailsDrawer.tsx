import CloseIcon from '@mui/icons-material/Close';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import {
  Box,
  Chip,
  CircularProgress,
  Divider,
  Drawer,
  IconButton,
  Stack,
  Typography,
  Button,
  Alert,
} from '@mui/material';

import { useContentItem } from '../../features/content/hooks/useContent';
import { useTeam } from '../../features/team/hooks/useTeams';
import {
  getContentTypeLabel,
  getPlatformLabel,
} from '../../features/content/utils/contentLabels';
import StatusChip from '../common/StatusChip';
import PriorityChip from '../common/PriorityChip';

type ContentDetailsDrawerProps = {
  open: boolean;
  contentId?: string;
  onClose: () => void;
  onEdit: () => void;
};

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <Stack spacing={0.5}>
      <Typography variant='caption' color='text.secondary'>
        {label}
      </Typography>
      <Typography variant='body2'>{value}</Typography>
    </Stack>
  );
}

export default function ContentDetailsDrawer({
  open,
  contentId,
  onClose,
  onEdit,
}: ContentDetailsDrawerProps) {
  const { data: item, isLoading, isError } = useContentItem(contentId);
  const { data: team = [] } = useTeam();

  const author = team.find((member) => member.id === item?.authorId);
  const editor = team.find((member) => member.id === item?.editorId);

  return (
    <Drawer
      anchor='right'
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: '100%', sm: 460 },
          p: 0,
        },
      }}
    >
      <Stack sx={{ height: '100%' }}>
        <Stack
          direction='row'
          alignItems='center'
          justifyContent='space-between'
          sx={{ px: 2, py: 1.5 }}
        >
          <Typography variant='h6' fontWeight={700}>
            Content Details
          </Typography>

          <IconButton onClick={onClose} aria-label='Close details drawer'>
            <CloseIcon />
          </IconButton>
        </Stack>

        <Divider />

        <Box sx={{ p: 2, overflowY: 'auto', flex: 1 }}>
          {isLoading && (
            <Stack spacing={2} alignItems='center' sx={{ py: 6 }}>
              <CircularProgress />
              <Typography color='text.secondary'>
                Loading content details...
              </Typography>
            </Stack>
          )}

          {isError && (
            <Alert severity='error'>
              We couldn&apos;t load the selected content item.
            </Alert>
          )}

          {!isLoading && !isError && !item && (
            <Alert severity='warning'>No content item was found.</Alert>
          )}

          {!isLoading && !isError && item && (
            <Stack spacing={3}>
              <Stack spacing={1}>
                <Typography variant='h5' fontWeight={800}>
                  {item.title}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  {item.summary}
                </Typography>
              </Stack>

              <Stack direction='row' spacing={1} useFlexGap flexWrap='wrap'>
                <StatusChip status={item.status} />
                <PriorityChip priority={item.priority} />
                <Chip
                  label={getContentTypeLabel(item.contentType)}
                  size='small'
                  variant='outlined'
                />
                <Chip
                  label={getPlatformLabel(item.platform)}
                  size='small'
                  variant='outlined'
                />
              </Stack>

              <Divider />

              <Stack spacing={2}>
                <Typography variant='subtitle1' fontWeight={700}>
                  Metadata
                </Typography>

                <DetailRow label='Slug' value={item.slug} />
                <DetailRow label='Author' value={author?.name ?? 'Unknown'} />
                <DetailRow
                  label='Editor'
                  value={editor?.name ?? 'Unassigned'}
                />
                <DetailRow label='Due Date' value={item.dueDate ?? 'TBD'} />
                <DetailRow
                  label='Publish Date'
                  value={item.publishDate ?? 'TBD'}
                />
                <DetailRow label='Created' value={item.createdAt} />
                <DetailRow label='Last Updated' value={item.updatedAt} />
              </Stack>

              <Divider />

              <Stack spacing={2}>
                <Typography variant='subtitle1' fontWeight={700}>
                  Tags
                </Typography>

                <Stack direction='row' spacing={1} useFlexGap flexWrap='wrap'>
                  {item.tags.length > 0 ? (
                    item.tags.map((tag) => (
                      <Chip key={tag} label={tag} size='small' />
                    ))
                  ) : (
                    <Typography variant='body2' color='text.secondary'>
                      No tags added.
                    </Typography>
                  )}
                </Stack>
              </Stack>

              <Divider />

              <Stack spacing={2}>
                <Typography variant='subtitle1' fontWeight={700}>
                  Editorial Checklist
                </Typography>

                <Stack spacing={1}>
                  {item.checklist.map((check) => (
                    <Stack
                      key={check.id}
                      direction='row'
                      alignItems='center'
                      justifyContent='space-between'
                      sx={{
                        px: 1.5,
                        py: 1,
                        borderRadius: 2,
                        bgcolor: 'background.paper',
                      }}
                    >
                      <Typography variant='body2'>{check.label}</Typography>
                      <Chip
                        label={check.completed ? 'Done' : 'Pending'}
                        size='small'
                        color={check.completed ? 'success' : 'default'}
                        variant={check.completed ? 'filled' : 'outlined'}
                      />
                    </Stack>
                  ))}
                </Stack>
              </Stack>

              <Divider />

              <Stack spacing={2}>
                <Typography variant='subtitle1' fontWeight={700}>
                  Notes
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  {item.notes || 'No editorial notes added yet.'}
                </Typography>
              </Stack>

              <Divider />

              <Stack spacing={2}>
                <Typography variant='subtitle1' fontWeight={700}>
                  Revision History
                </Typography>

                <Stack spacing={1.5}>
                  {item.revisionHistory.map((entry) => (
                    <Box
                      key={entry.id}
                      sx={{
                        p: 1.5,
                        borderRadius: 2,
                        bgcolor: 'background.paper',
                      }}
                    >
                      <Typography variant='body2' fontWeight={600}>
                        {entry.action}
                      </Typography>
                      <Typography variant='caption' color='text.secondary'>
                        {entry.user} • {entry.timestamp}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </Stack>
            </Stack>
          )}
        </Box>

        <Divider />

        <Stack
          direction='row'
          spacing={1}
          justifyContent='flex-end'
          sx={{ p: 2 }}
        >
          <Button onClick={onClose} color='inherit'>
            Close
          </Button>
          <Button
            variant='contained'
            startIcon={<EditOutlinedIcon />}
            onClick={onEdit}
            disabled={!item}
          >
            Edit
          </Button>
        </Stack>
      </Stack>
    </Drawer>
  );
}
