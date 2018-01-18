import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { LanguageKnowmyminister } from './language-knowmyminister.model';
import { LanguageKnowmyministerService } from './language-knowmyminister.service';

@Component({
    selector: 'jhi-language-knowmyminister-detail',
    templateUrl: './language-knowmyminister-detail.component.html'
})
export class LanguageKnowmyministerDetailComponent implements OnInit, OnDestroy {

    language: LanguageKnowmyminister;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private languageService: LanguageKnowmyministerService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInLanguages();
    }

    load(id) {
        this.languageService.find(id).subscribe((language) => {
            this.language = language;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInLanguages() {
        this.eventSubscriber = this.eventManager.subscribe(
            'languageListModification',
            (response) => this.load(this.language.id)
        );
    }
}
