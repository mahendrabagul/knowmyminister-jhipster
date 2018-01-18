import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { AwardKnowmyminister } from './award-knowmyminister.model';
import { AwardKnowmyministerService } from './award-knowmyminister.service';

@Component({
    selector: 'jhi-award-knowmyminister-detail',
    templateUrl: './award-knowmyminister-detail.component.html'
})
export class AwardKnowmyministerDetailComponent implements OnInit, OnDestroy {

    award: AwardKnowmyminister;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private awardService: AwardKnowmyministerService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInAwards();
    }

    load(id) {
        this.awardService.find(id).subscribe((award) => {
            this.award = award;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAwards() {
        this.eventSubscriber = this.eventManager.subscribe(
            'awardListModification',
            (response) => this.load(this.award.id)
        );
    }
}
