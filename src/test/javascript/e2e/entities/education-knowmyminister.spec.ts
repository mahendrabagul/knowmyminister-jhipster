import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Education e2e test', () => {

    let navBarPage: NavBarPage;
    let educationDialogPage: EducationDialogPage;
    let educationComponentsPage: EducationComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Educations', () => {
        navBarPage.goToEntity('education-knowmyminister');
        educationComponentsPage = new EducationComponentsPage();
        expect(educationComponentsPage.getTitle())
            .toMatch(/knowMyMinisterApp.education.home.title/);

    });

    it('should load create Education dialog', () => {
        educationComponentsPage.clickOnCreateButton();
        educationDialogPage = new EducationDialogPage();
        expect(educationDialogPage.getModalTitle())
            .toMatch(/knowMyMinisterApp.education.home.createOrEditLabel/);
        educationDialogPage.close();
    });

    it('should create and save Educations', () => {
        educationComponentsPage.clickOnCreateButton();
        educationDialogPage.setTitleInput('title');
        expect(educationDialogPage.getTitleInput()).toMatch('title');
        educationDialogPage.setInstituteInput('institute');
        expect(educationDialogPage.getInstituteInput()).toMatch('institute');
        educationDialogPage.setStartDateInput(12310020012301);
        expect(educationDialogPage.getStartDateInput()).toMatch('2001-12-31T02:30');
        educationDialogPage.setEndDateInput(12310020012301);
        expect(educationDialogPage.getEndDateInput()).toMatch('2001-12-31T02:30');
        educationDialogPage.ministerSelectLastOption();
        educationDialogPage.languageSelectLastOption();
        educationDialogPage.save();
        expect(educationDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class EducationComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-education-knowmyminister div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class EducationDialogPage {
    modalTitle = element(by.css('h4#myEducationLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    titleInput = element(by.css('input#field_title'));
    instituteInput = element(by.css('input#field_institute'));
    startDateInput = element(by.css('input#field_startDate'));
    endDateInput = element(by.css('input#field_endDate'));
    ministerSelect = element(by.css('select#field_minister'));
    languageSelect = element(by.css('select#field_language'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setTitleInput = function(title) {
        this.titleInput.sendKeys(title);
    }

    getTitleInput = function() {
        return this.titleInput.getAttribute('value');
    }

    setInstituteInput = function(institute) {
        this.instituteInput.sendKeys(institute);
    }

    getInstituteInput = function() {
        return this.instituteInput.getAttribute('value');
    }

    setStartDateInput = function(startDate) {
        this.startDateInput.sendKeys(startDate);
    }

    getStartDateInput = function() {
        return this.startDateInput.getAttribute('value');
    }

    setEndDateInput = function(endDate) {
        this.endDateInput.sendKeys(endDate);
    }

    getEndDateInput = function() {
        return this.endDateInput.getAttribute('value');
    }

    ministerSelectLastOption = function() {
        this.ministerSelect.all(by.tagName('option')).last().click();
    }

    ministerSelectOption = function(option) {
        this.ministerSelect.sendKeys(option);
    }

    getMinisterSelect = function() {
        return this.ministerSelect;
    }

    getMinisterSelectedOption = function() {
        return this.ministerSelect.element(by.css('option:checked')).getText();
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
