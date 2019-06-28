import { Selector, t } from 'testcafe';

export default class VisitStartPage {
    constructor () {
        this.startHeader = Selector('.start-header');
        this.startVisitButton = Selector('.button.button.start-button');
    }

    async verifyCorrectPage() {
        await t.expect(this.startHeader.visible).ok();
    }

    async clickStartVisit() {
        await t.click(this.startVisitButton);
    }
}
