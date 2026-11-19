import { Locator, Page } from '@playwright/test'

export class BookingPage {
  readonly page: Page
  readonly tituloAssentos: Locator
  readonly continuarBtn: Locator
  readonly total: Locator
  readonly instrucaoAssentos: Locator
  readonly etapaPassageiros: Locator

  constructor(page: Page) {
    this.page = page
    this.tituloAssentos = page.getByRole('heading', { name: 'Escolha seus assentos' })
    this.continuarBtn = page.getByRole('button', { name: 'Continuar' })
    this.total = page.locator('aside').filter({ hasText: 'Total' })
    this.instrucaoAssentos = page.getByText('Nenhum assento escolhido')
    this.etapaPassageiros = page.getByRole('heading', { name: 'Cadastre os passageiros' })
  }

  async acessar(missionId: string) {
    await this.page.goto(`http://localhost:3000/booking/${missionId}`)
  }

  obterAssento(seat: string): Locator {
    return this.page.getByRole('button', { name: new RegExp(`Assento ${seat}\\b`) })
  }

  obterTooltipAssento(seat: string): Locator {
    return this.page.locator(`#seat-${seat}-tooltip`)
  }

  async selecionarAssento(seat: string) {
    await this.obterAssento(seat).click()
  }

  async continuar() {
    await this.continuarBtn.click()
  }
}
