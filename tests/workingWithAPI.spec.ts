import { test, expect } from '@playwright/test';
import tags from '../test-data/tags.json'

test.beforeEach(async ({ page }) => {
  // To mock the API response we need to route it before we actually load the page
  // Using the "route" method we can mock the API and then using the callback function we can send the updated response to the API endpoint
  await page.route('*/**/api/tags', async route => {
    // We use the "fulfill" method to post the API response
    await route.fulfill({
      // We will be updating the body of our API and using "stringify" method to convert JSON to string
      body: JSON.stringify(tags)
    })
  })

  await page.route('*/**/api/articles?limit=10&offset=0', async route => {
    const response = await route.fetch()
    const responseBody = await response.json()

  })

  await page.goto('https://conduit.bondaracademy.com/')
});

test('Has title text', async ({ page }) => {
  await expect(page.locator('.navbar-brand')).toHaveText('conduit')
  await page.waitForTimeout(2000)
});

