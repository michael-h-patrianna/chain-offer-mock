// dump-dom.mjs  (or .js if "type": "module" in package.json)
import { chromium } from 'playwright'

async function main() {
  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage()

  try {
    await page.goto('https://www.playfame.com/lobby', {
      waitUntil: 'domcontentloaded',
      timeout: 60000,
    })
    // Try to wait for network idle to let React hydrate, but proceed if it times out
    try {
      await page.waitForLoadState('networkidle', { timeout: 30000 })
    } catch (e) {
      console.warn('Network idle timeout, dumping current state anyway')
    }
  } catch (e) {
    console.error('Navigation failed:', e)
    await browser.close()
    process.exit(1)
  }

  const html = await page.content()
  console.log(html)

  await browser.close()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
