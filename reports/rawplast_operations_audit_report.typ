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
      [Rawplast Investments — Business Process Audit],
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

// Numbered under the current section, e.g. 4.1.1 under Msasa, 4.2.1 under Southerton.
#let finding(title, body) = {
  counter(heading).step(level: 3)
  v(0.7em)
  text(weight: "bold")[#context { counter(heading).display("1.1.1") } — #title]
  v(0.25em)
  body
}

// ---------------------------------------------------------------------------
// Cover
// ---------------------------------------------------------------------------

#align(center)[
  #v(2.5cm)
  #text(size: 22pt, weight: "bold")[Business Process Audit]
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
  ]
  #v(2cm)
  #text(size: 9pt, fill: luma(80))[
    This report does not restate how the business is supposed to run.\
    It documents where work frays, capacity sits idle, and decisions are overdue.\
  
  ]
]

#pagebreak()

// ---------------------------------------------------------------------------
= Executive summary
// ---------------------------------------------------------------------------

Rawplast has the machinery and the controlled forms, and people are doing the work. Information still arrives late, and engineering and commercial jobs stay open. At Southerton especially, capacity that has already been paid for is under-used.

Sales, planning, and accounts each have a partial view of stock, and of what the plants can take. The floor raises problems, but follow-through is uneven, and the same gaps are still open a month later.

=== Immediate priorities

+ Clear the Southerton engineering backlog, with an owner and a date on each job.
+ Write the rules for which work runs at Msasa and which at Southerton, and name who owns Southerton’s volume.
+ Close the finished-goods lag so sales, planning, and despatch work from the same day, not yesterday’s book.
+ Adopt a stable ERP with manufacturing modules, covering raw material through finished goods, that does not crash often or interfere with fiscalisation.



// ---------------------------------------------------------------------------
= Scope
// ---------------------------------------------------------------------------

The audit covers the processes that move work through production, stock, despatch, sales, and accounting. Evidence is from plant observation, role interviews, and the operational spreadsheets and forms in use. The findings record friction and the decisions that remain open. 

#pagebreak()

// ---------------------------------------------------------------------------
= Cross-cutting findings
// ---------------------------------------------------------------------------

These themes appear at more than one site or department. They are the core of the assessment.

== Delayed copies of truth

Finished-goods intake is compiled with a one-day lag into an Excel workbook. The finished-goods workstation stays off the public internet by policy (distraction and misuse), so planning often collects updates by flash drive. Raw-material spreadsheets are emailed manually each morning. Sales checks finished-goods availability by telephone to despatch, not raw materials. Branch stocks are reconciled at monthly stocktake. Accounts treat only post-stocktake opening balances as accurate.

A local server is still running and internal sharing of files does happen across sales, planning, and operations. Finished goods still remain at least a day behind what is actually on the floor.

*Attention point:* stock promises and planning still rest on lagged or monthly figures.

== Idle and under-used capital

At Southerton, a used core extruder was trialled then left uncommissioned. Multiple bagmakers await engineering and procurement (since at least November 2025). PR05, when “running”, is not at full speed due to uncleared error codes. At Msasa, recycling cannot run both machines together, and on generator cannot run with printing (transformer / power capacity). Headquarters fleet includes vans not in service.

*Attention point:* cash and floor space sit in assets that are not earning while engineering and commercial gaps stay open.

== Signals without closure

Despatch warns sales and planning when recurring stock runs low; response is often slow, then crisis pressure returns to despatch. Southerton quality leadership reported escalating an engineering job-card backlog to directors in early September 2026 (some cards reportedly from 2024). The City Plastics customer base was not activated after the acquisition.

*Attention point:* issues are raised; they often stay open.

== Routing and job size

There are no hard written rules for which jobs go to which site or machine. Work that should stay at Msasa still lands at Southerton, and the reverse. PR05 is the clearest case: operators say a 1 tonne minimum makes economic sense on that machine, but planning still sends sub-500 kg jobs there. Staff cite 50–100 litres of solvent per changeover. Southerton machine codes exist on paper but are not affixed to the machines.

*Attention point:* without hard routing rules, some machines keep taking uneconomic work.

== Labelling and product identity

Work-in-progress is often marked with marker pen only, which slows monthly stocktake because staff must reweigh and relabel. There are no barcodes or SKUs; identity is dimensions plus customer or works order.

*Attention point:* weak labels make stocktake slower and raise the chance of mix-ups.

== Single points of failure

Raw-material stores combine goods-received, raw material stock books, and physical movement in one overloaded role (late requisitions force overtime; night-shift pellet takes require after-the-fact recon). Fiscal and invoicing software crashes roughly weekly; sales invoices manually and backfills.

*Attention point:* when that person or that system is down, service drops quickly.

#pagebreak()

// ---------------------------------------------------------------------------
= Site and function friction points
// ---------------------------------------------------------------------------



== Msasa headquarters

#finding[Stock and despatch friction][
  Sales and despatch have no live view of finished goods. When a salesperson needs to know whether stock is available, they telephone despatch, and the crew stops packing or preparing orders to walk the floor and check. Despatch itself works from the same lagged books: finished goods made one day are entered the next, then reconciled again from delivery notes after goods leave.

  Space is taken by stranded and aged finished goods, including stock held for years against the chance of a similar order. Customers sometimes book large quantities and collect only a fraction; others leave orders uncollected for more than a month. Monthly stocktake rebuilds the numbers because the daily books drift. Weak WIP labelling makes that count slower: pairs spend time reweighing and rewriting what should already be clear on the label.
]

#finding[Raw-material friction][
  The stores operator finds material by walking the room; there is no location system beyond memory and habit. Goods-received paperwork is often incomplete, so he finishes the paperwork himself after the fact. BOPP is bought in the suppliers’ standard sizes rather than exact job widths, so slitting leaves offcuts that rarely get used. Night-shift operators sometimes take recycled pellets without a proper issue, and the books are patched the next day. Material requisitions that arrive near the end of the shift keep him late, because he prefers to reconcile while the day’s movements are still fresh.
]

#finding[Power / recycling friction][
  Recycling concurrency limits (and conflict with printing on generator) create a structural trade-off. A utility transformer quote on the order of USD 65,000 was reported, with ownership reverting to the utility after a stated period — a capital decision with direct impact on scrap backlog and print availability.
]

#finding[Commercial mobility friction][
  Pool-vehicle shortage limits field sales visits; only the head of sales has an attached vehicle. Marketing and CRM capability are thin (no dedicated marketing function or CRM).
]

== Southerton

#finding[Engineering backlog and degraded PR05][
  Three bagmakers down awaiting parts / engineering feedback; used core extruder trialled then uncommissioned; displaced high-output bagmaker not reassembled (ongoing since November 2025). PR05 is not at full speed due to uncleared error codes. Generator cannot run production, only jog / plate tension. Job-card backlog reportedly escalated to directors (~4 September 2026); copies not reviewed pending approval.
]

#finding[Uneconomic jobs on PR05][
  Operators say a 1 tonne minimum order quantity is the right floor for this machine, but there is no hard rule. Planning still sends sub-500 kg jobs there. Combined with wrong job sequencing, that burns consumables: staff cite 50–100 litres of solvent per changeover, and printer time is spent on work that does not pay for the setup.
]

== Distribution and made-to-stock

#finding[Internal replenishment hides true demand][
  When shop stock hits a threshold, headquarters raises a job with the registered company as customer, then ships generics to the shop. That pattern feeds stock-labelled production and Excel-centric inventory, and helps explain why accounts only trust stocktake balances. Custom orders from shops still relay to headquarters; there is no live multi-site stock view.
]

== Accounting and systems

#finding[Unstable systems path; need for ERP][
  Current fiscalisation / accounting / invoicing software (osFinancials) across ~13 stations crashes at least weekly and interferes with fiscalisation. During outages, sales invoices manually. Stock is punched at stocktake, not from perpetual warehouse movements. Payroll (Belina) continues separately.
]

#finding[Accounting requirements for ERP][
  Accounting needs capture from raw-material receipt through conversion to finished goods, nearer real-time movements, better labelling, and less dependence on current stocktake methods. The present system is unsuitable for manufacturing. An enterprise resource planning (ERP) system is required: stable, not prone to frequent crashes that interfere with fiscalisation, and with modules that cater for manufacturing as well as GL/AR/AP and inventory. Programme intent includes parallel run and a target switch around 1 January 2027, with fiscalisation after full migration. Keep payroll stable; use LAN-limited floor terminals consistent with internet policy; design multi-warehouse and internal replenishment explicitly.
]

#pagebreak()

// ---------------------------------------------------------------------------
= Prioritised recommendations
// ---------------------------------------------------------------------------

#table(
  columns: (auto, 2.8fr, 1.4fr),
  inset: 6pt,
  stroke: 0.5pt + luma(180),
  [*\#*], [*Action*], [*Owner (role)*],
  [1], [Age and clear Southerton eng backlog: PR05 error codes, bagmakers, used core extruder, generator], [Directors → Engineering / Procurement],
  [2], [Written PR05 MOQ and Msasa↔Southerton routing rules; brief sales and planning], [Planning + Sales + Southerton QA],
  [3], [Named commercial owner for Southerton; activate City Plastics-era customer base and local volume], [Sales],
  [4], [Affix Southerton machine codes (including PR05)], [],
  [5], [Cut finished-goods lag so shared books match the floor same day], [Operations + IT + Planning],
  [6], [Standardise WIP/FG labelling and SKU identity], [QA + Production + Planning],
  [7], [Adopt stable ERP with manufacturing modules; RM→FG inventory in scope; avoid crashes that interfere with fiscalisation], [Directors + Accounting + IT],
  [8], [Decide recycling / transformer path vs continued concurrency limits], [Directors + Engineering],
)

#pagebreak()

// ---------------------------------------------------------------------------
= Open items
// ---------------------------------------------------------------------------

- Director-approved release of Southerton engineering job-card list (age each card).
- Asset register for Southerton (status, PR05 fault codes, used vs new).
- Sample solvent use and job sizes on PR05.
- Validate Southerton tonnage estimates against production books.
- Clarify fleet booking ownership and non-running vans.
- Confirm distribution reorder thresholds and how custom shop orders enter the order-confirmation spine.

#pagebreak()

// ---------------------------------------------------------------------------
= Glossary
// ---------------------------------------------------------------------------

#table(
  columns: (auto, 1fr),
  inset: 6pt,
  stroke: 0.5pt + luma(180),
  [*Abbreviation*], [*Meaning*],
  [BOPP], [Biaxially oriented polypropylene, the packaging film bought in standard sizes],
  [PR05], [Southerton CI flexo printer (machine code PR05)],
  [CI], [Central-impression (flexo) printing, as on PR05],
  [CRM], [Customer relationship management],
  [ERP], [Enterprise resource planning],
  [FG], [Finished goods],
  [GL / AR / AP], [General ledger, accounts receivable, accounts payable],
  [HQ], [Headquarters (Msasa)],
  [IT], [Information technology],
  [LAN], [Local area network],
  [MOQ], [Minimum order quantity],
  [PM], [Preventive maintenance],
  [QA], [Quality assurance],
  [RM], [Raw material],
  [SKU], [Stock keeping unit],
  [WIP], [Work in progress],
)

#v(1.5cm)
#align(center)[
  #text(size: 9pt, fill: luma(90))[— End of report —]
]
