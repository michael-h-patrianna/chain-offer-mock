import { test } from '@playwright/test';

test('debug quest card animation states', async ({ page }) => {
  await page.goto('/');

  await page.selectOption('#animation-select', 'stagger-inview');
  await page.locator('.offer-trigger').nth(1).click();
  await page.waitForSelector('.questline-dialog', { state: 'visible' });

  // Check container
  const container = page.locator('.questline-dialog__quests');
  const containerClasses = await container.getAttribute('class');
  const containerStyle = await container.evaluate((el) => ({
    display: window.getComputedStyle(el).display,
    opacity: window.getComputedStyle(el).opacity,
    visibility: window.getComputedStyle(el).visibility,
  }));
  console.log('Container classes:', containerClasses);
  console.log('Container style:', containerStyle);

  // Check first quest card
  const firstCard = page.locator('.quest-card').first();
  const cardExists = await firstCard.count();
  console.log('Quest cards found:', cardExists);

  if (cardExists > 0) {
    const cardStyle = await firstCard.evaluate((el) => ({
      opacity: window.getComputedStyle(el).opacity,
      transform: window.getComputedStyle(el).transform,
      visibility: window.getComputedStyle(el).visibility,
      display: window.getComputedStyle(el).display,
    }));
    console.log('First card computed style:', cardStyle);

    // Check inline styles
    const inlineStyle = await firstCard.getAttribute('style');
    console.log('First card inline style:', inlineStyle);
  }

  await page.screenshot({ path: 'e2e/screenshots/debug-quest-animation.png', fullPage: true });
});
