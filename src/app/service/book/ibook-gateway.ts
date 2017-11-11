import { IBook } from './../../model/book/ibook';
import { Observable } from 'rxjs/Observable';
import { IRestApiGateway } from '../irest-api-gateway';

/**
 * 書籍情報を取得するためのAPIを叩くゲートウェイのインタフェース
 * 当クライアントではもっぱら外部APIからの情報取得に用いるため、getのみ実装する
 * @author kbc14a12
 */
export interface IBookGateway extends IRestApiGateway<IBook> {

  /**
   * getメソッドで書籍情報を取得する
   * @param param 書籍情報を取得するためのgetメソッドパラメタとなる連想配列
   * @returns 取得した書籍情報群の流れるObservable
   */
  get(params: {[key: string]: string}): Observable<IBook>;

}
