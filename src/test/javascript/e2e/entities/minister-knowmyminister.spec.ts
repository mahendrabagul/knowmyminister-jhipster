import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Minister e2e test', () => {

    let navBarPage: NavBarPage;
    let ministerDialogPage: MinisterDialogPage;
    let ministerComponentsPage: MinisterComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Ministers', () => {
        navBarPage.goToEntity('minister-knowmyminister');
        ministerComponentsPage = new MinisterComponentsPage();
        expect(ministerComponentsPage.getTitle())
            .toMatch(/knowMyMinisterApp.minister.home.title/);

    });

    it('should load create Minister dialog', () => {
        ministerComponentsPage.clickOnCreateButton();
        ministerDialogPage = new MinisterDialogPage();
        expect(ministerDialogPage.getModalTitle())
            .toMatch(/knowMyMinisterApp.minister.home.createOrEditLabel/);
        ministerDialogPage.close();
    });

    it('should create and save Ministers', () => {
        ministerComponentsPage.clickOnCreateButton();
        ministerDialogPage.setPersonalBackgroundInput('personalBackground');
        expect(ministerDialogPage.getPersonalBackgroundInput()).toMatch('personalBackground');
        ministerDialogPage.setFamilyBackgroundInput('familyBackground');
        expect(ministerDialogPage.getFamilyBackgroundInput()).toMatch('familyBackground');
        ministerDialogPage.setInterestsInput('interests');
        expect(ministerDialogPage.getInterestsInput()).toMatch('interests');
        ministerDialogPage.setIdealInput('ideal');
        expect(ministerDialogPage.getIdealInput()).toMatch('ideal');
        ministerDialogPage.setMottoInput('motto');
        expect(ministerDialogPage.getMottoInput()).toMatch('motto');
        ministerDialogPage.electionSignSelectLastOption();
        ministerDialogPage.partySelectLastOption();
        ministerDialogPage.bioSelectLastOption();
        ministerDialogPage.politicalPartySelectLastOption();
        ministerDialogPage.save();
        expect(ministerDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class MinisterComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-minister-knowmyminister div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class MinisterDialogPage {
    modalTitle = element(by.css('h4#myMinisterLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    personalBackgroundInput = element(by.css('input#field_personalBackground'));
    familyBackgroundInput = element(by.css('input#field_familyBackground'));
    interestsInput = element(by.css('input#field_interests'));
    idealInput = element(by.css('input#field_ideal'));
    mottoInput = element(by.css('input#field_motto'));
    electionSignSelect = element(by.css('select#field_electionSign'));
    partySelect = element(by.css('select#field_party'));
    bioSelect = element(by.css('select#field_bio'));
    politicalPartySelect = element(by.css('select#field_politicalParty'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setPersonalBackgroundInput = function(personalBackground) {
        this.personalBackgroundInput.sendKeys(personalBackground);
    }

    getPersonalBackgroundInput = function() {
        return this.personalBackgroundInput.getAttribute('value');
    }

    setFamilyBackgroundInput = function(familyBackground) {
        this.familyBackgroundInput.sendKeys(familyBackground);
    }

    getFamilyBackgroundInput = function() {
        return this.familyBackgroundInput.getAttribute('value');
    }

    setInterestsInput = function(interests) {
        this.interestsInput.sendKeys(interests);
    }

    getInterestsInput = function() {
        return this.interestsInput.getAttribute('value');
    }

    setIdealInput = function(ideal) {
        this.idealInput.sendKeys(ideal);
    }

    getIdealInput = function() {
        return this.idealInput.getAttribute('value');
    }

    setMottoInput = function(motto) {
        this.mottoInput.sendKeys(motto);
    }

    getMottoInput = function() {
        return this.mottoInput.getAttribute('value');
    }

    electionSignSelectLastOption = function() {
        this.electionSignSelect.all(by.tagName('option')).last().click();
    }

    electionSignSelectOption = function(option) {
        this.electionSignSelect.sendKeys(option);
    }

    getElectionSignSelect = function() {
        return this.electionSignSelect;
    }

    getElectionSignSelectedOption = function() {
        return this.electionSignSelect.element(by.css('option:checked')).getText();
    }

    partySelectLastOption = function() {
        this.partySelect.all(by.tagName('option')).last().click();
    }

    partySelectOption = function(option) {
        this.partySelect.sendKeys(option);
    }

    getPartySelect = function() {
        return this.partySelect;
    }

    getPartySelectedOption = function() {
        return this.partySelect.element(by.css('option:checked')).getText();
    }

    bioSelectLastOption = function() {
        this.bioSelect.all(by.tagName('option')).last().click();
    }

    bioSelectOption = function(option) {
        this.bioSelect.sendKeys(option);
    }

    getBioSelect = function() {
        return this.bioSelect;
    }

    getBioSelectedOption = function() {
        return this.bioSelect.element(by.css('option:checked')).getText();
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
