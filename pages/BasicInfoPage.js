import { Selector, t } from 'testcafe';

export default class BasicInfoPage {
    constructor () {
        this.basicsHeader = Selector('.flow-question-header-title')
            .withText('The Basics');
        this.birthDateInput = Selector('#dateOfBirth');
        this.zipCodeInput = Selector('#zipcode');
        this.nextButton = Selector('button[type="submit"]');
    }

    async verifyCorrectPage() {
        await t.expect(this.basicsHeader.visible).ok();
    }

    async clickBiologicalSexButton(biologicalSex) {
        if (biologicalSex === 'Male' || biologicalSex === 'Female') {
            let button = Selector('label').withExactText(biologicalSex);
            await t.click(button);
        }
    }

    async enterBasicInfo(biologicalSex, birthDate, zipCode) {
        await this.clickBiologicalSexButton(biologicalSex);
        await t.typeText(this.birthDateInput, birthDate);
        await t.typeText(this.zipCodeInput, zipCode);
    }

    async clickNext() {
        await t.click(this.nextButton);
    }
}
