import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { WorkExperienceKnowmyminister } from './work-experience-knowmyminister.model';
import { WorkExperienceKnowmyministerPopupService } from './work-experience-knowmyminister-popup.service';
import { WorkExperienceKnowmyministerService } from './work-experience-knowmyminister.service';
import { MinisterKnowmyminister, MinisterKnowmyministerService } from '../minister-knowmyminister';
import { LanguageKnowmyminister, LanguageKnowmyministerService } from '../language-knowmyminister';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-work-experience-knowmyminister-dialog',
    templateUrl: './work-experience-knowmyminister-dialog.component.html'
})
export class WorkExperienceKnowmyministerDialogComponent implements OnInit {

    workExperience: WorkExperienceKnowmyminister;
    isSaving: boolean;

    ministers: MinisterKnowmyminister[];

    languages: LanguageKnowmyminister[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private workExperienceService: WorkExperienceKnowmyministerService,
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
            .query({filter: 'workexperience-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.workExperience.languageId) {
                    this.languages = res.json;
                } else {
                    this.languageService
                        .find(this.workExperience.languageId)
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
        if (this.workExperience.id !== undefined) {
            this.subscribeToSaveResponse(
                this.workExperienceService.update(this.workExperience));
        } else {
            this.subscribeToSaveResponse(
                this.workExperienceService.create(this.workExperience));
        }
    }

    private subscribeToSaveResponse(result: Observable<WorkExperienceKnowmyminister>) {
        result.subscribe((res: WorkExperienceKnowmyminister) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: WorkExperienceKnowmyminister) {
        this.eventManager.broadcast({ name: 'workExperienceListModification', content: 'OK'});
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
    selector: 'jhi-work-experience-knowmyminister-popup',
    template: ''
})
export class WorkExperienceKnowmyministerPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private workExperiencePopupService: WorkExperienceKnowmyministerPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.workExperiencePopupService
                    .open(WorkExperienceKnowmyministerDialogComponent as Component, params['id']);
            } else {
                this.workExperiencePopupService
                    .open(WorkExperienceKnowmyministerDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
