import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { WorkExperienceKnowmyminister } from './work-experience-knowmyminister.model';
import { WorkExperienceKnowmyministerService } from './work-experience-knowmyminister.service';

@Component({
    selector: 'jhi-work-experience-knowmyminister-detail',
    templateUrl: './work-experience-knowmyminister-detail.component.html'
})
export class WorkExperienceKnowmyministerDetailComponent implements OnInit, OnDestroy {

    workExperience: WorkExperienceKnowmyminister;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private workExperienceService: WorkExperienceKnowmyministerService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInWorkExperiences();
    }

    load(id) {
        this.workExperienceService.find(id).subscribe((workExperience) => {
            this.workExperience = workExperience;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInWorkExperiences() {
        this.eventSubscriber = this.eventManager.subscribe(
            'workExperienceListModification',
            (response) => this.load(this.workExperience.id)
        );
    }
}
