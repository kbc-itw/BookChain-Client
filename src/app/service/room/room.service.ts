import { Injectable } from '@angular/core';
import { API_BASE_URL } from '../../../environments/environment';
import * as queryString from 'query-string';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RoomService {

  constructor(private http: HttpClient) { }

  public post( purpose: string, inviter: string ): Observable<RoomInfo> {
    const params = {purpose, inviter};
    const queries = queryString.stringify(params);
    const targetURL = API_BASE_URL + 'room?' + queries;
    return this.http.post<RoomInfo>(targetURL, {});
  }

}


/**
 * 取引に利用する部屋情報
 * @author kbc14a12
 */
export interface RoomInfo {
  readonly room: {
    host: string;
    id: string;
    purpose: string;
    inviter: string;
    createdAt: string
  };
  readonly inviteToken: string;
}
