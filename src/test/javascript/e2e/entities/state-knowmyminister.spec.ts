import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('State e2e test', () => {

    let navBarPage: NavBarPage;
    let stateDialogPage: StateDialogPage;
    let stateComponentsPage: StateComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load States', () => {
        navBarPage.goToEntity('state-knowmyminister');
        stateComponentsPage = new StateComponentsPage();
        expect(stateComponentsPage.getTitle())
            .toMatch(/knowMyMinisterApp.state.home.title/);

    });

    it('should load create State dialog', () => {
        stateComponentsPage.clickOnCreateButton();
        stateDialogPage = new StateDialogPage();
        expect(stateDialogPage.getModalTitle())
            .toMatch(/knowMyMinisterApp.state.home.createOrEditLabel/);
        stateDialogPage.close();
    });

    it('should create and save States', () => {
        stateComponentsPage.clickOnCreateButton();
        stateDialogPage.setNameInput('name');
        expect(stateDialogPage.getNameInput()).toMatch('name');
        stateDialogPage.countrySelectLastOption();
        stateDialogPage.save();
        expect(stateDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class StateComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-state-knowmyminister div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class StateDialogPage {
    modalTitle = element(by.css('h4#myStateLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    countrySelect = element(by.css('select#field_country'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    }

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
    }

    countrySelectLastOption = function() {
        this.countrySelect.all(by.tagName('option')).last().click();
    }

    countrySelectOption = function(option) {
        this.countrySelect.sendKeys(option);
    }

    getCountrySelect = function() {
        return this.countrySelect;
    }

    getCountrySelectedOption = function() {
        return this.countrySelect.element(by.css('option:checked')).getText();
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
