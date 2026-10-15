import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/login.page'
import { DashboardPage } from '../pages/dash.page'
import { RegisterPage } from '../pages/register.page'
import { NavBar } from '../pages/components/navbar'
import { Toast } from '../pages/components/toast'
import { faker  } from '@faker-js/faker'
import { Mission } from '../support/mission'

test('Deve realizar o cadastro com sucesso de uma missão', async ({ page }) => {
  const mission: Mission = {
    id: 'LP-'+faker.string.alphanumeric({length: {min: 5, max: 5}, casing: 'upper'}),
    rocket: 'Starship',
    baseLunar: 'aurora',
    departureDate: '2027-01-07',
    returnDate: '14 de jan. de 2027',
    price: '5324.70'
  }
  const loginPage = new LoginPage(page)
  const dashPage = new DashboardPage(page)
  const registerPage = new RegisterPage(page)
  const navBar = new NavBar(page)
  const toast = new Toast(page)
  loginPage.acessarLogin()
  loginPage.realizarLogin('buzz@lunarpass.dev', 'pwd123')
  expect(navBar.logout).toBeVisible
  dashPage.abrirTelacadastro.click()
  await expect(registerPage.tittle).toBeVisible()
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
    price: '1000,00'
  }
  const loginPage = new LoginPage(page)
  const dashPage = new DashboardPage(page)
  const registerPage = new RegisterPage(page)
  const navBar = new NavBar(page)
  const toast = new Toast(page)
  loginPage.acessarLogin()
  loginPage.realizarLogin('buzz@lunarpass.dev', 'pwd123')
  expect(navBar.logout).toBeVisible
  dashPage.abrirTelacadastro.click()
  await expect(registerPage.tittle).toBeVisible()
  registerPage.submit(mission)
  await expect(toast.message).toContainText('Já existe uma missão com este ID.')

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
  const loginPage = new LoginPage(page)
  const dashPage = new DashboardPage(page)
  const registerPage = new RegisterPage(page)
  const navBar = new NavBar(page)
  loginPage.acessarLogin()
  loginPage.realizarLogin('buzz@lunarpass.dev', 'pwd123')
  expect(navBar.logout).toBeVisible
  dashPage.abrirTelacadastro.click()
  await expect(registerPage.tittle).toBeVisible()
  registerPage.submit(mission)
  await expect(registerPage.alert).toContainText('Use o formato LP-0000')

})