class LoginPage {

    constructor(page) {
        this.page = page;
        this.signInButton = page.locator("[value='Login']");
        this.emailField = page.locator("#userEmail");
        this.passwordField = page.locator("#userPassword");
    }
    async goToLoginPage() {
        await this.page.goto(process.env.BASE_URL_CLIENT_APP);
    }

    async validateLoginPage(username, password) {

        await this.emailField.fill(process.env.TEST_EMAIL);
        await this.passwordField.fill(process.env.TEST_PASSWORD_CLIENT_APP);
        await this.signInButton.click();
    }

}
module.exports = { LoginPage };
