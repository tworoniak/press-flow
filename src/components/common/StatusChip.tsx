import Chip from '@mui/material/Chip';
import type { ChipProps } from '@mui/material/Chip';

import type { ContentStatus } from '../../features/content/types/content';
import { getStatusLabel } from '../../features/content/utils/contentLabels';

function getStatusColor(status: ContentStatus): ChipProps['color'] {
  switch (status) {
    case 'idea':
      return 'default';
    case 'pitching':
      return 'secondary';
    case 'assigned':
      return 'info';
    case 'drafting':
      return 'warning';
    case 'editing':
      return 'primary';
    case 'scheduled':
      return 'success';
    case 'published':
      return 'success';
    case 'archived':
      return 'default';
    default:
      return 'default';
  }
}

export default function StatusChip({ status }: { status: ContentStatus }) {
  return (
    <Chip
      label={getStatusLabel(status)}
      color={getStatusColor(status)}
      size='small'
      variant={status === 'archived' ? 'outlined' : 'filled'}
    />
  );
}
