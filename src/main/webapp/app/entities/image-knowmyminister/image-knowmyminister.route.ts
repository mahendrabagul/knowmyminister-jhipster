import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ImageKnowmyministerComponent } from './image-knowmyminister.component';
import { ImageKnowmyministerDetailComponent } from './image-knowmyminister-detail.component';
import { ImageKnowmyministerPopupComponent } from './image-knowmyminister-dialog.component';
import { ImageKnowmyministerDeletePopupComponent } from './image-knowmyminister-delete-dialog.component';

export const imageRoute: Routes = [
    {
        path: 'image-knowmyminister',
        component: ImageKnowmyministerComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'knowMyMinisterApp.image.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'image-knowmyminister/:id',
        component: ImageKnowmyministerDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'knowMyMinisterApp.image.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const imagePopupRoute: Routes = [
    {
        path: 'image-knowmyminister-new',
        component: ImageKnowmyministerPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'knowMyMinisterApp.image.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'image-knowmyminister/:id/edit',
        component: ImageKnowmyministerPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'knowMyMinisterApp.image.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'image-knowmyminister/:id/delete',
        component: ImageKnowmyministerDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'knowMyMinisterApp.image.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
