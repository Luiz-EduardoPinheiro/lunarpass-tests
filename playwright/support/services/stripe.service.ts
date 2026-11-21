import { Page } from '@playwright/test'

export interface StripePaymentResponse {
  status: 'approved' | 'declined' | 'incorrect_card_data'
  message: string
  brand?: 'Visa' | 'Mastercard' | 'American Express'
  paymentId?: string
}

export class StripeService {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  async interceptarPagamento(resposta: StripePaymentResponse) {
    await this.page.route('**/functions/v1/stripe-payment', async route => {
      if (route.request().method() === 'OPTIONS') {
        await route.fulfill({
          status: 200,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type'
          },
          body: 'ok'
        })
        return
      }

      await route.fulfill({
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(resposta)
      })
    })
  }
}
