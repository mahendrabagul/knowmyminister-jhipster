import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Photo e2e test', () => {

    let navBarPage: NavBarPage;
    let photoDialogPage: PhotoDialogPage;
    let photoComponentsPage: PhotoComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Photos', () => {
        navBarPage.goToEntity('photo-knowmyminister');
        photoComponentsPage = new PhotoComponentsPage();
        expect(photoComponentsPage.getTitle())
            .toMatch(/knowMyMinisterApp.photo.home.title/);

    });

    it('should load create Photo dialog', () => {
        photoComponentsPage.clickOnCreateButton();
        photoDialogPage = new PhotoDialogPage();
        expect(photoDialogPage.getModalTitle())
            .toMatch(/knowMyMinisterApp.photo.home.createOrEditLabel/);
        photoDialogPage.close();
    });

    it('should create and save Photos', () => {
        photoComponentsPage.clickOnCreateButton();
        photoDialogPage.setTitleInput('title');
        expect(photoDialogPage.getTitleInput()).toMatch('title');
        photoDialogPage.setLinkInput('link');
        expect(photoDialogPage.getLinkInput()).toMatch('link');
        photoDialogPage.ministerSelectLastOption();
        photoDialogPage.politicalPartySelectLastOption();
        photoDialogPage.save();
        expect(photoDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class PhotoComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-photo-knowmyminister div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class PhotoDialogPage {
    modalTitle = element(by.css('h4#myPhotoLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    titleInput = element(by.css('input#field_title'));
    linkInput = element(by.css('input#field_link'));
    ministerSelect = element(by.css('select#field_minister'));
    politicalPartySelect = element(by.css('select#field_politicalParty'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setTitleInput = function(title) {
        this.titleInput.sendKeys(title);
    }

    getTitleInput = function() {
        return this.titleInput.getAttribute('value');
    }

    setLinkInput = function(link) {
        this.linkInput.sendKeys(link);
    }

    getLinkInput = function() {
        return this.linkInput.getAttribute('value');
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

    politicalPartySelectLastOption = function() {
        this.politicalPartySelect.all(by.tagName('option')).last().click();
    }

    politicalPartySelectOption = function(option) {
        this.politicalPartySelect.sendKeys(option);
    }

    getPoliticalPartySelect = function() {
        return this.politicalPartySelect;
    }

    getPoliticalPartySelectedOption = function() {
        return this.politicalPartySelect.element(by.css('option:checked')).getText();
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
