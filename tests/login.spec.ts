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

test('Deve realizar validação dos campos obrigatórios', async ({ page }) => {
    await page.goto('http://localhost:3000/mission-control/login')
    const texto = page.getByRole('heading', {name: 'Mission Control'})
    await expect(texto).toBeVisible()
    await page.getByRole('button', {name: 'Entrar'}).click()
    const msgEmail = page.getByText('Informe um e-mail válido')
    await expect(msgEmail).toBeVisible()
    await expect(msgEmail).toHaveText('Informe um e-mail válido')
    await page.getByLabel('E-mail').fill('buzz@lunarpass.dev')
    await page.getByRole('button', {name: 'Entrar'}).click()
    const msgSenha = page.getByText('Informe a senha')
    await expect(msgSenha).toBeVisible()
    await expect(msgSenha).toHaveText('Informe a senha')

})

test('Deve negar autenticação quando for informada email inválido', async ({ page }) => {

})

test('Deve negar autenticação quando for informada senha incorreta', async ({ page }) => {
    
})