import { useQuery } from '@tanstack/react-query';
import { getContentItemById, getContentItems } from '../api/contentApi';

export function useContent() {
  return useQuery({
    queryKey: ['content'],
    queryFn: getContentItems,
  });
}

export function useContentItem(id?: string) {
  return useQuery({
    queryKey: ['content', id],
    queryFn: () => getContentItemById(id!),
    enabled: Boolean(id),
  });
}
