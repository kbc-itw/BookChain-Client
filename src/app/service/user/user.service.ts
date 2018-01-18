import { Injectable } from '@angular/core';
import { RestApiGateway } from '../rest-api-gateway';
import { IUser, isLocator, isID } from '../../model/user/iuser';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/Observable/of';
import { HttpClient } from '@angular/common/http';
import * as queryString from 'query-string';
import { API_BASE_URL } from '../../../environments/environment';

@Injectable()
export class UserService implements RestApiGateway<IUser> {

  constructor(private http: HttpClient) { }

  /**
   * HTTPのgetメソッド
   * @param param getメソッドパラメタとなる連想配列
   * @returns 取得した情報が流れるObservable
   */
  get(params: {[key: string]: string}): Observable<IUser> {
    const queries = queryString.stringify(params);
    const targetURL = API_BASE_URL + 'user' + ( queries === '' ? '' : '?' + queries);
    return this.http.get<IUser>(targetURL);
}


  /**
   * TODO
   */
  getLoginUser(): Observable<IUser> {
    const id = 'tomo';
    const locator = id + '@' + 'localhost';
    if (isLocator(locator) && isID(id)) {
      return Observable.of({
        id: id,
        host: 'localhost',
        locator: locator,
        name: 'ねこめ'
      });
    } else {
      return Observable.throw(new Error('は？'));
    }

  }
}
