# How to Add Animations to Production Code

Welcome! This guide shows you how to move the animations from this mock project into your real production app.

Don't worry if you haven't used Motion (Framer Motion) before. It's easier than it looks! You don't need to write complex animation logic. You just need to put things in the right "wrappers."

## How it works
Think of it like a conductor and an orchestra:
1.  **The Container (The Conductor):** This is the main wrapper around your whole popup. It tells the inner parts *when* to start.
2.  **The Elements (The Musicians):** These are the images, text, and buttons inside. They just need to know *how* to move (slide, fade, pop).

## What you'll need
- The `animation` object (we provide this helper).
- The `<m.div>`, `<m.img>`, or `<m.p>` components (these are just animated versions of standard HTML tags).

---

## Step 1: Wrap the whole popup
First, find the main `<div>` that holds your entire dialog content. Change it to an `<m.div>`.

You need to give it three things:
1.  `initial='hidden'`: "Start invisible."
2.  `animate='visible'`: "Go to the visible state."
3.  `variants={animation.containerVariants}`: "Use the conductor rules."

**It looks like this:**
```tsx
// The "Conductor" Wrapper
<m.div
  initial='hidden'
  animate='visible'
  variants={animation.containerVariants}
  className='your-popup-class'
>
  {/* Your content goes here */}
</m.div>
```

---

## Step 2: Wrap the elements inside
Now, look at the specific items you want to animate (Header, Timer, Cards, Button). Wrap each one in an `<m.div>`.

You only need to give them one thing:
-   `variants={animation.layerXVariants}`

**Which layer should I use?**
We have 3 layers to keep things organized:
-   **Layer 1**: Things at the top (Header image, Timer, Title).
-   **Layer 2**: The main content (Cards, Items).
-   **Layer 3**: Things at the bottom (Buttons, Footer).

**It looks like this:**
```tsx
// A "Musician" Element
<m.div variants={animation.layer1Variants}>
  <YourHeaderComponent />
</m.div>
```

---

## Cheat Sheets per Popup

Here is the exact structure you need for each popup type. We've replaced the real components with placeholders so you can see the pattern clearly.

### 1. Chain Offer Dialog
Use this structure for the "Chain Offer" popup.

```tsx
<m.div
  variants={animation.containerVariants}
  initial='hidden'
  animate='visible'
  className='chain-offer-dialog'
>
  {/* Header Section (Layer 1) */}
  <header>
    <m.div variants={animation.layer1Variants}>
      <HeaderImage />
      <Timer />
    </m.div>
    
    <m.div variants={animation.layer1Variants}>
      <Title />
    </m.div>
  </header>

  {/* Main Items (Layer 2) */}
  <section>
    {items.map(item => (
      <m.div key={item.id} variants={animation.layer2Variants}>
        <ChainOfferItem />
      </m.div>
    ))}
  </section>

  {/* Footer (Layer 2 or 3) */}
  <m.footer variants={animation.layer2Variants}>
    <TermsLink />
  </m.footer>
</m.div>
```

### 2. Questline Dialog
Use this structure for the standard "Questline" popup.

```tsx
<m.div
  variants={animation.containerVariants}
  initial='hidden'
  animate='visible'
  className='questline-dialog'
>
  {/* Header & Timer (Layer 1) */}
  <m.img variants={animation.layer1Variants} src={headerUrl} />
  
  <m.div variants={animation.layer1Variants}>
    <Timer />
  </m.div>

  <m.div variants={animation.layer1Variants}>
    <Description />
  </m.div>

  {/* Bonus Rewards (Layer 1) */}
  <m.div variants={animation.layer1Variants}>
    <BonusRewards />
  </m.div>

  {/* Progress Bar (Layer 3 - specialized) */}
  <m.div variants={animation.layer3Variants}>
    <ProgressBar />
  </m.div>

  {/* Quest Cards (Layer 2) */}
  <div className='quests-grid'>
    {quests.map(quest => (
      <m.div key={quest.id} variants={animation.layer2Variants}>
        <QuestCard />
      </m.div>
    ))}
  </div>

  {/* Footer (Layer 2) */}
  <m.div variants={animation.layer2Variants}>
    <TermsLink />
  </m.div>
</m.div>
```

### 3. Simple Quest Dialog
Use this structure for the "Simple Quest" popup (the one with "Do This / Get This").

```tsx
<m.div
  variants={animation.containerVariants}
  initial='hidden'
  animate='visible'
  className='simple-quest-dialog'
>
  {/* Header & Timer (Layer 1) */}
  <m.img variants={animation.layer1Variants} src={headerUrl} />
  
  <m.div variants={animation.layer1Variants}>
    <Timer />
  </m.div>

  {/* Main Cards (Layer 2) */}
  <div className='content-wrapper'>
    <m.div variants={animation.layer2Variants}>
      <TaskCard /> {/* "Do This" card */}
    </m.div>

    <m.div variants={animation.layer2Variants}>
      RewardCard /> {/* "To Get This" card */}
    </m.div>
  </div>

  {/* Action Button (Layer 2) */}
  <m.button variants={animation.layer2Variants}>
    Claim Button
  </m.button>

  {/* Footer (Layer 2) */}
  <m.div variants={animation.layer2Variants}>
    <TermsLink />
  </m.div>
</m.div>
```

---

## Troubleshooting

**Problem: The animation looks broken or choppy.**
**Try this:** Make sure you wrapped the **entire** popup in the Container `m.div` (Step 1). If you forget this, the children won't know when to start.

**Problem: Everything animates at the exact same time.**
**Try this:** Check that you added `variants={animation.containerVariants}` to the top parent. That's the piece that tells them to "Stagger" (wait for their turn).

**Problem: The elements are flying in from the top left corner!**
**Try this:** This usually happens if `transform-origin` isn't set correctly on absolute positioned elements. In our `QuestlineViewer`, we handle this automatically. For standard HTML/CSS popups, just make sure your elements have a defined width and height.

**Still stuck?**
Check the `src/components/Shared/` folder in this mock project to see working examples!
