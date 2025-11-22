import { test } from '@playwright/test';

const animations = [
  'stagger-inview',
  'scale-rotate',
  'flip-reveal',
  'spring-physics',
  'fade-slide',
  'none',
];

test('showcase all chain offer animations', async ({ page }) => {
  await page.goto('/');

  for (const animation of animations) {
    console.log(`\n=== Testing ${animation} ===`);

    // Select animation
    await page.selectOption('#animation-select', animation);

    // Open chain offer dialog
    await page.locator('.offer-trigger').first().click();
    await page.waitForSelector('.chain-offer-dialog', { state: 'visible' });

    // Wait for animation to complete (longest is ~1.5s)
    await page.waitForTimeout(2000);

    // Check all elements are visible
    const headerImage = await page.locator('.chain-offer-header__image').isVisible();
    const timer = await page.locator('.chain-offer-header__timer').isVisible();
    const steps = await page.locator('.chain-offer-map-item-wrapper').count();
    const footer = await page.locator('.chain-offer-dialog__footer').isVisible();

    console.log(`${animation}:`);
    console.log(`  Header image visible: ${headerImage}`);
    console.log(`  Timer visible: ${timer}`);
    console.log(`  Steps count: ${steps}`);
    console.log(`  Footer visible: ${footer}`);

    // Get opacity of first step to verify animation completed
    const firstStepOpacity = await page
      .locator('.chain-offer-map-item-wrapper')
      .first()
      .evaluate((el) => window.getComputedStyle(el).opacity);
    console.log(`  First step opacity: ${firstStepOpacity}`);

    // Take screenshot
    await page.screenshot({
      path: `e2e/screenshots/chain-offer-${animation}.png`,
      fullPage: true,
    });

    // Close dialog
    await page.locator('.chain-offer-dialog__close-button').click();
    await page.waitForTimeout(500);
  }
});
