import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  constructor(private http: HttpClient) {}

  postar(upload: FormData): Observable<any> {
    return this.http.post(
      'http://localhost/backend/AngularEndpoints.php',
      upload
    );
  }
}
