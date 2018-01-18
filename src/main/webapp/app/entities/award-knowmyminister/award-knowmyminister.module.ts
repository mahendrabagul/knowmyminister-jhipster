import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { KnowMyMinisterSharedModule } from '../../shared';
import {
    AwardKnowmyministerService,
    AwardKnowmyministerPopupService,
    AwardKnowmyministerComponent,
    AwardKnowmyministerDetailComponent,
    AwardKnowmyministerDialogComponent,
    AwardKnowmyministerPopupComponent,
    AwardKnowmyministerDeletePopupComponent,
    AwardKnowmyministerDeleteDialogComponent,
    awardRoute,
    awardPopupRoute,
    AwardKnowmyministerResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...awardRoute,
    ...awardPopupRoute,
];

@NgModule({
    imports: [
        KnowMyMinisterSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        AwardKnowmyministerComponent,
        AwardKnowmyministerDetailComponent,
        AwardKnowmyministerDialogComponent,
        AwardKnowmyministerDeleteDialogComponent,
        AwardKnowmyministerPopupComponent,
        AwardKnowmyministerDeletePopupComponent,
    ],
    entryComponents: [
        AwardKnowmyministerComponent,
        AwardKnowmyministerDialogComponent,
        AwardKnowmyministerPopupComponent,
        AwardKnowmyministerDeleteDialogComponent,
        AwardKnowmyministerDeletePopupComponent,
    ],
    providers: [
        AwardKnowmyministerService,
        AwardKnowmyministerPopupService,
        AwardKnowmyministerResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class KnowMyMinisterAwardKnowmyministerModule {}
