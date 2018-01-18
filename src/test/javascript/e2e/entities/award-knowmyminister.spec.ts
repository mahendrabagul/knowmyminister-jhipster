import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Award e2e test', () => {

    let navBarPage: NavBarPage;
    let awardDialogPage: AwardDialogPage;
    let awardComponentsPage: AwardComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Awards', () => {
        navBarPage.goToEntity('award-knowmyminister');
        awardComponentsPage = new AwardComponentsPage();
        expect(awardComponentsPage.getTitle())
            .toMatch(/knowMyMinisterApp.award.home.title/);

    });

    it('should load create Award dialog', () => {
        awardComponentsPage.clickOnCreateButton();
        awardDialogPage = new AwardDialogPage();
        expect(awardDialogPage.getModalTitle())
            .toMatch(/knowMyMinisterApp.award.home.createOrEditLabel/);
        awardDialogPage.close();
    });

    it('should create and save Awards', () => {
        awardComponentsPage.clickOnCreateButton();
        awardDialogPage.setTitleInput('title');
        expect(awardDialogPage.getTitleInput()).toMatch('title');
        awardDialogPage.setStartDateInput(12310020012301);
        expect(awardDialogPage.getStartDateInput()).toMatch('2001-12-31T02:30');
        awardDialogPage.setIssuerInput('issuer');
        expect(awardDialogPage.getIssuerInput()).toMatch('issuer');
        awardDialogPage.setDescriptionInput('description');
        expect(awardDialogPage.getDescriptionInput()).toMatch('description');
        awardDialogPage.ministerSelectLastOption();
        awardDialogPage.save();
        expect(awardDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class AwardComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-award-knowmyminister div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class AwardDialogPage {
    modalTitle = element(by.css('h4#myAwardLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    titleInput = element(by.css('input#field_title'));
    startDateInput = element(by.css('input#field_startDate'));
    issuerInput = element(by.css('input#field_issuer'));
    descriptionInput = element(by.css('input#field_description'));
    ministerSelect = element(by.css('select#field_minister'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setTitleInput = function(title) {
        this.titleInput.sendKeys(title);
    }

    getTitleInput = function() {
        return this.titleInput.getAttribute('value');
    }

    setStartDateInput = function(startDate) {
        this.startDateInput.sendKeys(startDate);
    }

    getStartDateInput = function() {
        return this.startDateInput.getAttribute('value');
    }

    setIssuerInput = function(issuer) {
        this.issuerInput.sendKeys(issuer);
    }

    getIssuerInput = function() {
        return this.issuerInput.getAttribute('value');
    }

    setDescriptionInput = function(description) {
        this.descriptionInput.sendKeys(description);
    }

    getDescriptionInput = function() {
        return this.descriptionInput.getAttribute('value');
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
