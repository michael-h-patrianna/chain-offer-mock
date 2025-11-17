# Testing Guide for LLM Coding Agents

**Purpose**: This document teaches you how to write and run tests in the Chain Offer Mock project.

**Testing Stack**: Vitest 1.6.0 (unit/integration) + Playwright 1.56.1 (E2E) + @testing-library/react 14.2.1

---

## Testing Architecture

### Two-Layer Testing Strategy

| Test Type | Tool | Location | Purpose |
|-----------|------|----------|---------|
| Unit/Integration | Vitest | `src/tests/` | Component logic, rendering, interactions |
| End-to-End | Playwright | `e2e/` | Full user flows, animations, visual regression |

**Why Two Layers**:
- Vitest: Fast feedback for component behavior
- Playwright: Real browser testing for animations and UX

---

## Vitest Testing Patterns

### Core Principle

**Vitest** runs tests in a Node environment with jsdom for DOM simulation.

**Configuration**: Inherited from Vite config (no separate vitest.config needed)

**Run Tests**:
```bash
npm run test        # Run all tests once
npm run test:watch  # Watch mode (if configured)
```

---

## How to Write a Vitest Component Test

### Step 1: Import Test Utilities

**Template**:
```typescript
import { describe, it, expect, beforeAll, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../store'
import { MyComponent } from '../components/MyComponent'
```

**Key Imports**:
- `vitest`: Test framework functions (describe, it, expect, mocks)
- `@testing-library/react`: Component testing utilities (render, screen, fireEvent)
- `react-redux`: Provider for Redux-connected components
- Your component and dependencies

### Step 2: Set Up Test Suite

**Template**:
```typescript
describe('MyComponent', () => {
  // Runs once before all tests
  beforeAll(() => {
    // Mock global APIs
    global.fetch = vi.fn()
  })

  // Runs before each test
  beforeEach(() => {
    // Reset mocks
    vi.clearAllMocks()
  })

  it('should render correctly', () => {
    render(<MyComponent />)
    expect(screen.getByText('Expected Text')).toBeInTheDocument()
  })
})
```

### Step 3: Write Tests

**Pattern 1: Basic Rendering Test**

**Template**:
```typescript
it('renders the component with correct content', () => {
  render(<MyComponent title="Test Title" />)

  // Find by text content
  expect(screen.getByText('Test Title')).toBeInTheDocument()

  // Find by role
  expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument()

  // Find by test ID (if added)
  expect(screen.getByTestId('my-component')).toBeInTheDocument()
})
```

**Pattern 2: User Interaction Test**

**Template**:
```typescript
it('handles button click', () => {
  const handleClick = vi.fn()
  render(<MyComponent onClick={handleClick} />)

  const button = screen.getByRole('button')
  fireEvent.click(button)

  expect(handleClick).toHaveBeenCalledTimes(1)
})
```

**Pattern 3: Async Test with waitFor**

**Template**:
```typescript
it('loads and displays data', async () => {
  // Mock fetch response
  global.fetch = vi.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ items: [{ id: '1', name: 'Item 1' }] }),
    })
  ) as any

  render(<MyComponent />)

  // Wait for async operation
  await waitFor(() => {
    expect(screen.getByText('Item 1')).toBeInTheDocument()
  })

  expect(global.fetch).toHaveBeenCalledWith('/api/items')
})
```

**Pattern 4: Redux-Connected Component Test**

**Template**:
```typescript
it('dispatches Redux action on interaction', () => {
  render(
    <Provider store={store}>
      <MyComponent />
    </Provider>
  )

  const button = screen.getByRole('button', { name: /add item/i })
  fireEvent.click(button)

  // Check Redux state
  const state = store.getState()
  expect(state.feature.items).toHaveLength(1)
})
```

---

## Real-World Example: app.test.tsx

**Key Patterns**:

### Mocking fetch API
```typescript
beforeAll(() => {
  global.fetch = (async (input: RequestInfo) => {
    if (typeof input === 'string' && input.endsWith('chain-offer-list.json')) {
      return new Response(JSON.stringify(require('../../public/chain-offer-list.json')))
    }
    // Image fetch stub
    return new Response(new Blob(['']))
  }) as any
})
```

**Key Points**:
- Mock different responses based on URL
- Return actual JSON data for realistic tests
- Stub image fetches with empty blobs

### Testing Dialog Opening
```typescript
it('renders icon and opens dialog', async () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  )

  // Wait for async content to load
  const img = await screen.findByAltText('promo img')
  expect(img).toBeInTheDocument()

  // Trigger interaction
  fireEvent.click(img)

  // Wait for dialog to appear
  await waitFor(() => {
    expect(document.querySelector('dialog')).toBeTruthy()
  })
})
```

**Key Points**:
- Use `findBy*` for async elements (returns Promise)
- Use `waitFor` for async state changes
- Can query document directly when needed

---

## Playwright E2E Testing Patterns

### Core Principle

**Playwright** runs tests in real Chromium browser with full rendering and JavaScript execution.

**Configuration**: `playwright.config.ts`

**Run Tests**:
```bash
npx playwright test              # Run all E2E tests
npx playwright test --ui         # Run in UI mode
npx playwright test --headed     # Run with visible browser
npx playwright test --debug      # Run in debug mode
npx playwright show-report       # View HTML report
```

---

## How to Write a Playwright E2E Test

### Step 1: Import Playwright

**Template**:
```typescript
import { test, expect } from '@playwright/test'
```

### Step 2: Create Test Suite with beforeEach

**Template**:
```typescript
test.describe('My Feature', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to page before each test
    await page.goto('/')
  })

  test('should do something', async ({ page }) => {
    // Test implementation
  })
})
```

### Step 3: Write E2E Tests

**Pattern 1: Basic Interaction Test**

**Template**:
```typescript
test('should open dialog on click', async ({ page }) => {
  // Find and click element
  const button = page.locator('.offer-trigger').first()
  await button.click()

  // Wait for dialog to appear
  await page.waitForSelector('.dialog', { state: 'visible' })

  // Assert dialog is visible
  const dialog = page.locator('.dialog')
  await expect(dialog).toBeVisible()
})
```

**Pattern 2: Form Interaction Test**

**Template**:
```typescript
test('should submit form', async ({ page }) => {
  // Fill form fields
  await page.fill('#name', 'John Doe')
  await page.fill('#email', 'john@example.com')

  // Select from dropdown
  await page.selectOption('#country', 'US')

  // Check checkbox
  await page.check('#terms')

  // Click submit
  await page.click('button[type="submit"]')

  // Wait for success message
  await expect(page.locator('.success-message')).toBeVisible()
})
```

**Pattern 3: Animation Test**

**Template**:
```typescript
test('should animate elements on reveal', async ({ page }) => {
  // Select animation type
  await page.selectOption('#animation-select', 'stagger-inview')

  // Open dialog
  await page.click('.offer-trigger')

  // Wait for dialog to be visible
  await page.waitForSelector('.chain-offer-dialog', { state: 'visible' })

  // Wait for animation to settle
  await page.waitForTimeout(1000)

  // Take screenshot
  await page.screenshot({
    path: 'e2e/screenshots/animation-test.png',
    fullPage: true
  })

  // Verify elements are visible (animation completed)
  const items = page.locator('.chain-offer-map-item')
  const count = await items.count()
  expect(count).toBeGreaterThan(0)
})
```

**Pattern 4: Visual Regression Test**

**Template**:
```typescript
test('should match visual snapshot', async ({ page }) => {
  await page.goto('/')

  // Wait for content to load
  await page.waitForSelector('.main-content', { state: 'visible' })

  // Take screenshot for comparison
  await expect(page).toHaveScreenshot('homepage.png', {
    fullPage: true,
    animations: 'disabled',  // Disable animations for stable snapshots
  })
})
```

**Pattern 5: Multiple Element Verification**

**Template**:
```typescript
test('should display all quest cards', async ({ page }) => {
  // Open questline dialog
  await page.click('.questline-trigger')
  await page.waitForSelector('.questline-dialog', { state: 'visible' })

  // Count quest cards
  const cards = page.locator('.quest-card')
  const count = await cards.count()
  console.log(`Found ${count} quest cards`)
  expect(count).toBeGreaterThan(0)

  // Verify first card has required elements
  const firstCard = cards.first()
  await expect(firstCard.locator('.quest-header')).toBeVisible()
  await expect(firstCard.locator('.quest-rewards')).toBeVisible()
})
```

---

## Real-World Examples from e2e/

### Pattern: Animation Selector + Dialog Test

**From dialogs.spec.ts**:
```typescript
test('should display Chain Offer dialog with steps', async ({ page }) => {
  // Select animation type
  await page.selectOption('#animation-select', 'stagger-inview')

  // Click on Chain Offer icon
  const chainOfferIcon = page.locator('.offer-trigger').first()
  await chainOfferIcon.click()

  // Wait for dialog to open
  await page.waitForSelector('.chain-offer-dialog', { state: 'visible' })

  // Check that dialog is visible
  const dialog = page.locator('.chain-offer-dialog')
  await expect(dialog).toBeVisible()

  // Check that chain offer steps are rendered
  const steps = page.locator('.chain-offer-map-item')
  const stepCount = await steps.count()
  console.log(`Found ${stepCount} chain offer steps`)
  expect(stepCount).toBeGreaterThan(0)

  // Take a screenshot for verification
  await page.screenshot({
    path: 'e2e/screenshots/chain-offer-dialog.png',
    fullPage: true
  })

  // Check that at least one step has rewards
  const rewards = page.locator('.chain-offer-map-item__offers').first()
  await expect(rewards).toBeVisible()
})
```

**Key Points**:
- Use `.first()` to get first matching element
- `console.log()` for debugging
- Screenshots for manual verification
- Check multiple levels (dialog → steps → rewards)

---

## Common Testing Patterns

### Pattern: Mocking Functions

**Vitest**:
```typescript
import { vi } from 'vitest'

const mockFn = vi.fn()
mockFn('arg1', 'arg2')

expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2')
expect(mockFn).toHaveBeenCalledTimes(1)
```

### Pattern: Mocking Modules

**Vitest**:
```typescript
vi.mock('../utils/myUtil', () => ({
  myFunction: vi.fn(() => 'mocked value')
}))
```

### Pattern: Testing Errors

**Vitest**:
```typescript
it('throws error when invalid input', () => {
  expect(() => {
    myFunction(null)
  }).toThrow('Invalid input')
})
```

### Pattern: Testing Redux State Changes

**Vitest**:
```typescript
it('updates Redux state correctly', () => {
  const { result } = renderHook(() => useSelector((state: RootState) => state.feature))

  store.dispatch(setItems([{ id: '1', name: 'Item 1' }]))

  expect(result.current.items).toHaveLength(1)
})
```

### Pattern: Waiting for Network

**Playwright**:
```typescript
test('waits for API response', async ({ page }) => {
  // Wait for network request
  await page.waitForResponse(response =>
    response.url().includes('/api/items') && response.status() === 200
  )

  // Or wait for load state
  await page.waitForLoadState('networkidle')
})
```

### Pattern: Testing URL Changes

**Playwright**:
```typescript
test('navigates to correct URL', async ({ page }) => {
  await page.click('a[href="/about"]')
  await page.waitForURL('/about')
  expect(page.url()).toContain('/about')
})
```

---

## Testing Checklist

### For New Components (Vitest)

- [ ] Test renders without crashing
- [ ] Test renders correct content
- [ ] Test user interactions (click, input, etc.)
- [ ] Test props are applied correctly
- [ ] Test conditional rendering
- [ ] Test error states
- [ ] Test loading states
- [ ] Mock external dependencies (fetch, timers)
- [ ] Wrap Redux-connected components in Provider

### For New Features (Playwright)

- [ ] Test happy path user flow
- [ ] Test animation completion
- [ ] Test form validation
- [ ] Test error handling
- [ ] Take screenshots for visual verification
- [ ] Test on realistic data
- [ ] Test interactions between components
- [ ] Verify final state is correct

---

## Common Mistakes

### ❌ Don't: Forget to wrap Redux components in Provider
```typescript
// Bad: Redux hooks will fail
render(<MyReduxComponent />)
```

### ✅ Do: Always wrap in Provider
```typescript
// Good: Redux context available
render(
  <Provider store={store}>
    <MyReduxComponent />
  </Provider>
)
```

---

### ❌ Don't: Use getBy for async elements
```typescript
// Bad: Will fail if element not immediately present
const element = screen.getByText('Async Content')
```

### ✅ Do: Use findBy or waitFor for async
```typescript
// Good: Waits for element to appear
const element = await screen.findByText('Async Content')

// Or
await waitFor(() => {
  expect(screen.getByText('Async Content')).toBeInTheDocument()
})
```

---

### ❌ Don't: Hardcode timeouts
```typescript
// Bad: Arbitrary timeout
await page.waitForTimeout(5000)
```

### ✅ Do: Wait for specific conditions
```typescript
// Good: Wait for actual state
await page.waitForSelector('.dialog', { state: 'visible' })
await page.waitForLoadState('networkidle')
```

---

### ❌ Don't: Test implementation details
```typescript
// Bad: Testing internal state
expect(component.state.isOpen).toBe(true)
```

### ✅ Do: Test user-visible behavior
```typescript
// Good: Testing what user sees
await expect(page.locator('.dialog')).toBeVisible()
```

---

### ❌ Don't: Forget to clean up mocks
```typescript
// Bad: Mocks persist between tests
beforeAll(() => {
  global.fetch = vi.fn()
})
```

### ✅ Do: Clear mocks between tests
```typescript
// Good: Fresh mocks for each test
beforeEach(() => {
  vi.clearAllMocks()
})
```

---

## Quick Reference

### Vitest Query Selectors

| Method | Returns | Waits | Throws if not found |
|--------|---------|-------|---------------------|
| `getByText` | Element | No | Yes |
| `queryByText` | Element or null | No | No |
| `findByText` | Promise<Element> | Yes | Yes |
| `getAllByText` | Element[] | No | Yes |
| `getByRole` | Element | No | Yes |
| `getByTestId` | Element | No | Yes |

### Playwright Locators

| Method | Description |
|--------|-------------|
| `page.locator('.class')` | Find by CSS selector |
| `page.locator('text=Exact')` | Find by exact text |
| `page.locator('text=/Regex/i')` | Find by regex |
| `page.getByRole('button')` | Find by ARIA role |
| `page.getByText('Text')` | Find by text content |
| `page.getByTestId('id')` | Find by data-testid |
| `.first()` | First matching element |
| `.last()` | Last matching element |
| `.nth(2)` | Nth element (0-indexed) |

### Common Playwright Actions

| Action | Method |
|--------|--------|
| Click | `await page.click('.selector')` |
| Fill input | `await page.fill('#input', 'value')` |
| Select option | `await page.selectOption('#select', 'value')` |
| Check checkbox | `await page.check('#checkbox')` |
| Navigate | `await page.goto('/path')` |
| Wait for element | `await page.waitForSelector('.selector')` |
| Wait for URL | `await page.waitForURL('/path')` |
| Screenshot | `await page.screenshot({ path: 'test.png' })` |

### Common Assertions

**Vitest**:
```typescript
expect(value).toBe(expected)
expect(value).toEqual(expected)  // Deep equality
expect(value).toBeTruthy()
expect(value).toBeFalsy()
expect(array).toHaveLength(3)
expect(element).toBeInTheDocument()
expect(fn).toHaveBeenCalled()
expect(fn).toHaveBeenCalledWith('arg')
```

**Playwright**:
```typescript
await expect(locator).toBeVisible()
await expect(locator).toHaveText('text')
await expect(locator).toContainText('partial')
await expect(locator).toHaveCount(3)
await expect(page).toHaveURL('/path')
await expect(page).toHaveTitle('Title')
```

---

## Running Tests

### Vitest Commands

```bash
# Run all tests once
npm run test

# Run in watch mode
npm run test -- --watch

# Run specific file
npm run test -- src/tests/app.test.tsx

# Run with coverage
npm run test -- --coverage

# Run in UI mode (if configured)
npm run test -- --ui
```

### Playwright Commands

```bash
# Run all E2E tests
npx playwright test

# Run specific test file
npx playwright test e2e/dialogs.spec.ts

# Run in headed mode (show browser)
npx playwright test --headed

# Run in UI mode (interactive)
npx playwright test --ui

# Run in debug mode
npx playwright test --debug

# Run specific test by name
npx playwright test -g "should display Chain Offer dialog"

# View test report
npx playwright show-report

# Generate screenshots
npx playwright test --update-snapshots
```

---

**Last Updated**: 2025-11-17 (based on codebase analysis)
