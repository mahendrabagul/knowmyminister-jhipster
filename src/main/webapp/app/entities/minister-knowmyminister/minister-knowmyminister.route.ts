import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { MinisterKnowmyministerComponent } from './minister-knowmyminister.component';
import { MinisterKnowmyministerDetailComponent } from './minister-knowmyminister-detail.component';
import { MinisterKnowmyministerPopupComponent } from './minister-knowmyminister-dialog.component';
import { MinisterKnowmyministerDeletePopupComponent } from './minister-knowmyminister-delete-dialog.component';

@Injectable()
export class MinisterKnowmyministerResolvePagingParams implements Resolve<any> {

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

export const ministerRoute: Routes = [
    {
        path: 'minister-knowmyminister',
        component: MinisterKnowmyministerComponent,
        resolve: {
            'pagingParams': MinisterKnowmyministerResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'knowMyMinisterApp.minister.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'minister-knowmyminister/:id',
        component: MinisterKnowmyministerDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'knowMyMinisterApp.minister.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const ministerPopupRoute: Routes = [
    {
        path: 'minister-knowmyminister-new',
        component: MinisterKnowmyministerPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'knowMyMinisterApp.minister.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'minister-knowmyminister/:id/edit',
        component: MinisterKnowmyministerPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'knowMyMinisterApp.minister.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'minister-knowmyminister/:id/delete',
        component: MinisterKnowmyministerDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'knowMyMinisterApp.minister.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
