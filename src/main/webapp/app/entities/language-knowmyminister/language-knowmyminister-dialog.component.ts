import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { LanguageKnowmyminister } from './language-knowmyminister.model';
import { LanguageKnowmyministerPopupService } from './language-knowmyminister-popup.service';
import { LanguageKnowmyministerService } from './language-knowmyminister.service';

@Component({
    selector: 'jhi-language-knowmyminister-dialog',
    templateUrl: './language-knowmyminister-dialog.component.html'
})
export class LanguageKnowmyministerDialogComponent implements OnInit {

    language: LanguageKnowmyminister;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private languageService: LanguageKnowmyministerService,
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
        if (this.language.id !== undefined) {
            this.subscribeToSaveResponse(
                this.languageService.update(this.language));
        } else {
            this.subscribeToSaveResponse(
                this.languageService.create(this.language));
        }
    }

    private subscribeToSaveResponse(result: Observable<LanguageKnowmyminister>) {
        result.subscribe((res: LanguageKnowmyminister) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: LanguageKnowmyminister) {
        this.eventManager.broadcast({ name: 'languageListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-language-knowmyminister-popup',
    template: ''
})
export class LanguageKnowmyministerPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private languagePopupService: LanguageKnowmyministerPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.languagePopupService
                    .open(LanguageKnowmyministerDialogComponent as Component, params['id']);
            } else {
                this.languagePopupService
                    .open(LanguageKnowmyministerDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
