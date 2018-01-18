import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { StateKnowmyministerComponent } from './state-knowmyminister.component';
import { StateKnowmyministerDetailComponent } from './state-knowmyminister-detail.component';
import { StateKnowmyministerPopupComponent } from './state-knowmyminister-dialog.component';
import { StateKnowmyministerDeletePopupComponent } from './state-knowmyminister-delete-dialog.component';

@Injectable()
export class StateKnowmyministerResolvePagingParams implements Resolve<any> {

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

export const stateRoute: Routes = [
    {
        path: 'state-knowmyminister',
        component: StateKnowmyministerComponent,
        resolve: {
            'pagingParams': StateKnowmyministerResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'knowMyMinisterApp.state.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'state-knowmyminister/:id',
        component: StateKnowmyministerDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'knowMyMinisterApp.state.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const statePopupRoute: Routes = [
    {
        path: 'state-knowmyminister-new',
        component: StateKnowmyministerPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'knowMyMinisterApp.state.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'state-knowmyminister/:id/edit',
        component: StateKnowmyministerPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'knowMyMinisterApp.state.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'state-knowmyminister/:id/delete',
        component: StateKnowmyministerDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'knowMyMinisterApp.state.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
