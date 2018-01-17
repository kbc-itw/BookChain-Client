import { Injectable } from '@angular/core';
import { RestApiGateway } from '../rest-api-gateway';
import { ITrading } from '../../model/trading/itrading';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { isLocator, Locator } from '../../model/user/iuser';
import * as queryString from 'query-string';
import { API_BASE_URL } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TradingService implements RestApiGateway<ITrading> {

  constructor(private http: HttpClient) { }

  /**
   * 取引情報を取得する
   */
  get(params: {[key: string]: string}): Observable<ITrading> {
    const queries = queryString.stringify(params);
    const targetURL = API_BASE_URL + 'trades' + ( queries === '' ? '' : '?' + queries);
    return this.http.get<ITrading>(targetURL);
  }
}
