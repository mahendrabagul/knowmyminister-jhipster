import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { AwardKnowmyminister } from './award-knowmyminister.model';
import { AwardKnowmyministerPopupService } from './award-knowmyminister-popup.service';
import { AwardKnowmyministerService } from './award-knowmyminister.service';
import { MinisterKnowmyminister, MinisterKnowmyministerService } from '../minister-knowmyminister';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-award-knowmyminister-dialog',
    templateUrl: './award-knowmyminister-dialog.component.html'
})
export class AwardKnowmyministerDialogComponent implements OnInit {

    award: AwardKnowmyminister;
    isSaving: boolean;

    ministers: MinisterKnowmyminister[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private awardService: AwardKnowmyministerService,
        private ministerService: MinisterKnowmyministerService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.ministerService.query()
            .subscribe((res: ResponseWrapper) => { this.ministers = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.award.id !== undefined) {
            this.subscribeToSaveResponse(
                this.awardService.update(this.award));
        } else {
            this.subscribeToSaveResponse(
                this.awardService.create(this.award));
        }
    }

    private subscribeToSaveResponse(result: Observable<AwardKnowmyminister>) {
        result.subscribe((res: AwardKnowmyminister) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: AwardKnowmyminister) {
        this.eventManager.broadcast({ name: 'awardListModification', content: 'OK'});
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
}

@Component({
    selector: 'jhi-award-knowmyminister-popup',
    template: ''
})
export class AwardKnowmyministerPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private awardPopupService: AwardKnowmyministerPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.awardPopupService
                    .open(AwardKnowmyministerDialogComponent as Component, params['id']);
            } else {
                this.awardPopupService
                    .open(AwardKnowmyministerDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
