import { Locator, Page } from '@playwright/test'

export class BookingPage {
  readonly page: Page
  readonly tituloAssentos: Locator
  readonly continuarBtn: Locator
  readonly total: Locator
  readonly instrucaoAssentos: Locator
  readonly etapaPassageiros: Locator
  readonly etapaPagamento: Locator
  readonly nomeCampo: Locator
  readonly passaporteCampo: Locator
  readonly irParaPagamentoBtn: Locator
  readonly emailCampo: Locator
  readonly nomeCartaoCampo: Locator
  readonly numeroCartaoCampo: Locator
  readonly validadeCampo: Locator
  readonly cvvCampo: Locator
  readonly pagarEReservarBtn: Locator
  readonly alerta: Locator
  readonly etapaConfirmacao: Locator
  readonly codigoReserva: Locator
  readonly passagens: Locator

  constructor(page: Page) {
    this.page = page
    this.tituloAssentos = page.getByRole('heading', { name: 'Escolha seus assentos' })
    this.continuarBtn = page.getByRole('button', { name: 'Continuar' })
    this.total = page.locator('aside').filter({ hasText: 'Total' })
    this.instrucaoAssentos = page.getByText('Nenhum assento escolhido')
    this.etapaPassageiros = page.getByRole('heading', { name: 'Cadastre os passageiros' })
    this.etapaPagamento = page.getByRole('heading', { name: 'Pagamento' })
    this.nomeCampo = page.getByRole('textbox', { name: 'Nome completo' })
    this.passaporteCampo = page.getByRole('textbox', { name: 'Passaporte' })
    this.irParaPagamentoBtn = page.getByRole('button', { name: 'Ir para pagamento' })
    this.emailCampo = page.getByRole('textbox', { name: 'E-mail de contato' })
    this.nomeCartaoCampo = page.getByRole('textbox', { name: 'Nome no cartão' })
    this.numeroCartaoCampo = page.getByRole('textbox', { name: 'Número do cartão' })
    this.validadeCampo = page.getByRole('textbox', { name: 'Validade' })
    this.cvvCampo = page.getByRole('textbox', { name: 'CVV' })
    this.pagarEReservarBtn = page.getByRole('button', { name: 'Pagar e reservar' })
    this.alerta = page.getByRole('alert')
    this.etapaConfirmacao = page.getByRole('heading', { name: 'Sua reserva está confirmada.' })
    this.codigoReserva = page.getByTestId('reservation-code')
    this.passagens = page.getByTestId('reservation-ticket')
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

  async preencherPassageiro(nome: string, passaporte: string) {
    await this.nomeCampo.fill(nome)
    await this.passaporteCampo.fill(passaporte)
  }

  async irParaPagamento() {
    await this.irParaPagamentoBtn.click()
  }

  obterErroPassageiro(): Locator {
    return this.page.getByRole('alert')
  }

  async preencherPagamento(email: string, nomeCartao: string, numeroCartao: string, validade: string, cvv: string) {
    await this.emailCampo.fill(email)
    await this.nomeCartaoCampo.fill(nomeCartao)
    await this.numeroCartaoCampo.fill(numeroCartao)
    await this.validadeCampo.fill(validade)
    await this.cvvCampo.fill(cvv)
  }

  async pagarEReservar() {
    await this.pagarEReservarBtn.click()
  }

  obterPassagemPorAssento(seat: string): Locator {
    return this.passagens.filter({ hasText: `Passagem ${seat}` })
  }
}
