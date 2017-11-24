export interface IUser {
    readonly locator: Locator;
    readonly id: ID;
    readonly name: String;
    readonly host: String;
}

const IDRegExp = '';
export type ID = '[a-zA-Z_]を満たす4-15文字の文字列';
export type Locator = 'id + @ + 任意の文字列からなる文字列';

export function isID(str: string): str is ID {
    return /^[a-zA-Z_]{4, 15}$/.test(str);
}

export function isLocator(str: string): str is Locator {
    return /[a-zA-Z_]{4, 15}@.*$/.test(str);
}
