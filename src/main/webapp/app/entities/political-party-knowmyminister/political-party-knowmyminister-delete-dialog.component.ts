import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PoliticalPartyKnowmyminister } from './political-party-knowmyminister.model';
import { PoliticalPartyKnowmyministerPopupService } from './political-party-knowmyminister-popup.service';
import { PoliticalPartyKnowmyministerService } from './political-party-knowmyminister.service';

@Component({
    selector: 'jhi-political-party-knowmyminister-delete-dialog',
    templateUrl: './political-party-knowmyminister-delete-dialog.component.html'
})
export class PoliticalPartyKnowmyministerDeleteDialogComponent {

    politicalParty: PoliticalPartyKnowmyminister;

    constructor(
        private politicalPartyService: PoliticalPartyKnowmyministerService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.politicalPartyService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'politicalPartyListModification',
                content: 'Deleted an politicalParty'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-political-party-knowmyminister-delete-popup',
    template: ''
})
export class PoliticalPartyKnowmyministerDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private politicalPartyPopupService: PoliticalPartyKnowmyministerPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.politicalPartyPopupService
                .open(PoliticalPartyKnowmyministerDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
