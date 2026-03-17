import {
  Alert,
  CircularProgress,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';

import { useContent } from '../features/content/hooks/useContent';

const columns: GridColDef[] = [
  { field: 'title', headerName: 'Title', flex: 1.5, minWidth: 240 },
  { field: 'contentType', headerName: 'Type', flex: 1, minWidth: 140 },
  { field: 'status', headerName: 'Status', flex: 1, minWidth: 130 },
  { field: 'priority', headerName: 'Priority', flex: 1, minWidth: 120 },
  { field: 'platform', headerName: 'Platform', flex: 1, minWidth: 130 },
  { field: 'dueDate', headerName: 'Due Date', flex: 1, minWidth: 130 },
  { field: 'publishDate', headerName: 'Publish Date', flex: 1, minWidth: 140 },
];

export default function ContentPage() {
  const { data: content = [], isLoading, isError } = useContent();

  return (
    <Stack spacing={3}>
      <Typography variant='h4' fontWeight={800}>
        Content
      </Typography>

      {isError && (
        <Alert severity='error'>We couldn&apos;t load the content items.</Alert>
      )}

      <Paper sx={{ height: 560, p: 1 }}>
        <DataGrid
          rows={content}
          columns={columns}
          loading={isLoading}
          pageSizeOptions={[5, 10, 25]}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10, page: 0 },
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
  );
}
