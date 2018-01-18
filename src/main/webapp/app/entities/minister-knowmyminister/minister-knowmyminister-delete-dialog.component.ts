import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { MinisterKnowmyminister } from './minister-knowmyminister.model';
import { MinisterKnowmyministerPopupService } from './minister-knowmyminister-popup.service';
import { MinisterKnowmyministerService } from './minister-knowmyminister.service';

@Component({
    selector: 'jhi-minister-knowmyminister-delete-dialog',
    templateUrl: './minister-knowmyminister-delete-dialog.component.html'
})
export class MinisterKnowmyministerDeleteDialogComponent {

    minister: MinisterKnowmyminister;

    constructor(
        private ministerService: MinisterKnowmyministerService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.ministerService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'ministerListModification',
                content: 'Deleted an minister'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-minister-knowmyminister-delete-popup',
    template: ''
})
export class MinisterKnowmyministerDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private ministerPopupService: MinisterKnowmyministerPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.ministerPopupService
                .open(MinisterKnowmyministerDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
