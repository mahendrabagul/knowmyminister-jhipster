import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Language e2e test', () => {

    let navBarPage: NavBarPage;
    let languageDialogPage: LanguageDialogPage;
    let languageComponentsPage: LanguageComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Languages', () => {
        navBarPage.goToEntity('language-knowmyminister');
        languageComponentsPage = new LanguageComponentsPage();
        expect(languageComponentsPage.getTitle())
            .toMatch(/knowMyMinisterApp.language.home.title/);

    });

    it('should load create Language dialog', () => {
        languageComponentsPage.clickOnCreateButton();
        languageDialogPage = new LanguageDialogPage();
        expect(languageDialogPage.getModalTitle())
            .toMatch(/knowMyMinisterApp.language.home.createOrEditLabel/);
        languageDialogPage.close();
    });

    it('should create and save Languages', () => {
        languageComponentsPage.clickOnCreateButton();
        languageDialogPage.setNameInput('name');
        expect(languageDialogPage.getNameInput()).toMatch('name');
        languageDialogPage.save();
        expect(languageDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class LanguageComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-language-knowmyminister div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class LanguageDialogPage {
    modalTitle = element(by.css('h4#myLanguageLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    }

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
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
