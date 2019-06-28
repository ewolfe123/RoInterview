import { Selector, t } from 'testcafe';

export default class HelpPage {
    constructor () {
        this.helpHeader = Selector('.flow-question-header-title')
            .withText('How can we help');
        this.helpHeaderDescription = Selector('.flow-question-header-description > span');
    }

    async verifyCorrectPage() {
        await t.expect(this.helpHeader.visible).ok();
    }

    async verifyHelpDescription(description) {
        await t.expect(this.helpHeaderDescription.withExactText(description).visible).ok();
    }
}
