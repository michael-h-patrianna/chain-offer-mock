# Animation Development Guide for LLM Coding Agents

**Purpose**: This document teaches you how to create, modify, and apply animations using Framer Motion in the Chain Offer Mock project.

**Animation Library**: Motion (Framer Motion) 12.23.24

---

## Animation System Architecture

### Centralized Variant Definitions

**Core Principle**: All animation variants are defined in `src/animations/revealAnimations.ts`. Components import and apply these variants.

**Why**:

- Single source of truth for all animations
- Easy to test and preview animations
- Reusable across components
- Parameter-driven customization

**Flow**:

```
1. Define variants → src/animations/revealAnimations.ts
2. Define parameters → src/types/animationParameters.ts
3. Apply in component → Import variants + use motion components
4. Configure at runtime → AnimationParametersContext
```

---

## Available Animation Types

**12 Animation Types** (as of 2025-11-17):

| Type              | Description           | Special Features                    |
| ----------------- | --------------------- | ----------------------------------- |
| `stagger-inview`  | Smooth stagger        | Standard fade + slide               |
| `scale-rotate`    | Scale with rotation   | Adds rotation transform             |
| `flip-reveal`     | 3D flip effect        | Uses rotateY transform              |
| `spring-physics`  | Physics-based spring  | Configurable stiffness/damping/mass |
| `fade-slide`      | Simple fade and slide | Minimal, clean                      |
| `elastic-bounce`  | Elastic bounce        | Configurable wobble intensity       |
| `orbital-reveal`  | Circular motion       | Configurable orbit distance         |
| `glitch-snap`     | Digital glitch effect | Fast, aggressive timing             |
| `silk-unfold`     | Smooth silk-like      | Gentle, luxurious                   |
| `crystal-shimmer` | Shimmering reveal     | Elegant, refined                    |
| `velvet-cascade`  | Cascading reveal      | Soft, flowing                       |
| `none`            | No animation          | Instant display                     |

---

## How to Create a New Animation Type

### Step 1: Add Type to Union

**Location**: `src/animations/revealAnimations.ts`

**Template**:

```typescript
export type AnimationType =
  | 'stagger-inview'
  | 'scale-rotate'
  // ... existing types
  | 'your-new-animation'; // ADD HERE
```

### Step 2: Define Variants

**Understanding Variants**:

- `containerVariants`: Applied to parent `motion.div` (controls stagger timing)
- `layer2Variants`: Applied to child elements (defines the actual animation)
- Specific variants: For different parts (header, timer, footer, etc.)

**Template**:

```typescript
export const revealAnimations: Record<AnimationType, RevealAnimation> = {
  // ... existing animations
  'your-new-animation': {
    id: 'your-new-animation',
    name: 'Your New Animation',
    description: 'Brief description for UI',

    // Container controls children timing
    containerVariants: {
      hidden: {},
      visible: {
        transition: {
          staggerChildren: 0.1, // Time between each child
          delayChildren: 0.2, // Initial delay before first child
        },
      },
    },

    // Item animation (the actual effect)
    layer2Variants: {
      hidden: {
        opacity: 0,
        y: 60, // Start 60px below
        scale: 0.8, // Start at 80% size
      },
      visible: {
        opacity: 1,
        y: 0, // End at normal position
        scale: 1, // End at normal size
        transition: {
          duration: 0.6,
          ease: [0.25, 0.46, 0.45, 0.94], // Cubic bezier easing
        },
      },
    },

    // Specific variants for different component parts
    layer1Variants: {
      hidden: { opacity: 0, y: -40, scale: 0.9 },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.7, delay: 0.1 },
      },
    },



    // ... Add all required variant types (check interface)
  },
};
```

### Step 3: Add Default Parameters

**Location**: `src/types/animationParameters.ts`

**Template**:

```typescript
export const defaultAnimationParameters: Record<AnimationType, AnimationParameters> = {
  // ... existing defaults
  'your-new-animation': {
    durationScale: 1.0, // Speed multiplier
    delayOffset: 0, // Additional delay
    staggerChildren: 0.1, // Time between children
    delayChildren: 0.2, // Initial delay

    // Optional: Add if using spring physics
    spring: {
      stiffness: 200,
      damping: 15,
      mass: 1.0,
    },

    // Optional: Add if using wobble
    wobble: {
      wobbleIntensity: 1.0,
    },

    // Optional: Add if using orbital motion
    orbital: {
      orbitDistance: 100,
    },
  },
};
```

### Step 4: Test the Animation

**Create a test component**:

```typescript
import { motion } from 'motion/react'
import { revealAnimations } from '../animations/revealAnimations'

const TestAnimation = () => {
  const animation = revealAnimations['your-new-animation']

  return (
    <motion.div
      variants={animation.containerVariants}
      initial="hidden"
      animate="visible"
    >
      {[1, 2, 3, 4].map(i => (
        <motion.div
          key={i}
          variants={animation.layer2Variants}
        >
          Item {i}
        </motion.div>
      ))}
    </motion.div>
  )
}
```

---

## How to Modify Existing Animations

### Adjusting Timing

**Pattern**: Modify `transition.duration` and `delay` values

**Example**:

```typescript
// Make animation faster
layer2Variants: {
  visible: {
    transition: {
      duration: 0.3,  // Changed from 0.6 (2x faster)
    },
  },
}

// Add delay
layer2Variants: {
  visible: {
    transition: {
      duration: 0.6,
      delay: 0.5,  // Wait 500ms before starting
    },
  },
}
```

### Adjusting Motion

**Pattern**: Modify transform values in `hidden` and `visible` states

**Example**:

```typescript
// Increase slide distance
layer2Variants: {
  hidden: {
    opacity: 0,
    y: 120,  // Changed from 60 (slides from further down)
  },
}

// Add rotation
layer2Variants: {
  hidden: {
    opacity: 0,
    rotate: -90,  // Start rotated 90° counter-clockwise
  },
  visible: {
    opacity: 1,
    rotate: 0,  // End at normal rotation
  },
}

// Add scale
layer2Variants: {
  hidden: {
    opacity: 0,
    scale: 0.5,  // Start at 50% size
  },
  visible: {
    opacity: 1,
    scale: 1,  // End at normal size
  },
}
```

### Adjusting Easing

**Common Easing Functions**:

```typescript
// Linear (no easing)
transition: { ease: 'linear' }

// Ease in/out presets
transition: { ease: 'easeIn' }
transition: { ease: 'easeOut' }
transition: { ease: 'easeInOut' }

// Custom cubic bezier
transition: { ease: [0.25, 0.46, 0.45, 0.94] }  // Smooth ease-in-out
transition: { ease: [0.43, 0.13, 0.23, 0.96] }  // Punchy ease-out

// Spring physics (ignores ease)
transition: { type: 'spring', stiffness: 200, damping: 15 }
```

### Adjusting Stagger

**Pattern**: Modify `staggerChildren` and `delayChildren` in container

**Example**:

```typescript
containerVariants: {
  visible: {
    transition: {
      staggerChildren: 0.05,  // Faster stagger (was 0.1)
      delayChildren: 0.5,     // Longer initial delay (was 0.2)
    },
  },
}
```

---

## Framer Motion Variant Patterns

### Pattern 1: Simple Fade

**Template**:

```typescript
layer2Variants: {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5 },
  },
}
```

### Pattern 2: Fade + Slide

**Template**:

```typescript
layer2Variants: {
  hidden: { opacity: 0, y: 20 },  // Slide from below
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
}

// Variants:
// Slide from top: y: -20
// Slide from left: x: -20
// Slide from right: x: 20
```

### Pattern 3: Scale + Fade

**Template**:

```typescript
layer2Variants: {
  hidden: { opacity: 0, scale: 0.8 },  // Start small
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5 },
  },
}
```

### Pattern 4: Rotate + Fade

**Template**:

```typescript
layer2Variants: {
  hidden: { opacity: 0, rotate: -45 },  // Start rotated
  visible: {
    opacity: 1,
    rotate: 0,
    transition: { duration: 0.7 },
  },
}
```

### Pattern 5: 3D Flip

**Template**:

```typescript
layer2Variants: {
  hidden: {
    opacity: 0,
    rotateY: 90,  // Flipped 90° (edge-on)
  },
  visible: {
    opacity: 1,
    rotateY: 0,  // Face-on
    transition: {
      duration: 0.8,
      ease: [0.43, 0.13, 0.23, 0.96],
    },
  },
}
```

### Pattern 6: Spring Physics

**Template**:

```typescript
layer2Variants: {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',  // Use spring instead of tween
      stiffness: 200,  // Higher = faster/snappier
      damping: 15,     // Higher = less bounce
      mass: 1.0,       // Higher = slower/heavier
    },
  },
}
```

### Pattern 7: Sequence (Multiple Properties at Different Times)

**Template**:

```typescript
layer2Variants: {
  hidden: { opacity: 0, y: 20, scale: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      // Fade in first
      opacity: { duration: 0.3, delay: 0 },
      // Then slide up
      y: { duration: 0.5, delay: 0.1 },
      // Then scale
      scale: { duration: 0.4, delay: 0.3 },
    },
  },
}
```

---

## Animation Parameters System

### Understanding Parameters

**Four Base Parameters** (apply to all animations):

- `durationScale`: Multiplier for all durations (0.5 = half speed, 2.0 = double speed)
- `delayOffset`: Added to all delays (seconds)
- `staggerChildren`: Time between staggered children (seconds)
- `delayChildren`: Initial delay before children start (seconds)

**Three Optional Parameter Sets**:

- `spring`: For physics-based animations (stiffness, damping, mass)
- `wobble`: For bounce/wobble effects (wobbleIntensity)
- `orbital`: For circular motion (orbitDistance)

### Using Parameters in Components

**Pattern**: Import hook and apply parameters

**Template**:

```typescript
import { useAnimationParameters } from '../hooks/useAnimationParameters'
import { applyAnimationParameters } from '../utils/applyAnimationParameters'

const MyComponent = ({ animationType }) => {
  const parameters = useAnimationParameters(animationType)
  const animation = revealAnimations[animationType]

  // Apply parameters to variants
  const containerVariants = applyAnimationParameters(
    animation.containerVariants,
    parameters
  )

  const layer2Variants = applyAnimationParameters(
    animation.layer2Variants,
    parameters
  )

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* ... */}
    </motion.div>
  )
}
```

### Creating Custom Parameter Controls

**If you need a new parameter type**:

1. **Add to types** (`src/types/animationParameters.ts`):

```typescript
export interface MyCustomParameters {
  customValue: number;
}

export type AnimationParameters = BaseAnimationParameters & {
  spring?: SpringPhysicsParameters;
  myCustom?: MyCustomParameters; // ADD HERE
};
```

2. **Add parameter config**:

```typescript
export const myCustomParameterConfigs: ParameterConfig[] = [
  {
    key: 'customValue',
    label: 'Custom Value',
    description: 'What this parameter does',
    min: 0,
    max: 100,
    step: 1,
    defaultValue: 50,
  },
];
```

3. **Add to defaults**:

```typescript
'my-animation': {
  durationScale: 1.0,
  delayOffset: 0,
  staggerChildren: 0.1,
  delayChildren: 0.2,
  myCustom: {
    customValue: 50,
  },
}
```

---

## Applying Animations to Components

### Pattern 1: Container + Items

**Template**:

```typescript
import { motion } from 'motion/react'
import { revealAnimations } from '../animations/revealAnimations'

const MyComponent = ({ items, animationType }) => {
  const animation = revealAnimations[animationType]

  return (
    <motion.div
      className="container"
      variants={animation.containerVariants}
      initial="hidden"
      animate="visible"
    >
      {items.map(item => (
        <motion.div
          key={item.id}
          className="item"
          variants={animation.layer2Variants}
        >
          {item.content}
        </motion.div>
      ))}
    </motion.div>
  )
}
```

**Key Points**:

- Parent has `containerVariants` (controls stagger)
- Children have `layer2Variants` (defines animation)
- Children inherit `initial` and `animate` from parent (no need to repeat)

### Pattern 2: Multiple Variant Types

**Template**:

```typescript
const MyComponent = ({ animationType }) => {
  const animation = revealAnimations[animationType]

  return (
    <motion.div
      variants={animation.containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="header"
        variants={animation.layer1Variants}
      >
        Header Content
      </motion.div>

      {items.map(item => (
        <motion.div
          key={item.id}
          variants={animation.layer2Variants}
        >
          {item.content}
        </motion.div>
      ))}
    </motion.div>
  )
}
```

### Pattern 3: Conditional Animation

**Template**:

```typescript
const MyComponent = ({ shouldAnimate, animationType }) => {
  const animation = revealAnimations[animationType]

  // Conditionally apply animation
  const motionProps = shouldAnimate ? {
    variants: animation.containerVariants,
    initial: "hidden",
    animate: "visible",
  } : {}

  return (
    <motion.div className="container" {...motionProps}>
      {/* ... */}
    </motion.div>
  )
}
```

### Pattern 4: Re-triggerable Animation (Reset on Prop Change)

**Template**:

```typescript
import { useState, useEffect } from 'react'

const MyComponent = ({ animationType, resetKey }) => {
  const [key, setKey] = useState(0)

  // Reset animation when resetKey changes
  useEffect(() => {
    setKey(prev => prev + 1)
  }, [resetKey])

  const animation = revealAnimations[animationType]

  return (
    <motion.div
      key={key}  // Changing key forces remount and re-animation
      variants={animation.containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* ... */}
    </motion.div>
  )
}
```

---

## Common Animation Patterns

### Pattern: Entrance Animation

**Use Case**: Animating elements in when component mounts

**Template**:

```typescript
<motion.div
  initial="hidden"
  animate="visible"
  variants={layer2Variants}
>
  Content
</motion.div>
```

### Pattern: Exit Animation

**Use Case**: Animating elements out when component unmounts

**Template**:

```typescript
import { AnimatePresence } from 'motion/react'

<AnimatePresence>
  {isVisible && (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="hidden"  // Animate back to hidden state on unmount
      variants={layer2Variants}
    >
      Content
    </motion.div>
  )}
</AnimatePresence>
```

### Pattern: Hover Animation

**Template**:

```typescript
<motion.div
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  transition={{ duration: 0.2 }}
>
  Hover Me
</motion.div>
```

### Pattern: Scroll-Triggered Animation

**Template**:

```typescript
import { motion, useInView } from 'motion/react'
import { useRef } from 'react'

const MyComponent = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={layer2Variants}
    >
      Animates when scrolled into view
    </motion.div>
  )
}
```

---

## Common Mistakes

### ❌ Don't: Define variants inline in components

```typescript
// Bad: Variants scattered across components
const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};
```

### ✅ Do: Use centralized revealAnimations

```typescript
// Good: Import from central location
import { revealAnimations } from '../animations/revealAnimations';
const animation = revealAnimations[animationType];
```

---

### ❌ Don't: Forget stagger container

```typescript
// Bad: Using layer2Variants without container
<div>
  {items.map(item => (
    <motion.div variants={layer2Variants}>...</motion.div>
  ))}
</div>
```

### ✅ Do: Wrap with container variants

```typescript
// Good: Container controls stagger timing
<motion.div variants={containerVariants} initial="hidden" animate="visible">
  {items.map(item => (
    <motion.div variants={layer2Variants}>...</motion.div>
  ))}
</motion.div>
```

---

### ❌ Don't: Repeat initial/animate on children

```typescript
// Bad: Redundant props
<motion.div variants={containerVariants} initial="hidden" animate="visible">
  <motion.div variants={layer2Variants} initial="hidden" animate="visible">
    ...
  </motion.div>
</motion.div>
```

### ✅ Do: Let children inherit from parent

```typescript
// Good: Children inherit automatically
<motion.div variants={containerVariants} initial="hidden" animate="visible">
  <motion.div variants={layer2Variants}>
    ...
  </motion.div>
</motion.div>
```

---

### ❌ Don't: Hardcode timing values

```typescript
// Bad: Magic numbers without context
transition: { duration: 0.437, delay: 0.283 }
```

### ✅ Do: Use clear, intentional values

```typescript
// Good: Round numbers or use parameters
transition: { duration: 0.6, delay: 0.2 }
// Or use animation parameters system for runtime adjustment
```

---

## Quick Reference

### Transform Properties

| Property  | Effect              | Example                      |
| --------- | ------------------- | ---------------------------- |
| `x`       | Horizontal movement | `x: 50` (50px right)         |
| `y`       | Vertical movement   | `y: -30` (30px up)           |
| `scale`   | Size                | `scale: 0.8` (80% size)      |
| `scaleX`  | Horizontal stretch  | `scaleX: 1.2`                |
| `scaleY`  | Vertical stretch    | `scaleY: 0.8`                |
| `rotate`  | 2D rotation         | `rotate: 45` (45° clockwise) |
| `rotateX` | 3D X-axis rotation  | `rotateX: 90`                |
| `rotateY` | 3D Y-axis rotation  | `rotateY: 180`               |
| `opacity` | Transparency        | `opacity: 0.5`               |

### Transition Properties

| Property    | Effect                         | Example                          |
| ----------- | ------------------------------ | -------------------------------- |
| `duration`  | Animation length (seconds)     | `duration: 0.6`                  |
| `delay`     | Wait before starting (seconds) | `delay: 0.2`                     |
| `ease`      | Easing function                | `ease: [0.25, 0.46, 0.45, 0.94]` |
| `type`      | Animation type                 | `type: 'spring'` or `'tween'`    |
| `stiffness` | Spring tension                 | `stiffness: 200`                 |
| `damping`   | Spring resistance              | `damping: 15`                    |
| `mass`      | Spring mass                    | `mass: 1.0`                      |

---

**Last Updated**: 2025-11-17 (based on codebase analysis)
