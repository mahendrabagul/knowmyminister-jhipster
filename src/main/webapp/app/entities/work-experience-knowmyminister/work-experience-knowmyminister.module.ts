import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { KnowMyMinisterSharedModule } from '../../shared';
import {
    WorkExperienceKnowmyministerService,
    WorkExperienceKnowmyministerPopupService,
    WorkExperienceKnowmyministerComponent,
    WorkExperienceKnowmyministerDetailComponent,
    WorkExperienceKnowmyministerDialogComponent,
    WorkExperienceKnowmyministerPopupComponent,
    WorkExperienceKnowmyministerDeletePopupComponent,
    WorkExperienceKnowmyministerDeleteDialogComponent,
    workExperienceRoute,
    workExperiencePopupRoute,
    WorkExperienceKnowmyministerResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...workExperienceRoute,
    ...workExperiencePopupRoute,
];

@NgModule({
    imports: [
        KnowMyMinisterSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        WorkExperienceKnowmyministerComponent,
        WorkExperienceKnowmyministerDetailComponent,
        WorkExperienceKnowmyministerDialogComponent,
        WorkExperienceKnowmyministerDeleteDialogComponent,
        WorkExperienceKnowmyministerPopupComponent,
        WorkExperienceKnowmyministerDeletePopupComponent,
    ],
    entryComponents: [
        WorkExperienceKnowmyministerComponent,
        WorkExperienceKnowmyministerDialogComponent,
        WorkExperienceKnowmyministerPopupComponent,
        WorkExperienceKnowmyministerDeleteDialogComponent,
        WorkExperienceKnowmyministerDeletePopupComponent,
    ],
    providers: [
        WorkExperienceKnowmyministerService,
        WorkExperienceKnowmyministerPopupService,
        WorkExperienceKnowmyministerResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class KnowMyMinisterWorkExperienceKnowmyministerModule {}
