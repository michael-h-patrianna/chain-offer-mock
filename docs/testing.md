# Testing Guide for LLM Coding Agents

**Purpose**: This document teaches how to write and run tests in the Chain Offer Mock project.

**Tech Stack**: Vitest (Unit/Component), Playwright (E2E).

---

## Testing Principles

### 1. E2E First
**Rule**: Prioritize Playwright E2E tests for visual regressions and user flows. Since this is a UI mock, visual verification is key.

### 2. Unit for Logic
**Rule**: Use Vitest for complex logic (e.g., animation parameter calculations, data transformers).

---

## E2E Testing (Playwright)

### How to Write E2E Tests
**Location**: `e2e/` (or root `tests/` if configured differently - check `playwright.config.ts`)
**Template**:
```typescript
import { test, expect } from '@playwright/test';

test('feature works as expected', async ({ page }) => {
  // 1. Arrange
  await page.goto('/');

  // 2. Act
  await page.getByRole('button', { name: 'Open Dialog' }).click();

  // 3. Assert
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(page).toHaveScreenshot(); // Visual regression
});
```

### Key Commands
```bash
# Run all E2E tests
npx playwright test

# Run specific test
npx playwright test tests/my-feature.spec.ts

# Update snapshots (if visual tests fail)
npx playwright test --update-snapshots
```

---

## Unit Testing (Vitest)

### How to Write Unit Tests
**Location**: `src/tests/` or co-located `__tests__` folders.
**Template**:
```typescript
import { describe, it, expect } from 'vitest';
import { myHelper } from '../utils/myHelper';

describe('myHelper', () => {
  it('calculates correctly', () => {
    const result = myHelper(1, 2);
    expect(result).toBe(3);
  });
});
```

### Key Commands
```bash
npm run test
```

---

## Common Mistakes

❌ **Don't**: Test implementation details (e.g., specific CSS classes) in E2E.
✅ **Do**: Test user-visible behavior (roles, text, visual snapshots).

❌ **Don't**: Mock everything.
✅ **Do**: In E2E, mock only network requests if necessary (though this project uses local data). Use real components.
