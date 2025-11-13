import { test } from '@playwright/test'

test('check if Framer Motion is loaded and working', async ({ page }) => {
  // Listen for console errors
  const errors: string[] = []
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text())
    }
  })

  await page.goto('/')

  // Check for any console errors
  console.log('Console errors:', errors)

  // Select animation
  await page.selectOption('#animation-select', 'stagger-inview')

  // Open chain offer dialog
  await page.locator('.offer-trigger').first().click()
  await page.waitForSelector('.chain-offer-dialog', { state: 'visible' })

  // Check if motion components exist
  const motionSection = await page.locator('.content').evaluate((el) => {
    // Check if this is a motion component
    const isMotionComponent = el.hasAttribute('data-framer-component')
      || el.getAttribute('data-projection-id')
      || el.style.transform !== ''

    return {
      nodeName: el.nodeName,
      hasDataProjectionId: !!el.getAttribute('data-projection-id'),
      hasDataFramerComponent: el.hasAttribute('data-framer-component'),
      hasInlineTransform: el.style.transform !== '',
      classList: Array.from(el.classList),
      attributeNames: Array.from(el.attributes).map(attr => attr.name),
    }
  })

  console.log('Motion section details:', motionSection)

  // Check first step
  const firstStep = await page.locator('.chain-offer-map-item-wrapper').first().evaluate((el) => {
    return {
      nodeName: el.nodeName,
      hasDataProjectionId: !!el.getAttribute('data-projection-id'),
      hasInlineStyle: !!el.getAttribute('style'),
      inlineStyle: el.getAttribute('style'),
      computedOpacity: window.getComputedStyle(el).opacity,
      computedTransform: window.getComputedStyle(el).transform,
    }
  })

  console.log('First step details:', firstStep)

  // Check if errors were logged after opening dialog
  console.log('Console errors after opening dialog:', errors)
})
