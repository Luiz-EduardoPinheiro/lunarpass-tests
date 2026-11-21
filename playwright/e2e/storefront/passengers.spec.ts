import { test, expect } from '../../support/index.ts'
import { Mission } from '../../support/types.ts'
import { clearAndInsertMission } from '../../support/db.ts'

const NOME_30 = 'Nome Com Trinta Caracteres Para'
const NOME_3 = 'Ana'
const NOME_120 = 'A'.repeat(120)
const NOME_2 = 'AB'
const NOME_121 = 'A'.repeat(121)

const PASS_5 = 'PASS1'
const PASS_30 = 'P'.repeat(30)
const PASS_15 = 'PASS12345678901'
const PASS_4 = 'PASS'
const PASS_31 = 'P'.repeat(31)

test('Aceitar nome com 3 caracteres e passaporte com 5 caracteres (mínimos válidos)', async ({ app }) => {
  const mission: Mission = {
    id: 'LP-3001A',
    rocket: 'Starship',
    baseId: 'orion',
    departureDate: '2027-08-01',
    returnDate: '2027-08-08',
    price: 1000.00
  }

  await clearAndInsertMission(mission)
  await app.store.bookingPage.acessar(mission.id)
  await app.store.bookingPage.selecionarAssento('A1')
  await app.store.bookingPage.continuar()

  await expect(app.store.bookingPage.etapaPassageiros).toBeVisible()

  await app.store.bookingPage.preencherPassageiro(NOME_3, PASS_5)
  await app.store.bookingPage.irParaPagamento()

  await expect(app.store.bookingPage.etapaPagamento).toBeVisible()
})

test('Aceitar nome com 120 caracteres e passaporte com 30 caracteres (máximos válidos)', async ({ app }) => {
  const mission: Mission = {
    id: 'LP-3001B',
    rocket: 'Starship',
    baseId: 'orion',
    departureDate: '2027-08-10',
    returnDate: '2027-08-17',
    price: 1000.00
  }

  await clearAndInsertMission(mission)
  await app.store.bookingPage.acessar(mission.id)
  await app.store.bookingPage.selecionarAssento('A1')
  await app.store.bookingPage.continuar()

  await expect(app.store.bookingPage.etapaPassageiros).toBeVisible()

  await app.store.bookingPage.preencherPassageiro(NOME_120, PASS_30)
  await app.store.bookingPage.irParaPagamento()

  await expect(app.store.bookingPage.etapaPagamento).toBeVisible()
})

test('Recusar nome com 2 caracteres (abaixo do limite mínimo)', async ({ app }) => {
  const mission: Mission = {
    id: 'LP-3001C',
    rocket: 'Starship',
    baseId: 'orion',
    departureDate: '2027-08-20',
    returnDate: '2027-08-27',
    price: 1000.00
  }

  await clearAndInsertMission(mission)
  await app.store.bookingPage.acessar(mission.id)
  await app.store.bookingPage.selecionarAssento('A1')
  await app.store.bookingPage.continuar()

  await expect(app.store.bookingPage.etapaPassageiros).toBeVisible()

  await app.store.bookingPage.preencherPassageiro(NOME_2, PASS_15)
  await app.store.bookingPage.irParaPagamento()

  await expect(app.store.bookingPage.etapaPagamento).not.toBeVisible()
  await expect(app.store.bookingPage.obterErroPassageiro()).toHaveText('O nome deve ter pelo menos 3 caracteres')
  await expect(app.store.bookingPage.nomeCampo).toBeFocused()
})

test('Recusar nome com 121 caracteres (acima do limite máximo)', async ({ app }) => {
  const mission: Mission = {
    id: 'LP-3001D',
    rocket: 'Starship',
    baseId: 'orion',
    departureDate: '2027-09-01',
    returnDate: '2027-09-08',
    price: 1000.00
  }

  await clearAndInsertMission(mission)
  await app.store.bookingPage.acessar(mission.id)
  await app.store.bookingPage.selecionarAssento('A1')
  await app.store.bookingPage.continuar()

  await expect(app.store.bookingPage.etapaPassageiros).toBeVisible()

  await app.store.bookingPage.preencherPassageiro(NOME_121, PASS_15)
  await app.store.bookingPage.irParaPagamento()

  await expect(app.store.bookingPage.etapaPagamento).not.toBeVisible()
  await expect(app.store.bookingPage.obterErroPassageiro()).toHaveText('O nome deve ter no máximo 120 caracteres')
  await expect(app.store.bookingPage.nomeCampo).toBeFocused()
})

test('Recusar passaporte com 4 caracteres (abaixo do limite mínimo)', async ({ app }) => {
  const mission: Mission = {
    id: 'LP-3001E',
    rocket: 'Starship',
    baseId: 'orion',
    departureDate: '2027-09-10',
    returnDate: '2027-09-17',
    price: 1000.00
  }

  await clearAndInsertMission(mission)
  await app.store.bookingPage.acessar(mission.id)
  await app.store.bookingPage.selecionarAssento('A1')
  await app.store.bookingPage.continuar()

  await expect(app.store.bookingPage.etapaPassageiros).toBeVisible()

  await app.store.bookingPage.preencherPassageiro(NOME_30, PASS_4)
  await app.store.bookingPage.irParaPagamento()

  await expect(app.store.bookingPage.etapaPagamento).not.toBeVisible()
  await expect(app.store.bookingPage.obterErroPassageiro()).toHaveText('O passaporte deve ter pelo menos 5 caracteres')
  await expect(app.store.bookingPage.passaporteCampo).toBeFocused()
})

test('Recusar passaporte com 31 caracteres (acima do limite máximo)', async ({ app }) => {
  const mission: Mission = {
    id: 'LP-3001F',
    rocket: 'Starship',
    baseId: 'orion',
    departureDate: '2027-09-20',
    returnDate: '2027-09-27',
    price: 1000.00
  }

  await clearAndInsertMission(mission)
  await app.store.bookingPage.acessar(mission.id)
  await app.store.bookingPage.selecionarAssento('A1')
  await app.store.bookingPage.continuar()

  await expect(app.store.bookingPage.etapaPassageiros).toBeVisible()

  await app.store.bookingPage.preencherPassageiro(NOME_30, PASS_31)
  await app.store.bookingPage.irParaPagamento()

  await expect(app.store.bookingPage.etapaPagamento).not.toBeVisible()
  await expect(app.store.bookingPage.obterErroPassageiro()).toHaveText('O passaporte deve ter no máximo 30 caracteres')
  await expect(app.store.bookingPage.passaporteCampo).toBeFocused()
})
