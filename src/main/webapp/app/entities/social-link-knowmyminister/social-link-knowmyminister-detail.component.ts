import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { SocialLinkKnowmyminister } from './social-link-knowmyminister.model';
import { SocialLinkKnowmyministerService } from './social-link-knowmyminister.service';

@Component({
    selector: 'jhi-social-link-knowmyminister-detail',
    templateUrl: './social-link-knowmyminister-detail.component.html'
})
export class SocialLinkKnowmyministerDetailComponent implements OnInit, OnDestroy {

    socialLink: SocialLinkKnowmyminister;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private socialLinkService: SocialLinkKnowmyministerService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSocialLinks();
    }

    load(id) {
        this.socialLinkService.find(id).subscribe((socialLink) => {
            this.socialLink = socialLink;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInSocialLinks() {
        this.eventSubscriber = this.eventManager.subscribe(
            'socialLinkListModification',
            (response) => this.load(this.socialLink.id)
        );
    }
}
