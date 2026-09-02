# Rawplast Ops Audit — Session Handover

Date: 1 September 2026  
Author: Tendai A.F. Katiyo  
Repository: `c:\Users\Katiyo\Documents\GitHub\factoryos`  
Branch: `main`

## Purpose

Bring the next session up to speed on onsite field work for the Rawplast operations audit. This session focused on documenting **how production and despatch actually work on the floor**, using plain notes rather than the formal `ops_audit_pack/` structure.

Read this first, then the wing notes in `raw notes/` and the evidence in `raw notes/assets/`.

---

## 1. Task context

**Assignment:** Analyse Rawplast ops and look for optimisation opportunities across sites (audit plan in `ops_audit_plan.md`).

**Approach taken:** The AI-generated audit pack (`ops_audit_pack/`, `assessment_checklist.md`, SOP templates) was too heavy for field capture. Instead, wing-by-wing plain notes were written as observations from the floor — similar to how an assessor would actually take notes.

**Repo state at session start:** Latest commit (`6cf038a`, 27 Aug) added the operations audit plan, director deliverables, and audit pack scaffolding. FactoryOS MVP (`factoryos-app/`) and `RAWPLAST_OPERATIONS_ANALYSIS.md` (July) remain the prior baseline for how the business is *supposed* to work on paper.

---

## 2. What was produced this session

### Field notes

| File | Status |
|------|--------|
| `raw notes/extrusion_wing_notes.md` | Written and expanded with production flow, labelling, shift verification |
| `raw notes/despatch_wing_notes.md` | Written from onsite observation — FG intake, retail collection, stock visibility gaps |

### Evidence attached

| File | Description |
|------|-------------|
| `raw notes/assets/images/finished goods label.jpeg` | Standard FG label (WO, M/C, customer, product, weights, batch, operator) |
| `raw notes/assets/images/despatch wing pic.jpeg` | Despatch/FG storage room — dense floor stacking, mixed product types |
| `raw notes/assets/images/despatch wing pic2.jpeg` | Roll storage — printed and plain film, minimal location coding |
| `raw notes/assets/files/finished goods.xlsx` | FG operator's daily transfer workbook (Apr–Sep 2026) |

**Git status:** `raw notes/` and `handover/` are untracked at time of writing. Commit when ready.

---

## 3. Operating model — how the pieces connect

```
Works Order issued (may take several days to complete)
        │
        ▼
Production stages (Extrusion → Printing → Slitting / Bagmaking / etc.)
  • Each stage has its own production book
  • Multiple machines can run the same WO
  • Recorded per roll; shift-close verification by FG staff
  • WIP rolls: marker pen (customer + weight). Finished rolls: full label
        │
        ▼
Final exit point (M/C on label + FG transfer = last machine, NOT start machine)
        │
        ▼
FG transfer book (T+1: yesterday's production recorded today)
        │
        ▼
FG operator re-keys into offline Excel → planner collects via flash drive each morning
        │
        ▼
Despatch / FG stores (large room, floor-stacked stock)
  • Retail: invoice → pick → delivery note → security weigh → customer leaves
  • No real-time stock view for despatch, sales, or planning
```

### Key clarifications from discussion

1. **M/C code on FG labels and the daily transfer spreadsheet = final production exit point**, not where the job started. A WO may begin at extrusion but show `SL04` on transfer if slitting was the last stage.

2. **A works order can take several days to complete.** Cumulative qty and balance columns in the Excel workbook reflect this (same WO appears across multiple daily tabs).

3. **Customers can sometimes order from a past works order** when they want to maintain the same specs. **Not yet confirmed:** whether repeat orders always get a new unique WO number or reference the old one.

4. **The FG Excel tracks transfers IN to stores, not despatch OUT.** This is a structural gap — nobody has a live view of what remains on the floor after partial customer collections.

---

## 4. Extrusion wing — findings

**Machines:** 9 active pairs (EX13/EX03 through EX08/EX16); EX18 dead.

**Process:**
- Blown film extrusion; one operator per machine
- Material: mixed in large half-cut drum → loaded via buckets into machine mixer
- WO-driven; per-order target weight in kg; film wound on rolls with per-roll target weight
- Multiple extruders can run the same WO simultaneously
- Production recorded per completed roll in the extrusion production book

**Controls:**
- FG staff verify extrusion books at shift close (operator balances checked)
- Finished rolls: weighed, labelled (WO, weight, customer). WIP rolls: marker only

**Routing:**
- If extrusion is the only stage → label → straight to FG
- Otherwise → next department (printing, slitting, bagmaking, etc.)

**Gap:** No real-time production state visibility (same theme as despatch).

---

## 5. Despatch wing — findings

**FG intake:**
- Production hands off via FG transfer book
- Compiled daily with **1-day lag** (e.g. items made 31/08 recorded 01/09)
- Manually re-keyed into Excel on an **offline PC**
- Planner collects updated workbook via **flash drive every morning**

**Customer fulfilment (retail counter):**
- Large room with dense floor-stacked FG (see photos)
- Customer brings invoice → despatch picks order (kg-based, time-consuming) → delivery note → **security verifies weights** before release

**Pain points (staff-reported and observed):**
| Issue | Detail |
|-------|--------|
| No real-time stock | Sales calls despatch to check availability; despatch drops current work |
| Despatch blind to own stock | Even the team in the room has no live inventory view |
| Upstream inaction | Despatch warns sales/planning on low recurring stock; slow response → crisis rushes |
| Partial collections | Some orders are 1,000+ units but customers collect 50–100 (frequency TBC) |
| Stranded stock | Some stock 8+ years old (customer never collected); kept for similar-spec reuse |
| Uncollected orders | Customers sometimes don't collect for 1+ month (staff suspect debt/supplier juggling) |

---

## 6. FG spreadsheet analysis (`finished goods.xlsx`)

**What it is:** "Overrun and Underrun on Daily Transfer Report" — one tab per working day (01 Apr – 01 Sep 2026, ~120 tabs).

**Columns:** M/C No, W/O No, Customer, Product, Dimensions, Daily Qty Transferred, Qty Ordered, Cum Qty Transferred, Order Balance, Remarks, Action to be taken, By.

**Headline stats (across all daily tabs):**

| Metric | Value |
|--------|-------|
| Transfer line items | ~2,119 |
| Customer = `STOCK` | 28.5% (604 rows) |
| STILL RUNNING | 1,626 |
| OVER RUN | 311 |
| UNDER RUN | 31 |
| COMPLETED | 150 |
| Incomplete WO numbers (e.g. `0726/`) | 166 rows |
| "Action to be taken" / "By" filled | 0 rows |

**Notable overruns (still marked STILL RUNNING in some cases):**
- EX15 / Schweppes — ordered 30,000, cum ~188,495
- BM18 / STOCK black carrier bags — repeatedly 100k+ over on 500k orders
- BM26 / STOCK — 188k over on 1M unit order

**T+1 lag confirmed:** Sheet `31.08.2026` → `01.09.2026` shows WOs carrying forward with updated cumulative balances.

**MLT sheets** in the workbook appear to be roll weight count data (~14–17 kg values); purpose not yet confirmed with FG operator.

---

## 7. Optimisation themes emerging (not yet formalised)

1. **Visibility** — production state, FG stock, and despatch outbound are all offline or delayed. Root cause of phone calls, interruptions, and crisis rushes.

2. **Data lag** — paper book → T+1 compilation → manual Excel → flash drive = planning always at least 24–48 hours behind the floor.

3. **Stock build-up** — high `STOCK` proportion, routine overruns, partial collections, and stranded/old stock all consume floor space and picking time.

4. **Identification inconsistency** — proper labels vs marker-pen WIP rolls vs handwritten bundle markers in despatch (see photos).

5. **Accountability loop not closed** — "Action to be taken" and "By" columns in the FG spreadsheet are never used.

6. **Fragmented routing visibility** — each production stage has its own book; only the final exit machine appears on FG transfer. WIP between stages is invisible to planning/despatch.

---

## 8. Open questions for next site visit

- [ ] Do repeat customer orders always get a new unique WO, or can they reference a past WO for same specs?
- [ ] Who prints/applies FG labels — operator or separate role?
- [ ] What triggers a roll staying as WIP (marker only) vs receiving a full label?
- [ ] Rough % of despatch floor stock that is unlabelled or marker-only?
- [ ] How common is the partial-collection pattern (order 1,000+, collect 50–100)?
- [ ] Is there a write-off process for 8+ year old stranded stock?
- [ ] What are the official machine codes (confirm `REW02` / `RW02` / `CFO1` variants)?
- [ ] What do the MLT sheets in the Excel workbook represent?
- [ ] For B2B / WO-driven jobs (not walk-in retail), is the flow different from the invoice → pick → security path?
- [ ] Despatch/FG headcount — same people doing both roles?

---

## 9. Suggested next steps

**Field work:**
1. Continue wing notes for remaining production areas (printing, slitting, bagmaking, planning).
2. Confirm WO uniqueness policy for repeat orders with planning/sales.
3. Walk one complete job pack on paper: OC → WO → production books → FG transfer → despatch.

**Documentation:**
4. Commit `raw notes/` and `handover/` when ready.
5. Optionally add a one-line file reference in each wing note pointing to evidence assets.

**Reporting (when directed):**
6. Turn despatch + spreadsheet findings into a short "quick wins" section for the director report.
7. Pull worst overrun / stranded STOCK examples as evidence tables.

---

## 10. Related repo files

| Path | Relevance |
|------|-----------|
| `ops_audit_plan.md` | Master audit schedule |
| `audit_SOP_Tendai.md` | Formal field guide (mostly superseded by plain notes for capture) |
| `ops_audit_pack/` | Structured audit scaffolding (not used for field capture this session) |
| `RAWPLAST_OPERATIONS_ANALYSIS.md` | July analysis from controlled forms — theoretical baseline |
| `SESSION_HANDOVER.md` | July FactoryOS build handover (separate workstream) |
| `factoryos-app/` | Digital MVP — models the paper spine but not yet connected to live ops |
