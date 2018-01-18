import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { KnowMyMinisterMinisterKnowmyministerModule } from './minister-knowmyminister/minister-knowmyminister.module';
import { KnowMyMinisterAwardKnowmyministerModule } from './award-knowmyminister/award-knowmyminister.module';
import { KnowMyMinisterImageKnowmyministerModule } from './image-knowmyminister/image-knowmyminister.module';
import { KnowMyMinisterPhotoKnowmyministerModule } from './photo-knowmyminister/photo-knowmyminister.module';
import { KnowMyMinisterPoliticalPartyKnowmyministerModule } from './political-party-knowmyminister/political-party-knowmyminister.module';
import { KnowMyMinisterSocialLinkKnowmyministerModule } from './social-link-knowmyminister/social-link-knowmyminister.module';
import { KnowMyMinisterAddressKnowmyministerModule } from './address-knowmyminister/address-knowmyminister.module';
import { KnowMyMinisterBioKnowmyministerModule } from './bio-knowmyminister/bio-knowmyminister.module';
import { KnowMyMinisterWorkExperienceKnowmyministerModule } from './work-experience-knowmyminister/work-experience-knowmyminister.module';
import { KnowMyMinisterEducationKnowmyministerModule } from './education-knowmyminister/education-knowmyminister.module';
import { KnowMyMinisterLanguageKnowmyministerModule } from './language-knowmyminister/language-knowmyminister.module';
import { KnowMyMinisterCountryKnowmyministerModule } from './country-knowmyminister/country-knowmyminister.module';
import { KnowMyMinisterStateKnowmyministerModule } from './state-knowmyminister/state-knowmyminister.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        KnowMyMinisterMinisterKnowmyministerModule,
        KnowMyMinisterAwardKnowmyministerModule,
        KnowMyMinisterImageKnowmyministerModule,
        KnowMyMinisterPhotoKnowmyministerModule,
        KnowMyMinisterPoliticalPartyKnowmyministerModule,
        KnowMyMinisterSocialLinkKnowmyministerModule,
        KnowMyMinisterAddressKnowmyministerModule,
        KnowMyMinisterBioKnowmyministerModule,
        KnowMyMinisterWorkExperienceKnowmyministerModule,
        KnowMyMinisterEducationKnowmyministerModule,
        KnowMyMinisterLanguageKnowmyministerModule,
        KnowMyMinisterCountryKnowmyministerModule,
        KnowMyMinisterStateKnowmyministerModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class KnowMyMinisterEntityModule {}
