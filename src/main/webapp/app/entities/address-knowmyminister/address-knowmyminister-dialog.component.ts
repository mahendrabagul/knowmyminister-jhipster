import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { AddressKnowmyminister } from './address-knowmyminister.model';
import { AddressKnowmyministerPopupService } from './address-knowmyminister-popup.service';
import { AddressKnowmyministerService } from './address-knowmyminister.service';
import { MinisterKnowmyminister, MinisterKnowmyministerService } from '../minister-knowmyminister';
import { PoliticalPartyKnowmyminister, PoliticalPartyKnowmyministerService } from '../political-party-knowmyminister';
import { StateKnowmyminister, StateKnowmyministerService } from '../state-knowmyminister';
import { CountryKnowmyminister, CountryKnowmyministerService } from '../country-knowmyminister';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-address-knowmyminister-dialog',
    templateUrl: './address-knowmyminister-dialog.component.html'
})
export class AddressKnowmyministerDialogComponent implements OnInit {

    address: AddressKnowmyminister;
    isSaving: boolean;

    ministers: MinisterKnowmyminister[];

    politicalparties: PoliticalPartyKnowmyminister[];

    states: StateKnowmyminister[];

    contries: CountryKnowmyminister[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private addressService: AddressKnowmyministerService,
        private ministerService: MinisterKnowmyministerService,
        private politicalPartyService: PoliticalPartyKnowmyministerService,
        private stateService: StateKnowmyministerService,
        private countryService: CountryKnowmyministerService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.ministerService.query()
            .subscribe((res: ResponseWrapper) => { this.ministers = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.politicalPartyService.query()
            .subscribe((res: ResponseWrapper) => { this.politicalparties = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.stateService
            .query({filter: 'address-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.address.stateId) {
                    this.states = res.json;
                } else {
                    this.stateService
                        .find(this.address.stateId)
                        .subscribe((subRes: StateKnowmyminister) => {
                            this.states = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.countryService
            .query({filter: 'address-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.address.contryId) {
                    this.contries = res.json;
                } else {
                    this.countryService
                        .find(this.address.contryId)
                        .subscribe((subRes: CountryKnowmyminister) => {
                            this.contries = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.address.id !== undefined) {
            this.subscribeToSaveResponse(
                this.addressService.update(this.address));
        } else {
            this.subscribeToSaveResponse(
                this.addressService.create(this.address));
        }
    }

    private subscribeToSaveResponse(result: Observable<AddressKnowmyminister>) {
        result.subscribe((res: AddressKnowmyminister) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: AddressKnowmyminister) {
        this.eventManager.broadcast({ name: 'addressListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackMinisterById(index: number, item: MinisterKnowmyminister) {
        return item.id;
    }

    trackPoliticalPartyById(index: number, item: PoliticalPartyKnowmyminister) {
        return item.id;
    }

    trackStateById(index: number, item: StateKnowmyminister) {
        return item.id;
    }

    trackCountryById(index: number, item: CountryKnowmyminister) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-address-knowmyminister-popup',
    template: ''
})
export class AddressKnowmyministerPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private addressPopupService: AddressKnowmyministerPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.addressPopupService
                    .open(AddressKnowmyministerDialogComponent as Component, params['id']);
            } else {
                this.addressPopupService
                    .open(AddressKnowmyministerDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
