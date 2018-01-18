import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { BioKnowmyminister } from './bio-knowmyminister.model';
import { BioKnowmyministerService } from './bio-knowmyminister.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-bio-knowmyminister',
    templateUrl: './bio-knowmyminister.component.html'
})
export class BioKnowmyministerComponent implements OnInit, OnDestroy {
bios: BioKnowmyminister[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private bioService: BioKnowmyministerService,
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
            this.bioService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: ResponseWrapper) => this.bios = res.json,
                    (res: ResponseWrapper) => this.onError(res.json)
                );
            return;
       }
        this.bioService.query().subscribe(
            (res: ResponseWrapper) => {
                this.bios = res.json;
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
        this.registerChangeInBios();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: BioKnowmyminister) {
        return item.id;
    }
    registerChangeInBios() {
        this.eventSubscriber = this.eventManager.subscribe('bioListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
