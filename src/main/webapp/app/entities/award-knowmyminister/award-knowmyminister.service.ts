import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { AwardKnowmyminister } from './award-knowmyminister.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class AwardKnowmyministerService {

    private resourceUrl =  SERVER_API_URL + 'api/awards';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/awards';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(award: AwardKnowmyminister): Observable<AwardKnowmyminister> {
        const copy = this.convert(award);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(award: AwardKnowmyminister): Observable<AwardKnowmyminister> {
        const copy = this.convert(award);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<AwardKnowmyminister> {
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
     * Convert a returned JSON object to AwardKnowmyminister.
     */
    private convertItemFromServer(json: any): AwardKnowmyminister {
        const entity: AwardKnowmyminister = Object.assign(new AwardKnowmyminister(), json);
        entity.startDate = this.dateUtils
            .convertDateTimeFromServer(json.startDate);
        return entity;
    }

    /**
     * Convert a AwardKnowmyminister to a JSON which can be sent to the server.
     */
    private convert(award: AwardKnowmyminister): AwardKnowmyminister {
        const copy: AwardKnowmyminister = Object.assign({}, award);

        copy.startDate = this.dateUtils.toDate(award.startDate);
        return copy;
    }
}
