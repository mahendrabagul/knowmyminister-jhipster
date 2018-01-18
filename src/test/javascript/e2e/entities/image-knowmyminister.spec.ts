import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Image e2e test', () => {

    let navBarPage: NavBarPage;
    let imageDialogPage: ImageDialogPage;
    let imageComponentsPage: ImageComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Images', () => {
        navBarPage.goToEntity('image-knowmyminister');
        imageComponentsPage = new ImageComponentsPage();
        expect(imageComponentsPage.getTitle())
            .toMatch(/knowMyMinisterApp.image.home.title/);

    });

    it('should load create Image dialog', () => {
        imageComponentsPage.clickOnCreateButton();
        imageDialogPage = new ImageDialogPage();
        expect(imageDialogPage.getModalTitle())
            .toMatch(/knowMyMinisterApp.image.home.createOrEditLabel/);
        imageDialogPage.close();
    });

    it('should create and save Images', () => {
        imageComponentsPage.clickOnCreateButton();
        imageDialogPage.setTitleInput('title');
        expect(imageDialogPage.getTitleInput()).toMatch('title');
        imageDialogPage.setLinkInput('link');
        expect(imageDialogPage.getLinkInput()).toMatch('link');
        imageDialogPage.save();
        expect(imageDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ImageComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-image-knowmyminister div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ImageDialogPage {
    modalTitle = element(by.css('h4#myImageLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    titleInput = element(by.css('input#field_title'));
    linkInput = element(by.css('input#field_link'));

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
