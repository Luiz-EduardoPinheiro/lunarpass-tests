import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/login.page'
import { DashboardPage } from '../pages/dash.page'
import { RegisterPage } from '../pages/register.page'
import { NavBar } from '../pages/components/navbar'
import { Toast } from '../pages/components/toast'
import { faker  } from '@faker-js/faker'
import { Mission } from '../support/mission'

let loginPage: LoginPage
let dashPage: DashboardPage
let registerPage: RegisterPage
let navBar: NavBar
let toast: Toast


test.beforeEach(async ({page}) => {
  loginPage = new LoginPage(page)
  dashPage = new DashboardPage(page)
  registerPage = new RegisterPage(page)
  navBar = new NavBar(page)
  toast = new Toast(page)
  loginPage.acessarLogin()
  loginPage.realizarLogin('buzz@lunarpass.dev', 'pwd123')
  expect(navBar.logout).toBeVisible({timeout: 10_000})

})

test('Deve realizar o cadastro com sucesso de uma missão', async ({ page }) => {
  const mission: Mission = {
    id: 'LP-'+faker.string.alphanumeric({length: {min: 5, max: 5}, casing: 'upper'}),
    rocket: 'Starship',
    baseLunar: 'aurora',
    departureDate: '2027-01-07',
    returnDate: '14 de jan. de 2027',
    price: '5324.70'
  }

  dashPage.abrirTelacadastro.click()
  await expect(registerPage.tittle).toBeVisible({timeout: 10_000})
  registerPage.submit(mission)
  await expect(toast.message).toContainText('A nova missão foi adicionada ao catálogo e já está disponível para reservas.')

})

test('Não deve realizar o cadastro de missão com o nome já existente', async ({ page }) => {
    const mission: Mission = {
    id: 'LP-0827B',
    rocket: 'Starship',
    baseLunar: 'selene',
    departureDate: '2027-08-22',
    returnDate: '29 de ago. de 2027',
    price: '2309'
  }

  dashPage.abrirTelacadastro.click()
  await expect(registerPage.tittle).toBeVisible({timeout: 10_000})
  registerPage.submit(mission)
  await expect(registerPage.alert).toContainText('Já existe uma missão com este ID.')

})

test('Não deve realizar o cadastro de missão se não seguir o padrão de criação do nome da missão', async ({page}) => {
  const mission: Mission = {
    id: faker.string.alphanumeric({length: {min: 5, max: 5}, casing: 'upper'}),
    rocket: 'Starship',
    baseLunar: 'aurora',
    departureDate: '2027-01-07',
    returnDate: '14 de jan. de 2027',
    price: '5324.70'
  }
  
  dashPage.abrirTelacadastro.click()
  await expect(registerPage.tittle).toBeVisible({timeout: 10_000})
  registerPage.submit(mission)
  await expect(registerPage.alert).toHaveText('Use o formato LP-0000')

})

test('Não deve realizar o cadastro de missão duplicada', async ({page}) => {
    const mission: Mission = {
    id: 'LP-0827B',
    rocket: 'Starship',
    baseLunar: 'aurora',
    departureDate: '2027-01-07',
    returnDate: '14 de jan. de 2027',
    price: '5324.70'
  }
  
  dashPage.abrirTelacadastro.click()
  await expect(registerPage.tittle).toBeVisible({timeout: 10_000})
  registerPage.submit(mission)
  await expect(registerPage.alert).toHaveText('Já existe uma missão com este ID.')

})

test('Deve voltar para a listagem de missões ao desistir do cadastro', async ({page}) => {
  dashPage.abrirTelacadastro.click()
  await registerPage.return.click()
  await expect(navBar.logout).toBeVisible({timeout: 10_000})

})