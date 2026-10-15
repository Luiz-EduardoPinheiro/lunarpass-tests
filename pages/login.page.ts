import {Locator, expect, Page} from '@playwright/test'

export class LoginPage {
    readonly page: Page
    readonly alert: Locator

    constructor (page: Page) {
        this.page = page
        this.alert = page.getByRole('alert')
    }

    async acessarLogin(){
        await this.page.goto('http://localhost:3000/mission-control/login')
        const texto = this.page.getByRole('heading', {name: 'Mission Control'})
        await expect(texto).toBeVisible()
    }

    async realizarLogin(email: string, senha: string){
        await this.page.getByPlaceholder('Informe seu email').fill(email)
        await this.page.getByPlaceholder('Sua senha secreta').fill(senha)
        await this.page.getByRole('button', {name: 'Entrar'}).click({timeout: 10_000})
    }
}