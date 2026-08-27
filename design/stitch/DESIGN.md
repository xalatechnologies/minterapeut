---
name: Serene Professionalism
colors:
  surface: '#f7fafc'
  surface-dim: '#d7dadd'
  surface-bright: '#f7fafc'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f1f4f6'
  surface-container: '#ebeef0'
  surface-container-high: '#e5e8eb'
  surface-container-highest: '#e0e3e5'
  on-surface: '#181c1e'
  on-surface-variant: '#404945'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eef1f3'
  outline: '#707975'
  outline-variant: '#c0c8c4'
  surface-tint: '#38675b'
  primary: '#37665a'
  on-primary: '#ffffff'
  primary-container: '#507f72'
  on-primary-container: '#ffffff'
  inverse-primary: '#9fd1c1'
  secondary: '#496366'
  on-secondary: '#ffffff'
  secondary-container: '#cbe8eb'
  on-secondary-container: '#4f696c'
  tertiary: '#506062'
  on-tertiary: '#ffffff'
  tertiary-container: '#68797b'
  on-tertiary-container: '#feffff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#bbeddd'
  primary-fixed-dim: '#9fd1c1'
  on-primary-fixed: '#002019'
  on-primary-fixed-variant: '#1f4f43'
  secondary-fixed: '#cbe8eb'
  secondary-fixed-dim: '#b0cccf'
  on-secondary-fixed: '#031f22'
  on-secondary-fixed-variant: '#314b4e'
  tertiary-fixed: '#d4e6e8'
  tertiary-fixed-dim: '#b8cacc'
  on-tertiary-fixed: '#0e1e20'
  on-tertiary-fixed-variant: '#394a4b'
  background: '#f7fafc'
  on-background: '#181c1e'
  surface-variant: '#e0e3e5'
  sage-deep: '#375C5F'
  warm-grey-bg: '#F5F5F4'
  accent-yellow: '#FFD640'
typography:
  display-lg:
    fontFamily: Source Serif 4
    fontSize: 48px
    fontWeight: '600'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Source Serif 4
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Source Serif 4
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
  headline-md:
    fontFamily: Source Serif 4
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  section-gap: 80px
  content-gap: 24px
  gutter: 20px
  margin-mobile: 16px
  margin-desktop: auto
  max-width: 1140px
---

## Brand & Style
The design system is centered on the concept of **Empathetic Clarity**. It is designed for individuals who may be experiencing vulnerability or distress, requiring a UI that is exceptionally stable, calm, and easy to navigate. 

The aesthetic follows a **Corporate / Modern** style infused with **Minimalist** warmth. By prioritizing generous whitespace and a soft, natural palette, the system moves away from a clinical, sterile environment toward a more welcoming, "living room" professional feel. It aims to evoke a sense of relief, safety, and immediate trust.

## Colors
The palette is derived from natural, muted tones that reduce cognitive load and eye strain. 

- **Primary (Sage Green):** Used for key branding and primary actions. It represents growth and tranquility.
- **Secondary & Tertiary (Muted Aquas):** Used for surface layering and decorative backgrounds to create a soft visual hierarchy without harsh lines.
- **Neutral (Deep Slate):** Replaces pure black for all typography to maintain a softer contrast that is easier on the eyes.
- **Accent Yellow:** Reserved strictly for very small high-visibility markers or subtle branding nods, reflecting the original logo's energy without overwhelming the calming effect.

## Typography
The typography strategy uses a "High-Contrast Pairing" to balance authority with accessibility.

**Headings (Source Serif 4):** A sophisticated serif that conveys expertise, history, and the literary nature of psychology. It feels personal and academic yet approachable.
**Body & UI (Inter):** A utilitarian sans-serif chosen for its exceptional legibility at all sizes. It ensures that critical information—such as contact details and service descriptions—is processed effortlessly.

All body text should maintain a minimum size of 16px to ensure accessibility for users in various states of focus.

## Layout & Spacing
The layout follows a **Fixed Grid** model on desktop to ensure a contained, organized feeling of "order," while transitioning to a fluid single-column layout on mobile.

- **Desktop:** 12-column grid with a maximum content width of 1140px. 
- **Rhythm:** An 8px baseline grid governs all internal component spacing. Section gaps are intentionally large (80px+) to allow the design to "breathe," reducing the feeling of information density.
- **Priority Areas:** Contact information and the "Book Appointment" CTA must always be separated from secondary links by at least 48px of whitespace to ensure they are easily found during moments of high stress.

## Elevation & Depth
Depth is conveyed through **Tonal Layers** rather than heavy shadows to maintain a clean, modern appearance.

- **Surface Levels:** The primary background uses `warm-grey-bg`. Secondary information containers use `tertiary-color-hex` (pale aqua) to define depth without lifting off the page.
- **Shadows:** Use extremely soft, low-opacity ambient shadows (e.g., `0 4px 20px rgba(74, 78, 80, 0.06)`) for cards and primary buttons.
- **Imagery:** Photography should be treated with subtle 1px soft borders in a slightly darker shade than the background to ground them in the layout.

## Shapes
The shape language is defined by **Rounded** corners. There are no sharp 90-degree angles in the UI, as soft corners are psychologically perceived as safer and more approachable.

- **Standard Elements:** 0.5rem (8px) radius for input fields and small cards.
- **Buttons:** 1rem (16px) or fully rounded "pill" shapes for primary CTAs to maximize their "clickability" and friendly appearance.

## Components

### Buttons
- **Primary:** Solid `primary-color-hex` with white text. High-contrast, large padding (16px 32px), pill-shaped.
- **Secondary:** Outlined with `primary-color-hex`, or solid `secondary-color-hex` with `sage-deep` text.

### Cards
- Used for service overviews. Features a `tertiary-color-hex` background, 16px padding, and 16px roundedness. No heavy borders; let the color difference define the edge.

### Input Fields
- Soft grey backgrounds with `0.5rem` roundedness. Focus states should use a 2px `secondary-color-hex` glow rather than a harsh black border.

### Navigation
- A simple, sticky top-bar. Links use `label-md` typography. The most important action (e.g., "Kontakt") should be styled as a secondary button within the nav.

### Imagery Containers
- Professional portraits and nature photography should use `rounded-xl` (1.5rem) corners to harmonize with the soft UI. Ensure nature imagery is used as "breathing room" between text-heavy sections.

### Contact Block
- A high-visibility component with a soft-tinted background. Use large icons and `body-lg` text for phone numbers and email addresses to ensure they are accessible.