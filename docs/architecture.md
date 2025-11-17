# Architecture Guide for LLM Coding Agents

**Purpose**: This document helps you make architectural decisions and locate/place code correctly in the Chain Offer Mock project.

**Tech Stack**: React 18.2 + TypeScript 5.4 + Vite 5.3 + Motion 12 (Framer Motion) + Redux Toolkit 1.9 + Vitest 1.6 + Playwright 1.56 + Sass 1.77

---

## Core Architectural Principles

### 1. Component-Based UI with Co-located Styles
**Mental Model**: Each UI component lives in `src/components/` or `src/ui/` with its CSS file next to it.

**Decision Rule**:
- Business components (ChainOffer, QuestLine) → `src/components/`
- App shells and harnesses → `src/ui/`
- Reusable UI primitives → `src/components/` or extract to separate directory

**Pattern**:
```
src/components/
├── ComponentName.tsx
├── ComponentName.css
└── ComponentSubModule/
    ├── SubComponent.tsx
    └── SubComponent.css
```

### 2. Centralized Animation System
**Mental Model**: All Framer Motion animation variants are defined centrally in `src/animations/revealAnimations.ts`, not scattered across components.

**Decision Rule**:
- Define animation variants → `src/animations/revealAnimations.ts`
- Apply animations in components → Import variants and use `motion.*` components
- Configure parameters → Use `AnimationParametersContext` from `src/contexts/`

**Why**: Single source of truth for all 12 animation types, makes them reusable and testable.

### 3. Redux Toolkit for Global State
**Mental Model**: Application state lives in Redux slices in `src/store/`. Components use typed hooks.

**Decision Rule**:
- Slice definitions → `src/store/{feature}Slice.ts`
- Store configuration → `src/store.ts`
- Component usage → `useSelector(state => state.{feature})` and `useDispatch()`

### 4. TypeScript-First with Strict Mode
**Mental Model**: Every file is `.ts` or `.tsx`. No `.js` files. Strict mode enabled.

**Decision Rule**: Always use explicit types, interfaces, and type exports. Avoid `any`.

**Pattern**:
```typescript
// Type definitions in src/types/
export interface MyComponentProps {
  title: string
  onAction: (id: string) => void
}

// Usage
const MyComponent: React.FC<MyComponentProps> = ({ title, onAction }) => {
  // ...
}
```

---

## Where to Put New Code

### Component Decision Tree

**"Where do I put this new component?"**

1. **Is it a complete business feature?** (e.g., QuestLineDialog, ChainOfferMapItem)
   - YES → `src/components/ComponentName.tsx` + `ComponentName.css`

2. **Does it have sub-components?** (e.g., QuestLineDialog has QuestCard, QuestHeader, etc.)
   - YES → `src/components/ComponentName/` directory with `index.ts`, sub-components, and styles

3. **Is it an app shell or demo harness?** (e.g., App.tsx, SimpleHarness.tsx)
   - YES → `src/ui/ComponentName.tsx`

4. **Is it a reusable parameter control?** (e.g., slider, checkbox)
   - YES → `src/components/ParameterControls/ControlName.tsx`

### State Management Decision Tree

**"Where do I put this state?"**

1. **Local UI state only** (e.g., modal open/closed, form input)
   - USE → `useState()` in component

2. **Shared across multiple components** (e.g., animation parameters)
   - USE → Context API in `src/contexts/ContextName.tsx`

3. **Application-wide feature state** (e.g., chain offers data)
   - USE → Redux slice in `src/store/featureSlice.ts`

### Animation Decision Tree

**"Where do I define/modify animations?"**

1. **Creating a new animation type**
   - ADD → New entry in `src/animations/revealAnimations.ts`
   - ADD → Default parameters in `src/types/animationParameters.ts`
   - EXPORT → New `AnimationType` in type union

2. **Modifying existing animation**
   - EDIT → Variants in `src/animations/revealAnimations.ts`
   - UPDATE → Default parameters if needed

3. **Applying animation to component**
   - IMPORT → `{ revealAnimations }` from `src/animations/revealAnimations`
   - USE → `motion.div` with `variants={revealAnimations[type].itemVariants}`

---

## Component Patterns

### Pattern 1: Functional Component with TypeScript

**Template**:
```typescript
import React from 'react'
import './ComponentName.css'

interface ComponentNameProps {
  title: string
  items: Item[]
  onAction?: (id: string) => void
}

export const ComponentName: React.FC<ComponentNameProps> = ({
  title,
  items,
  onAction
}) => {
  return (
    <div className="component-name">
      <h2>{title}</h2>
      {items.map(item => (
        <div key={item.id} onClick={() => onAction?.(item.id)}>
          {item.name}
        </div>
      ))}
    </div>
  )
}
```

**Key Points**:
- Always export as named export (not default)
- Props interface named `{ComponentName}Props`
- Use `React.FC<Props>` for type safety
- Co-locate CSS with same filename

### Pattern 2: Animated Component with Motion

**Template**:
```typescript
import React from 'react'
import { motion } from 'motion/react'
import { revealAnimations } from '../animations/revealAnimations'
import { useAnimationParameters } from '../hooks/useAnimationParameters'
import './AnimatedComponent.css'

interface AnimatedComponentProps {
  items: Item[]
  animationType: AnimationType
}

export const AnimatedComponent: React.FC<AnimatedComponentProps> = ({
  items,
  animationType
}) => {
  const animation = revealAnimations[animationType]
  const parameters = useAnimationParameters(animationType)

  return (
    <motion.div
      className="animated-component"
      variants={animation.containerVariants}
      initial="hidden"
      animate="visible"
    >
      {items.map(item => (
        <motion.div
          key={item.id}
          variants={animation.itemVariants}
        >
          {item.content}
        </motion.div>
      ))}
    </motion.div>
  )
}
```

**Key Points**:
- Import animations from centralized `revealAnimations.ts`
- Use `motion.*` components instead of plain HTML
- Apply `variants`, `initial`, and `animate` props
- Access animation parameters via context hook

### Pattern 3: Component with Sub-Modules

**Directory Structure**:
```
src/components/QuestLineDialog/
├── index.ts                    // Re-exports main component
├── QuestLineDialog.tsx         // Main component
├── QuestLineDialog.css         // Main styles
├── QuestCard.tsx               // Sub-component
├── QuestCard.css
├── QuestHeader.tsx
├── QuestHeader.css
├── BonusRewards.tsx
└── BonusRewards.css
```

**index.ts Template**:
```typescript
export { QuestLineDialog } from './QuestLineDialog'
export type { QuestLineDialogProps } from './QuestLineDialog'
```

**Key Points**:
- Main component matches directory name
- Each sub-component has its own CSS
- `index.ts` re-exports for clean imports: `import { QuestLineDialog } from 'components/QuestLineDialog'`

---

## State Management Patterns

### Pattern 1: Redux Slice

**Template** (`src/store/featureSlice.ts`):
```typescript
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface FeatureState {
  items: Item[]
  selectedId: string | null
}

const initialState: FeatureState = {
  items: [],
  selectedId: null,
}

const featureSlice = createSlice({
  name: 'feature',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Item[]>) {
      state.items = action.payload
    },
    selectItem(state, action: PayloadAction<string>) {
      state.selectedId = action.payload
    },
  },
})

export const { setItems, selectItem } = featureSlice.actions
export const featureReducer = featureSlice.reducer
```

**Register in `src/store.ts`**:
```typescript
import { configureStore } from '@reduxjs/toolkit'
import { featureReducer } from './store/featureSlice'

export const store = configureStore({
  reducer: {
    feature: featureReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
```

**Usage in Component**:
```typescript
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store'
import { selectItem } from '../store/featureSlice'

const MyComponent = () => {
  const items = useSelector((state: RootState) => state.feature.items)
  const dispatch = useDispatch()

  return (
    <div onClick={() => dispatch(selectItem('id-123'))}>
      {/* ... */}
    </div>
  )
}
```

### Pattern 2: Context API for Cross-Cutting Concerns

**Template** (`src/contexts/MyContext.tsx`):
```typescript
import React, { createContext, useContext, useState, ReactNode } from 'react'

interface MyContextValue {
  value: string
  setValue: (value: string) => void
}

const MyContext = createContext<MyContextValue | undefined>(undefined)

interface MyProviderProps {
  children: ReactNode
}

export const MyProvider: React.FC<MyProviderProps> = ({ children }) => {
  const [value, setValue] = useState<string>('')

  return (
    <MyContext.Provider value={{ value, setValue }}>
      {children}
    </MyContext.Provider>
  )
}

export const useMyContext = () => {
  const context = useContext(MyContext)
  if (!context) {
    throw new Error('useMyContext must be used within MyProvider')
  }
  return context
}
```

**Usage**:
```typescript
// In App.tsx
<MyProvider>
  <MyComponent />
</MyProvider>

// In MyComponent.tsx
const { value, setValue } = useMyContext()
```

---

## Styling Patterns

### Pattern 1: Co-located CSS Modules

**Convention**:
- Each component has a matching `.css` file
- Use BEM naming: `.component-name__element--modifier`
- Import in component: `import './ComponentName.css'`

**Template**:
```css
/* ComponentName.css */
.component-name {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.component-name__header {
  font-size: 1.5rem;
  font-weight: bold;
}

.component-name__item {
  padding: 0.5rem;
}

.component-name__item--active {
  background-color: var(--brandAccentPrimary);
}
```

### Pattern 2: SCSS with Global Variables

**Global Variables** (defined in `vite.config.ts`):
```scss
$base100: #ffffff;
$brandAccentPrimary: #4d61ff;
$brandAccentSecondary75: rgba(255,255,255,0.65);
```

**Usage in SCSS files**:
```scss
.my-component {
  background: $base100;
  border-color: $brandAccentPrimary;
}
```

---

## Path Aliases and Stubs

### Understanding the Stub System

**Problem**: This project was extracted from a larger codebase with `@patrianna/*` packages.

**Solution**: Vite aliases map external packages to local stubs in `src/stubs/`.

**Configured in `vite.config.ts`**:
```typescript
resolve: {
  alias: [
    { find: '@patrianna/core-components', replacement: path.resolve(__dirname, 'src/stubs/core-components.tsx') },
    { find: '@patrianna/shared-utils', replacement: path.resolve(__dirname, 'src/stubs/shared-utils.ts') },
    { find: 'classnames', replacement: path.resolve(__dirname, 'src/stubs/classnames.ts') },
    // ... more aliases
  ],
}
```

**Decision Rule**:
- External dependency missing? → Create stub in `src/stubs/`
- Stub already exists? → Use the aliased import as-is

**Example Stub** (`src/stubs/classnames.ts`):
```typescript
export default function classnames(...args: any[]): string {
  return args.filter(Boolean).join(' ')
}
```

---

## TypeScript Configuration

### Base URL and Module Resolution

**tsconfig.json**:
```json
{
  "compilerOptions": {
    "baseUrl": "./src",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "strict": true
  }
}
```

**What this means**:
- Imports can be resolved from `src/` root
- `import { MyComponent } from 'components/MyComponent'` works (no `../../../`)
- Strict mode enforces type safety

---

## Multiple App Entry Points

### Pattern: URL-Based App Mode Selection

**Configured in `src/main.tsx`**:
```typescript
const params = new URLSearchParams(window.location.search)
const useIsolatedComponents = params.has('isolated')
const useComparison = params.has('compare')
const useSimple = params.has('simple')

const AppComponent = useSimple ? SimpleHarness :
                     useComparison ? Comparison :
                     useIsolatedComponents ? AppSimpleIsolated :
                     App
```

**Available Modes**:
- `/` → Default App (full chain offer demo)
- `/?isolated` → AppSimpleIsolated (isolated components)
- `/?compare` → Comparison (side-by-side comparison)
- `/?simple` → SimpleHarness (minimal demo harness)

**Decision Rule**: Creating a new demo mode?
1. Create app component in `src/ui/NewMode.tsx`
2. Add URL parameter check in `src/main.tsx`
3. Add to ternary selection logic

---

## File Naming Conventions

### Component Files
- **Pattern**: PascalCase matching component name
- **Example**: `QuestLineDialog.tsx`, `ChainOfferMapItem.tsx`

### Style Files
- **Pattern**: Match component filename, but `.css` or `.scss`
- **Example**: `QuestLineDialog.css`, `AnimationParameterForm.css`

### Type Files
- **Pattern**: camelCase with descriptive name
- **Example**: `animationParameters.ts`, `questline.d.ts`

### Utility Files
- **Pattern**: camelCase with action-based name
- **Example**: `transformQuestLineData.ts`, `applyAnimationParameters.ts`

### Test Files
- **Pattern**: `*.test.ts` or `*.test.tsx` for Vitest
- **Example**: `app.test.tsx`, `simpleConfig.test.ts`

---

## Common Mistakes

### ❌ Don't: Scatter animation variants across components
```typescript
// Bad: Defining variants inline in component
const itemVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
}
```

### ✅ Do: Use centralized animation definitions
```typescript
// Good: Import from central location
import { revealAnimations } from '../animations/revealAnimations'
const animation = revealAnimations['stagger-inview']
```

---

### ❌ Don't: Use default exports
```typescript
// Bad
export default MyComponent
```

### ✅ Do: Use named exports
```typescript
// Good
export const MyComponent: React.FC<Props> = () => { ... }
```

---

### ❌ Don't: Put business logic in components
```typescript
// Bad: Data transformation in component
const transformed = rawData.map(item => ({
  id: item.id,
  name: item.title,
  // ... complex transformation
}))
```

### ✅ Do: Extract to utility functions
```typescript
// Good: Transformation in src/utils/
import { transformQuestLineData } from '../utils/transformQuestLineData'
const transformed = transformQuestLineData(rawData)
```

---

### ❌ Don't: Use global CSS
```css
/* Bad: Global styles affecting everything */
div {
  margin: 0;
}
```

### ✅ Do: Scope styles to component
```css
/* Good: BEM-scoped styles */
.quest-line-dialog div {
  margin: 0;
}
```

---

## Quick Decision Tree

### "Where do I put X?"

| What | Where |
|------|-------|
| New UI component | `src/components/ComponentName.tsx` |
| Component with sub-parts | `src/components/ComponentName/` directory |
| App shell / demo harness | `src/ui/AppName.tsx` |
| Animation variants | `src/animations/revealAnimations.ts` |
| Redux slice | `src/store/featureSlice.ts` |
| Context provider | `src/contexts/ContextName.tsx` |
| Type definitions | `src/types/typeName.ts` |
| Utility function | `src/utils/utilityName.ts` |
| Component styles | Next to component: `ComponentName.css` |
| Test file | `src/tests/feature.test.tsx` or `e2e/feature.spec.ts` |
| Stub for external package | `src/stubs/package-name.ts` |

### "How do I add animation to a component?"

1. Choose animation type from `AnimationType` union in `src/animations/revealAnimations.ts`
2. Import `revealAnimations` and `motion` from Motion
3. Replace HTML elements with `motion.*` equivalents
4. Apply `variants`, `initial`, and `animate` props
5. For configurable parameters, use `useAnimationParameters()` hook

**Full Checklist**:
- [ ] Import `{ motion }` from `'motion/react'`
- [ ] Import `{ revealAnimations }` from `'../animations/revealAnimations'`
- [ ] Choose `animationType: AnimationType`
- [ ] Get animation: `const animation = revealAnimations[animationType]`
- [ ] Use `<motion.div variants={animation.containerVariants} initial="hidden" animate="visible">`
- [ ] For children: `<motion.div variants={animation.itemVariants}>`
- [ ] Test animation by changing `animationType`

---

## Key Base Classes / Patterns to Follow

### React Components
- **Base Pattern**: `React.FC<PropsInterface>`
- **Always**: Named exports, explicit prop types, co-located styles

### Animation Components
- **Base Pattern**: Use `motion.*` from Framer Motion
- **Always**: Import variants from `revealAnimations.ts`

### Redux Slices
- **Base Pattern**: Use `createSlice` from Redux Toolkit
- **Always**: Export actions and reducer separately

### Contexts
- **Base Pattern**: Provide + custom hook pattern
- **Always**: Throw error if used outside provider

---

**Last Updated**: 2025-11-17 (based on codebase analysis)
