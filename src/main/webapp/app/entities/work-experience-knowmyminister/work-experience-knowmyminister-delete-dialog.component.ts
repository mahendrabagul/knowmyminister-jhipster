import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { WorkExperienceKnowmyminister } from './work-experience-knowmyminister.model';
import { WorkExperienceKnowmyministerPopupService } from './work-experience-knowmyminister-popup.service';
import { WorkExperienceKnowmyministerService } from './work-experience-knowmyminister.service';

@Component({
    selector: 'jhi-work-experience-knowmyminister-delete-dialog',
    templateUrl: './work-experience-knowmyminister-delete-dialog.component.html'
})
export class WorkExperienceKnowmyministerDeleteDialogComponent {

    workExperience: WorkExperienceKnowmyminister;

    constructor(
        private workExperienceService: WorkExperienceKnowmyministerService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.workExperienceService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'workExperienceListModification',
                content: 'Deleted an workExperience'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-work-experience-knowmyminister-delete-popup',
    template: ''
})
export class WorkExperienceKnowmyministerDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private workExperiencePopupService: WorkExperienceKnowmyministerPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.workExperiencePopupService
                .open(WorkExperienceKnowmyministerDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
