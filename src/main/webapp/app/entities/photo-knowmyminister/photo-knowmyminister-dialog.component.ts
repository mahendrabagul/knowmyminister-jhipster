import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { PhotoKnowmyminister } from './photo-knowmyminister.model';
import { PhotoKnowmyministerPopupService } from './photo-knowmyminister-popup.service';
import { PhotoKnowmyministerService } from './photo-knowmyminister.service';
import { MinisterKnowmyminister, MinisterKnowmyministerService } from '../minister-knowmyminister';
import { PoliticalPartyKnowmyminister, PoliticalPartyKnowmyministerService } from '../political-party-knowmyminister';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-photo-knowmyminister-dialog',
    templateUrl: './photo-knowmyminister-dialog.component.html'
})
export class PhotoKnowmyministerDialogComponent implements OnInit {

    photo: PhotoKnowmyminister;
    isSaving: boolean;

    ministers: MinisterKnowmyminister[];

    politicalparties: PoliticalPartyKnowmyminister[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private photoService: PhotoKnowmyministerService,
        private ministerService: MinisterKnowmyministerService,
        private politicalPartyService: PoliticalPartyKnowmyministerService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.ministerService.query()
            .subscribe((res: ResponseWrapper) => { this.ministers = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.politicalPartyService.query()
            .subscribe((res: ResponseWrapper) => { this.politicalparties = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.photo.id !== undefined) {
            this.subscribeToSaveResponse(
                this.photoService.update(this.photo));
        } else {
            this.subscribeToSaveResponse(
                this.photoService.create(this.photo));
        }
    }

    private subscribeToSaveResponse(result: Observable<PhotoKnowmyminister>) {
        result.subscribe((res: PhotoKnowmyminister) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: PhotoKnowmyminister) {
        this.eventManager.broadcast({ name: 'photoListModification', content: 'OK'});
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
}

@Component({
    selector: 'jhi-photo-knowmyminister-popup',
    template: ''
})
export class PhotoKnowmyministerPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private photoPopupService: PhotoKnowmyministerPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.photoPopupService
                    .open(PhotoKnowmyministerDialogComponent as Component, params['id']);
            } else {
                this.photoPopupService
                    .open(PhotoKnowmyministerDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
