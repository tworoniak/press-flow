import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import {
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
import { useMemo } from 'react';

import PriorityChip from '../common/PriorityChip';
import StatusChip from '../common/StatusChip';
import type { ContentItem } from '../../features/content/types/content';
import type { TeamMember } from '../../features/team/types/team';
import {
  getContentTypeLabel,
  getPlatformLabel,
} from '../../features/content/utils/contentLabels';

type ContentTableProps = {
  rows: ContentItem[];
  team: TeamMember[];
  loading?: boolean;
  onRowClick: (id: string) => void;
  onEditClick: (id: string) => void;
};

export default function ContentTable({
  rows,
  team,
  loading = false,
  onRowClick,
  onEditClick,
}: ContentTableProps) {
  const mappedRows = useMemo(() => {
    return rows.map((item) => {
      const author = team.find((member) => member.id === item.authorId);

      return {
        ...item,
        authorName: author?.name ?? 'Unknown',
      };
    });
  }, [rows, team]);

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
            onEditClick(params.row.id);
          }}
        >
          <EditOutlinedIcon fontSize='small' />
        </IconButton>
      ),
    },
  ];

  return (
    <Paper sx={{ height: 620, p: 1 }}>
      <DataGrid
        rows={mappedRows}
        columns={columns}
        loading={loading}
        pageSizeOptions={[5, 10, 25]}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 10, page: 0 },
          },
        }}
        onRowClick={(params) => onRowClick(params.row.id)}
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
              <Typography color='text.secondary'>Loading content...</Typography>
            </Stack>
          ),
        }}
      />
    </Paper>
  );
}
