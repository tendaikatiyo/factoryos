// Compile: typst compile reports/rawplast_operations_audit_report.typ
// Output: reports/rawplast_operations_audit_report.pdf

#set page(
  paper: "a4",
  margin: (x: 2.2cm, y: 2.2cm),
  numbering: "1",
  footer: context [
    #set text(size: 8pt, fill: luma(80))
    #line(length: 100%, stroke: 0.4pt + luma(180))
    #v(0.3em)
    #grid(
      columns: (1fr, auto),
      [Rawplast Investments — Operations Audit],
      [#counter(page).display()],
    )
  ],
)

#set text(font: "New Computer Modern", size: 10.5pt)
#set par(justify: true, leading: 0.65em)
#set heading(numbering: "1.1")

#show heading.where(level: 1): it => {
  v(1.2em)
  set text(size: 14pt)
  block(it)
  v(0.4em)
}

#show heading.where(level: 2): it => {
  v(0.8em)
  set text(size: 12pt)
  block(it)
  v(0.25em)
}

#let findbox(title, body) = block(
  width: 100%,
  inset: 10pt,
  stroke: 0.6pt + luma(160),
  radius: 2pt,
  {
    text(weight: "bold")[#title]
    v(0.3em)
    body
  },
)

// ---------------------------------------------------------------------------
// Cover
// ---------------------------------------------------------------------------

#align(center)[
  #v(2.5cm)
  #text(size: 22pt, weight: "bold")[Operations Audit Report]
  #v(0.6cm)
  #text(size: 14pt)[Rawplast Investments Pvt. Ltd.]
  #v(0.4cm)
  #text(size: 11pt, fill: luma(60))[
    Friction points, areas for attention,\
    and prioritised improvements
  ]
  #v(1.2cm)
  #line(length: 40%, stroke: 0.6pt + luma(140))
  #v(1.2cm)
  #text(size: 10.5pt)[
    *Prepared for:* Directors\
    *Report date:* October 2026\
    *Field period:* August – October 2026\
    *Sites:* Msasa HQ · Southerton · Harare CBD distribution · Bulawayo
  ]
  #v(2cm)
  #text(size: 9pt, fill: luma(80))[
    This report does not restate how the business is supposed to run.\
    It documents where work frays, capacity sits idle, and decisions are overdue.\
    Personnel are referred to by role only. Contested claims are marked as staff estimates.
  ]
]

#pagebreak()

// ---------------------------------------------------------------------------
= Executive summary
// ---------------------------------------------------------------------------

The assessment finds that Rawplast is not short of machinery, controlled forms, or operational effort. The binding constraints are *delayed information*, *incomplete closure* of engineering and commercial loops, and *under-used capital* — especially at Southerton — while people compensate with Excel, phone calls, and monthly stocktakes.

Finance leadership confirms that only stocktake opening balances for raw materials and finished goods are treated as accurate. Sales cannot see live stock without interrupting despatch. Southerton’s highest-value press is degraded by uncleared fault codes and is sometimes fed uneconomic small jobs. Engineering backlogs stretch for months. Signals are raised; follow-through is uneven.

*Verdict:* the organisation already has the forms and much of the iron; the gap is live visibility, engineering closure, and commercial ownership of capacity already purchased.

=== Immediate priorities

+ Clear the Southerton engineering backlog (press error codes, idle bagmakers, uncommissioned used core extruder, generator) with dated owners.
+ Write and enforce print minimum-order and job-routing rules between Msasa and Southerton.
+ Assign commercial ownership for Southerton volume; open or formally defer the fitted shop.
+ Restore controlled shared stock / works-order visibility (LAN-safe; consistent with floor internet policy).
+ Remediate fiscal/accounting licensing and crash resilience; put raw-material-to-finished-goods inventory in scope for any systems migration — not general ledger alone.

#pagebreak()

// ---------------------------------------------------------------------------
= Scope
// ---------------------------------------------------------------------------

Field work covered Msasa production and support functions, a full Southerton production visit (21 September 2026), and the commercial / distribution model at Harare CBD (41 Harare Street) and Bulawayo (1 Plumtree Road). Method: plant observation, role interviews, and review of operational spreadsheets and controlled forms.

This document is organised around *friction and attention points*, not a process encyclopedia. Night-shift depth and a full Bulawayo market study remain thinner than Msasa / Southerton production coverage.

#pagebreak()

// ---------------------------------------------------------------------------
= Cross-cutting findings
// ---------------------------------------------------------------------------

These themes appear at more than one site or department. They are the core of the assessment.

== Delayed copies of truth

Finished-goods intake is compiled with a one-day lag into an offline Excel workbook; planning collects updates by flash drive because the finished-goods workstation is kept off the public internet (deliberate policy against distraction and misuse — not a technical accident). Raw-material spreadsheets are emailed manually each morning. Sales checks availability by telephone to despatch. Branch stocks are reconciled at monthly stocktake. Accounts treats only post-stocktake opening balances as accurate.

A local server formerly shared the finished-goods workbook with sales, planning, and operations; it was disconnected for reasons not established in this assessment. Internal sharing is therefore known to be possible; the current pattern is a regression.

*Attention point:* every major decision about stock, promising customers, and planning currently rests on lagged or monthly truth.

== Idle and under-used capital

Southerton visit-day utilisation was roughly two of about ten listed assets. A used core extruder was trialled then left uncommissioned. Multiple bagmakers await engineering and procurement (since at least November 2025). The central-impression press — when “running” — is not at full speed due to uncleared error codes. At Msasa, recycling cannot run both machines together, and on generator cannot run with printing (transformer / power capacity). Headquarters fleet includes vans not in service.

*Attention point:* cash and floor space are locked in assets that are not earning; utilisation is an engineering and commercial problem, not a “need more machines” problem.

== Signals without closure

Despatch warns sales and planning when recurring stock runs low; response is often slow, then crisis pressure returns to despatch. Southerton quality leadership reported escalating an engineering job-card backlog to directors in early September 2026 (some cards reportedly from 2024). Finished-goods transfer workbooks include “action” and “by” columns unused across sampled months. After City Plastics, a customer list went to sales; material follow-up did not occur.

*Attention point:* the organisation notices; it often fails to finish.

== Tribal identity and routing rules

Work-in-progress is often marker-pen only, which slows monthly stocktake (reweigh / relabel). Southerton machine codes exist but are not affixed. Batch numbers lack a standard formula. The ~1 tonne economic minimum for the Southerton CI press is tribal knowledge — sub-500 kg jobs still run, with staff citing 50–100 litres of solvent per changeover. No barcodes / SKUs; identity is dimensions plus customer / works order.

*Attention point:* experts on the floor know the rules; the system does not carry them, so cost and error recur.

== Single points of failure

Raw-material stores combine goods-received, stock books, and physical movement in one overloaded role (late requisitions force overtime; night-shift pellet takes require after-the-fact recon). Southerton’s production manager also handles customer collection. Fiscal/invoicing software crashes roughly weekly; sales invoices manually and backfills.

*Attention point:* process design assumes heroes; absence or outage immediately hurts service.

#pagebreak()

// ---------------------------------------------------------------------------
= Site and function friction points
// ---------------------------------------------------------------------------

Short findings only — enough context for directors who already know the operation.

== Msasa headquarters

#findbox[Stock and despatch friction][
  No live stock view for sales or despatch; availability checks interrupt floor work. Stranded and aged finished goods occupy space; partial collections and long uncollected orders are reported. Monthly stocktake rebuilds truth because daily books drift — WIP labelling gaps make the count slower and costlier than it should be.
]

#findbox[Raw-material friction][
  Manual location finding; incomplete goods-received paperwork; BOPP standard-size buying creates rarely used offcuts; informal night-shift use of recycled pellets breaks the issue trail. Late material requisitions extend the stores day.
]

#findbox[Power / recycling friction][
  Recycling concurrency limits (and conflict with printing on generator) create a structural trade-off. A utility transformer quote on the order of USD 65,000 was reported, with ownership reverting to the utility after a stated period — a capital decision with direct impact on scrap backlog and print availability.
]

#findbox[Commercial mobility friction][
  Pool-vehicle shortage limits field sales visits; only the head of sales has an attached vehicle. Marketing and CRM capability are thin (no dedicated marketing function or CRM).
]

#findbox[Msasa maintenance / hygiene (to verify)][
  Southerton quality leadership alleges weak preventive maintenance and daily cleaning at Msasa, complicating food-safety inspections. Treat as a claim requiring records check at headquarters — not as proven fact from this visit alone.
]

== Southerton

#findbox[F-STH-1 — Engineering backlog and degraded primary press][
  Three bagmakers down awaiting parts / engineering feedback; used core extruder trialled then uncommissioned; displaced high-output bagmaker not reassembled (ongoing since November 2025). CI press not at full speed due to uncleared error codes. Generator cannot run production — only jog / plate tension. Job-card backlog reportedly escalated to directors (~4 September 2026); copies not reviewed pending approval.
]

#findbox[F-STH-2 — Commercial under-activation][
  Former City Plastics customer list not followed through. ~4,000 bags sat ~1 year before a remaining client left. Nearby high-volume bakery work ceased. Headquarters sales rarely visit; quality leadership hesitates to pull new work while uptime is unreliable. Capacity claims (~200 t/month if engineering supports) are *staff estimates*.
]

#findbox[F-STH-3 — Uneconomic work on the CI press][
  ~1 tonne MOQ is unwritten. Sub-500 kg jobs still run; solvent changeover cost cited at 50–100 litres. Wrong job mix burns consumables and press time while the site simultaneously lacks suitable volume.
]

#findbox[F-STH-4 — Shop ready but not open][
  Fit-out and signage complete; planned open 1 September 2026; still closed 22 September 2026. Needs a new date with an owner — or formal deferral.
]

== Distribution and made-to-stock

#findbox[Internal replenishment hides true demand][
  When shop stock hits a threshold, headquarters raises a job with the registered company as customer, then ships generics to the shop. That pattern feeds stock-labelled production and Excel-centric inventory — and helps explain why finance only trusts stocktake balances. Custom orders from shops still relay to headquarters; there is no live multi-site stock view.
]

== Finance and systems

#findbox[Unlicensed, unstable fiscal / accounting path][
  osFinancials (fiscalisation, accounting, invoicing) across ~13 stations is unlicensed and crashes at least weekly. Payroll (Belina) is licensed — showing the company *can* license correctly. During outages, sales invoices manually. Stock in the accounting system is punched at stocktake, not from perpetual warehouse movements.
]

#findbox[Finance requirements vs ledger-only migration][
  The financial officer wants capture from raw-material receipt through conversion to finished goods, nearer real-time movements, better labelling, and less dependence on current stocktake methods — and describes the present system as unsuitable for manufacturing. Programme intent includes parallel run and a target switch around 1 January 2027, with fiscalisation after full migration. *Guidance:* remediate licensing/stability now; treat inventory and manufacturing capture as mandatory scope alongside GL/AR/AP; keep payroll stable; use LAN-limited floor terminals consistent with internet policy; design multi-warehouse and internal replenishment explicitly.
]

#pagebreak()

// ---------------------------------------------------------------------------
= Prioritised recommendations
// ---------------------------------------------------------------------------

#table(
  columns: (auto, 2.4fr, 1.3fr, auto),
  inset: 6pt,
  stroke: 0.5pt + luma(180),
  [*\#*], [*Action*], [*Owner (role)*], [*Timing*],
  [1], [Age and clear Southerton eng backlog: CI error codes, bagmakers, used core extruder, generator], [Directors → Engineering / Procurement], [Immediate],
  [2], [Written CI print MOQ and Msasa↔Southerton routing; brief sales], [Planning + Sales + Southerton QA], [1–2 weeks],
  [3], [Named commercial owner for Southerton; revive acquisition-era / local volume follow-up], [Sales], [2–4 weeks],
  [4], [Shop: new open date with owner, or formal deferral], [Sales / Operations], [1 week],
  [5], [Affix Southerton machine codes], [Engineering], [2–4 weeks],
  [6], [LAN-safe shared FG / works-order visibility (replace flash-drive lag)], [Operations + IT + Planning], [1–3 months],
  [7], [Standardise WIP/FG labelling and batch rules], [QA + Production + Planning], [1–2 months],
  [8], [Remediate fiscal/accounting license + crashes; RM→FG inventory in migration scope], [Directors + Finance + IT], [Immediate / programme],
  [9], [Verify Msasa PM and cleaning claims against records], [Engineering + QA (HQ)], [Next HQ follow-up],
  [10], [Decide recycling / transformer path vs continued concurrency limits], [Directors + Engineering], [Planning cycle],
)

#pagebreak()

// ---------------------------------------------------------------------------
= Open items
// ---------------------------------------------------------------------------

- Director-approved release of Southerton engineering job-card list (age each card).
- Asset register for Southerton (status, CI fault codes, used vs new).
- Sample solvent use and job sizes on the CI press.
- Validate Southerton tonnage estimates against production books.
- Confirm why the former finished-goods LAN share was disconnected.
- Sample Msasa PM completion and hygiene checklists before major customer audits.
- Clarify fleet booking ownership and non-running vans.
- Confirm distribution reorder thresholds and how custom shop orders enter the order-confirmation spine.

#v(1.5cm)
#align(center)[
  #text(size: 9pt, fill: luma(90))[— End of report —]
]
