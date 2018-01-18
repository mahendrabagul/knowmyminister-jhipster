import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { KnowMyMinisterSharedModule } from '../../shared';
import {
    EducationKnowmyministerService,
    EducationKnowmyministerPopupService,
    EducationKnowmyministerComponent,
    EducationKnowmyministerDetailComponent,
    EducationKnowmyministerDialogComponent,
    EducationKnowmyministerPopupComponent,
    EducationKnowmyministerDeletePopupComponent,
    EducationKnowmyministerDeleteDialogComponent,
    educationRoute,
    educationPopupRoute,
    EducationKnowmyministerResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...educationRoute,
    ...educationPopupRoute,
];

@NgModule({
    imports: [
        KnowMyMinisterSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        EducationKnowmyministerComponent,
        EducationKnowmyministerDetailComponent,
        EducationKnowmyministerDialogComponent,
        EducationKnowmyministerDeleteDialogComponent,
        EducationKnowmyministerPopupComponent,
        EducationKnowmyministerDeletePopupComponent,
    ],
    entryComponents: [
        EducationKnowmyministerComponent,
        EducationKnowmyministerDialogComponent,
        EducationKnowmyministerPopupComponent,
        EducationKnowmyministerDeleteDialogComponent,
        EducationKnowmyministerDeletePopupComponent,
    ],
    providers: [
        EducationKnowmyministerService,
        EducationKnowmyministerPopupService,
        EducationKnowmyministerResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class KnowMyMinisterEducationKnowmyministerModule {}
