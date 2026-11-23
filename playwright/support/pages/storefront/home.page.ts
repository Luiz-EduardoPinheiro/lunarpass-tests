import { Locator, Page } from '@playwright/test'

export class HomePage {
  readonly page: Page
  readonly slogan: Locator
  readonly buscarMissoesBtn: Locator

  constructor(page: Page) {
    this.page = page
    this.slogan = page.getByRole('heading', { name: 'Sua viagem para a Lua começa aqui.' })
    this.buscarMissoesBtn = page.getByRole('button', { name: 'Buscar missões' })
  }

  async acessar() {
    await this.page.goto('/')
  }

  async buscarMissoes() {
    await this.buscarMissoesBtn.click()
  }

  async selecionarBase(nome: string) {
    await this.page.getByRole('checkbox', { name: nome }).click()
  }
}
