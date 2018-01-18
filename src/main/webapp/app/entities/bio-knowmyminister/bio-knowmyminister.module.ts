import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { KnowMyMinisterSharedModule } from '../../shared';
import {
    BioKnowmyministerService,
    BioKnowmyministerPopupService,
    BioKnowmyministerComponent,
    BioKnowmyministerDetailComponent,
    BioKnowmyministerDialogComponent,
    BioKnowmyministerPopupComponent,
    BioKnowmyministerDeletePopupComponent,
    BioKnowmyministerDeleteDialogComponent,
    bioRoute,
    bioPopupRoute,
} from './';

const ENTITY_STATES = [
    ...bioRoute,
    ...bioPopupRoute,
];

@NgModule({
    imports: [
        KnowMyMinisterSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        BioKnowmyministerComponent,
        BioKnowmyministerDetailComponent,
        BioKnowmyministerDialogComponent,
        BioKnowmyministerDeleteDialogComponent,
        BioKnowmyministerPopupComponent,
        BioKnowmyministerDeletePopupComponent,
    ],
    entryComponents: [
        BioKnowmyministerComponent,
        BioKnowmyministerDialogComponent,
        BioKnowmyministerPopupComponent,
        BioKnowmyministerDeleteDialogComponent,
        BioKnowmyministerDeletePopupComponent,
    ],
    providers: [
        BioKnowmyministerService,
        BioKnowmyministerPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class KnowMyMinisterBioKnowmyministerModule {}
