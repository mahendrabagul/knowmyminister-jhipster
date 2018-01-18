import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('PoliticalParty e2e test', () => {

    let navBarPage: NavBarPage;
    let politicalPartyDialogPage: PoliticalPartyDialogPage;
    let politicalPartyComponentsPage: PoliticalPartyComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load PoliticalParties', () => {
        navBarPage.goToEntity('political-party-knowmyminister');
        politicalPartyComponentsPage = new PoliticalPartyComponentsPage();
        expect(politicalPartyComponentsPage.getTitle())
            .toMatch(/knowMyMinisterApp.politicalParty.home.title/);

    });

    it('should load create PoliticalParty dialog', () => {
        politicalPartyComponentsPage.clickOnCreateButton();
        politicalPartyDialogPage = new PoliticalPartyDialogPage();
        expect(politicalPartyDialogPage.getModalTitle())
            .toMatch(/knowMyMinisterApp.politicalParty.home.createOrEditLabel/);
        politicalPartyDialogPage.close();
    });

    it('should create and save PoliticalParties', () => {
        politicalPartyComponentsPage.clickOnCreateButton();
        politicalPartyDialogPage.setDescriptionInput('description');
        expect(politicalPartyDialogPage.getDescriptionInput()).toMatch('description');
        politicalPartyDialogPage.setAbbreviationInput('abbreviation');
        expect(politicalPartyDialogPage.getAbbreviationInput()).toMatch('abbreviation');
        politicalPartyDialogPage.setFoundedInput('founded');
        expect(politicalPartyDialogPage.getFoundedInput()).toMatch('founded');
        politicalPartyDialogPage.setPrecededByInput('precededBy');
        expect(politicalPartyDialogPage.getPrecededByInput()).toMatch('precededBy');
        politicalPartyDialogPage.setNewsPaperInput('newsPaper');
        expect(politicalPartyDialogPage.getNewsPaperInput()).toMatch('newsPaper');
        politicalPartyDialogPage.setYouthWingInput('youthWing');
        expect(politicalPartyDialogPage.getYouthWingInput()).toMatch('youthWing');
        politicalPartyDialogPage.setWomensWingInput('womensWing');
        expect(politicalPartyDialogPage.getWomensWingInput()).toMatch('womensWing');
        politicalPartyDialogPage.setPeasantsWingInput('peasantsWing');
        expect(politicalPartyDialogPage.getPeasantsWingInput()).toMatch('peasantsWing');
        politicalPartyDialogPage.setMinorityWingInput('minorityWing');
        expect(politicalPartyDialogPage.getMinorityWingInput()).toMatch('minorityWing');
        politicalPartyDialogPage.setMembershipInput('membership');
        expect(politicalPartyDialogPage.getMembershipInput()).toMatch('membership');
        politicalPartyDialogPage.setIdeologyInput('ideology');
        expect(politicalPartyDialogPage.getIdeologyInput()).toMatch('ideology');
        politicalPartyDialogPage.setPoliticalPositionInput('politicalPosition');
        expect(politicalPartyDialogPage.getPoliticalPositionInput()).toMatch('politicalPosition');
        politicalPartyDialogPage.setInternationalAffiliationInput('internationalAffiliation');
        expect(politicalPartyDialogPage.getInternationalAffiliationInput()).toMatch('internationalAffiliation');
        politicalPartyDialogPage.setColourInput('colour');
        expect(politicalPartyDialogPage.getColourInput()).toMatch('colour');
        politicalPartyDialogPage.setECIStatusInput('eCIStatus');
        expect(politicalPartyDialogPage.getECIStatusInput()).toMatch('eCIStatus');
        politicalPartyDialogPage.setAllianceInput('alliance');
        expect(politicalPartyDialogPage.getAllianceInput()).toMatch('alliance');
        politicalPartyDialogPage.setSeatsInLokSabhaInput('seatsInLokSabha');
        expect(politicalPartyDialogPage.getSeatsInLokSabhaInput()).toMatch('seatsInLokSabha');
        politicalPartyDialogPage.setSeatsInRajyaSabhaInput('seatsInRajyaSabha');
        expect(politicalPartyDialogPage.getSeatsInRajyaSabhaInput()).toMatch('seatsInRajyaSabha');
        politicalPartyDialogPage.setElectionSymbolInput('electionSymbol');
        expect(politicalPartyDialogPage.getElectionSymbolInput()).toMatch('electionSymbol');
        politicalPartyDialogPage.setWebsiteInput('website');
        expect(politicalPartyDialogPage.getWebsiteInput()).toMatch('website');
        politicalPartyDialogPage.setParliamentaryChairpersonInput('parliamentaryChairperson');
        expect(politicalPartyDialogPage.getParliamentaryChairpersonInput()).toMatch('parliamentaryChairperson');
        politicalPartyDialogPage.setEmailInput('email');
        expect(politicalPartyDialogPage.getEmailInput()).toMatch('email');
        politicalPartyDialogPage.logoSelectLastOption();
        politicalPartyDialogPage.presidentSelectLastOption();
        politicalPartyDialogPage.rajyasabhaLeaderSelectLastOption();
        politicalPartyDialogPage.loksabhaLeaderSelectLastOption();
        politicalPartyDialogPage.save();
        expect(politicalPartyDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class PoliticalPartyComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-political-party-knowmyminister div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class PoliticalPartyDialogPage {
    modalTitle = element(by.css('h4#myPoliticalPartyLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    descriptionInput = element(by.css('input#field_description'));
    abbreviationInput = element(by.css('input#field_abbreviation'));
    foundedInput = element(by.css('input#field_founded'));
    precededByInput = element(by.css('input#field_precededBy'));
    newsPaperInput = element(by.css('input#field_newsPaper'));
    youthWingInput = element(by.css('input#field_youthWing'));
    womensWingInput = element(by.css('input#field_womensWing'));
    peasantsWingInput = element(by.css('input#field_peasantsWing'));
    minorityWingInput = element(by.css('input#field_minorityWing'));
    membershipInput = element(by.css('input#field_membership'));
    ideologyInput = element(by.css('input#field_ideology'));
    politicalPositionInput = element(by.css('input#field_politicalPosition'));
    internationalAffiliationInput = element(by.css('input#field_internationalAffiliation'));
    colourInput = element(by.css('input#field_colour'));
    eCIStatusInput = element(by.css('input#field_eCIStatus'));
    allianceInput = element(by.css('input#field_alliance'));
    seatsInLokSabhaInput = element(by.css('input#field_seatsInLokSabha'));
    seatsInRajyaSabhaInput = element(by.css('input#field_seatsInRajyaSabha'));
    electionSymbolInput = element(by.css('input#field_electionSymbol'));
    websiteInput = element(by.css('input#field_website'));
    parliamentaryChairpersonInput = element(by.css('input#field_parliamentaryChairperson'));
    emailInput = element(by.css('input#field_email'));
    logoSelect = element(by.css('select#field_logo'));
    presidentSelect = element(by.css('select#field_president'));
    rajyasabhaLeaderSelect = element(by.css('select#field_rajyasabhaLeader'));
    loksabhaLeaderSelect = element(by.css('select#field_loksabhaLeader'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setDescriptionInput = function(description) {
        this.descriptionInput.sendKeys(description);
    }

    getDescriptionInput = function() {
        return this.descriptionInput.getAttribute('value');
    }

    setAbbreviationInput = function(abbreviation) {
        this.abbreviationInput.sendKeys(abbreviation);
    }

    getAbbreviationInput = function() {
        return this.abbreviationInput.getAttribute('value');
    }

    setFoundedInput = function(founded) {
        this.foundedInput.sendKeys(founded);
    }

    getFoundedInput = function() {
        return this.foundedInput.getAttribute('value');
    }

    setPrecededByInput = function(precededBy) {
        this.precededByInput.sendKeys(precededBy);
    }

    getPrecededByInput = function() {
        return this.precededByInput.getAttribute('value');
    }

    setNewsPaperInput = function(newsPaper) {
        this.newsPaperInput.sendKeys(newsPaper);
    }

    getNewsPaperInput = function() {
        return this.newsPaperInput.getAttribute('value');
    }

    setYouthWingInput = function(youthWing) {
        this.youthWingInput.sendKeys(youthWing);
    }

    getYouthWingInput = function() {
        return this.youthWingInput.getAttribute('value');
    }

    setWomensWingInput = function(womensWing) {
        this.womensWingInput.sendKeys(womensWing);
    }

    getWomensWingInput = function() {
        return this.womensWingInput.getAttribute('value');
    }

    setPeasantsWingInput = function(peasantsWing) {
        this.peasantsWingInput.sendKeys(peasantsWing);
    }

    getPeasantsWingInput = function() {
        return this.peasantsWingInput.getAttribute('value');
    }

    setMinorityWingInput = function(minorityWing) {
        this.minorityWingInput.sendKeys(minorityWing);
    }

    getMinorityWingInput = function() {
        return this.minorityWingInput.getAttribute('value');
    }

    setMembershipInput = function(membership) {
        this.membershipInput.sendKeys(membership);
    }

    getMembershipInput = function() {
        return this.membershipInput.getAttribute('value');
    }

    setIdeologyInput = function(ideology) {
        this.ideologyInput.sendKeys(ideology);
    }

    getIdeologyInput = function() {
        return this.ideologyInput.getAttribute('value');
    }

    setPoliticalPositionInput = function(politicalPosition) {
        this.politicalPositionInput.sendKeys(politicalPosition);
    }

    getPoliticalPositionInput = function() {
        return this.politicalPositionInput.getAttribute('value');
    }

    setInternationalAffiliationInput = function(internationalAffiliation) {
        this.internationalAffiliationInput.sendKeys(internationalAffiliation);
    }

    getInternationalAffiliationInput = function() {
        return this.internationalAffiliationInput.getAttribute('value');
    }

    setColourInput = function(colour) {
        this.colourInput.sendKeys(colour);
    }

    getColourInput = function() {
        return this.colourInput.getAttribute('value');
    }

    setECIStatusInput = function(eCIStatus) {
        this.eCIStatusInput.sendKeys(eCIStatus);
    }

    getECIStatusInput = function() {
        return this.eCIStatusInput.getAttribute('value');
    }

    setAllianceInput = function(alliance) {
        this.allianceInput.sendKeys(alliance);
    }

    getAllianceInput = function() {
        return this.allianceInput.getAttribute('value');
    }

    setSeatsInLokSabhaInput = function(seatsInLokSabha) {
        this.seatsInLokSabhaInput.sendKeys(seatsInLokSabha);
    }

    getSeatsInLokSabhaInput = function() {
        return this.seatsInLokSabhaInput.getAttribute('value');
    }

    setSeatsInRajyaSabhaInput = function(seatsInRajyaSabha) {
        this.seatsInRajyaSabhaInput.sendKeys(seatsInRajyaSabha);
    }

    getSeatsInRajyaSabhaInput = function() {
        return this.seatsInRajyaSabhaInput.getAttribute('value');
    }

    setElectionSymbolInput = function(electionSymbol) {
        this.electionSymbolInput.sendKeys(electionSymbol);
    }

    getElectionSymbolInput = function() {
        return this.electionSymbolInput.getAttribute('value');
    }

    setWebsiteInput = function(website) {
        this.websiteInput.sendKeys(website);
    }

    getWebsiteInput = function() {
        return this.websiteInput.getAttribute('value');
    }

    setParliamentaryChairpersonInput = function(parliamentaryChairperson) {
        this.parliamentaryChairpersonInput.sendKeys(parliamentaryChairperson);
    }

    getParliamentaryChairpersonInput = function() {
        return this.parliamentaryChairpersonInput.getAttribute('value');
    }

    setEmailInput = function(email) {
        this.emailInput.sendKeys(email);
    }

    getEmailInput = function() {
        return this.emailInput.getAttribute('value');
    }

    logoSelectLastOption = function() {
        this.logoSelect.all(by.tagName('option')).last().click();
    }

    logoSelectOption = function(option) {
        this.logoSelect.sendKeys(option);
    }

    getLogoSelect = function() {
        return this.logoSelect;
    }

    getLogoSelectedOption = function() {
        return this.logoSelect.element(by.css('option:checked')).getText();
    }

    presidentSelectLastOption = function() {
        this.presidentSelect.all(by.tagName('option')).last().click();
    }

    presidentSelectOption = function(option) {
        this.presidentSelect.sendKeys(option);
    }

    getPresidentSelect = function() {
        return this.presidentSelect;
    }

    getPresidentSelectedOption = function() {
        return this.presidentSelect.element(by.css('option:checked')).getText();
    }

    rajyasabhaLeaderSelectLastOption = function() {
        this.rajyasabhaLeaderSelect.all(by.tagName('option')).last().click();
    }

    rajyasabhaLeaderSelectOption = function(option) {
        this.rajyasabhaLeaderSelect.sendKeys(option);
    }

    getRajyasabhaLeaderSelect = function() {
        return this.rajyasabhaLeaderSelect;
    }

    getRajyasabhaLeaderSelectedOption = function() {
        return this.rajyasabhaLeaderSelect.element(by.css('option:checked')).getText();
    }

    loksabhaLeaderSelectLastOption = function() {
        this.loksabhaLeaderSelect.all(by.tagName('option')).last().click();
    }

    loksabhaLeaderSelectOption = function(option) {
        this.loksabhaLeaderSelect.sendKeys(option);
    }

    getLoksabhaLeaderSelect = function() {
        return this.loksabhaLeaderSelect;
    }

    getLoksabhaLeaderSelectedOption = function() {
        return this.loksabhaLeaderSelect.element(by.css('option:checked')).getText();
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
