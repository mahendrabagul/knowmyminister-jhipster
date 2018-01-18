import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { LanguageKnowmyminister } from './language-knowmyminister.model';
import { LanguageKnowmyministerPopupService } from './language-knowmyminister-popup.service';
import { LanguageKnowmyministerService } from './language-knowmyminister.service';

@Component({
    selector: 'jhi-language-knowmyminister-delete-dialog',
    templateUrl: './language-knowmyminister-delete-dialog.component.html'
})
export class LanguageKnowmyministerDeleteDialogComponent {

    language: LanguageKnowmyminister;

    constructor(
        private languageService: LanguageKnowmyministerService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.languageService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'languageListModification',
                content: 'Deleted an language'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-language-knowmyminister-delete-popup',
    template: ''
})
export class LanguageKnowmyministerDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private languagePopupService: LanguageKnowmyministerPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.languagePopupService
                .open(LanguageKnowmyministerDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
