import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { AwardKnowmyminister } from './award-knowmyminister.model';
import { AwardKnowmyministerPopupService } from './award-knowmyminister-popup.service';
import { AwardKnowmyministerService } from './award-knowmyminister.service';

@Component({
    selector: 'jhi-award-knowmyminister-delete-dialog',
    templateUrl: './award-knowmyminister-delete-dialog.component.html'
})
export class AwardKnowmyministerDeleteDialogComponent {

    award: AwardKnowmyminister;

    constructor(
        private awardService: AwardKnowmyministerService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.awardService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'awardListModification',
                content: 'Deleted an award'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-award-knowmyminister-delete-popup',
    template: ''
})
export class AwardKnowmyministerDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private awardPopupService: AwardKnowmyministerPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.awardPopupService
                .open(AwardKnowmyministerDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
