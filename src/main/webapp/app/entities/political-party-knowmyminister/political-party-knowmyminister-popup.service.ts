import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { PoliticalPartyKnowmyminister } from './political-party-knowmyminister.model';
import { PoliticalPartyKnowmyministerService } from './political-party-knowmyminister.service';

@Injectable()
export class PoliticalPartyKnowmyministerPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private politicalPartyService: PoliticalPartyKnowmyministerService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.politicalPartyService.find(id).subscribe((politicalParty) => {
                    this.ngbModalRef = this.politicalPartyModalRef(component, politicalParty);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.politicalPartyModalRef(component, new PoliticalPartyKnowmyminister());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    politicalPartyModalRef(component: Component, politicalParty: PoliticalPartyKnowmyminister): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.politicalParty = politicalParty;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
