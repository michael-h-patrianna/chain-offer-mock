import { test } from '@playwright/test'

test('diagnose animation timeline - chain offer steps', async ({ page }) => {
  await page.goto('/')

  // Select stagger-inview animation
  await page.selectOption('#animation-select', 'stagger-inview')

  // Open chain offer dialog
  await page.locator('.offer-trigger').first().click()
  await page.waitForSelector('.chain-offer-dialog', { state: 'visible' })

  const firstStep = page.locator('.chain-offer-map-item-wrapper').first()

  // Sample opacity at 0ms (immediate)
  const opacity0ms = await firstStep.evaluate(el => window.getComputedStyle(el).opacity)
  console.log('Chain Offer - Opacity at 0ms:', opacity0ms)

  // Sample at 100ms
  await page.waitForTimeout(100)
  const opacity100ms = await firstStep.evaluate(el => window.getComputedStyle(el).opacity)
  console.log('Chain Offer - Opacity at 100ms:', opacity100ms)

  // Sample at 300ms
  await page.waitForTimeout(200)
  const opacity300ms = await firstStep.evaluate(el => window.getComputedStyle(el).opacity)
  console.log('Chain Offer - Opacity at 300ms:', opacity300ms)

  // Sample at 600ms
  await page.waitForTimeout(300)
  const opacity600ms = await firstStep.evaluate(el => window.getComputedStyle(el).opacity)
  console.log('Chain Offer - Opacity at 600ms:', opacity600ms)

  // Sample at 1000ms
  await page.waitForTimeout(400)
  const opacity1000ms = await firstStep.evaluate(el => window.getComputedStyle(el).opacity)
  console.log('Chain Offer - Opacity at 1000ms:', opacity1000ms)

  // Get full computed style at 1000ms
  const finalStyle = await firstStep.evaluate(el => ({
    opacity: window.getComputedStyle(el).opacity,
    transform: window.getComputedStyle(el).transform,
    visibility: window.getComputedStyle(el).visibility,
    display: window.getComputedStyle(el).display,
  }))
  console.log('Chain Offer - Final computed style:', finalStyle)

  await page.screenshot({
    path: 'e2e/screenshots/chain-offer-timeline-diagnostic.png',
    fullPage: true
  })
})

test('diagnose animation timeline - quest cards', async ({ page }) => {
  await page.goto('/')

  // Select stagger-inview animation
  await page.selectOption('#animation-select', 'stagger-inview')

  // Open questline dialog
  await page.locator('.offer-trigger').nth(1).click()
  await page.waitForSelector('.questline-dialog', { state: 'visible' })

  const firstCard = page.locator('.quest-card').first()

  // Sample opacity at 0ms (immediate)
  const opacity0ms = await firstCard.evaluate(el => window.getComputedStyle(el).opacity)
  console.log('Quest Card - Opacity at 0ms:', opacity0ms)

  // Sample at 100ms
  await page.waitForTimeout(100)
  const opacity100ms = await firstCard.evaluate(el => window.getComputedStyle(el).opacity)
  console.log('Quest Card - Opacity at 100ms:', opacity100ms)

  // Sample at 300ms
  await page.waitForTimeout(200)
  const opacity300ms = await firstCard.evaluate(el => window.getComputedStyle(el).opacity)
  console.log('Quest Card - Opacity at 300ms:', opacity300ms)

  // Sample at 600ms
  await page.waitForTimeout(300)
  const opacity600ms = await firstCard.evaluate(el => window.getComputedStyle(el).opacity)
  console.log('Quest Card - Opacity at 600ms:', opacity600ms)

  // Sample at 1000ms
  await page.waitForTimeout(400)
  const opacity1000ms = await firstCard.evaluate(el => window.getComputedStyle(el).opacity)
  console.log('Quest Card - Opacity at 1000ms:', opacity1000ms)

  // Get full computed style at 1000ms
  const finalStyle = await firstCard.evaluate(el => ({
    opacity: window.getComputedStyle(el).opacity,
    transform: window.getComputedStyle(el).transform,
    visibility: window.getComputedStyle(el).visibility,
    display: window.getComputedStyle(el).display,
  }))
  console.log('Quest Card - Final computed style:', finalStyle)

  // Check the wrapper that has the motion variants
  const motionWrapper = page.locator('.questline-dialog__quests > div').first()
  const wrapperStyle = await motionWrapper.evaluate(el => ({
    opacity: window.getComputedStyle(el).opacity,
    transform: window.getComputedStyle(el).transform,
  }))
  console.log('Quest Card Motion Wrapper - Style:', wrapperStyle)

  await page.screenshot({
    path: 'e2e/screenshots/questline-timeline-diagnostic.png',
    fullPage: true
  })
})
