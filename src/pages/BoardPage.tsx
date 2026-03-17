import {
  Alert,
  CircularProgress,
  Snackbar,
  Stack,
  Typography,
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import {
  DndContext,
  DragOverlay,
  type DragEndEvent,
  type DragStartEvent,
} from '@dnd-kit/core';
import { useMemo, useState } from 'react';

import ContentDetailsDrawer from '../components/content/ContentDetailsDrawer';
import KanbanCard from '../components/content/KanbanCard';
import KanbanColumn from '../components/content/KanbanColumn';
import { useContent } from '../features/content/hooks/useContent';
import { useUpdateContentItem } from '../features/content/hooks/useContentMutations';
import type { ContentStatus } from '../features/content/types/content';
import { useTeam } from '../features/team/hooks/useTeam';
import {
  boardStatuses,
  getBoardItemsByStatus,
} from '../features/content/utils/contentBoard';
import { getStatusLabel } from '../features/content/utils/contentLabels';

function isBoardStatus(value: string): value is ContentStatus {
  return boardStatuses.includes(value as ContentStatus);
}

export default function BoardPage() {
  const { data: content = [], isLoading, isError } = useContent();
  const { data: team = [] } = useTeam();
  const updateMutation = useUpdateContentItem();

  const [selectedContentId, setSelectedContentId] = useState<string>();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null);

  const activeItem = useMemo(
    () => content.find((item) => item.id === activeId),
    [content, activeId],
  );

  const handleCardClick = (id: string) => {
    setSelectedContentId(id);
    setDrawerOpen(true);
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(String(event.active.id));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    setActiveId(null);

    if (!over) return;

    const itemId = String(active.id);
    const nextStatus = String(over.id);

    if (!isBoardStatus(nextStatus)) return;

    const currentItem = content.find((item) => item.id === itemId);
    if (!currentItem) return;

    if (currentItem.status === nextStatus) return;

    updateMutation.mutate(
      {
        id: itemId,
        updates: {
          status: nextStatus,
          revisionHistory: [
            {
              id: crypto.randomUUID(),
              timestamp: new Date().toISOString(),
              user: 'Thomas Woroniak',
              action: `Moved item to ${getStatusLabel(nextStatus)}`,
            },
            ...currentItem.revisionHistory,
          ],
        },
      },
      {
        onSuccess: () => {
          setSnackbarMessage(
            `"${currentItem.title}" moved to ${getStatusLabel(nextStatus)}.`,
          );
        },
      },
    );
  };

  const handleDragCancel = () => {
    setActiveId(null);
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

        <DndContext
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragCancel}
        >
          <Stack
            direction='row'
            spacing={2}
            sx={{
              overflowX: 'auto',
              pb: 1,
              '&::-webkit-scrollbar': {
                height: 10,
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: 'rgba(255,255,255,0.2)',
                borderRadius: 999,
              },
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

          <DragOverlay>
            {activeItem ? (
              <Stack sx={{ width: 320 }}>
                <KanbanCard item={activeItem} team={team} draggable={false} />
              </Stack>
            ) : null}
          </DragOverlay>
        </DndContext>
      </Stack>

      <ContentDetailsDrawer
        open={drawerOpen}
        contentId={selectedContentId}
        onClose={() => setDrawerOpen(false)}
        onEdit={() => {
          setDrawerOpen(false);
        }}
      />

      <Snackbar
        open={Boolean(snackbarMessage)}
        autoHideDuration={3000}
        onClose={() => setSnackbarMessage(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <MuiAlert
          onClose={() => setSnackbarMessage(null)}
          severity='success'
          variant='filled'
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </>
  );
}
