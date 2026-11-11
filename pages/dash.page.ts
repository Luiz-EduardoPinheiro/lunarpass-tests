import {Locator, Page} from '@playwright/test'

export class DashPage {
    readonly page: Page
    readonly abrirTelacadastro: Locator

    constructor (page: Page) {
        this.page = page
        this.abrirTelacadastro = page.getByRole('link', { name: 'Nova missão'} )
    }
}