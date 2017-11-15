
/**
 * キャッシュ層用のインタフェース
 * 格納されるオブジェクトは自身を識別する一意な値をもっている必要がある
 * @author kbc14a12
 * @param E キャッシュするオブジェクト
 */
export abstract class Cache<E> {
 /**
   * キャッシュにオブジェクトを格納する
   * @param value 格納したいオブジェクト
   * @returns 新規格納できたらtrue、既に格納済みのオブジェクトならfalse
   */
  abstract add(value: E): boolean;

  /**
   * キャッシュからオブジェクトを削除する
   * @param key 削除したいオブジェクト
   * @returns オブジェクトがあり削除できたらtrue、なければfalse
   */
  abstract remove(value: E): boolean;

  /**
   * キャッシュからオブジェクトを取得する
   * @param id 取得したいオブジェクトを取得するための一意な値
   * @returns クエリに対応するオブジェクトがある場合そのオブジェクト。なければnull
   */
  abstract get(id: string): E;

  /**
   * キャッシュのオブジェクトを更新する
   * @param value 更新したいオブジェクト。オブジェクトに含まれる一意な値は同一である必要がある
   * @returns オブジェクトがある場合true。なければfalse
   */
  abstract update(value: E): boolean;

  /**
   * キャッシュをクリアする
   */
  abstract clear(): void;

  /**
   * キャッシュ内の全オブジェクトを取得する
   * @returns キャッシュ内の全オブジェクトが収まった配列
   */
  abstract getAll(): E[];
}
