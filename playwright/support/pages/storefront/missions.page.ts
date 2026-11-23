import { Locator, Page } from '@playwright/test'

export class MissionsPage {
  readonly page: Page
  readonly titulo: Locator
  readonly ordenarPor: Locator
  readonly cards: Locator
  readonly resumoFiltro: Locator
  readonly alertaVazio: Locator
  readonly atalhoLimparBusca: Locator

  constructor(page: Page) {
    this.page = page
    this.titulo = page.getByRole('heading', { level: 1 })
    this.ordenarPor = page.getByLabel('Ordenar por')
    this.cards = page.locator('[data-mission-code]')
    this.resumoFiltro = page.locator('p').filter({ hasText: 'Base Lunar' })
    this.alertaVazio = page.getByRole('status')
    this.atalhoLimparBusca = page.getByRole('link', { name: 'Ver todas as janelas' })
  }

  async acessar() {
    await this.page.goto('/missions')
  }

  obterMissaoPorCodigo(codigo: string): Locator {
    return this.page.locator(`[data-mission-code="${codigo}"]`)
  }

  obterEsgotadoDaMissao(codigo: string): Locator {
    return this.obterMissaoPorCodigo(codigo).getByTestId('mission-sold-out')
  }

  obterReservarDaMissao(codigo: string): Locator {
    return this.obterMissaoPorCodigo(codigo).getByRole('link', { name: 'Reservar' })
  }
}
