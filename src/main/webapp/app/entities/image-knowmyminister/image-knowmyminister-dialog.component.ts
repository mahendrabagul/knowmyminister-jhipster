import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ImageKnowmyminister } from './image-knowmyminister.model';
import { ImageKnowmyministerPopupService } from './image-knowmyminister-popup.service';
import { ImageKnowmyministerService } from './image-knowmyminister.service';

@Component({
    selector: 'jhi-image-knowmyminister-dialog',
    templateUrl: './image-knowmyminister-dialog.component.html'
})
export class ImageKnowmyministerDialogComponent implements OnInit {

    image: ImageKnowmyminister;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private imageService: ImageKnowmyministerService,
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
        if (this.image.id !== undefined) {
            this.subscribeToSaveResponse(
                this.imageService.update(this.image));
        } else {
            this.subscribeToSaveResponse(
                this.imageService.create(this.image));
        }
    }

    private subscribeToSaveResponse(result: Observable<ImageKnowmyminister>) {
        result.subscribe((res: ImageKnowmyminister) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: ImageKnowmyminister) {
        this.eventManager.broadcast({ name: 'imageListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-image-knowmyminister-popup',
    template: ''
})
export class ImageKnowmyministerPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private imagePopupService: ImageKnowmyministerPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.imagePopupService
                    .open(ImageKnowmyministerDialogComponent as Component, params['id']);
            } else {
                this.imagePopupService
                    .open(ImageKnowmyministerDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
