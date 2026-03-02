# CSS Architecture Documentation

## Overview
This project uses a **modular, scalable CSS architecture** following BEM methodology and CSS custom properties (variables) for maintainability.

## File Organization

### Core CSS Files (Import Order)

#### 1. **style.css** — Global Styles & Variables
**Responsibility:** Foundation layer
- CSS custom properties (colors, spacing, typography scales, shadows, transitions)
- Reset and normalize styles
- Base typography (h1-h6, p, lists)
- Accessibility styles (focus-visible, sr-only)
- Utility classes (.center, .transition, .kbd)

**When to edit:** 
- Add/modify global design tokens
- Update typography scales
- Change color scheme globally

---

#### 2. **layout.css** — Page Structure & Layout Systems
**Responsibility:** Structural layer
- `.container` and `.mid` width constraints
- Header, navigation, footer
- Section spacing and backgrounds
- Grid systems (.grid-2cols)
- Reveal animations

**When to edit:**
- Adjust container widths
- Modify header/footer styling
- Change section spacing or backgrounds
- Add layout-related components

---

#### 3. **components.css** — Reusable UI Components
**Responsibility:** Component layer
- Buttons (.btn-primary, .btn-wa, .nav-toggle)
- Cards (.card, .product-card)
- Modals and overlays
- Badges
- Form elements
- **Uses BEM naming:** `.element__child`, `.element--modifier`

**When to edit:**
- Create new reusable components
- Modify component styling
- Add component variants/modifiers

---

#### 4. **Page-Specific Files** (Import in HTML)
Each page imports ONLY its specific styles alongside core files.

##### **beranda.css** (Homepage)
- `.hero` and hero variants
- `.solution-grid`, `.solution-item` (advantages)
- `.steps-grid`, `.step` (process)
- `.produk-grid`, `.produk-card` (featured products)
- `.feature-grid`, `.feature-item`
- `.home-cta` (CTA section)
- `.hero-icons`, `.hero-icon`

##### **produk.css** (Product Page)
- `.section-title`
- `.search` (search input)
- `.kategori` (filter buttons)
- `.produk-grid` (product listing)

##### **tentang.css** (About Page)
- `.about-hero`
- `.about-grid`, `.about-text`, `.about-image`
- `.values-grid`, `.value-item`
- `.process-list`
- `.cta` (call-to-action)

##### **custom.css** (Custom/Order Page)
- `.custom-hero`
- `.solution` section
- `.solution-grid`, `.solution-item`
- `.steps` section
- `.steps-list`
- `.custom-cta`

---

## CSS Variables (Design Tokens)

All variables are defined in `:root` in **style.css**:

### Colors
```css
--primary: #4E342E
--primary-soft: #6B3F2B
--bg-soft: #F5F1E8
--bg-light: #FFFFFF
--text-dark: #333333
--text-soft: #555555
--text-light: #ffffff
--border: #e9e9e9
--whatsapp: #25D366
--whatsapp-dark: #1ebe5d
```

### Spacing Scale
```css
--spacing-xs: 0.25rem
--spacing-sm: 0.5rem
--spacing-md: 1rem
--spacing-lg: 2rem
--spacing-xl: 3rem
--spacing-2xl: 4rem
--spacing-3xl: 5rem
```

### Radius & Shadows
```css
--radius: 10px
--radius-sm: 6px
--radius-md: 8px
--radius-lg: 12px
--shadow-sm: 0 1px 3px rgba(0,0,0,0.06)
--shadow-md: 0 6px 18px rgba(0,0,0,0.08)
--shadow-lg: 0 10px 30px rgba(0,0,0,0.08)
--shadow-xl: 0 18px 60px rgba(0,0,0,0.12)
```

### Transitions
```css
--transition: 0.25s ease
--transition-fast: 0.15s ease
--transition-slow: 0.35s ease
```

### Breakpoints
```css
--bp-sm: 640px
--bp-md: 768px
--bp-lg: 1024px
--bp-xl: 1280px
```

---

## BEM Naming Convention

### Format: `.block__element--modifier`

#### Examples from Project:
```css
/* Simple component */
.btn-primary { }
.btn-primary:hover { }

/* Modal component with elements */
.modal { }
.modal.is-open { }
.modal__content { }
.modal__title { }
.modal__description { }
.modal__actions { }
.modal__close { }

/* Product card with state */
.product-card { }
.product-card:hover { }
.product-card img { }
.product-card .content { }
.product-card h3 { }
.product-card .harga { }
.product-card .kategori { }
```

---

## Dark Mode Support

All components support dark mode via:
```css
@media (prefers-color-scheme: dark) {
  :root { /* Updated variable values */ }
}

/* Or explicit JS toggle */
:root[data-theme="dark"] { /* Updated values */ }
```

Dark mode color variables are automatically adjusted in `:root`.

---

## Responsive Design (Mobile-First)

All layouts use mobile-first approach with breakpoints:

```css
/* Mobile (default) */
.element { }

/* Tablet and up */
@media (min-width: var(--bp-md)) {
  .element { }
}

/* Desktop and up */
@media (min-width: var(--bp-lg)) {
  .element { }
}

/* Large desktop and up */
@media (min-width: var(--bp-xl)) {
  .element { }
}
```

---

## Specificity Management

### Rules:
1. **No `!important`** (except in accessibility helpers like `.sr-only`)
2. **Prefer classes over IDs** for styling
3. **Avoid deeply nested selectors** (max 2-3 levels)
4. **Use cascade wisely** — modifiers override base styles

### Selector Examples:
```css
/* ✅ Good */
.button { }
.button:hover { }
.button.is-active { }

/* ❌ Avoid */
div.button.primary.large { }
.button { } !important
```

---

## Adding New Features

### 1. **New Global Component** (e.g., alert, tooltip)
→ Add to `components.css`

**Example:**
```css
.alert {
  padding: var(--spacing-md);
  border-radius: var(--radius);
  background: var(--bg-soft);
}

.alert--success {
  background: #d4edda;
  color: #155724;
}
```

### 2. **New Section Type** (used across pages)
→ Add to `layout.css`

**Example:**
```css
.section--cta {
  background: var(--primary);
  color: var(--text-light);
  padding: var(--spacing-3xl) 0;
}
```

### 3. **Page-Specific Style**
→ Add to page's CSS file (beranda.css, produk.css, etc.)

### 4. **New Design Token**
→ Add to `:root` in `style.css`

---

## Optimization Best Practices

✅ **Do:**
- Use CSS variables for repeated values
- Leverage grid-auto-fit/minmax for responsive grids
- Use clamp() for fluid typography
- Combine media queries for same breakpoint
- Use CSS shorthand properties

❌ **Don't:**
- Override component styles in page CSS
- Create utility classes for one-off styles
- Use `!important` unless absolutely necessary
- Hard-code pixel values (use variables)
- Create duplicate selectors across files

---

## File Size & Performance

Current architecture:
- **style.css** ~8KB — Global tokens & reset
- **layout.css** ~6KB — Structure & containers
- **components.css** ~5KB — Reusable components
- **Page-specific files** ~3-4KB each
- **Total** ~30-35KB (combined, before gzip ~50-60% reduction)

Gzip compression further reduces by ~50-60%.

---

## Maintenance Guidelines

1. **Always use variables** — Never hardcode colors, spacing, shadows
2. **Keep files focused** — Don't mix concerns (structure, components, pages)
3. **Use BEM for clarity** — Easy to identify scope and relationships
4. **Test responsiveness** — All breakpoints, mobile-first
5. **Update imports** — Add new page CSS to HTML files only
6. **Document patterns** — Comment complex or non-obvious rules

---

## Quick Reference: Which File?

| Question | File |
|----------|------|
| Adding a color option? | `style.css` (`:root`) |
| Creating a reusable button variant? | `components.css` |
| Adding header styling? | `layout.css` |
| Homepage-specific grid? | `beranda.css` |
| Product page filters? | `produk.css` |
| About page content? | `tentang.css` |
| Custom order page? | `custom.css` |

---

## Resources & Standards

- **BEM Methodology:** http://getbem.com/
- **CSS Variables:** https://developer.mozilla.org/en-US/docs/Web/CSS/--*
- **Mobile-First Design:** https://www.uxpin.com/studio/blog/mobile-first-design/
- **Color Contrast (a11y):** https://webaim.org/articles/contrast/
