# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

vm-flow is the frontend of **A.T.L.A.S.**, a dashboard for managing virtual machines grouped by application/project and for visualizing their service topology. The stack is React 19 + TypeScript + Vite, Tailwind CSS v4, React Router v8, React Flow (`@xyflow/react`) with `dagre` for graph layout, and Microsoft Entra ID (MSAL) for authentication. The UI text and code comments are in Portuguese (pt-BR); new UI strings should be in Portuguese too.

## Commands

```bash
npm run dev           # Vite dev server
npm run build         # type-check (tsc -b) + production build
npm run lint          # ESLint
npm run format        # Prettier write
npm run format:check  # Prettier check
```

There is no test framework configured yet. `npm run build` is the type-check gate.

Prettier config: single quotes, semicolons, 2-space indent, `printWidth: 100`, no trailing commas.

## Environment

MSAL reads `VITE_AZURE_CLIENT_ID` and `VITE_AZURE_TENANT_ID` from `.env` (see `src/auth/msal.ts`). The redirect URI is `window.location.origin`, so the dev server origin has to be registered in the Entra app registration.

## Architecture

**Provider stack:** `main.tsx` wraps the app in `MsalProvider`. `App.tsx` then nests `ThemeProvider` → `UserProvider` → `BrowserRouter`.

**Routing and auth (`src/App.tsx`, `src/auth/`):**
- `/login` sits outside the layout. `PageLogin` triggers `loginRedirect` and redirects to `/` once authenticated.
- All other pages render inside `LayoutMain` (sidebar + `MainContent` + `<Outlet/>`).
- `ProtectedRoutes` shows a `Skeleton` while MSAL has an interaction in progress. Unauthenticated users are redirected to `/`, not `/login`.
- `RoleRoute allowed={[...]}` checks Entra **app roles** from `idTokenClaims.roles` and renders `PageNotfound` when access is denied.
- `useRoles()` / `hasRole(...)` and the `<HasRole allowed>` component handle role gating inside components. The sidebar filters `menuItems` by their `roles` field (no `roles` means any logged-in user).
- Role names such as `'admin'` must match the app roles defined in the Entra app registration.

**User context:** `UserProvider` (`src/context/user-context.tsx`) still returns a hardcoded mock user (`/api/me` is commented out). It is separate from the MSAL account, so role checks use MSAL claims, not `user.role`.

**Data:** There is no backend integration yet. Pages keep their state in local `useState`, seeded from the mocks in `src/types/topology.ts` (`Application` → `VirtualMachine[]` → `ServiceItem[]`, where `connectedVmIds` links services across VMs). Commented `fetch('/api/...')` blocks mark where API calls are expected to go.

**Topology graphs:** These are React Flow graphs that use the custom node type `custom` (`src/components/custom-service-node.tsx`). Positions are computed with `getLayoutedElements(nodes, edges, 'TB' | 'LR')` in `src/utils/getLayoutedElements.ts` (dagre, fixed 200×80 nodes).

**Directory conventions:**
- `src/components/`: generic UI primitives (`button`, `text`, `icon`, `skeleton`, …) built with `class-variance-authority` variants.
- `src/core-components/`: app-specific composite pieces (sidebar, headers, cards, modals).
- `src/pages/`: route pages named `page-*.tsx`. Layouts live in `src/pages/Layouts/`.
- File names are kebab-case and components use named exports (`export function X`).

**Styling and theming:** Tailwind v4 is configured in CSS, with no `tailwind.config`. `src/index.css` defines semantic CSS variables (`--background-primary`, `--text-primary`, `--action-primary`, `--status-*`, …) for `:root` and `.dark`, and exposes them as Tailwind colors through `@theme inline` (e.g. `bg-background-secondary`, `text-action-primary`). Dark mode is class-based: `ThemeProvider` toggles `.dark` on `<html>` and persists `light | dark | system` in `localStorage`. Prefer these semantic tokens over raw colors.

**SVGs:** `vite-plugin-svgr` is enabled, so SVGs can be imported as components with the `?react` suffix (e.g. `import Logo from '../assets/logo_atlas_atlas.svg?react'`).
