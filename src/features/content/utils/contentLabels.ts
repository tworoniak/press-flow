import type {
  ContentPriority,
  ContentStatus,
  ContentType,
  Platform,
} from '../types/content';

function startCase(value: string) {
  return value
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

export function getStatusLabel(status: ContentStatus) {
  return startCase(status);
}

export function getPriorityLabel(priority: ContentPriority) {
  return startCase(priority);
}

export function getContentTypeLabel(type: ContentType) {
  return startCase(type);
}

export function getPlatformLabel(platform: Platform) {
  return startCase(platform);
}
