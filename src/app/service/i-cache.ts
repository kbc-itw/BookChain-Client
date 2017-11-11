
/**
 * キャッシュ層用のインタフェース
 * @author kbc14a12
 * @param E キャッシュするオブジェクト
 */
export interface ICache<E> {
 /**
   * キャッシュにオブジェクトを格納する
   * @param value 格納したいオブジェクト
   * @returns 新規格納できたらtrue、既に格納済みのオブジェクトならfalse
   */
  add(value: E): boolean;

  /**
   * キャッシュからオブジェクトを削除する
   * @param key 削除したいオブジェクト
   * @returns オブジェクトがあり削除できたらtrue、なければfalse
   */
  remove(value: E): boolean;

  /**
   * キャッシュからオブジェクトを取得する
   * @param query 取得したいオブジェクトを検索するクエリ
   * @returns クエリに対応するオブジェクトがある場合そのオブジェクトの配列。なければ空配列
   */
  get(query: string): E[];

  /**
   * キャッシュのオブジェクトを更新する
   * @param query 取得したいオブジェクトを検索するクエリ
   * @param value 更新後のオブジェクト
   * @returns クエリに対応するオブジェクトがある場合true。なければfalse
   */
  update(query: string, value: E): boolean;

  /**
   * キャッシュをクリアする
   */
  clear(): void;

  /**
   * キャッシュ内の全オブジェクトを取得する
   * @returns キャッシュ内の全オブジェクトが収まった配列
   */
  getAll(): E[];
}
