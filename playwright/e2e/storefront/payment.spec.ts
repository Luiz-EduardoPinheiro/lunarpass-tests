import { test, expect } from '../../support/index.ts'
import { Mission, Reservation, Ticket } from '../../support/types.ts'
import { clearAndInsertMission, insertReservation, insertTicket } from '../../support/db.ts'

test('Emissão de tickets com sucesso após pagamento aprovado', async ({ app }) => {
  const mission: Mission = {
    id: 'LP-4001A',
    rocket: 'Starship',
    baseId: 'selene',
    departureDate: '2027-11-01',
    returnDate: '2027-11-08',
    price: 1000.00
  }

  await clearAndInsertMission(mission)
  await app.store.bookingPage.acessar(mission.id)
  await app.store.bookingPage.selecionarAssento('A1')
  await app.store.bookingPage.continuar()

  await app.store.bookingPage.preencherPassageiro('Buzz Aldrin', 'PASS12345')
  await app.store.bookingPage.irParaPagamento()

  await app.store.bookingPage.preencherPagamento('buzz@lunarpass.dev', 'Buzz Aldrin', '4242 4242 4242 4242', '12/30', '123')
  await app.services.stripe.interceptarPagamento({
    status: 'approved',
    message: 'Pagamento aprovado.',
    brand: 'Visa',
    paymentId: 'pi_3UX6sz14NoBxd29D08GIaxi1'
  })
  await app.store.bookingPage.pagarEReservar()

  await expect(app.store.bookingPage.etapaConfirmacao).toBeVisible()
  await expect(app.store.bookingPage.statusPagamento).toHaveText('Pagamento aprovado! Pode arrumar as malas: a Lua já está esperando por você.')
  await expect(app.store.bookingPage.codigoReserva).toHaveText(/^[A-Z0-9]{6}$/)
  await expect(app.store.bookingPage.passagens).toHaveCount(1)
  await expect(app.store.bookingPage.obterPassagemPorAssento('A1')).toContainText('Buzz Aldrin')
  await expect(app.store.bookingPage.obterPassagemPorAssento('A1')).toContainText('PASS12345')
})

test('Emissão de tickets com sucesso após pagamento aprovado com cartão Mastercard', async ({ app }) => {
  const mission: Mission = {
    id: 'LP-4001D',
    rocket: 'Starship',
    baseId: 'selene',
    departureDate: '2027-12-01',
    returnDate: '2027-12-08',
    price: 1000.00
  }

  await clearAndInsertMission(mission)
  await app.store.bookingPage.acessar(mission.id)
  await app.store.bookingPage.selecionarAssento('A1')
  await app.store.bookingPage.continuar()

  await app.store.bookingPage.preencherPassageiro('Sally Ride', 'PASS98765')
  await app.store.bookingPage.irParaPagamento()

  await app.store.bookingPage.preencherPagamento('sally@lunarpass.dev', 'Sally Ride', '5555 5555 5555 4444', '12/30', '123')
  await app.services.stripe.interceptarPagamento({
    status: 'approved',
    message: 'Pagamento aprovado.',
    brand: 'Mastercard',
    paymentId: 'pi_3UX6sz14NoBxd29D08GIaxi1'
  })
  await app.store.bookingPage.pagarEReservar()

  await expect(app.store.bookingPage.etapaConfirmacao).toBeVisible()
  await expect(app.store.bookingPage.statusPagamento).toHaveText('Pagamento aprovado! Pode arrumar as malas: a Lua já está esperando por você.')
  await expect(app.store.bookingPage.codigoReserva).toHaveText(/^[A-Z0-9]{6}$/)
  await expect(app.store.bookingPage.passagens).toHaveCount(1)
  await expect(app.store.bookingPage.obterPassagemPorAssento('A1')).toContainText('Sally Ride')
  await expect(app.store.bookingPage.obterPassagemPorAssento('A1')).toContainText('PASS98765')
})

test('Emissão de tickets com sucesso após pagamento aprovado com cartão American Express', async ({ app }) => {
  const mission: Mission = {
    id: 'LP-4001E',
    rocket: 'Starship',
    baseId: 'selene',
    departureDate: '2027-12-10',
    returnDate: '2027-12-17',
    price: 1000.00
  }

  await clearAndInsertMission(mission)
  await app.store.bookingPage.acessar(mission.id)
  await app.store.bookingPage.selecionarAssento('A1')
  await app.store.bookingPage.continuar()

  await app.store.bookingPage.preencherPassageiro('Mae Jemison', 'PASS11223')
  await app.store.bookingPage.irParaPagamento()

  await app.store.bookingPage.preencherPagamento('mae@lunarpass.dev', 'Mae Jemison', '3782 822463 10005', '12/30', '1234')
  await app.services.stripe.interceptarPagamento({
    status: 'approved',
    message: 'Pagamento aprovado.',
    brand: 'American Express',
    paymentId: 'pi_3UX6sz14NoBxd29D08GIaxi1'
  })
  await app.store.bookingPage.pagarEReservar()

  await expect(app.store.bookingPage.etapaConfirmacao).toBeVisible()
  await expect(app.store.bookingPage.statusPagamento).toHaveText('Pagamento aprovado! Pode arrumar as malas: a Lua já está esperando por você.')
  await expect(app.store.bookingPage.codigoReserva).toHaveText(/^[A-Z0-9]{6}$/)
  await expect(app.store.bookingPage.passagens).toHaveCount(1)
  await expect(app.store.bookingPage.obterPassagemPorAssento('A1')).toContainText('Mae Jemison')
  await expect(app.store.bookingPage.obterPassagemPorAssento('A1')).toContainText('PASS11223')
})

test('Manter dados na tela quando o pagamento é recusado', async ({ app }) => {
  const mission: Mission = {
    id: 'LP-4001B',
    rocket: 'Starship',
    baseId: 'selene',
    departureDate: '2027-11-10',
    returnDate: '2027-11-17',
    price: 1000.00
  }

  await clearAndInsertMission(mission)
  await app.store.bookingPage.acessar(mission.id)
  await app.store.bookingPage.selecionarAssento('A1')
  await app.store.bookingPage.continuar()

  await app.store.bookingPage.preencherPassageiro('Buzz Aldrin', 'PASS12345')
  await app.store.bookingPage.irParaPagamento()

  await app.store.bookingPage.preencherPagamento('buzz@lunarpass.dev', 'Buzz Aldrin', '4000 0000 0000 0002', '12/30', '123')
  await app.services.stripe.interceptarPagamento({
    status: 'declined',
    message: 'Pagamento negado pela operadora do cartão.',
    brand: 'Visa'
  })
  await app.store.bookingPage.pagarEReservar()

  await expect(app.store.bookingPage.alerta).toContainText('Pagamento negado pela operadora do cartão.')
  await expect(app.store.bookingPage.etapaConfirmacao).not.toBeVisible()
  await expect(app.store.bookingPage.etapaPagamento).toBeVisible()
  await expect(app.store.bookingPage.emailCampo).toHaveValue('buzz@lunarpass.dev')
  await expect(app.store.bookingPage.nomeCartaoCampo).toHaveValue('Buzz Aldrin')
  await expect(app.store.bookingPage.numeroCartaoCampo).toHaveValue('4000 0000 0000 0002')
  await expect(app.store.bookingPage.validadeCampo).toHaveValue('12/30')
  await expect(app.store.bookingPage.cvvCampo).toHaveValue('123')
})

test('Bloqueio da reserva por concorrência de assentos no momento do processamento', async ({ app }) => {
  const mission: Mission = {
    id: 'LP-4001C',
    rocket: 'Starship',
    baseId: 'selene',
    departureDate: '2027-11-20',
    returnDate: '2027-11-27',
    price: 1000.00
  }

  const reservationId = 'c3d4e5f6-0001-0001-0001-c3d4e5f64001'
  const reservation: Reservation = {
    id: reservationId,
    userId: null,
    missionId: mission.id,
    reservationCode: 'OCUP40',
    contactEmail: 'occupant@lunarpass.dev',
    totalPrice: 1000,
    status: 'confirmed'
  }

  const ticketA1: Ticket = {
    id: 'd4e5f6a7-0001-0001-0001-d4e5f6a74001',
    reservationId,
    missionId: mission.id,
    seat: 'A1',
    fullName: 'Passageiro Concorrente A1',
    document: 'PA40001'
  }

  await clearAndInsertMission(mission)
  await app.store.bookingPage.acessar(mission.id)
  await app.store.bookingPage.selecionarAssento('A1')
  await app.store.bookingPage.continuar()

  await app.store.bookingPage.preencherPassageiro('Buzz Aldrin', 'PASS12345')
  await app.store.bookingPage.irParaPagamento()

  await app.store.bookingPage.preencherPagamento('buzz@lunarpass.dev', 'Buzz Aldrin', '4242 4242 4242 4242', '12/30', '123')

  await insertReservation(reservation)
  await insertTicket(ticketA1)

  await app.store.bookingPage.pagarEReservar()

  await expect(app.store.bookingPage.etapaConfirmacao).not.toBeVisible()
  await expect(app.store.bookingPage.etapaPagamento).toBeVisible()
  await expect(app.store.bookingPage.alerta).toContainText('Um dos assentos acabou de ser reservado. Escolha outro.')
})
