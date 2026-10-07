import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'

let loginPage: LoginPage

test.beforeEach(async ({page}) => {
    loginPage = new LoginPage(page)
    await loginPage.acessarLogin()
})

test('Deve realizar autenticação com sucesso', async ({}) => {
    await loginPage.realizarLogin('buzz@lunarpass.dev', 'pwd123')
    await loginPage.validarLogin()
})

test('Deve realizar validação dos campos obrigatórios para o login', async ({}) => {
    await loginPage.realizarLogin('', '')
    await expect(loginPage.alert).toBeVisible()
    await expect(loginPage.alert).toHaveText('Informe um e-mail válido')
    await loginPage.realizarLogin('buzz@lunarpass.dev', '')
    await expect(loginPage.alert).toBeVisible()
    await expect(loginPage.alert).toHaveText('Informe a senha')
})

test('Deve negar a autenticação quando for realizada tentativa de logar com email não cadastrado', async ({}) => {
    await loginPage.realizarLogin('luiz@lunarpass.dev', 'pwd123')
    await expect(loginPage.alert).toHaveText('E-mail ou senha inválidos.')
})

test('Deve negar a autenticação quando for informada senha incorreta para o email cadastrado', async ({}) => {
    await loginPage.realizarLogin('buzz@lunarpass.dev', '123pwd')
    await expect(loginPage.alert).toHaveText('E-mail ou senha inválidos.')
})