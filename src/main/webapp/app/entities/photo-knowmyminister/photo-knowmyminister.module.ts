import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { KnowMyMinisterSharedModule } from '../../shared';
import {
    PhotoKnowmyministerService,
    PhotoKnowmyministerPopupService,
    PhotoKnowmyministerComponent,
    PhotoKnowmyministerDetailComponent,
    PhotoKnowmyministerDialogComponent,
    PhotoKnowmyministerPopupComponent,
    PhotoKnowmyministerDeletePopupComponent,
    PhotoKnowmyministerDeleteDialogComponent,
    photoRoute,
    photoPopupRoute,
} from './';

const ENTITY_STATES = [
    ...photoRoute,
    ...photoPopupRoute,
];

@NgModule({
    imports: [
        KnowMyMinisterSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PhotoKnowmyministerComponent,
        PhotoKnowmyministerDetailComponent,
        PhotoKnowmyministerDialogComponent,
        PhotoKnowmyministerDeleteDialogComponent,
        PhotoKnowmyministerPopupComponent,
        PhotoKnowmyministerDeletePopupComponent,
    ],
    entryComponents: [
        PhotoKnowmyministerComponent,
        PhotoKnowmyministerDialogComponent,
        PhotoKnowmyministerPopupComponent,
        PhotoKnowmyministerDeleteDialogComponent,
        PhotoKnowmyministerDeletePopupComponent,
    ],
    providers: [
        PhotoKnowmyministerService,
        PhotoKnowmyministerPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class KnowMyMinisterPhotoKnowmyministerModule {}
