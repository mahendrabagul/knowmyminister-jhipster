import { BaseEntity } from './../../shared';

export class StateKnowmyminister implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public countryId?: number,
    ) {
    }
}
