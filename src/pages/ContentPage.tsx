import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  IconButton,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import {
  DataGrid,
  type GridColDef,
  type GridRenderCellParams,
} from '@mui/x-data-grid';
import { useMemo, useState } from 'react';

import ContentDetailsDrawer from '../components/content/ContentDetailsDrawer';
import ContentFormDialog from '../components/content/ContentFormDialog';
import PriorityChip from '../components/common/PriorityChip';
import StatusChip from '../components/common/StatusChip';
import {
  useContent,
  useContentItem,
} from '../features/content/hooks/useContent';
import {
  useCreateContentItem,
  useUpdateContentItem,
} from '../features/content/hooks/useContentMutations';
import { useTeam } from '../features/team/hooks/useTeams';

import {
  getContentTypeLabel,
  getPlatformLabel,
} from '../features/content/utils/contentLabels';
import type { ContentFormValues } from '../features/content/types/contentForm';

export default function ContentPage() {
  const { data: content = [], isLoading, isError } = useContent();
  const { data: team = [] } = useTeam();
  const createMutation = useCreateContentItem();
  const updateMutation = useUpdateContentItem();

  const [selectedContentId, setSelectedContentId] = useState<string>();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');

  const { data: selectedItem } = useContentItem(selectedContentId);

  const rows = useMemo(() => {
    return content.map((item) => {
      const author = team.find((member) => member.id === item.authorId);
      return {
        ...item,
        authorName: author?.name ?? 'Unknown',
      };
    });
  }, [content, team]);

  const openCreateDialog = () => {
    setFormMode('create');
    setFormOpen(true);
  };

  const closeFormDialog = () => {
    setFormOpen(false);
  };

  const handleRowClick = (id: string) => {
    setSelectedContentId(id);
    setDrawerOpen(true);
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

  const columns: GridColDef[] = [
    {
      field: 'title',
      headerName: 'Title',
      flex: 1.5,
      minWidth: 240,
    },
    {
      field: 'contentType',
      headerName: 'Type',
      flex: 1,
      minWidth: 150,
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2'>
          {getContentTypeLabel(params.value)}
        </Typography>
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      minWidth: 140,
      renderCell: (params: GridRenderCellParams) => (
        <StatusChip status={params.value} />
      ),
    },
    {
      field: 'priority',
      headerName: 'Priority',
      flex: 1,
      minWidth: 130,
      renderCell: (params: GridRenderCellParams) => (
        <PriorityChip priority={params.value} />
      ),
    },
    {
      field: 'authorName',
      headerName: 'Author',
      flex: 1,
      minWidth: 170,
    },
    {
      field: 'platform',
      headerName: 'Platform',
      flex: 1,
      minWidth: 130,
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2'>
          {getPlatformLabel(params.value)}
        </Typography>
      ),
    },
    {
      field: 'dueDate',
      headerName: 'Due Date',
      flex: 1,
      minWidth: 130,
      valueGetter: (_, row) => row.dueDate ?? 'TBD',
    },
    {
      field: 'publishDate',
      headerName: 'Publish Date',
      flex: 1,
      minWidth: 140,
      valueGetter: (_, row) => row.publishDate ?? 'TBD',
    },
    {
      field: 'actions',
      headerName: '',
      width: 72,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams) => (
        <IconButton
          aria-label='Edit content item'
          onClick={(event) => {
            event.stopPropagation();
            setSelectedContentId(params.row.id);
            setFormMode('edit');
            setFormOpen(true);
          }}
        >
          <EditOutlinedIcon fontSize='small' />
        </IconButton>
      ),
    },
  ];

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

        <Paper sx={{ height: 620, p: 1 }}>
          <DataGrid
            rows={rows}
            columns={columns}
            loading={isLoading}
            pageSizeOptions={[5, 10, 25]}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 10, page: 0 },
              },
            }}
            onRowClick={(params) => handleRowClick(params.row.id)}
            sx={{
              border: 0,
              '& .MuiDataGrid-row': {
                cursor: 'pointer',
              },
            }}
            disableRowSelectionOnClick
            slots={{
              loadingOverlay: () => (
                <Stack
                  alignItems='center'
                  justifyContent='center'
                  sx={{ height: '100%' }}
                  spacing={2}
                >
                  <CircularProgress />
                  <Typography color='text.secondary'>
                    Loading content...
                  </Typography>
                </Stack>
              ),
            }}
          />
        </Paper>
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
