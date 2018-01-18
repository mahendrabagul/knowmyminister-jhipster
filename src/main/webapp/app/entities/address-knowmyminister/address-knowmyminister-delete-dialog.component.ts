import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { AddressKnowmyminister } from './address-knowmyminister.model';
import { AddressKnowmyministerPopupService } from './address-knowmyminister-popup.service';
import { AddressKnowmyministerService } from './address-knowmyminister.service';

@Component({
    selector: 'jhi-address-knowmyminister-delete-dialog',
    templateUrl: './address-knowmyminister-delete-dialog.component.html'
})
export class AddressKnowmyministerDeleteDialogComponent {

    address: AddressKnowmyminister;

    constructor(
        private addressService: AddressKnowmyministerService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.addressService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'addressListModification',
                content: 'Deleted an address'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-address-knowmyminister-delete-popup',
    template: ''
})
export class AddressKnowmyministerDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private addressPopupService: AddressKnowmyministerPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.addressPopupService
                .open(AddressKnowmyministerDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
