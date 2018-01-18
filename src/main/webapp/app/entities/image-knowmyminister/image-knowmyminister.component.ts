import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ImageKnowmyminister } from './image-knowmyminister.model';
import { ImageKnowmyministerService } from './image-knowmyminister.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-image-knowmyminister',
    templateUrl: './image-knowmyminister.component.html'
})
export class ImageKnowmyministerComponent implements OnInit, OnDestroy {
images: ImageKnowmyminister[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private imageService: ImageKnowmyministerService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch = this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search'] ?
            this.activatedRoute.snapshot.params['search'] : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.imageService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: ResponseWrapper) => this.images = res.json,
                    (res: ResponseWrapper) => this.onError(res.json)
                );
            return;
       }
        this.imageService.query().subscribe(
            (res: ResponseWrapper) => {
                this.images = res.json;
                this.currentSearch = '';
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    search(query) {
        if (!query) {
            return this.clear();
        }
        this.currentSearch = query;
        this.loadAll();
    }

    clear() {
        this.currentSearch = '';
        this.loadAll();
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInImages();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ImageKnowmyminister) {
        return item.id;
    }
    registerChangeInImages() {
        this.eventSubscriber = this.eventManager.subscribe('imageListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
