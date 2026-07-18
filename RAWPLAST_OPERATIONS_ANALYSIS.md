# Rawplast Industries — Current-State Operations Analysis for FactoryOS

**Role:** Senior Manufacturing Operations Consultant, Business Analyst & Software Architect  
**Scope:** Digitize existing workflow — do not redesign the business yet  
**Source material:** `system docs/` (forms, work instructions, production flowcharts, maintenance records)  
**Analysis date:** 18 July 2026  
**Document control noted in sources:** Compiled by QA Officer O. Machikiti; Approved by Operations Manager A. Mutota

---

## 1. Executive Summary — How Rawplast Operates Today

Rawplast Industries is a **make-to-order flexible packaging manufacturer**. It does not run a generic stock-to-shelf model as the primary operating mode. Almost every production run is anchored to a customer specification captured on an **Order Confirmation** (the commercial contract), then translated into a **Works Order** (the factory instruction set).

### What the factory makes

From the production flowchart and product drawings on the Order Confirmation / Trial forms:

| Family | Examples |
|--------|----------|
| Plain rolls | LDPE/HDPE tubing or sheeting — shrink, pallet wrap, case liners |
| Printed rolls | Flexographic print onto treated extruded film |
| Laminated products | Multi-layer film (e.g. laminated autopack rolls, laminated pouch bags) |
| Converted bags | LDPE/HDPE/BOPP bags — side seal, bottom seal, gusset, flap, flip, punch, hem, handles |
| Slit rolls | Trimmed for customer autopack lines |
| Support outputs | Paper cores; recycled material via recycling machines |

### How value flows (one sentence)

**Sales locks the contract → Planning issues a Works Order → Stores issues resin/film → Extrusion (and optionally Printing / Lamination / Slitting / Bagmaking) convert material into labelled rolls or bags → Quality inspects → Finished Goods stores → Despatch ships against the order balance.**

### Operating character

- **Document-driven and paper-heavy.** Controlled forms (DI/R-xx series) carry identity, quantity, dimensions, tolerances, machine assignment, scrap, downtime codes, and approvals.
- **Multi-stage routing is job-specific.** Not every order visits every department. Plain rolls may leave after extrusion; printed bags may pass Extrusion → Printing → Bagmaking.
- **Approvals are distributed.** Order Confirmation requires Customer + Sales + Accounts + Quality + Production. Sales signs first; other departments approve against a checklist (no rigid sequence after Sales).
- **Quantity is dual-tracked:** units and kilograms, with commercial overrun/underrun tolerance of **±10%**.
- **Trials are a first-class path** for new technology, new processes, or food-safety-sensitive changes — Trial Request → Trial Report → then normal order confirmation if accepted.
- **Engineering is tightly coupled to uptime.** Planned preventive maintenance schedule, daily checklists, job cards, and daily activity reports sit alongside production books that already code downtime causes (electrical, mechanical, no power, waiting material, etc.).

### What FactoryOS must respect

FactoryOS should treat the **Order Confirmation number** and **Works Order number** as the spine of the operating system. Every downstream record (production books, material issues, FG transfers, despatch balances) already references these. Digitizing without preserving that spine would break how the floor already thinks.

---

## 2. End-to-End Operational Process Map

### 2.1 Commercial path (Sales → Contract)

```
ENQUIRY
   │
   ▼
QUOTATION  ◄── Sales provides quote
   │
   ▼
CUSTOMER ORDER
   │  • Official PO where available
   │  • OR signed Quotation
   │  • OR signed Order Confirmation
   │  • Channel: email, physical, or other — approval correspondence retained
   ▼
ORDER CONFIRMATION (DI/R-03)  ← CONTRACT
   │  Captures: customer, contact, product, dimensions, tolerances,
   │  quantity (kg + units), payment terms, order status, artwork notes,
   │  special instructions, expected delivery, food-safety notices if any
   │
   ├─► CUSTOMER APPROVAL (required before internal routing)
   │
   └─► INTERNAL APPROVALS (Sales first, then Accounts / Quality / Production
         guided by Order Confirmation Checklist on server)
              │
              ▼
         Follow-up: rectify issues; notify customer of any change
              │
              ▼
         RELEASE TO PRODUCTION PLANNING
```

**Order status values observed:** New Order · Repeat Order · Repeat Order with Changes · Trial Order  
**Payment terms observed:** COD · BOD · Prepayment · 7 / 14 / 21 / 30 days · Deposit + balance on collection  
**Artwork subprocess (printed work):** Customer + Sales choose designer → artwork with dimensions & Pantone codes → Rawplast technical involvement for machine compatibility → customer signs artwork → flexographic plate making (plates are customer property unless agreed otherwise).

### 2.2 Planning path

```
APPROVED ORDER CONFIRMATION
   │
   ▼
PRODUCTION PLANNING
   │  Documents: Production Planning Book + Works Order (DI/R-07)
   │
   ▼
WORKS ORDER
   • Links to Order Confirmation number
   • Product description, dimensions, tolerances, treatment, seals, features
   • Qty to produce (units + kg) vs order qty
   • Machine number, production hours, rate/hour
   • Raw material formulation section
   • Planning / Dispatch balance columns (issued, dispatched, remaining)
   • Rule: NO ALTERATIONS — any change requires a NEW Works Order
   │
   ▼
ROUTE TO REQUIRED DEPARTMENTS (tick-driven on Works Order):
   Extrusion | Printing | Bagmaking | Slitting | Recycling | Core M/C
```

### 2.3 Materials path (parallel / prerequisite)

```
PURCHASING ◄── Purchase Requisition (DI/R-20)
   │              priority High/Medium/Low; 3 quotes; funds check
   ▼
SUPPLIER → Delivery Invoice → RECEIVING INSPECTION
   │
   ▼
RAW MATERIAL STORES
   • Stock cards
   • Material Issue Sheet (against Works Order / formulation)
   • Incoming inspection form
   │
   ▼
ISSUE TO PRODUCTION (mixing / extrusion)
```

### 2.4 Manufacturing path (value-adding)

From `RAWPLAST PRODUCTION FLOW CHART 14.5.25`:

```
                    ┌─────────────┐
                    │  EXTRUSION  │  Heat + pressure on pellets → tubing/sheeting
                    │  Production │  Treatment: UT / T1 / T2
                    │  Book +     │  Mixing section + temp log + roll log
                    │  Labels     │
                    └──────┬──────┘
                           │
            ┌──────────────┼──────────────────┐
            │              │                  │
            ▼              ▼                  ▼
     PLAIN ROLLS      PRINTING           (optional path)
     (FG possible)    Flexo onto         then LAMINATION
            │         treated rolls      multi-layer bond
            │              │                  │
            │              └────────┬─────────┘
            │                       │
            │         ┌─────────────┴─────────────┐
            │         ▼                           ▼
            │      SLITTING                  BAGMAKING
            │      trim for autopack         seal + cut tubing/sheeting
            │         │                           │
            └─────────┴─────────────┬─────────────┘
                                    ▼
                         FINISHED PRODUCT
                         (rolls or bags)
                                    │
                         Recycling / Core M/C as support processes
                         (own work instructions + production books + labels)
```

**Per department shop-floor record pattern (consistent across stages):**

1. Work instructions  
2. Production book / report (output, scrap, downtime codes, rate)  
3. Tracking labels on rolls/bags  

**Extrusion Production Record (DI/R-RO7) captures:** customer, WO#, machine, treatment, dimensions, formulation (Base / LLDPE / Additive), batch #, niproller speed, die size, expected rate/hour, RPM, mixing log, roll-by-roll weight & scrap, temperature zones (barrel / adaptor / die), downtime codes.

**Printing Production Report (DI/R-04) captures:** colours, print across/rounds, cylinder size, anilox per station, ink codes/supplier, expected scrap limit, B/Fwd from previous dept, roll weights, scrap, downtime codes.

**Downtime taxonomy (example — Extrusion):** Set Up, Heat up, Screen Change, Die Change, No Operator, Sample Trial, Waiting for Material, Electrical Fault, Mechanical Fault, No Electricity, No Work.  
**Printing codes** are similar (SU, No Operator, Sample Trial, Waiting Material, Electrical/Mechanical Fault, No Electricity, No Work).

### 2.5 Quality gate → Stores → Despatch

```
FINISHED PRODUCT
   │
   ▼
FINISHED PRODUCTS INSPECTION / FINAL INSPECTION
   │
   ├─ PASS ──────────────────────────────────────────────┐
   │                                                     ▼
   │                                      DAILY FINISHED GOODS TRANSFER (DI/R-35)
   │                                      verify description, dimensions, qty
   │                                                     ▼
   │                                      FINISHED GOODS STORES
   │                                      • Daily Finished Goods report
   │                                                     ▼
   │                                      DESPATCH
   │                                      • Finished Good Request form
   │                                      • Outgoing inspection form
   │                                      • COC (where applicable)
   │                                      • Update Works Order dispatch balance
   │
   └─ FAIL → QUARANTINE
              Corrective Action Request (CAR) to responsible department
              Disposition: Concession OR Rework
```

### 2.6 Trial path (parallel commercial/technical)

```
Need for new process / technology / product validation
   │
   ▼
TRIAL REQUEST FORM (DI/R-39)
   Sales + Quality + Production approval BEFORE routing to production
   │
   ▼
TRIAL RUN on nominated machine / departments
   │
   ▼
TRIAL REPORT (DI/R-17)
   formulation, parameters, results, recommendations
   QA + Production sign-off
   │
   ▼
If accepted → normal Order Confirmation / Works Order path
(New processes adverse to food safety must be disclosed on OC)
```

### 2.7 Engineering / Maintenance path (supports production)

```
POINT OF ORIGIN
  Daily Maintenance | Planned Maintenance | Breakdown | Modification | Other
   │
   ▼
JOB CARD REQUEST
  Production raises request → Engineering assesses priority
  (Critical / Major / Minor), parts availability, internal vs external
   │
   ├─ Parts from Stores ──► if missing → Purchase Requisition
   │
   ▼
Work done → return to production → satisfaction sign-off
   │
   ▼
Supporting records:
  • Preventative Maintenance Schedule (annual X-marks by machine)
  • Daily Maintenance Checklist (mechanical/electrical/compressor)
  • Engineering Daily Activity Report (half-hourly log by shift)
```

### 2.8 Process inventory (named processes)

| # | Process | Primary owner | Trigger |
|---|---------|---------------|---------|
| P1 | Enquiry / Quotation | Sales | Customer interest |
| P2 | Order Confirmation | Sales (+ multi-dept) | Customer order |
| P3 | Artwork & plate making | Sales + Technical + Customer | Printed products |
| P4 | Trial request & report | Sales / QA / Production | New/changed process or product |
| P5 | Production planning & Works Order | Production Planning | Approved OC |
| P6 | Purchasing / supplier receiving | Purchasing + Stores + QA | Material need / PR |
| P7 | Raw material issue | RM Stores | Works Order formulation |
| P8 | Extrusion | Extrusion | Works Order |
| P9 | Printing | Printing | Works Order |
| P10 | Lamination | Production | Works Order / route |
| P11 | Slitting | Production | Works Order |
| P12 | Bagmaking | Bagmaking | Works Order |
| P13 | Recycling | Recycling | Scrap/recycle plan |
| P14 | Core making | Core M/C | Core demand |
| P15 | In-process & final inspection | Quality | Production output |
| P16 | Quarantine / CAR / rework / concession | Quality + Dept | Fail |
| P17 | FG transfer & storage | FG Stores | Pass inspection |
| P18 | Despatch | Despatch | Customer delivery / collection |
| P19 | Maintenance (PM + breakdown) | Engineering | Schedule / failure |
| P20 | HR support processes | HR | People lifecycle (referenced, not fully sampled) |

---

## 3. Departments and Interactions

### 3.1 Department map

| Department | Role in the operating model | Key handoffs |
|------------|----------------------------|--------------|
| **Sales** | Commercial front door; compiles OC; first internal signer; customer communication including food-safety process changes | Customer ↔ Accounts/QA/Production via OC |
| **Accounts** | Credit/payment verification; OC approval; proof of payment; supplier credit | Sales (OC), Purchasing, Despatch (release logic implied by payment terms) |
| **Quality Assurance** | OC checklist content; inspections; trials; food-safety notices; controlled documents | All production stages; Quarantine/CAR |
| **Production Planning** | Translates OC → Works Order; schedules machines/hours | Sales/OC → Extrusion/Print/Bag/etc. |
| **Extrusion** | Primary conversion of resin to film | RM Stores → Printing/Slitting/Bag/FG |
| **Printing** | Flexo print on treated film | Extrusion → Lamination/Slitting/Bag |
| **Bagmaking / Slitting / Lamination** | Conversion to customer finish | Upstream film → FG |
| **Recycling / Core Machine** | Material recovery & cores | Scrap loops / packaging support |
| **Raw Material Stores** | Stock cards, issues, receiving | Purchasing/Suppliers ↔ Production |
| **Finished Goods Stores** | Hold verified good product | Production/QA → Despatch |
| **Despatch** | Outbound fulfilment, docs, balances | FG Stores → Customer |
| **Purchasing** | Requisitions, quotes, POs, supplier eval | User depts → Suppliers → Stores |
| **Engineering** | PM, breakdowns, job cards, daily activity | Production ↔ Stores/Purchasing (spares) |
| **Human Resources** | Training, appraisal, leave, discipline, recruitment | Cross-cutting (forms listed on OC flowchart) |
| **Production Support** | Shown on flowchart adjacent to final inspection — support to production quality flow | Final inspection path |
| **Suppliers** (external) | Quotes, delivery invoices | Purchasing / Receiving |

### 3.2 Critical interaction loops

1. **Contract loop:** Customer ↔ Sales ↔ (Accounts, QA, Production) on Order Confirmation.  
2. **Material loop:** Production need → Purchasing → Supplier → Receiving inspection → RM Stores → Material issue → Mixing/Extrusion.  
3. **Job execution loop:** Planning → Works Order → Department production books → Tracking labels → next department (B/Fwd on Printing report shows chain continuity).  
4. **Quality loop:** Inspection → Pass (FG transfer) or Fail (Quarantine + CAR → Rework/Concession).  
5. **Maintenance loop:** Production downtime → Job card → Engineering → Parts/PR → Return to production; downtime codes already recorded in production books.  
6. **Commercial close loop:** Despatch updates Works Order qty dispatched / balance; payment terms from OC constrain release behaviour (Accounts).

### 3.3 Authority notes (from procedures)

- Sales must sign OC first.  
- Other OC approvals can occur in any order if checklist requirements are met.  
- Customer approval of OC is required before routing to other departments (email statement acceptable if no wet signature).  
- Works Order: no informal alterations — regenerate a new WO for changes.  
- Purchase Requisition: similar commodities per PR; three quotes preferred; reason required if not.

---

## 4. Documents Created During Production (and Adjacent Ops)

### 4.1 Documents present in this repository (sampled)

| Document | Doc No. | When created | Purpose |
|----------|---------|--------------|---------|
| Order Confirmation Form | DI/R-03 | After customer order | Contract + product specification |
| Order Confirmation Processing Flow / WI | DI/P11 | Controlled procedure | Defines OC process |
| Works Order | DI/R-07 | At planning | Factory instruction & balance sheet |
| Extrusion Production Record | DI/R-RO7 | Each extrusion run | Mixing, rolls, temps, scrap, downtime |
| Printing Production Report | DI/R-04 | Each print run | Ink/print params, rolls, scrap, downtime |
| Daily Finished Goods Transfer Form | DI/R-35 | Transfer to FG | Verify description/dimensions/qty |
| Trial Request Form | DI/R-39 | Before trial | Authorize & specify trial |
| Trial Report | DI/R-17 | After trial | Results & recommendations |
| Purchase Requisition Form | DI/R-20 | Material/service need | Authorize buying |
| Maintenance Job Card | — | Breakdown/PM/mod | Request, parts, work done |
| Engineering Daily Activity Report | DI/R 30 | Each shift | Time-stamped artisan activity |
| Daily Maintenance Checklist | DI/R024 | Daily | Mechanical/electrical/compressor checks |
| Preventative Maintenance Schedule | PM | Annual plan | Machine service calendar |
| Production Flow Chart | — | Reference | Manufacturing routing |

### 4.2 Documents referenced by procedures but not in the sample set

These exist in the operating system (named on DI/P11 and related forms) and must be included in the data model even though file copies were not in `system docs/`:

| Document | Likely owner |
|----------|--------------|
| Order Confirmation Checklist | QA / Sales |
| Quotation | Sales |
| Customer Order / PO | Customer / Sales |
| Production Planning Book | Planning |
| Bagmaking Production Book | Bagmaking |
| Slitting / Lamination / Recycling / Core production books | Respective depts |
| Tracking Labels | Production |
| Raw Material Stock Cards | RM Stores |
| Material Issue Sheet | RM Stores |
| Incoming Inspection Form | QA / Stores |
| Quality Inspection Forms (in-process) | QA |
| Outgoing Inspection Form | QA / Despatch |
| Finished Good Request Form | Despatch / FG |
| Daily Finished Goods Report | FG Stores |
| Certificate of Conformity (COC) | QA |
| Corrective Action Request (CAR) | QA |
| Artwork / plate records | Sales / Technical |
| Purchase Order / POP | Purchasing / Accounts |
| Supplier Application & Evaluation Questionnaire | Purchasing |
| Supplier Delivery Invoice | Supplier |
| Proof of Payment | Accounts |
| HR forms (training, appraisal, leave, disciplinary, employee file) | HR |
| Departmental Work Instructions | Each dept |

### 4.3 Document → process stage matrix

| Stage | Documents created / updated |
|-------|----------------------------|
| Enquiry/Quote | Quotation |
| Contract | Order Confirmation, Checklist, Customer approval correspondence, Artwork approval |
| Trial | Trial Request, Trial Report |
| Planning | Planning Book, Works Order |
| Buy/Receive | PR, PO/POP, Delivery Invoice, Incoming Inspection, Stock Cards |
| Issue | Material Issue Sheet, Stock Card update |
| Make | Production Books, Temperature logs, Tracking Labels |
| Inspect | Quality inspection forms, CAR, Quarantine disposition |
| Store | FG Transfer Form, Daily FG Report |
| Ship | FG Request, Outgoing Inspection, COC, WO dispatch balance |
| Maintain | PM Schedule ticks, Daily Checklist, Job Card, Daily Activity Report |

---

## 5. Complete Data Model (Current-State Entities & Relationships)

This model describes **as-operated** entities — mirrors paper concepts, not a redesigned ERP schema.

### 5.1 Entity list

#### Master / reference
- **Customer** — name, address, contacts, email, phones  
- **Supplier** — name, contact, local/international, evaluation status  
- **Employee** — name, role, department, shift (Day/Night), artisan/operator/foreman  
- **Department** — Sales, Accounts, QA, Planning, Extrusion, Printing, Bagmaking, Slitting, Lamination, Recycling, Core, RM Stores, FG Stores, Despatch, Purchasing, Engineering, HR  
- **Machine** — number (EX01…, BM02…, PR01…, Slitter, Puncher, Recycler, Core, Mixer, Compressor, Chiller, Generator…), type, status (in service / not erected / breaking for spares)  
- **ProductType / ProductDrawing** — tubing, sheeting, carrier bag, gusset variants, seals, features (hem, handles, punch, embossing, C-fold, perforated, sleeves…)  
- **Material** — base resin, LLDPE, additives, recycled content, ink codes, cores  
- **DowntimeCode** — controlled list per department  
- **PaymentTerm** — COD, BOD, prepayment, net days, deposit rules  
- **DocumentControl** — document number, revision, effective date, compiler, approver  

#### Commercial
- **Enquiry** (optional formalization)  
- **Quotation** — pricing, validity, customer  
- **CustomerOrder** — external PO / signed quote reference  
- **OrderConfirmation** — *central contract*  
  - status: New / Repeat / Repeat with Changes / Trial  
  - quantities (kg, units), price before VAT, amount paid %, expected delivery  
  - dimensions: width, length, gauge + tolerances; roll weight tolerance  
  - features & treatment flags; print direction; special instructions  
  - food-safety / new-process disclosures  
- **OrderConfirmationApproval** — role (Customer, Sales, Accounts, Quality, Production), name, date, signature/statement  
- **Artwork** — design, Pantones, dimensions, customer approval, plate ownership  

#### Planning & execution
- **WorksOrder** — WO#, OC link, machine#, hours, rate/hour, qty to produce, order qty, formulation, feature ticks, no-alteration rule  
- **WorksOrderBalance** — qty issued, qty dispatched, balances, dates, accounts marks  
- **ProductionRoute** — ordered stages for this WO (Extrusion → …)  
- **MaterialIssue** — from stock to WO / batch  
- **MaterialBatch** — batch # used in mixing/production  
- **ProductionRun** — department-specific instance on a machine/date/shift  
- **ProductionRoll** (or unit) — roll #, weight, time cut, accumulate weight, tracking label ID  
- **ScrapRecord** — qty, linked to run  
- **DowntimeEvent** — code, duration, linked to run  
- **ProcessParameterLog** — e.g. extrusion temperatures, RPM, niproller speed; print cylinder/anilox/colours  

#### Inventory & quality
- **StockCard** / **InventoryBalance** — RM and FG by item  
- **IncomingInspection** / **OutgoingInspection** / **InProcessInspection** / **FinalInspection**  
- **FinishedGoodsTransfer** — WO#, customer, description, dimensions, units, kg, transferred/received/authorised  
- **FinishedGoodsRequest** — despatch pick request  
- **CertificateOfConformity**  
- **QuarantineHold**  
- **CorrectiveActionRequest** — disposition: Concession | Rework  

#### Trials
- **TrialRequest** — objective, product, qty, approvals  
- **TrialReport** — machine, formulation, parameters, findings, recommendations, QA/Production sign-off  

#### Procurement
- **PurchaseRequisition** — items, qty, purpose, priority, quotes (up to 3), funds available, approval  
- **PurchaseOrder**  
- **SupplierDelivery** / invoice  

#### Maintenance
- **PmSchedule** — machine × month plan  
- **DailyMaintenanceCheck** — checklist items × day  
- **MaintenanceJobCard** — origin, priority, description, parts, internal/external, satisfaction  
- **EngineeringDailyActivity** — time slots, machine, summary, job card ref, artisan, foreman comments  

#### People (referenced)
- **TrainingRecord, Appraisal, Leave, Disciplinary, EmployeeFile**

### 5.2 Core relationships (cardinality)

```
Customer 1 ── * OrderConfirmation
OrderConfirmation 1 ── * OrderConfirmationApproval
OrderConfirmation 1 ── 0..1 Artwork
OrderConfirmation 1 ── * WorksOrder          (normally 1 active; changes ⇒ new WO)
WorksOrder * ── 1 Machine (planned primary; runs may vary)
WorksOrder 1 ── * ProductionRun
ProductionRun * ── 1 Department
ProductionRun * ── 1 Machine
ProductionRun 1 ── * ProductionRoll
ProductionRun 1 ── * ScrapRecord
ProductionRun 1 ── * DowntimeEvent
ProductionRun 1 ── * ProcessParameterLog
WorksOrder 1 ── * MaterialIssue
MaterialIssue * ── 1 Material
MaterialIssue * ── 0..1 MaterialBatch
WorksOrder 1 ── * FinishedGoodsTransfer
WorksOrder 1 ── * Despatch / WorksOrderBalance updates
ProductionRoll / FG 1 ── 0..1 FinalInspection
FinalInspection fail ── 1 QuarantineHold ── * CAR
OrderConfirmation 0..1 ── * TrialRequest (when status/process is trial)
TrialRequest 1 ── 0..1 TrialReport
Machine 1 ── * MaintenanceJobCard
Machine 1 ── * PmScheduleEntry
Machine 1 ── * DailyMaintenanceCheck
Employee 1 ── * ProductionRun (as operator)
Employee 1 ── * MaintenanceJobCard / EngineeringDailyActivity
PurchaseRequisition * ── 1 Department (user)
PurchaseRequisition 0..1 ── 1 PurchaseOrder
Supplier 1 ── * PurchaseOrder / SupplierDelivery
```

### 5.3 Identity keys that already exist in paper

| Business key | Role |
|--------------|------|
| Order Confirmation Number | Commercial contract ID |
| Customer Order Number | External reference (or OC/Quote number if no PO) |
| Works Order # | Factory job ID |
| Machine Number | Asset ID |
| Roll No / Tracking Label | Unit traceability |
| Material Batch # | Material traceability |
| Trial No | Trial identity |
| Purchase Requisition / PO # | Buy identity |
| Job Card | Maintenance identity |
| Document No + Revision | Controlled form identity |

### 5.4 Suggested logical schema sketch (for later implementation — not code)

```
customers, suppliers, employees, departments, machines, materials, downtime_codes
order_confirmations, order_confirmation_approvals, artworks
works_orders, works_order_balances, production_routes
material_issues, material_batches
production_runs, production_rolls, scrap_records, downtime_events, process_parameter_logs
inspections, quarantine_holds, corrective_actions
finished_goods_transfers, finished_goods_requests, certificates_of_conformity
trial_requests, trial_reports
purchase_requisitions, purchase_orders, supplier_deliveries
maintenance_job_cards, pm_schedule_entries, daily_maintenance_checks, engineering_daily_activities
```

---

## 6. Where Software Can Replace Paper Without Changing the Workflow

Principle: **same steps, same approvals, same fields — screen instead of sheet.** Do not collapse approval roles or invent new planning logic in MVP.

| Paper artifact | Digital replacement (1:1) | Workflow preserved |
|----------------|---------------------------|--------------------|
| Order Confirmation Form | OC digital form + PDF/print for customer | Same fields & approval gates |
| OC Checklist | Checklist UI with required checks per role | Sales first; others per checklist |
| Works Order | WO screen generated from OC; immutable versioning (change = new WO) | Matches “no alterations” rule |
| Extrusion / Printing / Bagmaking books | Shop-floor data entry on tablet/PC at machine | Same columns & downtime codes |
| Tracking labels | Print labels from WO/roll record (barcode optional later) | Still physical label on product |
| Material Issue Sheet + Stock Cards | Issue transaction updating RM balance | Still issue-against-WO |
| FG Transfer Form | Digital transfer with dual sign (transferred/received) | Same verification intent |
| Despatch pack (request, outgoing insp, COC) | Despatch module updating WO balance | Same docs, electronic copies |
| Trial Request / Report | Linked trial records | Same pre-approval before production |
| Purchase Requisition | Digital PR with 3-quote fields & approval | Same purchasing policy |
| Job Card + Daily Activity + PM checklist | Maintenance module | Same origin types & priorities |
| Approval signatures | Named user + timestamp (+ optional uploaded customer email statement) | Same authority model |

### Explicit non-changes for digitization phase

- Do **not** remove ±10% commercial tolerance behaviour.  
- Do **not** force a single rigid approval sequence beyond “Sales first + Customer before internal routing.”  
- Do **not** merge OC and WO into one document — they serve commercial vs factory audiences.  
- Do **not** require every job to visit Printing/Lamination — routing must remain optional per WO ticks.  
- Keep dual quantity units (kg and units).

---

## 7. Bottlenecks, Duplication, Missing Information, Automation Opportunities

### 7.1 Bottlenecks

1. **Order Confirmation approval latency** — multiple departments + customer signature/email before planning can release work; follow-up is manual.  
2. **Works Order as physical bottleneck** — single paper artifact travels with the job; if lost or delayed, stages cannot proceed cleanly.  
3. **Manual balance tracking** on WO (issued / dispatched / remaining) — error-prone; despatch and planning can disagree.  
4. **Material waiting** — already a first-class downtime code (“Waiting for Material”); signals planning/stores disconnect.  
5. **Maintenance vs production contention** — breakdowns recorded in both production downtime codes and engineering job cards without guaranteed linkage.  
6. **Quote/PR cycle for spares and materials** — three-quote rule + funds approval slows urgent breakdown parts (job card already says raise PR urgently if parts unavailable).

### 7.2 Duplicated work

| Data | Where repeated |
|------|----------------|
| Customer name, product description, dimensions | OC, WO, Extrusion book, Printing book, FG Transfer, Trial forms |
| Works Order # | Copied onto every production and transfer sheet |
| Quantity ordered | OC, WO, production headers |
| Machine assignment | WO and production books |
| Approver names/dates | Multiple signature blocks, often re-written |
| Downtime / maintenance cause | Production book codes vs Job Card narrative |

**Implication:** Master-once on OC → inherit to WO → inherit to run sheets. That is digitization, not process redesign.

### 7.3 Missing information / gaps in the sample

| Gap | Risk |
|-----|------|
| Order Confirmation Checklist file not in repo | Approval criteria opaque to software design until captured |
| Bagmaking / Slitting / Lamination / Recycling production books not sampled | Field-level model incomplete for those stages |
| Material Issue Sheet & Stock Card formats unknown | Inventory transactions underspecified |
| Incoming/Outgoing inspection & COC formats unknown | Quality gate fields incomplete |
| Finished Good Request form not sampled | Despatch UX underspecified |
| CAR form not sampled | Quarantine workflow fields incomplete |
| Production Planning Book not sampled | Scheduling rules (capacity, sequencing) unknown |
| No explicit Bill of Materials standard beyond “formulation” free text | Recipe consistency risk |
| Accounts release-to-despatch rules not fully documented | Payment term enforcement may be tribal knowledge |
| Shift handover rules not explicit | Night/Day columns exist; process for open rolls unclear |

### 7.4 Automation opportunities (still respecting current workflow)

| Opportunity | Type | Notes |
|-------------|------|-------|
| Auto-create WO draft from approved OC | Automation | Human confirms machine/hours/formulation |
| Inherit header fields to production runs | Eliminate re-keying | Biggest quick win |
| Running WO balance from FG transfers + despatch | Automation | Replace manual balance columns |
| Roll # sequencing + label print | Automation | Traceability |
| Downtime code → optional Job Card draft | Semi-automation | Link production & engineering |
| OC approval status dashboard | Visibility | Attack approval bottleneck |
| PM schedule → calendar tasks / job cards | Automation | From existing X-mark schedule |
| Trial → OC conversion | Workflow | When trial accepted |
| Three-quote PR comparison helper | Assistance | Policy unchanged |
| Scrap & rate vs expected (Printing expected scrap limit / extrusion expected rate) | Alerting | Already on forms — make visible |

---

## 8. FactoryOS MVP Recommendation

### 8.1 MVP goal

**Digitize the existing Sales → Planning → Make → Inspect → Store → Despatch spine with minimal behavioural change**, so the factory can run tomorrow’s orders the same way — with shared, accurate data.

### 8.2 In scope (MVP)

1. **Customers & Order Confirmations**  
   - Full DI/R-03 field set  
   - Order status, payment terms, product features  
   - Customer approval capture (sign/upload/email statement)  
   - Internal approvals: Sales → Accounts / Quality / Production with checklist  
2. **Works Orders**  
   - Create from OC; immutable versions; change = new WO  
   - Route ticks (Extrusion/Printing/Bagmaking/Slitting/Recycling/Core)  
   - Formulation section; planning qty; live balance  
3. **Extrusion Production Book (digital)**  
   - Highest-volume primary process; richest sampled form  
4. **Printing Production Report (digital)**  
   - Second major stage; demonstrates multi-dept handoff (B/Fwd)  
5. **Finished Goods Transfer + simple FG stock by WO**  
6. **Despatch against WO**  
   - Record qty dispatched; update balance; basic outgoing checklist fields (expand when form obtained)  
7. **Machine register** seeded from PM schedule list  
8. **Read-only dashboards**  
   - OC approval aging  
   - Open WOs by stage  
   - WO quantity balance (ordered / produced / transferred / dispatched)  
9. **Auth & roles** matching departments (Sales, Accounts, QA, Planning, Extrusion, Printing, FG, Despatch, Admin)

### 8.3 Explicitly out of scope for MVP (phase 2+)

- Full financial ERP / invoicing / general ledger  
- Advanced MRP / automated scheduling optimization  
- Lamination/Slitting/Bagmaking books (add once forms collected — same pattern)  
- Full inventory valuation & multi-warehouse  
- Full maintenance CMMS (keep paper job cards initially; or thin job-card module in phase 1.5)  
- HR module  
- Supplier portal  
- IoT machine telemetry  
- Process redesign (combined stages, removing approvals, etc.)

### 8.4 MVP workflow (unchanged steps, digital artifacts)

```
Create OC → Customer approves → Sales approves → Accounts/QA/Production approve
    → Planning creates WO from OC
    → Extrusion records production against WO
    → (Optional) Printing records against same WO
    → QA marks inspection result (pass/fail)  [minimal fields until forms digitized]
    → FG Transfer into stores
    → Despatch records shipment / collection
    → WO balance updates automatically
```

### 8.5 Success criteria

- A repeat order can be cloned from a prior OC with minimal re-entry.  
- No production run exists without a WO linked to an approved OC.  
- Planning and Despatch see the **same** quantity balance.  
- Operators recognize screens as their current books (field parity).  
- Paper can still be printed for backup/customer wet-ink where needed.  
- Time-to-release (OC approved → WO issued) measurable.

### 8.6 Implementation sequence (still no redesign)

| Sprint theme | Deliverable |
|--------------|-------------|
| Foundations | Users/roles, customers, machines, document numbering |
| Commercial spine | OC + approvals + checklist |
| Factory spine | WO + balances + route |
| Floor capture | Extrusion book → Printing book |
| Outbound | FG transfer → Despatch |
| Visibility | Approval & WO WIP dashboards |
| Harden | Printables (OC/WO/labels), audit trail, backup |

### 8.7 Immediate artefact collection (before build)

To close model gaps, obtain controlled copies of:

1. Order Confirmation Checklist  
2. Bagmaking Production Book  
3. Material Issue Sheet + Stock Card  
4. Incoming & Outgoing Inspection forms + COC  
5. Finished Good Request form  
6. CAR form  
7. Production Planning Book (one filled example)  
8. One complete job pack (OC → WO → Extrusion → Print → FG Transfer → Despatch) as a worked example

---

## Source Index

| File | Used for |
|------|----------|
| `Order Confirmation Processing wokinstructions.pdf` (DI/P11) | End-to-end process, departments, document list |
| `Order confirmation.pdf` (DI/R-03) | Commercial contract fields, artwork rules, payment terms |
| `WORKS ORDER.pdf` (DI/R-07) | Factory instruction & balance model |
| `RAWPLAST PRODUCTION FLOW CHART 14.5.25.pdf` | Manufacturing routing & product families |
| `Extrusion Production Book.xlsx` (DI/R-RO7) | Extrusion data model & downtime codes |
| `Printing Production Book.pdf` (DI/R-04) | Printing data model & handoff |
| `Finished Goods Trasfer Sheet.pdf` (DI/R-35) | FG transfer control |
| `Trial Request Form.pdf` / `Trial Report.pdf` | Trial subprocess |
| `Purchase Requisition Form.pdf` (DI/R-20) | Purchasing policy |
| `MAINTENANCE JOB CARD.pdf` | Maintenance workflow |
| `Engineering daily activity report.pdf` / `Engineering daily maintenance record.pdf` | Engineering daily ops |
| `Extrusion Production Book.xlsx.pdf` | Preventative Maintenance Schedule & machine list |

---

*End of current-state analysis. Application code should not begin until stakeholders confirm this understanding and supply the missing controlled forms listed in §8.7.*
