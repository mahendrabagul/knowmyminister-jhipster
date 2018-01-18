import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { EducationKnowmyministerComponent } from './education-knowmyminister.component';
import { EducationKnowmyministerDetailComponent } from './education-knowmyminister-detail.component';
import { EducationKnowmyministerPopupComponent } from './education-knowmyminister-dialog.component';
import { EducationKnowmyministerDeletePopupComponent } from './education-knowmyminister-delete-dialog.component';

@Injectable()
export class EducationKnowmyministerResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const educationRoute: Routes = [
    {
        path: 'education-knowmyminister',
        component: EducationKnowmyministerComponent,
        resolve: {
            'pagingParams': EducationKnowmyministerResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'knowMyMinisterApp.education.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'education-knowmyminister/:id',
        component: EducationKnowmyministerDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'knowMyMinisterApp.education.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const educationPopupRoute: Routes = [
    {
        path: 'education-knowmyminister-new',
        component: EducationKnowmyministerPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'knowMyMinisterApp.education.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'education-knowmyminister/:id/edit',
        component: EducationKnowmyministerPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'knowMyMinisterApp.education.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'education-knowmyminister/:id/delete',
        component: EducationKnowmyministerDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'knowMyMinisterApp.education.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
