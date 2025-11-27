# Data Models & State Guide for LLM Coding Agents

**Purpose**: Since there is no database, this document defines the **Data Models** (TypeScript types) and **State Management** (React State/Context) patterns that replace the database layer.

---

## Core Principles

### 1. TypeScript as Schema
**Rule**: TypeScript interfaces in `src/types/` act as the "Database Schema". They define the shape of valid data.
**Why**: Ensures strict typing for mock data and component props.

### 2. React State as Session DB
**Rule**: Mutable data (like "current user progress" or "dialog open/close") lives in React State (`useState`) or Context (`Context API`). It resets on refresh.

---

## Defining a New Model

### Step 1: Create Type Definition
**Location**: `src/types/{feature}.d.ts`
**Template**:
```typescript
export interface Quest {
  id: string;
  title: string;
  status: 'locked' | 'active' | 'completed';
  reward: number;
}
```

### Step 2: Define Relationships (Nested Types)
**Pattern**: Use nested objects for "HasOne" and arrays for "HasMany".
```typescript
export interface QuestLine {
  id: string;
  quests: Quest[]; // HasMany
  metadata: {      // HasOne
    version: string;
  };
}
```

---

## State Management Patterns

### 1. Component State (Local)
**Use when**: Data is only needed by this component or its direct children.
**Example**: `isOpen` for a specific dialog.

```tsx
const [isOpen, setIsOpen] = useState(false);
```

### 2. Context State (Global/Shared)
**Use when**: Data needs to be accessed by widely separated components (e.g., "Global Animation Settings").
**Location**: `src/contexts/`

**Template**:
```tsx
import { createContext, useContext, useState } from 'react';

interface MyContextValue {
  value: string;
  setValue: (v: string) => void;
}

const MyContext = createContext<MyContextValue | null>(null);

export const MyProvider = ({ children }) => {
  const [value, setValue] = useState('default');
  return (
    <MyContext.Provider value={{ value, setValue }}>
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => {
  const ctx = useContext(MyContext);
  if (!ctx) throw new Error('useMyContext must be used within MyProvider');
  return ctx;
};
```

---

## Common Mistakes

❌ **Don't**: Define types inside `.tsx` files.
✅ **Do**: Define types in `src/types/*.ts` or `*.d.ts` for reuse.

❌ **Don't**: Prop-drill data through 5+ layers.
✅ **Do**: Use a Context if data is truly global, or composition.

❌ **Don't**: Mutate state directly (`state.value = 5`).
✅ **Do**: Use setters (`setState(5)`).
