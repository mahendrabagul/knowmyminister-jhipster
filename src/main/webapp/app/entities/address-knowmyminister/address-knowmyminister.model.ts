import { BaseEntity } from './../../shared';

export class AddressKnowmyminister implements BaseEntity {
    constructor(
        public id?: number,
        public line1?: string,
        public line2?: string,
        public area?: string,
        public pincode?: string,
        public village?: string,
        public taluka?: string,
        public city?: string,
        public ministerId?: number,
        public politicalPartyId?: number,
        public stateId?: number,
        public contryId?: number,
    ) {
    }
}
