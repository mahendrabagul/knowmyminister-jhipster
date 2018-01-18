import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ImageKnowmyminister } from './image-knowmyminister.model';
import { ImageKnowmyministerService } from './image-knowmyminister.service';

@Component({
    selector: 'jhi-image-knowmyminister-detail',
    templateUrl: './image-knowmyminister-detail.component.html'
})
export class ImageKnowmyministerDetailComponent implements OnInit, OnDestroy {

    image: ImageKnowmyminister;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private imageService: ImageKnowmyministerService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInImages();
    }

    load(id) {
        this.imageService.find(id).subscribe((image) => {
            this.image = image;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInImages() {
        this.eventSubscriber = this.eventManager.subscribe(
            'imageListModification',
            (response) => this.load(this.image.id)
        );
    }
}
