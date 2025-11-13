import { test } from '@playwright/test'

test('debug dialog opening', async ({ page }) => {
  const errors: string[] = []

  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('ERROR:', msg.text())
      errors.push(msg.text())
    }
  })

  await page.goto('/')
  await page.waitForTimeout(1000)

  console.log('Looking for offer triggers...')
  const triggers = await page.locator('.offer-trigger').count()
  console.log('Found triggers:', triggers)

  if (triggers > 0) {
    console.log('Clicking first trigger...')
    await page.locator('.offer-trigger').first().click()

    await page.waitForTimeout(1000)

    // Check if dialog exists in DOM
    const dialogCount = await page.locator('.chain-offer-dialog').count()
    console.log('Chain offer dialogs in DOM:', dialogCount)

    if (dialogCount > 0) {
      const isVisible = await page.locator('.chain-offer-dialog').isVisible()
      console.log('Dialog visible:', isVisible)

      const dialogStyle = await page.locator('.chain-offer-dialog').evaluate(el => ({
        display: window.getComputedStyle(el).display,
        visibility: window.getComputedStyle(el).visibility,
        opacity: window.getComputedStyle(el).opacity,
      }))
      console.log('Dialog computed style:', dialogStyle)
    }
  }

  console.log('Errors:', errors)
  await page.screenshot({ path: 'e2e/screenshots/debug-click.png', fullPage: true })
})
