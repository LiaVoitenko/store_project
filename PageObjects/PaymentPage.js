import {expect} from '@playwright/test'


export class PaymentPage{
    constructor(page){
        this.page = page
        this.discountCode = page.frameLocator('[data-qa="active-discount-container"]').locator('[data-qa="discount-code"]')
        this.discountInput = page.locator('.discount-code-input')
        this.submitDiscountButton = page.locator('.submit-discount-button')
        this.discountActivatedMessage = page.locator('.discount-active-message')
        this.totalPrice = page.locator('.total-value')
        this.priceWithDiscount = page.locator('.total-with-discount-value')
        this.cardOwnerNameInput = page.locator('.credit-card-owner')
        this.cardNumberInput = page.locator('.credit-card-number')
        this.cardDateExperetionInput = page.locator('.valid-until')
        this.cardCvcInput = page.locator('.credit-card-cvc')
        this.payButton = page.locator('.pay-button ')
    }

    activateDiscount = async () => {
        await this.discountCode.waitFor()
        const code = await this.discountCode.innerText()
        await this.discountInput.waitFor()
        //first option
        await this.discountInput.fill(code)
        await expect(this.discountInput).toHaveValue(code)
        //second option
        // await this.discountInput.focus()
        // await this.page.keyboard.type(code, {delay:1000})
        // expect(await this.discountInput.inputValue()).toBe(code)
        // await this.page.pause()
        expect(await this.priceWithDiscount.isVisible()).toBe(false)
        expect(await this.discountActivatedMessage.isVisible()).toBe(false)
        await this.submitDiscountButton.waitFor()
        await this.submitDiscountButton.click()
        await this.discountActivatedMessage.waitFor()
        expect(await this.discountActivatedMessage.isVisible()).toBe(true)
        expect(this.discountActivatedMessage).toHaveText('Discount activated!')
        await this.priceWithDiscount.waitFor()
        expect(await this.priceWithDiscount.isVisible()).toBe(true)
        const discountValueText = parseInt((await this.priceWithDiscount.innerText()).replace('$',''), 10)
        const totalValueText = parseInt((await this.totalPrice.innerText()).replace('$',''), 10)
        expect(discountValueText).toBeLessThan(totalValueText )
    }


    fillPaymentDetails = async (creditCardDetails) => {
        await this.cardOwnerNameInput.waitFor()
        await this.cardOwnerNameInput.fill(creditCardDetails.cardOwnerName)
        await this.cardNumberInput.waitFor()
        await this.cardNumberInput.fill(creditCardDetails.cardNumber)
        await this.cardDateExperetionInput.waitFor()
        await this.cardDateExperetionInput.fill(creditCardDetails.cardDateExperetion)
        await this.cardCvcInput.waitFor()
        await this.cardCvcInput.fill(creditCardDetails.cardCvc)
    }

    completePayment = async () => {
        await this.payButton.waitFor()
        await this.payButton.click()
        await this.page.waitForURL(/\/thank-you/, {timeout:3000})

    }
}