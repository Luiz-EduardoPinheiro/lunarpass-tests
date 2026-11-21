import { test, expect } from '../../support/index.ts'
import { Mission, Reservation, Ticket } from '../../support/types.ts'
import { clearAndInsertMission, insertReservation, insertTicket } from '../../support/db.ts'

test('Impedir o avanço sem seleção mínima de assentos', async ({ app }) => {
  const mission: Mission = {
    id: 'LP-2002A',
    rocket: 'Starship',
    baseId: 'aurora',
    departureDate: '2027-07-01',
    returnDate: '2027-07-08',
    price: 1000.00
  }

  await clearAndInsertMission(mission)
  await app.store.bookingPage.acessar(mission.id)

  await expect(app.store.bookingPage.continuarBtn).toBeDisabled()
  await expect(app.store.bookingPage.instrucaoAssentos).toBeVisible()
  await expect(app.store.bookingPage.etapaPassageiros).not.toBeVisible()
})

test('Avançar com seleção máxima de assentos permitida', async ({ app }) => {
  const mission: Mission = {
    id: 'LP-2002B',
    rocket: 'Starship',
    baseId: 'aurora',
    departureDate: '2027-07-10',
    returnDate: '2027-07-17',
    price: 1000.00
  }

  await clearAndInsertMission(mission)
  await app.store.bookingPage.acessar(mission.id)

  await app.store.bookingPage.selecionarAssento('A1')
  await app.store.bookingPage.selecionarAssento('A2')
  await app.store.bookingPage.selecionarAssento('B1')
  await app.store.bookingPage.selecionarAssento('B2')

  await expect(app.store.bookingPage.total).toContainText('USD 4,000.00')

  await expect(app.store.bookingPage.continuarBtn).toBeEnabled()
  await app.store.bookingPage.continuar()
  await expect(app.store.bookingPage.etapaPassageiros).toBeVisible()
})

test('Tentar selecionar assento já ocupado', async ({ app }) => {
  const mission: Mission = {
    id: 'LP-2002C',
    rocket: 'Starship',
    baseId: 'aurora',
    departureDate: '2027-07-20',
    returnDate: '2027-07-27',
    price: 1000.00
  }

  const reservationId = 'c3d4e5f6-0001-0001-0001-c3d4e5f60001'

  const reservation: Reservation = {
    id: reservationId,
    userId: null,
    missionId: mission.id,
    reservationCode: 'OCUP01',
    contactEmail: 'occupant@lunarpass.dev',
    totalPrice: 1000,
    status: 'confirmed'
  }

  const ticketA1: Ticket = {
    id: 'd4e5f6a7-0001-0001-0001-d4e5f6a70001',
    reservationId,
    missionId: mission.id,
    seat: 'A1',
    fullName: 'Passageiro Ocupante A1',
    document: 'PA20001'
  }

  await clearAndInsertMission(mission)
  await insertReservation(reservation)
  await insertTicket(ticketA1)

  await app.store.bookingPage.acessar(mission.id)

  const assentoA1 = app.store.bookingPage.obterAssento('A1')
  await expect(assentoA1).toHaveAttribute('aria-disabled', 'true')
  await expect(assentoA1).toHaveAttribute('aria-pressed', 'false')
  await expect(assentoA1).toHaveAccessibleName(/Ocupado/)
  await expect(app.store.bookingPage.obterTooltipAssento('A1')).toContainText('Ocupado')
})
