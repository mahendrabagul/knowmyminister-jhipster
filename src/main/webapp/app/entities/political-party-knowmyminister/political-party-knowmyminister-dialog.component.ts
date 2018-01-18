import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { PoliticalPartyKnowmyminister } from './political-party-knowmyminister.model';
import { PoliticalPartyKnowmyministerPopupService } from './political-party-knowmyminister-popup.service';
import { PoliticalPartyKnowmyministerService } from './political-party-knowmyminister.service';
import { ImageKnowmyminister, ImageKnowmyministerService } from '../image-knowmyminister';
import { MinisterKnowmyminister, MinisterKnowmyministerService } from '../minister-knowmyminister';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-political-party-knowmyminister-dialog',
    templateUrl: './political-party-knowmyminister-dialog.component.html'
})
export class PoliticalPartyKnowmyministerDialogComponent implements OnInit {

    politicalParty: PoliticalPartyKnowmyminister;
    isSaving: boolean;

    logos: ImageKnowmyminister[];

    presidents: MinisterKnowmyminister[];

    rajyasabhaleaders: MinisterKnowmyminister[];

    loksabhaleaders: MinisterKnowmyminister[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private politicalPartyService: PoliticalPartyKnowmyministerService,
        private imageService: ImageKnowmyministerService,
        private ministerService: MinisterKnowmyministerService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.imageService
            .query({filter: 'politicalparty-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.politicalParty.logoId) {
                    this.logos = res.json;
                } else {
                    this.imageService
                        .find(this.politicalParty.logoId)
                        .subscribe((subRes: ImageKnowmyminister) => {
                            this.logos = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.ministerService
            .query({filter: 'politicalparty-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.politicalParty.presidentId) {
                    this.presidents = res.json;
                } else {
                    this.ministerService
                        .find(this.politicalParty.presidentId)
                        .subscribe((subRes: MinisterKnowmyminister) => {
                            this.presidents = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.ministerService
            .query({filter: 'politicalparty-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.politicalParty.rajyasabhaLeaderId) {
                    this.rajyasabhaleaders = res.json;
                } else {
                    this.ministerService
                        .find(this.politicalParty.rajyasabhaLeaderId)
                        .subscribe((subRes: MinisterKnowmyminister) => {
                            this.rajyasabhaleaders = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.ministerService
            .query({filter: 'politicalparty-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.politicalParty.loksabhaLeaderId) {
                    this.loksabhaleaders = res.json;
                } else {
                    this.ministerService
                        .find(this.politicalParty.loksabhaLeaderId)
                        .subscribe((subRes: MinisterKnowmyminister) => {
                            this.loksabhaleaders = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.politicalParty.id !== undefined) {
            this.subscribeToSaveResponse(
                this.politicalPartyService.update(this.politicalParty));
        } else {
            this.subscribeToSaveResponse(
                this.politicalPartyService.create(this.politicalParty));
        }
    }

    private subscribeToSaveResponse(result: Observable<PoliticalPartyKnowmyminister>) {
        result.subscribe((res: PoliticalPartyKnowmyminister) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: PoliticalPartyKnowmyminister) {
        this.eventManager.broadcast({ name: 'politicalPartyListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackImageById(index: number, item: ImageKnowmyminister) {
        return item.id;
    }

    trackMinisterById(index: number, item: MinisterKnowmyminister) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-political-party-knowmyminister-popup',
    template: ''
})
export class PoliticalPartyKnowmyministerPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private politicalPartyPopupService: PoliticalPartyKnowmyministerPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.politicalPartyPopupService
                    .open(PoliticalPartyKnowmyministerDialogComponent as Component, params['id']);
            } else {
                this.politicalPartyPopupService
                    .open(PoliticalPartyKnowmyministerDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
