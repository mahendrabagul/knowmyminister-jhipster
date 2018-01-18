import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { SocialLinkKnowmyministerComponent } from './social-link-knowmyminister.component';
import { SocialLinkKnowmyministerDetailComponent } from './social-link-knowmyminister-detail.component';
import { SocialLinkKnowmyministerPopupComponent } from './social-link-knowmyminister-dialog.component';
import { SocialLinkKnowmyministerDeletePopupComponent } from './social-link-knowmyminister-delete-dialog.component';

export const socialLinkRoute: Routes = [
    {
        path: 'social-link-knowmyminister',
        component: SocialLinkKnowmyministerComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'knowMyMinisterApp.socialLink.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'social-link-knowmyminister/:id',
        component: SocialLinkKnowmyministerDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'knowMyMinisterApp.socialLink.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const socialLinkPopupRoute: Routes = [
    {
        path: 'social-link-knowmyminister-new',
        component: SocialLinkKnowmyministerPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'knowMyMinisterApp.socialLink.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'social-link-knowmyminister/:id/edit',
        component: SocialLinkKnowmyministerPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'knowMyMinisterApp.socialLink.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'social-link-knowmyminister/:id/delete',
        component: SocialLinkKnowmyministerDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'knowMyMinisterApp.socialLink.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
