import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { KnowMyMinisterSharedModule } from '../../shared';
import {
    AddressKnowmyministerService,
    AddressKnowmyministerPopupService,
    AddressKnowmyministerComponent,
    AddressKnowmyministerDetailComponent,
    AddressKnowmyministerDialogComponent,
    AddressKnowmyministerPopupComponent,
    AddressKnowmyministerDeletePopupComponent,
    AddressKnowmyministerDeleteDialogComponent,
    addressRoute,
    addressPopupRoute,
} from './';

const ENTITY_STATES = [
    ...addressRoute,
    ...addressPopupRoute,
];

@NgModule({
    imports: [
        KnowMyMinisterSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        AddressKnowmyministerComponent,
        AddressKnowmyministerDetailComponent,
        AddressKnowmyministerDialogComponent,
        AddressKnowmyministerDeleteDialogComponent,
        AddressKnowmyministerPopupComponent,
        AddressKnowmyministerDeletePopupComponent,
    ],
    entryComponents: [
        AddressKnowmyministerComponent,
        AddressKnowmyministerDialogComponent,
        AddressKnowmyministerPopupComponent,
        AddressKnowmyministerDeleteDialogComponent,
        AddressKnowmyministerDeletePopupComponent,
    ],
    providers: [
        AddressKnowmyministerService,
        AddressKnowmyministerPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class KnowMyMinisterAddressKnowmyministerModule {}
