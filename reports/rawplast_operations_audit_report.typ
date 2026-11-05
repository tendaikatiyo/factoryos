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
    *Report date:* November 2026\
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

== Immediate priorities

+ Clear the Southerton engineering backlog, with an owner and a date on each job.
+ Write the rules for which work runs on which machine, and at Msasa or Southerton.
+ Close the finished-goods lag so sales, planning, and despatch work from the same day, not yesterday’s book.
+ Adopt a stable ERP with manufacturing and warehousing modules, covering raw material through finished goods, that does not crash often or interfere with fiscalisation.



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

Finished-goods intake is compiled with a one-day lag into an Excel workbook. The finished-goods workstation stays off the public internet by policy (distraction and misuse), so planning often collects updates by flash drive. The raw-material stock spreadsheet is shared manually each morning. To check whether finished goods are available, sales telephones despatch. Branch stocks are reconciled at monthly stocktake. Accounts treat only post-stocktake opening balances as accurate.

A local server is still running and internal sharing of files does happen across sales, planning, and operations. Finished goods still remain at least a day behind what is actually on the floor.

*Attention point:* stock promises and planning still rest on lagged or monthly figures.

== Idle and under-used capital

At Southerton, the used core extruder XE19 was trialled then left uncommissioned. Multiple bagmakers await engineering and procurement (since at least November 2025). PR05 runs, but not at full speed, because of uncleared error codes. At headquarters, two vans are not in service: the Mercedes-Benz Sprinter (ADY 6949) and the Ford Transit (ACG 5086).

*Attention point:* cash and floor space sit in assets that are not earning while engineering and commercial gaps stay open.

== Signals without closure

Despatch warns sales and planning when recurring stock runs low; response is often slow, then crisis pressure returns to despatch. Southerton’s QA officer reported escalating an engineering job-card backlog to directors in early September 2026 (some cards reportedly from 2024). The City Plastics customer base was not activated after the acquisition.

*Attention point:* issues are raised; they often stay open.

== Routing and job size

There are no hard written rules for which jobs go to which site or machine. Work that should stay at Msasa still lands at Southerton, and the reverse. Machine codes exist on paper, but labelling of the machines themselves is inconsistent at both Msasa and Southerton.

PR05 shows what this costs. Operators say 1 tonne is the right minimum for that printer, but there is no hard rule, and planning still sends sub-500 kg jobs there. Combined with wrong job sequencing, that burns consumables: staff cite 50–100 litres of solvent per changeover, and printer time goes on work that does not cover its setup.

Planning and the teams involved in scheduling need a framework that checks whether a job is economic on the machine it is sent to: a minimum run size for each machine, a sensible order for running jobs, and a rule for grouping small jobs or sending them to a better-suited machine.

*Attention point:* without hard routing rules, some machines keep taking uneconomic work.

== Labelling and product identity

Work-in-progress is often marked with marker pen only, which slows monthly stocktake because staff must reweigh and relabel. There are no barcodes or SKUs; identity is dimensions plus customer or works order.

*Attention point:* weak labels make stocktake slower and raise the chance of mix-ups.

== Single points of failure

Raw-material stores combine goods-received, raw material stock books, and physical movement in one overloaded role (late requisitions force overtime; night-shift pellet takes require after-the-fact recon). Fiscal and invoicing software crashes weekly; sales invoices manually and backfills.

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
  The stores operator finds material by walking the room; there is no location system beyond memory and habit. BOPP is bought in the suppliers’ standard sizes rather than exact job widths, so slitting leaves offcuts that rarely get used. Night-shift operators sometimes take recycled pellets without a proper issue, and the stores operator has to confirm the kilograms with production afterwards. Material requisitions that arrive near the end of the shift keep him late, because he prefers to reconcile while the day’s movements are still fresh.
]

#finding[No dedicated marketing or CRM][
  No one owns marketing full time and there is no CRM system. The Msasa sales staff look after social media, marketing, and exhibitions on top of their own client accounts, and the graphic designer helps with social media posts. Each salesperson keeps their own client relationships, so there is no shared record of who the firm is talking to. A CRM system and one person who owns marketing would let the firm follow up leads and respond to changes in demand faster.
]

== Southerton

#finding[Slow fault resolution at Southerton][
  Three of Southerton’s bagmakers are down, waiting on parts and feedback from engineering and procurement. The used core extruder XE19 was set up and given a trial run, but it was never formally commissioned because engineering has not given the go-ahead. The bagmaker that used to stand in that spot, which staff say outpaced the Msasa machines per hour, was moved and never reassembled. This has been dragging on since November 2025.

  PR05 runs below full speed because of error codes that engineering has not cleared. The site generator can only jog the printer and release tension on the printing plates, so no machine can produce on it. Southerton’s QA officer says he sent directors the list of open engineering job cards around 4 September 2026, some of them dating back to 2024.

  There is no quick path from a fault being reported at Southerton to it being fixed. Faults wait on engineering feedback, parts, and sign-off, and so far the only escalation has been a list sent to directors. The site’s engineering staff member is stronger on electrical than mechanical work, so mechanical faults depend on the wider engineering team. Southerton needs a faster way to resolve faults: a named owner for each one, a target date, and a clear point at which stalled parts or approvals go up the line. Without it, machines the business has already paid for will keep sitting idle and the site will keep running well below its capacity.
]
== Accounting and systems

#finding[Unstable systems path; need for ERP][
  Current fiscalisation / accounting / invoicing software (osFinancials) across 13 stations crashes weekly and interferes with fiscalisation. During outages, sales invoices manually. Stock is entered into the system by hand at each stocktake, by one person in sales and one in accounts, rather than updated from day-to-day warehouse movements.

  An ERP system is needed to capture stock movements from raw-material receipt through conversion to finished goods, nearer to real time. That would make better labelling possible and reduce the business’s dependence on current stocktake methods. It needs to be stable, without the frequent crashes that interfere with fiscalisation, and to have modules that support both manufacturing and warehousing.
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
  [1], [Clear the Southerton engineering backlog (PR05 error codes, bagmakers, XE19, generator) and set up a faster fault-resolution path: a named owner and target date for each fault, and a clear escalation point], [Directors → Engineering / Procurement],
  [2], [Written minimum run sizes per machine and Msasa↔Southerton routing rules; brief sales], [Planning + Sales + Southerton QA],
  [3], [Activate the City Plastics-era customer base and local volume for Southerton], [Sales],
  [4], [Affix machine codes uniformly across all factories, Msasa and Southerton included], [Production],
  [5], [Cut finished-goods lag so shared books match the floor same day], [Production + Operations + Planning + Accounting],
  [6], [Standardise WIP/FG labelling and SKU identity], [QA + Production + Planning],
  [7], [Adopt stable ERP with manufacturing and warehousing modules; RM→FG inventory in scope; avoid crashes that interfere with fiscalisation], [Directors + Accounting],
  [8], [Appoint one person to own marketing and adopt a CRM system], [Directors + Sales],
)

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
  [PR05], [Southerton central-impression flexo printer (machine code PR05)],
  [XE19], [Southerton used core extruder (machine code XE19)],
  [CRM], [Customer relationship management],
  [ERP], [Enterprise resource planning],
  [FG], [Finished goods],
  [QA], [Quality assurance],
  [RM], [Raw material],
  [SKU], [Stock keeping unit],
  [WIP], [Work in progress],
)

#v(1.5cm)
#align(center)[
  #text(size: 9pt, fill: luma(90))[— End of report —]
]
