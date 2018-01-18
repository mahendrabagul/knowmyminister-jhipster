import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { KnowMyMinisterSharedModule } from '../../shared';
import {
    StateKnowmyministerService,
    StateKnowmyministerPopupService,
    StateKnowmyministerComponent,
    StateKnowmyministerDetailComponent,
    StateKnowmyministerDialogComponent,
    StateKnowmyministerPopupComponent,
    StateKnowmyministerDeletePopupComponent,
    StateKnowmyministerDeleteDialogComponent,
    stateRoute,
    statePopupRoute,
    StateKnowmyministerResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...stateRoute,
    ...statePopupRoute,
];

@NgModule({
    imports: [
        KnowMyMinisterSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        StateKnowmyministerComponent,
        StateKnowmyministerDetailComponent,
        StateKnowmyministerDialogComponent,
        StateKnowmyministerDeleteDialogComponent,
        StateKnowmyministerPopupComponent,
        StateKnowmyministerDeletePopupComponent,
    ],
    entryComponents: [
        StateKnowmyministerComponent,
        StateKnowmyministerDialogComponent,
        StateKnowmyministerPopupComponent,
        StateKnowmyministerDeleteDialogComponent,
        StateKnowmyministerDeletePopupComponent,
    ],
    providers: [
        StateKnowmyministerService,
        StateKnowmyministerPopupService,
        StateKnowmyministerResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class KnowMyMinisterStateKnowmyministerModule {}
