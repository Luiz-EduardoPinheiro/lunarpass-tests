import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/login.page'
import { NavBar } from '../pages/components/navbar'
import { faker  } from '@faker-js/faker'

test('Deve realizar o cadastro com sucesso de uma missão', async ({ page }) => {
  const loginPage = new LoginPage(page)
  const navBar = new NavBar(page)
  loginPage.acessarLogin()
  loginPage.realizarLogin('buzz@lunarpass.dev', 'pwd123')
  expect(navBar.logout).toBeVisible
  await page.getByRole('link', { name: 'Nova missão' }).click()
  await expect(page.getByRole('heading', { name: 'Programar missão' })).toBeVisible()
  const nomeMissao = 'LP-'+faker.string.alphanumeric({length: {min: 5, max: 5}, casing: 'upper'})
  await page.getByRole('textbox', { name: 'ID da missão' }).fill(nomeMissao)
  await page.getByRole('textbox', { name: 'Foguete' }).fill('Starship')
  await page.getByLabel('Base lunar').selectOption('aurora')
  await page.getByRole('textbox', { name: 'Data de partida' }).fill('2027-01-07')
  await expect(page.getByTestId('mission-form-return-date')).toContainText('14 de jan. de 2027')
  await page.getByRole('spinbutton', { name: 'Preço por passagem (USD)' }).fill('5324.70')
  await page.getByRole('button', { name: 'Salvar missão' }).click()
  await expect(page.getByRole('listitem')).toContainText('A nova missão foi adicionada ao catálogo e já está disponível para reservas.')
})

test('Não deve realizar o cadastro de missão com o nome já existente', async ({page}) =>{

})

test('Não deve realizar o cadastro de missão se não seguir o padrão de criação do nome da missão', async ({ page }) => {

})