import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { PoliticalPartyKnowmyminister } from './political-party-knowmyminister.model';
import { PoliticalPartyKnowmyministerService } from './political-party-knowmyminister.service';

@Component({
    selector: 'jhi-political-party-knowmyminister-detail',
    templateUrl: './political-party-knowmyminister-detail.component.html'
})
export class PoliticalPartyKnowmyministerDetailComponent implements OnInit, OnDestroy {

    politicalParty: PoliticalPartyKnowmyminister;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private politicalPartyService: PoliticalPartyKnowmyministerService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPoliticalParties();
    }

    load(id) {
        this.politicalPartyService.find(id).subscribe((politicalParty) => {
            this.politicalParty = politicalParty;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPoliticalParties() {
        this.eventSubscriber = this.eventManager.subscribe(
            'politicalPartyListModification',
            (response) => this.load(this.politicalParty.id)
        );
    }
}
