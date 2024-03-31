import { expect } from "@playwright/test"

export class DeliveryDeteilsPage{
    constructor(page){
        this.page = page
        this.firstNameInput = page.locator('[data-qa="delivery-first-name"]')
        this.latNameInput = page.locator('[data-qa="delivery-last-name"]')
        this.adressInput = page.locator('[data-qa="delivery-address-street"]')
        this.postcodeInput = page.locator('[data-qa="delivery-postcode"]')
        this.cityInput = page.locator('[data-qa="delivery-city"]')
        this.countryDroptdown = page.locator('[data-qa="country-dropdown"]')
        this.saveAdressForNextTimeButton = page.locator('[data-qa="save-address-button"]')
        this.continueToPaymentButton = page.locator('[data-qa="continue-to-payment-button"]')
        this.saveAdressContainer = page.locator('[data-qa="saved-address-container"]')
        this.savedAdressFirstName = page.locator('[data-qa="saved-address-firstName"]')
        this.savedAdressLastName = page.locator('.saved-address-lastName')
        this.savedAdressAdress = page.locator('.saved-address-street')
        this.savedAdressPostcode = page.locator('.saved-address-postcode')
        this.savedAdressCity = page.locator('.saved-address-city')
        this.savedAdressCountry = page.locator('.saved-address-country')

    }

    fillDetails = async (deliveryDetails)=> {
        await this.firstNameInput.waitFor()
        await this.firstNameInput.fill(deliveryDetails.firstName)
        await this.latNameInput.waitFor()
        await this.latNameInput.fill(deliveryDetails.lastName)
        await this.adressInput.waitFor()
        await this.adressInput.fill(deliveryDetails.street)
        await this.postcodeInput.waitFor()
        await this.postcodeInput.fill(deliveryDetails.postcode)
        await this.cityInput.waitFor()
        await this.cityInput.fill(deliveryDetails.city)
        await this.countryDroptdown.selectOption(deliveryDetails.country)
    }

    saveAdress = async () => {
        const adressCountBefor = await this.saveAdressContainer.count()
        await this.saveAdressForNextTimeButton.waitFor()
        await this.saveAdressForNextTimeButton.click()
        await this.saveAdressContainer.waitFor()
        await expect(this.saveAdressContainer).toHaveCount(adressCountBefor+1)
        await this.savedAdressFirstName.first().waitFor()
        expect(await this.savedAdressFirstName.first().innerText()).toBe(await this.firstNameInput.inputValue())
        expect(await this.savedAdressLastName.first().innerText()).toBe(await this.latNameInput.inputValue())
        expect(await this.savedAdressAdress.first().innerText()).toBe(await this.adressInput.inputValue())
        expect(await this.savedAdressPostcode.first().innerText()).toBe(await this.postcodeInput.inputValue())
        expect(await this.savedAdressCity.first().innerText()).toBe(await this.cityInput.inputValue())
        expect(await this.savedAdressCountry.first().innerText()).toBe(await this.countryDroptdown.inputValue())

    }

    goToPayment = async () => {
        await this.continueToPaymentButton.waitFor()
        await this.continueToPaymentButton.click()
        await this.page.waitForURL(/\/payment/, {timeout: 3000})
    }

}