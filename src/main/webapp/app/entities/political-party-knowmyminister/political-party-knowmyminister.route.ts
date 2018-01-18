import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { PoliticalPartyKnowmyministerComponent } from './political-party-knowmyminister.component';
import { PoliticalPartyKnowmyministerDetailComponent } from './political-party-knowmyminister-detail.component';
import { PoliticalPartyKnowmyministerPopupComponent } from './political-party-knowmyminister-dialog.component';
import { PoliticalPartyKnowmyministerDeletePopupComponent } from './political-party-knowmyminister-delete-dialog.component';

@Injectable()
export class PoliticalPartyKnowmyministerResolvePagingParams implements Resolve<any> {

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

export const politicalPartyRoute: Routes = [
    {
        path: 'political-party-knowmyminister',
        component: PoliticalPartyKnowmyministerComponent,
        resolve: {
            'pagingParams': PoliticalPartyKnowmyministerResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'knowMyMinisterApp.politicalParty.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'political-party-knowmyminister/:id',
        component: PoliticalPartyKnowmyministerDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'knowMyMinisterApp.politicalParty.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const politicalPartyPopupRoute: Routes = [
    {
        path: 'political-party-knowmyminister-new',
        component: PoliticalPartyKnowmyministerPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'knowMyMinisterApp.politicalParty.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'political-party-knowmyminister/:id/edit',
        component: PoliticalPartyKnowmyministerPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'knowMyMinisterApp.politicalParty.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'political-party-knowmyminister/:id/delete',
        component: PoliticalPartyKnowmyministerDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'knowMyMinisterApp.politicalParty.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
