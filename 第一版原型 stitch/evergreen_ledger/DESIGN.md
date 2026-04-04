# Design System Specification: The Mindful Path

## 1. Overview & Creative North Star

**Creative North Star: The Digital Sanctuary**
This design system moves away from the aggressive, notification-heavy aesthetic of traditional productivity apps. Instead, it adopts the persona of a "Digital Sanctuary"—a high-end, editorial experience that treats user goals with the same reverence as a curated gallery. 

The system rejects the "standard" app grid in favor of **Intentional Asymmetry** and **Tonal Depth**. By utilizing wide margins, generous whitespace, and a sophisticated forest-green palette, we create a sense of calm authority. This is not just a tool; it is a premium environment designed to reduce cognitive load and foster deep focus.

---

## 2. Color Philosophy & The "No-Line" Rule

The palette is anchored by a deep, intellectual green, supported by "soft whites" that prevent eye strain.

### Surface Hierarchy & Nesting
We achieve structure not through borders, but through **Tonal Layering**.
- **Surface (Background):** `#f8faf9`. The canvas.
- **Surface-Container-Low:** Used for large sections or secondary groupings.
- **Surface-Container-Lowest:** Used for the "primary" interactive cards (e.g., `#ffffff`). This creates a soft, natural lift against the slightly darker background.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders for sectioning or card definition. Boundaries must be defined solely through:
1.  **Background Shifts:** A `surface-container-low` section sitting on a `surface` background.
2.  **Negative Space:** Using the Spacing Scale to create clear grouping.

### The "Glass & Gradient" Rule
To add visual "soul," use subtle gradients (e.g., `primary` to `primary_container`) for main Action Cards. For floating elements or top navigation bars, utilize **Glassmorphism**:
- **Background:** Semi-transparent `surface` color (80% opacity).
- **Effect:** `backdrop-blur: 20px`.
- **Border:** A "Ghost Border" (see Section 4).

---

## 3. Typography: Editorial Authority

The system pairs the architectural strength of **Manrope** for displays with the hyper-legibility of **Inter** for functional text.

*   **Display & Headlines (Manrope):** Large, bold, and authoritative. Use `display-lg` (3.5rem) for milestone achievements to create a sense of grandeur.
*   **Titles & Body (Inter):** Clean and neutral. We use `title-md` (1.125rem) for list headers to ensure clarity without competing with the headlines.
*   **Hierarchy Tip:** Always maintain a minimum 2:1 scale ratio between headline and body text to preserve the editorial feel.

---

## 4. Elevation & Depth: Tonal Layering

Traditional drop shadows are often messy. This system uses **Ambient Shadows** and **Ghost Borders**.

*   **Ambient Shadows:** When a card must float, use an extra-diffused shadow: `box-shadow: 0 12px 32px rgba(45, 90, 71, 0.05)`. Notice the tint—the shadow uses a transparent version of our `primary` color, not black, to mimic natural light filtered through a canopy.
*   **The Ghost Border:** If a border is required for accessibility, it must be the `outline_variant` token at **15% opacity**. It should feel like a suggestion, not a fence.
*   **Corner Radius:** Use a consistent `xl` (1.5rem / 24px) for main containers and `lg` (1rem / 16px) for inner cards to create a "nested" organic feel.

---

## 5. Components

### Cards & Lists
*   **Rule:** Forbid the use of divider lines between list items. 
*   **Implementation:** Separate items using 8px of vertical white space or by placing each item in its own `surface-container-lowest` card with a 12px-16px radius.
*   **Chevrons:** Use ultra-thin (1.5pt) chevrons in `on_surface_variant` to indicate navigation.

### Primary Buttons
*   **Style:** Large, pill-shaped (`full` roundedness).
*   **Color:** Utilize a `primary` to `primary_container` vertical gradient.
*   **Typography:** `label-md` uppercase with 0.05em letter spacing for a "button-as-label" high-end feel.

### Progress Bars
*   **Style:** Minimalist. The track uses `secondary_container`, while the indicator uses a phase-specific accent (Yellow/Green/Blue).
*   **Height:** 6px (thin) for an elegant, non-intrusive look.

### Voice Input Indicator
*   **Style:** Instead of a standard "Mic" icon, use a pulsing circular ring in `tertiary_fixed_dim`. 
*   **Effect:** Add a soft `backdrop-blur` to the ring to make it feel ethereal and integrated.

### Phase Accents (Tertiary)
*   **Yellow/Blue/Green:** These are used exclusively for status (e.g., "In Progress," "Paused," "Complete"). Use them as small selection chips or progress bar fills, never as primary backgrounds.

---

## 6. Do's and Don'ts

### Do
*   **Do** use asymmetrical layouts (e.g., a left-aligned headline with a right-aligned progress chip).
*   **Do** treat white space as a first-class citizen. If a screen feels crowded, remove a container, don't shrink the text.
*   **Do** use `surface_container_highest` for "active" states in navigation.

### Don't
*   **Don't** use 100% black (#000000) for text. Always use `on_surface` (#191c1c).
*   **Don't** use "Card Shadows" on every element. If three cards are related, group them on a single `surface-container-low` background instead.
*   **Don't** use standard blue for links. Use the `primary` forest green with an underline.
*   **Don't** use sharp 90-degree corners. Everything must feel softened and approachable.