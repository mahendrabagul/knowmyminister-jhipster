import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { SocialLinkKnowmyminister } from './social-link-knowmyminister.model';
import { SocialLinkKnowmyministerService } from './social-link-knowmyminister.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-social-link-knowmyminister',
    templateUrl: './social-link-knowmyminister.component.html'
})
export class SocialLinkKnowmyministerComponent implements OnInit, OnDestroy {
socialLinks: SocialLinkKnowmyminister[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private socialLinkService: SocialLinkKnowmyministerService,
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
            this.socialLinkService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: ResponseWrapper) => this.socialLinks = res.json,
                    (res: ResponseWrapper) => this.onError(res.json)
                );
            return;
       }
        this.socialLinkService.query().subscribe(
            (res: ResponseWrapper) => {
                this.socialLinks = res.json;
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
        this.registerChangeInSocialLinks();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: SocialLinkKnowmyminister) {
        return item.id;
    }
    registerChangeInSocialLinks() {
        this.eventSubscriber = this.eventManager.subscribe('socialLinkListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
