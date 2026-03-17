import { mockContent } from '../data/mockContent';
import type { ContentItem } from '../types/content';

const SIMULATED_DELAY_MS = 250;

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// In-memory store for the mock phase.
// Later this file can be swapped to Supabase/API calls.
let contentStore: ContentItem[] = [...mockContent];

export async function getContentItems(): Promise<ContentItem[]> {
  await delay(SIMULATED_DELAY_MS);
  return [...contentStore];
}

export async function getContentItemById(
  id: string,
): Promise<ContentItem | undefined> {
  await delay(SIMULATED_DELAY_MS);
  return contentStore.find((item) => item.id === id);
}

export async function createContentItem(
  input: ContentItem,
): Promise<ContentItem> {
  await delay(SIMULATED_DELAY_MS);
  contentStore = [input, ...contentStore];
  return input;
}

export async function updateContentItem(
  id: string,
  updates: Partial<ContentItem>,
): Promise<ContentItem> {
  await delay(SIMULATED_DELAY_MS);

  const existingItem = contentStore.find((item) => item.id === id);

  if (!existingItem) {
    throw new Error(`Content item with id "${id}" was not found.`);
  }

  const updatedItem: ContentItem = {
    ...existingItem,
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  contentStore = contentStore.map((item) =>
    item.id === id ? updatedItem : item,
  );

  return updatedItem;
}

export async function deleteContentItem(id: string): Promise<{ id: string }> {
  await delay(SIMULATED_DELAY_MS);
  contentStore = contentStore.filter((item) => item.id !== id);
  return { id };
}
