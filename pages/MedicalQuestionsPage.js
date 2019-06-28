import { Selector, t } from 'testcafe';

const flowQuestionHeaderTitle = Selector('.flow-question-header-title');

export default class MedicalQuestionsPage {
    constructor () {
        this.medicalQuestionsHeader = flowQuestionHeaderTitle.withText('Medical Questions');
        this.continueButton = Selector('button.button:nth-child(2)');
    }

    async verifyCorrectPage() {
        await t.expect(this.medicalQuestionsHeader.visible).ok();
    }

    async clickContinue() {
        await t.click(this.continueButton)
    }

    async verifyCurrentQuestion(question) {
        await t.expect(flowQuestionHeaderTitle.withText(question).visible).ok();
    }
}
