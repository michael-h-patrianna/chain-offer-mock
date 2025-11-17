---
description: Create pattern-focused documentation for LLM agents
---

# Bootstrap Agent Documentation

**YOUR JOB**: You are creating **system prompts disguised as documentation**. Each doc you create will be read by LLM coding agents as context to understand how to write code in this project.

**CRITICAL MINDSET**: You are NOT writing docs for humans. You are writing **instructions for AI agents**. Think of each doc as a detailed system prompt that teaches an agent the project's patterns.

---

## What You're Creating

**3 Required Docs** (these are AI agent instruction manuals):
1. `docs/architecture.md` - "When writing code, put files HERE, use THESE patterns, follow THESE naming rules"
2. `docs/testing.md` - "When writing tests, use THESE templates, run THESE commands"
3. `docs/development.md` - "To run/build/deploy, execute THESE commands in THIS order"

**Optional Domain Docs** (only if project needs them):
- `docs/api.md` - "To create API endpoints, follow THESE steps with THESE templates"
- `docs/database.md` - "To work with data, use THESE ORM patterns, THESE conventions"
- `docs/frontend.md` - "To create components, use THESE patterns, THIS structure"

---

## Your Writing Style

**Each doc you write must**:
- Start with: "# [Topic] Guide for LLM Coding Agents"
- State purpose: "This teaches you HOW to [do X]"
- Use imperative language: "Do this", "Don't do that", "Always X", "Never Y"
- Provide copy-paste code templates with placeholders
- Include decision trees: "If X, then do Y; if Z, then do W"
- End with "Common Mistakes" section (❌ Don't / ✅ Do)

**Think like you're giving instructions to a junior developer who**:
- Can't see the full codebase
- Needs explicit patterns to follow
- Needs templates to copy
- Needs clear "where do I put this?" answers

**Token efficiency rules**:
- ❌ DON'T list every file, class, function, endpoint, table
- ✅ DO provide the pattern for creating new ones
- ❌ DON'T explain why decisions were made historically
- ✅ DO state the current pattern to follow
- ❌ DON'T write prose paragraphs
- ✅ DO write bullet points, templates, commands

---

## Workflow

### Phase 1: Discover Patterns (Not Inventory)

**Your goal**: Understand HOW this codebase works, not WHAT it contains.

**Identify project type**:

- Backend API → Create `docs/api.md`
- Has database → Create `docs/database.md`
- Frontend app → Create `docs/frontend.md`
- Full-stack → Create all three

**What patterns to discover** (these become AI agent instructions):

1. **Folder structure**: Where does X type of code go? (agents need file placement rules)
2. **Naming conventions**: How to name files/classes/functions? (agents need naming rules)
3. **Tech stack**: Language, framework, key libraries (agents need to know what to generate)
4. **Base abstractions**: What classes/interfaces to extend? (templates for new code)
5. **"How to create X"**: Step-by-step workflows (agents need procedures)
6. **Common mistakes**: What to avoid (agents need guardrails)

**Discovery commands**:
```bash
# Tech stack
cat package.json requirements.txt Cargo.toml go.mod composer.json 2>/dev/null | head -20

# Folder structure (2-3 levels deep)
tree -L 3 -I 'node_modules|vendor|dist|build' || find . -type d -maxdepth 3 | head -20

# Base classes/interfaces
grep -r "class Base\|interface I" --include="*.{ts,py,java,php}" src/ app/ | head -10

# Test setup
ls -la *test* *spec* jest.config* vitest.config* pytest.ini phpunit.xml 2>/dev/null
```

### What NOT to Document (Changes Too Often)

**Skip these (token waste, maintenance burden)**:
- ❌ Every file in every directory
- ❌ Every database table/model with full schema
- ❌ Every API endpoint/route with full docs
- ❌ Every React component or UI element
- ❌ Every test file
- ❌ Current state inventories
- ❌ Line-by-line code walkthroughs

**Instead document**:
- ✅ Folder PURPOSE patterns
- ✅ HOW to create new endpoints/components/features
- ✅ HOW to write tests (not which exist)
- ✅ Current state PATTERNS and conventions
- ✅ Decision trees for common tasks
- ✅ Code templates for typical operations

```

---

### Phase 2: Write docs/architecture.md

**Remember**: You're writing an **instruction manual for AI coding agents**.

**Required structure**:
```markdown
# Architecture Guide for LLM Coding Agents

**Purpose**: Instructions for where to put code and what patterns to follow.
**Tech Stack**: [Language + Framework + Key Tools]

## Where to Put New Code

\```
src/
├── [folder]/  # PUT [type of files] HERE
├── [folder]/  # PUT [type of files] HERE
\```

**Decision tree**:
- Creating new [X]? → Put in `[path]`, name it `[pattern]`
- Creating new [Y]? → Put in `[path]`, name it `[pattern]`

## How to Create [Common Task]

**Template**:
\```[language]
// Copy-paste this, replace [PLACEHOLDERS]
[actual code template from codebase]
\```

**Steps**:
1. Create file at `[path]` named `[pattern]`
2. Copy template above
3. Replace [X], [Y], [Z]
4. [Additional steps]

## Common Mistakes

❌ **Don't**: [Anti-pattern]
✅ **Do**: [Correct pattern]
```

**Key sections** (include what's relevant):
- Where to Put New Code (decision tree)
- File Naming Conventions
- Code Templates (for common file types)
- How to Create [X] (step-by-step workflows)
- Common Mistakes

**What NOT to include**:
- ❌ List of every existing file
- ❌ Historical context
- ❌ Long explanations

---

### Phase 3: Write docs/testing.md

**Structure**:
```markdown
# Testing Guide for LLM Coding Agents

**Purpose**: Instructions for writing and running tests.
**Test Stack**: [Jest/Pytest/etc.]

## How to Write a Test

**Template**:
\```[language]
[Copy-paste test template]
\```

**Location**: Tests go in `[path pattern]`
**Naming**: `[file naming pattern]`

## Running Tests

\```bash
# All tests
[command]

# Specific file
[command pattern]

# Watch mode
[command]
\```

## Common Patterns

### Testing [X]
\```[language]
[Template for testing X]
\```

### Testing [Y]
\```[language]
[Template for testing Y]
\```

## Common Mistakes
❌ **Don't**: [Anti-pattern]
✅ **Do**: [Correct pattern]
```

---

### Phase 4: Write docs/development.md

**Structure**:
```markdown
# Development Guide for LLM Coding Agents

**Purpose**: Instructions for setup, running, and building.

## Setup

\```bash
# 1. Install dependencies
[command]

# 2. Configure
[command]

# 3. Start
[command]
\```

## Key Commands

| Task | Command |
|------|---------|
| Run dev server | `[command]` |
| Run tests | `[command]` |
| Build | `[command]` |
| Lint | `[command]` |

## Troubleshooting

**Problem**: [Common issue]
**Solution**: `[command]`
```

---

### Phase 5: Optional Domain Docs

Only create if project needs them. Use same instruction-manual style.

**For APIs** (`docs/api.md`):
- How to create endpoint (step-by-step with template)
- Request/response patterns
- Auth pattern
- Common mistakes

**For Databases** (`docs/database.md`):
- How to create model/entity (step-by-step with template)
- Query patterns
- Migration commands
- Common mistakes

**For Frontend** (`docs/frontend.md`):
- How to create component (step-by-step with template)
- State management pattern
- Styling pattern
- Common mistakes

---

### Phase 6: Verify

**Check each doc**:
- [ ] Starts with "# [Topic] Guide for LLM Coding Agents"
- [ ] Has copy-paste code templates
- [ ] Has "How to [X]" sections with steps
- [ ] Has "Common Mistakes" section
- [ ] Uses imperative language ("Do this", not "You can")
- [ ] NO exhaustive listings of files/endpoints/components
- [ ] Provides patterns, not inventory

**Final check**:
```bash
# Verify no placeholders left
grep -r "\[TODO\]\|\[PLACEHOLDER\]" docs/

# Verify reasonable length (not exhaustive)
wc -l docs/*.md  # Should be 100-300 lines each, not 1000+
```

---

## Example "Common Mistakes" Section

Every doc must end with this format:

```markdown
## Common Mistakes

❌ **Don't**: Put components in `src/lib/`
✅ **Do**: Put components in `src/components/`

❌ **Don't**: Name files with underscores: `my_component.ts`
✅ **Do**: Use kebab-case: `my-component.ts`

❌ **Don't**: Write tests in same file as code
✅ **Do**: Create separate `*.test.ts` file

[5-10 specific anti-patterns from this codebase]
```

---

## Success Criteria

You've succeeded when an LLM agent can:
1. Read `docs/architecture.md` and know where to put new code
2. Read `docs/testing.md` and write a test from the template
3. Read `docs/development.md` and run the project
4. Follow patterns without seeing the full codebase

**Final output**:
```
Created AI agent instruction docs:
- docs/architecture.md (X lines) - File placement, naming, code templates
- docs/testing.md (X lines) - Test templates and commands
- docs/development.md (X lines) - Setup and run commands
[+ any domain docs]

✓ Each doc = system prompt for AI agents
✓ Templates provided for common tasks
✓ Decision trees for "where do I put X?"
✓ No exhaustive listings
✓ Token-efficient (patterns, not inventory)
```
