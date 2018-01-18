import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { StateKnowmyminister } from './state-knowmyminister.model';
import { StateKnowmyministerPopupService } from './state-knowmyminister-popup.service';
import { StateKnowmyministerService } from './state-knowmyminister.service';
import { CountryKnowmyminister, CountryKnowmyministerService } from '../country-knowmyminister';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-state-knowmyminister-dialog',
    templateUrl: './state-knowmyminister-dialog.component.html'
})
export class StateKnowmyministerDialogComponent implements OnInit {

    state: StateKnowmyminister;
    isSaving: boolean;

    countries: CountryKnowmyminister[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private stateService: StateKnowmyministerService,
        private countryService: CountryKnowmyministerService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.countryService
            .query({filter: 'state-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.state.countryId) {
                    this.countries = res.json;
                } else {
                    this.countryService
                        .find(this.state.countryId)
                        .subscribe((subRes: CountryKnowmyminister) => {
                            this.countries = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.state.id !== undefined) {
            this.subscribeToSaveResponse(
                this.stateService.update(this.state));
        } else {
            this.subscribeToSaveResponse(
                this.stateService.create(this.state));
        }
    }

    private subscribeToSaveResponse(result: Observable<StateKnowmyminister>) {
        result.subscribe((res: StateKnowmyminister) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: StateKnowmyminister) {
        this.eventManager.broadcast({ name: 'stateListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCountryById(index: number, item: CountryKnowmyminister) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-state-knowmyminister-popup',
    template: ''
})
export class StateKnowmyministerPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private statePopupService: StateKnowmyministerPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.statePopupService
                    .open(StateKnowmyministerDialogComponent as Component, params['id']);
            } else {
                this.statePopupService
                    .open(StateKnowmyministerDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
