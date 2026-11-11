import { test, expect } from '../support/index.ts'
import { faker } from '@faker-js/faker'
import { Mission } from '../support/types'
import { clearAndInsertMission, clearMission } from '../support/db'


test.beforeEach(async ({ app }) => {
  await app.loginPage.acessarLogin()
  await app.loginPage.realizarLogin('buzz@lunarpass.dev', 'pwd123')
  await expect(app.navbar.logout).toBeVisible({ timeout: 20_000 })

})

test('Deve realizar o cadastro com sucesso de uma missão', async ({ app }) => {
  const mission: Mission = {
    id: 'LP-0827A',
    rocket: 'Starship',
    baseId: 'aurora',
    departureDate: '2027-01-07',
    returnDate: '2027-01-14',
    price: 1284.99
  }
  await clearMission(mission)
  await app.dashPage.abrirTelacadastro.click()
  await expect(app.registerPage.tittle).toBeVisible({ timeout: 10_000 })
  await app.registerPage.submit(mission)
  await expect(app.toast.message).toContainText('A nova missão foi adicionada ao catálogo e já está disponível para reservas.')

})

test('Não deve realizar o cadastro de missão com o nome já existente', async ({ app }) => {
  const mission: Mission = {
    id: 'LP-0827B',
    rocket: 'Starship',
    baseId: 'selene',
    departureDate: '2027-08-12',
    returnDate: '2027-08-19',
    price: 5324.71
  }

  await clearAndInsertMission(mission)
  await app.dashPage.abrirTelacadastro.click()
  await expect(app.registerPage.tittle).toBeVisible({ timeout: 10_000 })
  await app.registerPage.submit(mission)
  await expect(app.registerPage.alert).toContainText('Já existe uma missão com este ID.')

})

test('Não deve realizar o cadastro de missão se não seguir o padrão de criação do nome da missão', async ({ app }) => {
  const mission: Mission = {
    id: faker.string.alphanumeric({ length: { min: 5, max: 5 }, casing: 'upper' }),
    rocket: 'Starship',
    baseId: 'aurora',
    departureDate: '2027-01-07',
    returnDate: '2027-01-14',
    price: 5324.21
  }

  await app.dashPage.abrirTelacadastro.click()
  await expect(app.registerPage.tittle).toBeVisible({ timeout: 10_000 })
  await app.registerPage.submit(mission)
  await expect(app.registerPage.alert).toHaveText('Use o formato LP-0000')

})


test('Deve voltar para a listagem de missões ao desistir do cadastro', async ({ app }) => {
  await app.dashPage.abrirTelacadastro.click()
  await app.registerPage.return.click()
  await expect(app.navbar.logout).toBeVisible({ timeout: 10_000 })

})