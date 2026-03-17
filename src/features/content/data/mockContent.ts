import type { ContentItem } from '../types/content';

export const mockContent: ContentItem[] = [
  {
    id: 'content-1',
    title: 'Spiritbox – Tsunami Sea Review',
    slug: 'spiritbox-tsunami-sea-review',
    summary:
      'Album review draft covering standout tracks, vocal performance, and overall atmosphere.',
    contentType: 'album-review',
    status: 'editing',
    priority: 'high',
    authorId: 'tm-2',
    editorId: 'tm-1',
    platform: 'website',
    tags: ['Spiritbox', 'Album Review', 'Metalcore'],
    dueDate: '2026-03-18',
    publishDate: '2026-03-20',
    createdAt: '2026-03-10T09:00:00.000Z',
    updatedAt: '2026-03-15T14:30:00.000Z',
    checklist: [
      { id: 'c1-1', label: 'Draft complete', completed: true },
      { id: 'c1-2', label: 'Quotes verified', completed: true },
      { id: 'c1-3', label: 'SEO complete', completed: false },
      { id: 'c1-4', label: 'Social copy written', completed: false },
    ],
    notes:
      'Needs stronger closing paragraph and final score confirmation before publish.',
    seoTitle: 'Spiritbox Tsunami Sea Review | PressFlow',
    seoDescription:
      'A detailed review of Spiritbox’s Tsunami Sea with highlights, performance notes, and final verdict.',
    revisionHistory: [
      {
        id: 'r1-1',
        timestamp: '2026-03-12T11:00:00.000Z',
        user: 'Jamie Carter',
        action: 'Submitted first draft',
      },
      {
        id: 'r1-2',
        timestamp: '2026-03-15T14:30:00.000Z',
        user: 'Thomas Woroniak',
        action: 'Requested edits to intro and conclusion',
      },
    ],
  },
  {
    id: 'content-2',
    title: 'Aftershock 2026 Festival Preview',
    slug: 'aftershock-2026-festival-preview',
    summary:
      'Preview piece focused on major headliners, daily highlights, and must-see undercard acts.',
    contentType: 'festival-preview',
    status: 'drafting',
    priority: 'urgent',
    authorId: 'tm-4',
    editorId: 'tm-1',
    platform: 'website',
    tags: ['Aftershock', 'Festival Preview', 'Live Music'],
    dueDate: '2026-03-22',
    publishDate: '2026-03-25',
    createdAt: '2026-03-11T08:15:00.000Z',
    updatedAt: '2026-03-14T18:00:00.000Z',
    checklist: [
      { id: 'c2-1', label: 'Draft complete', completed: false },
      { id: 'c2-2', label: 'Lineup checked', completed: true },
      { id: 'c2-3', label: 'Images ready', completed: false },
      { id: 'c2-4', label: 'Social copy written', completed: false },
    ],
    notes:
      'Need final daily lineup confirmation and stronger section for emerging bands.',
    seoTitle: 'Aftershock 2026 Festival Preview | PressFlow',
    seoDescription:
      'A preview of Aftershock 2026 featuring headliners, lineup highlights, and anticipated sets.',
    revisionHistory: [
      {
        id: 'r2-1',
        timestamp: '2026-03-11T08:15:00.000Z',
        user: 'Thomas Woroniak',
        action: 'Created content item',
      },
      {
        id: 'r2-2',
        timestamp: '2026-03-14T18:00:00.000Z',
        user: 'Morgan Lee',
        action: 'Added lineup notes and outline',
      },
    ],
  },
  {
    id: 'content-3',
    title: 'Interview: Yngwie Malmsteen on Touring and Legacy',
    slug: 'interview-yngwie-malmsteen-touring-legacy',
    summary:
      'Interview feature centered on current touring plans, musicianship, and career perspective.',
    contentType: 'interview',
    status: 'scheduled',
    priority: 'high',
    authorId: 'tm-1',
    editorId: 'tm-1',
    platform: 'website',
    tags: ['Interview', 'Yngwie Malmsteen', 'Guitar'],
    dueDate: '2026-03-12',
    publishDate: '2026-03-17',
    createdAt: '2026-03-05T10:00:00.000Z',
    updatedAt: '2026-03-13T16:45:00.000Z',
    checklist: [
      { id: 'c3-1', label: 'Transcript cleaned', completed: true },
      { id: 'c3-2', label: 'Quotes verified', completed: true },
      { id: 'c3-3', label: 'SEO complete', completed: true },
      { id: 'c3-4', label: 'Social copy written', completed: true },
    ],
    notes: 'Ready to publish Tuesday morning.',
    seoTitle: 'Yngwie Malmsteen Interview | PressFlow',
    seoDescription:
      'An interview discussing touring, legacy, and musicianship with Yngwie Malmsteen.',
    revisionHistory: [
      {
        id: 'r3-1',
        timestamp: '2026-03-08T09:30:00.000Z',
        user: 'Thomas Woroniak',
        action: 'Uploaded cleaned transcript',
      },
      {
        id: 'r3-2',
        timestamp: '2026-03-13T16:45:00.000Z',
        user: 'Thomas Woroniak',
        action: 'Marked item as scheduled',
      },
    ],
  },
  {
    id: 'content-4',
    title: 'Louder Than Life Social Promo Pack',
    slug: 'louder-than-life-social-promo-pack',
    summary:
      'A set of social promo copy variations for upcoming festival coverage posts.',
    contentType: 'social-post',
    status: 'assigned',
    priority: 'medium',
    authorId: 'tm-2',
    editorId: 'tm-1',
    platform: 'instagram',
    tags: ['Social Media', 'Louder Than Life', 'Promo'],
    dueDate: '2026-03-19',
    publishDate: '2026-03-21',
    createdAt: '2026-03-13T12:00:00.000Z',
    updatedAt: '2026-03-13T12:00:00.000Z',
    checklist: [
      { id: 'c4-1', label: 'Captions drafted', completed: false },
      { id: 'c4-2', label: 'Hashtags reviewed', completed: false },
      { id: 'c4-3', label: 'Graphic assets ready', completed: false },
    ],
    notes:
      'Need three caption tone variations: hype, informative, and concise.',
    seoTitle: '',
    seoDescription: '',
    revisionHistory: [
      {
        id: 'r4-1',
        timestamp: '2026-03-13T12:00:00.000Z',
        user: 'Thomas Woroniak',
        action: 'Assigned social promo task',
      },
    ],
  },
];
