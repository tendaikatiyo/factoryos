# Handover: Rawplast audit report revisions (5 November 2026)

## What this session did

Applied rounds 2 to 5 of `reports/adjustments_to_report.md` to `reports/rawplast_operations_audit_report.typ`, then ran an error check against the raw notes, fixed what it found, and merged the old 4.2.2 into section 3.4. Round 1 was already done before this session.

Rounds 2 to 5 are marked "implemented" in `adjustments_to_report.md`. The error-check fixes and the 4.2.2 merge are not logged there; this document is the record of them.

Later in the session, built an HTML slide deck for the directors' meeting from the same content (see "Slide deck" below).

## Files

| File | Role |
|------|------|
| `reports/rawplast_operations_audit_report.typ` | The report (Typst source) |
| `reports/adjustments_to_report.md` | Reviewer's change requests, by round |
| `raw notes/*.md` | Field notes; the evidence base for every claim |
| `reports/deck/rawplast_audit_deck.html` | Slide deck for the directors (open in a browser) |
| `raw notes/assets/files/rawplast_branding_guidelines.pdf` | Brand colours, logo rules, typography |
| `raw notes/assets/rawplast logo.png` | Company logo |
| `raw notes/assets/images/_RT_0540.jpg` | Workplace photo used on the deck cover (original, full size) |

Compile with `typst compile reports/rawplast_operations_audit_report.typ`. Typst is not installed on this machine, so the report has not been compiled since these edits.

## Current report structure

Section numbers in `adjustments_to_report.md` refer to older versions of the report and no longer match.

1. Executive summary, with 1.1 Immediate priorities (four items)
2. Scope
3. Cross-cutting findings
   - 3.1 Delayed copies of truth
   - 3.2 Idle and under-used capital
   - 3.3 Signals without closure
   - 3.4 Routing and job size (now includes the job-to-machine framework, formerly 4.2.2)
   - 3.5 Labelling and product identity
   - 3.6 Single points of failure
4. Site and function friction points
   - 4.1 Msasa: 4.1.1 Stock and despatch, 4.1.2 Raw material, 4.1.3 No dedicated marketing or CRM
   - 4.2 Southerton: 4.2.1 Slow fault resolution at Southerton
   - 4.3 Accounting and systems: 4.3.1 Unstable systems path; need for ERP
5. Prioritised recommendations (8 rows)
6. Glossary

Removed during this session: the Open items section, the Msasa maintenance/hygiene claim, the power/recycling finding, the transformer recommendation, the Southerton commercial and shop findings, the distribution/internal replenishment finding, and the separate "Accounting requirements for ERP" finding.

## Conventions the reviewer has set

- Call the Southerton CI printer **PR05** and the Southerton core extruder **XE19**. Never "central impression printer" or "press".
- Call the Southerton quality lead the **QA officer**.
- Say **accounts** / **accounting**, not finance leadership or financial officer.
- Software crashes **weekly** (not "roughly" or "at least").
- No timings in recommendations; no IT as an owner.
- Write in plain, human prose. The humanizer skill (`C:\Users\Katiyo\.claude\skills\humanizer\SKILL.md`) has been used for rewrites.

## Facts confirmed by the reviewer (not all in the notes)

- XE19 was bought used.
- Operators are the source of the 1 tonne minimum for PR05.
- Raw-material stores late requisitions "force overtime".
- Work is misrouted between Msasa and Southerton in both directions (section 3.4). The notes do not record this; consider adding it to `raw notes/` so the claim has a source.
- Machine-code labelling is inconsistent at Msasa as well as Southerton.
- Vans out of service: Mercedes-Benz Sprinter ADY 6949 and Ford Transit ACG 5086 (`raw notes/fleet_cars.md`).
- "Rawplast Investments Pvt. Ltd." is the correct company name for the report and the deck, even though the brand guidelines and logo say "Rawplast Industries (Pvt) Ltd".

## Slide deck

Format chosen by the reviewer: a single HTML file (over PowerPoint and Typst). Open `reports/deck/rawplast_audit_deck.html` in a browser. The whole `reports/deck/` folder must travel together: the HTML, `fonts/` (three Sequel Sans files) and `assets/` (logo and cover photo).

- Arrow keys, space or click to move; F for full screen; `#5` in the URL jumps to slide 5.
- PDF: print the page (Ctrl+P), Save as PDF, background graphics on. Each slide prints as one page.
- Canvas is fixed at 1920 × 1080 and scales to the screen.

Slides (13): title with workplace photo; the short version; four immediate priorities; finished goods a day behind (3.1); Southerton fault resolution (4.2.1); routing and job size (3.4); idle capital (3.2); Msasa friction (4.1); systems and ERP (4.3.1); other findings (3.3, 3.5, 3.6); the eight recommendations; three decisions for the directors (recommendations 1, 7, 8); questions and discussion.

All slide content comes from the current report. If the report changes, the deck must be updated by hand; nothing links them.

Branding applied from the guidelines:

- Rawplast Blue `#00239C`, Red `#EE2737`, White `#FEFEFE`. The guidelines' RGB for blue (0, 51, 153) does not match its hex; the hex (Pantone 661C) was used.
- Sequel Sans Semi Bold Display for headings, Black Oblique Display for labels, Roman Display for body.
- Logo always shown whole on white, as the guidelines require.

The cover photo in the deck is a resized copy (`reports/deck/assets/cover-workplace.jpg`, 2400 × 1600, 458 KB). The original is untouched.

Layout was checked by rendering every slide with headless Edge at 1920 × 1080; nothing overflows.

## Still open

- Compile the report and check the layout, especially heading numbering for the findings and the recommendations table width.
- Confirm the owner roles in the recommendations table with the directors before release.
- The cover and footer still use em dashes. The body text does not.
- Font licence: the Sequel Sans files came from dfonts.org. Sequel Sans is commercial; confirm Rawplast holds a licence before the deck is shared outside the company.
- Slide 12 ("Three decisions only the directors can make") is a framing choice: the recommendations where directors are owners. Confirm it is the right ask for the meeting.
- The workplace photo could also go on the closing slide, which is plain white. Offered, not done.
- `system docs/CUSTOMER INFORMATION SHEET [new].xlsx` is untracked in git and unrelated to this work.
