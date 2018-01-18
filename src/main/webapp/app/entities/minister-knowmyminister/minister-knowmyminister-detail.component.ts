import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { MinisterKnowmyminister } from './minister-knowmyminister.model';
import { MinisterKnowmyministerService } from './minister-knowmyminister.service';

@Component({
    selector: 'jhi-minister-knowmyminister-detail',
    templateUrl: './minister-knowmyminister-detail.component.html'
})
export class MinisterKnowmyministerDetailComponent implements OnInit, OnDestroy {

    minister: MinisterKnowmyminister;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private ministerService: MinisterKnowmyministerService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInMinisters();
    }

    load(id) {
        this.ministerService.find(id).subscribe((minister) => {
            this.minister = minister;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInMinisters() {
        this.eventSubscriber = this.eventManager.subscribe(
            'ministerListModification',
            (response) => this.load(this.minister.id)
        );
    }
}
