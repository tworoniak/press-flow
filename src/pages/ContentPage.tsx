import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { Alert, Box, Button, Stack, Typography } from '@mui/material';
import { useState } from 'react';

import ContentDetailsDrawer from '../components/content/ContentDetailsDrawer';
import ContentFormDialog from '../components/content/ContentFormDialog';
import ContentTable from '../components/content/ContentTable';
import ContentToolbar from '../components/content/ContentToolbar';

import type {
  Platform,
  ContentStatus,
  ContentPriority,
} from '../features/content/types/content';

import {
  useContent,
  useContentItem,
} from '../features/content/hooks/useContent';
import {
  useCreateContentItem,
  useUpdateContentItem,
} from '../features/content/hooks/useContentMutations';
import type { ContentFormValues } from '../features/content/types/contentForm';
import { useTeam } from '../features/team/hooks/useTeam';

export default function ContentPage() {
  const { data: content = [], isLoading, isError } = useContent();
  const { data: team = [] } = useTeam();
  const createMutation = useCreateContentItem();
  const updateMutation = useUpdateContentItem();

  const [selectedContentId, setSelectedContentId] = useState<string>();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');

  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<ContentStatus | 'all'>('all');
  const [priority, setPriority] = useState<ContentPriority | 'all'>('all');
  const [platform, setPlatform] = useState<Platform | 'all'>('all');

  const { data: selectedItem } = useContentItem(selectedContentId);

  const filteredContent = content.filter((item) => {
    if (search && !item.title.toLowerCase().includes(search.toLowerCase()))
      return false;

    if (status !== 'all' && item.status !== status) return false;

    if (priority !== 'all' && item.priority !== priority) return false;

    if (platform !== 'all' && item.platform !== platform) return false;

    return true;
  });

  const openCreateDialog = () => {
    setFormMode('create');
    setFormOpen(true);
  };

  const handleRowClick = (id: string) => {
    setSelectedContentId(id);
    setDrawerOpen(true);
  };

  const handleEditClick = (id: string) => {
    setSelectedContentId(id);
    setFormMode('edit');
    setFormOpen(true);
  };

  const closeFormDialog = () => {
    setFormOpen(false);
  };

  const handleCreate = (values: ContentFormValues) => {
    const now = new Date().toISOString();

    createMutation.mutate(
      {
        id: crypto.randomUUID(),
        title: values.title,
        slug: values.slug,
        summary: values.summary,
        contentType: values.contentType,
        status: values.status,
        priority: values.priority,
        authorId: 'tm-1',
        editorId: 'tm-1',
        platform: values.platform,
        tags: values.tags
          .split(',')
          .map((tag) => tag.trim())
          .filter(Boolean),
        dueDate: values.dueDate || undefined,
        publishDate: values.publishDate || undefined,
        createdAt: now,
        updatedAt: now,
        checklist: [
          {
            id: crypto.randomUUID(),
            label: 'Draft complete',
            completed: false,
          },
          { id: crypto.randomUUID(), label: 'SEO complete', completed: false },
          {
            id: crypto.randomUUID(),
            label: 'Social copy written',
            completed: false,
          },
        ],
        notes: values.notes,
        seoTitle: '',
        seoDescription: '',
        revisionHistory: [
          {
            id: crypto.randomUUID(),
            timestamp: now,
            user: 'Thomas Woroniak',
            action: 'Created content item',
          },
        ],
      },
      {
        onSuccess: () => {
          setFormOpen(false);
        },
      },
    );
  };

  const handleEdit = (values: ContentFormValues) => {
    if (!selectedContentId) return;

    updateMutation.mutate(
      {
        id: selectedContentId,
        updates: {
          title: values.title,
          slug: values.slug,
          summary: values.summary,
          contentType: values.contentType,
          status: values.status,
          priority: values.priority,
          platform: values.platform,
          dueDate: values.dueDate || undefined,
          publishDate: values.publishDate || undefined,
          notes: values.notes,
          tags: values.tags
            .split(',')
            .map((tag) => tag.trim())
            .filter(Boolean),
        },
      },
      {
        onSuccess: () => {
          setFormOpen(false);
        },
      },
    );
  };

  return (
    <>
      <Stack spacing={3}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          justifyContent='space-between'
        >
          <Box>
            <Typography variant='h4' fontWeight={800}>
              Content
            </Typography>
            <Typography color='text.secondary'>
              Manage editorial items from idea to publication.
            </Typography>
          </Box>

          <Button
            variant='contained'
            startIcon={<AddOutlinedIcon />}
            onClick={openCreateDialog}
          >
            New Content
          </Button>
        </Stack>

        {isError && (
          <Alert severity='error'>
            We couldn&apos;t load the content items.
          </Alert>
        )}

        <ContentToolbar
          search={search}
          status={status}
          priority={priority}
          platform={platform}
          onSearchChange={setSearch}
          onStatusChange={setStatus}
          onPriorityChange={setPriority}
          onPlatformChange={setPlatform}
        />
        <ContentTable
          items={filteredContent}
          team={team}
          isLoading={isLoading}
          onRowClick={handleRowClick}
          onEditClick={handleEditClick}
        />
      </Stack>

      <ContentDetailsDrawer
        open={drawerOpen}
        contentId={selectedContentId}
        onClose={() => setDrawerOpen(false)}
        onEdit={() => {
          setDrawerOpen(false);
          setFormMode('edit');
          setFormOpen(true);
        }}
      />

      <ContentFormDialog
        open={formOpen}
        mode={formMode}
        initialValues={formMode === 'edit' ? selectedItem : undefined}
        onClose={closeFormDialog}
        onSubmit={formMode === 'create' ? handleCreate : handleEdit}
        isSubmitting={createMutation.isPending || updateMutation.isPending}
      />
    </>
  );
}
