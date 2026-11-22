import { test, expect } from '../../support/index.ts'
import { Mission } from '../../support/types.ts'
import { clearAndInsertMission } from '../../support/db.ts'

test('Compra de 1 assento sem desconto', async ({ app }) => {
  const mission: Mission = {
    id: 'LP-5001A',
    rocket: 'Starship',
    baseId: 'aurora',
    departureDate: '2027-10-01',
    returnDate: '2027-10-08',
    price: 1000.00
  }

  await clearAndInsertMission(mission)
  await app.store.bookingPage.acessar(mission.id)

  await app.store.bookingPage.selecionarAssento('A1')

  await expect(app.store.bookingPage.resumoDesconto).toHaveText('Sem desconto')
  await expect(app.store.bookingPage.resumoTotal).toHaveText('USD 1,000.00')
})

test('Compra de 2 assentos com 5% de desconto', async ({ app }) => {
  const mission: Mission = {
    id: 'LP-5001B',
    rocket: 'Starship',
    baseId: 'aurora',
    departureDate: '2027-10-10',
    returnDate: '2027-10-17',
    price: 1000.00
  }

  await clearAndInsertMission(mission)
  await app.store.bookingPage.acessar(mission.id)

  await app.store.bookingPage.selecionarAssento('A1')
  await app.store.bookingPage.selecionarAssento('A2')

  await expect(app.store.bookingPage.resumoDesconto).toContainText('5%')
  await expect(app.store.bookingPage.resumoTotal).toHaveText('USD 1,900.00')
})

test('Compra de 3 assentos com 5% de desconto', async ({ app }) => {
  const mission: Mission = {
    id: 'LP-5001C',
    rocket: 'Starship',
    baseId: 'aurora',
    departureDate: '2027-10-20',
    returnDate: '2027-10-27',
    price: 1000.00
  }

  await clearAndInsertMission(mission)
  await app.store.bookingPage.acessar(mission.id)

  await app.store.bookingPage.selecionarAssento('A1')
  await app.store.bookingPage.selecionarAssento('A2')
  await app.store.bookingPage.selecionarAssento('B1')

  await expect(app.store.bookingPage.resumoDesconto).toContainText('5%')
  await expect(app.store.bookingPage.resumoTotal).toHaveText('USD 2,850.00')
})

test('Compra de 4 assentos com 10% de desconto', async ({ app }) => {
  const mission: Mission = {
    id: 'LP-5001D',
    rocket: 'Starship',
    baseId: 'aurora',
    departureDate: '2027-11-01',
    returnDate: '2027-11-08',
    price: 1000.00
  }

  await clearAndInsertMission(mission)
  await app.store.bookingPage.acessar(mission.id)

  await app.store.bookingPage.selecionarAssento('A1')
  await app.store.bookingPage.selecionarAssento('A2')
  await app.store.bookingPage.selecionarAssento('B1')
  await app.store.bookingPage.selecionarAssento('B2')

  await expect(app.store.bookingPage.resumoDesconto).toContainText('10%')
  await expect(app.store.bookingPage.resumoTotal).toHaveText('USD 3,600.00')
})

test('Desconto recalculado ao desmarcar um assento', async ({ app }) => {
  const mission: Mission = {
    id: 'LP-5001E',
    rocket: 'Starship',
    baseId: 'aurora',
    departureDate: '2027-11-10',
    returnDate: '2027-11-17',
    price: 1000.00
  }

  await clearAndInsertMission(mission)
  await app.store.bookingPage.acessar(mission.id)

  await app.store.bookingPage.selecionarAssento('A1')
  await app.store.bookingPage.selecionarAssento('A2')
  await app.store.bookingPage.selecionarAssento('B1')
  await app.store.bookingPage.selecionarAssento('B2')

  await app.store.bookingPage.desmarcarAssento('B2')

  await expect(app.store.bookingPage.resumoDesconto).toContainText('5%')
  await expect(app.store.bookingPage.resumoTotal).toHaveText('USD 2,850.00')
})

test('Finalização do pagamento com desconto aplicado', async ({ app }) => {
  const mission: Mission = {
    id: 'LP-5001F',
    rocket: 'Starship',
    baseId: 'aurora',
    departureDate: '2027-11-20',
    returnDate: '2027-11-27',
    price: 1000.00
  }

  await clearAndInsertMission(mission)
  await app.store.bookingPage.acessar(mission.id)

  await app.store.bookingPage.selecionarAssento('A1')
  await app.store.bookingPage.selecionarAssento('A2')
  await app.store.bookingPage.selecionarAssento('B1')
  await app.store.bookingPage.selecionarAssento('B2')
  await app.store.bookingPage.continuar()

  await app.store.bookingPage.preencherPassageiros([
    { nome: 'Buzz Aldrin', passaporte: 'PASS001' },
    { nome: 'Sally Ride', passaporte: 'PASS002' },
    { nome: 'Mae Jemison', passaporte: 'PASS003' },
    { nome: 'Neil Armstrong', passaporte: 'PASS004' }
  ])
  await app.store.bookingPage.irParaPagamento()

  await app.store.bookingPage.preencherPagamento('buzz@lunarpass.dev', 'Buzz Aldrin', '4242 4242 4242 4242', '12/30', '123')
  await app.services.stripe.interceptarPagamento({
    status: 'approved',
    message: 'Pagamento aprovado.',
    brand: 'Visa',
    paymentId: 'pi_3UX6sz14NoBxd29D08GIaxi1'
  })
  await app.store.bookingPage.pagarEReservar()

  await expect(app.store.bookingPage.totalConfirmacao).toHaveText('USD 3,600.00')
  await expect(app.store.bookingPage.descontoConfirmacao).toContainText('Desconto de 10% aplicado')
})
