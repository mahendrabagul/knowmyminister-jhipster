import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { MinisterKnowmyminister } from './minister-knowmyminister.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class MinisterKnowmyministerService {

    private resourceUrl =  SERVER_API_URL + 'api/ministers';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/ministers';

    constructor(private http: Http) { }

    create(minister: MinisterKnowmyminister): Observable<MinisterKnowmyminister> {
        const copy = this.convert(minister);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(minister: MinisterKnowmyminister): Observable<MinisterKnowmyminister> {
        const copy = this.convert(minister);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<MinisterKnowmyminister> {
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
     * Convert a returned JSON object to MinisterKnowmyminister.
     */
    private convertItemFromServer(json: any): MinisterKnowmyminister {
        const entity: MinisterKnowmyminister = Object.assign(new MinisterKnowmyminister(), json);
        return entity;
    }

    /**
     * Convert a MinisterKnowmyminister to a JSON which can be sent to the server.
     */
    private convert(minister: MinisterKnowmyminister): MinisterKnowmyminister {
        const copy: MinisterKnowmyminister = Object.assign({}, minister);
        return copy;
    }
}
