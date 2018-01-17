import { Injectable } from '@angular/core';
import { HttpClient } from 'selenium-webdriver/http';
import { Observable } from 'rxjs/Observable';
import { IOwnership } from '../model/iownership';
import { OwnershipQuery } from './ownership.service';

@Injectable()
export class OwnershipGatewayService {

  constructor(private http: HttpClient) { }

  public query(query: OwnershipQuery): Observable<IOwnership> {

    // 引数からURLパラメタを生成する処理
    query

    // getのジェネリクスが、コールバック関数の引数の型になる
    return this.http.get<IOwnership>("http://domain/Ownership");

  }
}
