import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { EducationKnowmyminister } from './education-knowmyminister.model';
import { EducationKnowmyministerPopupService } from './education-knowmyminister-popup.service';
import { EducationKnowmyministerService } from './education-knowmyminister.service';

@Component({
    selector: 'jhi-education-knowmyminister-delete-dialog',
    templateUrl: './education-knowmyminister-delete-dialog.component.html'
})
export class EducationKnowmyministerDeleteDialogComponent {

    education: EducationKnowmyminister;

    constructor(
        private educationService: EducationKnowmyministerService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.educationService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'educationListModification',
                content: 'Deleted an education'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-education-knowmyminister-delete-popup',
    template: ''
})
export class EducationKnowmyministerDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private educationPopupService: EducationKnowmyministerPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.educationPopupService
                .open(EducationKnowmyministerDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
