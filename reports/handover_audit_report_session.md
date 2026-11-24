# Handover: Rawplast audit report and slide deck

Last updated: 24 November 2026

## What has been done

- Applied adjustment rounds 2–6 of `reports/adjustments_to_report.md` to `reports/rawplast_operations_audit_report.typ`. Round 1 was already done before this work.
- Ran an error check against the raw notes and fixed mismatches; merged the old Southerton “matching jobs to machines” finding into cross-cutting section 3.4.
- Built an HTML slide deck for the directors’ meeting, branded to Rawplast guidelines, with a workplace photo on the cover.
- Round 6 (24 Nov 2026): removed all mention of XE19; reframed priorities and Southerton findings around faster maintenance response; added a fuller finding that the Southerton walk-in shop opened late. Deck and this handover updated to match.

Rounds 2–6 are marked implemented in `adjustments_to_report.md`. Error-check fixes and the 3.4 merge are recorded only here.

## Files

| File | Role |
|------|------|
| `reports/rawplast_operations_audit_report.typ` | The report (Typst source) |
| `reports/rawplast_operations_audit_report.pdf` | Compiled PDF (recompile after Typst edits) |
| `reports/adjustments_to_report.md` | Reviewer’s change requests, by round |
| `raw notes/*.md` | Field notes; evidence base for every claim |
| `reports/deck/rawplast_audit_deck.html` | Slide deck (open in a browser) |
| `reports/deck/fonts/` | Sequel Sans Display fonts used by the deck |
| `reports/deck/assets/` | Logo and resized cover photo |
| `raw notes/assets/files/rawplast_branding_guidelines.pdf` | Brand colours, logo rules, typography |
| `raw notes/assets/rawplast logo.png` | Company logo |
| `raw notes/assets/images/_RT_0540.jpg` | Workplace photo (original); deck uses a resized copy |

Compile the report with:

```
typst compile reports/rawplast_operations_audit_report.typ
```

## Current report structure

Section numbers in older rounds of `adjustments_to_report.md` refer to earlier versions and no longer match.

1. Executive summary, with 1.1 Immediate priorities (four items, abstract framing; priority 1 is faster fault-to-repair)
2. Scope
3. Cross-cutting findings
   - 3.1 Delayed copies of truth
   - 3.2 Idle and under-used capital (no XE19; maintenance lag called out)
   - 3.3 Signals without closure
   - 3.4 Routing and job size (includes the job-to-machine framework)
   - 3.5 Labelling and product identity
   - 3.6 Single points of failure
4. Site and function friction points
   - 4.1 Msasa: stock and despatch; raw material; no dedicated marketing or CRM
   - 4.2 Southerton: slow fault resolution; walk-in shop opened late
   - 4.3 Accounting and systems: unstable systems path; need for ERP
5. Prioritised recommendations (8 rows)
6. Glossary

Removed over the course of this work: Open items section; Msasa maintenance/hygiene claim; power/recycling finding and transformer recommendation; Southerton commercial finding; distribution/internal replenishment finding; separate “Accounting requirements for ERP” finding; all mentions of XE19 / EX19.

## Conventions the reviewer has set

- Call the Southerton CI printer **PR05**. Never “central impression printer” or “press”.
- Do **not** mention the Southerton core extruder (XE19 / EX19) in the report or deck. It is close to commissioning but not running; the point is faster maintenance response, not that machine.
- Call the Southerton quality lead the **QA officer**.
- Say **accounts** / **accounting**, not finance leadership or financial officer.
- Software crashes **weekly**.
- No timings in recommendations; no IT as an owner.
- Write in plain, human prose. Humanizer skill: `C:\Users\Katiyo\.claude\skills\humanizer\SKILL.md`.

## Facts confirmed by the reviewer (not all in the notes)

- Operators are the source of the 1 tonne minimum for PR05.
- Raw-material stores late requisitions “force overtime”.
- Work is misrouted between Msasa and Southerton in both directions (section 3.4). The notes do not record this; consider adding it to `raw notes/` so the claim has a source.
- Machine-code labelling is inconsistent at Msasa as well as Southerton.
- Vans out of service: Mercedes-Benz Sprinter ADY 6949 and Ford Transit ACG 5086 (`raw notes/fleet_cars.md`).
- Southerton walk-in shop: planned 1 September 2026, still closed through early October, now open but late.
- XE19 was bought used and is close to commissioning; keep it out of the published report.
- “Rawplast Investments Pvt. Ltd.” is the correct company name for the report and the deck, even though the brand guidelines and logo say “Rawplast Industries (Pvt) Ltd”.

## Slide deck

Open `reports/deck/rawplast_audit_deck.html` in a browser. Copy the whole `reports/deck/` folder together (HTML, `fonts/`, `assets/`).

- Arrow keys, space or click to move; F for full screen; `#5` jumps to slide 5.
- PDF: Ctrl+P → Save as PDF → background graphics on. Each slide is one page.
- Canvas is fixed at 1920 × 1080 and scales to the screen.

Slides (14):

1. Title with workplace photo
2. The short version
3. Four immediate priorities (priority 1 = faster fault-to-repair)
4. Finished goods a day behind (3.1)
5. Southerton fault resolution (4.2.1)
6. Southerton walk-in shop opened late (4.2.2)
7. Routing and job size (3.4)
8. Idle capital (3.2)
9. Msasa friction (4.1)
10. Systems and ERP (4.3.1)
11. Other findings (3.3, 3.5, 3.6)
12. Eight recommendations
13. Three decisions for the directors (recommendations 1, 7, 8)
14. Questions and discussion

All slide content is meant to track the current report. If the report changes again, update the deck by hand; nothing links them.

Branding:

- Rawplast Blue `#00239C`, Red `#EE2737`, White `#FEFEFE`. The guidelines’ RGB for blue (0, 51, 153) does not match its hex; the hex (Pantone 661C) was used.
- Sequel Sans Semi Bold Display for headings, Black Oblique Display for labels, Roman Display for body.
- Logo always shown whole on white.
- Cover photo in the deck: `reports/deck/assets/cover-workplace.jpg` (2400 × 1600). Original untouched.

## Still open

- Recompile the report PDF after the latest Typst edits and check heading numbering and the recommendations table width.
- Confirm recommendation owner roles with the directors before release.
- Report cover/footer still use em dashes; body text does not.
- Font licence: Sequel Sans files came from dfonts.org. Confirm Rawplast holds a commercial licence before sharing the deck outside the company.
- Slide 13 (“Three decisions only the directors can make”) is a framing choice. Confirm it is the right ask for the meeting.
- Workplace photo on the closing slide was offered, not done.
- Add the Msasa↔Southerton routing claim to `raw notes/` if it should have a written source.
- `system docs/CUSTOMER INFORMATION SHEET [new].xlsx` may still be untracked and is unrelated.
