import { Selector, t } from 'testcafe';

const tosErrorMessage = 'Continue your online visit by checking the box below';

export default class OnboardingStartPage {
    constructor () {
        this.signUpForm = Selector('.sign_up-main');
        this.emailInput = Selector('#temporaryEmail');
        this.firstNameInput = Selector('#firstName');
        this.lastNameInput = Selector('#lastName');
        this.tosCheckbox = Selector('div[class="checkbox"]');
        this.passwordInput = Selector('#password');
        this.submitButton = Selector('button[type="submit"]');
        this.tosError = Selector('.form_field-error')
            .withText(tosErrorMessage);
    }

    async verifyCorrectPage() {
        await t.expect(this.signUpForm.visible).ok();
    }

    async enterInformation (email, firstName, lastName, password) {
        await t
            .typeText(this.emailInput, email)
            .typeText(this.firstNameInput, firstName)
            .typeText(this.lastNameInput, lastName)
            .typeText(this.passwordInput, password);
    }

    async acceptTos() {
        await t.click(this.tosCheckbox);
    }

    async clickSubmit() {
        await t.click(this.submitButton);
    }

    async verifyTosError() {
        await this.tosError.visible;
    }
}
