import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { AwardKnowmyministerComponent } from './award-knowmyminister.component';
import { AwardKnowmyministerDetailComponent } from './award-knowmyminister-detail.component';
import { AwardKnowmyministerPopupComponent } from './award-knowmyminister-dialog.component';
import { AwardKnowmyministerDeletePopupComponent } from './award-knowmyminister-delete-dialog.component';

@Injectable()
export class AwardKnowmyministerResolvePagingParams implements Resolve<any> {

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

export const awardRoute: Routes = [
    {
        path: 'award-knowmyminister',
        component: AwardKnowmyministerComponent,
        resolve: {
            'pagingParams': AwardKnowmyministerResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'knowMyMinisterApp.award.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'award-knowmyminister/:id',
        component: AwardKnowmyministerDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'knowMyMinisterApp.award.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const awardPopupRoute: Routes = [
    {
        path: 'award-knowmyminister-new',
        component: AwardKnowmyministerPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'knowMyMinisterApp.award.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'award-knowmyminister/:id/edit',
        component: AwardKnowmyministerPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'knowMyMinisterApp.award.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'award-knowmyminister/:id/delete',
        component: AwardKnowmyministerDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'knowMyMinisterApp.award.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
