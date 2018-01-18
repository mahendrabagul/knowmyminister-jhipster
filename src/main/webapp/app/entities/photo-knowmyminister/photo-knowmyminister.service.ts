import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { PhotoKnowmyminister } from './photo-knowmyminister.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class PhotoKnowmyministerService {

    private resourceUrl =  SERVER_API_URL + 'api/photos';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/photos';

    constructor(private http: Http) { }

    create(photo: PhotoKnowmyminister): Observable<PhotoKnowmyminister> {
        const copy = this.convert(photo);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(photo: PhotoKnowmyminister): Observable<PhotoKnowmyminister> {
        const copy = this.convert(photo);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<PhotoKnowmyminister> {
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
     * Convert a returned JSON object to PhotoKnowmyminister.
     */
    private convertItemFromServer(json: any): PhotoKnowmyminister {
        const entity: PhotoKnowmyminister = Object.assign(new PhotoKnowmyminister(), json);
        return entity;
    }

    /**
     * Convert a PhotoKnowmyminister to a JSON which can be sent to the server.
     */
    private convert(photo: PhotoKnowmyminister): PhotoKnowmyminister {
        const copy: PhotoKnowmyminister = Object.assign({}, photo);
        return copy;
    }
}
