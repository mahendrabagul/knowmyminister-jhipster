import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { KnowMyMinisterSharedModule } from '../../shared';
import {
    LanguageKnowmyministerService,
    LanguageKnowmyministerPopupService,
    LanguageKnowmyministerComponent,
    LanguageKnowmyministerDetailComponent,
    LanguageKnowmyministerDialogComponent,
    LanguageKnowmyministerPopupComponent,
    LanguageKnowmyministerDeletePopupComponent,
    LanguageKnowmyministerDeleteDialogComponent,
    languageRoute,
    languagePopupRoute,
    LanguageKnowmyministerResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...languageRoute,
    ...languagePopupRoute,
];

@NgModule({
    imports: [
        KnowMyMinisterSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        LanguageKnowmyministerComponent,
        LanguageKnowmyministerDetailComponent,
        LanguageKnowmyministerDialogComponent,
        LanguageKnowmyministerDeleteDialogComponent,
        LanguageKnowmyministerPopupComponent,
        LanguageKnowmyministerDeletePopupComponent,
    ],
    entryComponents: [
        LanguageKnowmyministerComponent,
        LanguageKnowmyministerDialogComponent,
        LanguageKnowmyministerPopupComponent,
        LanguageKnowmyministerDeleteDialogComponent,
        LanguageKnowmyministerDeletePopupComponent,
    ],
    providers: [
        LanguageKnowmyministerService,
        LanguageKnowmyministerPopupService,
        LanguageKnowmyministerResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class KnowMyMinisterLanguageKnowmyministerModule {}
