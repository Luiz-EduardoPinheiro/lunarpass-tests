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
    const alerta = page.getByRole('alert')
    await expect(alerta).toBeVisible()
    await expect(alerta).toHaveText('Informe um e-mail válido')
    await page.getByLabel('E-mail').fill('buzz@lunarpass.dev')
    await page.getByRole('button', {name: 'Entrar'}).click()
    await expect(alerta).toBeVisible()
    await expect(alerta).toHaveText('Informe a senha')

})

test('Deve negar a autenticação quando for informado email não cadastrado', async ({ page }) => {
    await page.goto('http://localhost:3000/mission-control/login')
    const texto = page.getByRole('heading', {name: 'Mission Control'})
    await expect(texto).toBeVisible()
    await page.getByLabel('E-mail').fill('luiz@lunarpass.dev')
    await page.getByLabel('Senha').fill('pwd123')
    await page.getByRole('button', {name: 'Entrar'}).click()
    const alerta = page.getByRole('alert')
    await expect(alerta).toHaveText('E-mail ou senha inválidos.')
})

test('Deve negar a autenticação quando for informada senha incorreta para o email cadastrado', async ({ page }) => {
    
})