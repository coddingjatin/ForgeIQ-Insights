import { Route as rootRouteImport } from './routes/__root'
import { Route as SettingsRouteImport } from './routes/settings'
import { Route as NotificationsRouteImport } from './routes/notifications'
import { Route as MaintenanceRouteImport } from './routes/maintenance'
import { Route as LoginRouteImport } from './routes/login'
import { Route as KnowledgeHubRouteImport } from './routes/knowledge-hub'
import { Route as KnowledgeGraphRouteImport } from './routes/knowledge-graph'
import { Route as IncidentsRouteImport } from './routes/incidents'
import { Route as ExpertsRouteImport } from './routes/experts'
import { Route as DocumentsRouteImport } from './routes/documents'
import { Route as CopilotRouteImport } from './routes/copilot'
import { Route as ComplianceRouteImport } from './routes/compliance'
import { Route as AnalyticsRouteImport } from './routes/analytics'
import { Route as IndexRouteImport } from './routes/index'

const SettingsRoute = SettingsRouteImport.update({
  id: '/settings',
  path: '/settings',
  getParentRoute: () => rootRouteImport,
} as any)
const NotificationsRoute = NotificationsRouteImport.update({
  id: '/notifications',
  path: '/notifications',
  getParentRoute: () => rootRouteImport,
} as any)
const MaintenanceRoute = MaintenanceRouteImport.update({
  id: '/maintenance',
  path: '/maintenance',
  getParentRoute: () => rootRouteImport,
} as any)
const LoginRoute = LoginRouteImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => rootRouteImport,
} as any)
const KnowledgeHubRoute = KnowledgeHubRouteImport.update({
  id: '/knowledge-hub',
  path: '/knowledge-hub',
  getParentRoute: () => rootRouteImport,
} as any)
const KnowledgeGraphRoute = KnowledgeGraphRouteImport.update({
  id: '/knowledge-graph',
  path: '/knowledge-graph',
  getParentRoute: () => rootRouteImport,
} as any)
const IncidentsRoute = IncidentsRouteImport.update({
  id: '/incidents',
  path: '/incidents',
  getParentRoute: () => rootRouteImport,
} as any)
const ExpertsRoute = ExpertsRouteImport.update({
  id: '/experts',
  path: '/experts',
  getParentRoute: () => rootRouteImport,
} as any)
const DocumentsRoute = DocumentsRouteImport.update({
  id: '/documents',
  path: '/documents',
  getParentRoute: () => rootRouteImport,
} as any)
const CopilotRoute = CopilotRouteImport.update({
  id: '/copilot',
  path: '/copilot',
  getParentRoute: () => rootRouteImport,
} as any)
const ComplianceRoute = ComplianceRouteImport.update({
  id: '/compliance',
  path: '/compliance',
  getParentRoute: () => rootRouteImport,
} as any)
const AnalyticsRoute = AnalyticsRouteImport.update({
  id: '/analytics',
  path: '/analytics',
  getParentRoute: () => rootRouteImport,
} as any)
const IndexRoute = IndexRouteImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRouteImport,
} as any)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/analytics': typeof AnalyticsRoute
  '/compliance': typeof ComplianceRoute
  '/copilot': typeof CopilotRoute
  '/documents': typeof DocumentsRoute
  '/experts': typeof ExpertsRoute
  '/incidents': typeof IncidentsRoute
  '/knowledge-graph': typeof KnowledgeGraphRoute
  '/knowledge-hub': typeof KnowledgeHubRoute
  '/login': typeof LoginRoute
  '/maintenance': typeof MaintenanceRoute
  '/notifications': typeof NotificationsRoute
  '/settings': typeof SettingsRoute
}
export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/analytics': typeof AnalyticsRoute
  '/compliance': typeof ComplianceRoute
  '/copilot': typeof CopilotRoute
  '/documents': typeof DocumentsRoute
  '/experts': typeof ExpertsRoute
  '/incidents': typeof IncidentsRoute
  '/knowledge-graph': typeof KnowledgeGraphRoute
  '/knowledge-hub': typeof KnowledgeHubRoute
  '/login': typeof LoginRoute
  '/maintenance': typeof MaintenanceRoute
  '/notifications': typeof NotificationsRoute
  '/settings': typeof SettingsRoute
}
export interface FileRoutesById {
  __root__: typeof rootRouteImport
  '/': typeof IndexRoute
  '/analytics': typeof AnalyticsRoute
  '/compliance': typeof ComplianceRoute
  '/copilot': typeof CopilotRoute
  '/documents': typeof DocumentsRoute
  '/experts': typeof ExpertsRoute
  '/incidents': typeof IncidentsRoute
  '/knowledge-graph': typeof KnowledgeGraphRoute
  '/knowledge-hub': typeof KnowledgeHubRoute
  '/login': typeof LoginRoute
  '/maintenance': typeof MaintenanceRoute
  '/notifications': typeof NotificationsRoute
  '/settings': typeof SettingsRoute
}
export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/analytics'
    | '/compliance'
    | '/copilot'
    | '/documents'
    | '/experts'
    | '/incidents'
    | '/knowledge-graph'
    | '/knowledge-hub'
    | '/login'
    | '/maintenance'
    | '/notifications'
    | '/settings'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/analytics'
    | '/compliance'
    | '/copilot'
    | '/documents'
    | '/experts'
    | '/incidents'
    | '/knowledge-graph'
    | '/knowledge-hub'
    | '/login'
    | '/maintenance'
    | '/notifications'
    | '/settings'
  id:
    | '__root__'
    | '/'
    | '/analytics'
    | '/compliance'
    | '/copilot'
    | '/documents'
    | '/experts'
    | '/incidents'
    | '/knowledge-graph'
    | '/knowledge-hub'
    | '/login'
    | '/maintenance'
    | '/notifications'
    | '/settings'
  fileRoutesById: FileRoutesById
}
export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AnalyticsRoute: typeof AnalyticsRoute
  ComplianceRoute: typeof ComplianceRoute
  CopilotRoute: typeof CopilotRoute
  DocumentsRoute: typeof DocumentsRoute
  ExpertsRoute: typeof ExpertsRoute
  IncidentsRoute: typeof IncidentsRoute
  KnowledgeGraphRoute: typeof KnowledgeGraphRoute
  KnowledgeHubRoute: typeof KnowledgeHubRoute
  LoginRoute: typeof LoginRoute
  MaintenanceRoute: typeof MaintenanceRoute
  NotificationsRoute: typeof NotificationsRoute
  SettingsRoute: typeof SettingsRoute
}

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/settings': {
      id: '/settings'
      path: '/settings'
      fullPath: '/settings'
      preLoaderRoute: typeof SettingsRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/notifications': {
      id: '/notifications'
      path: '/notifications'
      fullPath: '/notifications'
      preLoaderRoute: typeof NotificationsRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/maintenance': {
      id: '/maintenance'
      path: '/maintenance'
      fullPath: '/maintenance'
      preLoaderRoute: typeof MaintenanceRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/knowledge-hub': {
      id: '/knowledge-hub'
      path: '/knowledge-hub'
      fullPath: '/knowledge-hub'
      preLoaderRoute: typeof KnowledgeHubRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/knowledge-graph': {
      id: '/knowledge-graph'
      path: '/knowledge-graph'
      fullPath: '/knowledge-graph'
      preLoaderRoute: typeof KnowledgeGraphRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/incidents': {
      id: '/incidents'
      path: '/incidents'
      fullPath: '/incidents'
      preLoaderRoute: typeof IncidentsRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/experts': {
      id: '/experts'
      path: '/experts'
      fullPath: '/experts'
      preLoaderRoute: typeof ExpertsRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/documents': {
      id: '/documents'
      path: '/documents'
      fullPath: '/documents'
      preLoaderRoute: typeof DocumentsRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/copilot': {
      id: '/copilot'
      path: '/copilot'
      fullPath: '/copilot'
      preLoaderRoute: typeof CopilotRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/compliance': {
      id: '/compliance'
      path: '/compliance'
      fullPath: '/compliance'
      preLoaderRoute: typeof ComplianceRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/analytics': {
      id: '/analytics'
      path: '/analytics'
      fullPath: '/analytics'
      preLoaderRoute: typeof AnalyticsRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexRouteImport
      parentRoute: typeof rootRouteImport
    }
  }
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AnalyticsRoute: AnalyticsRoute,
  ComplianceRoute: ComplianceRoute,
  CopilotRoute: CopilotRoute,
  DocumentsRoute: DocumentsRoute,
  ExpertsRoute: ExpertsRoute,
  IncidentsRoute: IncidentsRoute,
  KnowledgeGraphRoute: KnowledgeGraphRoute,
  KnowledgeHubRoute: KnowledgeHubRoute,
  LoginRoute: LoginRoute,
  MaintenanceRoute: MaintenanceRoute,
  NotificationsRoute: NotificationsRoute,
  SettingsRoute: SettingsRoute,
}
export const routeTree = rootRouteImport
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()
