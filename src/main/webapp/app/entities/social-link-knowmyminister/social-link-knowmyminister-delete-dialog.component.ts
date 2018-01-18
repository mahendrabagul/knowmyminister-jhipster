import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SocialLinkKnowmyminister } from './social-link-knowmyminister.model';
import { SocialLinkKnowmyministerPopupService } from './social-link-knowmyminister-popup.service';
import { SocialLinkKnowmyministerService } from './social-link-knowmyminister.service';

@Component({
    selector: 'jhi-social-link-knowmyminister-delete-dialog',
    templateUrl: './social-link-knowmyminister-delete-dialog.component.html'
})
export class SocialLinkKnowmyministerDeleteDialogComponent {

    socialLink: SocialLinkKnowmyminister;

    constructor(
        private socialLinkService: SocialLinkKnowmyministerService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.socialLinkService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'socialLinkListModification',
                content: 'Deleted an socialLink'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-social-link-knowmyminister-delete-popup',
    template: ''
})
export class SocialLinkKnowmyministerDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private socialLinkPopupService: SocialLinkKnowmyministerPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.socialLinkPopupService
                .open(SocialLinkKnowmyministerDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
