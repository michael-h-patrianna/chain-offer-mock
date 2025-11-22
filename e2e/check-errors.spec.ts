import { test } from '@playwright/test';

test('check for console errors', async ({ page }) => {
  const errors: string[] = [];
  const logs: string[] = [];

  page.on('console', (msg) => {
    const type = msg.type();
    const text = msg.text();
    if (type === 'error') {
      errors.push(text);
      console.log('ERROR:', text);
    } else {
      logs.push(`${type}: ${text}`);
      console.log(`${type}:`, text);
    }
  });

  page.on('pageerror', (error) => {
    console.log('PAGE ERROR:', error.message);
    errors.push(`PAGE ERROR: ${error.message}`);
  });

  await page.goto('/');

  // Wait a bit for any errors to appear
  await page.waitForTimeout(2000);

  console.log('\n=== ALL ERRORS ===');
  errors.forEach((err) => console.log(err));

  console.log('\n=== PAGE CONTENT ===');
  const bodyText = await page.locator('body').textContent();
  console.log('Body text:', bodyText);

  const html = await page.content();
  console.log('HTML length:', html.length);

  await page.screenshot({ path: 'e2e/screenshots/error-check.png', fullPage: true });
});
