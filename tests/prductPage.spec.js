import {test, expect} from "@playwright/test"

test.skip('First test', async ({page}) => {
    await page.goto("/")
    const addToBasketButton = page.locator('[data-qa="product-button"]').first()
    const basket =  page.locator('[data-qa="header-basket-count"]')
    await expect(basket).toHaveText('0')
    await addToBasketButton.waitFor()
    await expect(addToBasketButton).toHaveText("Add to Basket")
    await addToBasketButton.click()
    await expect(basket).toHaveText('1')
    await expect(addToBasketButton).toHaveText("Remove from Basket")
    const checkoutLink = page.getByRole('link', { name: 'Checkout' })
    await checkoutLink.waitFor()
    await checkoutLink.click()
    await page.waitForURL("/basket")
  
})