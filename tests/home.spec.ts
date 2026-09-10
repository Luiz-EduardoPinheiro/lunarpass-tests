import { test, expect } from '@playwright/test'

test('Deve exibir o slogan na aba do navegador', async ({ page }) => {
  await page.goto('http://localhost:3000/')
  await expect(page).toHaveTitle(/Lunar/)
})