import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ImageKnowmyminister } from './image-knowmyminister.model';
import { ImageKnowmyministerPopupService } from './image-knowmyminister-popup.service';
import { ImageKnowmyministerService } from './image-knowmyminister.service';

@Component({
    selector: 'jhi-image-knowmyminister-delete-dialog',
    templateUrl: './image-knowmyminister-delete-dialog.component.html'
})
export class ImageKnowmyministerDeleteDialogComponent {

    image: ImageKnowmyminister;

    constructor(
        private imageService: ImageKnowmyministerService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.imageService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'imageListModification',
                content: 'Deleted an image'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-image-knowmyminister-delete-popup',
    template: ''
})
export class ImageKnowmyministerDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private imagePopupService: ImageKnowmyministerPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.imagePopupService
                .open(ImageKnowmyministerDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
