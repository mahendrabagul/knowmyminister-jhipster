import { BaseEntity } from './../../shared';

export class SocialLinkKnowmyminister implements BaseEntity {
    constructor(
        public id?: number,
        public provider?: string,
        public link?: string,
        public ministerId?: number,
        public politicalPartyId?: number,
    ) {
    }
}
