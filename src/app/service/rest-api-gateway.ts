import { Observable } from 'rxjs/Observable';

/**
 * REST APIを叩くゲートウェイのインタフェース
 * 実際にはこれを利用するのではなく、これを拡張したインタフェースを利用する
 * これを拡張したインタフェースは、CRUDのうち最低一つを実装している
 * @author kbc14a12
 * @param E 取得する情報を示す型
 */
export abstract class RestApiGateway<E> {

  /**
   * HTTPのgetメソッド
   * @param param getメソッドパラメタとなる連想配列
   * @returns 取得した情報が流れるObservable
   */
  get?(params: {[key: string]: string}): Observable<E>;

  /**
   * HTTPのpostメソッド
   * @param params postメソッドパラメタとなる連想配列
   * @returns 取得した情報が流れるObservable
   */
  post?(param: {[key: string]: string}): Observable<void>;

  /**
   * HTTPのputメソッド
   * @param params putメソッドパラメタとなる連想配列
   * @returns 成功したら流れるObservable
   */
  put?(params: {[key: string]: string}): Observable<void>;

  /**
   * HTTPのdeleteメソッド
   * @param params deleteメソッドパラメタとなる連想配列
   * @returns 成功したら流れるObservable
   */
  delete?(params: {[key: string]: string}): Observable<void>;
}
