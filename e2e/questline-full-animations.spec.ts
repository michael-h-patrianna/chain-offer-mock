import { test } from '@playwright/test';

const animations = [
  'stagger-inview',
  'scale-rotate',
  'flip-reveal',
  'spring-physics',
  'fade-slide',
  'none',
];

test('showcase all questline animations', async ({ page }) => {
  await page.goto('/');

  for (const animation of animations) {
    console.log(`\n=== Testing ${animation} ===`);

    // Select animation
    await page.selectOption('#animation-select', animation);

    // Open questline dialog
    await page.locator('.offer-trigger').nth(1).click();
    await page.waitForSelector('.questline-dialog', { state: 'visible' });

    // Wait for animation to complete (longest is ~1.6s)
    await page.waitForTimeout(2000);

    // Check all elements are visible
    const headerImage = await page.locator('.questline-dialog__header-image').isVisible();
    const timer = await page.locator('.questline-dialog__timer').isVisible();
    const description = await page.locator('.questline-dialog__description').isVisible();
    const bonusRewards = await page.locator('.bonus-rewards').isVisible();
    const progressBar = await page.locator('.milestone-progress-bar').isVisible();
    const questCards = await page.locator('.quest-card').count();
    const footer = await page.locator('.questline-dialog__footer').isVisible();

    console.log(`${animation}:`);
    console.log(`  Header image visible: ${headerImage}`);
    console.log(`  Timer visible: ${timer}`);
    console.log(`  Description visible: ${description}`);
    console.log(`  Bonus rewards visible: ${bonusRewards}`);
    console.log(`  Progress bar visible: ${progressBar}`);
    console.log(`  Quest cards count: ${questCards}`);
    console.log(`  Footer visible: ${footer}`);

    // Get opacity of first quest card wrapper to verify animation completed
    const firstCardWrapper = await page
      .locator('.questline-dialog__quests > div')
      .first()
      .evaluate((el) => window.getComputedStyle(el).opacity);
    console.log(`  First card wrapper opacity: ${firstCardWrapper}`);

    // Take screenshot
    await page.screenshot({
      path: `e2e/screenshots/questline-${animation}.png`,
      fullPage: true,
    });

    // Close dialog
    await page.locator('.questline-dialog__close-button').click();
    await page.waitForTimeout(500);
  }
});
