import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Address e2e test', () => {

    let navBarPage: NavBarPage;
    let addressDialogPage: AddressDialogPage;
    let addressComponentsPage: AddressComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Addresses', () => {
        navBarPage.goToEntity('address-knowmyminister');
        addressComponentsPage = new AddressComponentsPage();
        expect(addressComponentsPage.getTitle())
            .toMatch(/knowMyMinisterApp.address.home.title/);

    });

    it('should load create Address dialog', () => {
        addressComponentsPage.clickOnCreateButton();
        addressDialogPage = new AddressDialogPage();
        expect(addressDialogPage.getModalTitle())
            .toMatch(/knowMyMinisterApp.address.home.createOrEditLabel/);
        addressDialogPage.close();
    });

    it('should create and save Addresses', () => {
        addressComponentsPage.clickOnCreateButton();
        addressDialogPage.setLine1Input('line1');
        expect(addressDialogPage.getLine1Input()).toMatch('line1');
        addressDialogPage.setLine2Input('line2');
        expect(addressDialogPage.getLine2Input()).toMatch('line2');
        addressDialogPage.setAreaInput('area');
        expect(addressDialogPage.getAreaInput()).toMatch('area');
        addressDialogPage.setPincodeInput('pincode');
        expect(addressDialogPage.getPincodeInput()).toMatch('pincode');
        addressDialogPage.setVillageInput('village');
        expect(addressDialogPage.getVillageInput()).toMatch('village');
        addressDialogPage.setTalukaInput('taluka');
        expect(addressDialogPage.getTalukaInput()).toMatch('taluka');
        addressDialogPage.setCityInput('city');
        expect(addressDialogPage.getCityInput()).toMatch('city');
        addressDialogPage.ministerSelectLastOption();
        addressDialogPage.politicalPartySelectLastOption();
        addressDialogPage.stateSelectLastOption();
        addressDialogPage.contrySelectLastOption();
        addressDialogPage.save();
        expect(addressDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class AddressComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-address-knowmyminister div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class AddressDialogPage {
    modalTitle = element(by.css('h4#myAddressLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    line1Input = element(by.css('input#field_line1'));
    line2Input = element(by.css('input#field_line2'));
    areaInput = element(by.css('input#field_area'));
    pincodeInput = element(by.css('input#field_pincode'));
    villageInput = element(by.css('input#field_village'));
    talukaInput = element(by.css('input#field_taluka'));
    cityInput = element(by.css('input#field_city'));
    ministerSelect = element(by.css('select#field_minister'));
    politicalPartySelect = element(by.css('select#field_politicalParty'));
    stateSelect = element(by.css('select#field_state'));
    contrySelect = element(by.css('select#field_contry'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setLine1Input = function(line1) {
        this.line1Input.sendKeys(line1);
    }

    getLine1Input = function() {
        return this.line1Input.getAttribute('value');
    }

    setLine2Input = function(line2) {
        this.line2Input.sendKeys(line2);
    }

    getLine2Input = function() {
        return this.line2Input.getAttribute('value');
    }

    setAreaInput = function(area) {
        this.areaInput.sendKeys(area);
    }

    getAreaInput = function() {
        return this.areaInput.getAttribute('value');
    }

    setPincodeInput = function(pincode) {
        this.pincodeInput.sendKeys(pincode);
    }

    getPincodeInput = function() {
        return this.pincodeInput.getAttribute('value');
    }

    setVillageInput = function(village) {
        this.villageInput.sendKeys(village);
    }

    getVillageInput = function() {
        return this.villageInput.getAttribute('value');
    }

    setTalukaInput = function(taluka) {
        this.talukaInput.sendKeys(taluka);
    }

    getTalukaInput = function() {
        return this.talukaInput.getAttribute('value');
    }

    setCityInput = function(city) {
        this.cityInput.sendKeys(city);
    }

    getCityInput = function() {
        return this.cityInput.getAttribute('value');
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

    stateSelectLastOption = function() {
        this.stateSelect.all(by.tagName('option')).last().click();
    }

    stateSelectOption = function(option) {
        this.stateSelect.sendKeys(option);
    }

    getStateSelect = function() {
        return this.stateSelect;
    }

    getStateSelectedOption = function() {
        return this.stateSelect.element(by.css('option:checked')).getText();
    }

    contrySelectLastOption = function() {
        this.contrySelect.all(by.tagName('option')).last().click();
    }

    contrySelectOption = function(option) {
        this.contrySelect.sendKeys(option);
    }

    getContrySelect = function() {
        return this.contrySelect;
    }

    getContrySelectedOption = function() {
        return this.contrySelect.element(by.css('option:checked')).getText();
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
