# Session Activity — 23 July 2026

Repository: `factoryos`  
Branch: `main`  
Topic: Rawplast sales marketing materials — brand rules / AI tooling

## Context

Sales currently ships AI-generated product flyers (example reviewed: Ice Cream Lollies packaging). Logo and palette are roughly correct; the work feels busy, tasteless, and risky for brand image. AI still saves time, so the goal is **constrained generation**, not abandoning AI.

## What we reviewed

- Sample flyer: dense layout — process icon list + benefit strip + CTA stamp + packed contact footer all competing with product mockups.
- Official brand book added to the repo: `rawplast_branding_guidelines2.pdf` (Version 1, compiled by Tendai A.F. Katiyo, January 2024).

### Brand book extract (canonical tokens)

| Token | Spec |
| --- | --- |
| Rawplast Blue | `#00239C` · R0 G51 B153 · Pantone 661C |
| Rawplast Red | `#EE2737` · R239 G39 B55 · Pantone 1788C |
| Rawplast White | `#FFFFFF` |
| Display type | Sequel Sans Black Oblique |
| Headings | Sequel Sans Semi Bold |
| Body | Sequel Sans Book |
| Logo wordmark | Impact Regular (“Rawplast Industries”) + Arial Black (“Total Packaging Solutions”) — **logo lockup only** |
| Logo rules | Unified lockup only; white behind wordmark; symbol = 1/3 logo length; 3pt outline |

Note: the brand book covers logo, colours, and type. It does **not** define flyer layout, hierarchy, density, or copy limits — which is why unconstrained ChatGPT defaults fill the gap with busy templates.

Also note: FactoryOS UI typography in `design_1.md` (Stack Sans / Geist / Inter) is a **separate** product system from Rawplast marketing brand type (Sequel Sans). Do not merge them.

## Discussion — proposed system (not built yet)

Three layers for a future brand/marketing repo or `brand/` folder:

1. **Constants** — colours, type roles, logo rules, approved contact block, product families  
2. **Cursor rules** — hard composition constraints (one focal point, max icons, no stamp chrome, footer density limits)  
3. **Skill** (e.g. `rawplast-flyer`) — product → template → prompt → self-check against anti-patterns  

### Anti-patterns called out from the sample flyer

- Multiple competing headlines / CTAs on one page  
- Process capabilities list **and** benefit strip **and** punchline (more than one job per surface)  
- Stock shield / stamp / ribbon chrome  
- Contact footers listing every phone, email, and social channel  
- Hyper-glossy AI pouch mockups as hero without preferring real product photography when available  

## Tooling comparison (decision pending)

| Option | Fit for this problem |
| --- | --- |
| **ChatGPT (current)** | Fast image gen; weak persistent brand memory; drifts per chat |
| **Claude Projects** | Stronger if brand PDF + system prompt live in one shared Project |
| **Cursor + git repo** | Best for shared rules/skills/constants versioned for the whole team |

Honest split: agent + rules beat ChatGPT on **briefs, hierarchy, and brand compliance checks**. None of the tools fully replace print-ready design craft or photoreal product art direction overnight.

## Decisions

- **No tooling decision yet** (Cursor vs Claude vs staying on ChatGPT).  
- **No brand rules/skills implemented yet** — architecture only discussed.  
- Brand guidelines PDF committed to this repo as source material.

## Next session (when ready)

1. Confirm canonical contact block (letterhead / email signature), not flyer footer alone.  
2. Decide: Cursor repo rules, Claude Project, or both.  
3. Scaffold `brand/CONSTANTS.md`, marketing composition rules, and a flyer skill.  
4. Keep marketing brand assets separate from FactoryOS app design tokens.
