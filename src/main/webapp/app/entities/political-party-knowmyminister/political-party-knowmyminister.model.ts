import { BaseEntity } from './../../shared';

export class PoliticalPartyKnowmyminister implements BaseEntity {
    constructor(
        public id?: number,
        public description?: string,
        public abbreviation?: string,
        public founded?: string,
        public precededBy?: string,
        public newsPaper?: string,
        public youthWing?: string,
        public womensWing?: string,
        public peasantsWing?: string,
        public minorityWing?: string,
        public membership?: string,
        public ideology?: string,
        public politicalPosition?: string,
        public internationalAffiliation?: string,
        public colour?: string,
        public eCIStatus?: string,
        public alliance?: string,
        public seatsInLokSabha?: string,
        public seatsInRajyaSabha?: string,
        public electionSymbol?: string,
        public website?: string,
        public parliamentaryChairperson?: string,
        public email?: string,
        public logoId?: number,
        public presidentId?: number,
        public rajyasabhaLeaderId?: number,
        public loksabhaLeaderId?: number,
        public socialLinks?: BaseEntity[],
        public ministers?: BaseEntity[],
        public photos?: BaseEntity[],
        public headquarters?: BaseEntity[],
    ) {
    }
}
