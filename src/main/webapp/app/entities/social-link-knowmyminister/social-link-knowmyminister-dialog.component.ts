import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { SocialLinkKnowmyminister } from './social-link-knowmyminister.model';
import { SocialLinkKnowmyministerPopupService } from './social-link-knowmyminister-popup.service';
import { SocialLinkKnowmyministerService } from './social-link-knowmyminister.service';
import { MinisterKnowmyminister, MinisterKnowmyministerService } from '../minister-knowmyminister';
import { PoliticalPartyKnowmyminister, PoliticalPartyKnowmyministerService } from '../political-party-knowmyminister';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-social-link-knowmyminister-dialog',
    templateUrl: './social-link-knowmyminister-dialog.component.html'
})
export class SocialLinkKnowmyministerDialogComponent implements OnInit {

    socialLink: SocialLinkKnowmyminister;
    isSaving: boolean;

    ministers: MinisterKnowmyminister[];

    politicalparties: PoliticalPartyKnowmyminister[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private socialLinkService: SocialLinkKnowmyministerService,
        private ministerService: MinisterKnowmyministerService,
        private politicalPartyService: PoliticalPartyKnowmyministerService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.ministerService.query()
            .subscribe((res: ResponseWrapper) => { this.ministers = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.politicalPartyService.query()
            .subscribe((res: ResponseWrapper) => { this.politicalparties = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.socialLink.id !== undefined) {
            this.subscribeToSaveResponse(
                this.socialLinkService.update(this.socialLink));
        } else {
            this.subscribeToSaveResponse(
                this.socialLinkService.create(this.socialLink));
        }
    }

    private subscribeToSaveResponse(result: Observable<SocialLinkKnowmyminister>) {
        result.subscribe((res: SocialLinkKnowmyminister) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: SocialLinkKnowmyminister) {
        this.eventManager.broadcast({ name: 'socialLinkListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackMinisterById(index: number, item: MinisterKnowmyminister) {
        return item.id;
    }

    trackPoliticalPartyById(index: number, item: PoliticalPartyKnowmyminister) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-social-link-knowmyminister-popup',
    template: ''
})
export class SocialLinkKnowmyministerPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private socialLinkPopupService: SocialLinkKnowmyministerPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.socialLinkPopupService
                    .open(SocialLinkKnowmyministerDialogComponent as Component, params['id']);
            } else {
                this.socialLinkPopupService
                    .open(SocialLinkKnowmyministerDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
