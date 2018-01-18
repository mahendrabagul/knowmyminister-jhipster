import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('SocialLink e2e test', () => {

    let navBarPage: NavBarPage;
    let socialLinkDialogPage: SocialLinkDialogPage;
    let socialLinkComponentsPage: SocialLinkComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load SocialLinks', () => {
        navBarPage.goToEntity('social-link-knowmyminister');
        socialLinkComponentsPage = new SocialLinkComponentsPage();
        expect(socialLinkComponentsPage.getTitle())
            .toMatch(/knowMyMinisterApp.socialLink.home.title/);

    });

    it('should load create SocialLink dialog', () => {
        socialLinkComponentsPage.clickOnCreateButton();
        socialLinkDialogPage = new SocialLinkDialogPage();
        expect(socialLinkDialogPage.getModalTitle())
            .toMatch(/knowMyMinisterApp.socialLink.home.createOrEditLabel/);
        socialLinkDialogPage.close();
    });

    it('should create and save SocialLinks', () => {
        socialLinkComponentsPage.clickOnCreateButton();
        socialLinkDialogPage.setProviderInput('provider');
        expect(socialLinkDialogPage.getProviderInput()).toMatch('provider');
        socialLinkDialogPage.setLinkInput('link');
        expect(socialLinkDialogPage.getLinkInput()).toMatch('link');
        socialLinkDialogPage.ministerSelectLastOption();
        socialLinkDialogPage.politicalPartySelectLastOption();
        socialLinkDialogPage.save();
        expect(socialLinkDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class SocialLinkComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-social-link-knowmyminister div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class SocialLinkDialogPage {
    modalTitle = element(by.css('h4#mySocialLinkLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    providerInput = element(by.css('input#field_provider'));
    linkInput = element(by.css('input#field_link'));
    ministerSelect = element(by.css('select#field_minister'));
    politicalPartySelect = element(by.css('select#field_politicalParty'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setProviderInput = function(provider) {
        this.providerInput.sendKeys(provider);
    }

    getProviderInput = function() {
        return this.providerInput.getAttribute('value');
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
