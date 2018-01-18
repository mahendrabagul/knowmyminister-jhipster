import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { KnowMyMinisterSharedModule } from '../../shared';
import {
    PoliticalPartyKnowmyministerService,
    PoliticalPartyKnowmyministerPopupService,
    PoliticalPartyKnowmyministerComponent,
    PoliticalPartyKnowmyministerDetailComponent,
    PoliticalPartyKnowmyministerDialogComponent,
    PoliticalPartyKnowmyministerPopupComponent,
    PoliticalPartyKnowmyministerDeletePopupComponent,
    PoliticalPartyKnowmyministerDeleteDialogComponent,
    politicalPartyRoute,
    politicalPartyPopupRoute,
    PoliticalPartyKnowmyministerResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...politicalPartyRoute,
    ...politicalPartyPopupRoute,
];

@NgModule({
    imports: [
        KnowMyMinisterSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PoliticalPartyKnowmyministerComponent,
        PoliticalPartyKnowmyministerDetailComponent,
        PoliticalPartyKnowmyministerDialogComponent,
        PoliticalPartyKnowmyministerDeleteDialogComponent,
        PoliticalPartyKnowmyministerPopupComponent,
        PoliticalPartyKnowmyministerDeletePopupComponent,
    ],
    entryComponents: [
        PoliticalPartyKnowmyministerComponent,
        PoliticalPartyKnowmyministerDialogComponent,
        PoliticalPartyKnowmyministerPopupComponent,
        PoliticalPartyKnowmyministerDeleteDialogComponent,
        PoliticalPartyKnowmyministerDeletePopupComponent,
    ],
    providers: [
        PoliticalPartyKnowmyministerService,
        PoliticalPartyKnowmyministerPopupService,
        PoliticalPartyKnowmyministerResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class KnowMyMinisterPoliticalPartyKnowmyministerModule {}
