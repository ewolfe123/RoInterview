import OnboardingStartPage from "../pages/OnboardingStartPage";
import VisitStartPage from "../pages/VisitStartPage";
import BasicInfoPage from "../pages/BasicInfoPage";
import MedicalQuestionsPage from "../pages/MedicalQuestionsPage";
import HelpPage from "../pages/HelpPage";

const email = 'test@mailinator.com';
const name = 'test';
const password = 'testpassword';
const birthDate = '01/01/1990';
const zipCode = '10128';

let onboarding;

fixture `ED Onboarding Start Page`
    .page `https://start.ro.co/roman/ed`
    .beforeEach(async t => {
        await t.setNativeDialogHandler(() => true);
        onboarding = new OnboardingStartPage();
        await onboarding.verifyCorrectPage();
        await onboarding.enterInformation(email, name, name, password);
    });

test('User cannot proceed without accepting terms of service', async() => {
    await onboarding.clickSubmit();
    await onboarding.verifyTosError();
});

test('User is presented with correct line of questions', async() => {
    let initialQuestion = 'Do you ever have a problem getting or maintaining ' +
        'an erection that is satisfying enough for sex?';

    await onboarding.acceptTos();
    await onboarding.clickSubmit();

    let visitStart = new VisitStartPage();
    await visitStart.verifyCorrectPage();
    await visitStart.clickStartVisit();

    let basicInfoPage = new BasicInfoPage();
    await basicInfoPage.verifyCorrectPage();
    await basicInfoPage.enterBasicInfo('Male', birthDate, zipCode);
    await basicInfoPage.clickNext();

    let medicalQuestions = new MedicalQuestionsPage();
    await medicalQuestions.verifyCorrectPage();
    await medicalQuestions.clickContinue();
    await medicalQuestions.verifyCurrentQuestion(initialQuestion);
});

test('User that biological females cannot proceed with ED questioning', async() => {
    let helpDescription = 'Unfortunately our ED treatment is currently only available to men. ' +
        'However, we would love to know if there’s anything we can do to help.';
    await onboarding.acceptTos();
    await onboarding.clickSubmit();

    let visitStart = new VisitStartPage();
    await visitStart.verifyCorrectPage();
    await visitStart.clickStartVisit();

    let basicInfoPage = new BasicInfoPage();
    await basicInfoPage.verifyCorrectPage();
    await basicInfoPage.enterBasicInfo('Female', birthDate, zipCode);

    let help = new HelpPage();
    await help.verifyCorrectPage();
    await help.verifyHelpDescription(helpDescription);
});
