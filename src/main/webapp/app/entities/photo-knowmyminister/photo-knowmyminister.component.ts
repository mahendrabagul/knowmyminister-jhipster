import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { PhotoKnowmyminister } from './photo-knowmyminister.model';
import { PhotoKnowmyministerService } from './photo-knowmyminister.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-photo-knowmyminister',
    templateUrl: './photo-knowmyminister.component.html'
})
export class PhotoKnowmyministerComponent implements OnInit, OnDestroy {
photos: PhotoKnowmyminister[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private photoService: PhotoKnowmyministerService,
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
            this.photoService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: ResponseWrapper) => this.photos = res.json,
                    (res: ResponseWrapper) => this.onError(res.json)
                );
            return;
       }
        this.photoService.query().subscribe(
            (res: ResponseWrapper) => {
                this.photos = res.json;
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
        this.registerChangeInPhotos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: PhotoKnowmyminister) {
        return item.id;
    }
    registerChangeInPhotos() {
        this.eventSubscriber = this.eventManager.subscribe('photoListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
