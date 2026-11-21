import { test, expect } from '../../support/index.ts'

test.beforeEach(async ({app}) => {
    await app.mission.loginPage.acessarLogin()
})

test('Deve realizar autenticação com sucesso', async ({app}) => {
    await app.mission.loginPage.realizarLogin('buzz@lunarpass.dev', 'pwd123')
    await expect(app.mission.navbar.logout).toBeVisible({timeout: 10_000})
})

test('Deve realizar validação dos campos obrigatórios para o login', async ({app}) => {
    await app.mission.loginPage.realizarLogin('', '')
    await expect(app.mission.loginPage.alert).toBeVisible()
    await expect(app.mission.loginPage.alert).toHaveText('Informe um e-mail válido')
    await app.mission.loginPage.realizarLogin('buzz@lunarpass.dev', '')
    await expect(app.mission.loginPage.alert).toBeVisible()
    await expect(app.mission.loginPage.alert).toHaveText('Informe a senha')
})

test('Deve negar a autenticação quando for realizada tentativa de logar com email não cadastrado', async ({app}) => {
    await app.mission.loginPage.realizarLogin('luiz@lunarpass.dev', 'pwd123')
    await expect(app.mission.loginPage.alert).toHaveText('E-mail ou senha inválidos.')
})

test('Deve negar a autenticação quando for informada senha incorreta para o email cadastrado', async ({app}) => {
    await app.mission.loginPage.realizarLogin('buzz@lunarpass.dev', '123pwd')
    await expect(app.mission.loginPage.alert).toHaveText('E-mail ou senha inválidos.')
})