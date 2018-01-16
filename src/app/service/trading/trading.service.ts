import { Injectable } from '@angular/core';
import { RestApiGateway } from '../rest-api-gateway';
import { ITrading } from '../../model/trading/itrading';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { isLocator, Locator } from '../../model/user/iuser';
@Injectable()
export class TradingService implements RestApiGateway<ITrading> {

  constructor() { }

  /**
   * 取引情報を取得する
   * 仮置き
   */
  get(): Observable<ITrading> {
    const owner = 'huruikagi@localhost';
    const borrower = 'nekome_space@localhost';
    if (isLocator(owner) && isLocator(borrower)) {
      return Observable.of({
        id: 100,
        owner: owner,
        borrower: borrower,
        isbn: '9784062639149',
        lendAt: new Date('2017-11-21T03:30:29.024Z')
      });
    } else {
      return Observable.throw(new Error('ここにはこない！'));
    }
  }
}
