import {Locator} from '../user/iuser';
/**
 * 取引履歴を示す
 * @author kbc14a12
 */
export interface ITrading {
    readonly id: number;
    readonly owner: Locator;
    readonly borrower: Locator;
    readonly isbn: string;
    // データベース上ではISO8601で格納されている
    readonly lendAt: Date;
    readonly returnedAt?: Date;
}
