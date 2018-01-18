import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { BioKnowmyminister } from './bio-knowmyminister.model';
import { BioKnowmyministerService } from './bio-knowmyminister.service';

@Component({
    selector: 'jhi-bio-knowmyminister-detail',
    templateUrl: './bio-knowmyminister-detail.component.html'
})
export class BioKnowmyministerDetailComponent implements OnInit, OnDestroy {

    bio: BioKnowmyminister;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private bioService: BioKnowmyministerService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInBios();
    }

    load(id) {
        this.bioService.find(id).subscribe((bio) => {
            this.bio = bio;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInBios() {
        this.eventSubscriber = this.eventManager.subscribe(
            'bioListModification',
            (response) => this.load(this.bio.id)
        );
    }
}
