import { Injectable } from '@angular/core';
import { RestApiGateway } from '../rest-api-gateway';
import { IUser, isLocator, isID } from '../../model/user/iuser';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { HttpClient } from '@angular/common/http';
import * as queryString from 'query-string';
import { API_BASE_URL, HOST } from '../../../environments/environment';

@Injectable()
export class UserService implements RestApiGateway<IUser> {

  constructor(private http: HttpClient) { }

  /**
   * HTTPのgetメソッド
   * @param param getメソッドパラメタとなる連想配列
   * @returns 取得した情報が流れるObservable
   */
  get(params: {[key: string]: string}): Observable<IUser> {
    const queries = queryString.stringify(params, {encode: true});
    const targetURL = API_BASE_URL + 'user' + ( queries === '' ? '' : '?' + queries);
    return this.http.get<IUser>(targetURL);
}


  getLoginUser(): Observable<IUser> {
    const targetURL = API_BASE_URL + 'user/login';
    return this.http.get<UserInfo>(targetURL)
      .flatMap(info => this.getUser(HOST, info.localId));
  }

  getUser(host: string, id: string): Observable<IUser> {
    const encodedHost = encodeURIComponent(host);
    const encodedId = encodeURIComponent(id);
    const targetURL = API_BASE_URL + 'user/' + encodedHost + '/' + encodedId;
    return this.http.get<IUser>(targetURL);
  }

}
interface UserInfo {
    localId: string;
    displayName: string;
}
