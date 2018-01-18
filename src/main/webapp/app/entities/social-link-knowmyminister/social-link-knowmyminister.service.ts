import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { SocialLinkKnowmyminister } from './social-link-knowmyminister.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class SocialLinkKnowmyministerService {

    private resourceUrl =  SERVER_API_URL + 'api/social-links';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/social-links';

    constructor(private http: Http) { }

    create(socialLink: SocialLinkKnowmyminister): Observable<SocialLinkKnowmyminister> {
        const copy = this.convert(socialLink);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(socialLink: SocialLinkKnowmyminister): Observable<SocialLinkKnowmyminister> {
        const copy = this.convert(socialLink);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<SocialLinkKnowmyminister> {
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
     * Convert a returned JSON object to SocialLinkKnowmyminister.
     */
    private convertItemFromServer(json: any): SocialLinkKnowmyminister {
        const entity: SocialLinkKnowmyminister = Object.assign(new SocialLinkKnowmyminister(), json);
        return entity;
    }

    /**
     * Convert a SocialLinkKnowmyminister to a JSON which can be sent to the server.
     */
    private convert(socialLink: SocialLinkKnowmyminister): SocialLinkKnowmyminister {
        const copy: SocialLinkKnowmyminister = Object.assign({}, socialLink);
        return copy;
    }
}
