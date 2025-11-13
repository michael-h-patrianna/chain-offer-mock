import { test } from '@playwright/test'

test('verify questline element alignment', async ({ page }) => {
  await page.goto('/')

  // Select an animation
  await page.selectOption('#animation-select', 'stagger-inview')

  // Open questline dialog
  await page.locator('.offer-trigger').nth(1).click()
  await page.waitForSelector('.questline-dialog', { state: 'visible' })

  // Wait for animations to complete
  await page.waitForTimeout(2000)

  // Measure the left and right edges of each element
  const bonusRewardsBox = await page.locator('.bonus-rewards').boundingBox()
  const progressBarBox = await page.locator('.milestone-progress').boundingBox()
  const questsContainerBox = await page.locator('.questline-dialog__quests').boundingBox()
  const firstQuestCardBox = await page.locator('.quest-card').first().boundingBox()

  console.log('Bonus Rewards:', {
    left: bonusRewardsBox?.x,
    right: bonusRewardsBox ? bonusRewardsBox.x + bonusRewardsBox.width : null,
    width: bonusRewardsBox?.width
  })

  console.log('Progress Bar:', {
    left: progressBarBox?.x,
    right: progressBarBox ? progressBarBox.x + progressBarBox.width : null,
    width: progressBarBox?.width
  })

  console.log('Quests Container:', {
    left: questsContainerBox?.x,
    right: questsContainerBox ? questsContainerBox.x + questsContainerBox.width : null,
    width: questsContainerBox?.width
  })

  console.log('First Quest Card:', {
    left: firstQuestCardBox?.x,
    right: firstQuestCardBox ? firstQuestCardBox.x + firstQuestCardBox.width : null,
    width: firstQuestCardBox?.width
  })

  // Take screenshot for visual verification
  await page.screenshot({
    path: 'e2e/screenshots/questline-alignment-check.png',
    fullPage: true
  })
})
