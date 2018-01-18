import { BaseEntity } from './../../shared';

export class PhotoKnowmyminister implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
        public link?: string,
        public ministerId?: number,
        public politicalPartyId?: number,
    ) {
    }
}
