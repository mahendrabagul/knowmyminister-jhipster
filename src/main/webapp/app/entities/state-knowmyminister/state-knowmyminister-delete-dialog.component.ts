import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { StateKnowmyminister } from './state-knowmyminister.model';
import { StateKnowmyministerPopupService } from './state-knowmyminister-popup.service';
import { StateKnowmyministerService } from './state-knowmyminister.service';

@Component({
    selector: 'jhi-state-knowmyminister-delete-dialog',
    templateUrl: './state-knowmyminister-delete-dialog.component.html'
})
export class StateKnowmyministerDeleteDialogComponent {

    state: StateKnowmyminister;

    constructor(
        private stateService: StateKnowmyministerService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.stateService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'stateListModification',
                content: 'Deleted an state'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-state-knowmyminister-delete-popup',
    template: ''
})
export class StateKnowmyministerDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private statePopupService: StateKnowmyministerPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.statePopupService
                .open(StateKnowmyministerDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
