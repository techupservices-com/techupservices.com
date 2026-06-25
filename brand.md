# TechUpServices — Brand Source of Truth

> Companion to `design.md`. Where `design.md` defines **how** to build (tokens, motion, anti-defaults), this file defines **who we are** and **what we sound like**. Both files are mandatory inputs for any work on this site.

This document was synthesized from: the live website, `src/data/services.ts`, the `public/images/logo.png` lockup, `design.md`, the `frontend-design` skill, and `ui-ux-pro-max` data. Where the skill's literal recommendation (navy/gold "Trust & Authority" palette, Orbitron type) conflicted with the brand already established in code and the anti-default rules in `design.md`, the existing brand wins.

---

## 1. Company

**TechUpServices** — a Pune-based digital agency that builds AI automation, websites, mobile apps, WhatsApp automation, social/digital marketing programs, and provides tech consulting for businesses that want to *aggressively and elegantly* scale.

- **Founded on:** the conviction that complex technology should produce profound business outcomes — not just impressive demos.
- **Self-description in voice:** "Architects of the digital future" — not vendors, not freelancers, not a shop. A dedicated innovation partner.
- **Where we are:** Office No. 1, Near Main Gate, Hari Ganga Society, Yerwada, Pune – 411006
- **How to reach us:** support@techupservices.com · +91 82374 47244

### Services we actually sell (the canonical list)

Pulled from `src/data/services.ts`. This is the surface area — every page, every proposal, every social post should map back to one of these seven.

| # | Service | One-line promise |
|---|---|---|
| 1 | **AI Automation** | Smarter workflows, instant results. |
| 2 | **Social Media Management** | Engage, grow, convert. |
| 3 | **Website Development** | Your digital storefront. |
| 4 | **Mobile App Development** | Apps that engage and convert. |
| 5 | **WhatsApp Automation** | Customer engagement, simplified. |
| 6 | **Digital Marketing** | Reach, convert, grow. |
| 7 | **Tech Consulting** | Strategic technology guidance. |

### Proof points (use these, don't invent new ones)

- **99%** client satisfaction
- **250+** successful projects
- **3×** automation ROI
- **40%** speed increase

---

## 2. Positioning

**One-sentence positioning:** *Premium AI automation and bespoke digital presence built for visionary enterprises ready to scale indefinitely.*

**What we are:** an innovation partner that ships scalable digital infrastructure.
**What we are not:** a template shop, a freelancer marketplace, a "we'll just make it look modern" agency, or a single-service specialist.

**The single job of the website:** convince a serious decision-maker that one discovery call with us is worth their next 30 minutes. Everything on the page either supports that call or earns the right to ask for it.

**Audience priority (in order):**
1. **Founders and operations leads at growth-stage companies** who already know they need automation but don't know who to trust.
2. **In-house marketing/tech leads** evaluating agencies as long-term partners (not vendors for a single deliverable).
3. **Established SMBs in Pune / India** who want digital infrastructure built once, properly, instead of stitched together.

We are not trying to win bargain shoppers, side-project tinkerers, or "can you just make me a quick landing page" requests.

---

## 3. Personality

Five words: **Premium · Engineered · Confident · Warm · Forward-leaning.**

We sound like a small studio of senior practitioners who care about craft. Not a Big-4 consultant. Not a YC-pitch-deck SaaS. Not a Fiverr seller. Closer to an architecture firm that happens to ship code.

- **Premium, not luxury.** We're polished and precise, not gold-leaf and serifs. The premium feel comes from restraint, motion craft, and details — not from ornamentation.
- **Engineered, not corporate.** We talk about systems, infrastructure, and measurable outcomes — but in plain language, with active verbs.
- **Confident, not arrogant.** We make claims we can back with the stats above. We don't oversell.
- **Warm, not casual.** "Let's talk" is on-brand. "Hey there 👋 stoked to chat!" is not.
- **Forward-leaning, not futurist.** We build for what businesses need this quarter and next year — not for a sci-fi vision of 2040.

---

## 4. Voice & Tone (writing as design material)

Per `frontend-design`: copy is design material, not decoration. Bring the same intentionality to words as to spacing.

### Voice principles (constant across the site)

1. **Active voice, present tense.** *"We build digital infrastructure."* Not *"Digital infrastructure is built by us."*
2. **Name things by what people control,** not how systems are built. *"Automate customer follow-ups"* beats *"Configure webhook triggers."*
3. **Be specific, not clever.** *"Reclaims thousands of operational hours"* beats *"Unlock the future of work."*
4. **One job per element.** A button label, a section eyebrow, a stat — each does one thing.
5. **Cohesion through repeated vocabulary.** A "Discovery call" stays a "Discovery call" everywhere — never "intro chat," "consultation," or "kick-off session."

### Tone shifts by context

| Context | Tone | Example |
|---|---|---|
| Hero / headlines | Confident, declarative, three-beat | *"Automate. Innovate. Elevate."* |
| About / story | Reflective, principled, warm | *"We are not just an agency; we are your dedicated innovation partner."* |
| Service descriptions | Outcome-first, plain | *"Automate communication, lead management, and support via WhatsApp."* |
| CTAs | Direct, low-friction, named for outcome | *"Explore Services" · "Send Message" · "Schedule a discovery call"* |
| Errors / empty states | Direction, not apology | *"Please fill in all required fields."* (not *"Oops! Something went wrong 😅"*) |
| Success states | Calm confirmation + next step | *"Request submitted successfully. Our team will get in touch with you soon."* |
| Footer / fine print | Quiet, factual | *"© TechUpServices. All rights reserved."* |

### Words we use (preferred vocabulary)

automate · build · ship · scale · bespoke · engineered · infrastructure · workflow · system · discovery call · partner · outcome · reclaim (time/hours) · integrate · craft · architect · transformation

### Words we avoid

- **Generic SaaS-speak:** *unlock, supercharge, revolutionize, game-changing, next-gen, cutting-edge* (use only when concretely true), *seamless, robust, leverage* (as a verb), *solutions provider*
- **Pitch-deck filler:** *world-class, best-in-class, industry-leading* (without proof), *synergy, holistic, ecosystem*
- **AI-generated tells:** *"Build faster. Ship smarter. The all-in-one platform for [audience]."*, *"Get Started Free"*, *"Ready to take your X to the next level?"*
- **Hype emoji in body copy:** 🚀 ⚡ ✨ 🎯 — fine in social posts where the platform calls for them, never as section dividers or on the site itself.

### CTA library (use these, don't reinvent each time)

- **Primary, top of funnel:** *Explore Services*
- **Primary, bottom of funnel:** *Schedule a discovery call*
- **Secondary on hero:** *Contact Us*
- **Form submit:** *Send Message*
- **Nav button:** *Get Started*
- **Newsletter:** *Join*

---

## 5. Visual Identity (governed by `design.md`)

`design.md` is the binding contract for tokens, scales, motion, and anti-defaults. This section captures only the brand-level decisions that live *above* the token system.

### 5.1 Logo

- **Primary lockup:** `public/images/logo.png` (2000×2000 PNG, full-color). Use this wherever the surface allows full-color rendering.
- **Wordmark lockup (in-code):** `TechUp` (font-black) rendered with the brand gradient + `Services` (font-medium, neutral dark) — currently used in `Navbar.tsx` and `Footer.tsx`. This is the canonical text lockup when the PNG isn't appropriate (small sizes, inline copy, monochrome contexts).
- **Clear space:** Minimum clear space around any logo lockup = the height of the capital "T" in *Tech*. Never crowd it with adjacent badges, taglines, or icons.
- **Don't:** stretch, recolor outside the approved gradient ramp, drop-shadow, add a glow, place on a busy background without a solid scrim, animate the gradient as a "shimmer" effect.

### 5.2 Color (the canonical brand gradient)

The website already establishes a clear identity: **cyan → blue → purple**, against an **off-black** dark background and a soft **near-white** light background. This is non-negotiable as the brand identity — `design.md`'s rule against "the AI gradient (purple → pink → orange)" is what we deliberately are not.

| Token role | Light mode | Dark mode | Notes |
|---|---|---|---|
| Brand gradient — start | `cyan-600` (#0891b2) | `cyan-400` (#22d3ee) | Always the leftmost stop |
| Brand gradient — middle | `blue-600` (#2563eb) | `blue-500` (#3b82f6) | The anchor — most usage of "brand blue" maps here |
| Brand gradient — end | `purple-600` (#9333ea) | `purple-600` (#9333ea) | Always the rightmost stop |
| Surface — base | `bg-gray-50` / `slate-50` | `#000212` (off-black, not pure #000) | Per `design.md` §3, never `#000` |
| Surface — elevated | `white/80` w/ subtle shadow | `#1A1C23` / `#12131A` | Stat cards, contact card, glass surfaces |
| Text — primary | `slate-900` | `white` | |
| Text — body | `slate-600` | `gray-400` / `slate-300` | |
| Text — muted | `slate-500` | `gray-500` | Footer fine print only |
| Accent (per-service) | Defined per service in `services.ts` | same | Used only inside that service's section, never globally |

**Gradient usage rules:**
1. The full `cyan → blue → purple` gradient is reserved for **headlines** (the second-line hero phrase), the **wordmark**, and one **primary CTA per page maximum**.
2. Two-stop versions (`cyan → blue`, `blue → purple`) are allowed for buttons, accents, and secondary highlights.
3. Never apply the gradient as a section background. Background atmosphere = the soft blurred radial glows already used in `Hero.tsx` and `Footer.tsx` (cyan/blue/purple at low opacity, heavy blur).
4. Per-service theme colors (`#00FFFF`, `#FF00FF`, etc. in `services.ts`) are valid **only inside that service's section** — they should never compete with the brand gradient in nav, hero, or footer.

### 5.3 Typography

`design.md` rejects Inter/Geist/Satoshi/DM Sans as defaults. The site currently leans on `font-black` weight + tight tracking for display, which gives it presence — but the actual face needs to be deliberate.

- **Display face (recommended direction):** A wide grotesque or modified neo-grotesque with a strong black weight — candidates: **PP Neue Montreal**, **ABC Diatype**, **Söhne Breit**, or a comparable Pangram Pangram / ABC Dinamo family. Used at `font-black` for hero, section H2s, and stat values.
- **Body face:** A complementary humanist or geometric sans with excellent rendering at 16–18px — candidates: **PP Neue Montreal** (same family, regular/medium weight) for cohesion, or a contrasting body like **Söhne** / **GT America** if a two-family pairing is preferred.
- **Utility face:** Same family as body, used for captions, eyebrows, footer fine print at smaller sizes + uppercase tracking.
- **Hierarchy intent (per `design.md` §1):** Real relationships between sizes — not "h1 big, h2 medium." Hero display sits dramatically above section H2 (currently ~`8xl` vs `6xl`); body holds a 16px+ minimum on mobile via `clamp()`.
- **Weight discipline:** `font-black` is the brand's signature weight for emphasis. Reserve it for display and stat values. `font-bold` for sub-heads. `font-medium` / `font-semibold` for nav links and eyebrows. Body stays regular.

### 5.4 Motion personality

Per `design.md` §7 and the existing `Hero.tsx` / `AboutSection.tsx` implementations:

- **Easing personality:** *Forward-leaning ease-out* — entrances feel like things being placed deliberately, not bouncing in. Spring overshoot is reserved for one signature interaction per page (e.g., a CTA press), not used as a default.
- **Duration band:** Micro 150–250ms · Section reveals 400–800ms · Ambient backgrounds 15–20s loops.
- **Staggered reveals:** 80–100ms between siblings — `AboutSection.tsx` stat grid is the reference implementation.
- **Ambient motion:** Slow drifting blurred radial glows in cyan/blue/purple at low opacity — present in hero, about, contact, footer. This is the brand's "breathing" — never remove it from a section without replacing with an equivalent ambient layer.
- **Respect `prefers-reduced-motion`** — kill ambient drifts, keep static reveals only.

### 5.5 The signature element

Per `frontend-design`: spend boldness in one place. **The TechUpServices signature is the cyan → blue → purple gradient applied to the second line of every section's headline against the off-black or near-white surface, with soft blurred glow atmospheres breathing in the background.** That's the one thing that, if removed, would make the brand unrecognizable. Everything else stays disciplined and quiet around it.

---

## 6. Brand application rules

### Always
- Lead with an outcome. Decorate with proof. End with one clear next step.
- Use the canonical service names exactly as in `services.ts` — including capitalization (e.g., *WhatsApp Automation*, not *Whatsapp automation*).
- Use the stats from §1 verbatim — don't round, don't substitute, don't make up new ones without updating `services.ts` and the About section together.
- Honor the typographic and color tokens in `design.md`.
- Run through the `ui-ux-pro-max` pre-delivery checklist before shipping any visual change.

### Never
- Refer to the company as anything but **TechUpServices** (one word, capital T and S). Not *TechUp Services*, not *Tech Up Services*, not *TUS*.
- Use stock illustrations, generic Unsplash hero shots, AI-generated 3D blobs, or Spline template backgrounds.
- Add a third color family (e.g., gold, terracotta, acid green) to the global system. Per-service accents stay scoped to their service.
- Ship copy in passive voice or with em-dashed pitch-deck phrasing.
- Use the brand gradient as a full-section background.
- Place icons-only buttons without `aria-label`. (Per `ui-ux-pro-max` accessibility checklist.)

---

## 7. How to use this file

When working on this project, the mandatory order is:

1. **`design.md`** — locks the tokens, scales, and anti-defaults.
2. **`brand.md`** *(this file)* — locks who we are, what we sound like, and the signature element.
3. **`frontend-design` skill** — aesthetic POV, constrained by 1 and 2.
4. **`ui-ux-pro-max` skill** — UI/UX patterns + the pre-delivery checklist, constrained by 1–3.
5. **Synthesize and implement.**

If anything in this file ever conflicts with `design.md`, `design.md` wins on the *how*, this file wins on the *who*. If a skill suggests a direction that contradicts either file, the files win — note the conflict in your synthesis step.

---

## 8. Synthesis note (how this file was made)

- **`design.md`** set the token discipline, anti-default lists, and the rule that color must derive from the brand's actual world (so the existing cyan→blue→purple gradient is the brand, not a candidate to be replaced).
- **`frontend-design`** insisted the signature element be *one* memorable thing, that copy is design material, and that defaults (cream/serif/terracotta, navy + acid green, etc.) be actively rejected.
- **`ui-ux-pro-max`** contributed the pre-delivery checklist (accessibility, touch targets, cursor, contrast) and the structural reminder that proof points + a Trust & Authority posture matter for a B2B agency. Its literal palette recommendation (navy + gold) and font recommendation (Orbitron / Exo 2) were rejected because they contradict the brand already established in the codebase and the anti-default rules above — the skill's *framework* was used, not its specific suggestion.

The result: a brand identity that's grounded in what TechUpServices already is, expressed with deliberate restraint, and immune to being mistaken for a templated SaaS landing page.
