# $10k Website — Design Source of Truth

> **Use this file as the central design reference.** When building any website, include this file in the project folder and instruct Claude (or any AI/designer) to use it as the canonical guide. The goal is to produce websites that are visibly nowhere near the typical AI-generated, template-feeling output.

Every point below has two parts:
- **✅ What it takes to create a $10k website** — the standard to hit
- **🚫 Avoid (AI defaults)** — the clichés to actively reject

---

## 1. Typography

### ✅ What it takes to create a $10k website
- **Type token system** — `font.size.display`, `font.size.h1` … `font.size.caption`, all on a modular scale (1.25 or 1.333).
- **Fluid typography** via `clamp()` so sizes interpolate smoothly between mobile (16px+ body minimum) and desktop.
- **Line-height tokens** per size (tight for display, generous for body — 1.5–1.7).
- **Two-font pairing** from a real foundry — Pangram Pangram, Klim, Grilli Type, ABC Dinamo, OH no Type, Dinamo.
- **Distinctive display face** matching brand personality — editorial serif (PP Editorial, GT Sectra, Tiempos), wide grotesque (PP Neue Montreal, ABC Diatype, Söhne), modified custom for highest tier.
- **Variable fonts** with custom axes for weight, width, slant.
- **Considered hierarchy** — not "h1 big, h2 medium" but real relationships between sizes, weights, tracking.
- **Motion**: text reveals character-by-character or line-by-line on scroll with staggered easing (40–80ms offsets). Letter-spacing animates subtly on hover for links.

### 🚫 Avoid (AI defaults)
- Inter, Geist, Satoshi, Plus Jakarta Sans, DM Sans, Manrope as the default
- Picking a "safe modern sans" because it's neutral
- Using only one font for the entire site
- Default Tailwind type scale (`text-sm/base/lg/xl`) with no customization
- 14px body text
- Same font sizes on mobile and desktop
- Centered headline with faded gradient subhead beneath

---

## 2. Spacing & Rhythm

### ✅ What it takes to create a $10k website
- **8pt spacing token scale** (`space.1` = 4px … `space.16` = 96px) used everywhere — no raw pixels in any component.
- Spacing **derived from the type's line-height**, not arbitrary numbers.
- **Mobile uses smaller scale steps** (section padding `space.10` mobile vs `space.24` desktop).
- Different sections **breathe differently** — quiet editorial gets `space.32`, dense data gets `space.6`.
- **Custom grid systems** — 12-col is a choice, not a default; sometimes 7-col, baseline, or swiss-style modular.
- **Asymmetric layouts** with intentional negative space — magazine-like composition.
- **Motion**: sections reveal with staggered children, offset on the same spacing rhythm.

### 🚫 Avoid (AI defaults)
- `py-20` and `gap-8` on every section
- `max-w-7xl mx-auto` as the universal container
- Identical vertical padding on every block
- Default Tailwind spacing scale with no customization
- Symmetrical, perfectly-centered "boxed" feel
- Treating spacing as an afterthought rather than a design decision

---

## 3. Color

### ✅ What it takes to create a $10k website
- **Three-tier color tokens**:
  - Primitives: `color.blue.500`
  - Semantic: `color.brand.primary`, `color.text.body`, `color.surface.elevated`
  - Component: `button.primary.bg`
- Colors **derived from the brand's actual world** — product warmth, location light, material texture, reference image mood.
- **Off-hues** instead of pure ones — oxblood not red, Prussian not blue, bone not white.
- **Unexpected pairings** — sage + terracotta, navy + butter, charcoal + dusty pink.
- **Custom shade ramps** with hue shifts per step (warmer highlights, cooler shadows).
- **Brand-tinted neutrals** — even the grays carry the primary hue so the whole site feels one piece.
- Off-black `#111` or `#1a1a1a` instead of pure `#000`.
- **WCAG AA contrast** enforced via tokens.
- **Dark mode** flips one token layer.
- **Motion**: color spreads from cursor click-point; gradient backgrounds slowly shift hue over 20-second loops (ambient motion).

### 🚫 Avoid (AI defaults)
- Indigo `#6366F1`, violet `#8B5CF6`, slate `#0F172A`
- The "AI gradient" — purple → pink → orange, or blue → purple mesh blob behind the hero
- Default Tailwind palette (`slate-900`, `gray-400`, `indigo-500`)
- Pure `#000` on `#FFF`
- That exact Vercel `#0A0A0A` background with `#FAFAFA` text
- Glassmorphism navbar with `backdrop-blur` and `bg-white/10`
- Picking colors from "what looks modern" instead of from the brand

---

## 4. Imagery

### ✅ What it takes to create a $10k website
- **Cohesive visual language** — art-directed photography or curated illustration with consistent lighting, grading, and crop across the site.
- **Mobile gets a different crop** — wide landscape becomes tight portrait via `<picture>` and `srcset`.
- **AVIF/WebP** with proper `sizes` attribute.
- Images chosen from the **brand's references** (mood board, physical product, real environment) — not stock libraries.
- Real grain, real shadows, real materiality.
- **Motion**: images parallax on scroll, tilt 3D following cursor, swap to a second angle on hover, reveal-as-a-mask from a click point. Static images become silent muted video clips on hover.

### 🚫 Avoid (AI defaults)
- Generic Unsplash hero ("diverse team laughing at laptop," "abstract mesh gradient," "city skyline at dusk")
- AI-generated illustrations with that telltale Midjourney sheen
- The same 8 stock photos that appear on every SaaS site
- 3D blob renders that look like Spline templates
- Isometric vector illustrations with bright purple/teal palette
- No art direction — just "fill with image"

---

## 5. Iconography

### ✅ What it takes to create a $10k website
- **One curated icon family** (or custom set) with tokenized stroke width, corner radius, and grid.
- Icons reference `icon.size.sm/md/lg` tokens.
- Touch targets enforce **44×44px minimum** on mobile.
- Style matches brand personality — chunky/geometric for playful, hairline/precise for technical, hand-drawn for craft.
- **Motion**: icons animate on state change — hamburger morphs to X via SVG path interpolation, hearts pulse on like, chevrons rotate on accordion open. Lottie for complex iconography.

### 🚫 Avoid (AI defaults)
- Lucide icons, 24px, stroke-width 2, gray-500 — exactly as imported
- Heroicons in their default outlined style
- Phosphor icons with no customization
- Mixing icon libraries (Lucide here, Material there)
- Using icons as decoration without semantic purpose
- Three icon-with-heading-and-text columns as the "features section"

---

## 6. Layout

### ✅ What it takes to create a $10k website
- **Mobile-first composition** — designed for 375px first, progressively enhanced.
- Layouts **reshape** at breakpoints (container queries), not just stack.
- **Asymmetric, intentional** layouts with deliberate negative space tokenized via `space.section-y`.
- **Bottom-zone primary CTAs** on mobile (thumb reach).
- The **first thing you see** might be a single word, full-bleed image, number, quote, video — whatever serves *this brand's* first impression.
- Section order follows **narrative**, not template.
- **Motion**: section transitions feel choreographed — sticky reveals where a pinned image stays while text changes, horizontal scroll inside vertical scroll, scroll-scrubbed canvas animations on key sections.

### 🚫 Avoid (AI defaults)
- The canonical AI section order — Hero → logo strip → 3-column features → testimonials → pricing → final CTA
- Centered hero with `text-6xl` headline, faded subhead, gradient button, "Get Started →" link
- The "trusted by" logo grayscale strip
- Three feature cards with `rounded-2xl`, icon-on-top, heading, paragraph
- Testimonial cards in a 3-grid
- Pricing 3-tier with the middle one "Most Popular"
- Final "Ready to get started?" CTA section

---

## 7. Motion & Micro-interactions

### ✅ What it takes to create a $10k website
- **Motion tokens** — `motion.duration.fast/base/slow`, `motion.ease.standard/emphasized/spring`.
- Every easing is **purposeful** — entrances ease-out, exits ease-in, movements ease-in-out, playful uses spring overshoot.
- **Staggered reveals** (40–80ms offsets).
- Motion personality **matches brand personality** — luxury uses slow weighty easing, playful uses spring-overshoot, technical uses crisp fast snaps.
- **Custom cursor on desktop**: magnetic pull toward CTAs, label-on-hover for cards, blend-mode dot that inverts content beneath.
- **Scroll-driven animations** via GSAP/Framer Motion/Lenis.
- **Page transitions** via View Transitions API.
- **Reduced on mobile, killed when `prefers-reduced-motion` is on.**
- Duration discipline: micro 100–200ms, small 200–300ms, medium 300–500ms, large 500–800ms.

### 🚫 Avoid (AI defaults)
- `transition: all 0.3s ease` as the universal animation
- Default `whileHover={{ scale: 1.05 }}` Framer Motion bounce on every card
- Fade-in-on-scroll using `framer-motion` defaults with no easing customization
- Auto-playing carousels nobody asked for
- No custom cursor work at all
- Same animation everywhere because one preset was applied to everything
- Animations that ignore `prefers-reduced-motion`

---

## 8. Buttons & Forms

### ✅ What it takes to create a $10k website
- Button tokens for **every state** (default/hover/active/focus/disabled/loading), all sized to **44×44px minimum** on touch.
- **Mobile-correct inputs**: `inputmode="numeric"`, `type="email"`, `autocomplete="cc-number"`, `one-time-code` for OTP autofill.
- **Floating labels**, inline validation, native date pickers.
- **Motion**: buttons scale-down on press (spring back), ripple from click-point, morph to loader, then morph to a drawn checkmark on success. Forms shake gently on error rather than just flashing red.
- Button shape and weight reflect brand — luxury uses thin hairline outline, craft uses chunky pill, etc.
- **Designed focus rings** — 2px brand-colored outline with offset, not browser default and not removed.

### 🚫 Avoid (AI defaults)
- `rounded-lg` gradient-background buttons with white text and a `→` arrow
- "Get Started Free" or "Start Building" as the universal CTA copy
- Buttons that are all the same size and shape across the site
- No focus rings (or `outline: none` with nothing to replace it)
- Forms with desktop layouts crammed onto mobile (two fields side-by-side)
- Generic placeholder text instead of proper labels
- No autocomplete attributes
- The same gradient on the CTA that's used on the hero background

---

## 9. Detail Density

### ✅ What it takes to create a $10k website
- **Tertiary detail tokens** — multi-layer shadow scales (`shadow.sm/md/lg/xl`), noise textures, hairline borders, gradient borders, blur-depth tokens.
- Details **derived from brand world** — paper grain for editorial, metal sheen for industrial, soft fabric for fashion.
- **Ambient motion** keeps detail alive — subtle gradient mesh shifts, drifting background shapes on 6-second loops, breathing logos.
- The page feels **inhabited**, not screenshot-able.
- Users notice new things on the 3rd visit.

### 🚫 Avoid (AI defaults)
- Glassmorphism everywhere — `backdrop-blur-xl bg-white/10 border border-white/20`
- The same drop-shadow preset (`shadow-lg`) on every card
- The "AI grain texture" SVG that's the same noise pattern on every site
- Spline-rendered 3D blobs floating behind text
- Aurora gradients in dark mode
- Beam-of-light effects under the navbar
- Generic "modern" details with no connection to the brand's actual material world

---

## 10. Responsive Behavior

### ✅ What it takes to create a $10k website
- **Fluid via tokens** — `clamp()`-driven sizes reference type tokens with min/preferred/max.
- **Container queries**, not just viewport breakpoints.
- Layouts **reshape**, not stack.
- Touch targets **≥44px**.
- **Mobile-specific interactions**: swipe carousels, pull-to-refresh, bottom sheets instead of centered modals, swipe-to-dismiss.
- **Cursor interactions gracefully replaced** with tap/long-press equivalents on touch.
- **Safe-area insets** honored on notched devices (`env(safe-area-inset-bottom)`).
- Mobile copy is **rewritten shorter**, not just reflowed.

### 🚫 Avoid (AI defaults)
- Designed on desktop, then "made responsive" with `md:` and `lg:` Tailwind prefixes as an afterthought
- Hamburger menu hiding everything important
- Hero text shrinking to 24px on mobile because no `clamp()`
- Modals centered on mobile (should be bottom sheets)
- Same long-form copy on mobile and desktop
- Carousel arrows tiny and unreachable on phone
- No safe-area-inset handling — content hidden behind notch or home indicator

---

## 11. Empty / Loading / Error States

### ✅ What it takes to create a $10k website
- **Skeleton loaders** that match real content shape (with subtle shimmer animation tokenized via `motion.duration.slow`).
- **Empty states** with custom illustration + clear CTA.
- **Error states** that explain what happened and how to fix it.
- **Mobile-optimized** — skeleton bones sized to mobile layout.
- **Motion**: state transitions animated — skeleton fades into real content rather than popping, errors slide in from the top as a toast with progress-bar auto-dismiss.
- Empty-state illustrations are **on-brand**, not generic.

### 🚫 Avoid (AI defaults)
- A centered spinning circle as the universal loader
- "No data found" as the empty state
- Toast notifications using `react-hot-toast` defaults with no styling
- Generic "Something went wrong" errors
- The same shadcn skeleton component, gray, no shimmer, everywhere
- No loading state at all — just a layout shift when data arrives

---

## 12. Hierarchy

### ✅ What it takes to create a $10k website
- Clear **primary → secondary → tertiary path**.
- Reinforced via **token-driven contrast** (`color.text.primary` vs `color.text.muted`), size tokens, and spacing tokens.
- **Mobile rewrites the hierarchy**: copy is shorter, only the primary CTA is visible above the fold, secondary actions live in bottom sheets.
- **Motion guides the eye**: primary CTA has subtle ambient pulse or magnetic cursor; less important elements stay static.
- Hierarchy follows the brand's **narrative priority**, not a template's idea of "what goes first."

### 🚫 Avoid (AI defaults)
- Three "most important" CTAs in the hero (Sign Up, Watch Demo, Read Docs — all equal weight)
- Every section heading the same size as every other
- Bold text used everywhere until nothing is bold
- Five badges/pills in the hero ("New", "Beta", "AI-Powered", "Free", "Open Source") competing for attention
- Treating every feature as equally important in the features grid

---

## 13. Brand Consistency

### ✅ What it takes to create a $10k website
- **Component library backed by the token system** — every button, card, input is one reusable component referencing semantic tokens.
- **Figma variables ↔ CSS custom properties ↔ Tailwind config** — same token names across design and code.
- Rebrand the entire site by **changing one variable**.
- **Motion is tokenized** — every hover, transition, and reveal uses the same easing/duration tokens, so the *feel* is consistent.
- Brand assets (logos, photography, voice) treated with care — proper clear space, optical sizing, exact color values.

### 🚫 Avoid (AI defaults)
- Each page generated independently, so spacing/colors/components drift between routes
- Logo placed without consideration for clear space or optical balance
- Brand color approximated to the nearest `indigo-500` instead of using the exact hex
- Multiple button styles across the site because each page got its own variant
- shadcn components dropped in as-is, identical to every other shadcn site

---

## 14. Personality

### ✅ What it takes to create a $10k website
- A **distinct visual voice** — playful, austere, editorial, technical, luxurious — reinforced consistently because the token system enforces it.
- **Motion language is part of personality**: luxury uses slow weighty easing; playful uses spring-overshoot; technical uses crisp fast snaps.
- **The cursor itself becomes branding** — a custom shape, unique trail, signature interaction.
- Designed **from brand references** (mood board, physical product, films, magazines, exhibitions) — not from "modern SaaS landing page" inspiration.
- Remove the logo and you'd still recognize it's yours, on desktop *and* mobile.

### 🚫 Avoid (AI defaults)
- Looks like every other YC startup landing page
- Could be swapped with a competitor by changing the logo and nobody would notice
- Copy that says "Build faster. Ship smarter. The all-in-one platform for [audience]."
- That exact Vercel/Linear/Stripe aesthetic dressed in different colors
- No mood board, no references, no brand discovery — just "make it look modern"
- A personality the AI thinks is "professional" — which means none at all
