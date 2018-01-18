import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { EducationKnowmyminister } from './education-knowmyminister.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class EducationKnowmyministerService {

    private resourceUrl =  SERVER_API_URL + 'api/educations';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/educations';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(education: EducationKnowmyminister): Observable<EducationKnowmyminister> {
        const copy = this.convert(education);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(education: EducationKnowmyminister): Observable<EducationKnowmyminister> {
        const copy = this.convert(education);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<EducationKnowmyminister> {
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
     * Convert a returned JSON object to EducationKnowmyminister.
     */
    private convertItemFromServer(json: any): EducationKnowmyminister {
        const entity: EducationKnowmyminister = Object.assign(new EducationKnowmyminister(), json);
        entity.startDate = this.dateUtils
            .convertDateTimeFromServer(json.startDate);
        entity.endDate = this.dateUtils
            .convertDateTimeFromServer(json.endDate);
        return entity;
    }

    /**
     * Convert a EducationKnowmyminister to a JSON which can be sent to the server.
     */
    private convert(education: EducationKnowmyminister): EducationKnowmyminister {
        const copy: EducationKnowmyminister = Object.assign({}, education);

        copy.startDate = this.dateUtils.toDate(education.startDate);

        copy.endDate = this.dateUtils.toDate(education.endDate);
        return copy;
    }
}
