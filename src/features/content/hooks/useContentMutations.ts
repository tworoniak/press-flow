import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createContentItem,
  deleteContentItem,
  updateContentItem,
} from '../api/contentApi';
import type { ContentItem } from '../types/content';

export function useCreateContentItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: ContentItem) => createContentItem(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['content'] });
    },
  });
}

export function useUpdateContentItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      updates,
    }: {
      id: string;
      updates: Partial<ContentItem>;
    }) => updateContentItem(id, updates),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['content'] });
      queryClient.invalidateQueries({ queryKey: ['content', variables.id] });
    },
  });
}

export function useDeleteContentItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteContentItem(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['content'] });
      queryClient.invalidateQueries({ queryKey: ['content', id] });
    },
  });
}
