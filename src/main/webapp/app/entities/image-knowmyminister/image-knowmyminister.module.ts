import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { KnowMyMinisterSharedModule } from '../../shared';
import {
    ImageKnowmyministerService,
    ImageKnowmyministerPopupService,
    ImageKnowmyministerComponent,
    ImageKnowmyministerDetailComponent,
    ImageKnowmyministerDialogComponent,
    ImageKnowmyministerPopupComponent,
    ImageKnowmyministerDeletePopupComponent,
    ImageKnowmyministerDeleteDialogComponent,
    imageRoute,
    imagePopupRoute,
} from './';

const ENTITY_STATES = [
    ...imageRoute,
    ...imagePopupRoute,
];

@NgModule({
    imports: [
        KnowMyMinisterSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ImageKnowmyministerComponent,
        ImageKnowmyministerDetailComponent,
        ImageKnowmyministerDialogComponent,
        ImageKnowmyministerDeleteDialogComponent,
        ImageKnowmyministerPopupComponent,
        ImageKnowmyministerDeletePopupComponent,
    ],
    entryComponents: [
        ImageKnowmyministerComponent,
        ImageKnowmyministerDialogComponent,
        ImageKnowmyministerPopupComponent,
        ImageKnowmyministerDeleteDialogComponent,
        ImageKnowmyministerDeletePopupComponent,
    ],
    providers: [
        ImageKnowmyministerService,
        ImageKnowmyministerPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class KnowMyMinisterImageKnowmyministerModule {}
