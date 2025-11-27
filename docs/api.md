# Data & API Guide for LLM Coding Agents

**Purpose**: This document teaches how to manage data flow, mock data, and "API" interactions in this frontend-only mock project.

**Pattern**: Static JSON files + TypeScript Getter Functions.

---

## Data Architecture

### 1. Source of Truth
**Location**: `src/data/`
**Format**: JSON files (`.json`).
**Why**: Simulates API responses without a backend. Easy to edit.

### 2. Data Access Layer
**Location**: `src/data/`
**Pattern**: Exported TypeScript functions that load and type-cast the JSON.

---

## How to Create "New Data" (Mock API Endpoint)

### Step 1: Create JSON File
**Location**: `src/data/myNewData.json`
**Template**:
```json
{
  "id": "1",
  "title": "My New Feature",
  "items": [
    { "id": "a", "value": 100 },
    { "id": "b", "value": 200 }
  ]
}
```

### Step 2: Define Types
**Location**: `src/types/myFeature.d.ts` (or similar)
**Template**:
```typescript
export interface MyFeatureData {
  id: string;
  title: string;
  items: Array<{ id: string; value: number }>;
}
```

### Step 3: Create Getter Function
**Location**: `src/data/getMyFeatureData.ts`
**Template**:
```typescript
import myData from './myNewData.json';
import { MyFeatureData } from '../types/myFeature';

export const getMyFeatureData = (): MyFeatureData => {
  // Cast JSON to strict TypeScript type
  return myData as MyFeatureData;
};
```

### Step 4: Usage in Component
**Template**:
```tsx
import { getMyFeatureData } from '../../data/getMyFeatureData';

const MyComponent = () => {
  // Data is synchronous in this mock, but treat it like read-only
  const data = getMyFeatureData();

  return <div>{data.title}</div>;
};
```

---

## Common Patterns

### "Dynamic" Data
Since JSON is static, if you need dynamic behavior (e.g., calculated totals, dates relative to *now*), do it in the **Getter Function** (Step 3).

**Example**:
```typescript
export const getActiveOffers = () => {
  const raw = chainOffersData as ChainOffer[];
  // Filter logic here simulates backend query
  return raw.filter(o => o.isActive);
};
```

### Asset Paths
**Rule**: Images referenced in JSON should be relative to `public/`.
**Example**: `"image": "/assets/images/my-icon.png"`

---

## Quick Decision Tree

**"How do I add..."**
1. **New static content?** → Edit/Create `src/data/*.json`.
2. **Dynamic logic (filtering/sorting)?** → Write logic in the `src/data/get*.ts` function.
3. **Type definitions?** → `src/types/*.d.ts`.

## Common Mistakes

❌ **Don't**: Import JSON directly into components (tight coupling).
✅ **Do**: Use a `get...` helper function to abstract the source.

❌ **Don't**: Modify JSON files at runtime (files are read-only in build).
✅ **Do**: Use React State (`useState`) for user-modified data.
