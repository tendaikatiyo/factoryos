# Rawplast FactoryOS MVP

Browser-based pilot of Rawplast Industries' operational workflow.

## Run

```powershell
npm install
npm run dev
```

Open the local URL printed by Vite.

## Verify

```powershell
npm run lint
npm run build
```

## MVP workflow

1. Capture an Order Confirmation.
2. Record Customer approval, then Sales approval, then Accounts, Quality, and Production approvals.
3. Create a Works Order from a fully approved Order Confirmation.
4. Record Extrusion or Printing production, scrap, downtime, and quality result.
5. Transfer passed output to Finished Goods.
6. Record Despatch without exceeding available Finished Goods.

The Overview and Works Order registers calculate quantities from these transactions.

## Persistence

All records are saved automatically to browser `localStorage` under:

`rawplast-factoryos-v1`

Use **Data & backup** inside the application to export or restore a JSON backup.

This storage mode is for workflow validation only. It is single-browser, has no authentication or concurrency protection, and must be replaced with a shared server database before production rollout.

## Design

The interface follows `../design_1.md` typography:

- Stack Sans Notch for display and wordmark
- Geist Sans for headings and statistics
- Inter for body and controls
- Geist for compact labels and data

The visual foundation follows `../eleven labs.md`: off-white canvas, warm black ink, restrained pastel atmosphere, pill actions, hairlines, and generous editorial spacing.

See `../FACTORYOS_DECISION.md` for the platform decision and scope.
