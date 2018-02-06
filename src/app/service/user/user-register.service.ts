import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { API_BASE_URL } from '../../../environments/environment';

@Injectable()
export class UserRegisterService {

  constructor( private http: HttpClient ) { }

  public register(localId: string, displayName: string): Observable<void> {
    return this.http.post<void>(API_BASE_URL + 'user/register', {localId, displayName});
  }

}
