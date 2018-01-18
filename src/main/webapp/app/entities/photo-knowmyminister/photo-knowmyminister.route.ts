import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PhotoKnowmyministerComponent } from './photo-knowmyminister.component';
import { PhotoKnowmyministerDetailComponent } from './photo-knowmyminister-detail.component';
import { PhotoKnowmyministerPopupComponent } from './photo-knowmyminister-dialog.component';
import { PhotoKnowmyministerDeletePopupComponent } from './photo-knowmyminister-delete-dialog.component';

export const photoRoute: Routes = [
    {
        path: 'photo-knowmyminister',
        component: PhotoKnowmyministerComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'knowMyMinisterApp.photo.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'photo-knowmyminister/:id',
        component: PhotoKnowmyministerDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'knowMyMinisterApp.photo.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const photoPopupRoute: Routes = [
    {
        path: 'photo-knowmyminister-new',
        component: PhotoKnowmyministerPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'knowMyMinisterApp.photo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'photo-knowmyminister/:id/edit',
        component: PhotoKnowmyministerPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'knowMyMinisterApp.photo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'photo-knowmyminister/:id/delete',
        component: PhotoKnowmyministerDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'knowMyMinisterApp.photo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
