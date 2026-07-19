# FactoryOS — Session Handover

Date: 19 July 2026
Repository: `c:\Users\Katiyo\Documents\GitHub\factoryos`
Branch: `main`

## Purpose of this document

Bring the next session (or developer) up to speed on what FactoryOS is, what has been built, how it is structured, and what to do next. Read this first, then `RAWPLAST_OPERATIONS_ANALYSIS.md` and `FACTORYOS_DECISION.md`.

## 1. Project context

FactoryOS is an internal operating system for Rawplast Industries (flexible packaging manufacturer, Zimbabwe/SADC). It is explicitly not a generic ERP. The goal is to digitize the existing paper workflow with minimal operational change.

The operating spine, taken directly from Rawplast's controlled forms:

`Order Confirmation → approvals → Works Order → production capture → quality gate → Finished Goods transfer → Despatch`

## 2. What was decided

- Platform choice: build a purpose-built MVP first, not SAP / Odoo / ERPNext. Rationale and the ERP comparison are in `FACTORYOS_DECISION.md`. ERPNext is the recommended future option for finance/procurement if/when ERP is needed.
- MVP persistence: browser `localStorage` only. This is a single-browser pilot for workflow validation, not production. Must move to a shared server database before multi-user rollout.

## 3. Deliverables produced this session

Documents (repo root):
- `RAWPLAST_OPERATIONS_ANALYSIS.md` — full current-state analysis: process map, departments, documents, data model, bottlenecks, MVP scope. Built from the PDFs/XLSX in `system docs/`.
- `FACTORYOS_DECISION.md` — platform decision, scope, local-storage limitation, decision gate.
- `SESSION_HANDOVER.md` — this file.

Canvas:
- `~/.cursor/projects/c-Users-Katiyo-Documents-GitHub-factoryos/canvases/rawplast-operations-analysis.canvas.tsx` — interactive overview of the analysis.

Application: `factoryos-app/` — the working MVP.

## 4. Application state

Stack: Vite 6 + React 19 + TypeScript, Tailwind CSS v4, shadcn/ui (new-york, stone base), lucide-react icons, sonner toasts.

Fonts (per `design_1.md`), all installed via `@fontsource-variable/*`:
- Display / wordmark: Stack Sans Notch (`.font-display`)
- Headings / stats: Geist Sans (`.font-heading`)
- Body: Inter (default)
- Data / labels: Geist Mono (`.font-mono`) — used on eyebrows, table headers, badges, field labels

Visual system follows `eleven labs.md`: off-white canvas, warm near-black ink, one pastel gradient orb on the dashboard hero, pill buttons, hairline borders, editorial spacing.

Emil Kowalski design-eng skill applied: buttons use `active:scale-[0.97]` with custom ease-out, transitions target specific properties (never `all`), durations under ~200ms, iOS drawer curve on the sidebar, `prefers-reduced-motion` disables motion.

### Implemented features

- Dashboard: hero, four stat cards, active works orders (clickable rows), approval release queue, operating-spine strip.
- Order confirmations: DI/R-03 register, create dialog, sequential approvals (Customer → Sales → then Accounts/Quality/Production), "Create works order" when fully approved.
- Works orders: DI/R-07 register, create-from-approved-order dialog, live produced/transferred/despatched columns, clickable rows.
- Production: digital Extrusion/Printing book with scrap, downtime codes, quality result; clickable rows.
- Works order detail dialog: opens from dashboard, works orders, and production rows. Shows quantity balances, progress, job details, all production runs, FG transfers, and despatches.
- Finished goods: DI/R-35 transfer register + dialog (limited to QA-passed, untransferred quantity).
- Despatch: register + dialog, validates against available FG, auto-completes works order when fully despatched.
- Machines: reference register seeded from the PM schedule.
- Data & backup: JSON export, import/restore, reset-to-demo.
- All dialogs close via header X, footer Cancel, Escape, and overlay click.

### Source file map (`factoryos-app/src/`)

- `types.ts` — all entity interfaces (`OrderConfirmation`, `WorksOrder`, `ProductionRun`, `FinishedGoodsTransfer`, `Despatch`, `Machine`, etc.).
- `data.ts` — `STORAGE_KEY` (`rawplast-factoryos-v1`), `emptyApprovals()`, and `seedData` (3 customers, 3 orders, 1 works order, 2 production runs, 8 machines).
- `useFactoryData.ts` — localStorage load/save hook plus `reset`, `exportData`, `importData`.
- `App.tsx` — the entire UI: shell/nav, all pages, the works order detail dialog, and the five controlled form components (Order, WorkOrder, Production, Transfer, Despatch).
- `components/ui/*` — shadcn components. Locally customized: `button.tsx` (pill + scale-on-press), `badge.tsx` (added success/warning/info/danger/neutral variants + mono uppercase), `table.tsx` (mono uppercase headers), `sonner.tsx` (fixed light theme, next-themes dependency removed).
- `index.css` — theme tokens mapping shadcn variables to the ElevenLabs palette + font roles.
- `lib/utils.ts` — `cn()` helper.

## 5. How to run

```powershell
cd factoryos-app
npm install
npm run dev      # start dev server
npm run lint     # tsc -b type-check (oxlint was removed; lint == type-check)
npm run build    # tsc -b && vite build
```

Verification status at handover: `npm run build` passes, type check passes, no IDE lint errors.

## 6. Environment notes / gotchas

- Node is v20.18.0; some newer tool versions warn `EBADENGINE` but work. Build tooling was pinned to Vite 6 / plugin-react 4 to match this Node.
- `oxlint` was removed because its native Windows binding failed to install; `npm run lint` now runs `tsc -b`.
- `next-themes` remains in `package.json` as a transitive dependency of the generated sonner component but is no longer imported.
- Shell is PowerShell: use `;` not `&&`, and `2>&1 | Out-String` buffers dev-server output (URL won't stream). Prefer `npm run build` to verify.
- shadcn path alias `@/*` is configured in `vite.config.ts`, `tsconfig.json`, and `tsconfig.app.json`. `baseUrl` was removed (TS 6 deprecation); `paths` resolves relative to the config.

## 7. Recommended next steps

Product/data:
1. Collect the missing controlled forms listed in `RAWPLAST_OPERATIONS_ANALYSIS.md` §8.7 (OC Checklist, Bagmaking/Planning books, Material Issue + Stock Card, Incoming/Outgoing inspection + COC, CAR, FG Request) plus one complete worked job pack.
2. Add remaining production stages (Bagmaking, Slitting, Lamination, Recycling, Core) — same production-book pattern.
3. Add printable OC / Works Order / tracking labels.

Engineering:
4. Replace localStorage with a shared backend (candidate: Supabase/Postgres — the Supabase skill is available) behind the same data model, then add auth + department roles.
5. Consider extracting page sections from `App.tsx` into separate components as it grows.
6. Optionally run the installed animation skills (`find-animation-opportunities`, `improve-animations`, `review-animations`) over the UI.

## 8. Git status

Nothing has been committed this session. All work is untracked/modified in the working tree:
- New: `RAWPLAST_OPERATIONS_ANALYSIS.md`, `FACTORYOS_DECISION.md`, `SESSION_HANDOVER.md`, `factoryos-app/`, `.agents/skills/`, `design_1.md`, `eleven labs.md`
- No commits were made (user has not requested one). Create a commit when ready.
