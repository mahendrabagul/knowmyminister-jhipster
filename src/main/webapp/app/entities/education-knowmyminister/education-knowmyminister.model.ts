import { BaseEntity } from './../../shared';

export class EducationKnowmyminister implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
        public institute?: string,
        public startDate?: any,
        public endDate?: any,
        public ministerId?: number,
        public languageId?: number,
    ) {
    }
}
