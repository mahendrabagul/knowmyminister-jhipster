import { BaseEntity } from './../../shared';

export class AwardKnowmyminister implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
        public startDate?: any,
        public issuer?: string,
        public description?: string,
        public ministerId?: number,
    ) {
    }
}
