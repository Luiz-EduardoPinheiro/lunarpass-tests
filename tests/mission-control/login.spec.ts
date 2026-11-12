import { test, expect } from '../../support/index.ts'

test.beforeEach(async ({app}) => {
    await app.loginPage.acessarLogin()
})

test('Deve realizar autenticação com sucesso', async ({app}) => {
    await app.loginPage.realizarLogin('buzz@lunarpass.dev', 'pwd123')
    await expect(app.navbar.logout).toBeVisible()
})

test('Deve realizar validação dos campos obrigatórios para o login', async ({app}) => {
    await app.loginPage.realizarLogin('', '')
    await expect(app.loginPage.alert).toBeVisible()
    await expect(app.loginPage.alert).toHaveText('Informe um e-mail válido')
    await app.loginPage.realizarLogin('buzz@lunarpass.dev', '')
    await expect(app.loginPage.alert).toBeVisible()
    await expect(app.loginPage.alert).toHaveText('Informe a senha')
})

test('Deve negar a autenticação quando for realizada tentativa de logar com email não cadastrado', async ({app}) => {
    await app.loginPage.realizarLogin('luiz@lunarpass.dev', 'pwd123')
    await expect(app.loginPage.alert).toHaveText('E-mail ou senha inválidos.')
})

test('Deve negar a autenticação quando for informada senha incorreta para o email cadastrado', async ({app}) => {
    await app.loginPage.realizarLogin('buzz@lunarpass.dev', '123pwd')
    await expect(app.loginPage.alert).toHaveText('E-mail ou senha inválidos.')
})