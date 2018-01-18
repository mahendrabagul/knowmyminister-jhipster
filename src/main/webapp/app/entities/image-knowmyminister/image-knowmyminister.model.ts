import { BaseEntity } from './../../shared';

export class ImageKnowmyminister implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
        public link?: string,
    ) {
    }
}
