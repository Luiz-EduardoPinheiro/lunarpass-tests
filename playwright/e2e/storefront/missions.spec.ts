import { test, expect } from '../../support/index.ts'
import { LunarBase, Mission, Reservation, Ticket } from '../../support/types.ts'
import { clearAndInsertLunarBase, clearAndInsertMission, insertReservation, insertTicket } from '../../support/db.ts'

test('Buscar missões para todas as bases lunares disponíveis', async ({ app }) => {
  const missionAlpha: Mission = {
    id: 'LP-0927A',
    rocket: 'Starship',
    baseId: 'alpha',
    departureDate: '2027-03-01',
    returnDate: '2027-03-08',
    price: 1000.00
  }

  const missionOrion: Mission = {
    id: 'LP-0927B',
    rocket: 'Starship',
    baseId: 'orion',
    departureDate: '2027-03-10',
    returnDate: '2027-03-17',
    price: 1000.00
  }

  const missionAurora: Mission = {
    id: 'LP-0927C',
    rocket: 'Starship',
    baseId: 'aurora',
    departureDate: '2027-03-20',
    returnDate: '2027-03-27',
    price: 1000.00
  }

  const missionSelene: Mission = {
    id: 'LP-0927D',
    rocket: 'Starship',
    baseId: 'selene',
    departureDate: '2027-03-30',
    returnDate: '2027-04-06',
    price: 1000.00
  }

  await clearAndInsertMission(missionAlpha)
  await clearAndInsertMission(missionOrion)
  await clearAndInsertMission(missionAurora)
  await clearAndInsertMission(missionSelene)

  await app.store.homePage.acessar()
  await app.store.homePage.buscarMissoes()

  await expect(app.store.missionsPage.obterMissaoPorCodigo(missionAlpha.id)).toContainText('Base Lunar Alpha')
  await expect(app.store.missionsPage.obterMissaoPorCodigo(missionOrion.id)).toContainText('Base Lunar Orion')
  await expect(app.store.missionsPage.obterMissaoPorCodigo(missionAurora.id)).toContainText('Base Lunar Aurora')
  await expect(app.store.missionsPage.obterMissaoPorCodigo(missionSelene.id)).toContainText('Base Lunar Selene')

  await expect(app.store.missionsPage.ordenarPor).toHaveValue('nearest')

  const codigos = await app.store.missionsPage.cards.evaluateAll((cards) =>
    cards.map((card) => card.getAttribute('data-mission-code'))
  )

  const indexAlpha = codigos.indexOf(missionAlpha.id)
  const indexOrion = codigos.indexOf(missionOrion.id)
  const indexAurora = codigos.indexOf(missionAurora.id)
  const indexSelene = codigos.indexOf(missionSelene.id)

  expect(indexAlpha).toBeLessThan(indexOrion)
  expect(indexOrion).toBeLessThan(indexAurora)
  expect(indexAurora).toBeLessThan(indexSelene)
})

test('Buscar missões filtrando por uma base específica', async ({ app }) => {
  const missionAlpha: Mission = {
    id: 'LP-0928A',
    rocket: 'Starship',
    baseId: 'alpha',
    departureDate: '2027-04-01',
    returnDate: '2027-04-08',
    price: 1000.00
  }

  const missionOrion: Mission = {
    id: 'LP-0928B',
    rocket: 'Starship',
    baseId: 'orion',
    departureDate: '2027-04-10',
    returnDate: '2027-04-17',
    price: 1000.00
  }

  await clearAndInsertMission(missionAlpha)
  await clearAndInsertMission(missionOrion)

  await app.store.homePage.acessar()
  await app.store.homePage.selecionarBase('Base Lunar Alpha')
  await app.store.homePage.buscarMissoes()

  await expect(app.store.missionsPage.obterMissaoPorCodigo(missionAlpha.id)).toBeVisible()
  await expect(app.store.missionsPage.obterMissaoPorCodigo(missionOrion.id)).not.toBeVisible()

  const titulosBases = await app.store.missionsPage.cards.getByRole('heading', { level: 3 }).allTextContents()
  expect(titulosBases.length).toBeGreaterThan(0)
  for (const titulo of titulosBases) {
    expect(titulo).toBe('Base Lunar Alpha')
  }

  await expect(app.store.missionsPage.titulo).toHaveText(/\d+ missões? disponíveis?/)
  await expect(app.store.missionsPage.resumoFiltro).toContainText('Base Lunar Alpha')
})

test('Missão esgotada aparece nos resultados sem opção de reserva', async ({ app }) => {
  const mission: Mission = {
    id: 'LP-1128B',
    rocket: 'Starship',
    baseId: 'selene',
    departureDate: '2027-06-01',
    returnDate: '2027-06-08',
    price: 1000.00
  }

  const reservationId = 'a1b2c3d4-0001-0001-0001-a1b2c3d40001'

  const reservation: Reservation = {
    id: reservationId,
    userId: null,
    missionId: mission.id,
    reservationCode: 'ESGT01',
    contactEmail: 'test@lunarpass.dev',
    totalPrice: 4000,
    status: 'confirmed'
  }

  const tickets: Ticket[] = [
    { id: 'b2c3d4e5-0001-0001-0001-b2c3d4e50001', reservationId, missionId: mission.id, seat: 'A1', fullName: 'Test User 1', document: 'PA10001' },
    { id: 'b2c3d4e5-0001-0001-0001-b2c3d4e50002', reservationId, missionId: mission.id, seat: 'A2', fullName: 'Test User 2', document: 'PA10002' },
    { id: 'b2c3d4e5-0001-0001-0001-b2c3d4e50003', reservationId, missionId: mission.id, seat: 'B1', fullName: 'Test User 3', document: 'PA10003' },
    { id: 'b2c3d4e5-0001-0001-0001-b2c3d4e50004', reservationId, missionId: mission.id, seat: 'B2', fullName: 'Test User 4', document: 'PA10004' },
  ]

  await clearAndInsertMission(mission)
  await insertReservation(reservation)
  for (const ticket of tickets) {
    await insertTicket(ticket)
  }

  await app.store.homePage.acessar()
  await app.store.homePage.selecionarBase('Base Lunar Selene')
  await app.store.homePage.buscarMissoes()

  await expect(app.store.missionsPage.obterEsgotadoDaMissao(mission.id)).toBeVisible()
  await expect(app.store.missionsPage.obterEsgotadoDaMissao(mission.id)).toHaveText('Esgotado')
  await expect(app.store.missionsPage.obterReservarDaMissao(mission.id)).not.toBeVisible()
})

test('Lidar com ausência de missões para os filtros', async ({ app }) => {
  const baseVega: LunarBase = {
    id: 'vega',
    name: 'Base Lunar Vega',
    shortName: 'Vega',
    tagline: 'Oceanus Procellarum',
    description: 'Base exclusiva de testes para validação de ausência de missões.',
    imageUrl: null,
    sortOrder: 50,
    isActive: true
  }

  await clearAndInsertLunarBase(baseVega)

  await app.store.homePage.acessar()
  await app.store.homePage.selecionarBase('Base Lunar Vega')
  await app.store.homePage.buscarMissoes()

  await expect(app.store.missionsPage.alertaVazio).toBeVisible()
  await expect(app.store.missionsPage.alertaVazio).toContainText('Nenhuma missão programada com esses filtros.')
  await expect(app.store.missionsPage.atalhoLimparBusca).toBeVisible()
  await expect(app.store.missionsPage.atalhoLimparBusca).toHaveAttribute('href', '/missions')
})
