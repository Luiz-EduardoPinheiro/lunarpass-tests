import { test, expect } from '../../support/index.ts'

test('Deve validar o título na aba do navegador', async ({ app, page }) => {
  await app.store.homePage.acessar()
  await expect(page).toHaveTitle(/Lunar/)
})

test('Deve exibir o slogan na home page', async ({ app }) => {
  await app.store.homePage.acessar()
  await expect(app.store.homePage.slogan).toBeVisible()
})