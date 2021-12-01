import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  logarService(user: FormData): Observable<any> {
    return this.http.post<any>('http://localhost/AngularEndpoint.php', user);
  }
}