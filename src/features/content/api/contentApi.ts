import type { ContentItem } from '../types/content';

const API_BASE = '/api/content';

export async function getContentItems(): Promise<ContentItem[]> {
  const response = await fetch(API_BASE);
  if (!response.ok) {
    throw new Error('Failed to fetch content items');
  }
  return response.json();
}

export async function getContentItemById(
  id: string,
): Promise<ContentItem | undefined> {
  const response = await fetch(`${API_BASE}/${id}`);
  if (response.status === 404) {
    return undefined;
  }
  if (!response.ok) {
    throw new Error('Failed to fetch content item');
  }
  return response.json();
}

export async function createContentItem(
  input: ContentItem,
): Promise<ContentItem> {
  const response = await fetch(API_BASE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });
  if (!response.ok) {
    throw new Error('Failed to create content item');
  }
  return response.json();
}

export async function updateContentItem(
  id: string,
  updates: Partial<ContentItem>,
): Promise<ContentItem> {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  });
  if (!response.ok) {
    throw new Error('Failed to update content item');
  }
  return response.json();
}

export async function deleteContentItem(id: string): Promise<{ id: string }> {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete content item');
  }
  return response.json();
}
