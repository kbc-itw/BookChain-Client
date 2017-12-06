import { Injectable } from '@angular/core';
import { IUser } from '../model/i-user';

/**
 * @author kbc16a07
 */

@Injectable()
export class UserService {

  constructor() { }

  /**
   * ログインしているユーザーを返す
   * 現段階(2017/11/22)ではダミーを返す。
   * @returns ユーザデータ
   */
  public getLoginUser(): IUser {
    return {
      locator: 'huruikagi@kbc-itw.net',
      host: 'kbc-itw.net',
      id: 'huruikagi',
      name: 'ふるいかぎ'
    };
  }
}
