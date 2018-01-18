import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { CountryKnowmyminister } from './country-knowmyminister.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class CountryKnowmyministerService {

    private resourceUrl =  SERVER_API_URL + 'api/countries';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/countries';

    constructor(private http: Http) { }

    create(country: CountryKnowmyminister): Observable<CountryKnowmyminister> {
        const copy = this.convert(country);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(country: CountryKnowmyminister): Observable<CountryKnowmyminister> {
        const copy = this.convert(country);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<CountryKnowmyminister> {
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
     * Convert a returned JSON object to CountryKnowmyminister.
     */
    private convertItemFromServer(json: any): CountryKnowmyminister {
        const entity: CountryKnowmyminister = Object.assign(new CountryKnowmyminister(), json);
        return entity;
    }

    /**
     * Convert a CountryKnowmyminister to a JSON which can be sent to the server.
     */
    private convert(country: CountryKnowmyminister): CountryKnowmyminister {
        const copy: CountryKnowmyminister = Object.assign({}, country);
        return copy;
    }
}
