import { Injectable } from '@angular/core';
import { RestApiGateway } from '../rest-api-gateway';
import { IUser, isLocator, isID } from '../../model/user/iuser';
import { Observable } from 'rxjs/Observable';
import 'rxjs/operator/add/of';

export class UserService implements RestApiGateway<IUser> {

  constructor() { }

  /**
   * HTTPのgetメソッド
   * @param param getメソッドパラメタとなる連想配列
   * @returns 取得した情報が流れるObservable
   */
  get(params: {[key: string]: string}): Observable<IUser> {
    const id = 'huruikagi';
    const locator = 'huruikagi@localhost';
    if (isLocator(locator) && isID(id)) {
      return Observable.of({
        id: id,
        host: 'localhost',
        locator: locator,
        name: 'ふるいかぎ'
      });
  } else {}

  }

  getLoginUser(): Observable<IUser> {
    const id = 'tomo_space';
    const locator = id + '@' + 'localhost';
    if (isLocator(locator) && isID(id)) {
      return Observable.of({
        id: id,
        host: 'localhost',
        locator: locator,
        name: 'ねこめ'
      });
  } else {}

  }
}
