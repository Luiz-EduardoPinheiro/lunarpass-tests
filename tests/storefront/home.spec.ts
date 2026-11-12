import { test, expect } from '@playwright/test'
import { HomePage } from '../../pages/storefront/home.page'

test('Deve validar o título na aba do navegador', async ({ page }) => {
  const homePage = new HomePage(page)
  await homePage.acessar()
  await expect(page).toHaveTitle(/Lunar/)
})

test('Deve exibir o slogan na home page', async ({ page }) => {
  const homePage = new HomePage(page)
  await homePage.acessar()
  await expect(homePage.slogan).toBeVisible()
})