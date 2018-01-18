import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { EducationKnowmyminister } from './education-knowmyminister.model';
import { EducationKnowmyministerPopupService } from './education-knowmyminister-popup.service';
import { EducationKnowmyministerService } from './education-knowmyminister.service';
import { MinisterKnowmyminister, MinisterKnowmyministerService } from '../minister-knowmyminister';
import { LanguageKnowmyminister, LanguageKnowmyministerService } from '../language-knowmyminister';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-education-knowmyminister-dialog',
    templateUrl: './education-knowmyminister-dialog.component.html'
})
export class EducationKnowmyministerDialogComponent implements OnInit {

    education: EducationKnowmyminister;
    isSaving: boolean;

    ministers: MinisterKnowmyminister[];

    languages: LanguageKnowmyminister[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private educationService: EducationKnowmyministerService,
        private ministerService: MinisterKnowmyministerService,
        private languageService: LanguageKnowmyministerService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.ministerService.query()
            .subscribe((res: ResponseWrapper) => { this.ministers = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.languageService
            .query({filter: 'education-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.education.languageId) {
                    this.languages = res.json;
                } else {
                    this.languageService
                        .find(this.education.languageId)
                        .subscribe((subRes: LanguageKnowmyminister) => {
                            this.languages = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.education.id !== undefined) {
            this.subscribeToSaveResponse(
                this.educationService.update(this.education));
        } else {
            this.subscribeToSaveResponse(
                this.educationService.create(this.education));
        }
    }

    private subscribeToSaveResponse(result: Observable<EducationKnowmyminister>) {
        result.subscribe((res: EducationKnowmyminister) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: EducationKnowmyminister) {
        this.eventManager.broadcast({ name: 'educationListModification', content: 'OK'});
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

    trackLanguageById(index: number, item: LanguageKnowmyminister) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-education-knowmyminister-popup',
    template: ''
})
export class EducationKnowmyministerPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private educationPopupService: EducationKnowmyministerPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.educationPopupService
                    .open(EducationKnowmyministerDialogComponent as Component, params['id']);
            } else {
                this.educationPopupService
                    .open(EducationKnowmyministerDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
