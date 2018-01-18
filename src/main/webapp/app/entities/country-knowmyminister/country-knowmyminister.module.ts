import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { KnowMyMinisterSharedModule } from '../../shared';
import {
    CountryKnowmyministerService,
    CountryKnowmyministerPopupService,
    CountryKnowmyministerComponent,
    CountryKnowmyministerDetailComponent,
    CountryKnowmyministerDialogComponent,
    CountryKnowmyministerPopupComponent,
    CountryKnowmyministerDeletePopupComponent,
    CountryKnowmyministerDeleteDialogComponent,
    countryRoute,
    countryPopupRoute,
    CountryKnowmyministerResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...countryRoute,
    ...countryPopupRoute,
];

@NgModule({
    imports: [
        KnowMyMinisterSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CountryKnowmyministerComponent,
        CountryKnowmyministerDetailComponent,
        CountryKnowmyministerDialogComponent,
        CountryKnowmyministerDeleteDialogComponent,
        CountryKnowmyministerPopupComponent,
        CountryKnowmyministerDeletePopupComponent,
    ],
    entryComponents: [
        CountryKnowmyministerComponent,
        CountryKnowmyministerDialogComponent,
        CountryKnowmyministerPopupComponent,
        CountryKnowmyministerDeleteDialogComponent,
        CountryKnowmyministerDeletePopupComponent,
    ],
    providers: [
        CountryKnowmyministerService,
        CountryKnowmyministerPopupService,
        CountryKnowmyministerResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class KnowMyMinisterCountryKnowmyministerModule {}
