= Operations Audit Plan and Schedule

set main-font: "Times New Roman";

Tendai A.F. Katiyo · Prepared for Rawplast Investments Pvt. Ltd. · 18 Aug 2026

== Executive summary
Purpose: Identify operational gaps and quick wins across four sites (Msasa HQ, Southerton, Harare CBD, Bulawayo), focusing on production, safety, quality and order fulfilment.

Ask: access to records, short staff interviews, and permission to photograph shop floors for evidence.

Approach: staged multi-week assessment (recommended 5–6 weeks) prioritising production, then targeted deep-dive costing.

== Scope
- Sites: Msasa HQ (production + sales), Southerton (production), Harare CBD (sales), Bulawayo (sales — different market).
- Departments: Production, Planning, Despatch/Receiving, Sales/order capture, and related admin.

== Schedule

table(columns: 2, grid: true) {
  row(cell("Phase"), cell("Activities"))
  row(cell("Week 1–2 (Msasa HQ)"), cell("Deep production focus; shift observations (07:00–19:00 & 19:00–07:00); maintenance records; production planning; despatch."))
  row(cell("Week 3 (Southerton)"), cell("Production evaluation; capacity and SOP alignment with HQ; minimal sales shop pre-opening checks."))
  row(cell("Week 4 (Bulawayo)"), cell("One full work week dedicated to Bulawayo — different market focus: sales, custom orders, local suppliers."))
  row(cell("Week 4 (Harare CBD)"), cell("One one-day visit: sales shop operations and order-capture."))
  row(cell("Week 5"), cell("Consolidation; draft consolidated report; prioritise findings."))
  row(cell("Week 6 (optional)"), cell("Deep-dive costing and implementation-ready plans for priority items."))
}

== Deliverables & timelines

table(columns: 2, grid: true) {
  row(cell("Deliverable"), cell("Timeline / Notes"))
  row(cell("Per-site short report"), cell("Within 48 hours of site visit — 2–4 pages: top 5 findings, owners, effort estimate."))
  row(cell("Consolidated report"), cell("Within 5 working days after final site visit — prioritised action plan and rough costs."))
}

== Resource & access requests
- Production plans, maintenance logs, inventory snapshots and SOPs (last 3 months).
- Permission to photograph and interview staff for audit evidence.
- Quick approval route for safety-critical fixes (small-budget items).



== Success criteria
- Top 5 actionable improvements per site with owners and target dates.



== Signature
Prepared and to be executed by: Tendai A.F. Katiyo

== Appendix: Typst table example

The table below demonstrates a Typst-compliant table with images and math formulas.

table(columns: [1fr, auto, auto], inset: 10pt, grid: true) {
  row(cell("*Volume*"), cell("*Formula*"), cell("*Parameters*"))
  row(
    image("cylinder.svg", width: 40pt),
    $\frac{\pi h (D^2 - d^2)}{4}$,
    "h: height; D: outer radius; d: inner radius"
  )
  row(
    image("tetrahedron.svg", width: 40pt),
    $\frac{\sqrt{2}}{12} a^3$,
    "a: edge length"
  )
}

Some sample Typst table syntax above — images must be available at compile time.
