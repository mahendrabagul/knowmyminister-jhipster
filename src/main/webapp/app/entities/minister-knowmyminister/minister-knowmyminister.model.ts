import { BaseEntity } from './../../shared';

export class MinisterKnowmyminister implements BaseEntity {
    constructor(
        public id?: number,
        public personalBackground?: string,
        public familyBackground?: string,
        public interests?: string,
        public ideal?: string,
        public motto?: string,
        public electionSignId?: number,
        public partyId?: number,
        public bioId?: number,
        public addresses?: BaseEntity[],
        public awards?: BaseEntity[],
        public photos?: BaseEntity[],
        public workExperinces?: BaseEntity[],
        public educations?: BaseEntity[],
        public socialLinks?: BaseEntity[],
        public politicalPartyId?: number,
    ) {
    }
}
