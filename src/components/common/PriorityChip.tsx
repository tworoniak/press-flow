import Chip from '@mui/material/Chip';
import type { ChipProps } from '@mui/material/Chip';

import type { ContentPriority } from '../../features/content/types/content';
import { getPriorityLabel } from '../../features/content/utils/contentLabels';

function getPriorityColor(priority: ContentPriority): ChipProps['color'] {
  switch (priority) {
    case 'low':
      return 'default';
    case 'medium':
      return 'info';
    case 'high':
      return 'warning';
    case 'urgent':
      return 'error';
    default:
      return 'default';
  }
}

export default function PriorityChip({
  priority,
}: {
  priority: ContentPriority;
}) {
  return (
    <Chip
      label={getPriorityLabel(priority)}
      color={getPriorityColor(priority)}
      size='small'
    />
  );
}
