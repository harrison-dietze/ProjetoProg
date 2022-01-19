import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EnderecoService {
  constructor(private http: HttpClient) {}

  cidadeService(estado: string): Observable<any> {
    return this.http.get<any>(
      'https://servicodados.ibge.gov.br/api/v1/localidades/estados/' +
        estado +
        '/municipios'
    );
  }
}
