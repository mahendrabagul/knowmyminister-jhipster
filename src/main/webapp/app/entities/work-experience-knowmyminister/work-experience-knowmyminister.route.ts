import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { WorkExperienceKnowmyministerComponent } from './work-experience-knowmyminister.component';
import { WorkExperienceKnowmyministerDetailComponent } from './work-experience-knowmyminister-detail.component';
import { WorkExperienceKnowmyministerPopupComponent } from './work-experience-knowmyminister-dialog.component';
import { WorkExperienceKnowmyministerDeletePopupComponent } from './work-experience-knowmyminister-delete-dialog.component';

@Injectable()
export class WorkExperienceKnowmyministerResolvePagingParams implements Resolve<any> {

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

export const workExperienceRoute: Routes = [
    {
        path: 'work-experience-knowmyminister',
        component: WorkExperienceKnowmyministerComponent,
        resolve: {
            'pagingParams': WorkExperienceKnowmyministerResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'knowMyMinisterApp.workExperience.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'work-experience-knowmyminister/:id',
        component: WorkExperienceKnowmyministerDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'knowMyMinisterApp.workExperience.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const workExperiencePopupRoute: Routes = [
    {
        path: 'work-experience-knowmyminister-new',
        component: WorkExperienceKnowmyministerPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'knowMyMinisterApp.workExperience.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'work-experience-knowmyminister/:id/edit',
        component: WorkExperienceKnowmyministerPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'knowMyMinisterApp.workExperience.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'work-experience-knowmyminister/:id/delete',
        component: WorkExperienceKnowmyministerDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'knowMyMinisterApp.workExperience.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
