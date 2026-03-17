import { Alert, CircularProgress, Stack, Typography } from '@mui/material';
import { useState } from 'react';

import ContentDetailsDrawer from '../components/content/ContentDetailsDrawer';
import KanbanColumn from '../components/content/KanbanColumn';
import { useContent } from '../features/content/hooks/useContent';
import { useTeam } from '../features/team/hooks/useTeams';
import {
  boardStatuses,
  getBoardItemsByStatus,
} from '../features/content/utils/contentBoard';

export default function BoardPage() {
  const { data: content = [], isLoading, isError } = useContent();
  const { data: team = [] } = useTeam();

  const [selectedContentId, setSelectedContentId] = useState<string>();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleCardClick = (id: string) => {
    setSelectedContentId(id);
    setDrawerOpen(true);
  };

  if (isLoading) {
    return (
      <Stack spacing={2} alignItems='center'>
        <CircularProgress />
        <Typography color='text.secondary'>
          Loading editorial board...
        </Typography>
      </Stack>
    );
  }

  if (isError) {
    return (
      <Alert severity='error'>We couldn&apos;t load the editorial board.</Alert>
    );
  }

  return (
    <>
      <Stack spacing={3}>
        <Stack spacing={0.5}>
          <Typography variant='h4' fontWeight={800}>
            Editorial Board
          </Typography>
          <Typography color='text.secondary'>
            Track content across the publishing workflow.
          </Typography>
        </Stack>

        <Stack
          direction='row'
          spacing={2}
          sx={{
            overflowX: 'auto',
            pb: 1,
          }}
        >
          {boardStatuses.map((status) => (
            <KanbanColumn
              key={status}
              title={status}
              items={getBoardItemsByStatus(content, status)}
              team={team}
              onCardClick={handleCardClick}
            />
          ))}
        </Stack>
      </Stack>

      <ContentDetailsDrawer
        open={drawerOpen}
        contentId={selectedContentId}
        onClose={() => setDrawerOpen(false)}
        onEdit={() => {
          setDrawerOpen(false);
        }}
      />
    </>
  );
}
