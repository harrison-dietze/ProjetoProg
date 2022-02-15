import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProdutosService } from '../produtos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private produtoService: ProdutosService
  ) {}

  filtro: FormData;

  ngOnInit(): void {
    this.iniciarLista();
  }

  listaProdutos: any[];

  iniciarLista() {
    this.filtro = new FormData();
    this.filtro.append('listarProdutos', 'todos');
    this.produtoService.listaProdutoService(this.filtro).subscribe((res) => {
      this.listaProdutos = res;
      for (let produto of this.listaProdutos) {
        console.log(produto.valor);
      }
    });
  }
}
