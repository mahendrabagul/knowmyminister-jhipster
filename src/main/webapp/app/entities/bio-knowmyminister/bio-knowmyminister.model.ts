import { BaseEntity } from './../../shared';

export class BioKnowmyminister implements BaseEntity {
    constructor(
        public id?: number,
        public firstName?: string,
        public lastName?: string,
        public middleName?: string,
        public mobileNo?: string,
        public email?: string,
        public born?: string,
        public age?: number,
        public sex?: number,
        public spouse?: string,
        public children?: string,
        public website?: string,
        public languageId?: number,
        public profilePictureId?: number,
    ) {
    }
}
