# FactoryOS Platform Decision

## Decision

Rawplast should start with a purpose-built FactoryOS MVP rather than SAP, Odoo, or ERPNext.

The MVP will digitize the existing operational spine:

`Order Confirmation → approvals → Works Order → production capture → quality gate → Finished Goods transfer → Despatch`

This decision does not reject ERP permanently. It defers ERP selection until Rawplast has reliable digital operational data and can identify which financial, procurement, inventory, or HR capabilities are genuinely needed.

## Why custom is the right first step

1. Rawplast's controlled forms and approval rules are the current operating system. A custom application can reproduce them without forcing an ERP process redesign.
2. The Order Confirmation and Works Order are distinct business documents. The MVP preserves that separation and the rule that Works Order changes require a new Works Order.
3. Production requires packaging-specific records such as dual quantities (kg and units), roll weights, treatment, dimensions, formulations, scrap, downtime codes, and optional routing through Printing, Slitting, Lamination, and Bagmaking.
4. A focused MVP can be adopted and validated faster than a full ERP implementation.
5. Rawplast avoids licence and implementation commitments before the real digital workflow has been proven.

## Why not the alternatives now

- **SAP:** disproportionate cost, implementation effort, and organizational change for the immediate requirement.
- **Odoo:** capable and polished, but the shop-floor workflow would still require substantial customization while adding per-user and partner costs.
- **ERPNext:** the strongest packaged alternative because it is open-source and has manufacturing concepts that map reasonably well to Rawplast. It remains a good future integration or migration option, especially for accounting, inventory, purchasing, and maintenance.

## MVP technology

- React and TypeScript browser application
- Browser `localStorage` persistence
- No server, database, login service, or external integration
- Seed data supplied for demonstration
- JSON backup and restore so a browser profile is not the only copy

## Local-storage limitation

This MVP is a single-browser pilot, not a production deployment. Data is not shared between computers, browser profiles, or users; clearing browser data can remove records. It has no concurrent editing, server-side audit protection, access control, or automated backup.

After workflow validation, persistence should move behind an API to PostgreSQL (or an ERP integration) while retaining the user-facing workflow and data model.

## MVP scope

- Operations dashboard
- Customer and Order Confirmation records
- Customer, Sales, Accounts, Quality, and Production approval status
- Works Orders generated from approved Order Confirmations
- Route and quantity tracking
- Extrusion and Printing production records
- Quality pass/fail status
- Finished Goods transfers
- Despatch transactions and live order balances
- Machine register
- JSON backup, restore, and demo-data reset

## Deferred

- General ledger, invoicing, tax fiscalization, payroll, and HR
- Full raw-material inventory and purchasing
- Advanced MRP and capacity optimization
- Full maintenance CMMS
- Multi-user authentication and permissions
- Server-side audit trail and document attachments
- Production modules whose controlled forms have not yet been supplied

## Decision gate after pilot

Run real representative jobs through the MVP and assess operator acceptance, missing fields, approval delays, data quality, and reporting value. Then choose one of three paths:

1. Continue FactoryOS and replace local storage with a shared database.
2. Integrate FactoryOS with ERPNext or the existing accounts system.
3. Use the validated workflow as the implementation specification for a packaged ERP.
