import { createBrowserRouter } from 'react-router-dom';
import AppShell from '../components/layout/AppShell';
import BoardPage from '../pages/BoardPage';
import CalendarPage from '../pages/CalendarPage';
import ContentPage from '../pages/ContentPage';
import DashboardPage from '../pages/DashboardPage';
import NotFoundPage from '../pages/NotFoundPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'content', element: <ContentPage /> },
      { path: 'board', element: <BoardPage /> },
      { path: 'calendar', element: <CalendarPage /> },
    ],
  },
]);
