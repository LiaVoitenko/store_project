import * as dotenv from 'dotenv'
dotenv.config()
import {test} from '@playwright/test'
import { MyAccountPage } from '../PageObjects/MyAccountPage'
import { getLoginToken } from '../api/getLoginToken'
import { adminDetails } from '../data/userDetails'


test('My account using coockie injection', async ({page}) =>{
    const loginToken = await getLoginToken(adminDetails.username, adminDetails.password)
    const myAccount = new MyAccountPage(page)
    await myAccount.visit()
    await  page.evaluate(([loginTokenInsideBrowserCode]) => {
        document.cookie = "token="+loginTokenInsideBrowserCode},[loginToken])
    await myAccount.visit()
    await myAccount.waitForPageHeading()
})

test('Mocking request', async ({page}) =>{
    const loginToken = await getLoginToken(adminDetails.username, adminDetails.password)
    await page.route('**/api/user**', async (route, request) => {
        await route.fulfill({
            status: 500,
            contentTyope: 'application/json',
            body: JSON.stringify({message: "PLAYWRIGHT ERROR FROM MOCKING"}),
        })

    })
    const myAccount = new MyAccountPage(page)
    await myAccount.visit()
    await  page.evaluate(([loginTokenInsideBrowserCode]) => {
        document.cookie = "token="+loginTokenInsideBrowserCode},[loginToken])
    await myAccount.visit()
    await myAccount.waitForPageHeading()
    await myAccount.waitForErrorMessage()
})
