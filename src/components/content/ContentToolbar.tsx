import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment, MenuItem, Stack, TextField } from '@mui/material';

import type {
  ContentPriority,
  ContentStatus,
  Platform,
} from '../../features/content/types/content';

type Props = {
  search: string;
  status: ContentStatus | 'all';
  priority: ContentPriority | 'all';
  platform: Platform | 'all';
  onSearchChange: (value: string) => void;
  onStatusChange: (value: ContentStatus | 'all') => void;
  onPriorityChange: (value: ContentPriority | 'all') => void;
  onPlatformChange: (value: Platform | 'all') => void;
};

export default function ContentToolbar({
  search,
  status,
  priority,
  platform,
  onSearchChange,
  onStatusChange,
  onPriorityChange,
  onPlatformChange,
}: Props) {
  return (
    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ pb: 1 }}>
      <TextField
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder='Search content...'
        size='small'
        sx={{ minWidth: 220 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <SearchIcon fontSize='small' />
            </InputAdornment>
          ),
        }}
      />

      <TextField
        select
        label='Status'
        size='small'
        value={status}
        onChange={(e) =>
          onStatusChange(e.target.value as ContentStatus | 'all')
        }
        sx={{ minWidth: 160 }}
      >
        <MenuItem value='all'>All</MenuItem>
        <MenuItem value='idea'>Idea</MenuItem>
        <MenuItem value='drafting'>Drafting</MenuItem>
        <MenuItem value='editing'>Editing</MenuItem>
        <MenuItem value='scheduled'>Scheduled</MenuItem>
        <MenuItem value='published'>Published</MenuItem>
      </TextField>

      <TextField
        select
        label='Priority'
        size='small'
        value={priority}
        onChange={(e) =>
          onPriorityChange(e.target.value as ContentPriority | 'all')
        }
        sx={{ minWidth: 160 }}
      >
        <MenuItem value='all'>All</MenuItem>
        <MenuItem value='low'>Low</MenuItem>
        <MenuItem value='medium'>Medium</MenuItem>
        <MenuItem value='high'>High</MenuItem>
        <MenuItem value='urgent'>Urgent</MenuItem>
      </TextField>

      <TextField
        select
        label='Platform'
        size='small'
        value={platform}
        onChange={(e) => onPlatformChange(e.target.value as Platform | 'all')}
        sx={{ minWidth: 160 }}
      >
        <MenuItem value='all'>All</MenuItem>
        <MenuItem value='website'>Website</MenuItem>
        <MenuItem value='instagram'>Instagram</MenuItem>
        <MenuItem value='facebook'>Facebook</MenuItem>
        <MenuItem value='bluesky'>Bluesky</MenuItem>
        <MenuItem value='newsletter'>Newsletter</MenuItem>
      </TextField>
    </Stack>
  );
}
