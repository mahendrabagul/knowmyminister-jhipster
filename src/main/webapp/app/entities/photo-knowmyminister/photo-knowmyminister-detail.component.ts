import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { PhotoKnowmyminister } from './photo-knowmyminister.model';
import { PhotoKnowmyministerService } from './photo-knowmyminister.service';

@Component({
    selector: 'jhi-photo-knowmyminister-detail',
    templateUrl: './photo-knowmyminister-detail.component.html'
})
export class PhotoKnowmyministerDetailComponent implements OnInit, OnDestroy {

    photo: PhotoKnowmyminister;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private photoService: PhotoKnowmyministerService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPhotos();
    }

    load(id) {
        this.photoService.find(id).subscribe((photo) => {
            this.photo = photo;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPhotos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'photoListModification',
            (response) => this.load(this.photo.id)
        );
    }
}
