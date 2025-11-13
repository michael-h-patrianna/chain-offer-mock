import { test } from '@playwright/test'

test('verify questline element widths are correct', async ({ page }) => {
  await page.goto('/')

  // Select an animation
  await page.selectOption('#animation-select', 'stagger-inview')

  // Open questline dialog
  await page.locator('.offer-trigger').nth(1).click()
  await page.waitForSelector('.questline-dialog', { state: 'visible' })

  // Wait for animations to complete
  await page.waitForTimeout(2000)

  // Check widths of key elements
  const bonusRewardsWidth = await page.locator('.bonus-rewards').evaluate(el => {
    const style = window.getComputedStyle(el)
    return {
      width: style.width,
      parentWidth: window.getComputedStyle(el.parentElement!).width
    }
  })

  const progressBarWidth = await page.locator('.milestone-progress').evaluate(el => {
    const style = window.getComputedStyle(el)
    return {
      width: style.width,
      parentWidth: window.getComputedStyle(el.parentElement!).width
    }
  })

  const progressBarInnerWidth = await page.locator('.milestone-progress__bar').evaluate(el => {
    return window.getComputedStyle(el).width
  })

  console.log('Bonus Rewards:', bonusRewardsWidth)
  console.log('Progress Bar Container:', progressBarWidth)
  console.log('Progress Bar Inner:', progressBarInnerWidth)

  // Take screenshot for visual verification
  await page.screenshot({
    path: 'e2e/screenshots/questline-width-verification.png',
    fullPage: true
  })
})
