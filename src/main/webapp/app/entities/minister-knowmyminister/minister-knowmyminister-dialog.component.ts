import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { MinisterKnowmyminister } from './minister-knowmyminister.model';
import { MinisterKnowmyministerPopupService } from './minister-knowmyminister-popup.service';
import { MinisterKnowmyministerService } from './minister-knowmyminister.service';
import { ImageKnowmyminister, ImageKnowmyministerService } from '../image-knowmyminister';
import { PoliticalPartyKnowmyminister, PoliticalPartyKnowmyministerService } from '../political-party-knowmyminister';
import { BioKnowmyminister, BioKnowmyministerService } from '../bio-knowmyminister';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-minister-knowmyminister-dialog',
    templateUrl: './minister-knowmyminister-dialog.component.html'
})
export class MinisterKnowmyministerDialogComponent implements OnInit {

    minister: MinisterKnowmyminister;
    isSaving: boolean;

    electionsigns: ImageKnowmyminister[];

    parties: PoliticalPartyKnowmyminister[];

    bios: BioKnowmyminister[];

    politicalparties: PoliticalPartyKnowmyminister[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private ministerService: MinisterKnowmyministerService,
        private imageService: ImageKnowmyministerService,
        private politicalPartyService: PoliticalPartyKnowmyministerService,
        private bioService: BioKnowmyministerService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.imageService
            .query({filter: 'minister-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.minister.electionSignId) {
                    this.electionsigns = res.json;
                } else {
                    this.imageService
                        .find(this.minister.electionSignId)
                        .subscribe((subRes: ImageKnowmyminister) => {
                            this.electionsigns = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.politicalPartyService
            .query({filter: 'minister-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.minister.partyId) {
                    this.parties = res.json;
                } else {
                    this.politicalPartyService
                        .find(this.minister.partyId)
                        .subscribe((subRes: PoliticalPartyKnowmyminister) => {
                            this.parties = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.bioService
            .query({filter: 'minister-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.minister.bioId) {
                    this.bios = res.json;
                } else {
                    this.bioService
                        .find(this.minister.bioId)
                        .subscribe((subRes: BioKnowmyminister) => {
                            this.bios = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.politicalPartyService.query()
            .subscribe((res: ResponseWrapper) => { this.politicalparties = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.minister.id !== undefined) {
            this.subscribeToSaveResponse(
                this.ministerService.update(this.minister));
        } else {
            this.subscribeToSaveResponse(
                this.ministerService.create(this.minister));
        }
    }

    private subscribeToSaveResponse(result: Observable<MinisterKnowmyminister>) {
        result.subscribe((res: MinisterKnowmyminister) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: MinisterKnowmyminister) {
        this.eventManager.broadcast({ name: 'ministerListModification', content: 'OK'});
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

    trackPoliticalPartyById(index: number, item: PoliticalPartyKnowmyminister) {
        return item.id;
    }

    trackBioById(index: number, item: BioKnowmyminister) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-minister-knowmyminister-popup',
    template: ''
})
export class MinisterKnowmyministerPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private ministerPopupService: MinisterKnowmyministerPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.ministerPopupService
                    .open(MinisterKnowmyministerDialogComponent as Component, params['id']);
            } else {
                this.ministerPopupService
                    .open(MinisterKnowmyministerDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
