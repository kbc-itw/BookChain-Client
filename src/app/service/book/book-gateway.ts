import { IBook } from './../../model/book/ibook';
import { Observable } from 'rxjs/Observable';
import { RestApiGateway } from '../rest-api-gateway';

/**
 * 書籍情報を取得するためのAPIを叩くゲートウェイのインタフェース
 * 当クライアントではもっぱら外部APIからの情報取得に用いるため、getのみ実装する
 * @author kbc14a12
 */
export abstract class BookGateway extends RestApiGateway<IBook> {

  /**
   * getメソッドで書籍情報を取得する
   * @param param 書籍情報を取得するためのgetメソッドパラメタとなる連想配列
   * @returns 取得した書籍情報群の流れるObservable
   */
  abstract get(params: {[key: string]: string}): Observable<IBook>;

}
