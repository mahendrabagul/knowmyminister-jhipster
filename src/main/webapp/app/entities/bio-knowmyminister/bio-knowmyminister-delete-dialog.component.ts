import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { BioKnowmyminister } from './bio-knowmyminister.model';
import { BioKnowmyministerPopupService } from './bio-knowmyminister-popup.service';
import { BioKnowmyministerService } from './bio-knowmyminister.service';

@Component({
    selector: 'jhi-bio-knowmyminister-delete-dialog',
    templateUrl: './bio-knowmyminister-delete-dialog.component.html'
})
export class BioKnowmyministerDeleteDialogComponent {

    bio: BioKnowmyminister;

    constructor(
        private bioService: BioKnowmyministerService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.bioService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'bioListModification',
                content: 'Deleted an bio'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-bio-knowmyminister-delete-popup',
    template: ''
})
export class BioKnowmyministerDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private bioPopupService: BioKnowmyministerPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.bioPopupService
                .open(BioKnowmyministerDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
