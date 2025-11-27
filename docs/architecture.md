# Architecture Guide for LLM Coding Agents

**Purpose**: This document helps you make architectural decisions and locate/place code correctly in the Chain Offer Mock project.

**Tech Stack**: React 19 (Vite) + TypeScript + SCSS + Motion (Framer) + Rive + Vitest + Playwright

---

## Core Architectural Principles

### 1. Feature-Based Component Structure
**Mental Model**: Group components by the "feature" or "dialog" they belong to, rather than generic technical types.
**Decision Rule**: If a component is specific to the "Chain Offer" feature, it goes in `src/components/ChainOfferDialog/`. Shared UI elements go in `src/components/Shared/`.

### 2. Where to Put New Code
```
src/
├── components/
│   ├── FeatureName/       # Specific feature logic (e.g., ChainOfferDialog)
│   ├── Shared/            # Reusable UI atoms (Buttons, CloseButton, Backdrops)
│   └── Demo/              # Demo-specific controls (Sidebar, Settings)
├── animations/            # Centralized Motion variants (see animations.md)
├── contexts/              # React Contexts (Global state)
├── data/                  # Mock JSON data and getter functions
├── types/                 # TypeScript type definitions
└── styles/                # SCSS styles (global and partials)
```

**When creating new functionality**:
1. **New Dialog/Feature**: Create `src/components/NewFeatureName/`.
2. **Shared UI Atom**: Check `src/components/Shared/` first. If generic, add there.
3. **Animation**: Define variants in `src/animations/revealAnimations.ts`, then use in components.
4. **Data**: Add JSON to `src/data/` and a getter in a `.ts` file in `src/data/`.

### 3. Component Patterns

#### Dialog Component Pattern
**Pattern**: Feature dialogs are self-contained, accepting `isOpen`, `onClose`, and data props. They use `DialogBackdrop` for modal behavior.

**Template**:
```tsx
import { DialogBackdrop } from '../Shared/DialogBackdrop'
import { CloseButton } from '../Shared/CloseButton'
// ... imports

export const MyFeatureDialog = ({ isOpen, onClose, data }: MyProps) => {
  if (!isOpen) return null

  return (
    <DialogBackdrop isOpen={isOpen} onClose={onClose}>
      <dialog open className="my-feature-dialog">
        <CloseButton onClick={onClose} />
        {/* Content */}
      </dialog>
    </DialogBackdrop>
  )
}
```

#### Animation Pattern
**Pattern**: Use `m` from `motion/react` (optimized import). Do NOT import `motion` from `framer-motion` directly to save bundle size.

**Template**:
```tsx
import { m, LazyMotion, domAnimation } from 'motion/react'

// Wrap root in LazyMotion
<LazyMotion features={domAnimation}>
  <m.div initial="hidden" animate="visible" variants={myVariants}>
    Content
  </m.div>
</LazyMotion>
```

### 4. Styling Architecture
**SCSS Modules**: Not strictly used yet, but styles are organized in `src/styles/`.
- **Global**: `src/styles/main.scss` imports all partials.
- **Component Styles**: Create `_component-name.scss` in `src/styles/components/` and `@use` it in `main.scss`.
- **Variables**: Use `src/styles/variables/_variables.scss`.

## Quick Decision Tree

**"Where do I put X?"**
1. **A new popup type?** → `src/components/{PopupName}/`
2. **A button used everywhere?** → `src/components/Shared/`
3. **Mock data?** → `src/data/` (JSON file)
4. **TypeScript interface?** → `src/types/`
5. **Animation configuration?** → `src/animations/revealAnimations.ts`

## Common Mistakes

❌ **Don't**: Import `motion` from `framer-motion`.
✅ **Do**: Import `{ m }` from `motion/react` and use `<LazyMotion>`.

❌ **Don't**: Hardcode large data objects in components.
✅ **Do**: Put data in `src/data/*.json` and import it.

❌ **Don't**: Create "god components" (e.g., one huge `App.tsx`).
✅ **Do**: Break UI into feature folders in `src/components/`.
