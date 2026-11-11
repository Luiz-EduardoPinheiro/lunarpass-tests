import { Locator, Page } from '@playwright/test'

export class Navbar {
    readonly page: Page
    readonly logout: Locator

    constructor (page: Page) {
        this.page = page
        this.logout = this.page.getByRole('button', {name: 'Sair'})
    }
}