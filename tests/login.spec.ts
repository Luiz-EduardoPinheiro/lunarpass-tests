import { test, expect } from '@playwright/test'

test('Deve realizar autenticação com sucesso', async ({ page }) => {
    await page.goto('http://localhost:3000/mission-control/login')
    const texto = page.getByRole('heading', {name: 'Mission Control'})
    await expect(texto).toBeVisible()

    await page.getByLabel('E-mail').fill('buzz@lunarpass.dev')
    await page.getByLabel('Senha').fill('pwd123')

    await page.getByRole('button', {name: 'Entrar'}).click()

    const btnSair = page.getByRole('button', {name: 'Sair'})
    await expect(btnSair).toBeVisible()
})