import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CountryKnowmyminister } from './country-knowmyminister.model';
import { CountryKnowmyministerPopupService } from './country-knowmyminister-popup.service';
import { CountryKnowmyministerService } from './country-knowmyminister.service';

@Component({
    selector: 'jhi-country-knowmyminister-delete-dialog',
    templateUrl: './country-knowmyminister-delete-dialog.component.html'
})
export class CountryKnowmyministerDeleteDialogComponent {

    country: CountryKnowmyminister;

    constructor(
        private countryService: CountryKnowmyministerService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.countryService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'countryListModification',
                content: 'Deleted an country'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-country-knowmyminister-delete-popup',
    template: ''
})
export class CountryKnowmyministerDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private countryPopupService: CountryKnowmyministerPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.countryPopupService
                .open(CountryKnowmyministerDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
