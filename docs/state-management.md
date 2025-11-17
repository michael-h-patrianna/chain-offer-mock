# State Management Guide for LLM Coding Agents

**Purpose**: This document teaches you how to manage application state using Redux Toolkit and Context API in the Chain Offer Mock project.

**State Libraries**: Redux Toolkit 1.9.7 + React Context API

---

## State Management Architecture

### Two-Layer State Management

**Decision Rule**: Choose based on scope and purpose

| Use Case | Solution | Location |
|----------|----------|----------|
| Application-wide feature data | Redux Toolkit | `src/store/` |
| Cross-cutting configuration/settings | Context API | `src/contexts/` |
| Component-local UI state | useState | Inside component |

**Why Two Layers**:
- Redux: For complex state with actions, persistence, dev tools
- Context: For simple shared state like themes, settings, parameters
- useState: For truly local state (modal open, form input)

---

## Redux Toolkit Patterns

### Core Principle

**Redux Toolkit** uses "slices" - self-contained pieces of state with reducers and actions.

**Flow**:
```
1. Define slice → src/store/{feature}Slice.ts
2. Register in store → src/store.ts
3. Use in components → useSelector + useDispatch
```

---

## How to Create a Redux Slice

### Step 1: Define State Interface

**Template** (`src/store/featureSlice.ts`):
```typescript
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define the shape of your state
export interface FeatureItem {
  id: string
  name: string
  value: number
}

export interface FeatureState {
  items: FeatureItem[]
  selectedId: string | null
  loading: boolean
  error: string | null
}

// Define initial state
const initialState: FeatureState = {
  items: [],
  selectedId: null,
  loading: false,
  error: null,
}
```

**Key Points**:
- Export all interfaces (used by components)
- Use descriptive names: `{Feature}State`, `{Feature}Item`
- Include common fields: loading, error for async operations

### Step 2: Create Slice with Reducers

**Template**:
```typescript
const featureSlice = createSlice({
  name: 'feature',  // Used in Redux DevTools
  initialState,
  reducers: {
    // Simple setter
    setItems(state, action: PayloadAction<FeatureItem[]>) {
      state.items = action.payload
    },

    // Update single property
    setSelectedId(state, action: PayloadAction<string | null>) {
      state.selectedId = action.payload
    },

    // Loading state
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload
    },

    // Error handling
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload
    },

    // Complex update with logic
    updateItem(state, action: PayloadAction<{ id: string; updates: Partial<FeatureItem> }>) {
      const { id, updates } = action.payload
      const item = state.items.find(item => item.id === id)
      if (item) {
        Object.assign(item, updates)
      }
    },

    // Add item
    addItem(state, action: PayloadAction<FeatureItem>) {
      state.items.push(action.payload)
    },

    // Remove item
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter(item => item.id !== action.payload)
    },
  },
})

// Export actions
export const {
  setItems,
  setSelectedId,
  setLoading,
  setError,
  updateItem,
  addItem,
  removeItem,
} = featureSlice.actions

// Export reducer
export const featureReducer = featureSlice.reducer
```

**Key Points**:
- Use `PayloadAction<T>` for typed payloads
- Mutations look direct (`state.items = ...`) but are safe via Immer
- Export actions as named exports
- Export reducer with consistent naming: `{feature}Reducer`

### Step 3: Register in Store

**Location**: `src/store.ts`

**Template**:
```typescript
import { configureStore } from '@reduxjs/toolkit'
import { chainOffersReducer } from './store/chainOffersSlice'
import { featureReducer } from './store/featureSlice'  // ADD IMPORT

export const store = configureStore({
  reducer: {
    chainOffers: chainOffersReducer,
    feature: featureReducer,  // ADD REDUCER
  },
})

// Export types for TypeScript
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
```

**Key Points**:
- Key name (`feature`) becomes `state.feature` in selectors
- Always export `RootState` and `AppDispatch` types

### Step 4: Use in Components

**Template**:
```typescript
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store'
import {
  setSelectedId,
  updateItem,
  addItem,
} from '../store/featureSlice'

const MyComponent = () => {
  // Select state
  const items = useSelector((state: RootState) => state.feature.items)
  const selectedId = useSelector((state: RootState) => state.feature.selectedId)
  const loading = useSelector((state: RootState) => state.feature.loading)

  // Get dispatch function
  const dispatch = useDispatch()

  // Dispatch actions
  const handleSelect = (id: string) => {
    dispatch(setSelectedId(id))
  }

  const handleUpdate = (id: string, value: number) => {
    dispatch(updateItem({ id, updates: { value } }))
  }

  const handleAdd = () => {
    dispatch(addItem({
      id: crypto.randomUUID(),
      name: 'New Item',
      value: 0,
    }))
  }

  return (
    <div>
      {loading ? 'Loading...' : (
        items.map(item => (
          <div
            key={item.id}
            onClick={() => handleSelect(item.id)}
            className={selectedId === item.id ? 'selected' : ''}
          >
            {item.name}: {item.value}
          </div>
        ))
      )}
      <button onClick={handleAdd}>Add Item</button>
    </div>
  )
}
```

**Key Points**:
- Use typed `RootState` for selectors
- Call `dispatch()` with action creators
- Can select multiple pieces of state separately

---

## Real-World Example: chainOffersSlice

**Purpose**: Manages chain offer instances and claim logic

**Key Patterns**:

### State Shape
```typescript
export interface ChainOffersState {
  items: ChainOfferInstance[]  // Array of offer instances
  isBootstrapped: boolean       // Has data been loaded?
  loading: boolean              // Currently loading?
  error: string | null          // Error message if any
}
```

### Complex Reducer: claimOffer
```typescript
claimOffer: (state, action: PayloadAction<{
  instanceCode: string
  mapItemCode: string
}>) => {
  const { instanceCode, mapItemCode } = action.payload

  // Find the instance
  const instance = state.items.find(item => item.code === instanceCode)
  if (instance) {
    // Find the map item
    const mapItemIndex = instance.mapItems.findIndex(
      item => item.code === mapItemCode
    )

    if (mapItemIndex >= 0) {
      // Mark current item as claimed
      instance.mapItems[mapItemIndex].status = 'CLAIMED'

      // Unlock next item if it exists and is locked
      const nextItem = instance.mapItems[mapItemIndex + 1]
      if (nextItem && nextItem.status === 'LOCKED') {
        nextItem.status = 'UNLOCKED'
      }
    }
  }
}
```

**Key Points**:
- Nested state updates are safe with Immer
- Business logic (unlock next item) lives in reducer
- Payload is an object with multiple properties

---

## Context API Patterns

### When to Use Context

**Use Context for**:
- Theme/settings that rarely change
- Configuration values
- Cross-cutting concerns (analytics, feature flags)
- Animation parameters (see example)

**Don't Use Context for**:
- Frequently changing data (use Redux)
- Complex state with many actions (use Redux)
- Data that needs persistence/middleware (use Redux)

---

## How to Create a Context Provider

### Step 1: Define Context Value Interface

**Template** (`src/contexts/MyContext.tsx`):
```typescript
import { createContext, ReactNode, useCallback, useState } from 'react'

// Define what the context provides
interface MyContextValue {
  value: string
  count: number
  updateValue: (newValue: string) => void
  increment: () => void
  reset: () => void
}

// Create context with undefined default (forces provider check)
export const MyContext = createContext<MyContextValue | null>(null)
```

**Key Points**:
- Use `null` as default to enforce provider usage
- Include both data and updater functions

### Step 2: Create Provider Component

**Template**:
```typescript
interface MyProviderProps {
  children: ReactNode
}

export function MyProvider({ children }: MyProviderProps) {
  // Internal state
  const [value, setValue] = useState<string>('')
  const [count, setCount] = useState<number>(0)

  // Memoized callbacks (prevent re-renders)
  const updateValue = useCallback((newValue: string) => {
    setValue(newValue)
  }, [])

  const increment = useCallback(() => {
    setCount(prev => prev + 1)
  }, [])

  const reset = useCallback(() => {
    setValue('')
    setCount(0)
  }, [])

  // Build context value object
  const contextValue: MyContextValue = {
    value,
    count,
    updateValue,
    increment,
    reset,
  }

  return (
    <MyContext.Provider value={contextValue}>
      {children}
    </MyContext.Provider>
  )
}
```

**Key Points**:
- Use `useCallback` for functions to prevent unnecessary re-renders
- Provider holds the actual state
- Wrap children with `<Context.Provider>`

### Step 3: Create Custom Hook

**Template**:
```typescript
export function useMyContext() {
  const context = useContext(MyContext)

  if (!context) {
    throw new Error('useMyContext must be used within MyProvider')
  }

  return context
}
```

**Key Points**:
- Custom hook provides better error messages
- Enforces provider usage at runtime
- TypeScript knows context is not null

### Step 4: Usage

**In App/Root Component**:
```typescript
import { MyProvider } from './contexts/MyContext'

function App() {
  return (
    <MyProvider>
      <MyComponent />
    </MyProvider>
  )
}
```

**In Component**:
```typescript
import { useMyContext } from '../contexts/MyContext'

function MyComponent() {
  const { value, count, updateValue, increment } = useMyContext()

  return (
    <div>
      <p>Value: {value}</p>
      <p>Count: {count}</p>
      <button onClick={() => updateValue('new value')}>Update</button>
      <button onClick={increment}>Increment</button>
    </div>
  )
}
```

---

## Real-World Example: AnimationParametersContext

**Purpose**: Stores runtime-configurable animation parameters for each animation type

**Key Patterns**:

### Storing Multiple Configs in One Context
```typescript
const [parametersMap, setParametersMap] = useState<
  Record<AnimationType, AnimationParameters>
>(() => {
  // Initialize with deep copy of defaults
  return JSON.parse(JSON.stringify(defaultAnimationParameters))
})
```

**Key Point**: Uses `Record<AnimationType, AnimationParameters>` to store parameters for all 12 animation types

### Specific Update Methods
```typescript
// General parameter update
const updateParameter = useCallback(
  <K extends keyof AnimationParameters>(
    animationType: AnimationType,
    key: K,
    value: AnimationParameters[K]
  ) => {
    setParametersMap((prev) => ({
      ...prev,
      [animationType]: {
        ...prev[animationType],
        [key]: value,
      },
    }))
  },
  []
)

// Spring-specific update
const updateSpringParameter = useCallback(
  (animationType: AnimationType, key: 'stiffness' | 'damping' | 'mass', value: number) => {
    setParametersMap((prev) => ({
      ...prev,
      [animationType]: {
        ...prev[animationType],
        spring: {
          ...(prev[animationType].spring || { stiffness: 200, damping: 15, mass: 1.0 }),
          [key]: value,
        },
      },
    }))
  },
  []
)
```

**Key Point**: Provides specialized updaters for nested properties (spring, wobble, orbital)

### Reset Functionality
```typescript
const resetToDefaults = useCallback((animationType: AnimationType) => {
  setParametersMap((prev) => ({
    ...prev,
    [animationType]: JSON.parse(JSON.stringify(
      defaultAnimationParameters[animationType]
    )),
  }))
}, [])
```

**Key Point**: Deep clone to avoid reference issues

---

## Common Patterns

### Pattern 1: Derived State with Selectors

**Problem**: Need computed value from Redux state

**Template**:
```typescript
// In component
const activeItems = useSelector((state: RootState) =>
  state.feature.items.filter(item => item.status === 'ACTIVE')
)

const totalValue = useSelector((state: RootState) =>
  state.feature.items.reduce((sum, item) => sum + item.value, 0)
)
```

**Better**: Use memoization for expensive computations
```typescript
import { useMemo } from 'react'

const MyComponent = () => {
  const items = useSelector((state: RootState) => state.feature.items)

  const activeItems = useMemo(
    () => items.filter(item => item.status === 'ACTIVE'),
    [items]
  )

  const totalValue = useMemo(
    () => items.reduce((sum, item) => sum + item.value, 0),
    [items]
  )

  return <div>{totalValue}</div>
}
```

### Pattern 2: Combining Multiple Selectors

**Template**:
```typescript
const MyComponent = () => {
  // Select from different slices
  const offers = useSelector((state: RootState) => state.chainOffers.items)
  const selectedId = useSelector((state: RootState) => state.chainOffers.selectedId)

  // Compute derived value
  const selectedOffer = useMemo(
    () => offers.find(offer => offer.id === selectedId),
    [offers, selectedId]
  )

  return <div>{selectedOffer?.title}</div>
}
```

### Pattern 3: Async Action Pattern

**Problem**: Need to fetch data and update Redux

**Template**:
```typescript
const MyComponent = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    async function fetchData() {
      dispatch(setLoading(true))
      dispatch(setError(null))

      try {
        const response = await fetch('/api/items')
        const data = await response.json()
        dispatch(setItems(data))
      } catch (error) {
        dispatch(setError(error.message))
      } finally {
        dispatch(setLoading(false))
      }
    }

    fetchData()
  }, [dispatch])

  // ...
}
```

**Key Points**:
- Set loading before fetch
- Handle errors with setError
- Always clear loading in finally

### Pattern 4: Context with localStorage Persistence

**Template**:
```typescript
export function MyProvider({ children }: MyProviderProps) {
  // Initialize from localStorage
  const [value, setValue] = useState<string>(() => {
    const stored = localStorage.getItem('myValue')
    return stored || 'default'
  })

  // Persist to localStorage on change
  useEffect(() => {
    localStorage.setItem('myValue', value)
  }, [value])

  // ... rest of provider
}
```

---

## Common Mistakes

### ❌ Don't: Mutate state directly in Redux
```typescript
// Bad: Direct mutation (TypeScript won't catch this)
state.items[0].value = 10
```

### ✅ Do: Use Immer-safe mutations
```typescript
// Good: Looks like mutation, but Immer makes it immutable
const item = state.items[0]
if (item) {
  item.value = 10
}
```

---

### ❌ Don't: Use Context for frequently changing data
```typescript
// Bad: Re-renders all consumers on every change
<ThemeContext.Provider value={{ theme, setTheme, count, setCount }}>
```

### ✅ Do: Split into separate contexts or use Redux
```typescript
// Good: Separate contexts for different concerns
<ThemeContext.Provider value={{ theme, setTheme }}>
  <CountContext.Provider value={{ count, setCount }}>
    {children}
  </CountContext.Provider>
</ThemeContext.Provider>
```

---

### ❌ Don't: Forget to memoize context value
```typescript
// Bad: New object on every render = all consumers re-render
<MyContext.Provider value={{ data, update }}>
```

### ✅ Do: Memoize the context value
```typescript
// Good: Only updates when dependencies change
const contextValue = useMemo(() => ({ data, update }), [data, update])
<MyContext.Provider value={contextValue}>
```

---

### ❌ Don't: Use context without error handling
```typescript
// Bad: Could be null
const context = useContext(MyContext)
return <div>{context.value}</div>
```

### ✅ Do: Create custom hook with error check
```typescript
// Good: Throws helpful error
export function useMyContext() {
  const context = useContext(MyContext)
  if (!context) {
    throw new Error('useMyContext must be used within MyProvider')
  }
  return context
}
```

---

## Quick Decision Tree

### "Where should this state live?"

**1. Is it UI-only state?** (modal open, form input)
- YES → `useState()` in component

**2. Shared by 2-3 nearby components?**
- YES → `useState()` in common parent, pass as props

**3. Shared by many distant components?**
- Is it configuration/settings that rarely changes?
  - YES → Context API in `src/contexts/`
- Is it feature data with complex actions?
  - YES → Redux slice in `src/store/`

**4. Needs persistence or middleware?**
- YES → Redux (easier to integrate middleware)

**5. Performance-critical frequent updates?**
- YES → Redux (better optimization with selectors)

---

## Quick Reference

### Redux Toolkit Checklist

- [ ] Create slice in `src/store/{feature}Slice.ts`
- [ ] Export state interface
- [ ] Define initialState
- [ ] Create slice with reducers
- [ ] Export actions (named exports)
- [ ] Export reducer (named export: `{feature}Reducer`)
- [ ] Register in `src/store.ts`
- [ ] Use with `useSelector` and `useDispatch` in components

### Context API Checklist

- [ ] Create context file in `src/contexts/{Name}Context.tsx`
- [ ] Define context value interface
- [ ] Create context with `createContext<Value | null>(null)`
- [ ] Create provider component with internal state
- [ ] Memoize callbacks with `useCallback`
- [ ] Create custom hook with error check
- [ ] Wrap app/subtree with provider
- [ ] Use custom hook in components

---

**Last Updated**: 2025-11-17 (based on codebase analysis)
