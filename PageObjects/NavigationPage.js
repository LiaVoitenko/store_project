import { isDesctopViewport } from '../utils/isDescktooViewport'

export class NavigationPage{
    constructor(page){
        this.page = page

        this.basketCounter = page.locator('[data-qa="header-basket-count"]')
        this.checkoutLink = page.getByRole('link', { name: 'Checkout' })
        this.mobileMenuutto = page.locator('.burger-button')
    }

    getBascetCount = async () => {
        await this.basketCounter.waitFor()
        const text = await this.basketCounter.innerText()
        return parseInt(text, 10)
    }

    goToCheckout = async () =>{
        if (!isDesctopViewport(this.page)){
            await this.mobileMenuutto.waitFor()
            await this.mobileMenuutto.click()}
        await this.checkoutLink.waitFor()
        await this.checkoutLink.click()
        await this.page.waitForURL('/basket')
    }
}