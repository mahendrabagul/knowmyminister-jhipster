import { BaseEntity } from './../../shared';

export class WorkExperienceKnowmyminister implements BaseEntity {
    constructor(
        public id?: number,
        public organization?: string,
        public description?: string,
        public startDate?: any,
        public endDate?: any,
        public ministerId?: number,
        public languageId?: number,
    ) {
    }
}
