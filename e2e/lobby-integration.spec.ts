import { test, expect } from '@playwright/test'

test.describe('Lobby Integration and Features', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should display Lobby Layout elements', async ({ page }) => {
    // Verify Swimlane exists
    await expect(page.locator('.SwimlaneLayout_iconsSwimlane__ohefI')).toBeVisible()
    
    // Verify QuestLines and ChainOffer icons
    await expect(page.locator('[data-feature-id="quest_lines_107"]')).toBeVisible()
    await expect(page.locator('[data-feature-id="random_rewards_99"]')).toBeVisible()

    // Verify Footer
    await expect(page.locator('footer.styles_root__iAhT_')).toBeVisible()
  })

  test('should toggle Sidebar and change Animation Type', async ({ page }) => {
    const sidebar = page.locator('.sidebar')
    const toggleBtn = page.locator('.hamburger')
    
    // Check initial state (Desktop usually open)
    if (await page.viewportSize()?.width! > 768) {
      await expect(sidebar).toHaveClass(/sidebar--open/)
    } else {
      await expect(sidebar).not.toHaveClass(/sidebar--open/)
      await toggleBtn.click()
      await expect(sidebar).toHaveClass(/sidebar--open/)
    }

    // Select Animation Type
    const animationSelect = page.locator('#animation-select')
    await expect(animationSelect).toBeVisible()
    await animationSelect.selectOption({ value: 'scale-rotate' })
    
    // Verify value change
    await expect(animationSelect).toHaveValue('scale-rotate')
  })

  test('should open and close Chain Offer Dialog with animation', async ({ page }) => {
    // Ensure sidebar is open to select animation (optional but good practice)
    // await page.locator('#animation-select').selectOption('spring-physics')

    const icon = page.locator('[data-feature-id="random_rewards_99"]')
    await icon.click()

    const dialog = page.locator('.chain-offer-dialog')
    await expect(dialog).toBeVisible()

    // Check for animation container or elements
    // The specific animation class might depend on implementation, but we can check for content
    await expect(page.locator('.chain-offer-map-item')).toHaveCount(6) // Assuming 6 items

    // Close
    const closeBtn = page.locator('.chain-offer-dialog__close-button')
    await closeBtn.click()
    await expect(dialog).not.toBeVisible()
  })

  test('should open and close Questline Dialog with animation', async ({ page }) => {
    const icon = page.locator('[data-feature-id="quest_lines_107"]')
    await icon.click()

    const dialog = page.locator('.questline-dialog')
    await expect(dialog).toBeVisible()

    // Check for quest cards
    await expect(page.locator('.quest-card').first()).toBeVisible({ timeout: 2000 }) // Wait for animation

    // Close
    const closeBtn = page.locator('.questline-dialog__close-button')
    await closeBtn.click()
    await expect(dialog).not.toBeVisible()
  })
})
