import { Injectable } from '@angular/core';
import { RestApiGateway } from '../rest-api-gateway';
import { HttpClient } from '@angular/common/http';
import { IOwnership } from '../../model/ownership/IOwnership';
import { Observable } from 'rxjs/Observable';
import * as queryString from 'query-string';
import { API_BASE_URL } from '../../../environments/environment';
@Injectable()
export class OwnershipService  implements RestApiGateway<IOwnership> {

  constructor(private http: HttpClient) { }

  public get(params: {[key: string]: string}): Observable<IOwnership> {
    const queries = queryString.stringify(params);
    const targetURL = API_BASE_URL + 'ownership' + ( queries === '' ? '' : '?' + queries);
    return this.http.get<IOwnership>(targetURL);
  }

  public post(params: {[key: string]: string}): Observable<void> {
    const targetURL = API_BASE_URL + 'ownership/';
    return this.http.post<void>(targetURL, params);
  }
}
