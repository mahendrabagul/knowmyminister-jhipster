import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { BioKnowmyminister } from './bio-knowmyminister.model';
import { BioKnowmyministerPopupService } from './bio-knowmyminister-popup.service';
import { BioKnowmyministerService } from './bio-knowmyminister.service';
import { LanguageKnowmyminister, LanguageKnowmyministerService } from '../language-knowmyminister';
import { ImageKnowmyminister, ImageKnowmyministerService } from '../image-knowmyminister';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-bio-knowmyminister-dialog',
    templateUrl: './bio-knowmyminister-dialog.component.html'
})
export class BioKnowmyministerDialogComponent implements OnInit {

    bio: BioKnowmyminister;
    isSaving: boolean;

    languages: LanguageKnowmyminister[];

    profilepictures: ImageKnowmyminister[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private bioService: BioKnowmyministerService,
        private languageService: LanguageKnowmyministerService,
        private imageService: ImageKnowmyministerService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.languageService
            .query({filter: 'bio-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.bio.languageId) {
                    this.languages = res.json;
                } else {
                    this.languageService
                        .find(this.bio.languageId)
                        .subscribe((subRes: LanguageKnowmyminister) => {
                            this.languages = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.imageService
            .query({filter: 'bio-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.bio.profilePictureId) {
                    this.profilepictures = res.json;
                } else {
                    this.imageService
                        .find(this.bio.profilePictureId)
                        .subscribe((subRes: ImageKnowmyminister) => {
                            this.profilepictures = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.bio.id !== undefined) {
            this.subscribeToSaveResponse(
                this.bioService.update(this.bio));
        } else {
            this.subscribeToSaveResponse(
                this.bioService.create(this.bio));
        }
    }

    private subscribeToSaveResponse(result: Observable<BioKnowmyminister>) {
        result.subscribe((res: BioKnowmyminister) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: BioKnowmyminister) {
        this.eventManager.broadcast({ name: 'bioListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackLanguageById(index: number, item: LanguageKnowmyminister) {
        return item.id;
    }

    trackImageById(index: number, item: ImageKnowmyminister) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-bio-knowmyminister-popup',
    template: ''
})
export class BioKnowmyministerPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private bioPopupService: BioKnowmyministerPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.bioPopupService
                    .open(BioKnowmyministerDialogComponent as Component, params['id']);
            } else {
                this.bioPopupService
                    .open(BioKnowmyministerDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
