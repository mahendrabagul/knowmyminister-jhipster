import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { PoliticalPartyKnowmyminister } from './political-party-knowmyminister.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class PoliticalPartyKnowmyministerService {

    private resourceUrl =  SERVER_API_URL + 'api/political-parties';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/political-parties';

    constructor(private http: Http) { }

    create(politicalParty: PoliticalPartyKnowmyminister): Observable<PoliticalPartyKnowmyminister> {
        const copy = this.convert(politicalParty);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(politicalParty: PoliticalPartyKnowmyminister): Observable<PoliticalPartyKnowmyminister> {
        const copy = this.convert(politicalParty);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<PoliticalPartyKnowmyminister> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    search(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceSearchUrl, options)
            .map((res: any) => this.convertResponse(res));
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to PoliticalPartyKnowmyminister.
     */
    private convertItemFromServer(json: any): PoliticalPartyKnowmyminister {
        const entity: PoliticalPartyKnowmyminister = Object.assign(new PoliticalPartyKnowmyminister(), json);
        return entity;
    }

    /**
     * Convert a PoliticalPartyKnowmyminister to a JSON which can be sent to the server.
     */
    private convert(politicalParty: PoliticalPartyKnowmyminister): PoliticalPartyKnowmyminister {
        const copy: PoliticalPartyKnowmyminister = Object.assign({}, politicalParty);
        return copy;
    }
}
