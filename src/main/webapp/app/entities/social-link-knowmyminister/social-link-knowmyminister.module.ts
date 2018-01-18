import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { KnowMyMinisterSharedModule } from '../../shared';
import {
    SocialLinkKnowmyministerService,
    SocialLinkKnowmyministerPopupService,
    SocialLinkKnowmyministerComponent,
    SocialLinkKnowmyministerDetailComponent,
    SocialLinkKnowmyministerDialogComponent,
    SocialLinkKnowmyministerPopupComponent,
    SocialLinkKnowmyministerDeletePopupComponent,
    SocialLinkKnowmyministerDeleteDialogComponent,
    socialLinkRoute,
    socialLinkPopupRoute,
} from './';

const ENTITY_STATES = [
    ...socialLinkRoute,
    ...socialLinkPopupRoute,
];

@NgModule({
    imports: [
        KnowMyMinisterSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        SocialLinkKnowmyministerComponent,
        SocialLinkKnowmyministerDetailComponent,
        SocialLinkKnowmyministerDialogComponent,
        SocialLinkKnowmyministerDeleteDialogComponent,
        SocialLinkKnowmyministerPopupComponent,
        SocialLinkKnowmyministerDeletePopupComponent,
    ],
    entryComponents: [
        SocialLinkKnowmyministerComponent,
        SocialLinkKnowmyministerDialogComponent,
        SocialLinkKnowmyministerPopupComponent,
        SocialLinkKnowmyministerDeleteDialogComponent,
        SocialLinkKnowmyministerDeletePopupComponent,
    ],
    providers: [
        SocialLinkKnowmyministerService,
        SocialLinkKnowmyministerPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class KnowMyMinisterSocialLinkKnowmyministerModule {}
