import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { BioKnowmyministerComponent } from './bio-knowmyminister.component';
import { BioKnowmyministerDetailComponent } from './bio-knowmyminister-detail.component';
import { BioKnowmyministerPopupComponent } from './bio-knowmyminister-dialog.component';
import { BioKnowmyministerDeletePopupComponent } from './bio-knowmyminister-delete-dialog.component';

export const bioRoute: Routes = [
    {
        path: 'bio-knowmyminister',
        component: BioKnowmyministerComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'knowMyMinisterApp.bio.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'bio-knowmyminister/:id',
        component: BioKnowmyministerDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'knowMyMinisterApp.bio.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const bioPopupRoute: Routes = [
    {
        path: 'bio-knowmyminister-new',
        component: BioKnowmyministerPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'knowMyMinisterApp.bio.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'bio-knowmyminister/:id/edit',
        component: BioKnowmyministerPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'knowMyMinisterApp.bio.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'bio-knowmyminister/:id/delete',
        component: BioKnowmyministerDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'knowMyMinisterApp.bio.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
