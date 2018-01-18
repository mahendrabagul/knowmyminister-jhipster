import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PhotoKnowmyminister } from './photo-knowmyminister.model';
import { PhotoKnowmyministerPopupService } from './photo-knowmyminister-popup.service';
import { PhotoKnowmyministerService } from './photo-knowmyminister.service';

@Component({
    selector: 'jhi-photo-knowmyminister-delete-dialog',
    templateUrl: './photo-knowmyminister-delete-dialog.component.html'
})
export class PhotoKnowmyministerDeleteDialogComponent {

    photo: PhotoKnowmyminister;

    constructor(
        private photoService: PhotoKnowmyministerService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.photoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'photoListModification',
                content: 'Deleted an photo'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-photo-knowmyminister-delete-popup',
    template: ''
})
export class PhotoKnowmyministerDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private photoPopupService: PhotoKnowmyministerPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.photoPopupService
                .open(PhotoKnowmyministerDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
