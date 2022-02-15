import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProdutosService {
  constructor(private http: HttpClient) {}

  cadastroProdutosService(produto: FormData): Observable<any> {
    return this.http.post<any>(
      'http://localhost/backend/AngularEndpoints.php',
      produto
    );
  }

  listaProdutoService(filtro: FormData): Observable<any> {
    return this.http.post<any>(
      'http://localhost/backend/AngularEndpoints.php',
      filtro
    );
  }
}
