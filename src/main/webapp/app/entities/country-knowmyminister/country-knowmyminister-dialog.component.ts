import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CountryKnowmyminister } from './country-knowmyminister.model';
import { CountryKnowmyministerPopupService } from './country-knowmyminister-popup.service';
import { CountryKnowmyministerService } from './country-knowmyminister.service';

@Component({
    selector: 'jhi-country-knowmyminister-dialog',
    templateUrl: './country-knowmyminister-dialog.component.html'
})
export class CountryKnowmyministerDialogComponent implements OnInit {

    country: CountryKnowmyminister;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private countryService: CountryKnowmyministerService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.country.id !== undefined) {
            this.subscribeToSaveResponse(
                this.countryService.update(this.country));
        } else {
            this.subscribeToSaveResponse(
                this.countryService.create(this.country));
        }
    }

    private subscribeToSaveResponse(result: Observable<CountryKnowmyminister>) {
        result.subscribe((res: CountryKnowmyminister) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: CountryKnowmyminister) {
        this.eventManager.broadcast({ name: 'countryListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-country-knowmyminister-popup',
    template: ''
})
export class CountryKnowmyministerPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private countryPopupService: CountryKnowmyministerPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.countryPopupService
                    .open(CountryKnowmyministerDialogComponent as Component, params['id']);
            } else {
                this.countryPopupService
                    .open(CountryKnowmyministerDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
