import {test} from '@playwright/test';
import {v4 as uuidv4 } from 'uuid';
import { ProductPage } from '../PageObjects/ProductPage';
import { NavigationPage } from '../PageObjects/NavigationPage';
import {CheckoutPage} from '../PageObjects/CheckoutPage';
import { LoginPage } from '../PageObjects/LoginPage';
import { RegisterPage } from '../PageObjects/RegisterPage';
import { DeliveryDeteilsPage } from '../PageObjects/DeliveryDeteilsPage';
import {deliveryDetails} from '../data/deliveryDetails';
import { PaymentPage } from '../PageObjects/PaymentPage';
import { creditCardDetails } from '../data/creditCardDetails';


test('New User e2e test jorny', async ({page}) =>{
    const productPage = new ProductPage(page)
    await productPage.visit()
    await productPage.addProductToBasket(0)
    await productPage.addProductToBasket(1)
    await productPage.addProductToBasket(2)
    const navigationPage = new NavigationPage(page)
    await navigationPage.goToCheckout()  
    const checkoutPage = new CheckoutPage(page)
    await checkoutPage.removeCheapestProduct()
    await checkoutPage.continueToCheckout()
    const loginPage = new LoginPage(page)
    await loginPage.moveToSignUp()
    const registerPage = new RegisterPage(page)
    const emailId = uuidv4()
    const email = emailId + 'gmail.com'
    const password = uuidv4()
    await registerPage.signUpAsNewUser(email, password)
    const deliveryDeteilsPage = new DeliveryDeteilsPage(page)
    await deliveryDeteilsPage.fillDetails(deliveryDetails)
    await deliveryDeteilsPage.saveAdress()
    await deliveryDeteilsPage.goToPayment()
    const paymentPage = new PaymentPage(page)
    await paymentPage.activateDiscount()
    await paymentPage.fillPaymentDetails(creditCardDetails)
    await paymentPage.completePayment()
})

test('Sort Products', async ({page}) =>{
    const productPage = new ProductPage(page)
    await productPage.visit()
    await productPage.sortByCheapest()
})