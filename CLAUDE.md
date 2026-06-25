  # Project Instructions

  ## Designing this website — combined workflow (MANDATORY)

  For ANY design, UI, or written-content work on this project (new components, layout changes, styling, copy, motion, refactors of visual code, design reviews, marketing copy, microcopy), you MUST use `design.md` AND `brand.md` AND both skills TOGETHER, in this exact order, BEFORE writing any code or producing recommendations:

  1. **Read `./design.md` first.** It is the project's design source of truth — tokens, type scale, motion rules, and the "Avoid (AI defaults)" lists. Everything downstream must respect it.
  2. **Read `./brand.md` next.** It is the project's brand source of truth — who TechUpServices is, audience, positioning, voice & tone, canonical service names, CTA library, logo rules, and the locked cyan → blue → purple gradient identity. Where `design.md` defines the *how*, `brand.md` defines the *who* and *what we sound like*.
  3. **Invoke the `frontend-design` skill** via the Skill tool. Use it to set aesthetic direction (palette intent, typographic pairing, structural devices, one justified aesthetic risk) — but constrained by what `design.md` and `brand.md` already lock down. If the skill suggests something that conflicts with either file, the files win.
  4. **Invoke the `ui-ux-pro-max` skill** via the Skill tool. Use it for UI/UX patterns, component structure, accessibility, and concrete generation guidance — again constrained by the two files and the direction set in step 3.
  5. **Synthesize.** State briefly how `design.md` + `brand.md` + `frontend-design` + `ui-ux-pro-max` combined to shape the decision, then implement.

  This is a blocking requirement. Do not skip `design.md`. Do not skip `brand.md`. Do not skip either skill. Do not invoke them in isolation — they are meant to compose. If a task is purely non-visual and non-brand (backend env var, dependency bump, build config, infrastructure), you may skip this workflow and state explicitly why.

  ## Design source of truth — `./design.md`

  All design and UI decisions for this project MUST follow `./design.md`. It is the contract for *how* things are built; `brand.md` is the contract for *who* we are; the two skills are the craft layer on top of both.

  Specifically:
  - Use the token system (no raw hex codes or pixel values)
  - Mobile-first, fluid typography via clamp()
  - Avoid every item in the "Avoid (AI defaults)" lists
  - Match motion/cursor craft to brand personality

  ## Brand source of truth — `./brand.md`

  All brand, copy, voice, naming, and identity decisions for this project MUST follow `./brand.md`. It locks:
  - Company identity, positioning, audience priority
  - Voice & tone (active voice, preferred/avoided vocabulary, CTA library)
  - Canonical service names and proof-point stats (use verbatim from `services.ts` / About section)
  - Logo lockup rules and clear space
  - The canonical cyan → blue → purple gradient identity and per-mode token mapping
  - Typography direction (reject Inter/Geist/Satoshi defaults)
  - Motion personality and the single signature element

  Treat conflicts as: `design.md` wins on the *how*, `brand.md` wins on the *who*. Skills always lose to either file.

  ## Skills (composed, not standalone)

  - `frontend-design` — aesthetic direction, typography, palette, anti-templated choices. Operates within `design.md` + `brand.md` constraints.
  - `ui-ux-pro-max` — UI/UX patterns, component structure, accessibility, generation templates, pre-delivery checklist. Operates within `design.md` + `brand.md` constraints and the direction set by `frontend-design`.

  Order is intentional: tokens (`design.md`) → identity (`brand.md`) → aesthetic POV (`frontend-design`) → execution patterns (`ui-ux-pro-max`) → code.
