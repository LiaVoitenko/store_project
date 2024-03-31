export class LoginPage{
    constructor(page){
        this.page = page

        this.registerButton = page.locator('[data-qa="go-to-signup-button"]')
    }
    moveToSignUp = async() =>{
        await this.registerButton.waitFor()
        await this.registerButton.click()
        this.page.waitForURL(/\/signup/gm, {timeout: 3000})
    }
    
}