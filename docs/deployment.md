# Local Development Guide for LLM Coding Agents

**Purpose**: This document teaches you how to run the Chain Offer Mock application locally and execute key commands.

**Tech Stack**: Vite 5.3 + npm 10.8.1 + Node.js

---

## Local Development Setup

### Prerequisites

**Required**:
- Node.js (recommended: v18 or higher)
- npm 10.8.1 (specified in package.json)

**Check Versions**:
```bash
node --version   # Should be v18+
npm --version    # Should be 10.8.1
```

### Initial Setup

**Step 1: Clone Repository** (if not already done)
```bash
git clone <repository-url>
cd chain-offer-mock
```

**Step 2: Install Dependencies**
```bash
npm install
```

**What this does**:
- Installs all packages from package.json
- Creates `node_modules/` directory
- Generates `package-lock.json` (or updates it)

**Expected time**: 1-3 minutes depending on network speed

---

## Running the Application

### Development Server

**Start Dev Server**:
```bash
npm run dev
```

**What happens**:
- Vite starts development server
- Default URL: `http://localhost:5173` (or next available port)
- Hot Module Replacement (HMR) enabled - changes appear instantly
- Browser auto-opens (if configured)

**Console Output**:
```
  VITE v5.3.3  ready in 1234 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

**Access Application**:
- Open browser to `http://localhost:5173`
- Available modes:
  - `/` - Default app (full chain offer demo)
  - `/?isolated` - Isolated components view
  - `/?compare` - Side-by-side comparison
  - `/?simple` - Simple harness

**Stop Server**:
- Press `Ctrl+C` in terminal

---

## Building for Production

### Production Build

**Build Command**:
```bash
npm run build
```

**What happens**:
- TypeScript compilation (type checking)
- Vite bundles and optimizes code
- Output to `dist/` directory
- Minification, tree-shaking, code splitting applied

**Console Output**:
```
vite v5.3.3 building for production...
✓ 234 modules transformed.
dist/index.html                   1.2 kB
dist/assets/index-a1b2c3d4.js    123.4 kB │ gzip: 45.6 kB
✓ built in 3.45s
```

### Preview Production Build

**Preview Command**:
```bash
npm run preview
```

**What happens**:
- Serves the `dist/` folder
- Simulates production environment
- Default URL: `http://localhost:4173`

**Use Case**: Test production build locally before deploying

---

## Running Tests

### Unit/Integration Tests (Vitest)

**Run All Tests**:
```bash
npm run test
```

**What happens**:
- Vitest runs all tests in `src/tests/`
- Tests run once and exit
- Console shows pass/fail results

**Output Example**:
```
 ✓ src/tests/app.test.tsx (1)
   ✓ Chain Offers Mock (1)
     ✓ renders icon and opens dialog

 Test Files  1 passed (1)
      Tests  1 passed (1)
   Start at  10:23:45
   Duration  1.23s
```

### E2E Tests (Playwright)

**Run All E2E Tests**:
```bash
npx playwright test
```

**What happens**:
- Starts dev server automatically (configured in playwright.config.ts)
- Runs tests in headless Chromium
- Generates HTML report in `playwright-report/`

**Run with Visible Browser**:
```bash
npx playwright test --headed
```

**Run in UI Mode** (interactive):
```bash
npx playwright test --ui
```

**Run Specific Test File**:
```bash
npx playwright test e2e/dialogs.spec.ts
```

**View Test Report**:
```bash
npx playwright show-report
```

---

## Development Workflow Commands

### Linting

**Check Code Quality**:
```bash
npm run lint
```

**What happens**:
- ESLint checks TypeScript/React files in `src/`
- Reports errors and warnings
- Uses config from `.eslintrc` (or package.json)

**Output Example**:
```
/path/to/file.tsx
  12:5  warning  'useState' is defined but never used  @typescript-eslint/no-unused-vars

✖ 1 problem (0 errors, 1 warning)
```

---

## Common Development Tasks

### Installing New Package

**Add Dependency**:
```bash
npm install <package-name>
```

**Add Dev Dependency**:
```bash
npm install --save-dev <package-name>
```

**Examples**:
```bash
npm install axios                    # Runtime dependency
npm install --save-dev @types/node   # Dev dependency
```

### Updating Dependencies

**Update All Packages** (be careful):
```bash
npm update
```

**Update Specific Package**:
```bash
npm install <package-name>@latest
```

**Check Outdated Packages**:
```bash
npm outdated
```

### Clearing Cache

**Clear npm Cache**:
```bash
npm cache clean --force
```

**Clear Vite Cache**:
```bash
rm -rf node_modules/.vite
```

**Full Clean Reinstall**:
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## Project Structure Quick Reference

```
chain-offer-mock/
├── public/                    # Static assets (served as-is)
│   └── chain-offer-list.json  # Mock data
├── src/                       # Source code
│   ├── animations/            # Animation variants
│   ├── components/            # React components
│   ├── contexts/              # Context providers
│   ├── store/                 # Redux slices
│   ├── types/                 # TypeScript type definitions
│   ├── ui/                    # App shells and harnesses
│   ├── utils/                 # Utility functions
│   ├── tests/                 # Vitest tests
│   └── main.tsx               # App entry point
├── e2e/                       # Playwright E2E tests
│   └── screenshots/           # Test screenshots
├── dist/                      # Production build output (generated)
├── node_modules/              # Dependencies (generated)
├── docs/                      # Documentation (this file!)
├── package.json               # Dependencies and scripts
├── tsconfig.json              # TypeScript configuration
├── vite.config.ts             # Vite configuration
├── playwright.config.ts       # Playwright configuration
└── README.md                  # Project README
```

---

## Environment Variables

**Currently**: No `.env` file required for this project.

**If needed in future**:

1. Create `.env` file in root:
```env
VITE_API_URL=http://localhost:3000
VITE_FEATURE_FLAG=true
```

2. Access in code:
```typescript
const apiUrl = import.meta.env.VITE_API_URL
```

**Important**: All Vite env vars must be prefixed with `VITE_`

---

## Troubleshooting

### Issue: Port 5173 Already in Use

**Error**:
```
Port 5173 is in use, trying another one...
```

**Solution 1**: Kill process using port
```bash
# Find process
lsof -i :5173

# Kill it (replace PID)
kill -9 <PID>
```

**Solution 2**: Use different port
```bash
npm run dev -- --port 5174
```

---

### Issue: Module Not Found

**Error**:
```
Cannot find module 'motion/react'
```

**Solution**: Reinstall dependencies
```bash
rm -rf node_modules package-lock.json
npm install
```

---

### Issue: TypeScript Errors

**Error**:
```
Property 'X' does not exist on type 'Y'
```

**Solution 1**: Check types are installed
```bash
npm install --save-dev @types/react @types/react-dom
```

**Solution 2**: Restart TypeScript server (in VS Code)
- `Cmd+Shift+P` → "TypeScript: Restart TS Server"

---

### Issue: Tests Failing

**Error**: Tests that previously passed now fail

**Solution 1**: Clear test cache
```bash
npm run test -- --clearCache
```

**Solution 2**: Check for port conflicts
```bash
# Playwright uses port 5174 by default
lsof -i :5174
```

**Solution 3**: Update Playwright browsers
```bash
npx playwright install
```

---

### Issue: Build Fails

**Error**:
```
Error: Cannot resolve module...
```

**Solution 1**: Check imports are correct
- Use relative imports: `'../components/MyComponent'`
- Or absolute from src: `'components/MyComponent'` (baseUrl configured)

**Solution 2**: Clear build cache
```bash
rm -rf dist node_modules/.vite
npm run build
```

---

### Issue: Hot Reload Not Working

**Problem**: Changes don't appear in browser

**Solution 1**: Hard refresh
- `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)

**Solution 2**: Restart dev server
```bash
# Stop with Ctrl+C, then restart
npm run dev
```

**Solution 3**: Check file is in `src/`
- Vite only watches files inside `src/`

---

## Git Workflow

### Check Status

```bash
git status
```

### Create Branch

```bash
git checkout -b feature/my-new-feature
```

### Commit Changes

```bash
git add .
git commit -m "Add new animation type"
```

### Push to Remote

```bash
git push origin feature/my-new-feature
```

### Pull Latest Changes

```bash
git pull origin main
```

---

## Quick Cheatsheet

| Task | Command |
|------|---------|
| **Setup** | |
| Install dependencies | `npm install` |
| **Development** | |
| Start dev server | `npm run dev` |
| Run tests | `npm run test` |
| Run E2E tests | `npx playwright test` |
| Lint code | `npm run lint` |
| **Build** | |
| Build for production | `npm run build` |
| Preview build | `npm run preview` |
| **Debugging** | |
| Clear Vite cache | `rm -rf node_modules/.vite` |
| Clear all caches | `rm -rf node_modules dist && npm install` |
| Check port usage | `lsof -i :5173` |
| **Testing** | |
| Run specific test | `npm run test -- path/to/test.ts` |
| E2E with UI | `npx playwright test --ui` |
| E2E headed | `npx playwright test --headed` |
| View E2E report | `npx playwright show-report` |

---

## URLs and Ports

| Service | Default URL | Port |
|---------|-------------|------|
| Dev Server | http://localhost:5173 | 5173 |
| Preview Server | http://localhost:4173 | 4173 |
| Playwright Test | http://localhost:5174 | 5174 |

---

## npm Scripts Reference

**From package.json**:

| Script | Command | Purpose |
|--------|---------|---------|
| `dev` | `vite` | Start dev server with HMR |
| `build` | `vite build` | Build for production |
| `preview` | `vite preview` | Preview production build |
| `lint` | `eslint src --ext .ts,.tsx` | Lint TypeScript/React files |
| `test` | `vitest run` | Run Vitest tests once |

---

## First-Time Setup Checklist

- [ ] Install Node.js v18+
- [ ] Install npm 10.8.1
- [ ] Clone repository
- [ ] Run `npm install`
- [ ] Run `npm run dev` (verify server starts)
- [ ] Open http://localhost:5173 (verify app loads)
- [ ] Run `npm run test` (verify tests pass)
- [ ] Run `npx playwright install` (install browser binaries)
- [ ] Run `npx playwright test` (verify E2E tests pass)
- [ ] Read `docs/architecture.md` (understand structure)

---

## Daily Development Workflow

1. **Start dev server**:
   ```bash
   npm run dev
   ```

2. **Make changes** in `src/`

3. **Browser auto-refreshes** (HMR)

4. **Run tests** when done:
   ```bash
   npm run test
   ```

5. **Run E2E tests** for critical features:
   ```bash
   npx playwright test e2e/your-feature.spec.ts
   ```

6. **Lint before committing**:
   ```bash
   npm run lint
   ```

7. **Commit changes**:
   ```bash
   git add .
   git commit -m "Your commit message"
   ```

---

**Last Updated**: 2025-11-17 (based on codebase analysis)
