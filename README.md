# PressFlow v1.0

[![PressFlow Dashboard](/src/assets/screenshots/pressflow-dashboard.png)](https://pressflow.vercel.app)

**_PressFlow_** is a modern **editorial workflow dashboard** built with **React, TypeScript, and Material UI** for managing content from idea through publication.

The application simulates a real-world **editorial operations platform**, allowing teams to track drafts, manage review stages, visualize publishing pipelines, and monitor upcoming releases across platforms.

PressFlow focuses on **content lifecycle management**, providing tools for editorial teams to move content through drafting, editing, scheduling, and publishing workflows.

---

## Screenshots

### Dashboard

![Dashboard Demo](/src/assets/screenshots/pressflow-dashboard-animation.gif)

## Features

- ### Editorial Dashboard
  - Workflow status overview
  - Content distribution analytics
  - Upcoming publishing schedule
  - Due-soon deadlines
  - Recent editorial activity

- ### Content Management
  - Full content queue with filtering and search
  - Create and edit content items
  - Status tracking across editorial stages
  - Priority management

- ### Kanban Editorial Board
  - Visual workflow stages (Idea → Drafting → Editing → Scheduled → Published)
  - Quick card overview of content status
  - Click-to-open details drawer

- ### Analytics
  - Workflow status breakdown charts
  - Content type distribution charts
  - Editorial insights for planning coverage

- ### Responsive UI
  - Desktop dashboard experience
  - Mobile-friendly card views

---

## Tech Stack

### Frontend

- React
- TypeScript
- Material UI
- Recharts

### State & Data

- TanStack Query
- Feature-based architecture
- Mock API layer simulating backend services

### Architecture

- Feature-based folder structure
- Reusable UI components
- Modular dashboard widgets
- Scalable structure ready for backend integration

---

## Future Improvements

- Drag-and-drop Kanban board
- Editorial calendar view
- Content readiness scoring
- Role-based permissions
- Backend integration (Supabase or Node API)

---

```txt
src/
  app/
    providers.tsx
    queryClient.ts
    router.tsx
    theme.ts

  components/
    layout/
      AppShell.tsx

  features/
    content/
      api/
        contentApi.ts
      data/
        mockContent.ts
      hooks/
        useContent.ts
        useContentMutations.ts
      types/
        content.ts
      utils/
        contentHelpers.ts
    team/
      api/
        teamApi.ts
      data/
        mockTeam.ts
      hooks/
        useTeam.ts
      types/
        team.ts

  pages/
    CalendarPage.tsx
    ContentPage.tsx
    DashboardPage.tsx
    NotFoundPage.tsx

  lib/
    dayjs.ts

  main.tsx
```

---
