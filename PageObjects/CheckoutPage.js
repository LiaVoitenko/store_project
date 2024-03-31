import { expect } from "@playwright/test"


export class CheckoutPage {
    constructor(page) {
        this.page = page

        this.basketCards = page.locator('[data-qa="basket-card"]')
        this.basketItemPrice = page.locator('[data-qa="basket-item-price"]')
        this.basketItemRemoveButton = page.locator('[data-qa="basket-card-remove-item"]')
        this.continueToCheckoutButton = page.locator('.continue-to-checkout')
    }

    removeCheapestProduct = async () => {
        await this.basketCards.first().waitFor()
        const itemsBeforeRemoval = await this.basketCards.count()
        await this.basketItemPrice.first().waitFor()
        const allPriceTexts = await this.basketItemPrice.allInnerTexts()
        const justNumbers = allPriceTexts.map((element) => {
            return parseInt(element.replace("$", "") , 10)
        })       
        const smallestPriceIdx = justNumbers.indexOf(Math.min(justNumbers))	        
        const specificRemoveButton = this.basketItemRemoveButton.nth(smallestPriceIdx)
        await specificRemoveButton.waitFor()
        await specificRemoveButton.click()
        await expect(this.basketCards).toHaveCount(itemsBeforeRemoval - 1)
    }

    continueToCheckout = async () =>{
        await this.continueToCheckoutButton.waitFor()
        await this.continueToCheckoutButton.click()
        await this.page.waitForURL(/\/login/gm, {timeout: 3000}) 
    }
}