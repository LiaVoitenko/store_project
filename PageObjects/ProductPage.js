import {expect} from '@playwright/test'
import { NavigationPage } from './NavigationPage'
import { isDesctopViewport } from '../utils/isDescktooViewport'

export class ProductPage{
    constructor(page) {
        this.page = page

        this.addButons = page.locator('[data-qa="product-button"]')
        this.sortDropdown = page.locator('.sort-dropdown')
        this.productTitle = page.locator('[data-qa="product-title"]')
    }

    visit = async () =>{
        await this.page.goto("/")
    }

    addProductToBasket = async (index_of_product) => {
        const specificAddButton = this.addButons.nth(index_of_product)
        await specificAddButton.waitFor()
        await expect(specificAddButton).toHaveText('Add to Basket')
        const navigation = new NavigationPage(this.page)
        let basketCounterBeforClick 
        if (isDesctopViewport(this.page)){
            basketCounterBeforClick =  await navigation.getBascetCount()}
        await specificAddButton.click()
        await expect(specificAddButton).toHaveText('Remove from Basket')
        if (isDesctopViewport(this.page)){
            const basketCounterAfterClick = await navigation.getBascetCount()
            expect(basketCounterAfterClick).toBeGreaterThan(basketCounterBeforClick)
        }
    }

    sortByCheapest = async () =>{
        await this.sortDropdown.waitFor()
        await this.productTitle.first().waitFor()
        const productTitleBeforeSorting = await this.productTitle.allInnerTexts()
        await this.sortDropdown.selectOption('price-asc')
        const productTitleAfterSorting = await this.productTitle.allInnerTexts()
        expect(productTitleAfterSorting).not.toEqual(productTitleBeforeSorting)
    }

}