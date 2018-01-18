import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('WorkExperience e2e test', () => {

    let navBarPage: NavBarPage;
    let workExperienceDialogPage: WorkExperienceDialogPage;
    let workExperienceComponentsPage: WorkExperienceComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load WorkExperiences', () => {
        navBarPage.goToEntity('work-experience-knowmyminister');
        workExperienceComponentsPage = new WorkExperienceComponentsPage();
        expect(workExperienceComponentsPage.getTitle())
            .toMatch(/knowMyMinisterApp.workExperience.home.title/);

    });

    it('should load create WorkExperience dialog', () => {
        workExperienceComponentsPage.clickOnCreateButton();
        workExperienceDialogPage = new WorkExperienceDialogPage();
        expect(workExperienceDialogPage.getModalTitle())
            .toMatch(/knowMyMinisterApp.workExperience.home.createOrEditLabel/);
        workExperienceDialogPage.close();
    });

    it('should create and save WorkExperiences', () => {
        workExperienceComponentsPage.clickOnCreateButton();
        workExperienceDialogPage.setOrganizationInput('organization');
        expect(workExperienceDialogPage.getOrganizationInput()).toMatch('organization');
        workExperienceDialogPage.setDescriptionInput('description');
        expect(workExperienceDialogPage.getDescriptionInput()).toMatch('description');
        workExperienceDialogPage.setStartDateInput(12310020012301);
        expect(workExperienceDialogPage.getStartDateInput()).toMatch('2001-12-31T02:30');
        workExperienceDialogPage.setEndDateInput(12310020012301);
        expect(workExperienceDialogPage.getEndDateInput()).toMatch('2001-12-31T02:30');
        workExperienceDialogPage.ministerSelectLastOption();
        workExperienceDialogPage.languageSelectLastOption();
        workExperienceDialogPage.save();
        expect(workExperienceDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class WorkExperienceComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-work-experience-knowmyminister div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class WorkExperienceDialogPage {
    modalTitle = element(by.css('h4#myWorkExperienceLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    organizationInput = element(by.css('input#field_organization'));
    descriptionInput = element(by.css('input#field_description'));
    startDateInput = element(by.css('input#field_startDate'));
    endDateInput = element(by.css('input#field_endDate'));
    ministerSelect = element(by.css('select#field_minister'));
    languageSelect = element(by.css('select#field_language'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setOrganizationInput = function(organization) {
        this.organizationInput.sendKeys(organization);
    }

    getOrganizationInput = function() {
        return this.organizationInput.getAttribute('value');
    }

    setDescriptionInput = function(description) {
        this.descriptionInput.sendKeys(description);
    }

    getDescriptionInput = function() {
        return this.descriptionInput.getAttribute('value');
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
