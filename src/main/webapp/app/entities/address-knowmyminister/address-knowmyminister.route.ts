import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { AddressKnowmyministerComponent } from './address-knowmyminister.component';
import { AddressKnowmyministerDetailComponent } from './address-knowmyminister-detail.component';
import { AddressKnowmyministerPopupComponent } from './address-knowmyminister-dialog.component';
import { AddressKnowmyministerDeletePopupComponent } from './address-knowmyminister-delete-dialog.component';

export const addressRoute: Routes = [
    {
        path: 'address-knowmyminister',
        component: AddressKnowmyministerComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'knowMyMinisterApp.address.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'address-knowmyminister/:id',
        component: AddressKnowmyministerDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'knowMyMinisterApp.address.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const addressPopupRoute: Routes = [
    {
        path: 'address-knowmyminister-new',
        component: AddressKnowmyministerPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'knowMyMinisterApp.address.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'address-knowmyminister/:id/edit',
        component: AddressKnowmyministerPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'knowMyMinisterApp.address.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'address-knowmyminister/:id/delete',
        component: AddressKnowmyministerDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'knowMyMinisterApp.address.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
