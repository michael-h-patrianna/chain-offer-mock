import { test, expect } from '@playwright/test'

test.describe('Visual Verification', () => {
  test('verify chain offer steps are actually visible', async ({ page }) => {
    await page.goto('/')

    // Select stagger animation
    await page.selectOption('#animation-select', 'stagger-inview')

    // Open Chain Offer dialog
    await page.locator('.offer-trigger').first().click()
    await page.waitForSelector('.chain-offer-dialog', { state: 'visible' })

    // Wait for animations to complete
    await page.waitForTimeout(1500)

    // Take screenshot
    await page.screenshot({ path: 'e2e/screenshots/chain-offer-visual-check.png', fullPage: true })

    // Check first step is visible
    const firstStep = page.locator('.chain-offer-map-item').first()
    await expect(firstStep).toBeVisible()

    // Check computed style has opacity 1
    const opacity = await firstStep.evaluate(el => window.getComputedStyle(el).opacity)
    console.log(`First step opacity: ${opacity}`)
    expect(parseFloat(opacity)).toBeGreaterThan(0.9)

    // Check rewards are visible
    const rewards = page.locator('.chain-offer-map-item__offers').first()
    await expect(rewards).toBeVisible()
    const rewardsOpacity = await rewards.evaluate(el => window.getComputedStyle(el).opacity)
    console.log(`Rewards opacity: ${rewardsOpacity}`)
  })

  test('verify quest cards are actually visible', async ({ page }) => {
    await page.goto('/')

    // Select stagger animation
    await page.selectOption('#animation-select', 'stagger-inview')

    // Open Questline dialog
    await page.locator('.offer-trigger').nth(1).click()
    await page.waitForSelector('.questline-dialog', { state: 'visible' })

    // Wait for animations to complete
    await page.waitForTimeout(1500)

    // Take screenshot
    await page.screenshot({ path: 'e2e/screenshots/questline-visual-check.png', fullPage: true })

    // Check first quest card is visible
    const firstCard = page.locator('.quest-card').first()
    await expect(firstCard).toBeVisible()

    // Check computed style has opacity 1
    const opacity = await firstCard.evaluate(el => window.getComputedStyle(el).opacity)
    console.log(`First card opacity: ${opacity}`)
    expect(parseFloat(opacity)).toBeGreaterThan(0.9)

    // Check quest title is visible
    const title = page.locator('.quest-card__title').first()
    await expect(title).toBeVisible()
    const titleOpacity = await title.evaluate(el => window.getComputedStyle(el).opacity)
    console.log(`Title opacity: ${titleOpacity}`)
  })
})
