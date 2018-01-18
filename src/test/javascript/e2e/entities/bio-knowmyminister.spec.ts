import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Bio e2e test', () => {

    let navBarPage: NavBarPage;
    let bioDialogPage: BioDialogPage;
    let bioComponentsPage: BioComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Bios', () => {
        navBarPage.goToEntity('bio-knowmyminister');
        bioComponentsPage = new BioComponentsPage();
        expect(bioComponentsPage.getTitle())
            .toMatch(/knowMyMinisterApp.bio.home.title/);

    });

    it('should load create Bio dialog', () => {
        bioComponentsPage.clickOnCreateButton();
        bioDialogPage = new BioDialogPage();
        expect(bioDialogPage.getModalTitle())
            .toMatch(/knowMyMinisterApp.bio.home.createOrEditLabel/);
        bioDialogPage.close();
    });

    it('should create and save Bios', () => {
        bioComponentsPage.clickOnCreateButton();
        bioDialogPage.setFirstNameInput('firstName');
        expect(bioDialogPage.getFirstNameInput()).toMatch('firstName');
        bioDialogPage.setLastNameInput('lastName');
        expect(bioDialogPage.getLastNameInput()).toMatch('lastName');
        bioDialogPage.setMiddleNameInput('middleName');
        expect(bioDialogPage.getMiddleNameInput()).toMatch('middleName');
        bioDialogPage.setMobileNoInput('mobileNo');
        expect(bioDialogPage.getMobileNoInput()).toMatch('mobileNo');
        bioDialogPage.setEmailInput('email');
        expect(bioDialogPage.getEmailInput()).toMatch('email');
        bioDialogPage.setBornInput('born');
        expect(bioDialogPage.getBornInput()).toMatch('born');
        bioDialogPage.setAgeInput('5');
        expect(bioDialogPage.getAgeInput()).toMatch('5');
        bioDialogPage.setSexInput('5');
        expect(bioDialogPage.getSexInput()).toMatch('5');
        bioDialogPage.setSpouseInput('spouse');
        expect(bioDialogPage.getSpouseInput()).toMatch('spouse');
        bioDialogPage.setChildrenInput('children');
        expect(bioDialogPage.getChildrenInput()).toMatch('children');
        bioDialogPage.setWebsiteInput('website');
        expect(bioDialogPage.getWebsiteInput()).toMatch('website');
        bioDialogPage.languageSelectLastOption();
        bioDialogPage.profilePictureSelectLastOption();
        bioDialogPage.save();
        expect(bioDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class BioComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-bio-knowmyminister div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class BioDialogPage {
    modalTitle = element(by.css('h4#myBioLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    firstNameInput = element(by.css('input#field_firstName'));
    lastNameInput = element(by.css('input#field_lastName'));
    middleNameInput = element(by.css('input#field_middleName'));
    mobileNoInput = element(by.css('input#field_mobileNo'));
    emailInput = element(by.css('input#field_email'));
    bornInput = element(by.css('input#field_born'));
    ageInput = element(by.css('input#field_age'));
    sexInput = element(by.css('input#field_sex'));
    spouseInput = element(by.css('input#field_spouse'));
    childrenInput = element(by.css('input#field_children'));
    websiteInput = element(by.css('input#field_website'));
    languageSelect = element(by.css('select#field_language'));
    profilePictureSelect = element(by.css('select#field_profilePicture'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setFirstNameInput = function(firstName) {
        this.firstNameInput.sendKeys(firstName);
    }

    getFirstNameInput = function() {
        return this.firstNameInput.getAttribute('value');
    }

    setLastNameInput = function(lastName) {
        this.lastNameInput.sendKeys(lastName);
    }

    getLastNameInput = function() {
        return this.lastNameInput.getAttribute('value');
    }

    setMiddleNameInput = function(middleName) {
        this.middleNameInput.sendKeys(middleName);
    }

    getMiddleNameInput = function() {
        return this.middleNameInput.getAttribute('value');
    }

    setMobileNoInput = function(mobileNo) {
        this.mobileNoInput.sendKeys(mobileNo);
    }

    getMobileNoInput = function() {
        return this.mobileNoInput.getAttribute('value');
    }

    setEmailInput = function(email) {
        this.emailInput.sendKeys(email);
    }

    getEmailInput = function() {
        return this.emailInput.getAttribute('value');
    }

    setBornInput = function(born) {
        this.bornInput.sendKeys(born);
    }

    getBornInput = function() {
        return this.bornInput.getAttribute('value');
    }

    setAgeInput = function(age) {
        this.ageInput.sendKeys(age);
    }

    getAgeInput = function() {
        return this.ageInput.getAttribute('value');
    }

    setSexInput = function(sex) {
        this.sexInput.sendKeys(sex);
    }

    getSexInput = function() {
        return this.sexInput.getAttribute('value');
    }

    setSpouseInput = function(spouse) {
        this.spouseInput.sendKeys(spouse);
    }

    getSpouseInput = function() {
        return this.spouseInput.getAttribute('value');
    }

    setChildrenInput = function(children) {
        this.childrenInput.sendKeys(children);
    }

    getChildrenInput = function() {
        return this.childrenInput.getAttribute('value');
    }

    setWebsiteInput = function(website) {
        this.websiteInput.sendKeys(website);
    }

    getWebsiteInput = function() {
        return this.websiteInput.getAttribute('value');
    }

    languageSelectLastOption = function() {
        this.languageSelect.all(by.tagName('option')).last().click();
    }

    languageSelectOption = function(option) {
        this.languageSelect.sendKeys(option);
    }

    getLanguageSelect = function() {
        return this.languageSelect;
    }

    getLanguageSelectedOption = function() {
        return this.languageSelect.element(by.css('option:checked')).getText();
    }

    profilePictureSelectLastOption = function() {
        this.profilePictureSelect.all(by.tagName('option')).last().click();
    }

    profilePictureSelectOption = function(option) {
        this.profilePictureSelect.sendKeys(option);
    }

    getProfilePictureSelect = function() {
        return this.profilePictureSelect;
    }

    getProfilePictureSelectedOption = function() {
        return this.profilePictureSelect.element(by.css('option:checked')).getText();
    }

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
