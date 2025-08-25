import { Fragment } from 'react'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider
} from 'react-router'
import Root from './common/Root'
import RootErrorBoundary from './common/RootErrorBoundary'
import ThemeProvider from '@app/modules/theme/ThemeProvider'
import Background from '@app/shared/Background'
import SceneRoot from '@app/modules/pixi/SceneRoot'
import BetSlipRoot from '@app/modules/pixi/BetSlipRoot'
import '@app/utils/extension.js'

const routes = createRoutesFromElements(
  <Route
    Component={Root}
    ErrorBoundary={RootErrorBoundary}
    HydrateFallback={Fragment}
  >
    <Route index element={<Navigate to="home" replace />} />
    <Route path="home" lazy={() => import('./home/HomePage')} />
    <Route path="setup" lazy={() => import('./setup/SetupPage')} />
    <Route path="lobby" lazy={() => import('./lobby/LobbyPage')} />
    <Route path="matches" lazy={() => import('./matches/Matches')} />
    <Route path="match" lazy={() => import('./match/Match')} />
    <Route path="error" lazy={() => import('./error/GeneralErrorPage')} />
    <Route
      path="unauthorized"
      lazy={() => import('./error/UnauthorizedPage')}
    />
    <Route path="forbidden" lazy={() => import('./error/ForbiddenPage')} />
    <Route
      path="invalid-token"
      lazy={() => import('./error/InvalidTokenPage')}
    />
    <Route path="not-found" lazy={() => import('./error/NotFoundPage')} />
    <Route path="*" element={<Navigate to="/not-found" replace />} />
  </Route>
)

export default function Router() {
  const router = createBrowserRouter(routes)

  return (
    <ThemeProvider>
      <SceneRoot />
      <BetSlipRoot />
      <div className="relative isolate z-[1] flex h-dvh w-full flex-col overflow-hidden">
        <Background />
        <RouterProvider router={router} />
      </div>
    </ThemeProvider>
  )
}
