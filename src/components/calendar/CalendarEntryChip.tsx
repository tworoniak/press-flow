import { Chip } from '@mui/material';
import type { CalendarEntry } from '../../features/content/utils/contentCalendar';

type CalendarEntryChipProps = {
  entry: CalendarEntry;
  onClick: (itemId: string) => void;
};

function getChipColor(type: CalendarEntry['type']) {
  return type === 'publish' ? 'success' : 'warning';
}

function getChipLabel(entry: CalendarEntry) {
  return `${entry.type === 'publish' ? 'Publish' : 'Due'}: ${entry.title}`;
}

export default function CalendarEntryChip({
  entry,
  onClick,
}: CalendarEntryChipProps) {
  return (
    <Chip
      label={getChipLabel(entry)}
      size='small'
      color={getChipColor(entry.type)}
      variant={entry.type === 'publish' ? 'filled' : 'outlined'}
      onClick={() => onClick(entry.itemId)}
      sx={{
        width: '100%',
        maxWidth: '100%',
        justifyContent: 'flex-start',
        minWidth: 0,
        '& .MuiChip-label': {
          display: 'block',
          minWidth: 0,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        },
      }}
    />
  );
}
