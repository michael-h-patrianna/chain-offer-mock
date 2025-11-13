import { test, expect } from '@playwright/test'

test.describe('Chain Offer and Questline Dialogs', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should display animation selector', async ({ page }) => {
    // Check that animation selector is visible
    const selector = page.locator('#animation-select')
    await expect(selector).toBeVisible()

    // Check that it has animation options
    const options = await selector.locator('option').count()
    expect(options).toBeGreaterThan(4) // Should have at least 5 animation types
  })

  test('should display Chain Offer dialog with steps', async ({ page }) => {
    // Select an animation type
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
    await page.screenshot({ path: 'e2e/screenshots/chain-offer-dialog.png', fullPage: true })

    // Check that at least one step has rewards
    const rewards = page.locator('.chain-offer-map-item__offers').first()
    await expect(rewards).toBeVisible()
  })

  test('should display Questline dialog with quest cards', async ({ page }) => {
    // Select an animation type
    await page.selectOption('#animation-select', 'stagger-inview')

    // Click on Questline icon
    const questlineIcon = page.locator('.offer-trigger').nth(1)
    await questlineIcon.click()

    // Wait for dialog to open
    await page.waitForSelector('.questline-dialog', { state: 'visible' })

    // Check that dialog is visible
    const dialog = page.locator('.questline-dialog')
    await expect(dialog).toBeVisible()

    // Wait for animations to complete
    await page.waitForTimeout(1000)

    // Check that quest cards are rendered
    const questCards = page.locator('.quest-card')
    const cardCount = await questCards.count()
    console.log(`Found ${cardCount} quest cards`)
    expect(cardCount).toBeGreaterThan(0)

    // Take a screenshot for verification
    await page.screenshot({ path: 'e2e/screenshots/questline-dialog.png', fullPage: true })

    // Check that quest cards have titles
    const firstCardTitle = page.locator('.quest-card__title').first()
    await expect(firstCardTitle).toBeVisible()
  })

  test('should test different animation types on Chain Offer', async ({ page }) => {
    const animations = ['stagger-inview', 'scale-rotate', 'flip-reveal', 'spring-physics', 'fade-slide']

    for (const animation of animations) {
      // Select animation
      await page.selectOption('#animation-select', animation)

      // Open Chain Offer dialog
      const chainOfferIcon = page.locator('.offer-trigger').first()
      await chainOfferIcon.click()

      // Wait for dialog
      await page.waitForSelector('.chain-offer-dialog', { state: 'visible' })

      // Verify steps are visible
      const steps = page.locator('.chain-offer-map-item')
      const stepCount = await steps.count()
      console.log(`Animation: ${animation} - Found ${stepCount} steps`)
      expect(stepCount).toBeGreaterThan(0)

      // Close dialog
      await page.locator('.chain-offer-dialog__close-button').click()
      await page.waitForTimeout(500)
    }
  })

  test('should test different animation types on Questline', async ({ page }) => {
    const animations = ['stagger-inview', 'scale-rotate', 'spring-physics']

    for (const animation of animations) {
      // Select animation
      await page.selectOption('#animation-select', animation)

      // Open Questline dialog
      const questlineIcon = page.locator('.offer-trigger').nth(1)
      await questlineIcon.click()

      // Wait for dialog
      await page.waitForSelector('.questline-dialog', { state: 'visible' })

      // Verify quest cards are visible
      const cards = page.locator('.quest-card')
      const cardCount = await cards.count()
      console.log(`Animation: ${animation} - Found ${cardCount} quest cards`)
      expect(cardCount).toBeGreaterThan(0)

      // Close dialog
      await page.locator('.questline-dialog__close-button').click()
      await page.waitForTimeout(500)
    }
  })
})
