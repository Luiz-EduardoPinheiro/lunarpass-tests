import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/login.page'
import { DashboardPage } from '../pages/dash.page'
import { RegisterPage } from '../pages/register.page'
import { NavBar } from '../pages/components/navbar'
import { Toast } from '../pages/components/toast'
import { faker } from '@faker-js/faker'
import { Mission } from '../support/types'
import { clearAndInsertMission, clearMission } from '../support/db'

let loginPage: LoginPage
let dashPage: DashboardPage
let registerPage: RegisterPage
let navBar: NavBar
let toast: Toast


test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page)
  dashPage = new DashboardPage(page)
  registerPage = new RegisterPage(page)
  navBar = new NavBar(page)
  toast = new Toast(page)
  await loginPage.acessarLogin()
  await loginPage.realizarLogin('buzz@lunarpass.dev', 'pwd123')
  await expect(navBar.logout).toBeVisible({ timeout: 20_000 })

})

test('Deve realizar o cadastro com sucesso de uma missão', async ({ page }) => {
  const mission: Mission = {
    id: 'LP-0827A',
    rocket: 'Starship',
    baseId: 'aurora',
    departureDate: '2027-01-07',
    returnDate: '2027-01-14',
    price: 1284.99
  }
  await clearMission(mission)
  await dashPage.abrirTelacadastro.click()
  await expect(registerPage.tittle).toBeVisible({ timeout: 10_000 })
  await registerPage.submit(mission)
  await expect(toast.message).toContainText('A nova missão foi adicionada ao catálogo e já está disponível para reservas.')

})

test('Não deve realizar o cadastro de missão com o nome já existente', async ({ page }) => {
  const mission: Mission = {
    id: 'LP-0827B',
    rocket: 'Starship',
    baseId: 'selene',
    departureDate: '2027-08-12',
    returnDate: '2027-08-19',
    price: 5324.71
  }

  await clearAndInsertMission(mission)
  await dashPage.abrirTelacadastro.click()
  await expect(registerPage.tittle).toBeVisible({ timeout: 10_000 })
  await registerPage.submit(mission)
  await expect(registerPage.alert).toContainText('Já existe uma missão com este ID.')

})

test('Não deve realizar o cadastro de missão se não seguir o padrão de criação do nome da missão', async ({ page }) => {
  const mission: Mission = {
    id: faker.string.alphanumeric({ length: { min: 5, max: 5 }, casing: 'upper' }),
    rocket: 'Starship',
    baseId: 'aurora',
    departureDate: '2027-01-07',
    returnDate: '2027-01-14',
    price: 5324.21
  }

  await dashPage.abrirTelacadastro.click()
  await expect(registerPage.tittle).toBeVisible({ timeout: 10_000 })
  await registerPage.submit(mission)
  await expect(registerPage.alert).toHaveText('Use o formato LP-0000')

})


test('Deve voltar para a listagem de missões ao desistir do cadastro', async ({ page }) => {
  await dashPage.abrirTelacadastro.click()
  await registerPage.return.click()
  await expect(navBar.logout).toBeVisible({ timeout: 10_000 })

})