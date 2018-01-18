import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { KnowMyMinisterSharedModule } from '../../shared';
import {
    MinisterKnowmyministerService,
    MinisterKnowmyministerPopupService,
    MinisterKnowmyministerComponent,
    MinisterKnowmyministerDetailComponent,
    MinisterKnowmyministerDialogComponent,
    MinisterKnowmyministerPopupComponent,
    MinisterKnowmyministerDeletePopupComponent,
    MinisterKnowmyministerDeleteDialogComponent,
    ministerRoute,
    ministerPopupRoute,
    MinisterKnowmyministerResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...ministerRoute,
    ...ministerPopupRoute,
];

@NgModule({
    imports: [
        KnowMyMinisterSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        MinisterKnowmyministerComponent,
        MinisterKnowmyministerDetailComponent,
        MinisterKnowmyministerDialogComponent,
        MinisterKnowmyministerDeleteDialogComponent,
        MinisterKnowmyministerPopupComponent,
        MinisterKnowmyministerDeletePopupComponent,
    ],
    entryComponents: [
        MinisterKnowmyministerComponent,
        MinisterKnowmyministerDialogComponent,
        MinisterKnowmyministerPopupComponent,
        MinisterKnowmyministerDeleteDialogComponent,
        MinisterKnowmyministerDeletePopupComponent,
    ],
    providers: [
        MinisterKnowmyministerService,
        MinisterKnowmyministerPopupService,
        MinisterKnowmyministerResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class KnowMyMinisterMinisterKnowmyministerModule {}
