# Local Development Guide for LLM Coding Agents

**Purpose**: This document teaches how to run the application locally and execute key commands.

**Tech Stack**: Vite (Build Tool), NPM (Package Manager).

---

## Local Development Setup

### Step 1: Prerequisites
- Node.js (v18+)
- NPM

### Step 2: Install Dependencies
```bash
npm install
```

---

## Running the Application

### Starting Development Server
```bash
npm run dev
```
*Runs on `http://localhost:5173` (usually).*

### Building for Production
```bash
npm run build
```
*Output goes to `dist/` folder.*

### Previewing Production Build
```bash
npm run preview
```
*Serve the `dist/` folder locally to test the built artifact.*

---

## Running Tests

### Unit Tests (Vitest)
```bash
npm run test
```

### E2E Tests (Playwright)
```bash
# Install browsers first (one time)
npx playwright install

# Run tests
npx playwright test
```

---

## Code Quality

### Linting
```bash
npm run lint
```
*Checks code style and potential errors.*

### Formatting
```bash
npm run format
```
*Auto-formats code using Prettier.*

---

## Quick Cheatsheet

| Task | Command |
|------|---------|
| **Start Dev** | `npm run dev` |
| **Build** | `npm run build` |
| **Test (Unit)** | `npm run test` |
| **Lint** | `npm run lint` |
| **Format** | `npm run format` |
