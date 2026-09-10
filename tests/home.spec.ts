import { test, expect } from '@playwright/test'

test('Deve validar o título na aba do navegador', async ({ page }) => {
  await page.goto('http://localhost:3000/')
  await expect(page).toHaveTitle(/Lunar/)
})

test('Deve exibir o slogan na home page', async ({ page }) => {
  await page.goto('http://localhost:3000/')
  const slogan = page.getByRole('heading', {name:'Sua viagem para a Lua começa aqui.'})
  await expect(slogan).toBeVisible()
})